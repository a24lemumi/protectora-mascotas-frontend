## ADDED Requirements

### Requirement: Registration form sends username field
The `setupRegisterForm()` function in `js/app.js` SHALL send `username` field (not `name`) to match the backend validator.

#### Scenario: Registration with correct field name
- **WHEN** user submits the registration form
- **THEN** the API call SHALL include `username: name.value` (not `name: name.value`)

#### Scenario: Backend validation passes
- **WHEN** the registration request includes `username` field
- **THEN** the backend validator SHALL accept the request without field name error
