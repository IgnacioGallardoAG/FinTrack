import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import Footer from "../components/Footer";
import NavbarDashboard from "../components/NavbarDashboard";

export default function ImportarCSV() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleValidate = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await api.post("/validate", form);

      // Pasar el resultado a la pantalla ValidarCSV
      navigate("/validar", { state: res.data });

    } catch (error) {
      console.error("Error al validar CSV:", error);
      alert("Error al validar el archivo");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard useInternalState={false} />

      <main className="app-content" style={{ flex: 1 }}>
        <div className="card" style={{ maxWidth: 600, margin: "2rem auto" }}>
          <h2 className="card-title">Importar CSV</h2>
          <p className="card-subtitle">Sube un archivo CSV con tus movimientos. Luego podrás validarlo.</p>

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

          <button
            className="btn btn-secondary"
            style={{ marginTop: "1rem" }}
            onClick={handleValidate}
            disabled={!file}
          >
            Validar archivo
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
