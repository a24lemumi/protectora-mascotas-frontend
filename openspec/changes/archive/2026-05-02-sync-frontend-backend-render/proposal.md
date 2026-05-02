## Why

Synchronize the frontend with the backend on Render.com. The registration form sends `name` but the backend expects `username`. Pet card templates use English property names (`name`, `species`, `image`) but the database returns Spanish names (`nombre`, `especie`, `imagen`).

## What Changes

- **Backend**: Verify `$dispatcher->addGlobalMiddleware(\App\Middleware\CorsMiddleware::class)` is present in `public/index.php` (already done in previous change)
- **Frontend API**: Verify endpoints in `js/api.js` match backend routes (already correct: `/api/auth/login`, `/api/mascotas`, `/api/mascotas/${petId}/adoptar`)
- **Registration Logic**: In `js/app.js`, change `name: name.value` to `username: name.value` in the register function call to match backend validator
- **Data Mapping**: In `js/app.js`, update `createPetCard` and `createPetCardScrollSnap` functions to use Spanish property names from database: `pet.nombre`, `pet.especie`, `pet.imagen`, `pet.raza` instead of English names

## Capabilities

### New Capabilities
- `sync-frontend-backend-render`: Synchronize frontend with backend on Render.com
- `fix-registration-username`: Change registration form to send `username` instead of `name`
- `fix-pet-data-mapping`: Update pet card templates to use Spanish database field names

### Modified Capabilities

## Impact

- **Code**: `js/app.js` (registration form data, pet card templates)
- **Backend**: No changes needed (CORS middleware already added, endpoints already correct)
- **API**: Frontend will now correctly send `username` field and display Spanish-named properties
