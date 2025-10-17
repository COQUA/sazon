import * as service from '../services/matching.service.js';

export async function getSuggestedVentures(req, res, next) {
  try {

    const userId = req.user.userId;
    
    if (req.user.role !== 'investor' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Solo los inversores pueden ver sugerencias' });
    }
    
    const ventures = await service.getSuggestedVentures(userId);
    res.json(ventures);
  } catch (error) { next(error); }
}


export async function createConnection(req, res, next) {
  try {
    const { ventureId } = req.body;
    const investorId = req.user.userId;
    
    if (req.user.role !== 'investor') {
      return res.status(403).json({ error: 'Solo los inversores pueden crear conexiones' });
    }
    
    if (!ventureId) {
      return res.status(400).json({ error: 'Se requiere el ID del emprendimiento' });
    }
    
    const result = await service.createConnection(investorId, ventureId);
    res.status(201).json(result);
  } catch (error) { next(error); }
}

export async function getMyConnections(req, res, next) {
  try {
    const investorId = req.user.userId;
    

    if (req.user.role !== 'investor' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para ver estas conexiones' });
    }
    
    const connections = await service.getInvestorConnections(investorId);
    res.json(connections);
  } catch (error) { next(error); }
}