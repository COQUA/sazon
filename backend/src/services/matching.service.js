import prisma from '../config/prisma.js';

/**
 * Obtiene emprendimientos sugeridos para un inversor basado en sus preferencias de categorías
 * @param {string} investorId 
 * @returns {Promise<Array>} 
 */
export async function getSuggestedVentures(investorId) {
  // Obtenemos las preferencias del inversor
  const preferences = await prisma.investorPreference.findMany({
    where: { investor_id: investorId }
  });

  // Si no tiene preferencias, no podemos sugerir nada
  if (preferences.length === 0) {
    return [];
  }

  // Obtenemos los IDs de categorías que prefiere el inversor
  const preferredCategoryIds = preferences.map(pref => pref.category_id);

  // Obtenemos los IDs de ventures con los que ya tiene conexión
  const connections = await prisma.connection.findMany({
    where: { investor_id: investorId }
  });
  const connectedVentureIds = connections.map(conn => conn.venture_id);

  // Buscamos ventures que:
  // 1. Tengan al menos una categoría que coincida con las preferencias
  // 2. No tengan ya una conexión con este inversor
  const suggestedVentures = await prisma.venture.findMany({
    where: {
      AND: [
        {
          ventureCategories: {
            some: {
              category_id: {
                in: preferredCategoryIds
              }
            }
          }
        },
        {
          ventureId: {
            notIn: connectedVentureIds
          }
        }
      ]
    },
    include: {
      entrepreneur: {
        select: {
          userId: true,
          name: true,
          email: true
        }
      },
      ventureCategories: {
        include: {
          category: true
        }
      }
    },
    // Mezclamos los resultados para darle el efecto "swipe" tipo Tinder
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Simplificamos la estructura de los datos para facilitar su uso en el frontend
  return suggestedVentures.map(venture => ({
    id: venture.ventureId,
    name: venture.name,
    summary: venture.summary,
    location: venture.location,
    website: venture.website,
    entrepreneur: {
      id: venture.entrepreneur.userId,
      name: venture.entrepreneur.name,
      email: venture.entrepreneur.email
    },
    categories: venture.ventureCategories.map(vc => ({
      id: vc.category.categoryId,
      name: vc.category.name
    }))
  }));
}

/**
 * Crea una conexión (like) entre un inversor y un emprendimiento
 * @param {string} investorId - ID del inversor
 * @param {string} ventureId - ID del emprendimiento
 * @returns {Promise<Object>} Conexión creada
 */
export async function createConnection(investorId, ventureId) {
  // Verificamos que el emprendimiento exista
  const venture = await prisma.venture.findUnique({
    where: { ventureId }
  });

  if (!venture) {
    throw new Error('Emprendimiento no encontrado');
  }

  // Verificamos que no exista ya una conexión
  const existingConnection = await prisma.connection.findFirst({
    where: {
      investor_id: investorId,
      venture_id: ventureId
    }
  });

  if (existingConnection) {
    throw new Error('Ya existe una conexión con este emprendimiento');
  }

  // Creamos la conexión
  const connection = await prisma.connection.create({
    data: {
      investor_id: investorId,
      venture_id: ventureId
    },
    include: {
      venture: {
        include: {
          entrepreneur: true,
          ventureCategories: {
            include: {
              category: true
            }
          }
        }
      }
    }
  });

  return connection;
}

/**
 * Obtiene las conexiones (matches) de un inversor
 * @param {string} investorId - ID del inversor
 * @returns {Promise<Array>} Lista de conexiones
 */
export async function getInvestorConnections(investorId) {
  const connections = await prisma.connection.findMany({
    where: { investor_id: investorId },
    include: {
      venture: {
        include: {
          entrepreneur: {
            select: {
              userId: true,
              name: true,
              email: true
            }
          },
          ventureCategories: {
            include: {
              category: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Simplificamos la estructura para el frontend
  return connections.map(conn => ({
    id: conn.id,
    createdAt: conn.createdAt,
    venture: {
      id: conn.venture.ventureId,
      name: conn.venture.name,
      summary: conn.venture.summary,
      location: conn.venture.location,
      website: conn.venture.website,
      entrepreneur: {
        id: conn.venture.entrepreneur.userId,
        name: conn.venture.entrepreneur.name,
        email: conn.venture.entrepreneur.email
      },
      categories: conn.venture.ventureCategories.map(vc => ({
        id: vc.category.categoryId,
        name: vc.category.name
      }))
    }
  }));
}