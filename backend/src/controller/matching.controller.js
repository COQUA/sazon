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
    // Convertir BigInt a string en toda la respuesta
    function convertBigInts(obj) {
      if (Array.isArray(obj)) return obj.map(convertBigInts);
      if (obj && typeof obj === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(obj)) {
          if (typeof v === 'bigint') out[k] = v.toString();
          else if (Array.isArray(v) || (v && typeof v === 'object')) out[k] = convertBigInts(v);
          else out[k] = v;
        }
        return out;
      }
      return obj;
    }
    res.status(201).json(convertBigInts(result));
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