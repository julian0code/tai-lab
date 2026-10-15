# TAI Lab --- Documento de contexto del proyecto

**Objetivo:** construir un repositorio personal para preparar el examen
de Técnico Auxiliar de Informática (TAI) de la Administración General
del Estado mediante una aplicación web full-stack y laboratorios
prácticos relacionados con el temario.

> Este documento sirve para retomar el proyecto desde otra cuenta u
> ordenador. No presupone que se haya creado ningún código todavía.
> Antes de estudiar el examen, comprobar siempre la convocatoria y el
> programa oficial vigentes.

## 1. Visión del proyecto

TAI Lab será una aplicación para gestionar preguntas, generar
simulacros, guardar intentos y consultar estadísticas de estudio. En
paralelo, el repositorio contendrá ejercicios independientes de
sistemas, redes, seguridad, bases de datos, programación y legislación.

El proyecto debe ser suficientemente pequeño para terminar una primera
versión, pero ampliable por fases. La prioridad no es construir una
arquitectura empresarial compleja, sino aprender y relacionar conceptos
del temario con prácticas reproducibles.

### Objetivos

-   Practicar programación orientada a objetos, estructuras de datos,
    algoritmos y manejo de errores.
-   Implementar una API REST y una interfaz web que la consuma.
-   Diseñar una base de datos relacional y practicar SQL.
-   Practicar autenticación, autorización, validación y seguridad web.
-   Añadir pruebas automatizadas, documentación y CI.
-   Usar Linux y Docker para ejecutar y diagnosticar la aplicación.
-   Mantener un banco de preguntas por bloque y tema, con referencias y
    explicaciones.
-   Crear laboratorios que cubran contenidos que no encajan directamente
    en la aplicación.

## 2. Stack propuesto

Stack inicial recomendado:

-   **Backend:** Java + Spring Boot.
-   **Frontend:** React + TypeScript, HTML y CSS.
-   **Base de datos:** PostgreSQL.
-   **Infraestructura local:** Docker y Docker Compose.
-   **Control de versiones:** Git y GitHub.
-   **Pruebas:** JUnit y pruebas de integración para el backend; pruebas
    apropiadas para el frontend.
-   **Documentación API:** OpenAPI/Swagger.
-   **Integración continua:** GitHub Actions.
-   **Ampliación posterior:** pequeño laboratorio de PHP para practicar
    ese lenguaje sin cambiar el backend principal.

No es necesario implementar todo a la vez. Primero debe arrancar la
aplicación mínima; después se incorporan seguridad, estadísticas,
contenedores completos y laboratorios.

## 3. Funcionalidades de la aplicación

### MVP (primera versión funcional)

1.  Listar preguntas.
2.  Crear, editar y eliminar preguntas.
3.  Clasificar preguntas por bloque, tema y dificultad.
4.  Guardar opciones de respuesta, respuesta correcta y explicación.
5.  Crear un simulacro a partir de preguntas existentes.
6.  Responder preguntas y enviar el intento.
7.  Calcular y guardar el resultado.
8.  Consultar el historial de intentos.
9.  Ejecutar backend, frontend y base de datos localmente.

### Mejoras posteriores

-   Registro e inicio de sesión.
-   Roles de estudiante y administrador.
-   Historial y estadísticas por tema.
-   Preguntas falladas y sesiones de repaso.
-   Modo estudio con explicación inmediata.
-   Modo examen con cronómetro y corrección al final.
-   Configuración de duración, preguntas de reserva, respuestas en
    blanco y penalización.
-   Filtros, ordenación y paginación.
-   Logs, copias de seguridad, certificados y HTTPS.
-   Pruebas automatizadas y pipeline CI.
-   Importación/exportación de preguntas mediante un formato
    documentado.

**Importante:** la puntuación y la estructura de cada simulacro deben
configurarse a partir de la convocatoria oficial que se esté preparando.
No se deben fijar para siempre las reglas de una convocatoria anterior.

## 4. Modelo de datos inicial

Esquema conceptual recomendado:

-   `Topic`: bloque, tema, nombre y descripción.
-   `Question`: tema, enunciado, dificultad, explicación, fuente, fecha
    de revisión y estado.
-   `QuestionOption`: pregunta, texto de la opción, identificador/orden
    y si es correcta.
-   `Exam`: nombre, configuración, duración y fecha de creación.
-   `ExamQuestion`: relación entre examen y pregunta, orden y, si
    procede, si es de reserva.
-   `Attempt`: examen, usuario opcional durante el MVP, fechas,
    puntuación y estado.
