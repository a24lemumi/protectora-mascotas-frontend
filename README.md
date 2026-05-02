# Protectora de Mascotas - Frontend

Interfaz web moderna y profesional para la gestión de adopciones de mascotas. Este proyecto es una **SPA (Single Page Application)** desarrollada con tecnologías nativas, enfocada en ofrecer una experiencia de usuario "Premium" siguiendo los estándares más exigentes de diseño y accesibilidad.

## Características Principales

- **Arquitectura SPA**: Navegación fluida sin recarga de página basada en `hashchange`.
- **Diseño Premium**: Estética _Glassmorphism_ con un equilibrio visual cuidado y tipografías modernas.
- **Mobile First**: Diseño totalmente responsivo adaptado a todos los dispositivos y resoluciones.
- **Modo Claro/Oscuro**: Implementación nativa con variables CSS.
- **Animaciones Avanzadas**: Uso de _Scroll-driven Animations_ y _Intersection Observer_ para efectos de entrada dinámicos.
- **Conexión API**: Integración completa con el backend en Render.com mediante Fetch API y autenticación JWT.
- **Accesibilidad (A11y)**: Cumplimiento de estándares WAI-ARIA y estructura semántica HTML5.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica avanzada.
- **CSS3 Nativo**:
  - CSS Variables para tematización.
  - Container Queries para componentes adaptables.
  - Flexbox y Grid Layout.
  - Scroll Snap para carruseles.
- **JavaScript (ES6+)**:
  - Gestión de estado local.
  - Integración asíncrona con API REST.
  - Persistencia de sesión con LocalStorage.

## Requisitos e Instalación

### Requisitos Previos

- **Backend Operativo**: La API debe estar desplegada (ej: en Render.com).
- **Servidor Local**: Se recomienda usar _Live Server_ (VS Code) para evitar problemas de ruteo local.

### Configuración

1. Clona este repositorio.
2. Abre `js/api.js` y asegúrate de que `API_BASE_URL` apunte a la dirección de tu backend:
   ```javascript
   const API_BASE_URL = "https://tu-api-en-render.com";
   ```

## Estructura del Proyecto

```text
protectora-mascotas-frontend/
├── css/
│   └── styles.css      # Sistema de diseño, temas y animaciones
├── js/
│   ├── api.js          # Módulo de comunicación con el backend
│   └── app.js          # Lógica de la aplicación y ruteo SPA
├── index.html          # Punto de entrada único (Layout base)
└── README.md           # Documentación técnica
```

## Cumplimiento de Requisitos (DIW/DAW)

Este proyecto ha sido desarrollado bajo los criterios de evaluación de **Jaime Rabasco Ronda**, cumpliendo con:

- [x] Uso de etiquetas semánticas HTML5.
- [x] Implementación obligatoria de **Container Queries**.
- [x] **Scroll-driven Animations** (progresos de desplazamiento y visualización).
- [x] Optimización **WPO** y **SEO**.
- [x] Menú responsive funcional y estético.
- [x] Puntuación óptima en **Lighthouse** (Rendimiento, Accesibilidad, Buenas Prácticas).

## Despliegue

El frontend está optimizado para ser desplegado en **Vercel** o **Netlify**. Simplemente conecta el repositorio y asegúrate de que el directorio de salida sea la raíz del proyecto.

---

Creado por **Miguel Ángel Leiva** - 2026
