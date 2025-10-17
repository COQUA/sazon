import * as service from '../services/category.service.js';


export async function getAllCategories(req, res, next) {
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (error) { next(error); }
}


export async function getCategoryById(req, res, next) {
  try {
    console.log('getCategoryById params:', req.params);
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
    const newCategory = await service.createCategory(categoryData);
    // Buscar la categoría recién creada con relaciones y BigInt serializados
    const categoryDetail = await service.getCategoryById(newCategory.categoryId);
    res.status(201).json({
      message: 'Categoría creada exitosamente',
      category: categoryDetail
    });
  } catch (error) { next(error); }
}


export async function updateCategory(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para actualizar categorías' });
    }
    
    const { categoryId } = req.params;
    const categoryData = req.body;
    const updated = await service.updateCategory(categoryId, categoryData);
    if (!updated) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    // Buscar la categoría actualizada con relaciones y BigInt serializados
    const categoryDetail = await service.getCategoryById(categoryId);
    res.json({
      message: 'Categoría actualizada exitosamente',
      category: categoryDetail
    });
  } catch (error) { next(error); }
}


export async function deleteCategory(req, res, next) {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para eliminar categorías' });
    }
    
    const { categoryId } = req.params;
    const deleted = await service.deleteCategory(categoryId);
    if (!deleted) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    // Serializar BigInt de la categoría eliminada
    function convertBigInts(obj) {
      if (Array.isArray(obj)) return obj.map(convertBigInts);
      if (obj && typeof obj === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(obj)) {
          if (typeof v === 'bigint') out[k] = v.toString();
          else if (Array.isArray(v) || (v && typeof v === 'object')) out[k] = convertBigInts(v);
          else out[k] = v;
        }
        return out;
      }
      return obj;
    }
    res.json({
      message: 'Categoría eliminada correctamente',
      category: convertBigInts(deleted)
    });
  } catch (error) { next(error); }
}