-   `Answer`: intento, pregunta, opción elegida, si se dejó en blanco y
    resultado de la corrección.
-   `User` y `Role`: incorporarlos cuando se implemente autenticación.

Conviene evitar guardar una copia de la respuesta correcta en los datos
que el frontend recibe antes de terminar el examen. La corrección debe
hacerse en el backend.

## 5. API inicial sugerida

Los nombres son orientativos; se concretarán al implementar el backend.

-   `GET /api/topics` --- listar temas.
-   `GET /api/questions` --- listar preguntas con filtros.
-   `GET /api/questions/{id}` --- consultar una pregunta.
-   `POST /api/questions` --- crear pregunta.
-   `PUT /api/questions/{id}` --- modificar pregunta.
-   `DELETE /api/questions/{id}` --- eliminar pregunta.
-   `POST /api/exams` --- crear/configurar simulacro.
-   `GET /api/exams/{id}` --- consultar la configuración de un
    simulacro.
-   `POST /api/attempts` --- iniciar intento.
-   `POST /api/attempts/{id}/answers` --- guardar una respuesta.
-   `POST /api/attempts/{id}/submit` --- finalizar y corregir el
    intento.
-   `GET /api/attempts/{id}/results` --- consultar resultado.
-   `GET /api/attempts` --- listar historial.

Usar DTOs, validación de entrada, códigos HTTP adecuados y respuestas de
error consistentes. No exponer entidades de persistencia directamente
como contrato público sin valorar sus consecuencias.

## 6. Estructura inicial del repositorio

``` text
tai-lab/
├── frontend/
├── backend/
├── php-lab/                 # añadir más adelante
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── exercises/
├── infrastructure/
│   ├── docker/
│   ├── linux/
│   ├── networking/
│   ├── security/
│   └── backups/
├── tests/
│   ├── api/
│   └── integration/
├── study/
│   ├── bloque-i/
│   ├── bloque-ii/
│   ├── bloque-iii/
│   ├── practical-cases/
│   └── mock-exams/
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   └── decisions/
├── docker-compose.yml
├── .env.example
├── README.md
└── .github/
    └── workflows/
```

No hace falta crear todas las carpetas el primer día. Añadirlas cuando
tengan contenido real.

## 7. Laboratorios para ampliar la cobertura del temario

### Programación y desarrollo

-   POO, interfaces, herencia, polimorfismo y excepciones.
-   Colecciones, algoritmos, búsqueda y ordenación.
-   HTML, CSS, JavaScript y TypeScript.
-   Java y Spring Boot.
-   Ejercicios pequeños de PHP.
-   XML, JSON, servicios web, HTTP y REST.
-   Pruebas unitarias, integración y depuración.

### Bases de datos

-   Modelo entidad-relación y normalización.
-   Claves primarias y foráneas, restricciones e índices.
-   `JOIN`, subconsultas, agregaciones y funciones.
-   Transacciones y concurrencia.
-   Consultas con datos de ejemplo y soluciones explicadas.

### Sistemas operativos

-   Usuarios, grupos, permisos y procesos.
-   Servicios, logs, variables de entorno y sistema de archivos.
-   Scripts y tareas automatizadas.
-   Comparativas prácticas entre Linux y Windows.
-   Copias de seguridad y restauración.

### Redes

-   IPv4, IPv6 y ejercicios de subredes.
-   DNS, DHCP, TCP, UDP, HTTP y HTTPS.
-   Puertos, sockets, routing, NAT, VLAN y VPN.
-   Diagnóstico con `ping`, `traceroute`, `ip`, `ss`, `curl` y
    `nslookup`.
-   Diagramas y prácticas en entornos locales controlados.

### Seguridad

-   Diferencia entre autenticación y autorización.
-   Hash de contraseñas, cifrado simétrico/asimétrico y certificados.
-   TLS y cadena de confianza.
-   Validación de entradas, inyección SQL y riesgos web comunes.
-   Principios de mínimo privilegio, gestión de secretos y logs.
-   Ejercicios de protección de datos, ENS y normativa aplicable.

### Legislación y Administración electrónica

-   Fichas y preguntas vinculadas a normas y artículos concretos.
-   Protección de datos, identificación, firma electrónica y servicios
    públicos digitales.
-   ENS y ENI, según el programa oficial.
-   Registrar fuente y fecha de revisión de cada ficha, porque la
    normativa puede cambiar.

