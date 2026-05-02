## Why

The frontend code has been refactored but still has redundancies: `getTemplate()` function with `templates` object, separate `setupLoginForm()` and `setupRegisterForm()` with duplicate logic, multiple `addEventListener` calls, and repetitive DOM queries. The goal is maximum efficiency with minimalist "Zen" code.

## What Changes

- **Micro-Framework State + Router**: Unify `store` and router into a minimalist reactive system (`$()` helper, `store`, `routes`) in under 20 lines
- **Functional One-line Components**: Convert Components into one-line arrow functions using advanced string interpolation
- **Global Event Delegation**: Eliminate multiple `addEventListener` calls with a single listener on `document` using `data-action` attributes
- **Simplified API**: Make `api.js` return clean data directly, avoiding repetitive checks in `app.js`
- **Ultra-short `$()` Helper**: Replace repetitive `document.getElementById()` with a short `$()` function
- **Atomic CSS**: Move visual logic (like `hidden` class, colors) entirely to CSS, letting JS only change states or `data-attributes`

## Capabilities

### New Capabilities
- `micro-framework-state-router`: Unified `$()`, `store`, `routes` in <20 lines
- `functional-templates`: One-line arrow function components
- `global-event-delegation`: Single `document` click listener with `data-action`
- `fetch-abstraction`: Simplified `api.js` with direct data return
- `dom-helper`: Ultra-short `$()` helper
- `atomic-styles`: CSS-only visual logic with `data-attributes`

### Modified Capabilities

## Impact

- **Code**: `js/app.js` (major optimization, ~130 lines vs ~269), `js/api.js` (simplified returns), `css/styles.css` (atomic styles)
- **No behavior changes**: UI/UX remains identical
- **Maintainability**: ~50% code reduction with "Zen" minimalist approach
