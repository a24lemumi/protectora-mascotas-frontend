## 1. Project Structure and Semantic HTML

- [x] 1.1 Create `index.html` with semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [x] 1.2 Add SEO meta tags (`description`, `viewport`, Open Graph tags) to `<head>`
- [x] 1.3 Create folder structure: `css/`, `js/`, and link Google Fonts (Outfit, Inter)
- [x] 1.4 Add ARIA landmarks and roles to semantic elements

## 2. API Integration Layer

- [x] 2.1 Create `js/api.js` with base URL configured to `https://protectora-mascotas-backend.onrender.com`
- [x] 2.2 Implement `apiRequest()` function with fetch, error handling, and JSON parsing
- [x] 2.3 Add JWT token management: `setToken()`, `getToken()`, `removeToken()` using localStorage
- [x] 2.4 Implement automatic Authorization header injection for authenticated requests
- [x] 2.5 Create API methods: `login()`, `register()`, `getPets()`, `adoptPet()`, `logout()`

## 3. Premium Design System (CSS)

- [x] 3.1 Create `css/styles.css` with CSS custom properties for light/dark theme colors
- [x] 3.2 Implement native dark mode using `prefers-color-scheme` media query
- [x] 3.3 Add theme toggle button with manual switching logic (JS + CSS class)
- [x] 3.4 Implement Glassmorphism effects: `backdrop-filter: blur()`, semi-transparent backgrounds, subtle borders
- [x] 3.5 Configure typography: Outfit for headings (`h1`-`h6`), Inter for body text
- [x] 3.6 Implement mobile-first approach with `min-width` media queries
- [x] 3.7 Add Container Queries (`@container`) for pet card responsive behavior
- [x] 3.8 Style form elements with visual feedback states (error, success, loading)

## 4. SPA Architecture and Navigation

- [x] 4.1 Implement hash-based routing in `js/app.js` (`#login`, `#register`, `#catalog`, `#home`)
- [x] 4.2 Create `renderView()` function to dynamically inject HTML into `<main>` without reload
- [x] 4.3 Add event listeners for navigation links with `preventDefault()` and hash change
- [x] 4.4 Implement view guard: redirect to `#login` if accessing protected routes without auth

## 5. Authentication (Login/Register)

- [x] 5.1 Create Login form HTML template with email, password fields and submit button
- [x] 5.2 Create Register form HTML template with name, email, password fields
- [x] 5.3 Implement form validation with visual feedback (red/green borders, error messages)
- [x] 5.4 Add `aria-live="polite"` regions for form error/success messages
- [x] 5.5 Connect Login form to `api.login()` and store token on success
- [x] 5.6 Connect Register form to `api.register()` and show success feedback
- [x] 5.7 Implement logout functionality: remove token, redirect to `#login`

## 6. Pet Catalog and Adoption

- [x] 6.1 Create pet card HTML template with image, name, species, description, and "Adopt" button
- [x] 6.2 Implement `loadPets()` function: fetch from `GET /api/pets` and render cards
- [x] 6.3 Add empty state message when no pets are available
- [x] 6.4 Implement "Adopt" button click handler: confirm dialog + call `POST /api/adoptions`
- [x] 6.5 Update pet card UI on successful adoption (change button text, disable, or remove card)
- [x] 6.6 Add loading spinner while fetching pets from API

## 7. Scroll-Driven Animations

- [x] 7.1 Implement native scroll-driven animations using `animation-timeline: view()` for pet cards
- [x] 7.2 Create `@keyframes` for fade-in and slide-up effect on card appearance
- [x] 7.3 Add fallback using Intersection Observer API for browsers without `animation-timeline` support
- [x] 7.4 Implement scroll snap container with `scroll-snap-type: x mandatory` for featured pets
- [x] 7.5 Add `scroll-snap-align: start` to pet cards in horizontal scroll sections

## 8. Accessibility and WPO

- [x] 8.1 Audit and add missing ARIA attributes (`aria-label`, `role`, `aria-live`) to interactive elements
- [x] 8.2 Ensure all images have descriptive `alt` attributes
- [x] 8.3 Verify keyboard navigation works (tab order, focus indicators, enter/space to activate)
- [x] 8.4 Test with screen reader compatibility (NVDA/VoiceOver)
- [x] 8.5 Optimize CSS: remove unused styles, minimize redundancy
- [x] 8.6 Optimize JS: defer non-critical scripts, minimize DOM queries
- [x] 8.7 Run Lighthouse audit and achieve 90+ performance score
- [x] 8.8 Verify Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