Cada laboratorio debería contener: objetivo, conceptos previos,
instrucciones reproducibles, resultado esperado, errores frecuentes,
preguntas tipo test y solución razonada.

## 8. Plan de trabajo por fases

### Fase 1 --- Arranque

-   Crear repositorio y README.
-   Preparar Git y `.gitignore`.
-   Crear un proyecto Spring Boot mínimo.
-   Crear React + TypeScript.
-   Levantar PostgreSQL local.
-   Confirmar que frontend y backend se comunican.

### Fase 2 --- CRUD

-   Diseñar tablas de temas, preguntas y opciones.
-   Crear migraciones y datos de ejemplo.
-   Implementar endpoints de preguntas.
-   Añadir validación y errores.
-   Escribir pruebas unitarias.

### Fase 3 --- Frontend

-   Listado, filtros y formulario de preguntas.
-   Consumo de la API.
-   Estados de carga, error y éxito.
-   Validación de formularios.

### Fase 4 --- Simulacros

-   Crear exámenes.
-   Guardar respuestas e intentos.
-   Corregir en el servidor.
-   Calcular la puntuación mediante configuración.
-   Añadir pruebas de integración.

### Fase 5 --- Seguridad e infraestructura

-   Incorporar usuarios y permisos.
-   Proteger endpoints y datos.
-   Completar Docker Compose.
-   Documentar variables de entorno y secretos.
-   Añadir logs y copias de seguridad.

### Fase 6 --- Laboratorios y examen

-   Añadir ejercicios de SQL, Linux, redes y seguridad.
-   Crear un laboratorio PHP.
-   Completar preguntas por bloques.
-   Crear supuestos prácticos.
-   Configurar CI y revisar cobertura de pruebas.

## 9. Reglas de calidad

-   Mantener una aplicación modular y comprensible; evitar
    microservicios innecesarios.
-   No guardar contraseñas en texto plano.
-   No subir secretos ni ficheros `.env` reales al repositorio.
-   Usar datos ficticios, nunca datos personales reales.
-   Validar datos tanto en frontend como en backend; la validación del
    backend es obligatoria.
-   No confiar en el frontend para decidir la corrección o autorización.
-   Añadir pruebas para reglas de negocio importantes.
-   Documentar cómo arrancar, probar y reiniciar el proyecto desde cero.
-   Mantener el contenido legal actualizado y citar fuentes oficiales.
-   Usar preguntas propias o materiales cuyo uso esté permitido;
    conservar la referencia de cada pregunta.

## 10. Checklist para la primera sesión en un ordenador nuevo

1.  Instalar Git, JDK compatible con la versión elegida de Spring Boot,
    Node.js, npm y Docker Desktop o Docker Engine.
2.  Verificar versiones con `git --version`, `java -version`,
    `node --version`, `npm --version` y `docker --version`.
3.  Clonar el repositorio o crear uno nuevo.
4.  Leer el README y copiar `.env.example` a `.env` si el proyecto ya lo
    necesita.
5.  No copiar secretos personales entre cuentas ni ordenadores.
6.  Arrancar los servicios siguiendo las instrucciones documentadas.
7.  Ejecutar pruebas.
8.  Hacer un pequeño cambio, probarlo y guardarlo en Git.

## 11. Cómo retomar el trabajo con un asistente

Al abrir otra conversación, adjuntar este archivo o pegar este resumen:

> Estoy preparando el examen TAI de la AGE. Quiero desarrollar un
> repositorio llamado TAI Lab para aprender con un proyecto full-stack y
> laboratorios prácticos. La propuesta inicial es Java + Spring Boot,
> React + TypeScript, PostgreSQL, Docker, Git y pruebas automatizadas;
> PHP se añadirá como laboratorio independiente. La aplicación
> gestionará preguntas, temas, simulacros, respuestas, intentos y
> estadísticas. El repositorio también contendrá prácticas de SQL,
> Linux, redes, seguridad, legislación y supuestos prácticos. Quiero
> avanzar por fases, empezar con un MVP pequeño y contrastar siempre el
> temario y las reglas del examen con la convocatoria oficial vigente.
> Usa el documento adjunto como contexto y ayúdame a implementar el
> siguiente paso concreto, sin dar por hecho que ya existe código.

### Primer paso recomendado

Empezar por crear el repositorio, el README y un esqueleto mínimo con
`backend/`, `frontend/` y PostgreSQL. No comenzar todavía por
autenticación, estadísticas o despliegues complejos. La primera meta es
ejecutar una aplicación mínima de extremo a extremo y documentar cómo
reproducirla.
