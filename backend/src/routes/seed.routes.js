import express from 'express';
import * as ctrl from '../controller/seed.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();


router.use(isAuthenticated);


router.post('/categories', ctrl.seedCategories);

export default router;