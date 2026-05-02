## ADDED Requirements

### Requirement: Native light/dark mode support
The design system SHALL support native light/dark mode using `prefers-color-scheme` media query and a manual toggle button with CSS custom properties.

#### Scenario: System dark mode detection
- **WHEN** user's system prefers dark mode (`prefers-color-scheme: dark`)
- **THEN** the application SHALL display in dark mode by default

#### Scenario: Manual theme toggle
- **WHEN** user clicks the theme toggle button
- **THEN** the application SHALL switch between light and dark mode

### Requirement: Modern typography
The design system SHALL use Outfit font for headings and Inter font for body text, loaded from Google Fonts.

#### Scenario: Font loading
- **WHEN** the application loads
- **THEN** Outfit SHALL be applied to all heading elements (`h1`-`h6`) and Inter SHALL be applied to body text

### Requirement: Glassmorphism aesthetics
The design system SHALL implement Glassmorphism effects using `backdrop-filter: blur()` with semi-transparent backgrounds and borders.

#### Scenario: Glassmorphism card effect
- **WHEN** a card component is rendered
- **THEN** it SHALL have `backdrop-filter: blur(10px)`, semi-transparent background, and subtle border

### Requirement: Mobile-first responsive design
The design system SHALL follow a mobile-first approach with styles starting at smallest viewport and using `min-width` media queries.

#### Scenario: Mobile viewport rendering
- **WHEN** the viewport width is 320px or less
- **THEN** all components SHALL be fully visible and usable without horizontal scroll

### Requirement: Container Queries for pet cards
Pet cards SHALL use CSS Container Queries (`@container`) for responsive behavior instead of viewport media queries.

#### Scenario: Card in narrow container
- **WHEN** a pet card is placed in a container less than 300px wide
- **THEN** the card layout SHALL adjust to single-column vertical layout
