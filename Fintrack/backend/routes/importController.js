import express from 'express';
import multer from 'multer';

import { ImportRepository } from '../core/adapters/repository/importRepository.js';
import { KeycloakAdapter } from '../core/adapters/security/keycloakAdapter.js';
import { CsvValidator } from '../core/adapters/validation/csvValidator.js';
import { ImportAppService } from '../core/application/importAppService.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ----- Inyección de dependencias -----
const csvValidator = new CsvValidator();
const importRepository = new ImportRepository();
const securityPort = new KeycloakAdapter();

const importService = new ImportAppService({ 
    csvValidator, 
    importRepository,
    securityPort 
});


// CU-06: Validar CSV (no guarda nada)
router.post('/validate', upload.single('file'), async (req, res) => {
    try {
        // Keycloak ya validó el token (keycloak.protect())
        const userId = securityPort.extractUserId(req);

        const result = await importService.validateCSV(req.file, userId);
        res.json(result);

    } catch (err) {
        console.error('[VALIDATE CSV ERROR]', err);
        res.status(400).json({ error: err.message });
    }
});


// CU-05: Importar CSV (incluye CU-06)
router.post('/import', upload.single('file'), async (req, res) => {
    try {
        const userId = securityPort.extractUserId(req);

        const result = await importService.importCSV(req.file, userId);
        res.json(result);

    } catch (err) {
        console.error('[IMPORT CSV ERROR]', err);
        res.status(400).json({ error: err.message });
    }
});

export default router;
