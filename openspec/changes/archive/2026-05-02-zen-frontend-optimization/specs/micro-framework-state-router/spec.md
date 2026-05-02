## ADDED Requirements

### Requirement: Micro-Framework State + Router (<20 lines)
The system SHALL have a unified `store` and `routes` in less than 20 lines, using `$()` helper for DOM queries.

#### Scenario: Store and router under 20 lines
- **WHEN** the application code is reviewed
- **THEN** the combined `$()`, `store`, and `routes` SHALL be under 20 lines

#### Scenario: $() helper works
- **WHEN** `$('#login-form')` is called
- **THEN** it SHALL return the same as `document.querySelector('#login-form')`
