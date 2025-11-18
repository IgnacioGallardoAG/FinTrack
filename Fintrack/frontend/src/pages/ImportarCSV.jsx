import React, { useState } from "react";

export default function ImportarCSV() {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // aquí luego llamas a tu API para subirlo
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="topbar-title">Importar CSV</div>
          <div className="topbar-subtitle">
            Carga un archivo con tus movimientos para agregarlos a FinTrack.
          </div>
        </div>
      </header>

      <main className="app-content">
        <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="card-title">Seleccionar archivo</h2>
          <p className="card-subtitle">
            Formato esperado: <code>fecha, monto, descripción, categoría, tipo</code>
          </p>

          <div
            style={{
              borderRadius: 16,
              border: "1px dashed #d1d5db",
              padding: "1.5rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            <p className="card-subtitle" style={{ marginBottom: "0.75rem" }}>
              Arrastra tu archivo CSV aquí o selecciónalo desde tu equipo.
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ marginBottom: "0.75rem" }}
            />
            {fileName && (
              <p style={{ fontSize: "0.8rem", color: "#4b5563" }}>Archivo seleccionado: {fileName}</p>
            )}
          </div>

          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Subir e importar
          </button>
        </div>
      </main>
    </div>
  );
}
