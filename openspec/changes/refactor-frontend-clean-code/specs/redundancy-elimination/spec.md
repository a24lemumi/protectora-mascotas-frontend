## ADDED Requirements

### Requirement: Event delegation for adopt buttons
The system SHALL use event delegation by adding a single click listener to `#pet-grid` and `#featured-pets` containers instead of individual listeners on each adopt button.

#### Scenario: Adopt button click via delegation
- **WHEN** user clicks an `.adopt-btn` inside `#pet-grid`
- **THEN** the click SHALL be captured by the container's event listener using `e.target.closest('.adopt-btn')`

### Requirement: Unified CSS styles
The system SHALL unify common CSS styles (e.g., similar padding/margins in `.glass-card` and `.pet-card`) to reduce redundancy.

#### Scenario: CSS redundancy eliminated
- **WHEN** styles are reviewed in `styles.css`
- **THEN** common properties SHALL be unified or use shared CSS custom properties
