// --- Micro-Framework: $(), Store, Router (<20 lines) ---
const $ = sel => document.querySelector(sel);
const store = {
  user: null, theme: localStorage.getItem('theme') || 'light',
  setTheme(t) {
    this.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    const toggle = $('#theme-toggle');
    if (toggle) toggle.innerHTML = createIcon(t === 'dark' ? 'sun' : 'moon', 18);
  },
  setUser(u) { this.user = u; $('[data-state]').dataset.state = u ? 'logged-in' : 'logged-out'; }
};

const routes = {
  '': () => { $('#app-main').innerHTML = `<section class="home-hero"><h2>Encuentra tu compañero ideal</h2><p>Adopta, no compres.</p><button class="btn" data-action="navigate" data-target="#catalog">Ver Catálogo</button></section>`; },
  '#home': () => routes[''](),
  '#login': () => {
      $('#app-main').innerHTML = `<section class="glass-card" style="max-width:400px;margin:2rem auto;"><h2>Iniciar Sesión</h2><div id="login-message" aria-live="polite"></div><form id="login-form"><div class="form-group"><label for="login-email">Email</label><input type="email" id="login-email" required aria-label="Email"></div><div class="form-group"><label for="login-password">Contraseña</label><input type="password" id="login-password" required aria-label="Contraseña"></div><button type="submit" class="btn" style="width:100%;">Entrar</button></form><p style="margin-top:1rem;text-align:center;">¿No tienes cuenta? <a href="#register" style="color:var(--accent);">Regístrate</a></p></section>`;
      setupForm('login', API.login, res => { 
          TokenManager.setToken(res.token); 
          store.setUser(res.user || {}); 
          setTimeout(() => location.hash = '#catalog', 1000); 
      });
      store.setTheme(store.theme);
  },
  '#register': () => {
    $('#app-main').innerHTML = `<section class="glass-card" style="max-width:400px;margin:2rem auto;"><h2>Registro</h2><div id="register-message" aria-live="polite"></div><form id="register-form"><div class="form-group"><label for="reg-name">Nombre</label><input type="text" id="reg-name" required aria-label="Nombre"></div><div class="form-group"><label for="reg-email">Email</label><input type="email" id="reg-email" required aria-label="Email"></div><div class="form-group"><label for="reg-password">Contraseña</label><input type="password" id="reg-password" required aria-label="Contraseña"></div><button type="submit" class="btn" style="width:100%;">Registrarse</button></form><p style="margin-top:1rem;text-align:center;">¿Ya tienes cuenta? <a href="#login" style="color:var(--accent);">Inicia sesión</a></p></section>`;
    setupForm('register', API.register, () => setTimeout(() => location.hash = '#login', 1500));
    store.setTheme(store.theme);
  },
  '#catalog': () => {
    $('#app-main').innerHTML = `<section><h2>Catálogo de Mascotas</h2><div id="pet-grid" class="pet-grid"><div class="loading">Cargando mascotas...</div></div></section>`;
    if (!TokenManager.getToken()) {
      $('#pet-grid').innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);">Inicia sesión para ver el catálogo.</p>';
      return;
    }
    loadPets();
  }
};

// --- Helper Functions ---
function setupForm(type, apiMethod, successCallback) {
  const form = $(`#${type}-form`);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input');
    const msgDiv = $(`#${type}-message`);
    inputs.forEach(i => i.classList.remove('error', 'success'));
    if (msgDiv) msgDiv.innerHTML = '';
    const payload = {};
    inputs.forEach(i => { const key = i.id.includes('name') ? 'username' : i.id.split('-')[1]; payload[key] = i.value; });
    try {
      const data = await apiMethod(payload);
      if (msgDiv) msgDiv.innerHTML = '<div class="form-message success">¡Éxito!</div>';
      successCallback(data);
    } catch (err) {
      inputs.forEach(i => i.classList.add('error'));
      if (msgDiv) msgDiv.innerHTML = `<div class="form-message error">${err.message}</div>`;
    }
  });
}

function renderPet(pet, { isScrollSnap = false } = {}) {
  const style = isScrollSnap ? 'style="min-width:300px;"' : '';
  return `<article class="pet-card" data-pet-id="${pet.id}" ${style}><div class="pet-card-image"><img src="${pet.imagen || 'https://via.placeholder.com/300x400?text=Sin+imagen'}" alt="Foto de ${pet.nombre}"></div><div class="pet-info"><h3>${pet.nombre}</h3><p><strong>Especie:</strong> ${pet.especie}</p>${!isScrollSnap ? `<p>${pet.raza || 'Sin raza'}</p>` : ''}<button class="btn adopt-btn" data-action="adopt" data-id="${pet.id}" aria-label="Adoptar a ${pet.nombre}">Adoptar</button></div></article>`;
}

async function loadPets() {
  const grid = $('#pet-grid');
  if (!grid) return;
  try {
    const response = await API.getPets();
    const pets = Array.isArray(response) ? response : (response.data || response.pets || []);
    if (!pets || pets.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);">No hay mascotas.</p>';
      return;
    }
    grid.innerHTML = pets.map(p => renderPet(p)).join('');
    if ('IntersectionObserver' in window && !CSS.supports('animation-timeline', 'view()')) {
      const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
      document.querySelectorAll('.pet-card').forEach(card => observer.observe(card));
    }
  } catch (err) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--error);">Error: ${err.message}</p>`;
  }
}

async function handleAdopt(petId, btn) {
  if (!confirm('¿Estás seguro?')) return;
  btn.disabled = true;
  btn.textContent = 'Procesando...';
  try {
    await API.adoptPet(petId);
    btn.textContent = '¡Adoptado!';
    btn.style.background = 'var(--success)';
    const card = btn.closest('.pet-card');
    if (card) card.style.opacity = '0.7';
  } catch (err) {
    alert(`Error: ${err.message}`);
    btn.disabled = false;
    btn.textContent = 'Adoptar';
  }
}

// --- Navigation & Events ---
function renderView() {
  const hash = window.location.hash || '#home';
  const view = hash.slice(1);
  if (['catalog'].includes(view) && !store.user && !TokenManager.getToken()) return location.hash = '#login';
  if (store.user || TokenManager.getToken()) store.setUser(store.user || {});
  $('[data-state]').dataset.state = (store.user || TokenManager.getToken()) ? 'logged-in' : 'logged-out';
  const routeFn = routes[hash] || routes[view] || routes[''];
  if (routeFn) routeFn();
}

document.addEventListener('click', e => {
  const action = e.target.dataset.action;
  if (action === 'navigate') return location.hash = e.target.dataset.target;
  if (action === 'logout') { API.logout(); store.setUser(null); return location.hash = '#login'; }
  if (action === 'adopt') return handleAdopt(e.target.dataset.id, e.target);
});

window.addEventListener('hashchange', renderView);
document.addEventListener('DOMContentLoaded', () => {
  store.setTheme(store.theme);
  renderView();
});
