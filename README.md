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