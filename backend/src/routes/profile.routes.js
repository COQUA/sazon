import express from 'express';
import * as ctrl from '../controller/profile.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();

router.get('/entrepreneur/:userId', isAuthenticated, ctrl.getEntrepreneurProfile);
router.post('/entrepreneur/:userId', isAuthenticated, ctrl.createEntrepreneurProfile);
router.put('/entrepreneur/:userId', isAuthenticated, ctrl.updateEntrepreneurProfile);


router.get('/investor/:userId', isAuthenticated, ctrl.getInvestorProfile);
router.post('/investor/:userId', isAuthenticated, ctrl.createInvestorProfile);
router.put('/investor/:userId', isAuthenticated, ctrl.updateInvestorProfile);


router.get('/investor/:userId/preferences', isAuthenticated, ctrl.getInvestorCategoryPreferences);
router.put('/investor/:userId/preferences', isAuthenticated, ctrl.updateInvestorCategoryPreferences);

export default router;