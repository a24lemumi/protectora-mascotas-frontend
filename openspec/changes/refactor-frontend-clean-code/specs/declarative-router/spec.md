## ADDED Requirements

### Requirement: Declarative router with routes map
The system SHALL replace the if/else chain in `renderView()` with a declarative `routes` map: `{ '#login': setupLogin, '#register': setupRegister, '#catalog': loadPets }`.

#### Scenario: Route matches hash
- **WHEN** `window.location.hash` is `'#catalog'`
- **THEN** the system SHALL execute `routes['#catalog']()`

#### Scenario: Route not found
- **WHEN** `window.location.hash` is `'#unknown'`
- **THEN** the system SHALL fall back to home template
