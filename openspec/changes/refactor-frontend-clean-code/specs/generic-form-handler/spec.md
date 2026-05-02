## ADDED Requirements

### Requirement: Generic form handler
The system SHALL have a `handleFormSubmit(formId, apiMethod, successCallback)` function that generically handles preventDefault, error clearing, loading state, and visual feedback for Login and Register forms.

#### Scenario: Login form submission
- **WHEN** user submits the login form
- **THEN** `handleFormSubmit('login-form', API.login, callback)` SHALL handle the entire submission flow

#### Scenario: Register form submission
- **WHEN** user submits the register form
- **THEN** `handleFormSubmit('register-form', API.register, callback)` SHALL handle the entire submission flow
