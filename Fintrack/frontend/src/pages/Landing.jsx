import { useNavigate } from "react-router-dom";
import funcionalidadesImg from "../assets/funcionalidades.jpg"; // Imagen funcionalidades
import bgImage from "../assets/imagenprueba.jpg"; // Fondo del hero
import { useAuth } from "../auth/AuthProvider";
import Footer from "../components/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ overflowY: "auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
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
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}>
          FinTrack
        </div>

        {/* MENÚ */}
        <nav style={{ display: "flex", gap: "2rem", fontSize: "1rem" }}>
          <button style={menuBtn} onClick={() => scrollToId("servicios")}>
            Servicios
          </button>
          <button style={menuBtn} onClick={() => scrollToId("funcionalidades")}>
            Funcionalidades
          </button>
          <button style={menuBtn} onClick={() => scrollToId("contacto")}>
            Contacto
          </button>
        </nav>

        {/* BOTÓN DE LOGIN */}
        <button
          onClick={() =>
            login({ redirectUri: "http://localhost:5173/dashboard" })
          }
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
            onClick={() => scrollToId("funcionalidades")}
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
            Ver funcionalidades
          </button>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section
        id="servicios"
        style={{
          background: "#ffffff",
          padding: "4rem 3rem 3rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "1.8rem",
          }}
        >
          Servicios FinTrack
        </h2>

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "230px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, rgba(79,70,229,0.9), rgba(129,140,248,0.9))",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            Vista general de tus finanzas
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: "0.75rem", fontSize: "1.3rem" }}>
              ¿Qué puedes hacer con FinTrack?
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              <li>• Importar movimientos bancarios desde archivos CSV.</li>
              <li>• Validar los datos antes de guardarlos.</li>
              <li>• Ver un resumen mensual completo.</li>
              <li>• Visualizar gráficos financieros.</li>
              <li>• Analizar tendencias de gasto.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECCIÓN FUNCIONALIDADES */}
      <section
        id="funcionalidades"
        style={{
          background: "#f9fafb",
          padding: "4rem 3rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "1.8rem",
          }}
        >
          Funcionalidades del Proyecto
        </h2>

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          {/* IMAGEN */}
          <img
            src={funcionalidadesImg}
            alt="Funcionalidades"
            style={{
              flex: 1,
              width: "100%",
              height: "460px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          />

          {/* LISTA */}
          <div style={{ flex: 1 }}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                lineHeight: 1.9,
                color: "#374151",
                fontSize: "1.05rem",
              }}
            >
              <li>✔ Importación de archivos CSV</li>
              <li>✔ Validación automática de registros</li>
              <li>✔ Corrección de errores detectados</li>
              <li>✔ Dashboard con resumen mensual</li>
              <li>✔ Gráficos de gasto por categoría</li>
              <li>✔ Balance general por período</li>
              <li>✔ Integración con backend NestJS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        style={{
          padding: "4rem 3rem",
          background: "#ffffff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "1.8rem",
          }}
        >
          Contacto
        </h2>

        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            color: "#374151",
            lineHeight: 1.7,
          }}
        >
          <p>Email: fintrack.soporte@gmail.com</p>
          <p>Universidad de Valparaíso</p>
          <p>Redes sociales próximamente</p>
        </div>
      </section>

      <Footer />
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
