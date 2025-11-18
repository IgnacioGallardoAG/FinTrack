// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ImportarCSV from "./pages/ImportarCSV";
import ValidarCSV from "./pages/ValidarCSV";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública: login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida: home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Importar CSV */}
          <Route
            path="/importar"
            element={
              <ProtectedRoute>
                <ImportarCSV />
              </ProtectedRoute>
            }
          />

          {/* Validar CSV */}
          <Route
            path="/validar"
            element={
              <ProtectedRoute>
                <ValidarCSV />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
