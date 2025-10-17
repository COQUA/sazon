import * as service from '../services/venture.category.service.js';
import * as ventureService from '../services/venture.service.js';


export async function getVentureCategories(req, res, next) {
  try {
    const { ventureId } = req.params;
    

    const venture = await ventureService.get(ventureId);
    
    if (!venture) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    

    const isOwner = venture.entrepreneurId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    const isInvestor = req.user.role === 'investor';
    
    if (!isOwner && !isAdmin && !isInvestor) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a esta información' });
    }
    
    const categories = await service.getVentureCategories(ventureId);
    res.json(categories);
  } catch (error) { next(error); }
}


export async function updateVentureCategories(req, res, next) {
  try {
    const { ventureId } = req.params;
    

    const venture = await ventureService.get(ventureId);
    
    if (!venture) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    

    const isOwner = venture.entrepreneurId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'No tienes permisos para actualizar este emprendimiento' });
    }
    
    const { categoryIds } = req.body;
    
    if (!categoryIds || !Array.isArray(categoryIds)) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs de categorías' });
    }
    
    const updatedCategories = await service.updateVentureCategories(ventureId, categoryIds);
    res.json(updatedCategories);
  } catch (error) { next(error); }
}