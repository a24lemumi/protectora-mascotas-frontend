## ADDED Requirements

### Requirement: Dynamic pet catalog rendering
The application SHALL fetch and render a list of pets from the backend API dynamically in the catalog view.

#### Scenario: Catalog loads with pets
- **WHEN** user navigates to `#catalog`
- **THEN** the system SHALL fetch pets from `GET /api/pets` and render them as cards

#### Scenario: Empty catalog state
- **WHEN** no pets are available from the API
- **THEN** the catalog SHALL display an empty state message

### Requirement: Functional adoption button
Each pet card SHALL have an "Adopt" button that calls the backend adoption endpoint and updates the UI on success.

#### Scenario: Successful adoption
- **WHEN** user clicks "Adopt" on a pet card and confirms
- **THEN** the system SHALL call `POST /api/adoptions` with pet ID and show success feedback

#### Scenario: Adoption UI update
- **WHEN** adoption is successful
- **THEN** the pet card SHALL update to show "Already adopted" or be removed from available list

### Requirement: Login/Register forms with visual feedback
The application SHALL provide Login and Register forms with validation and visual feedback (success/error states).

#### Scenario: Login form validation
- **WHEN** user submits login form with invalid credentials
- **THEN** the form SHALL display an error message in red with the backend error

#### Scenario: Registration success feedback
- **WHEN** user successfully registers
- **THEN** the form SHALL display a success message and redirect to login or catalog
