import prisma from '../config/prisma.js';

export async function list() {
  return prisma.venture.findMany({
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

export async function get(id) {
  return prisma.venture.findUnique({
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
}

export async function create(payload) {
  const { categories, ...ventureData } = payload;
  
  return prisma.venture.create({
    data: {
      ...ventureData,
      ventureCategories: categories ? {
        create: categories.map(categoryId => ({
          category: { connect: { categoryId: Number(categoryId) } }
        }))
      } : undefined
    },
    include: {
      entrepreneur: true,
      ventureCategories: {
        include: {
          category: true
        }
      }
    }
  });
}

export async function update(id, payload) {
  const { categories, ...ventureData } = payload;
  
  if (categories) {
    await prisma.ventureCategory.deleteMany({
      where: { ventureId: id }
    });
  }
  
  return prisma.venture.update({
    where: { ventureId: id },
    data: {
      ...ventureData,
      ventureCategories: categories ? {
        create: categories.map(categoryId => ({
          category: { connect: { categoryId: Number(categoryId) } }
        }))
      } : undefined
    },
    include: {
      entrepreneur: true,
      ventureCategories: {
        include: {
          category: true
        }
      }
    }
  });
}

export async function remove(id) {
  await prisma.ventureCategory.deleteMany({
    where: { ventureId: id }
  });
  
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