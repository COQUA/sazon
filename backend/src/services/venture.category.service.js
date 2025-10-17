import prisma from '../config/prisma.js';

/**
 * Obtiene las categorías de un emprendimiento
 * @param {string} ventureId 
 * @returns {Promise<Array>} 
 */
export async function getVentureCategories(ventureId) {
  // Verificar que el venture existe
  const venture = await prisma.venture.findUnique({
    where: { ventureId }
  });
  
  if (!venture) {
    throw new Error('Emprendimiento no encontrado');
  }
  
  // Obtener las categorías del venture
  const ventureCategories = await prisma.ventureCategory.findMany({
    where: { ventureId: ventureId },
    include: {
      category: true
    }
  });
  
  return ventureCategories.map(vc => ({
    categoryId: vc.category.categoryId.toString(),
    name: vc.category.name
  }));
}

/**
 * Actualiza las categorías de un emprendimiento
 * @param {string} ventureId 
 * @param {Array} categoryIds 
 * @returns {Promise<Array>} 
 */
export async function updateVentureCategories(ventureId, categoryIds) {
  // Verificar que el venture existe
  const venture = await prisma.venture.findUnique({
    where: { ventureId }
  });
  
  if (!venture) {
    throw new Error('Emprendimiento no encontrado');
  }
  
  // Realizar la actualización en una transacción
  return await prisma.$transaction(async (prisma) => {
    // Eliminar todas las categorías existentes
    await prisma.ventureCategory.deleteMany({
      where: { ventureId: ventureId }
    });
    
    // Agregar las nuevas categorías
    if (categoryIds && categoryIds.length > 0) {
      // Verificar que todas las categorías existen
      const categories = await prisma.category.findMany({
        where: {
          categoryId: {
            in: categoryIds.map(id => BigInt(id))
          }
        }
      });
      
      if (categories.length !== categoryIds.length) {
        throw new Error('Una o más categorías seleccionadas no existen');
      }
      
      // Crear las nuevas relaciones
      await Promise.all(categoryIds.map(categoryId => 
        prisma.ventureCategory.create({
          data: {
            ventureId: ventureId,
            categoryId: BigInt(categoryId)
          }
        })
      ));
    }
    
    // Retornar las categorías actualizadas
    const updatedCategories = await prisma.ventureCategory.findMany({
      where: { ventureId: ventureId },
      include: {
        category: true
      }
    });
    
    return updatedCategories.map(vc => ({
      categoryId: vc.category.categoryId.toString(),
      name: vc.category.name
    }));
  });
}