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
  const { categoryIds, ...ventureData } = payload;
  

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
            venture_id: venture.ventureId,
            category_id: BigInt(categoryId)
          }
        });
      }
    }
    

    return prisma.venture.findUnique({
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
  });
}

export async function update(id, payload) {
  const { categoryIds, ...ventureData } = payload;
  

  return prisma.$transaction(async (prisma) => {

    const venture = await prisma.venture.update({
      where: { ventureId: id },
      data: ventureData
    });
    

    if (categoryIds !== undefined) {

      await prisma.ventureCategory.deleteMany({
        where: { venture_id: id }
      });
      

      if (categoryIds && categoryIds.length > 0) {
        for (const categoryId of categoryIds) {
          await prisma.ventureCategory.create({
            data: {
              venture_id: venture.ventureId,
              category_id: BigInt(categoryId)
            }
          });
        }
      }
    }
    

    return prisma.venture.findUnique({
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