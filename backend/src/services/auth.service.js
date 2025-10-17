import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const Role = ['admin', 'entrepreneur', 'investor'];

export async function register({ email, password, name, role }) {
if (!Role.includes(role)) throw new Error('Rol invalido debe ser uno de los siguientes: admin, entrepreneur, investor');

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({ data: { email, password: hashed, name, role } });

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { user, token };
}

export async function login({ email, password }) {

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('Credenciales invalidas');

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) throw new Error('Credenciales invalidas');

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { user, token };
}
