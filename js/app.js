// --- Core Utilities ---
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const store = {
  user: null,
  theme: localStorage.getItem('theme') || 'light',
  setTheme(t) {
    this.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    $('#theme-toggle').innerHTML = t === 'dark' 
      ? `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  },
  setUser(u) {
    this.user = u;
    $('nav').dataset.state = u ? 'logged-in' : 'logged-out';
  }
};

const loadPage = async (page) => {
  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error('Error al cargar la página');
    return await res.text();
  } catch (err) {
    return `<div class="form-message error">Error: ${err.message}</div>`;
  }
};

const switchView = async (viewId, page = null, onReady = null) => {
  $$('.view').forEach(v => v.classList.remove('active'));
  const container = $(`#view-${viewId}`);
  container.classList.add('active');
  window.scrollTo(0, 0);

  if (page) {
    container.innerHTML = '<div class="loading">Cargando...</div>';
    container.innerHTML = await loadPage(page);
    if (onReady) onReady();
  }
};

// --- App Logic ---
const routes = {
  '': () => switchView('home'),
  '#home': () => routes[''](),
  '#login': () => switchView('auth', 'login', () => {
    setupForm('login', API.login, res => {
      TokenManager.setToken(res.token);
      store.setUser(res.user || {});
      location.hash = '#catalog';
    });
  }),
  '#register': () => switchView('auth', 'register', () => {
    setupForm('register', API.register, () => {
      $('#register-message').innerHTML = '<div class="form-message success">¡Registro exitoso! Redirigiendo...</div>';
      setTimeout(() => location.hash = '#login', 1500);
    });
  }),
  '#catalog': () => switchView('catalog', 'mascotas', loadPets),
  '#details': (id) => switchView('details', 'detalle', () => loadPetDetails(id)),
  '#admin': () => switchView('admin', 'admin', loadAdminPets)
};

const normalizeData = res => Array.isArray(res) ? res : (res?.data || res || []);

async function loadPets() {
  const grid = $('#pet-grid');
  try {
    const response = await API.getPets();
    const pets = normalizeData(response);
    grid.innerHTML = pets.length 
      ? pets.map(p => `
        <article class="pet-card">
          <div class="pet-image-container"><img src="${p.imagen || ''}" alt="${p.nombre}" loading="lazy"></div>
          <div class="pet-info">
            <span class="pet-species">${p.especie}</span>
            <h3>${p.nombre}</h3>
            <p class="pet-breed">${p.raza || 'Sin raza'}</p>
            <div class="pet-actions">
              <button class="btn btn-outline" data-action="details" data-id="${p.id}">Ficha</button>
              <button class="btn btn-primary" data-action="adopt" data-id="${p.id}">Adoptar</button>
            </div>
          </div>
        </article>`).join('')
      : '<p class="empty-msg">No hay mascotas disponibles.</p>';
  } catch (err) {
    grid.innerHTML = `<div class="form-message error">${err.message}</div>`;
  }
}

async function loadPetDetails(id) {
  try {
    const pet = await API.getPet(id);
    $('#detail-name').textContent = pet.nombre;
    $('#detail-species').textContent = pet.especie;
    $('#detail-breed').textContent = pet.raza || 'Sin raza';
    $('#detail-img').src = pet.imagen || '';
    $('#detail-owner').textContent = pet.username || 'Ninguno (Disponible)';
    $('#detail-adopt-btn').onclick = () => handleAdopt(pet.id, $('#detail-adopt-btn'));
  } catch (err) {
    $('#view-details').innerHTML = `<div class="form-message error">${err.message}</div>`;
  }
}

async function loadAdminPets() {
  const tbody = $('#admin-pets-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="4" class="loading">Cargando...</td></tr>';
  try {
    const response = await API.getPets();
    const pets = normalizeData(response);
    tbody.innerHTML = pets.length 
      ? pets.map(p => `
        <tr>
          <td><span class="admin-pet-name">${p.nombre}</span></td>
          <td><span class="badge badge-${p.especie.toLowerCase()}">${p.especie}</span></td>
          <td>${p.raza || 'Sin raza'}</td>
          <td>${p.username ? `<span class="owner-badge">${p.username}</span>` : '<span class="text-muted">Disponible</span>'}</td>
          <td><div class="admin-table-actions">
            <button class="btn btn-outline btn-sm" data-action="show-edit-modal" data-id="${p.id}">Editar</button>
            <button class="btn btn-outline btn-sm btn-danger" data-action="delete-pet" data-id="${p.id}" data-name="${p.nombre}">Eliminar</button>
          </div></td>
        </tr>`).join('')
      : '<tr><td colspan="4" class="empty-msg">No hay mascotas registradas.</td></tr>';
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="form-message error">${err.message}</div></td></tr>`;
  }
}

async function showPetModal(mode, id = null) {
  const isEdit = mode === 'edit';
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = await loadPage('modal_pet');
  document.body.appendChild(modal);

  $('#modal-title').textContent = isEdit ? 'Actualizar Mascota' : 'Nueva Mascota';
  if (isEdit) {
    try {
      const pet = await API.getPet(id);
      ['nombre', 'especie', 'raza', 'imagen', 'id'].forEach(key => { 
        if($('#pet-'+key)) $('#pet-'+key).value = pet[key] || ''; 
      });
    } catch (err) {
      alert('Error al cargar datos: ' + err.message);
      return modal.remove();
    }
  }

  $('#pet-form').onsubmit = async e => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    try {
      await (isEdit ? API.updatePet(payload.id, payload) : API.createPet(payload));
      modal.remove();
      loadAdminPets();
    } catch (err) {
      $('#modal-message').innerHTML = `<div class="form-message error">${err.message}</div>`;
    }
  };
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
}

// --- Helpers & Listeners ---
function setupForm(type, apiMethod, successCallback) {
  $(`#${type}-form`).onsubmit = async e => {
    e.preventDefault();
    const msgDiv = $(`#${type}-message`);
    const payload = Object.fromEntries(new FormData(e.target));
    // Mapping for login/register payload differences
    if (payload.name) payload.username = payload.name; 
    try {
      const data = await apiMethod(payload);
      successCallback(data);
    } catch (err) {
      if (msgDiv) msgDiv.innerHTML = `<div class="form-message error">${err.message}</div>`;
    }
  };
}

async function handleAdopt(id, btn) {
  if (!confirm('¿Confirmas la adopción?')) return;
  btn.disabled = true;
  try {
    await API.adoptPet(id);
    btn.textContent = '¡Adoptado!';
    btn.style.background = 'var(--success)';
  } catch (err) {
    alert(err.message);
    btn.disabled = false;
  }
}

const actions = {
  navigate: d => location.hash = d.target,
  logout: () => { API.logout(); store.setUser(null); location.hash = '#login'; },
  adopt: d => handleAdopt(d.id, $('[data-id="'+d.id+'"][data-action="adopt"]')),
  details: d => location.hash = `#details/${d.id}`,
  'show-create-modal': () => showPetModal('create'),
  'show-edit-modal': d => showPetModal('edit', d.id),
  'delete-pet': async d => {
    if (confirm(`¿Eliminar a ${d.name}?`)) { await API.deletePet(d.id); loadAdminPets(); }
  },
  'close-modal': () => $('.modal-overlay')?.remove()
};

function renderView() {
  const [route, param] = (window.location.hash || '#home').split('/');
  if (['#catalog', '#admin', '#details'].includes(route) && !TokenManager.getToken()) return location.hash = '#login';
  $('nav').dataset.state = TokenManager.getToken() ? 'logged-in' : 'logged-out';
  (routes[route] || routes[''])(param);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (btn) actions[btn.dataset.action]?.(btn.dataset);
});

window.addEventListener('hashchange', renderView);
document.addEventListener('DOMContentLoaded', () => {
  store.setTheme(store.theme);
  renderView();
  $('#theme-toggle').onclick = () => store.setTheme(store.theme === 'dark' ? 'light' : 'dark');
});
