## Context

The frontend SPA needs to be fully synchronized with the backend API on Render.com. The backend already has CORS middleware globally registered (index.php line 38). The API endpoints in `js/api.js` are correctly configured. However, two issues remain: (1) The registration form sends `name` field but backend validator expects `username`, and (2) Pet card templates use English property names while the database returns Spanish field names.

## Goals / Non-Goals

**Goals:**
- Change registration form to send `username` instead of `name` to match backend validator
- Update pet card templates to use Spanish property names from database: `nombre`, `especie`, `imagen`, `raza`

**Non-Goals:**
- No API endpoint changes (already correct)
- No backend modifications (CORS already fixed)

## Decisions

1. **Registration field name fix**
   - **Decision**: Change `name: name.value` to `username: name.value` in the register form submission
   - **Rationale**: Backend validator expects `username` field
   - **Alternative considered**: Changing backend to accept `name` - rejected to avoid backend changes

2. **Spanish property mapping in pet cards**
   - **Decision**: Update `createPetCard()` and `createPetCardScrollSnap()` to use `pet.nombre`, `pet.especie`, `pet.imagen`, `pet.raza`
   - **Rationale**: Database returns Spanish field names; templates must match
   - **Alternative considered**: Adding a mapping layer - rejected as unnecessary complexity

## Risks / Trade-offs

- **Missing fields**: If database schema changes, templates may break → Verify field names before deployment
