## Context

The Pet Shelter currently needs a professional frontend SPA to interact with the existing backend API at `https://protectora-mascotas-backend.onrender.com`. The application must provide a modern, accessible, and performant user experience with premium design aesthetics.

## Goals / Non-Goals

**Goals:**
- Build a single-page application with no page reloads using vanilla JavaScript
- Implement JWT-based authentication with token storage in localStorage
- Create a premium Glassmorphism design system with native light/dark mode support
- Develop a dynamic pet catalog with functional adoption workflow
- Implement native scroll-driven animations and scroll snap effects
- Achieve high Lighthouse scores with full WAI-ARIA compliance

**Non-Goals:**
- No framework usage (React, Vue, etc.) - vanilla JS only
- No backend modifications
- No complex state management library

## Decisions

1. **Vanilla JavaScript SPA Architecture**
   - **Decision**: Use vanilla JS with hash-based routing (`#view`) for SPA navigation
   - **Rationale**: Lightweight, no build tools required, faster WPO
   - **Alternative considered**: React/Vue - rejected due to build complexity and bundle size

2. **JWT Storage in localStorage**
   - **Decision**: Store JWT token in localStorage with automatic attachment to API requests
   - **Rationale**: Simple persistence across sessions, easy to implement
   - **Alternative considered**: sessionStorage - rejected as it doesn't persist across tab closures

3. **CSS-Only Dark Mode with Container Queries**
   - **Decision**: Use `prefers-color-scheme` media query + manual toggle with CSS custom properties
   - **Rationale**: Native performance, no JS needed for theme switching
   - **Container Queries**: Enable responsive pet cards without media query breakpoints

4. **Glassmorphism Design System**
   - **Decision**: Use backdrop-filter with semi-transparent backgrounds and blur effects
   - **Typography**: Google Fonts - Outfit for headings, Inter for body text
   - **Rationale**: Modern "wow" factor while maintaining readability

5. **Scroll-Driven Animations (Native)**
   - **Decision**: Use CSS `animation-timeline: scroll()` and `view-timeline` for scroll-driven effects
   - **Rationale**: Hardware-accelerated, no JS needed for animation triggers
   - **Fallback**: Intersection Observer API for browsers without support

6. **API Communication Layer**
   - **Decision**: Centralized `api.js` module with fetch-based requests and automatic token injection
   - **Rationale**: Single point of API interaction, easier maintenance

## Risks / Trade-offs

- **Scroll-driven animations browser support** → Provide Intersection Observer fallback for older browsers
- **localStorage JWT security** → Token expiration handled by backend; consider XSS protection via CSP headers
- **Glassmorphism performance on mobile** → Use `will-change: transform` sparingly, test on low-end devices
- **No framework = more boilerplate** → Acceptable trade-off for WPO and simplicity
