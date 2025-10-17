# Backend reutilizable (JS) — Hackathon starter

Este repositorio contiene un backend ligero en JavaScript (ESM) preparado para usarse con una base de datos PostgreSQL (ej. Supabase) y Prisma como ORM. Incluye rutas CRUD para `items` y un flujo básico de autenticación (registro/login) con bcrypt + JWT.

## Estado actual del proyecto

### ✅ Completado
- ✅ Registro y login funcionando
- ✅ POST y PUT de perfil de emprendedor funcionando
- ✅ POST y PUT de perfil de inversor funcionando
- ✅ PUT de preferencias de inversor funcionando (solo para rol admin e inversor)
- ✅ CRUD completo de ventures (GET, POST, PUT, DELETE)
- ✅ CRUD completo de categorías (GET, POST, PUT, DELETE)
- ✅ Sistema de matching/sugerencias para inversores
- ✅ Sistema de conexiones (likes) entre inversores y ventures
- ✅ Gestión de categorías de ventures
- ✅ Autenticación con JWT y middleware de protección de rutas
- ✅ Validación de permisos por rol (admin, entrepreneur, investor)

### 📋 Estructura del proyecto

```
backend/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── config/
│   │   ├── env.js            # Configuración de variables de entorno
│   │   ├── prisma.js         # Cliente de Prisma
│   │   └── swagger.js        # Configuración de Swagger (si se usa)
│   ├── controller/           # Controladores de las rutas
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── matching.controller.js
│   │   ├── profile.controller.js
│   │   ├── venture.controller.js
│   │   └── venture.category.controller.js
│   ├── services/             # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── matching.service.js
│   │   ├── profile.service.js
│   │   ├── venture.service.js
│   │   └── venture.category.service.js
│   ├── routes/               # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── matching.routes.js
│   │   ├── profile.routes.js
│   │   ├── venture.routes.js
│   │   └── index.js
│   ├── middleware/
│   │   └── errorHandler.js   # Manejador global de errores
│   ├── app.js                # Configuración de Express
│   └── index.js              # Punto de entrada
├── package.json
└── README.md
```

## Endpoints principales

### 🏥 Health Check
- `GET /api/health` — healthcheck

### 🔐 Autenticación
- `POST /api/auth/register` — Registrar usuario
  - Body: `{ "email": "...", "password": "...", "name": "...", "role": "entrepreneur|investor|admin" }`
- `POST /api/auth/login` — Login
  - Body: `{ "email": "...", "password": "..." }`
  - Retorna: `{ user, token }`

### 👤 Perfiles de Emprendedor
- `GET /api/profiles/entrepreneur/:userId` — Obtener perfil
- `POST /api/profiles/entrepreneur/:userId` — Crear perfil
  - Body: `{ "nameGiven": "Juan", "surname": "Pérez", "dni": "12345678", "dateOfBirth": "1990-05-15" }`
- `PUT /api/profiles/entrepreneur/:userId` — Actualizar perfil

### 💼 Perfiles de Inversor
- `GET /api/profiles/investor/:userId` — Obtener perfil
- `POST /api/profiles/investor/:userId` — Crear perfil
  - Body: `{ "enrollmentNumber": "...", "cuitOrCuil": "...", "lastNameCompanyName": "...", "ticketMin": 1000, "ticketMax": 5000, "categoryPreferences": ["1", "2"] }`
- `PUT /api/profiles/investor/:userId` — Actualizar perfil

### 📊 Preferencias de Inversor
- `GET /api/profiles/investor/:userId/preferences` — Obtener preferencias
- `PUT /api/profiles/investor/:userId/preferences` — Actualizar preferencias
  - Body: `{ "categoryIds": ["1", "2", "3"] }`

### 🚀 Ventures (Emprendimientos)
- `GET /api/ventures` — Listar todos los ventures (público)
- `GET /api/ventures/entrepreneur/:entrepreneurId` — Listar ventures de un emprendedor
- `POST /api/ventures` — Crear venture (requiere auth, solo entrepreneur/admin)
  - Body: Datos del venture + opcional `categoryIds: ["1", "2"]`
- `GET /api/ventures/:id` — Obtener venture por ID (requiere auth)
- `PUT /api/ventures/:id` — Actualizar venture (requiere auth, solo owner/admin)
  - Body: Campos a actualizar + opcional `categoryIds`
- `DELETE /api/ventures/:id` — Eliminar venture (requiere auth, solo owner/admin)

### 🏷️ Categorías de Ventures
- `GET /api/ventures/:ventureId/categories` — Obtener categorías de un venture
- `PUT /api/ventures/:ventureId/categories` — Actualizar categorías
  - Body: `{ "categoryIds": ["1", "2", "3"] }`

### 📁 Categorías
- `GET /api/categories` — Listar todas las categorías (público)
- `GET /api/categories/:categoryId` — Obtener categoría por ID
- `POST /api/categories` — Crear categoría (requiere auth admin)
  - Body: `{ "name": "Tecnología" }`
- `PUT /api/categories/:categoryId` — Actualizar categoría (requiere auth admin)
  - Body: `{ "name": "Nuevo nombre" }`
- `DELETE /api/categories/:categoryId` — Eliminar categoría (requiere auth admin)

### 🎯 Matching y Conexiones
- `GET /api/matching/suggestions` — Obtener ventures sugeridos para el inversor (requiere auth investor)
- `POST /api/matching/connections` — Crear conexión (like) con un venture
  - Body: `{ "ventureId": "..." }`
- `GET /api/matching/connections` — Obtener mis conexiones (requiere auth investor)

