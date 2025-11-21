import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ImportarCSV from "./pages/ImportarCSV";
import ValidarCSV from "./pages/ValidarCSV";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* RUTAS PROTEGIDAS */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/importar"
            element={
              <ProtectedRoute>
                <ImportarCSV />
              </ProtectedRoute>
            }
          />

          <Route
            path="/validar"
            element={
              <ProtectedRoute>
                <ValidarCSV />
              </ProtectedRoute>
            }
          />

          {/* CATCH ALL — si no existe la ruta vuelve al landing */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
