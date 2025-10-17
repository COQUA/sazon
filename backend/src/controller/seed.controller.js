import * as service from '../services/category.service.js';


export async function seedCategories(req, res, next) {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Solo administradores pueden precargar categorías' });
    }
    
    const defaultCategories = [
      'Tecnología',
      'Educación',
      'Salud',
      'Producción',
      'Ambiente',
      'Finanzas',
      'Comercio',
      'Servicios',
      'Agro',
      'Turismo'
    ];
    
    const results = [];
    
    for (const name of defaultCategories) {
      try {
        const result = await service.createCategory({ name });
        results.push(result);
      } catch (error) {
        // Si ya existe, continuamos con la siguiente
        console.log(`Categoría ${name} ya existe, omitiendo...`);
      }
    }
    
    res.status(201).json({ 
      message: 'Categorías precargadas correctamente', 
      created: results.length,
      categories: results
    });
  } catch (error) { next(error); }
}