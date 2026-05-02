## ADDED Requirements

### Requirement: Pet card templates use Spanish property names
The `createPetCard()` and `createPetCardScrollSnap()` functions in `js/app.js` SHALL use Spanish property names from the database: `pet.nombre`, `pet.especie`, `pet.imagen`, `pet.raza`.

#### Scenario: Pet card displays Spanish properties
- **WHEN** a pet card is rendered
- **THEN** it SHALL read `pet.nombre` (not `pet.name`), `pet.especie` (not `pet.species`), `pet.imagen` (not `pet.image`), and `pet.raza` (if available)

#### Scenario: Image fallback works with Spanish property
- **WHEN** `pet.imagen` is empty or null
- **THEN** the card SHALL display the placeholder image
