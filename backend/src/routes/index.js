import express from 'express';
import items from './items.routes.js';

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/items', items);

export default router;
