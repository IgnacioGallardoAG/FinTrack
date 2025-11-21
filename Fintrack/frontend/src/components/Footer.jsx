import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#EEF2FF",
        borderTop: "1px solid #E5E7EB",
        marginTop: "3rem",
        padding: "2.5rem 3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Columna 1 */}
        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.75rem" }}>FinTrack</h3>
          <p style={{ fontSize: "0.9rem", color: "#4B5563" }}>
            Herramienta simple y visual para entender tus gastos, ingresos y
            balance mensual. Diseñada por estudiantes de la Universidad de
            Valparaíso.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Producto</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem" }}>
            <li>Dashboard</li>
            <li>Importar CSV</li>
            <li>Validación de datos</li>
            <li>Reportes (futuro)</li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Recursos</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem" }}>
            <li>Documentación (prototipo)</li>
            <li>Preguntas frecuentes</li>
            <li>Guía de uso CSV</li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div>
          <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Equipo</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem" }}>
            <li>Ignacio Gallardo</li>
            <li>Nicolás Flores</li>
            <li>Universidad de Valparaíso</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "1.5rem auto 0",
          borderTop: "1px solid #E5E7EB",
          paddingTop: "0.75rem",
          fontSize: "0.8rem",
          color: "#6B7280",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} FinTrack — Proyecto académico. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
