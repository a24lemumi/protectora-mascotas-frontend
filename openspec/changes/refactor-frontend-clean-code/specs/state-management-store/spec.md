## ADDED Requirements

### Requirement: Centralized state store
The system SHALL have a `store` object that centralizes user state and theme: `{ user: null, theme: 'light', setTheme(), setUser() }`.

#### Scenario: Theme state centralized
- **WHEN** user clicks theme toggle
- **THEN** `store.setTheme(next)` SHALL update both localStorage and the DOM

#### Scenario: User state centralized
- **WHEN** user logs in
- **THEN** `store.setUser(data)` SHALL update the store and UI elements
