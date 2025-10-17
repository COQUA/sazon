import express from 'express';
import * as ctrl from '../controller/category.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();


router.get('/', ctrl.getAllCategories);
router.get('/:categoryId', ctrl.getCategoryById);


router.post('/', isAuthenticated, ctrl.createCategory);
router.put('/:categoryId', isAuthenticated, ctrl.updateCategory); 
router.delete('/:categoryId', isAuthenticated, ctrl.deleteCategory);

export default router;