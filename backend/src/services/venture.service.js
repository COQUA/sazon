import prisma from '../config/prisma.js';

// Convierte Decimal de Prisma a string y BigInt a string
function convertPrismaTypes(obj) {
  if (Array.isArray(obj)) return obj.map(convertPrismaTypes);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v.toJSON === 'function') {
        // Decimal -> string
        out[k] = v.toJSON();
      } else if (typeof v === 'bigint') {
        out[k] = v.toString();
      } else if (Array.isArray(v) || (v && typeof v === 'object')) {
        out[k] = convertPrismaTypes(v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }
  return obj;
}

export async function list() {
  const ventures = await prisma.venture.findMany({
    include: {
      entrepreneur: true,
      ventureCategories: { include: { category: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return convertPrismaTypes(ventures);
}

export async function get(id) {
  const venture = await prisma.venture.findUnique({
    where: { ventureId: id },
    include: {
      entrepreneur: true,
      ventureCategories: { include: { category: true } },
    },
  });
  if (!venture) return null;
  return convertPrismaTypes(venture);
}

export async function create(payload) {
  const { categoryIds, ...ventureData } = payload;
  if (!ventureData.fechaCreacion) ventureData.fechaCreacion = new Date();

  return prisma.$transaction(async (prisma) => {
    const venture = await prisma.venture.create({ data: ventureData });

    if (categoryIds && categoryIds.length > 0) {
      for (const categoryId of categoryIds) {
        await prisma.ventureCategory.create({
          data: { ventureId: venture.ventureId, categoryId: BigInt(categoryId) },
        });
      }
    }

    const result = await prisma.venture.findUnique({
      where: { ventureId: venture.ventureId },
      include: {
        entrepreneur: true,
        ventureCategories: { include: { category: true } },
      },
    });

    return convertPrismaTypes(result);
  });
}

export async function update(id, payload) {
  const { categoryIds, ...ventureData } = payload;

  return prisma.$transaction(async (prisma) => {
    const venture = await prisma.venture.update({
      where: { ventureId: id },
      data: ventureData,
    });

    if (categoryIds !== undefined) {
      await prisma.ventureCategory.deleteMany({ where: { ventureId: id } });

      if (categoryIds.length > 0) {
        for (const categoryId of categoryIds) {
          await prisma.ventureCategory.create({
            data: { ventureId: venture.ventureId, categoryId: BigInt(categoryId) },
          });
        }
      }
    }

    const result = await prisma.venture.findUnique({
      where: { ventureId: venture.ventureId },
      include: {
        entrepreneur: true,
        ventureCategories: { include: { category: true } },
      },
    });

    return convertPrismaTypes(result);
  });
}

export async function remove(id) {
  await prisma.ventureCategory.deleteMany({ where: { ventureId: id } });
  await prisma.venture.delete({ where: { ventureId: id } });
  return true;
}

export async function listByEntrepreneur(entrepreneurId) {
  const ventures = await prisma.venture.findMany({
    where: { entrepreneurId },
    include: {
      entrepreneur: true,
      ventureCategories: { include: { category: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return convertPrismaTypes(ventures);
}
