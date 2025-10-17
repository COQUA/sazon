import * as service from '../services/category.service.js';


export async function getAllCategories(req, res, next) {
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (error) { next(error); }
}


export async function getCategoryById(req, res, next) {
  try {
    const { categoryId } = req.params;
    
    const category = await service.getCategoryById(categoryId);
    
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json(category);
  } catch (error) { next(error); }
}


export async function createCategory(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para crear categorías' });
    }
    
    const categoryData = req.body;
    const result = await service.createCategory(categoryData);
    res.status(201).json(result);
  } catch (error) { next(error); }
}


export async function updateCategory(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para actualizar categorías' });
    }
    
    const { categoryId } = req.params;
    const categoryData = req.body;
    const result = await service.updateCategory(categoryId, categoryData);
    
    if (!result) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json(result);
  } catch (error) { next(error); }
}


export async function deleteCategory(req, res, next) {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para eliminar categorías' });
    }
    
    const { categoryId } = req.params;
    const result = await service.deleteCategory(categoryId);
    
    if (!result) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) { next(error); }
}