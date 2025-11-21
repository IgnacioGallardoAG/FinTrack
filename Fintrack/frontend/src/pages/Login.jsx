import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import bgImage from "../assets/imagenprueba.jpg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative",
      }}
    >

      {/* OVERLAY SUAVE (opcional, mejora contraste) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* CARD LOGIN */}
      <div
        style={{
          position: "relative",
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.92)",
          borderRadius: "22px",
          padding: "2rem",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Logo circular */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <span style={{ color: "#4F46E5", fontWeight: "bold" }}>F</span>
        </div>

        {/* Título */}
        <h1 style={{ textAlign: "center", fontSize: "1.6rem", marginBottom: "0.5rem" }}>
          FinTrack
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            textAlign: "center",
            color: "#4B5563",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}
        >
          Controla tus gastos personales de forma simple y visual.
        </p>

        {/* Botón */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
