import express from 'express';
import authRoutes from './auth.routes.js';
import ventureRoutes from './venture.routes.js';
import profileRoutes from './profile.routes.js';
import categoryRoutes from './category.routes.js';

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/ventures', ventureRoutes);
router.use('/profiles', profileRoutes);
router.use('/categories', categoryRoutes);

export default router;
