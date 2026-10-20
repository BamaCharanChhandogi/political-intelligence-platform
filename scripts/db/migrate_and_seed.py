import os
import json
import psycopg2
from psycopg2.extras import execute_values, Json

DB_URL = "postgresql://neondb_owner:npg_vAHoMILkxZ53@ep-shiny-mountain-b5iatoxl-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR)) if os.path.basename(os.path.dirname(SCRIPT_DIR)) != "political-intelligence-platform" else os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_ROOT, "data", "processed")
SQL_SCHEMA_PATH = os.path.join(SCRIPT_DIR, "schema.sql")

def load_json(name):
    with open(os.path.join(DATA_DIR, name), "r", encoding="utf-8") as f:
        return json.load(f)

def run_migration_and_seed():
    print(f"Loading data from: {DATA_DIR}")
    print("Connecting to Neon PostgreSQL...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = True
    cursor = conn.cursor()

    # 1. Apply Schema
    print("Applying schema.sql...")
    with open(SQL_SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    cursor.execute(schema_sql)
    print("Tables created successfully.")

    # 2. Seed Parties
    parties = load_json("parties.json")
    for p in parties:
        cursor.execute("""
            INSERT INTO polintel_parties (name, abbreviation, alliance, color, symbol, founded)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (abbreviation) DO UPDATE 
            SET name = EXCLUDED.name, color = EXCLUDED.color, alliance = EXCLUDED.alliance;
        """, (p['name'], p['abbreviation'], p.get('alliance'), p.get('color'), p.get('symbol'), p.get('founded')))
    print(f"Seeded {len(parties)} parties.")

    # 3. Seed Parliamentary Constituency
    pc = load_json("pc_metadata.json")
    cursor.execute("""
        INSERT INTO polintel_parliamentary_constituencies (
            code, name, state, state_code, category,
            total_electors_2024, total_electors_2019, total_electors_2014, total_electors_2009,
            assembly_segments_count, historical_status
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (code) DO UPDATE 
        SET total_electors_2024 = EXCLUDED.total_electors_2024
        RETURNING id;
    """, (
        pc['code'], pc['name'], pc['state'], pc['state_code'], pc['type'],
        pc['total_electors_2024'], pc['total_electors_2019'], pc['total_electors_2014'], pc['total_electors_2009'],
        pc['assembly_segments_count'], pc['historical_status']
    ))
    pc_id = cursor.fetchone()[0]
    print(f"Seeded PC: {pc['name']} (ID: {pc_id})")

    # 4. Seed Assembly Segments
    segments = load_json("segment_wise_analysis.json")
    for s in segments:
        cursor.execute("""
            INSERT INTO polintel_assembly_segments (
                pc_id, ac_no, ac_name, district, electors_2024, turnout_2024,
                aimim_votes_2024, bjp_votes_2024, inc_votes_2024,
                leading_party_2024, lead_margin_2024, winner_assembly_2023,
                party_assembly_2023, assembly_margin_2023, dominant_community, strategic_status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (ac_no) DO UPDATE 
            SET lead_margin_2024 = EXCLUDED.lead_margin_2024,
                aimim_votes_2024 = EXCLUDED.aimim_votes_2024,
                bjp_votes_2024 = EXCLUDED.bjp_votes_2024;
        """, (
            pc_id, s['ac_no'], s['ac_name'], 'Hyderabad', s['electors'], s['turnout_2024'],
            s['aimim_votes_2024'], s['bjp_votes_2024'], s['inc_votes_2024'],
            s['leading_party_2024'], s['lead_margin_2024'], s['winner_assembly_2023'],
            s['party_assembly_2023'], s['assembly_margin_2023'], s['dominant_community'], s['strategic_status']
        ))
    print(f"Seeded {len(segments)} assembly segments.")

    # 5. Seed Elections and Candidate Results
    elections = load_json("parliamentary_elections.json")
    for e in elections:
        cursor.execute("""
            INSERT INTO polintel_elections (
                pc_id, year, election_date, counting_date, total_electors, total_votes_polled,
                voter_turnout_percent, valid_votes, nota_votes, nota_percent,
                winning_margin, winning_margin_percent, winner_party
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (pc_id, year) DO UPDATE 
            SET winning_margin = EXCLUDED.winning_margin
            RETURNING id;
        """, (
            pc_id, e['year'], e['election_date'], e['counting_date'], e['total_electors'], e['total_votes_polled'],
            e['voter_turnout_percent'], e['valid_votes'], e['nota_votes'], e['nota_percent'],
            e['winning_margin'], e['winning_margin_percent'], e['winner_party']
        ))
        election_id = cursor.fetchone()[0]

        # Clean existing candidate results for idempotency
        cursor.execute("DELETE FROM polintel_candidate_results WHERE election_id = %s;", (election_id,))

        for c in e['candidates']:
            cursor.execute("""
                INSERT INTO polintel_candidate_results (
                    election_id, candidate_name, party, party_color, evm_votes, postal_votes,
                    total_votes, vote_share_percent, position, is_winner
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (
                election_id, c['name'], c['party'], c.get('party_color'), c['evm_votes'], c['postal_votes'],
                c['total_votes'], c['vote_share_percent'], c['position'], c['is_winner']
            ))
    print(f"Seeded {len(elections)} historical elections and candidates.")

    # 6. Seed Demographics
    demo = load_json("demographics_profile.json")
    cursor.execute("""
        INSERT INTO polintel_demographics (
            pc_id, census_year, total_population, male_population, female_population,
            sex_ratio, population_density_per_sq_km, literacy_rate, male_literacy, female_literacy,
            urban_population_percent, rural_population_percent,
            religious_composition, social_category_composition, age_demographics, socio_economic_indicators
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (pc_id) DO UPDATE 
        SET total_population = EXCLUDED.total_population;
    """, (
        pc_id, demo['census_year'], demo['total_population'], demo['male_population'], demo['female_population'],
        demo['sex_ratio'], demo['population_density_per_sq_km'], demo['literacy_rate'], demo['male_literacy'], demo['female_literacy'],
        demo['urban_population_percent'], demo['rural_population_percent'],
        Json(demo['religious_composition']), Json(demo['social_category_composition']), Json(demo['age_demographics']), Json(demo['socio_economic_indicators'])
    ))
    print("Seeded demographics profile.")

    # 7. Seed Insights
    insights = load_json("electoral_insights.json")
    cursor.execute("DELETE FROM polintel_insights WHERE pc_id = %s;", (pc_id,))
    for k in insights['key_findings']:
        cursor.execute("""
            INSERT INTO polintel_insights (pc_id, title, observation, type)
            VALUES (%s, %s, %s, %s);
        """, (pc_id, k['title'], k['observation'], k['type']))
    print(f"Seeded {len(insights['key_findings'])} intelligence findings.")

    cursor.close()
    conn.close()
    print("ALL MIGRATIONS & SEEDS COMPLETED SUCCESSFULLY IN NEON CLOUD POSTGRESQL!")

if __name__ == "__main__":
    run_migration_and_seed()
