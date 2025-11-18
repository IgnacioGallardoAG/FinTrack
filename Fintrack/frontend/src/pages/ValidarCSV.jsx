import React from "react";

export default function ValidarCSV() {
  // aquí después mostrarás los datos que el backend te devuelva
  const erroresMock = [
    { fila: 3, campo: "monto", detalle: "Valor no numérico" },
    { fila: 7, campo: "fecha", detalle: "Formato inválido (usar YYYY-MM-DD)" },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="topbar-title">Validar importación</div>
          <div className="topbar-subtitle">
            Revisa los registros y corrige posibles errores antes de guardar.
          </div>
        </div>
      </header>

      <main className="app-content">
        <div className="grid-2">
          <section className="card">
            <h2 className="card-title">Vista previa</h2>
            <p className="card-subtitle">
              Aquí luego mostrarás las primeras filas del CSV válido.
            </p>
            {/* Tabla dummy */}
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

          <section className="card">
            <h2 className="card-title">Errores detectados</h2>
            <p className="card-subtitle">
              Ejemplo de advertencias que tu backend podría devolver.
            </p>

            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.1rem" }}>
              {erroresMock.map((err) => (
                <li key={`${err.fila}-${err.campo}`} style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>
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
    </div>
  );
}
