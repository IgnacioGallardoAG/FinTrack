import { SecurityPort } from '../../ports/securityPort.js';

export class KeycloakAdapter extends SecurityPort {
    extractUserId(req) {
        const token = req?.kauth?.grant?.access_token;

        if (!token) {
            throw new Error('No se encontró token en la solicitud');
        }

        const content = token.content;

        // "sub" = ID único de Keycloak
        return content.sub;
    }
}
