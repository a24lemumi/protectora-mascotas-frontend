## ADDED Requirements

### Requirement: Semantic HTML structure
The index.html SHALL provide a semantic HTML5 structure with `<header>`, `<main>`, `<section>` elements and appropriate ARIA landmarks.

#### Scenario: Valid semantic structure
- **WHEN** the application loads
- **THEN** the DOM SHALL contain semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)

### Requirement: Hash-based SPA routing
The application SHALL implement client-side navigation using hash-based routing (`#login`, `#register`, `#catalog`) without page reloads.

#### Scenario: Navigation to catalog view
- **WHEN** user clicks on "Catalog" link or URL contains `#catalog`
- **THEN** the catalog view SHALL render in `<main>` without page reload

#### Scenario: Navigation to login view
- **WHEN** user clicks on "Login" link or URL contains `#login`
- **THEN** the login form SHALL render in `<main>` without page reload

### Requirement: Dynamic view rendering
The application SHALL render different views dynamically in the `<main>` container based on the current hash route.

#### Scenario: View content replacement
- **WHEN** route changes from `#login` to `#catalog`
- **THEN** the `<main>` content SHALL be replaced with catalog HTML without page refresh
