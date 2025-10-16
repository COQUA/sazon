import express from 'express';
import * as ctrl from '../controller/venture.controller.js';
import { isAuthenticated } from '../controller/auth.controller.js';

const router = express.Router();

// Listar todos los emprendimientos
router.get('/', ctrl.list);

// Obtener emprendimientos de un emprendedor específico
router.get('/entrepreneur/:entrepreneurId', ctrl.listByEntrepreneur);

// Rutas que requieren autenticación
router.use(isAuthenticated);

// Crear un nuevo emprendimiento
router.post('/', ctrl.create);

// Obtener un emprendimiento por ID
router.get('/:id', ctrl.getById);

// Actualizar un emprendimiento
router.put('/:id', ctrl.update);

// Eliminar un emprendimiento
router.delete('/:id', ctrl.remove);

export default router;