# FinTrack

## Prompts

- En el contexto del electivo "Taller de desarrollo de software asistido por LLMS" se requiere la utilización de LLMs para mejorar y afinar el proceso de diseño y desarrollo de un proyecto, con lo que se busca ser más eficientes. Para ello, existen técnicas y procesos para que esta herramienta sea un apoyo real. En este proyecto se usaron las siguientes técnicas:

- Meta Prompt
- Few Shot-learning
- Zero Shot-learning

Además de afinarlo mediante el uso de patrones de prompt, tales como:

- Pattern Person
- Strucctured Output Meta-Prompt


### Prompt para afinar estructura base del proyecto (afinado mediante Meta prompt, con una base de zero shot-learning)

Muestrame la estructura completa de carpetas y archivos vacíos para una arquitectura hexagonal (Ports & Adapters) enfocada en los casos de uso CU-05 Importar CSV y CU-06 Validar Importación, asegurando el RNF-04 Seguridad con Keycloak.

Requisitos:
- Separar backend y frontend en carpetas raíz diferentes.
- Backend con arquitectura hexagonal completa, incluyendo puertos, adaptadores, dominio, aplicación e infraestructura.
- Incluir archivo app.js y server.js para Express.
- Incluir adaptador de entrada (importController.js).
- Incluir puertos: importPort.js y securityPort.js.
- Incluir servicio de aplicación: importAppService.js.
- Incluir entidades y factory: transaction.js y transactionFactory.js.
- Incluir adaptadores de salida: importRepository.js, csvValidator.js y keycloakAdapter.js.
- Incluir configuración de infraestructura con carpeta db y keycloak.json opcional.
- No agregar código, solo estructura.
- Frontend con estructura base para React + Keycloak: api/, auth/, components/, pages/, main.jsx y App.jsx.

### Prompt para unit-test
A continuación te mostraré un ejemplo de prueba unitaria sencilla.
Aprende el estilo, la estructura y el nivel de detalle. Luego,
cuando te entregue un archivo del proyecto, deberás generar un test
nuevo siguiendo exactamente el mismo patrón.

EJEMPLO (few-shot):

INPUT EJEMPLO DEL USUARIO:
"Quiero un test unitario simple para una función que suma dos números."

OUTPUT ESPERADO DEL MODELO:
import { describe, it, expect } from "vitest";
import { sumar } from "../utils/sumar";

describe("sumar()", () => {
  it("retorna la suma de dos números", () => {
    expect(sumar(2, 3)).toBe(5);
  });
});

NUEVA INSTRUCCIÓN:
Ahora, usando el mismo estilo del ejemplo —estructura clara, lenguaje simple,
descripción mínima y un único caso de prueba— genera un test unitario para
el archivo que te enviaré a continuación. Si el archivo depende de funciones
externas, deberás mockearlas con vi.fn() o vi.mock(), manteniendo siempre
la simplicidad del ejemplo anterior.

Devuélveme únicamente el código del test, sin explicación adicional.


### Prompt — Refactor general del proyecto:

Contexto: El proyecto ya tiene varias páginas (Landing, Login, Dashboard,
ImportarCSV, ValidarCSV). Necesitamos estandarizar código, diseño y estado.

Objetivo:

- Unificar estilos de cards y tablas.
- Centralizar lógica de Dashboard en un solo estado 'vistaActual'.
- Crear componentes-reutilizables.
- Limpiar imports duplicados.
- Corregir problemas de navegación.

Instrucciones:

- Reescribir código respetando buenas prácticas.
- Dividir componentes en carpetas claras.
- Mantener compatibilidad con Keycloak.

### Prompt revisión error
Tengo una aplicación full-stack con la siguiente arquitectura:
- Frontend: React + Vite (puerto 5173)
- Backend: Node.js/Express (puerto 5000)
- Keycloak: Solo para login/autenticación (puerto 8080)

**Contexto:**
Ya logré autenticarme con Keycloak correctamente en el frontend. Ahora necesito implementar un flujo donde:
1. Usuario se autentica con Keycloak → obtiene JWT
2. Frontend usa ese JWT para todas las peticiones al backend
3. Backend valida el JWT y permite/deniega acceso
4. NO necesito base de datos por ahora, todo en memoria

**Problema actual:**
- Frontend no envía el token JWT en las peticiones
- Backend tiene errores CORS que bloquean las peticiones desde localhost:5173
- Error: "No 'Access-Control-Allow-Origin' header is present"
- Error: "Unable to update token, no refresh token available"

**Estructura de archivos:**
Te la adjunto con imagen

Como desarrollador de software senior, dame recomendaciones con códigos de ejemplo que me permitan solventar la problemática.
