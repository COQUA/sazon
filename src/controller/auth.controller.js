import * as service from '../services/auth.service.js';

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
