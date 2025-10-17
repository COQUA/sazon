import prisma from '../config/prisma.js';


export async function getEntrepreneurProfile(userId) {
  return await prisma.entrepreneurProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function createEntrepreneurProfile(userId, profileData) {
  const { nameGiven, surname, dni, dateOfBirth } = profileData;
  
  const existingProfile = await prisma.entrepreneurProfile.findUnique({
    where: { userId }
  });
  
  if (existingProfile) {
    throw new Error('Ya existe un perfil para este usuario');
  }
  
  return await prisma.entrepreneurProfile.create({
    data: {
      userId,
      nameGiven,
      surname,
      dni,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
    },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function updateEntrepreneurProfile(userId, profileData) {
  const { nameGiven, surname, dni, dateOfBirth } = profileData;
  

  const existingProfile = await prisma.entrepreneurProfile.findUnique({
    where: { userId }
  });
  
  if (!existingProfile) {
    return null;
  }
  
  return await prisma.entrepreneurProfile.update({
    where: { userId },
    data: {
      nameGiven,
      surname,
      dni,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined
    },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}


export async function getInvestorProfile(userId) {

  const profile = await prisma.investorProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  
  if (!profile) {
    return null;
  }
  
  const preferences = await prisma.investorPreference.findMany({
    where: { investorId: userId },
    include: {
      category: true
    }
  });
  
  return {
    ...profile,
    preferences: preferences.map(pref => ({
      categoryId: pref.category.categoryId?.toString(),
      name: pref.category.name
    }))
  };
}

export async function createInvestorProfile(userId, profileData) {
  const {
    enrollmentNumber,
    cuitOrCuil,
    lastNameCompanyName,
    ticketMin,
    ticketMax,
    categoryPreferences 
  } = profileData;
  

  const existingProfile = await prisma.investorProfile.findUnique({
    where: { userId }
  });
  
  if (existingProfile) {
    throw new Error('Ya existe un perfil para este usuario');
  }
  

  return await prisma.$transaction(async (prisma) => {
    const profile = await prisma.investorProfile.create({
      data: {
        userId,
        enrollmentNumber,
        cuitOrCuil,
        lastNameCompanyName,
        ticketMin: ticketMin ? parseInt(ticketMin) : null,
        ticketMax: ticketMax ? parseInt(ticketMax) : null
      },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    if (categoryPreferences && categoryPreferences.length > 0) {
      const categories = await prisma.category.findMany({
        where: {
          categoryId: {
            in: categoryPreferences.map(id => BigInt(id))
          }
        }
      });
      if (categories.length !== categoryPreferences.length) {
        throw new Error('Una o más categorías seleccionadas no existen');
      }
      await Promise.all(categoryPreferences.map(categoryId => 
        prisma.investorPreference.create({
          data: {
            investorId: userId,
            categoryId: BigInt(categoryId)
          }
        })
      ));
    }
    const preferences = await prisma.investorPreference.findMany({
      where: { investorId: userId },
      include: {
        category: true
      }
    });
    return {
      ...profile,
      preferences: preferences.map(pref => ({
        categoryId: pref.category.categoryId?.toString(),
        name: pref.category.name
      }))
    };
  });
}

export async function updateInvestorProfile(userId, profileData) {
  const {
    enrollmentNumber,
    cuitOrCuil,
    lastNameCompanyName,
    ticketMin,
    ticketMax,
    categoryPreferences
  } = profileData;
  

  const existingProfile = await prisma.investorProfile.findUnique({
    where: { userId }
  });
  
  if (!existingProfile) {
    return null;
  }
  
 
  return await prisma.$transaction(async (prisma) => {
    const updatedProfile = await prisma.investorProfile.update({
      where: { userId },
      data: {
        enrollmentNumber,
        cuitOrCuil,
        lastNameCompanyName,
        ticketMin: ticketMin ? parseInt(ticketMin) : undefined,
        ticketMax: ticketMax ? parseInt(ticketMax) : undefined
      },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    if (categoryPreferences !== undefined) {
      await prisma.investorPreference.deleteMany({
        where: { investorId: userId }
      });
      if (categoryPreferences && categoryPreferences.length > 0) {
        const categories = await prisma.category.findMany({
          where: {
            categoryId: {
              in: categoryPreferences.map(id => BigInt(id))
            }
          }
        });
        if (categories.length !== categoryPreferences.length) {
          throw new Error('Una o más categorías seleccionadas no existen');
        }
        await Promise.all(categoryPreferences.map(categoryId => 
          prisma.investorPreference.create({
            data: {
              investorId: userId,
              categoryId: BigInt(categoryId)
            }
          })
        ));
      }
    }
    const preferences = await prisma.investorPreference.findMany({
      where: { investorId: userId },
      include: {
        category: true
      }
    });
    return {
      ...updatedProfile,
      preferences: preferences.map(pref => ({
        categoryId: pref.category.categoryId?.toString(),
        name: pref.category.name
      }))
    };
  });
}

/**
 * Obtiene las preferencias de categorías de un inversor
 * @param {string} userId 
 * @returns {Promise<Array>} 
 */
export async function getInvestorCategoryPreferences(userId) {

  const user = await prisma.user.findUnique({
    where: { userId }
  });
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  if (user.role !== 'investor') {
    throw new Error('El usuario no es un inversor');
  }
  

  const preferences = await prisma.investorPreference.findMany({
    where: { investorId: userId },
    include: {
      category: true
    }
  });
  return preferences.map(pref => ({
    categoryId: pref.category.categoryId?.toString(),
    name: pref.category.name
  }));
}

/**
 * Actualiza las preferencias de categorías de un inversor
 * @param {string} userId
 * @param {Array} categoryIds 
 * @returns {Promise<Array>}
 */
export async function updateInvestorCategoryPreferences(userId, categoryIds) {

  const user = await prisma.user.findUnique({
    where: { userId }
  });
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  if (user.role !== 'investor') {
    throw new Error('El usuario no es un inversor');
  }
  

  const profile = await prisma.investorProfile.findUnique({
    where: { userId }
  });
  
  if (!profile) {
    throw new Error('El inversor no tiene un perfil creado');
  }
  

  return await prisma.$transaction(async (prisma) => {
    await prisma.investorPreference.deleteMany({
      where: { investorId: userId }
    });
    if (categoryIds && categoryIds.length > 0) {
      const categories = await prisma.category.findMany({
        where: {
          categoryId: {
            in: categoryIds.map(id => BigInt(id))
          }
        }
      });
      if (categories.length !== categoryIds.length) {
        throw new Error('Una o más categorías seleccionadas no existen');
      }
      await Promise.all(categoryIds.map(categoryId => 
        prisma.investorPreference.create({
          data: {
            investorId: userId,
            categoryId: BigInt(categoryId)
          }
        })
      ));
    }
    const updatedPreferences = await prisma.investorPreference.findMany({
      where: { investorId: userId },
      include: {
        category: true
      }
    });
    return updatedPreferences.map(pref => ({
      categoryId: pref.category.categoryId?.toString(),
      name: pref.category.name
    }));
  });
}