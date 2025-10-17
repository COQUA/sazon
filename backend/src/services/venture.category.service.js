import prisma from '../config/prisma.js';

/**
 * Obtiene las categorías de un emprendimiento
 * @param {string} ventureId 
 * @returns {Promise<Array>} 
 */
export async function getVentureCategories(ventureId) {

  const venture = await prisma.venture.findUnique({
    where: { ventureId }
  });
  
  if (!venture) {
    throw new Error('Emprendimiento no encontrado');
  }
  

  const ventureCategories = await prisma.ventureCategory.findMany({
    where: { venture_id: ventureId },
    include: {
      category: true
    }
  });
  
  return ventureCategories.map(vc => ({
    categoryId: vc.category.categoryId,
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

  const venture = await prisma.venture.findUnique({
    where: { ventureId }
  });
  
  if (!venture) {
    throw new Error('Emprendimiento no encontrado');
  }
  

  return await prisma.$transaction(async (prisma) => {

    await prisma.ventureCategory.deleteMany({
      where: { venture_id: ventureId }
    });
    

    if (categoryIds && categoryIds.length > 0) {

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

      await Promise.all(categoryIds.map(categoryId => 
        prisma.ventureCategory.create({
          data: {
            venture_id: ventureId,
            category_id: BigInt(categoryId)
          }
        })
      ));
    }
    

    const updatedCategories = await prisma.ventureCategory.findMany({
      where: { venture_id: ventureId },
      include: {
        category: true
      }
    });
    
    return updatedCategories.map(vc => ({
      categoryId: vc.category.categoryId,
      name: vc.category.name
    }));
  });
}