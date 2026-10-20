import { Router } from 'express';
import { ElectionController } from '../controllers/election.controller';

const router = Router();

// Constituency & Overview
router.get('/overview', ElectionController.getOverview);

// Historical Parliamentary Results
router.get('/elections', ElectionController.getElections);
router.get('/trends/vote-share', ElectionController.getTrends);

// Assembly Constituencies Retrospective Analysis
router.get('/assembly-segments', ElectionController.getAssemblyAnalysis);

// Demographic Profile
router.get('/demographics', ElectionController.getDemographics);

// Parties Master
router.get('/parties', ElectionController.getParties);

// Strategic Intelligence & Behavioral Insights
router.get('/intelligence-insights', ElectionController.getInsights);

export default router;
