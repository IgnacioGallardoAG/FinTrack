import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true }); 
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>

      {/* NAVBAR IGUAL QUE LANDING */}
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

        {/* MENÚ DEL DASHBOARD */}
        <nav
          style={{
            display: "flex",
            gap: "2rem",
            fontSize: "1rem",
            alignItems: "center",
          }}
        >
          <button style={menuBtn} onClick={() => navigate("/importar")}>
            Importar CSV
          </button>

          <button style={menuBtn} onClick={() => navigate("/validar")}>
            Validación
          </button>

          <button style={menuBtn}>
            Resumen General
          </button>

          <button style={menuBtn}>
            Gráficos
          </button>
        </nav>

        {/* CERRAR SESIÓN */}
        <button
          onClick={handleLogout}
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

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ padding: "2rem 3rem" }}>
        
        {/* Título */}
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          Resumen General
        </h1>

        <div className="grid-2">
          {/* Resumen mensual */}
          <section className="card">
            <h2 className="card-title">Resumen mensual</h2>
            <p className="card-subtitle">Ejemplo de datos cargados (mock).</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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

            {/* Tabla de transacciones */}
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

          {/* GRÁFICO (mock) */}
          <section className="card">
            <h2 className="card-title">Gráfico mensual</h2>
            <p className="card-subtitle">Este gráfico luego se conectará al CSV importado.</p>

            <div
              style={{
                width: "100%",
                height: "300px",
                background: "#e5e7eb",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                marginTop: "1rem",
              }}
            >
              (Aquí irá el gráfico real)
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const menuBtn = {
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
};
