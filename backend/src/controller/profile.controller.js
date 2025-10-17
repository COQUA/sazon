import * as service from '../services/profile.service.js';


export async function getEntrepreneurProfile(req, res, next) {
  try {
    const { userId } = req.params;
    

    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este perfil' });
    }
    
    const profile = await service.getEntrepreneurProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    
    res.json(profile);
  } catch (error) { next(error); }
}

export async function createEntrepreneurProfile(req, res, next) {
  try {
    const { userId } = req.params;
    if (req.user.role !== 'admin' && req.user.role !== 'entrepreneur') {
      return res.status(403).json({ error: 'Solo administradores o emprendedores pueden crear este perfil' });
    }
    const profileData = req.body;
    const result = await service.createEntrepreneurProfile(userId, profileData);
    res.status(201).json(result);
  } catch (error) { next(error); }
}

export async function updateEntrepreneurProfile(req, res, next) {
  try {
    const { userId } = req.params;
    
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para actualizar este perfil' });
    }
    
    const profileData = req.body;
    const result = await service.updateEntrepreneurProfile(userId, profileData);
    
    if (!result) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    
    res.json(result);
  } catch (error) { next(error); }
}

// Controladores para perfiles de inversor
export async function getInvestorProfile(req, res, next) {
  try {
    const { userId } = req.params;
    
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este perfil' });
    }
    
    const profile = await service.getInvestorProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    
    res.json(profile);
  } catch (error) { next(error); }
}

export async function createInvestorProfile(req, res, next) {
  try {
     const { userId } = req.params;
    if (req.user.role !== 'admin' && req.user.role !== 'investor') {
      return res.status(403).json({ error: 'Solo administradores o inversores pueden crear este perfil' });
    }
    
    const profileData = req.body;
    const result = await service.createInvestorProfile(userId, profileData);
    res.status(201).json(result);
  } catch (error) { next(error); }
}

export async function updateInvestorProfile(req, res, next) {
  try {
    const { userId } = req.params;
    
    if (req.user.sub !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para actualizar este perfil' });
    }
    
    const profileData = req.body;
    const result = await service.updateInvestorProfile(userId, profileData);
    
    if (!result) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    
    res.json(result);
  } catch (error) { next(error); }
}


export async function getInvestorCategoryPreferences(req, res, next) {
  try {
    const { userId } = req.params;

    if (req.user.sub !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para acceder a estas preferencias' });
    }
    
    const preferences = await service.getInvestorCategoryPreferences(userId);
    res.json(preferences);
  } catch (error) { next(error); }
}

export async function updateInvestorCategoryPreferences(req, res, next) {
  try {
    const { userId } = req.params;
    
    if (req.user.sub !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para actualizar estas preferencias' });
    }
    
    const { categoryIds } = req.body;
    
    if (!categoryIds || !Array.isArray(categoryIds)) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs de categorías' });
    }
    
    const preferences = await service.updateInvestorCategoryPreferences(userId, categoryIds);
    res.json(preferences);
  } catch (error) { next(error); }
}