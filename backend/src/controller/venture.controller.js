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

    if (req.user.role !== 'entrepreneur' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Solo los emprendedores pueden crear emprendimientos' });
    }
    

    let entrepreneurId = req.user.userId;
    if (req.user.role === 'admin' && req.body.entrepreneurId) {
      entrepreneurId = req.body.entrepreneurId;
    }
    if (!entrepreneurId) {
      return res.status(400).json({ error: 'No se pudo determinar el entrepreneurId para el emprendimiento' });
    }
    const ventureData = {
      ...req.body,
      entrepreneurId
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
    

    const isOwner = existingVenture.entrepreneurId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
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
    

    const isOwner = existingVenture.entrepreneurId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
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