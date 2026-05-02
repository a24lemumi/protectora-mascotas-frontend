## ADDED Requirements

### Requirement: Correct register endpoint
The `API.register()` method in `js/api.js` SHALL call `/api/auth/register` to match the backend route.

#### Scenario: Register endpoint matches backend
- **WHEN** the `API.register()` method is called with user data
- **THEN** the request SHALL be sent to `/api/auth/register` (not `/api/register`)

#### Scenario: Registration succeeds after fix
- **WHEN** a user submits the registration form after the fix
- **THEN** the request SHALL reach the backend `UsuariosController::register()` method without 404 error