## Requisitos
- Node.js 18+ (o 20+ recomendado)
- Cuenta y proyecto en Supabase (o cualquier Postgres accesible)
- Git (para versionar y push)

## Variables de entorno (.env)

Copia `.env.example` a `.env` y completa los valores. Mínimo requerido:

```env
PORT=4000
JWT_SECRET=una_clave_larga_y_segura
DATABASE_URL="postgresql://usuario:contraseña@HOST:PUERTO/nombre_db"
```

**IMPORTANTE:** No subas tu `.env` al repositorio. Asegúrate de que `.gitignore` contiene `.env`.

## Preparar dependencias y Prisma

1. Instala dependencias:

```bash
npm install
```

2. Genera el cliente Prisma (después de ajustar `prisma/schema.prisma` si es necesario):

```bash
npx prisma generate
```

3. Sincronizar esquema con la base de datos:

```bash
# Si tu proyecto usa pgbouncer/pooler en Supabase puede fallar. Si no, intenta:
npx prisma db push
```

## Ejecutar la aplicación

```bash
# En desarrollo (con nodemon)
npm run dev

# En producción
npm start
```

Por defecto la app escucha en el puerto definido en `PORT` (ej. 4000).

## 🔑 Autenticación y Autorización

### Sistema de Roles
El sistema implementa 3 roles:
- **admin**: Acceso completo a todas las funcionalidades
- **entrepreneur**: Puede crear y gestionar sus propios ventures
- **investor**: Puede ver ventures, crear conexiones y gestionar preferencias

### Middleware de Autenticación
Todas las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

### Permisos por Endpoint
- **Públicos**: Health check, listar ventures/categorías
- **Autenticados**: Ver detalles de ventures
- **Entrepreneur**: Crear/editar/eliminar sus ventures
- **Investor**: Ver sugerencias, crear conexiones
- **Admin**: Acceso total + gestión de categorías

## 📊 Modelo de Datos

### Entidades Principales
- **User**: Usuario base con email, password y rol
- **EntrepreneurProfile**: Perfil extendido de emprendedor
- **InvestorProfile**: Perfil extendido de inversor con tickets
- **Venture**: Emprendimiento con toda su información
- **Category**: Categorías para clasificar ventures
- **VentureCategory**: Relación N:N entre ventures y categorías
- **InvestorPreference**: Preferencias de categorías del inversor
- **Connection**: Conexiones (likes) entre inversores y ventures

## 🔄 Flujo de Trabajo Típico

### Para Emprendedores
1. Registrarse como entrepreneur
2. Crear perfil de emprendedor
3. Crear venture(s)
4. Asignar categorías al venture
5. Esperar conexiones de inversores

### Para Inversores
1. Registrarse como investor
2. Crear perfil de inversor
3. Configurar preferencias de categorías
4. Ver sugerencias de ventures
5. Crear conexiones con ventures de interés

## 🧪 Ejemplos de Uso

### Registro y Login
```bash
# Registrar entrepreneur
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "emprendedor@ejemplo.com",
    "password": "mipassword",
    "name": "Juan Pérez",
    "role": "entrepreneur"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "emprendedor@ejemplo.com",
    "password": "mipassword"
  }'
```

### Crear Venture
```bash
curl -X POST http://localhost:4000/api/ventures \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Mi Startup",
    "summary": "Revolucionamos el mercado",
    "location": "Buenos Aires",
    "amountRequested": 50000,
    "categoryIds": ["1", "2"]
  }'
```

### Actualizar Venture
```bash
curl -X PUT http://localhost:4000/api/ventures/<VENTURE_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Mi Startup Actualizada",
    "summary": "Nueva descripción",
    "amountRequested": 75000
  }'
```

### Eliminar Venture
```bash
curl -X DELETE http://localhost:4000/api/ventures/<VENTURE_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

## 🐛 Solución de Problemas

### Error: "No autorizado - Token no proporcionado"
- Asegúrate de incluir el header `Authorization: Bearer <token>`

### Error: "No autorizado para modificar este emprendimiento"
- Solo el owner del venture o un admin pueden modificarlo/eliminarlo

### Error: "Solo los emprendedores pueden crear emprendimientos"
- Verifica que el usuario tenga el rol `entrepreneur` o `admin`

### Error con BigInt en JSON
- Todos los campos BigInt se convierten automáticamente a string para JSON
- Al enviar IDs, usa strings: `"categoryIds": ["1", "2"]`

## 📝 Notas Técnicas

### Conversión de BigInt
El proyecto maneja automáticamente la conversión de BigInt a string para evitar errores de serialización JSON. Los IDs de categorías se manejan como BigInt internamente pero se retornan como strings.

### Transacciones
Las operaciones críticas (crear venture con categorías, actualizar categorías) usan transacciones de Prisma para garantizar consistencia de datos.

### Validación de Permisos
Cada endpoint valida:
1. Autenticación (token válido)
2. Rol del usuario
3. Ownership (si aplica)

## 🚀 Próximos Pasos y Mejoras Recomendadas

- [ ] Añadir validación de request con Zod en controllers
- [ ] Implementar pruebas unitarias (Jest/Vitest)
- [ ] Añadir rate limiting para endpoints públicos
- [ ] Implementar paginación en listados
- [ ] Añadir búsqueda y filtros avanzados
- [ ] Implementar notificaciones cuando hay match
- [ ] Añadir upload de imágenes (logo de venture)
- [ ] Documentación con Swagger/OpenAPI
- [ ] Logging estructurado
- [ ] Monitoreo y métricas

## 📄 Licencia

ISC

---

**¿Necesitas ayuda?** Revisa los logs de la consola o contacta al equipo de desarrollo.