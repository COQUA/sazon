import prisma from '../config/prisma.js';

/**
 * Obtiene todas las categorías
 * @returns {Promise<Array>} Lista de categorías
 */
export async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

/**
 * @param {number} categoryId 
 * @returns {Promise<Object>} 
 */
export async function getCategoryById(categoryId) {
  return await prisma.category.findUnique({
    where: { categoryId: BigInt(categoryId) }
  });
}

/**
 * Crea una nueva categoría
 * @param {Object} categoryData 
 * @returns {Promise<Object>}  
 */
export async function createCategory(categoryData) {
  const { name } = categoryData;

  const existingCategory = await prisma.category.findUnique({
    where: { name }
  });
  
  if (existingCategory) {
    throw new Error('Ya existe una categoría con ese nombre');
  }
  
  return await prisma.category.create({
    data: { name }
  });
}

/**
 * Actualiza una categoría existente
 * @param {number} categoryId 
 * @param {Object} categoryData 
 * @returns {Promise<Object>} 
 */
export async function updateCategory(categoryId, categoryData) {
  const { name } = categoryData;

  const existingCategory = await prisma.category.findUnique({
    where: { categoryId: BigInt(categoryId) }
  });
  
  if (!existingCategory) {
    return null;
  }
  

  if (name) {
    const duplicateCategory = await prisma.category.findUnique({
      where: { name }
    });
    
    if (duplicateCategory && duplicateCategory.categoryId !== BigInt(categoryId)) {
      throw new Error('Ya existe otra categoría con ese nombre');
    }
  }
  
  return await prisma.category.update({
    where: { categoryId: BigInt(categoryId) },
    data: { name }
  });
}

/**
 * Elimina una categoría existente
 * @param {number} categoryId 
 * @returns {Promise<Object>} 
 */
export async function deleteCategory(categoryId) {

  const existingCategory = await prisma.category.findUnique({
    where: { categoryId: BigInt(categoryId) }
  });
  
  if (!existingCategory) {
    return null;
  }
  

  const usedInPreferences = await prisma.investorPreference.findFirst({
    where: { categoryId: BigInt(categoryId) }
  });
  
  const usedInVentures = await prisma.ventureCategory.findFirst({
    where: { categoryId: BigInt(categoryId) }
  });
  
  if (usedInPreferences || usedInVentures) {
    throw new Error('No se puede eliminar esta categoría porque está siendo utilizada');
  }
  
  return await prisma.category.delete({
    where: { categoryId: BigInt(categoryId) }
  });
}