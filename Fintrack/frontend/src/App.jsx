import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ImportarCSV from "./pages/ImportarCSV";
import Landing from "./pages/Landing";
import ValidarCSV from "./pages/ValidarCSV";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PÚBLICAS */}
          <Route path="/" element={<Landing />} />

          {/* PROTEGIDAS */}
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

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
