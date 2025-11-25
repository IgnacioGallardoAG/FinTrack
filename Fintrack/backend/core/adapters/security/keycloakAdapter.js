import { SecurityPort } from '../../ports/securityPort.js';

export class KeycloakAdapter extends SecurityPort {
    extractUserId(req) {
        if (!req.user || !req.user.id) {
            throw new Error('No se encontró usuario en req.user. ¿Falta middleware auth?');
        }

        return req.user.id;
    }
}
