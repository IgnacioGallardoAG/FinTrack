import { useLocation } from "react-router-dom";
import api from "../api/apiClient";
import Footer from "../components/Footer";
import NavbarDashboard from "../components/NavbarDashboard";

export default function ValidarCSV() {
  const { state } = useLocation();

  // Si no llegaron datos (usuario entró directo), mostramos error
  if (!state) {
    return (
      <div>
        <NavbarDashboard />
        <h2 style={{ marginTop: "2rem", textAlign: "center" }}>
          No se encontró información del archivo. Vuelve a Importar CSV.
        </h2>
        <Footer />
      </div>
    );
  }

  const { preview, errors, fileName } = state;

  const handleImport = async () => {
    try {
      const form = new FormData();
      form.append("file", state.originalFile); // si lo quisieras poner

      const res = await api.post("/import", form);

      alert(`Importación completada: ${res.data.imported} filas importadas.`);
    } catch (error) {
      console.error("Error al confirmar importación:", error);
      alert("No se pudo completar la importación");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard useInternalState={false} />

      <main className="app-content" style={{ flex: 1 }}>
        <div className="grid-2" style={{ marginTop: "2rem" }}>
          
          {/* Vista previa */}
          <section className="card">
            <h2 className="card-title">Vista previa del CSV</h2>
            <p className="card-subtitle">
              Aquí se muestran las primeras filas que el backend detectó.
            </p>

            <table className="table" style={{ marginTop: "0.75rem" }}>
              <thead>
                {preview[0] && (
                  <tr>
                    {Object.keys(preview[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Errores */}
          <section className="card">
            <h2 className="card-title">Errores detectados</h2>

            {errors.length === 0 ? (
              <p>No se encontraron errores.</p>
            ) : (
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.1rem" }}>
                {errors.map((err, idx) => (
                  <li key={idx} style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                    {err}
                  </li>
                ))}
              </ul>
            )}

            {/* Permitir importar solo si es válido */}
            <button
              className="btn btn-primary"
              style={{ marginTop: "1rem" }}
              disabled={errors.length > 0}
              onClick={handleImport}
            >
              Confirmar importación
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
