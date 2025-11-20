import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import PropTypes from "prop-types";

export default function NavbarDashboard({
  onSelectMenu,
  onSelectResumen,
  onSelectGraficos,
  useInternalState = true, // por defecto el Home usa estado interno
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Para redirigir desde páginas externas (importar / validar)
  const goToHomeWithView = (vista) => {
    navigate(`/dashboard?vista=${vista}`);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 3rem",
        backgroundColor: "#4F46E5",
        color: "white",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        FinTrack
      </div>

      {/* MENÚ PRINCIPAL */}
      <nav
        style={{
          display: "flex",
          gap: "2rem",
          fontSize: "1rem",
          alignItems: "center",
        }}
      >
        {/* MENÚ */}
        <button
          style={menuBtn}
          onClick={() =>
            useInternalState ? onSelectMenu() : goToHomeWithView("menu")
          }
        >
          Menú
        </button>

        {/* RESUMEN */}
        <button
          style={menuBtn}
          onClick={() =>
            useInternalState
              ? onSelectResumen()
              : goToHomeWithView("resumen")
          }
        >
          Resumen General
        </button>

        {/* GRÁFICOS */}
        <button
          style={menuBtn}
          onClick={() =>
            useInternalState
              ? onSelectGraficos()
              : goToHomeWithView("graficos")
          }
        >
          Gráficos
        </button>

        {/* IMPORTAR CSV */}
        <button style={menuBtn} onClick={() => navigate("/importar")}>
          Importar CSV
        </button>
      </nav>

      {/* CERRAR SESIÓN */}
      <button
        onClick={() => {
          logout();
          navigate("/", { replace: true });
        }}
        style={{
          padding: "0.5rem 1rem",
          background: "white",
          color: "#4F46E5",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </header>
  );
}

NavbarDashboard.propTypes = {
  onSelectMenu: PropTypes.func,
  onSelectResumen: PropTypes.func,
  onSelectGraficos: PropTypes.func,
  useInternalState: PropTypes.bool,
};

const menuBtn = {
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
};
