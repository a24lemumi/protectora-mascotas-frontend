## Context

The frontend code has been previously refactored but still has redundancies: `getTemplate()` function with `templates` object, separate `setupLoginForm()` and `setupRegisterForm()` with duplicate logic, multiple `addEventListener` calls, and repetitive DOM queries like `document.getElementById()`. The goal is maximum efficiency with minimalist code ("Zen" approach).

## Goals / Non-Goals

**Goals:**
- Unify `store` and router into a minimalist reactive system (<20 lines)
- Convert Components into one-line arrow functions using advanced string interpolation
- Eliminate multiple `addEventListener` calls with a single global event listener on `document` using `data-attributes`
- Simplify `api.js` to return clean data directly, avoiding repetitive checks in `app.js`
- Replace repetitive `document.getElementById()` with a short helper `$()`
- Move visual logic (like `hidden` class, colors) entirely to CSS, letting JS only change states or `data-attributes`

**Non-Goals:**
- No behavior changes (UI/UX remains identical)
- No new dependencies
- No TypeScript or build tools

## Decisions

1. **Micro-Framework State + Router (<20 lines)**
   - **Decision**: Create `const $ = sel => document.querySelector(sel)` helper and unify store/router:
     ```javascript
     const $ = sel => document.querySelector(sel);
     const store = {
       user: null, theme: localStorage.getItem('theme') || 'light',
       setTheme(t) { this.theme = t; document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); $('#theme-toggle').textContent = t === 'dark' ? '☀️' : '🌙'; },
       setUser(u) { this.user = u; $('#logout-btn').classList.toggle('hidden', !u); }
     };
     const routes = { '#login': () => { content.innerHTML = Components.login(); setupForm('login', API.login); }, ... };
     ```
   - **Rationale**: Reduces ~50 lines to ~15 lines, ultra-minimalist
   - **Alternative considered**: Keeping separate store/router - rejected (not "Zen" enough)

2. **One-line Arrow Function Components**
   - **Decision**: Convert templates to one-line arrow functions:
     ```javascript
     const Components = {
       home: () => `<section class="home-hero"><h2>Encuentra tu compañero ideal</h2><p>Adopta, no compres.</p><button class="btn" onclick="location.hash='#catalog'">Ver Catálogo</button></section>`,
       login: () => `<section class="glass-card" style="max-width:400px;margin:2rem auto;"><h2>Iniciar Sesión</h2><div id="login-message" aria-live="polite"></div><form id="login-form">...</form></section>`,
       // Similar one-line for register and catalog
     };
     ```
   - **Rationale**: Maximum conciseness, functional programming style
   - **Alternative considered**: Multi-line templates - rejected (too verbose)

3. **Global Event Delegation with data-attributes**
   - **Decision**: Use single `document.addEventListener('click', e => { ... })` with `data-action` attributes:
     ```javascript
     document.addEventListener('click', e => {
       const action = e.target.dataset.action;
       if (action === 'login') setupForm('login', API.login);
       if (action === 'logout') { API.logout(); store.setUser(null); location.hash = '#login'; }
       // etc.
     });
     ```
   - **Rationale**: Single listener handles all clicks, no memory leaks
   - **Alternative considered**: Per-element listeners - rejected (wasteful)

4. **Simplified API with Direct Data Return**
   - **Decision**: Remove `response.data?.token` checks from `app.js`, let `api.js` return clean data:
     ```javascript
     // api.js
     return (await response.json()).data || response.json();
     ```
   - **Rationale**: App.js becomes cleaner, no need to check `response.data` every time
   - **Alternative considered**: Keeping response wrapping - rejected (repetitive)

5. **Ultra-short `$()` Helper**
   - **Decision**: Create `const $ = sel => document.querySelector(sel);` and use throughout
   - **Rationale**: Replaces verbose `document.getElementById()` and `document.querySelector()` calls
   - **Alternative considered**: Keeping full calls - rejected (not "Zen")

6. **CSS-only Visual Logic**
   - **Decision**: Move `hidden` class logic to CSS `[data-state="logged-out"] .logout-btn { display: none; }`, use `data-theme` instead of class changes
   - **Rationale**: JS only changes state, CSS handles visual
   - **Alternative considered**: JS manipulating classes - rejected (mixing concerns)

## Risks / Trade-offs

- **[Risk]** One-line components harder to read → Add minimal newlines for readability
- **[Risk]** Global event delegation needs careful `data-action` naming → Document all actions
- **[Trade-off]** Slightly more abstract vs 50% code reduction (269 lines → ~130 lines)
