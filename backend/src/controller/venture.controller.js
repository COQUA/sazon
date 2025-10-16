import * as service from '../services/venture.service.js';

export async function list(req, res, next) {
  try {
    const data = await service.list();
    res.json(data);
  } catch (error) { 
    next(error); 
  }
}

export async function create(req, res, next) {
  try {
    const ventureData = {
      ...req.body,
      entrepreneurId: req.user.userId
    };
    
    const venture = await service.create(ventureData);
    res.status(201).json(venture);
  } catch (error) { 
    next(error); 
  }
}

export async function getById(req, res, next) {
  try {
    const venture = await service.get(req.params.id);
    if (!venture) return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    res.json(venture);
  } catch (error) { 
    next(error); 
  }
}

export async function update(req, res, next) {
  try {
    const existingVenture = await service.get(req.params.id);
    if (!existingVenture) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    
    if (existingVenture.entrepreneurId !== req.user.userId) {
      return res.status(403).json({ error: 'No autorizado para modificar este emprendimiento' });
    }
    
    const venture = await service.update(req.params.id, req.body);
    res.json(venture);
  } catch (error) { 
    next(error); 
  }
}

export async function remove(req, res, next) {
  try {
    const existingVenture = await service.get(req.params.id);
    if (!existingVenture) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    
    if (existingVenture.entrepreneurId !== req.user.userId) {
      return res.status(403).json({ error: 'No autorizado para eliminar este emprendimiento' });
    }
    
    await service.remove(req.params.id);
    res.status(204).end();
  } catch (error) { 
    next(error); 
  }
}

export async function listByEntrepreneur(req, res, next) {
  try {
    const ventures = await service.listByEntrepreneur(req.params.entrepreneurId);
    res.json(ventures);
  } catch (error) {
    next(error);
  }
}