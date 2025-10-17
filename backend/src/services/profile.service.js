import prisma from '../config/prisma.js';

// Servicios para perfiles de emprendedor
export async function getEntrepreneurProfile(userId) {
  return await prisma.entrepreneurProfile.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        select: {
          user_id: true,
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
  
  // Verificar si ya existe un perfil para este usuario
  const existingProfile = await prisma.entrepreneurProfile.findUnique({
    where: { user_id: userId }
  });
  
  if (existingProfile) {
    throw new Error('Ya existe un perfil para este usuario');
  }
  
  return await prisma.entrepreneurProfile.create({
    data: {
      user_id: userId,
      name_given: nameGiven,
      surname,
      dni,
      date_of_birth: dateOfBirth ? new Date(dateOfBirth) : null
    },
    include: {
      user: {
        select: {
          user_id: true,
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
  
  // Verificar si existe el perfil
  const existingProfile = await prisma.entrepreneurProfile.findUnique({
    where: { user_id: userId }
  });
  
  if (!existingProfile) {
    return null;
  }
  
  return await prisma.entrepreneurProfile.update({
    where: { user_id: userId },
    data: {
      name_given: nameGiven,
      surname,
      dni,
      date_of_birth: dateOfBirth ? new Date(dateOfBirth) : undefined
    },
    include: {
      user: {
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

// Servicios para perfiles de inversor
export async function getInvestorProfile(userId) {
  return await prisma.investorProfile.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function createInvestorProfile(userId, profileData) {
  const {
    enrollmentNumber,
    cuitOrCuil,
    lastNameCompanyName,
    ticketMin,
    ticketMax
  } = profileData;
  
  // Verificar si ya existe un perfil para este usuario
  const existingProfile = await prisma.investorProfile.findUnique({
    where: { user_id: userId }
  });
  
  if (existingProfile) {
    throw new Error('Ya existe un perfil para este usuario');
  }
  
  return await prisma.investorProfile.create({
    data: {
      user_id: userId,
      enrollment_number: enrollmentNumber,
      cuit_or_cuil: cuitOrCuil,
      last_name_company_name: lastNameCompanyName,
      ticket_min: ticketMin ? parseInt(ticketMin) : null,
      ticket_max: ticketMax ? parseInt(ticketMax) : null
    },
    include: {
      user: {
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function updateInvestorProfile(userId, profileData) {
  const {
    enrollmentNumber,
    cuitOrCuil,
    lastNameCompanyName,
    ticketMin,
    ticketMax
  } = profileData;
  
  // Verificar si existe el perfil
  const existingProfile = await prisma.investorProfile.findUnique({
    where: { user_id: userId }
  });
  
  if (!existingProfile) {
    return null;
  }
  
  return await prisma.investorProfile.update({
    where: { user_id: userId },
    data: {
      enrollment_number: enrollmentNumber,
      cuit_or_cuil: cuitOrCuil,
      last_name_company_name: lastNameCompanyName,
      ticket_min: ticketMin ? parseInt(ticketMin) : undefined,
      ticket_max: ticketMax ? parseInt(ticketMax) : undefined
    },
    include: {
      user: {
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
}