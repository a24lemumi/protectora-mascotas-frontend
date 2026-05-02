// --- Micro-Framework ---
const $ = sel => document.querySelector(sel);
const store = {
  user: null, theme: localStorage.getItem('theme') || 'light',
  setTheme(t) { 
    this.theme = t; 
    document.documentElement.setAttribute('data-theme', t); 
    localStorage.setItem('theme', t); 
    $('#theme-toggle').innerHTML = t === 'dark' 
      ? `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  },
  setUser(u) { this.user = u; $('nav').dataset.state = u ? 'logged-in' : 'logged-out'; }
};

const routes = {
  '': () => { 
    $('#app-main').innerHTML = `
      <section class="home-hero">
        <h1>Adopta un amigo para siempre</h1>
        <p>Transforma una vida y la tuya propia. Descubre las mascotas que esperan un hogar.</p>
        <button class="btn" data-action="navigate" data-target="#catalog">Explorar Catálogo</button>
      </section>`; 
  },
  '#home': () => routes[''](),
  '#login': () => {
    $('#app-main').innerHTML = `
      <section class="auth-section">
        <div class="glass-card auth-card">
          <h2>Bienvenido de nuevo</h2>
          <div id="login-message"></div>
          <form id="login-form">
            <div class="form-group"><label>Email</label><input type="email" id="login-email" required placeholder="tu@email.com"></div>
            <div class="form-group"><label>Contraseña</label><input type="password" id="login-password" required placeholder="••••••••"></div>
            <button type="submit" class="btn">Entrar</button>
          </form>
          <p class="auth-footer">¿Nuevo aquí? <a href="#register">Crea una cuenta</a></p>
        </div>
      </section>`;
    setupForm('login', API.login, res => { 
      TokenManager.setToken(res.token); 
      store.setUser(res.user || {}); 
      setTimeout(() => location.hash = '#catalog', 500); 
    });
  },
  '#register': () => {
    $('#app-main').innerHTML = `
      <section class="auth-section">
        <div class="glass-card auth-card">
          <h2>Únete a la familia</h2>
          <div id="register-message"></div>
          <form id="register-form">
            <div class="form-group"><label>Nombre</label><input type="text" id="reg-name" required placeholder="Tu nombre"></div>
            <div class="form-group"><label>Email</label><input type="email" id="reg-email" required placeholder="tu@email.com"></div>
            <div class="form-group"><label>Contraseña</label><input type="password" id="reg-password" required placeholder="••••••••"></div>
            <button type="submit" class="btn">Registrarse</button>
          </form>
          <p class="auth-footer">¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p>
        </div>
      </section>`;
    setupForm('register', API.register, () => setTimeout(() => location.hash = '#login', 1000));
  },
  '#catalog': () => {
    $('#app-main').innerHTML = `
      <section class="catalog-header">
        <h2>Nuestros Residentes</h2>
        <p>Todos estos pequeños buscan un hogar donde ser felices.</p>
      </section>
      <div id="pet-grid" class="pet-grid"><div class="loading">Cargando mascotas...</div></div>`;
    if (!TokenManager.getToken()) {
      $('#pet-grid').innerHTML = '<div class="error-box"><p>Debes iniciar sesión para ver los animales.</p><button class="btn" data-action="navigate" data-target="#login">Ir al Login</button></div>';
      return;
    }
    loadPets();
  }
};

// --- Helpers ---
function setupForm(type, apiMethod, successCallback) {
  const form = $(`#${type}-form`);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input'), msgDiv = $(`#${type}-message`);
    inputs.forEach(i => i.classList.remove('error'));
    msgDiv.innerHTML = '';
    const payload = {};
    inputs.forEach(i => { payload[i.id.includes('name') ? 'username' : i.id.split('-')[1]] = i.value; });
    try {
      const data = await apiMethod(payload);
      msgDiv.innerHTML = '<div class="form-message success">¡Operación exitosa!</div>';
      successCallback(data);
    } catch (err) {
      inputs.forEach(i => i.classList.add('error'));
      msgDiv.innerHTML = `<div class="form-message error">${err.message}</div>`;
    }
  });
}

function renderPet(pet) {
  return `
    <article class="pet-card" data-pet-id="${pet.id}">
      <div class="pet-image-container">
        <img src="${pet.imagen || 'https://via.placeholder.com/300x250?text=Sin+imagen'}" alt="${pet.nombre}" loading="lazy">
      </div>
      <div class="pet-info">
        <span class="pet-species">${pet.especie}</span>
        <h3>${pet.nombre}</h3>
        <p class="pet-breed">${pet.raza || 'Sin raza'}</p>
        <button class="btn-adopt" data-action="adopt" data-id="${pet.id}">Adoptar</button>
      </div>
    </article>`;
}

async function loadPets() {
  const grid = $('#pet-grid');
  if (!grid) return;
  try {
    const response = await API.getPets();
    const pets = Array.isArray(response) ? response : (response.data?.data || response.data || []);
    if (!pets.length) return grid.innerHTML = '<p class="empty-msg">No hay mascotas disponibles.</p>';
    grid.innerHTML = pets.map(p => renderPet(p)).join('');
  } catch (err) {
    grid.innerHTML = `<p class="error-msg">Error: ${err.message}</p>`;
  }
}

async function handleAdopt(id, btn) {
  if (!confirm('¿Confirmas que quieres iniciar el proceso de adopción?')) return;
  btn.disabled = true; btn.textContent = 'Enviando...';
  try {
    await API.adoptPet(id);
    btn.textContent = '¡Adoptado!'; btn.classList.add('success');
  } catch (err) {
    alert(`Error: ${err.message}`); btn.disabled = false; btn.textContent = 'Adoptar';
  }
}

function renderView() {
  const hash = window.location.hash || '#home', view = hash.slice(1);
  if (['catalog'].includes(view) && !TokenManager.getToken()) return location.hash = '#login';
  $('nav').dataset.state = TokenManager.getToken() ? 'logged-in' : 'logged-out';
  (routes[hash] || routes[''])();
}

document.addEventListener('click', e => {
  const { action, target, id } = e.target.dataset;
  if (action === 'navigate') location.hash = target;
  if (action === 'logout') { API.logout(); store.setUser(null); location.hash = '#login'; }
  if (action === 'adopt') handleAdopt(id, e.target);
});

window.addEventListener('hashchange', renderView);
document.addEventListener('DOMContentLoaded', () => {
  store.setTheme(store.theme);
  renderView();
  $('#theme-toggle').addEventListener('click', () => store.setTheme(store.theme === 'dark' ? 'light' : 'dark'));
});
