## Why

The frontend code has significant code duplication (separate `createPetCard()` and `createPetCardScrollSnap()` functions with nearly identical HTML), repetitive form handling logic in `setupLoginForm()` and `setupRegisterForm()`, imperative if/else routing in `renderView()`, and multiple event listeners that could be optimized with event delegation. Refactoring will improve maintainability, reduce bundle size, and make the code more scalable.

## What Changes

- **Componentization**: Create a `Components` object to hold HTML templates and a single `renderPet(pet, options)` function that serves both grid and scroll-snap, eliminating code duplication
- **Generic Form Controller**: Create `handleFormSubmit(formId, apiMethod, successCallback)` to generically handle preventDefault, error clearing, loading state, and visual feedback for Login and Register forms
- **Declarative Router**: Replace if/else in `renderView()` with a declarative `routes` map: `{ '#login': setupLogin, '#register': setupRegister, '#catalog': loadPets }`
- **State Management**: Centralize user state and theme in a small `store` object for coherent UI updates
- **Redundancy Elimination**: Unify common CSS styles, use event delegation in JS to reduce active event listeners

## Capabilities

### New Capabilities
- `componentization`: Create `Components` object and unified `renderPet()` function
- `generic-form-handler`: Create `handleFormSubmit()` for Login/Register forms
- `declarative-router`: Replace if/else with `routes` map in `renderView()`
- `state-management-store`: Centralize state in `store` object
- `redundancy-elimination`: Unify CSS and use event delegation

### Modified Capabilities

## Impact

- **Code**: `js/app.js` (major refactor), `css/styles.css` (unify common styles)
- **No API changes**: Behavior remains identical, only internal structure changes
- **Maintainability**: Reduces ~269 lines to ~180 lines (33% reduction)
