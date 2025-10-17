import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();

// Configuración de CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', routes);

// Middleware de errores
app.use(errorHandler);

export default app;
