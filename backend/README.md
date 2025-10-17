# Backend reutilizable (JS) — Hackathon starter

Este repositorio contiene un backend ligero en JavaScript (ESM) preparado para usarse con una base de datos PostgreSQL (ej. Supabase) y Prisma como ORM. Incluye rutas CRUD para `items` y un flujo básico de autenticación (registro/login) con bcrypt + JWT.

## Estado actual
 - Registro y login funcionando
 - POST y PUT de perfil de emprendedor funcionando
 - POST y PUT de perfil de inversor funcionando
 - PUT de preferencias de inversor funcionando (solo para rol admin e inversor)
## Endpoints principales

- GET `/api/health` — healthcheck
- Items (CRUD)
  - GET `/api/items` — listar items
  - POST `/api/items` — crear item
    - Body JSON: `{ "name": "Mi item", "description": "opcional" }`
  - GET `/api/items/:id` — obtener por id
  - PUT `/api/items/:id` — actualizar (body JSON con campos a actualizar)
  - DELETE `/api/items/:id` — eliminar

- Auth
  - POST `/api/auth/register` — registrar (body: `{ "email": "...", "password": "..." }`)
  - POST `/api/auth/login` — login (retorna JWT)

- Perfiles de emprendedor
  - GET `/api/profiles/entrepreneur/:userId` — obtener perfil de emprendedor
  - POST `/api/profiles/entrepreneur/:userId` — crear perfil de emprendedor
    - Body JSON: `{ "nameGiven": "Juan", "surname": "Pérez", "dni": "12345678", "dateOfBirth": "1990-05-15" }`
  - PUT `/api/profiles/entrepreneur/:userId` — actualizar perfil de emprendedor
    - Body JSON: campos a actualizar

- Perfiles de inversor
  - GET `/api/profiles/investor/:userId` — obtener perfil de inversor
  - POST `/api/profiles/investor/:userId` — crear perfil de inversor
    - Body JSON: `{ "enrollmentNumber": "...", "cuitOrCuil": "...", "lastNameCompanyName": "...", "ticketMin": 1000, "ticketMax": 5000, "categoryPreferences": ["1", "2"] }`
  - PUT `/api/profiles/investor/:userId` — actualizar perfil de inversor
    - Body JSON: campos a actualizar

- Preferencias de inversor
  - GET `/api/profiles/investor/:userId/preferences` — obtener preferencias de categorías
  - PUT `/api/profiles/investor/:userId/preferences` — actualizar preferencias de categorías
    - Body JSON: `{ "categoryIds": ["1", "2", "3"] }`
    - Solo accesible para rol admin e inversor
# Backend reutilizable (JS) — Hackathon starter

Este repositorio contiene un backend ligero en JavaScript (ESM) preparado para usarse con una base de datos PostgreSQL (ej. Supabase) y Prisma como ORM. Incluye rutas CRUD para `items` y un flujo básico de autenticación (registro/login) con bcrypt + JWT.

## Requisitos
- Node.js 18+ (o 20+ recomendado)
- Cuenta y proyecto en Supabase (o cualquier Postgres accesible)
- Git (para versionar y push)

## Estructura rápida
- `src/` — código fuente (config, controllers, services, routes, middleware)
- `prisma/schema.prisma` — esquema Prisma
- `generated/prisma` — cliente Prisma generado (incluye `query_engine` para Windows)
- `.env.example` — ejemplo de variables de entorno

## Variables de entorno (.env)
Copia `.env.example` a `.env` y completa los valores. Mínimo requerido:

```env
PORT=4000
JWT_SECRET=una_clave_larga_y_segura
DATABASE_URL="postgresql://usuario:contraseña@HOST:PUERTO/nombre_db"
# Opcional: usar el pooler (pgbouncer) en Supabase (puerto 6543) para runtime. Para migraciones/prisma db push prefiero la conexión directa (5432).
```

IMPORTANTE: No subas tu `.env` al repositorio. Asegúrate de que `.gitignore` contiene `.env`.

## Preparar dependencias y Prisma

1. Instala dependencias:

```bash
npm install
```

2. Genera el cliente Prisma (después de ajustar `prisma/schema.prisma` si es necesario):

```bash
npx prisma generate
```

3. Sincronizar esquema con la base de datos (opcional):

```bash
# Si tu proyecto usa pgbouncer/pooler en Supabase puede fallar. Si no, intenta:
npx prisma db push

# Si db push falla por el pooler, crea las tablas manualmente en Supabase SQL editor (ver sección SQL ejemplo abajo)
```


## SQL de ejemplo (crear tabla `items` y `users`)
Si prefieres crear las tablas manualmente (recomendado si `db push` falla con pgbouncer), pega esto en el editor SQL de Supabase o ejecútalo en tu cliente Postgres:

```sql
-- items
CREATE TABLE IF NOT EXISTS public.items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- users (para auth básico)
CREATE TABLE IF NOT EXISTS public.users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```


Después de cualquier cambio en `schema.prisma`, ejecuta `npx prisma generate`.

## Ejecutar la aplicación

```bash
# en desarrollo (con nodemon si está instalado)
npm run dev

# o en producción
npm start
```

Por defecto la app escucha en el puerto definido en `PORT` (ej. 4000).

## Endpoints principales

- GET `/api/health` — healthcheck
- Items (CRUD)
  - GET `/api/items` — listar items
  - POST `/api/items` — crear item
    - Body JSON: `{ "name": "Mi item", "description": "opcional" }`
  - GET `/api/items/:id` — obtener por id
  - PUT `/api/items/:id` — actualizar (body JSON con campos a actualizar)
  - DELETE `/api/items/:id` — eliminar

- Auth
  - POST `/api/auth/register` — registrar (body: `{ "email": "...", "password": "..." }`)
  - POST `/api/auth/login` — login (retorna JWT)

Ejemplos rápidos con curl:

```bash
# crear item
curl -X POST http://localhost:4000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"desc"}'

# login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"secret"}'
```

## Próximos pasos y mejoras recomendadas

- Añadir validación de request (p. ej. con zod) en controllers.
- Añadir pruebas unitarias mínimas (supertest + jest/vitest) para endpoints críticos.
- Añadir políticas CORS/helmet/rate-limit en `app.js` si vas a exponer la API.
- (Opcional) Migraciones controladas con `prisma migrate` en un entorno sin pgbouncer.

--