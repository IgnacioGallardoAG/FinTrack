import { useLocation, useNavigate } from "react-router-dom";
import { importCSV } from "../api/apiClient";
import Footer from "../components/Footer";
import NavbarDashboard from "../components/NavbarDashboard";

export default function ValidarCSV() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Si no llegaron datos (usuario entró directo)
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

  // Datos provenientes de validateCSV()
  const {
    preview,
    validRows,
    invalidRows,
    errorRows,
    errors,
    isValid,
    fileName,
    originalFile, // ← Lo enviaremos desde ImportarCSV.jsx
    totalRows,
    validCount,
    invalidCount,
  } = state;

  const handleImport = async () => {
    try {
      const result = await importCSV(originalFile);

      alert(result.summary);

      // Redirigir al dashboard o donde quieras
      navigate("/dashboard");

    } catch (error) {
      console.error("Error al confirmar importación:", error);
      alert(error.error || "No se pudo completar la importación");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <NavbarDashboard useInternalState={false} />

      <main className="app-content" style={{ flex: 1, padding: "2rem" }}>
        
        <h2 className="card-title">Resultado de la Validación</h2>
        <p className="card-subtitle">Archivo: {fileName}</p>

        {/* --- RESUMEN --- */}
        <section className="card" style={{ marginTop: "1rem" }}>
          <h3 className="card-title">Resumen</h3>
          <ul>
            <li>Total filas: {totalRows}</li>
            <li>Válidas: {validCount}</li>
            <li>Inválidas: {invalidCount}</li>
          </ul>
        </section>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          
          {/* --- PREVIEW --- */}
          <section className="card">
            <h3 className="card-title">Vista previa (primeras filas válidas)</h3>

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

          {/* --- ERRORES ESTRUCTURALES --- */}
          <section className="card">
            <h3 className="card-title">Errores generales</h3>

            {errors.length === 0 ? (
              <p>No hay errores de estructura.</p>
            ) : (
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* --- ERRORES POR FILA --- */}
        <section className="card" style={{ marginTop: "1rem" }}>
          <h3 className="card-title">Errores por fila</h3>

          {errorRows.length === 0 ? (
            <p>No hay filas con errores.</p>
          ) : (
            <ul>
              {errorRows.map((row, idx) => (
                <li key={idx}>
                  <strong>Fila {row.row}</strong>: {row.errors.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* --- BOTÓN IMPORTAR --- */}
        <button
          className="btn btn-primary"
          style={{ marginTop: "2rem", width: "100%" }}
          disabled={!isValid}
          onClick={handleImport}
        >
          Confirmar importación
        </button>
      </main>

      <Footer />
    </div>
  );
}
