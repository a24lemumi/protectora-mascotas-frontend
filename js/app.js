// --- Micro-Framework ---
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

const switchView = (viewId) => {
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#view-${viewId}`).classList.add('active');
  window.scrollTo(0, 0);
};

const loadPage = async (page) => {
  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error('Error al cargar la página');
    return await res.text();
  } catch (err) {
    return `<div class="error-box"><p>Error: ${err.message}</p></div>`;
  }
};

const routes = {
  '': () => switchView('home'),
  '#home': () => routes[''](),
  '#login': async () => {
    $('#view-auth').innerHTML = '<div class="loading">Cargando...</div>';
    switchView('auth');
    $('#view-auth').innerHTML = await loadPage('login');
    setupForm('login', API.login, res => { 
      TokenManager.setToken(res.token); 
      store.setUser(res.user || {}); 
      setTimeout(() => location.hash = '#catalog', 500); 
    });
  },
  '#register': async () => {
    $('#view-auth').innerHTML = '<div class="loading">Cargando...</div>';
    switchView('auth');
    $('#view-auth').innerHTML = await loadPage('register');
    setupForm('register', API.register, () => {
        const msg = $('#register-message');
        if (msg) msg.innerHTML = '<div class="form-message success">¡Registro completado! Redirigiendo...</div>';
        setTimeout(() => location.hash = '#login', 1500);
    });
  },
  '#catalog': async () => {
    if (!TokenManager.getToken()) return location.hash = '#login';
    $('#view-catalog').innerHTML = '<div class="loading">Cargando catálogo...</div>';
    switchView('catalog');
    $('#view-catalog').innerHTML = await loadPage('mascotas');
    loadPets();
  },
  '#details': async (id) => {
    if (!id) return location.hash = '#catalog';
    $('#view-details').innerHTML = '<div class="loading">Cargando ficha...</div>';
    switchView('details');
    $('#view-details').innerHTML = await loadPage('detalle');
    loadPetDetails(id);
  },
  '#admin': () => {
    if (!TokenManager.getToken()) return location.hash = '#login';
    switchView('admin');
    loadAdminPets();
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
    if (msgDiv) msgDiv.innerHTML = '';
    const payload = {};
    inputs.forEach(i => { payload[i.id.includes('name') ? 'username' : i.id.split('-')[1]] = i.value; });
    try {
      const data = await apiMethod(payload);
      if (msgDiv) msgDiv.innerHTML = '<div class="form-message success">¡Operación exitosa!</div>';
      successCallback(data);
    } catch (err) {
      inputs.forEach(i => i.classList.add('error'));
      if (msgDiv) msgDiv.innerHTML = `<div class="form-message error">${err.message}</div>`;
    }
  });
}

function renderPet(pet) {
  return `
    <article class="pet-card" data-pet-id="${pet.id}">
      <div class="pet-image-container">
        <img src="${pet.imagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000'}" alt="${pet.nombre}" loading="lazy">
      </div>
      <div class="pet-info">
        <span class="pet-species">${pet.especie}</span>
        <h3>${pet.nombre}</h3>
        <p class="pet-breed">${pet.raza || 'Sin raza'}</p>
        <div class="pet-actions">
          <button class="btn btn-outline" style="flex:1" data-action="details" data-id="${pet.id}">Ficha</button>
          <button class="btn btn-primary" style="flex:1" data-action="adopt" data-id="${pet.id}">Adoptar</button>
        </div>
      </div>
    </article>`;
}

