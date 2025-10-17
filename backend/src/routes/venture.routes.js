import express from 'express';
import * as ctrl from '../controller/venture.controller.js';
import * as categoryCtrl from '../controller/venture.category.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();


router.get('/', ctrl.list);

router.get('/entrepreneur/:entrepreneurId', ctrl.listByEntrepreneur);

router.use(isAuthenticated);

router.post('/', ctrl.create);


router.get('/:id', ctrl.getById);

router.put('/:id', ctrl.update);


router.delete('/:id', ctrl.remove);


router.get('/:ventureId/categories', categoryCtrl.getVentureCategories);
router.put('/:ventureId/categories', categoryCtrl.updateVentureCategories);

export default router;