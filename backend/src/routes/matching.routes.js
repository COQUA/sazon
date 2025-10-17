import express from 'express';
import * as ctrl from '../controller/matching.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();

router.use(isAuthenticated);


router.get('/suggestions', ctrl.getSuggestedVentures);


router.post('/connect', ctrl.createConnection);


router.get('/connections', ctrl.getMyConnections);

export default router;