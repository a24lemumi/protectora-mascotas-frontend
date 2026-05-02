## Context

The frontend JavaScript (`app.js`) is ~269 lines with significant code duplication: two nearly identical pet card functions (`createPetCard()` and `createPetCardScrollSnap()`), repetitive form handling logic in `setupLoginForm()` and `setupRegisterForm()`, an imperative if/else chain in `renderView()`, and multiple individual event listeners that could be optimized with event delegation.

## Goals / Non-Goals

**Goals:**
- Create `Components` object to centralize HTML templates
- Create unified `renderPet(pet, options)` function to replace duplicate pet card functions
- Create `handleFormSubmit()` generic form handler for Login/Register
- Replace if/else in `renderView()` with declarative `routes` map
- Centralize state in `store` object for user and theme
- Unify common CSS styles and use event delegation

**Non-Goals:**
- No behavior changes (UI/UX remains identical)
- No API changes
- No new dependencies

## Decisions

1. **Component Object Pattern**
   - **Decision**: Create `const Components = { home, login, register, catalog }` to hold all HTML templates
   - **Rationale**: Centralizes templates, easier to maintain
   - **Alternative considered**: Separate template files - rejected (want to keep SPA single-file)

2. **Unified renderPet() Function**
   - **Decision**: Create `function renderPet(pet, options = {})` with `isScrollSnap` option
   - **Rationale**: Eliminates 90% of code duplication between the two pet card functions
   - **Alternative considered**: Keeping both functions - rejected (duplication is the problem)

3. **Generic Form Handler**
   - **Decision**: Create `function handleFormSubmit(formId, apiCall, successCallback)`
   - **Rationale**: Reduces form setup from ~25 lines to ~3 lines per form
   - **Alternative considered**: Form-specific handlers - rejected (repetitive pattern)

4. **Declarative Router**
   - **Decision**: Create `const routes = { '#login': () => setupLogin(), ... }` and use `routes[hash]?()`
   - **Rationale**: More scalable, easier to add new routes
   - **Alternative considered**: Switch statement - rejected (less declarative)

5. **State Store**
   - **Decision**: Create `const store = { user: null, theme: 'light', setTheme(), setUser() }`
   - **Rationale**: Centralizes state management, UI updates become coherent
   - **Alternative considered**: Scattered state - rejected (harder to debug)

6. **Event Delegation**
   - **Decision**: Add single click listener to `#pet-grid` and `#featured-pets` for adopt buttons
   - **Rationale**: Reduces event listeners from N (per pet) to 2 (per container)
   - **Alternative considered**: Individual listeners - rejected (wasteful)

## Risks / Trade-offs

- **[Risk]** Generic abstractions may be harder to understand initially → Add clear comments
- **[Risk]** Event delegation requires proper target checking → Test thoroughly with `e.target.closest()`
- **[Trade-off]** Slightly more abstract code vs 33% reduction in lines (269 → ~180)
