# 🧪 Guía Rápida de Pruebas con Postman

## 📥 Importar la Colección

1. **Abre Postman**
2. **Importar colección:**
   - Click en "Import" (esquina superior izquierda)
   - Arrastra el archivo `Sazon-Backend-API.postman_collection.json`
   - O click en "Upload Files" y selecciona el archivo
   - Click en "Import"

3. **Crear Environment (opcional pero recomendado):**
   - Click en "Environments" (icono de ojo en la esquina superior derecha)
   - Click en "Create Environment" o el botón "+"
   - Nombre: `Sazon Local`
   - Agrega estas variables (se llenarán automáticamente):
     ```
     base_url: http://localhost:4000/api
     admin_token: (se llenará automáticamente)
     admin_userId: (se llenará automáticamente)
     entrepreneur_token: (se llenará automáticamente)
     entrepreneur_userId: (se llenará automáticamente)
     investor_token: (se llenará automáticamente)
     investor_userId: (se llenará automáticamente)
     venture_id: (se llenará automáticamente)
     category_id_1: (se llenará automáticamente)
     category_id_2: (se llenará automáticamente)
     category_id_3: (se llenará automáticamente)
     ```
   - Click "Save"
   - Selecciona el environment "Sazon Local" del dropdown

## 🚀 Pasos para Probar

### PASO 0: Iniciar el Backend
```bash
cd backend
npm run dev
```

### PASO 1: Ejecutar Health Check
- En la carpeta "🏥 Health Check"
- Click en "Health Check"
- Click en "Send"
- ✅ Debes ver: `{"status": "ok"}`

### PASO 2: Crear Usuarios (Autenticación)
Ejecuta **EN ORDEN** los requests de la carpeta "🔐 Autenticación":

1. **"1. Registrar Admin"** - Click "Send"
   - ✅ El token se guardará automáticamente en `{{admin_token}}`
   
2. **"2. Registrar Emprendedor"** - Click "Send"
   - ✅ El token se guardará automáticamente en `{{entrepreneur_token}}`
   
3. **"3. Registrar Inversor"** - Click "Send"
   - ✅ El token se guardará automáticamente en `{{investor_token}}`

> **Nota:** Si ya existen, usa "Login (cualquier usuario)" para obtener el token

### PASO 3: Crear Categorías
En la carpeta "📁 Categorías", ejecuta:

1. "Crear Categoría - Tecnología"
2. "Crear Categoría - Alimentos"
3. "Crear Categoría - Moda"
4. "Crear Categoría - Salud"

Luego verifica con: **"Listar Categorías"**

### PASO 4: Crear Perfiles
En la carpeta "👤 Perfiles":

1. **"Crear Perfil Emprendedor"** - Click "Send"
2. **"Crear Perfil Inversor"** - Click "Send"

### PASO 5: Probar CRUD de Ventures

En la carpeta "🚀 Ventures (CRUD Completo)":

#### ✅ CREATE (POST)
1. **"Crear Venture"** - Click "Send"
   - ✅ El `venture_id` se guarda automáticamente
   - Verifica que la respuesta tenga status 201

#### ✅ READ (GET)
2. **"Obtener Venture por ID"** - Click "Send"
   - Verifica todos los campos del venture

3. **"Listar Todos los Ventures"** - Click "Send"
   - Verifica que aparezca tu venture en la lista

#### ✅ UPDATE (PUT) - ¡LO QUE SE CORRIGIÓ!
4. **"✅ Actualizar Venture (PUT) - Completo"** - Click "Send"
   - Actualiza múltiples campos incluyendo categorías
   - Verifica que los cambios se reflejen en la respuesta

5. **"✅ Actualizar Venture (PUT) - Solo algunos campos"** - Click "Send"
   - Actualiza solo 2 campos
   - Verifica que los demás campos NO cambien

#### ✅ DELETE - ¡LO QUE SE CORRIGIÓ!
6. **"✅ Eliminar Venture (DELETE)"** - Click "Send"
   - ✅ Debe retornar status 204 (No Content)
   - Luego intenta hacer GET del venture
   - ❌ Debe dar error 404

### PASO 6: Pruebas de Categorías de Ventures

En la carpeta "🏷️ Categorías de Ventures":

1. Primero crea otro venture (repite paso 5.1)
2. **"Ver Categorías del Venture"**
3. **"Actualizar Categorías del Venture"**
   - Cambia las categorías
   - Verifica que se actualicen correctamente

### PASO 7: Probar Matching

En la carpeta "🎯 Matching y Conexiones":

1. **"Ver Sugerencias (Investor)"** - Click "Send"
   - Debe mostrar ventures que coincidan con las preferencias del inversor

2. **"Crear Conexión (Like)"** - Click "Send"
   - Crea un "like" al venture

3. **"Ver Mis Conexiones"** - Click "Send"
   - Debe mostrar el venture con el que conectaste

### PASO 8: Pruebas de Seguridad 🔒

En la carpeta "🔒 Pruebas de Seguridad":

1. **"❌ Crear Venture sin Token"**
   - ❌ Debe dar error 401

2. **"❌ Inversor intenta crear Venture"**
   - ❌ Debe dar error 403

3. **"❌ Inversor intenta eliminar Venture"**
   - ❌ Debe dar error 403

## 📊 Casos de Prueba para PUT y DELETE

### ✅ Pruebas de PUT (Actualizar)

#### Caso 1: Actualización completa
```json
{
  "name": "Nuevo nombre completo",
  "summary": "Nueva descripción",
  "location": "Nueva ubicación",
  "amountRequested": 200000,
  "equityOffered": 10.0,
  "valuation": 2000000,
  "categoryIds": ["1", "3"]
}
```
**Esperar:** Todos los campos actualizados

