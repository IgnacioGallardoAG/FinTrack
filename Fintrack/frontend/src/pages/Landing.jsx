import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/imagenprueba.jpg"; 

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ overflowY: "auto", minHeight: "100vh" }}>
      
      {/* NAV SUPERIOR */}
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
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>FinTrack</div>

        {/* MENÚ */}
        <nav style={{ display: "flex", gap: "2rem", fontSize: "1rem" }}>
          <button style={menuBtn} onClick={() => window.scrollTo(0, 800)}>
            Servicios
          </button>
          <button style={menuBtn} onClick={() => window.scrollTo(0, 800)}>
            Funcionalidades
          </button>
          <button style={menuBtn} onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
            Contacto
          </button>
        </nav>

        {/* BOTÓN DE LOGIN */}
        <button
          onClick={() => navigate("/login")}
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
          Iniciar sesión
        </button>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          height: "70vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "2rem 3rem",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            textAlign: "center",
            minWidth: "500px",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Controla tus finanzas de forma inteligente
          </h1>
          <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
            Importa tus gastos, visualiza tus movimientos y optimiza tus decisiones.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "0.7rem 2rem",
              background: "#4F46E5",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Comenzar ahora
          </button>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS (tipo LATAM) */}
      <section
        style={{
          background: "#f9fafb",
          padding: "4rem 2rem",
          marginTop: "3rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.8rem" }}>
          Sobre nosotros
        </h2>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3rem",
          }}
        >
          <div>
            <h3>FinTrack</h3>
            <p>
              Plataforma de gestión financiera diseñada para facilitar el control de gastos,
              análisis mensual e importación de movimientos bancarios.
            </p>
          </div>

          <div>
            <h3>Equipo</h3>
            <p>Ignacio Gallardo</p>
            <p>Nicolás Flores</p>
            <p>Estudiantes de la Universidad de Valparaíso</p>
          </div>

          <div>
            <h3>Contacto</h3>
            <p>fintrack.soporte@gmail.com</p>
            <p>Redes sociales próximamente</p>
          </div>
        </div>
      </section>

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
