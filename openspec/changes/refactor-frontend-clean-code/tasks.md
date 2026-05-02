## 1. Create Components Object

- [ ] 1.1 Create `const Components = { home: () => \`...\`, login: () => \`...\`, register: () => \`...\`, catalog: (pets, featured) => \`...\` }` with all HTML templates
- [ ] 1.2 Remove `getTemplate()` function and replace with `Components[name]()` calls

## 2. Create Unified renderPet() Function

- [ ] 2.1 Create `function renderPet(pet, options = {})` with `isScrollSnap` option
- [ ] 2.2 Update function to render standard card when `options.isScrollSnap` is falsy
- [ ] 2.3 Update function to render scroll-snap card when `options.isScrollSnap` is truthy
- [ ] 2.4 Replace `createPetCard()` and `createPetCardScrollSnap()` calls with `renderPet()` calls

## 3. Create Generic Form Handler

- [ ] 3.1 Create `function handleFormSubmit(formId, apiMethod, successCallback)` that handles preventDefault, error clearing, loading state
- [ ] 3.2 Refactor `setupLoginForm()` to use `handleFormSubmit('login-form', API.login, callback)`
- [ ] 3.3 Refactor `setupRegisterForm()` to use `handleFormSubmit('register-form', API.register, callback)`

## 4. Implement Declarative Router

- [ ] 4.1 Create `const routes = { '#home': () => renderView('home'), '#login': () => setupLogin(), '#register': () => setupRegister(), '#catalog': () => loadPets() }`
- [ ] 4.2 Replace if/else in `renderView()` with `const routeFn = routes[hash]; routeFn ? routeFn() : renderView('home')`

## 5. Centralize State in Store Object

- [ ] 5.1 Create `const store = { user: null, theme: localStorage.getItem('theme') || 'light', setTheme(theme) { ...}, setUser(user) { ...} }`
- [ ] 5.2 Update theme toggle to use `store.setTheme()`
- [ ] 5.3 Update logout to use `store.setUser(null)`

## 6. Implement Event Delegation

- [ ] 6.1 Remove individual `btn.addEventListener('click', ...)` in `loadPets()`
- [ ] 6.2 Add single click listener to `#pet-grid` that checks `e.target.closest('.adopt-btn')`
- [ ] 6.3 Add single click listener to `#featured-pets` for adopt buttons

## 7. Unify CSS Styles

- [ ] 7.1 Review `styles.css` and unify common properties between `.glass-card` and `.pet-card`
- [ ] 7.2 Replace duplicated properties with shared CSS custom properties if needed
