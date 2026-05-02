## ADDED Requirements

### Requirement: Backend API communication
The `api.js` module SHALL communicate with `https://protectora-mascotas-backend.onrender.com` using fetch API for all CRUD operations.

#### Scenario: Successful API request
- **WHEN** a GET request is made to `/api/pets`
- **THEN** the system SHALL return the JSON response from the backend

#### Scenario: API error handling
- **WHEN** the backend returns an error (4xx or 5xx)
- **THEN** the system SHALL throw an error with the status and message

### Requirement: JWT token management
The system SHALL store JWT tokens in localStorage and automatically attach them to authenticated API requests via Authorization header.

#### Scenario: Token storage after login
- **WHEN** user successfully logs in
- **THEN** the JWT token SHALL be stored in localStorage with key `auth_token`

#### Scenario: Token attachment to requests
- **WHEN** an API request requires authentication
- **THEN** the request SHALL include `Authorization: Bearer <token>` header

#### Scenario: Token removal on logout
- **WHEN** user logs out
- **THEN** the `auth_token` SHALL be removed from localStorage

### Requirement: Automatic token injection
The API module SHALL automatically check localStorage for a valid token and inject it into all requests that require authentication.

#### Scenario: Authenticated request with token
- **WHEN** a request is made to a protected endpoint and token exists
- **THEN** the Authorization header SHALL be automatically added
