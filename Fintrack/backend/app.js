import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import Keycloak from 'keycloak-connect';
import importRoutes from './routes/importController.js';

const app = express();

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'fintrack-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

// Todas las rutas de importación están protegidas por Keycloak
app.use('/api', keycloak.protect(), importRoutes);

export default app;