#### Caso 2: Actualización parcial
```json
{
  "name": "Solo cambio el nombre",
  "amountRequested": 125000
}
```
**Esperar:** Solo esos 2 campos cambian, los demás se mantienen

#### Caso 3: Solo cambiar categorías
```json
{
  "categoryIds": ["2", "3", "4"]
}
```
**Esperar:** Solo las categorías cambian

#### Caso 4: Sin categorías (opcional)
```json
{
  "name": "Actualización sin tocar categorías"
}
```
**Esperar:** Las categorías actuales se mantienen

### ✅ Pruebas de DELETE (Eliminar)

#### Caso 1: Eliminar propio venture (Entrepreneur)
- Token: `{{entrepreneur_token}}`
- **Esperar:** 204 No Content ✅

#### Caso 2: Admin elimina cualquier venture
- Token: `{{admin_token}}`
- **Esperar:** 204 No Content ✅

#### Caso 3: Inversor intenta eliminar (debe fallar)
- Token: `{{investor_token}}`
- **Esperar:** 403 Forbidden ❌

#### Caso 4: Eliminar venture inexistente
- URL: `/ventures/uuid-que-no-existe`
- **Esperar:** 404 Not Found ❌

#### Caso 5: Eliminar sin autenticación
- Sin header Authorization
- **Esperar:** 401 Unauthorized ❌

## 🎯 Verificaciones Importantes

### Después de PUT:
1. Hacer GET del venture
2. Verificar que los campos actualizados estén correctos
3. Verificar que los campos NO actualizados se mantengan
4. Si actualizaste categorías, verificar con GET `/ventures/:id/categories`

### Después de DELETE:
1. Intentar hacer GET del venture eliminado
2. Debe dar 404
3. Listar todos los ventures - no debe aparecer
4. Las categorías asociadas deben haberse eliminado (en cascada)

## 🔍 Tips de Depuración

### Ver los tokens guardados:
- Click en el ícono del ojo 👁️ (esquina superior derecha)
- Verás todas las variables del environment
- Copia los tokens si necesitas usarlos en otra herramienta

### Si un request falla:
1. **Revisa el Console** (abajo de Postman)
2. **Verifica el status code:**
   - 200/201: OK ✅
   - 204: No Content (DELETE exitoso) ✅
   - 400: Bad Request (datos inválidos) ❌
   - 401: No autorizado (token inválido) ❌
   - 403: Prohibido (sin permisos) ❌
   - 404: No encontrado ❌
   - 500: Error del servidor ❌

3. **Revisa el body de la respuesta** - tiene el mensaje de error

### Variables no se llenan automáticamente:
- Asegúrate de tener seleccionado el environment "Sazon Local"
- Ejecuta los requests en orden
- Los scripts en la pestaña "Tests" se encargan de guardar los valores

## 📝 Orden Recomendado de Ejecución

1. ✅ Health Check
2. ✅ Registrar usuarios (Admin, Entrepreneur, Investor)
3. ✅ Crear categorías (al menos 3)
4. ✅ Crear perfiles (Entrepreneur e Investor)
5. ✅ Crear venture
6. ✅ Actualizar venture (PUT)
7. ✅ Ver venture actualizado (GET)
8. ✅ Probar matching
9. ✅ Eliminar venture (DELETE)
10. ✅ Verificar que ya no existe (GET debe dar 404)

## 🎓 Ejemplos de Respuestas Esperadas

### POST Venture (201 Created):
```json
{
  "ventureId": "uuid-generado",
  "name": "Startup de IA Argentina",
  "summary": "Revolucionamos...",
  "entrepreneurId": "uuid-del-emprendedor",
  "amountRequested": 100000,
  "equityOffered": "15.5",
  "entrepreneur": {
    "userId": "...",
    "name": "Juan Emprendedor",
    "email": "emprendedor@sazon.com"
  },
  "ventureCategories": [
    {
      "category": {
        "categoryId": "1",
        "name": "Tecnología"
      }
    }
  ]
}
```

### PUT Venture (200 OK):
```json
{
  "ventureId": "mismo-uuid",
  "name": "Startup de IA Argentina ACTUALIZADA",
  "amountRequested": 150000,
  // ... campos actualizados
}
```

### DELETE Venture (204 No Content):
```
Sin body, solo status 204
```

## ⚡ Atajos de Teclado en Postman

- `Ctrl + Enter` / `Cmd + Enter`: Enviar request
- `Ctrl + S` / `Cmd + S`: Guardar request
- `Ctrl + K` / `Cmd + K`: Buscar requests

## 🆘 Solución de Problemas

### "Error: connect ECONNREFUSED"
- El backend no está corriendo
- Ejecuta: `npm run dev` en la carpeta backend

### "401 Unauthorized"
- El token expiró (duran 7 días)
- Vuelve a hacer login

### "No se pudo determinar el entrepreneurId"
- Registraste al usuario con el rol incorrecto
- Asegúrate de usar `"role": "entrepreneur"`

### "Venture no encontrado" al hacer PUT/DELETE
- El venture_id es incorrecto
- Verifica la variable `{{venture_id}}` en el environment

---

## ✅ Checklist de Pruebas Completadas

- [ ] Health check funcionando
- [ ] 3 usuarios registrados (admin, entrepreneur, investor)
- [ ] Tokens guardados automáticamente
- [ ] Al menos 3 categorías creadas
- [ ] Perfiles creados (entrepreneur e investor)
- [ ] **Venture creado (POST)** ✅
- [ ] **Venture actualizado (PUT)** ✅
- [ ] **Venture eliminado (DELETE)** ✅
- [ ] Matching funcionando
- [ ] Pruebas de seguridad validadas

---

¡Todo listo para probar el backend completo! 🚀
