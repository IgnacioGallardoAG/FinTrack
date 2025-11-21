import React from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";

export default function ValidarCSV() {

  // Ejemplo de errores mock – más adelante vienen del backend
  const erroresMock = [
    { fila: 3, campo: "monto", detalle: "Valor no numérico" },
    { fila: 7, campo: "fecha", detalle: "Formato inválido (usar YYYY-MM-DD)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard useInternalState={false} />

      <main className="app-content" style={{ flex: 1 }}>
        <div className="grid-2" style={{ marginTop: "2rem" }}>

          {/* Vista previa */}
          <section className="card">
            <h2 className="card-title">Vista previa del CSV</h2>
            <p className="card-subtitle">
              Aquí luego mostrarás las primeras filas cargadas correctamente.
            </p>

            <table className="table" style={{ marginTop: "0.75rem" }}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-10-01</td>
                  <td>800000</td>
                  <td>Sueldo</td>
                  <td>Ingreso</td>
                  <td>Ingreso</td>
                </tr>
                <tr>
                  <td>2025-10-02</td>
                  <td>-45000</td>
                  <td>Supermercado</td>
                  <td>Alimentación</td>
                  <td>Gasto</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Errores detectados */}
          <section className="card">
            <h2 className="card-title">Errores detectados</h2>
            <p className="card-subtitle">
              Corrige estos valores antes de confirmar la importación.
            </p>

            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.1rem" }}>
              {erroresMock.map((err, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  <strong>Fila {err.fila}</strong> – {err.campo}: {err.detalle}
                </li>
              ))}
            </ul>

            <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Confirmar importación
            </button>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
