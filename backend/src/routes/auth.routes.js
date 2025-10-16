import express from 'express';
import * as ctrl from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

export default router;
