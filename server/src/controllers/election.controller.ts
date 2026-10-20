import { Request, Response } from 'express';
import { ElectionService } from '../services/election.service';

export class ElectionController {
  static getOverview(req: Request, res: Response) {
    try {
      const data = ElectionService.getConstituencyOverview();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getElections(req: Request, res: Response) {
    try {
      const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
      const data = ElectionService.getParliamentaryElections(year);
      if (!data) {
        return res.status(404).json({ success: false, error: 'Election data not found for given year' });
      }
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getTrends(req: Request, res: Response) {
    try {
      const data = ElectionService.getVoteShareTrends();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getAssemblyAnalysis(req: Request, res: Response) {
    try {
      const data = ElectionService.getAssemblySegmentAnalysis();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getDemographics(req: Request, res: Response) {
    try {
      const data = ElectionService.getDemographicProfile();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getParties(req: Request, res: Response) {
    try {
      const data = ElectionService.getParties();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static getInsights(req: Request, res: Response) {
    try {
      const data = ElectionService.getIntelligenceInsights();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
