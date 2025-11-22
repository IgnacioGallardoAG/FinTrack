import keycloak from "./keycloak";

export async function getToken() {
    if (!keycloak.authenticated) return null;

    try {
        await keycloak.updateToken(30);
        return keycloak.token;
    } catch (e) {
        keycloak.login();
        return null;
    }
}
