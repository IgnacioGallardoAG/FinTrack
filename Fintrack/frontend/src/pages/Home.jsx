import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      {/* Topbar */}
      <header className="topbar">
        <div>
          <div className="topbar-title">FinTrack</div>
          <div className="topbar-subtitle">Resumen general de tus movimientos</div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <button className="hamburger" aria-label="Menú principal">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="app-content">
        <div className="grid-2">
          {/* Resumen de datos */}
          <section className="card">
            <h2 className="card-title">Resumen mensual</h2>
            <p className="card-subtitle">Ejemplo de datos cargados (mock).</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "0.75rem",
                marginBottom: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div className="card" style={{ padding: "0.7rem" }}>
                <p className="card-subtitle">Ingresos</p>
                <p style={{ fontWeight: 600, marginTop: 4 }}>$1.200.000</p>
              </div>
              <div className="card" style={{ padding: "0.7rem" }}>
                <p className="card-subtitle">Gastos</p>
                <p style={{ fontWeight: 600, marginTop: 4 }}>$850.000</p>
              </div>
              <div className="card" style={{ padding: "0.7rem" }}>
                <p className="card-subtitle">Balance</p>
                <p style={{ fontWeight: 600, marginTop: 4 }}>$350.000</p>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Supermercado</td>
                  <td>
                    <span className="badge badge-expense">- $45.000</span>
                  </td>
                  <td>Alimentación</td>
                </tr>
                <tr>
                  <td>Sueldo</td>
                  <td>
                    <span className="badge badge-income">+ $800.000</span>
                  </td>
                  <td>Ingreso</td>
                </tr>
                <tr>
                  <td>Transporte</td>
                  <td>
                    <span className="badge badge-expense">- $20.000</span>
                  </td>
                  <td>Movilidad</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Acciones CSV */}
          <section className="card">
            <h2 className="card-title">Importar y validar CSV</h2>
            <p className="card-subtitle">
              Usa estas opciones para cargar movimientos desde tu banco o planilla.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
              <button className="btn btn-primary" onClick={() => navigate("/importar")}>
                Importar archivo CSV
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/validar")}>
                Validar última importación
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
