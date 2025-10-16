import prisma from '../config/prisma.js';

export async function list() {
  return prisma.item.findMany({ orderBy: { id: 'asc' } });
}

export async function get(id) {
  return prisma.item.findUnique({ where: { id: Number(id) } });
}

export async function create(payload) {
  return prisma.item.create({ data: payload });
}

export async function update(id, payload) {
  return prisma.item.update({ where: { id: Number(id) }, data: payload });
}

export async function remove(id) {
  await prisma.item.delete({ where: { id: Number(id) } });
  return true;
}
