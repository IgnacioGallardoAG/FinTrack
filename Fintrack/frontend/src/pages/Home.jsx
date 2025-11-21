import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";

export default function Home() {
  const [vistaActual, setVistaActual] = useState("menu"); // "menu" | "resumen" | "graficos"
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Lee ?vista=menu|resumen|graficos desde la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vista = params.get("vista");
    if (vista === "menu" || vista === "resumen" || vista === "graficos") {
      setVistaActual(vista);
    }
  }, [location.search]);

  const cambiarVista = (nuevaVista) => {
    if (nuevaVista === vistaActual) return;
    setIsLoading(true);
    setTimeout(() => {
      setVistaActual(nuevaVista);
      setIsLoading(false);
    }, 400); // pequeño delay para sensación de carga
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard
        onSelectResumen={() => cambiarVista("resumen")}
        onSelectGraficos={() => cambiarVista("graficos")}
        onSelectMenu={() => cambiarVista("menu")}
        useInternalState={true}
      />

      <main style={{ padding: "2rem 3rem", flex: 1 }}>
        {isLoading ? (
          <div
            style={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card" style={{ padding: "1.5rem 2rem", textAlign: "center" }}>
              <p className="card-subtitle">Cargando vista...</p>
            </div>
          </div>
        ) : (
          <>
            {vistaActual === "menu" && <MenuCompleto />}
            {vistaActual === "resumen" && <SoloResumen />}
            {vistaActual === "graficos" && <SoloGraficos />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ============================
   COMPONENTE 1: SOLO RESUMEN
   ============================ */
function SoloResumen() {
  return (
    <>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Resumen General</h1>

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

        {/* Tabla */}
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
    </>
  );
}

/* ============================
   COMPONENTE 2: SOLO GRÁFICOS
   ============================ */
function SoloGraficos() {
  return (
    <>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Gráficos</h1>

      <section className="card">
        <h2 className="card-title">Gráfico mensual</h2>
        <p className="card-subtitle">Este gráfico luego se conectará con datos reales del CSV.</p>

        <div
          style={{
            width: "100%",
            height: "350px",
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
    </>
  );
}

/* =================================
   COMPONENTE 3: VISTA MENU COMPLETO
   ================================= */
function MenuCompleto() {
  return (
    <>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Dashboard</h1>

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
              <p style={{ fontWeight: 600 }}>$1.200.000</p>
            </div>

            <div className="card" style={{ padding: "0.7rem" }}>
              <p className="card-subtitle">Gastos</p>
              <p style={{ fontWeight: 600 }}>$850.000</p>
            </div>

            <div className="card" style={{ padding: "0.7rem" }}>
              <p className="card-subtitle">Balance</p>
              <p style={{ fontWeight: 600 }}>$350.000</p>
            </div>
          </div>

          {/* tabla */}
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

        {/* Gráfico */}
        <section className="card">
          <h2 className="card-title">Gráfico mensual</h2>
          <p className="card-subtitle">Este gráfico luego se conectará con datos reales del CSV.</p>

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
    </>
  );
}
