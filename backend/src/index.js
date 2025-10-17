import dotenv from 'dotenv';
import { PORT } from './config/env.js';
import app from './app.js';

// Cargar variables de entorno
dotenv.config();

// Iniciar el servidor principal usando app.js
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de errores del servidor
server.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
  });
});