## ADDED Requirements

### Requirement: Component object for HTML templates
The system SHALL have a `Components` object that centralizes all HTML templates (home, login, register, catalog).

#### Scenario: Templates centralized
- **WHEN** the application needs to render a view
- **THEN** it SHALL read from `Components.home`, `Components.login`, etc.

### Requirement: Unified renderPet function
The system SHALL have a single `renderPet(pet, options)` function with an `isScrollSnap` option that serves both grid and scroll-snap, eliminating code duplication.

#### Scenario: Render pet card for grid
- **WHEN** `renderPet(pet)` is called without options
- **THEN** it SHALL render a standard pet card for the grid

#### Scenario: Render pet card for scroll-snap
- **WHEN** `renderPet(pet, { isScrollSnap: true })` is called
- **THEN** it SHALL render a pet card optimized for scroll-snap container
