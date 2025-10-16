import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import ventureRoutes from './routes/venture.routes.js';
import { PORT } from './config/env.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  console.log('Health check recibido');
  res.json({ status: 'ok' });
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de emprendimientos
app.use('/ventures', ventureRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar el servidor
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

export default app;