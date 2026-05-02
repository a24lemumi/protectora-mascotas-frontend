## ADDED Requirements

### Requirement: Ultra-short $() DOM Helper
The system SHALL replace repetitive `document.getElementById()` and `document.querySelector()` calls with a single `$()` helper function.

#### Scenario: $() replaces getElementById
- **WHEN** `$('#login-form')` is called
- **THEN** it SHALL return the element with id `login-form`

#### Scenario: $() is shorter than full DOM queries
- **WHEN** code is reviewed
- **THEN** all DOM queries SHALL use `$()` instead of `document.querySelector()` or `document.getElementById()`
