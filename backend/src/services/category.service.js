import prisma from '../config/prisma.js';

/**
 * Obtiene todas las categorías
 * @returns {Promise<Array>} Lista de categorías
 */
export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    include: {
      investorPreferences: true,
      ventureCategories: true
    },
    orderBy: {
      name: 'asc'
    }
  });
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
  return categories.map(convertBigInts);
}

/**
 * @param {number} categoryId 
 * @returns {Promise<Object>} 
 */
export async function getCategoryById(categoryId) {
  const category = await prisma.category.findUnique({
    where: { categoryId: BigInt(categoryId) },
    include: {
      investorPreferences: true,
      ventureCategories: true
    }
  });
  if (!category) return null;
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
  return convertBigInts(category);
}

/**
 * Crea una nueva categoría
 * @param {Object} categoryData 
 * @returns {Promise<Object>}  
 */
export async function createCategory(categoryData) {
  const { name } = categoryData;
  
  // Verificar que no exista ya una categoría con el mismo nombre
  const existingCategory = await prisma.category.findUnique({
    where: { name }
  });
  
  if (existingCategory) {
    throw new Error('Ya existe una categoría con ese nombre');
  }
  
  const category = await prisma.category.create({
    data: { name }
  });
  
  return {
    ...category,
    categoryId: category.categoryId.toString()
  };
}

/**
 * Actualiza una categoría existente
 * @param {number} categoryId 
 * @param {Object} categoryData 
 * @returns {Promise<Object>} 
 */
export async function updateCategory(categoryId, categoryData) {
  const { name } = categoryData;
  
  // Verificar que la categoría existe
  const existingCategory = await prisma.category.findUnique({
    where: { categoryId: BigInt(categoryId) }
  });
  
  if (!existingCategory) {
    return null;
  }
  
  // Si se proporciona un nuevo nombre, verificar que no esté duplicado
  if (name) {
    const duplicateCategory = await prisma.category.findUnique({
      where: { name }
    });
    
    if (duplicateCategory && duplicateCategory.categoryId !== BigInt(categoryId)) {
      throw new Error('Ya existe otra categoría con ese nombre');
    }
  }
  
  const updatedCategory = await prisma.category.update({
    where: { categoryId: BigInt(categoryId) },
    data: { name }
  });
  
  return {
    ...updatedCategory,
    categoryId: updatedCategory.categoryId.toString()
  };
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