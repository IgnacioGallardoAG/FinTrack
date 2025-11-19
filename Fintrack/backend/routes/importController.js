import express from 'express';
import multer from 'multer';

import { ImportRepository } from '../core/adapters/repository/importRepository.js';
import { CsvValidator } from '../core/adapters/validation/csvValidator.js';
import { ImportAppService } from '../core/application/importAppService.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ----- Composición simple de dependencias -----
const csvValidator = new CsvValidator();
const importRepository = new ImportRepository();
const importService = new ImportAppService({ csvValidator, importRepository });
// -----------------------------------------------

// CU-06 Validar CSV (solo validación, sin guardar)
router.post('/validate', upload.single('file'), async (req, res) => {
    try {
        const result = await importService.validateCSV(req.file);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// CU-05 Importar CSV (usa CU-06 internamente)
router.post('/import', upload.single('file'), async (req, res) => {
    try {
        const result = await importService.importCSV(req.file);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

export default router;
