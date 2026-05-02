## ADDED Requirements

### Requirement: API methods for pet CRUD operations
The system SHALL provide API methods `createPet(data)`, `updatePet(id, data)` and `deletePet(id)` in `js/api.js`.
Update and Delete requests MUST use POST method with `_method` field set to 'PUT' or 'DELETE' respectively.

#### Scenario: Create pet successfully
- **WHEN** `createPet(data)` is called with valid pet data
- **THEN** system sends POST request to pets API endpoint with pet data

#### Scenario: Update pet using POST with _method override
- **WHEN** `updatePet(id, data)` is called with pet id and data
- **THEN** system sends POST request with `_method: 'PUT'` in the body

#### Scenario: Delete pet using POST with _method override
- **WHEN** `deletePet(id)` is called with pet id
- **THEN** system sends POST request with `_method: 'DELETE'` in the body

### Requirement: Admin route with token protection
The system SHALL create route `#admin` in `js/app.js` that renders admin management view.
If no token exists in localStorage, system SHALL redirect to `#login`.

#### Scenario: Access admin route with valid token
- **WHEN** user navigates to `#admin` with valid token in localStorage
- **THEN** system renders the pet management view

#### Scenario: Access admin route without token
- **WHEN** user navigates to `#admin` without token in localStorage
- **THEN** system redirects to `#login`

### Requirement: Pet list table in admin view
The system SHALL render a table or simplified grid listing all pets in the admin view.

#### Scenario: Display pets in admin table
- **WHEN** admin view is rendered
- **THEN** system displays all pets with their information in a table/grid

### Requirement: Dual-purpose form for Create/Edit pets
The system SHALL provide a dynamic form (modal) for creating and editing pets.
Form fields SHALL include: Nombre, Especie (Select), Raza, and Imagen (URL).
In edit mode, form SHALL preload selected pet's data.

#### Scenario: Open form to create new pet
- **WHEN** user clicks create button in admin view
- **THEN** system displays empty form with fields: Nombre, Especie, Raza, Imagen

#### Scenario: Open form to edit existing pet
- **WHEN** user clicks edit button for a pet
- **THEN** system displays form preloaded with that pet's data

#### Scenario: Submit form to create pet
- **WHEN** user fills form and submits in create mode
- **THEN** system calls `createPet(data)` and refreshes view on success

#### Scenario: Submit form to update pet
- **WHEN** user fills form and submits in edit mode
- **THEN** system calls `updatePet(id, data)` and refreshes view on success

### Requirement: Edit and Delete actions in admin UI
The system SHALL add 'Edit' and 'Delete' buttons for each pet in the admin view.
Delete action SHALL use native `confirm()` dialog before executing `deletePet`.

#### Scenario: Edit pet from admin table
- **WHEN** user clicks 'Edit' button for a pet
- **THEN** system opens form preloaded with that pet's data

#### Scenario: Delete pet with confirmation
- **WHEN** user clicks 'Delete' button for a pet
- **THEN** system shows `confirm()` dialog, and if confirmed, calls `deletePet(id)`

### Requirement: Auto-refresh view after operations
The system SHALL refresh the admin view automatically after successful CRUD operations.

#### Scenario: Refresh after create
- **WHEN** pet is created successfully
- **THEN** admin view refreshes to show updated pet list

#### Scenario: Refresh after update
- **WHEN** pet is updated successfully
- **THEN** admin view refreshes to show updated pet list

#### Scenario: Refresh after delete
- **WHEN** pet is deleted successfully
- **THEN** admin view refreshes to show updated pet list

### Requirement: Admin styles with dark mode support
The system SHALL add CSS rules in `css/styles.css` for admin table, floating '+'' create button, and edit/delete button states.
Styles MUST maintain Premium aesthetic and support dark mode.

#### Scenario: Admin table styling
- **WHEN** admin view is rendered
- **THEN** pet table displays with Premium aesthetic styles

#### Scenario: Floating create button
- **WHEN** admin view is rendered
- **THEN** floating '+' button displays with appropriate styling

#### Scenario: Dark mode support for admin elements
- **WHEN** dark mode is active
- **THEN** all admin elements display correctly with dark theme
