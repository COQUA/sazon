import * as service from '../services/item.service.js';

export async function list(req, res, next) {
  try {
    const data = await service.list();
    res.json(data);
  } catch (error) { next(error); }
}

export async function create(req, res, next) {
  try {
    const item = await service.create(req.body);
    res.status(201).json(item);
  } catch (error) { next(error); }
}

export async function getById(req, res, next) {
  try {
    const item = await service.get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) { next(error); }
}

export async function update(req, res, next) {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) { next(error); }
}

export async function remove(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (error) { next(error); }
}
