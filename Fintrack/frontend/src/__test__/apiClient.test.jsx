import { describe, expect, it, vi } from "vitest";
import apiClient from "../api/apiClient";
import keycloakService from "../auth/keycloakService";

// mock keycloakService
vi.mock("../auth/keycloakService", () => ({
    default: {
        getToken: vi.fn(),
        refreshTokenIfNeeded: vi.fn(),
        login: vi.fn(),
    },
}));

describe("apiClient - request interceptor", () => {
    it("agrega el token al header Authorization", async () => {
        // arrange
        keycloakService.getToken.mockResolvedValue("FAKE_TOKEN");

        // act
        const response = await apiClient.get("/test", {
            adapter: (config) => Promise.resolve(config),
        });

        // assert  
        expect(response.headers.Authorization).toBe("Bearer FAKE_TOKEN");
        expect(keycloakService.getToken).toHaveBeenCalled();
    });

    it("no agrega header Authorization si no hay token", async () => {
        // arrange
        keycloakService.getToken.mockResolvedValue(null);

        // act
        const response = await apiClient.get("/test", {
            adapter: (config) => Promise.resolve(config),
        });

        // assert  
        expect(response.headers.Authorization).toBeUndefined();
    });
});
