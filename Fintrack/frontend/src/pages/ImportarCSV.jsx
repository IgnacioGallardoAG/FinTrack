import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";

export default function ImportarCSV() {
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard useInternalState={false} />

      <main className="app-content" style={{ flex: 1 }}>
        <div className="card" style={{ maxWidth: 600, margin: "2rem auto" }}>
          <h2 className="card-title">Importar CSV</h2>
          <p className="card-subtitle">
            Sube un archivo CSV con tus movimientos. Luego podrás validarlo.
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
            <input type="file" accept=".csv" onChange={handleFileChange} />

            {fileName && (
              <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Archivo seleccionado: {fileName}
              </p>
            )}
          </div>

          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Subir e importar
          </button>

          {fileName && (
            <button
              className="btn btn-secondary"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/validar")}
            >
              Validar importación
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
