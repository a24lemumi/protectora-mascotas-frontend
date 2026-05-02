## 1. Verify Backend CORS Middleware

- [x] 1.1 Verify `$dispatcher->addGlobalMiddleware(\App\Middleware\CorsMiddleware::class)` is present in `backend/public/index.php` (line ~38)

## 2. Verify Frontend API Endpoints

- [x] 2.1 Verify `login` endpoint in `js/api.js` points to `/api/auth/login`
- [x] 2.2 Verify `getPets` endpoint in `js/api.js` points to `/api/mascotas`
- [x] 2.3 Verify `adoptPet` endpoint in `js/api.js` points to `/api/mascotas/${petId}/adoptar`

## 3. Fix Registration Form Field Name

- [x] 3.1 Change `name: name.value` to `username: name.value` in `setupRegisterForm()` in `js/app.js` (line ~168)

## 4. Fix Pet Card Data Mapping (Spanish Properties)

- [x] 4.1 Update `createPetCard()` in `js/app.js` to use `pet.nombre` instead of `pet.name`
- [x] 4.2 Update `createPetCard()` to use `pet.especie` instead of `pet.species`
- [x] 4.3 Update `createPetCard()` to use `pet.imagen` instead of `pet.image`
- [x] 4.4 Update `createPetCardScrollSnap()` to use `pet.nombre`, `pet.especie`, `pet.imagen`
- [x] 4.5 Update alt text in both functions to use `pet.nombre` instead of `pet.name`

## 5. Testing

- [x] 5.1 Test registration form sends `username` field correctly
- [x] 5.2 Test pet cards display data from Spanish property names
- [x] 5.3 Test image fallback works with `pet.imagen` field