async function loadPets() {
  const grid = $('#pet-grid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading">Cargando mascotas...</div>';
  try {
    const response = await API.getPets();
    const pets = Array.isArray(response) ? response : (response.data?.data || response.data || []);
    if (!pets.length) return grid.innerHTML = '<p class="empty-msg">No hay mascotas disponibles en este momento.</p>';
    grid.innerHTML = pets.map(p => renderPet(p)).join('');
  } catch (err) {
    grid.innerHTML = `<div class="form-message error">Error: ${err.message}</div>`;
  }
}

async function handleAdopt(id, btn) {
  if (!confirm('¿Estás seguro de que deseas iniciar el proceso de adopción para esta mascota?')) return;
  const originalText = btn.textContent;
  btn.disabled = true; 
  btn.textContent = 'Procesando...';
  try {
    await API.adoptPet(id);
    btn.textContent = '¡Adoptado! 🎉'; 
    btn.style.background = 'var(--success)';
  } catch (err) {
    alert(`Error: ${err.message}`); 
    btn.disabled = false; 
    btn.textContent = originalText;
  }
}

async function loadAdminPets() {
  const container = $('#admin-table-container');
  if (!container) return;
  container.innerHTML = '<div class="loading">Cargando catálogo administrativo...</div>';
  try {
    const response = await API.getPets();
    const pets = Array.isArray(response) ? response : (response.data?.data || response.data || []);
    if (!pets.length) {
      container.innerHTML = '<p class="empty-msg">No hay mascotas registradas.</p>';
      return;
    }
    renderPetTable(pets);
  } catch (err) {
    container.innerHTML = `<div class="form-message error">Error: ${err.message}</div>`;
  }
}

function renderPetTable(pets) {
  const container = $('#admin-table-container');
  container.innerHTML = `
    <div class="table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${pets.map(pet => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:1rem">
                    <img src="${pet.imagen || 'https://via.placeholder.com/50x50'}" alt="${pet.nombre}" style="width:40px;height:40px;border-radius:8px;object-fit:cover">
                    <span style="font-weight:600">${pet.nombre}</span>
                </div>
              </td>
              <td><span class="badge">${pet.especie}</span></td>
              <td>${pet.raza || 'Sin raza'}</td>
              <td>
                <button class="btn btn-outline" style="padding:4px 12px;font-size:0.8rem" data-action="show-edit-modal" data-id="${pet.id}">Editar</button>
                <button class="btn btn-outline" style="padding:4px 12px;font-size:0.8rem;color:var(--error);border-color:var(--error)" data-action="delete-pet" data-id="${pet.id}" data-name="${pet.nombre}">Eliminar</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function showPetModal(mode, petData = null) {
  const isEdit = mode === 'edit';
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 style="margin-bottom:1.5rem">${isEdit ? 'Actualizar' : 'Registrar nueva'} Mascota</h3>
      <div id="modal-message"></div>
      <form id="pet-form">
        <div class="form-group"><label>Nombre</label><input type="text" id="pet-nombre" required value="${isEdit ? petData.nombre : ''}"></div>
        <div class="form-group">
          <label>Especie</label>
          <select id="pet-especie" required style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--glass-border);background:var(--bg-primary);color:var(--text-primary)">
            <option value="">Seleccionar...</option>
            <option value="perro" ${isEdit && petData.especie === 'perro' ? 'selected' : ''}>Perro</option>
            <option value="gato" ${isEdit && petData.especie === 'gato' ? 'selected' : ''}>Gato</option>
            <option value="ave" ${isEdit && petData.especie === 'ave' ? 'selected' : ''}>Ave</option>
            <option value="conejo" ${isEdit && petData.especie === 'conejo' ? 'selected' : ''}>Conejo</option>
            <option value="otro" ${isEdit && petData.especie === 'otro' ? 'selected' : ''}>Otro</option>
          </select>
        </div>
        <div class="form-group"><label>Raza</label><input type="text" id="pet-raza" value="${isEdit ? petData.raza || '' : ''}"></div>
        <div class="form-group"><label>Imagen (URL)</label><input type="url" id="pet-imagen" value="${isEdit ? petData.imagen || '' : ''}"></div>
        <input type="hidden" id="pet-id" value="${isEdit ? petData.id : ''}">
        <div class="modal-actions" style="display:flex;gap:1rem;margin-top:2rem">
          <button type="submit" class="btn btn-primary" style="flex:1">${isEdit ? 'Guardar cambios' : 'Crear Mascota'}</button>
          <button type="button" class="btn btn-outline" style="flex:1" data-action="close-modal">Cancelar</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const form = $('#pet-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const msgDiv = $('#modal-message');
    const payload = {
      nombre: $('#pet-nombre').value,
      especie: $('#pet-especie').value,
      raza: $('#pet-raza').value,
      imagen: $('#pet-imagen').value
    };
    try {
      if (isEdit) {
        await API.updatePet($('#pet-id').value, payload);
      } else {
        await API.createPet(payload);
      }
      msgDiv.innerHTML = '<div class="form-message success">¡Mascota guardada correctamente!</div>';
      setTimeout(() => { modal.remove(); loadAdminPets(); }, 800);
    } catch (err) {
      msgDiv.innerHTML = `<div class="form-message error">Error: ${err.message}</div>`;
    }
  });

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

async function handleDeletePet(id, name) {
  if (!confirm(`¿Estás seguro de eliminar a ${name}? Esta acción es irreversible.`)) return;
  try {
    await API.deletePet(id);
    loadAdminPets();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

async function loadAdminPetsForEdit(petId) {
  try {
    const response = await API.getPets();
    const pets = Array.isArray(response) ? response : (response.data?.data || response.data || []);
    const pet = pets.find(p => String(p.id) === String(petId));
    if (pet) showPetModal('edit', pet);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

async function loadPetDetails(id) {
  try {
    const pet = await API.getPet(id);
    $('#detail-name').textContent = pet.nombre;
    $('#detail-species').textContent = pet.especie;
    $('#detail-breed').textContent = pet.raza || 'Sin raza';
    $('#detail-img').src = pet.imagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000';
    $('#detail-adopt-btn').onclick = () => handleAdopt(pet.id, $('#detail-adopt-btn'));
  } catch (err) {
    $('#view-details').innerHTML = `<div class="form-message error">Error al cargar los detalles: ${err.message}</div>`;
  }
}

function renderView() {
  const hash = window.location.hash || '#home';
  const parts = hash.split('/');
  const route = parts[0];
  const param = parts[1];
  
  // Basic Auth Check
  if (['catalog', 'admin', 'details'].includes(route.slice(1)) && !TokenManager.getToken()) {
    return location.hash = '#login';
  }
  
  $('nav').dataset.state = TokenManager.getToken() ? 'logged-in' : 'logged-out';
  
  const handler = routes[route] || routes[''];
  handler(param);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  
  const { action, target, id } = btn.dataset;
  if (action === 'navigate') location.hash = target;
  if (action === 'logout') { API.logout(); store.setUser(null); location.hash = '#login'; }
  if (action === 'adopt') handleAdopt(id, btn);
  if (action === 'details') location.hash = `#details/${id}`;
  if (action === 'show-create-modal') showPetModal('create');
  if (action === 'show-edit-modal') loadAdminPetsForEdit(id);
  if (action === 'delete-pet') handleDeletePet(id, btn.dataset.name);
  if (action === 'close-modal') {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
  }
});

window.addEventListener('hashchange', renderView);
document.addEventListener('DOMContentLoaded', () => {
  store.setTheme(store.theme);
  renderView();
  $('#theme-toggle').addEventListener('click', () => store.setTheme(store.theme === 'dark' ? 'light' : 'dark'));
});
