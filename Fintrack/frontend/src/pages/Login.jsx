import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // luego aquí llamas a Keycloak
    navigate("/", { replace: true });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ marginBottom: "1.2rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ color: "#4F46E5", fontWeight: 600 }}>F</span>
          </div>
          <h1 className="auth-title">FinTrack</h1>
          <p className="auth-subtitle">
            Controla tus gastos personales de forma simple y visual.
          </p>
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
