import prisma from '../config/prisma.js';

export async function list() {
  const ventures = await prisma.venture.findMany({
    include: {
      entrepreneur: true,
      ventureCategories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
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
  return ventures.map(venture => convertBigInts(venture));
}

export async function get(id) {
  const venture = await prisma.venture.findUnique({
    where: { ventureId: id },
    include: {
      entrepreneur: true,
      ventureCategories: {
        include: {
          category: true
        }
      }
    }
  });
  if (!venture) return null;
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
  return convertBigInts(venture);
}

export async function create(payload) {
  const { categoryIds, ...ventureData } = payload;
  // Asignar fechaCreacion si no viene en el payload
  if (!ventureData.fechaCreacion) {
    ventureData.fechaCreacion = new Date();
  }
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
  return prisma.$transaction(async (prisma) => {
    const venture = await prisma.venture.create({
      data: {
        ...ventureData
      }
    });
    if (categoryIds && categoryIds.length > 0) {
      for (const categoryId of categoryIds) {
        await prisma.ventureCategory.create({
          data: {
            ventureId: venture.ventureId,
            categoryId: BigInt(categoryId)
          }
        });
      }
    }
    const result = await prisma.venture.findUnique({
      where: { ventureId: venture.ventureId },
      include: {
        entrepreneur: true,
        ventureCategories: {
          include: {
            category: true
          }
        }
      }
    });
    return convertBigInts(result);
  });
}

export async function update(id, payload) {
  const { categoryIds, ...ventureData } = payload;
  
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

  return prisma.$transaction(async (prisma) => {
    // Actualizar datos del venture
    const venture = await prisma.venture.update({
      where: { ventureId: id },
      data: ventureData
    });
    
    // Si se proporcionan categoryIds, actualizar las categorías
    if (categoryIds !== undefined) {
      // Eliminar todas las categorías existentes
      await prisma.ventureCategory.deleteMany({
        where: { ventureId: id }
      });
      
      // Agregar las nuevas categorías
      if (categoryIds && categoryIds.length > 0) {
        for (const categoryId of categoryIds) {
          await prisma.ventureCategory.create({
            data: {
              ventureId: venture.ventureId,
              categoryId: BigInt(categoryId)
            }
          });
        }
      }
    }
    
    // Retornar el venture actualizado con sus relaciones
    const result = await prisma.venture.findUnique({
      where: { ventureId: venture.ventureId },
      include: {
        entrepreneur: true,
        ventureCategories: {
          include: {
            category: true
          }
        }
      }
    });
    
    return convertBigInts(result);
  });
}

export async function remove(id) {
  // Primero eliminar las categorías asociadas
  await prisma.ventureCategory.deleteMany({
    where: { ventureId: id }
  });
  
  // Luego eliminar el venture
  await prisma.venture.delete({ 
    where: { ventureId: id } 
  });
  
  return true;
}

export async function listByEntrepreneur(entrepreneurId) {
  return prisma.venture.findMany({
    where: { entrepreneurId },
    include: {
      entrepreneur: true,
      ventureCategories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}