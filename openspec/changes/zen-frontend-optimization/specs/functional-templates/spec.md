## ADDED Requirements

### Requirement: One-line Arrow Function Components
The system SHALL convert Components into one-line arrow functions using advanced string interpolation.

#### Scenario: Component as one-line arrow function
- **WHEN** `Components.home()` is called
- **THEN** it SHALL return HTML template in a single line (or minimal lines with template literals)

#### Scenario: Interpolation in one-line components
- **WHEN** a component uses `${variable}` interpolation
- **THEN** it SHALL render correctly with the interpolated values
