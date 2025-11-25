import { render, screen } from "@testing-library/react";
import NavbarDashboard from "../components/NavbarDashboard";

// Mock del router para evitar errores
vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
}));

// Mock de auth para evitar errores
vi.mock("../auth/AuthProvider", () => ({
    useAuth: () => ({
        logout: vi.fn(),
    }),
}));

test("NavbarDashboard se renderiza con sus botones principales", () => {
    render(<NavbarDashboard />);

    // LOGO
    expect(screen.getByText("FinTrack")).toBeInTheDocument();

    // BOTONES
    expect(screen.getByText("Menú")).toBeInTheDocument();
    expect(screen.getByText("Resumen General")).toBeInTheDocument();
    expect(screen.getByText("Gráficos")).toBeInTheDocument();
    expect(screen.getByText("Importar CSV")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
});
