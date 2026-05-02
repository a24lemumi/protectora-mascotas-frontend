## 1. Micro-Framework State + Router (<20 lines)

- [ ] 1.1 Create `const $ = sel => document.querySelector(sel)` helper
- [ ] 1.2 Create unified `store` and `routes` in under 20 lines total
- [ ] 1.3 Replace all `document.getElementById()` and `document.querySelector()` with `$()`

## 2. Functional One-line Components

- [ ] 2.1 Convert `Components` into one-line (or minimal) arrow functions using template literals
- [ ] 2.2 Ensure interpolation works in one-line format

## 3. Global Event Delegation with data-attributes

- [ ] 3.1 Remove all per-element `addEventListener` calls
- [ ] 3.2 Add single `document.addEventListener('click', e => { ... })` with `data-action` handling
- [ ] 3.3 Add `data-action`, `data-target`, `data-id` attributes to all interactive elements

## 4. Simplified API with Direct Data Return

- [ ] 4.1 Modify `api.js` methods to return `(await response.json()).data || response.json()`
- [ ] 4.2 Remove all `response.data?.token` and `response.data?.data` checks from `app.js`

## 5. CSS-only Visual Logic

- [ ] 5.1 Move `hidden` class logic to CSS: `[data-state="logged-out"] .logout-btn { display: none; }`
- [ ] 5.2 Use `data-theme` attribute instead of class for theme toggling
- [ ] 5.3 Move button color changes to CSS: `[data-status="success"] .btn { background: var(--success); }`

## 6. Code Reduction Verification

- [ ] 6.1 Verify `app.js` is reduced from ~269 lines to ~130 lines (50%+ reduction)
- [ ] 6.2 Verify `store` + `routes` fit in <20 lines
- [ ] 6.3 Verify all functionality works (navigation, login, register, catalog, adopt)
