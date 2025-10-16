import * as service from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
  try {
    const { email, password, name, role } = req.body;
    const result = await service.register({ email, password, name, role });
    res.status(201).json(result);
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await service.login({ email, password });
    res.json(result);
  } catch (error) { next(error); }
}

export function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado - Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añade el usuario decodificado al request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}