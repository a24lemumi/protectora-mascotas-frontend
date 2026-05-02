const appMain = document.getElementById('app-main');
const content = document.getElementById('content');
const themeToggle = document.getElementById('theme-toggle');
const logoutBtn = document.getElementById('logout-btn');

function checkAuth() {
    return !!TokenManager.getToken();
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

logoutBtn.addEventListener('click', () => {
    API.logout();
    logoutBtn.classList.add('hidden');
    navigateTo('#login');
});

function navigateTo(hash) {
    window.location.hash = hash;
}

function getTemplate(name) {
    const templates = {
        home: `
            <section class="home-hero">
                <h2>Encuentra tu compañero ideal</h2>
                <p>Adopta, no compres. Dale una segunda oportunidad a quienes más lo necesitan.</p>
                <button class="btn" onclick="navigateTo('#catalog')">Ver Catálogo</button>
            </section>
        `,
        login: `
            <section class="glass-card" style="max-width: 400px; margin: 2rem auto;">
                <h2 style="margin-bottom: 1.5rem;">Iniciar Sesión</h2>
                <div id="login-message" aria-live="polite"></div>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" required aria-label="Email">
                    </div>
                    <div class="form-group">
                        <label for="login-password">Contraseña</label>
                        <input type="password" id="login-password" required aria-label="Contraseña">
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Entrar</button>
                </form>
                <p style="margin-top: 1rem; text-align: center;">
                    ¿No tienes cuenta? <a href="#register" style="color: var(--accent);">Regístrate</a>
                </p>
            </section>
        `,
        register: `
            <section class="glass-card" style="max-width: 400px; margin: 2rem auto;">
                <h2 style="margin-bottom: 1.5rem;">Registro</h2>
                <div id="register-message" aria-live="polite"></div>
                <form id="register-form">
                    <div class="form-group">
                        <label for="reg-name">Nombre</label>
                        <input type="text" id="reg-name" required aria-label="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="reg-email">Email</label>
                        <input type="email" id="reg-email" required aria-label="Email">
                    </div>
                    <div class="form-group">
                        <label for="reg-password">Contraseña</label>
                        <input type="password" id="reg-password" required aria-label="Contraseña">
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Registrarse</button>
                </form>
                <p style="margin-top: 1rem; text-align: center;">
                    ¿Ya tienes cuenta? <a href="#login" style="color: var(--accent);">Inicia sesión</a>
                </p>
            </section>
        `,
        catalog: `
            <section>
                <h2 style="margin-bottom: 1.5rem;">Mascotas Destacadas</h2>
                <div id="featured-pets" class="scroll-snap-container" style="margin-bottom: 3rem;">
                    <div class="loading">Cargando...</div>
                </div>
                <h2 style="margin-bottom: 1.5rem;">Catálogo Completo</h2>
                <div id="pet-grid" class="pet-grid">
                    <div class="loading">Cargando mascotas...</div>
                </div>
            </section>
        `
    };
    return templates[name] || templates.home;
}

async function renderView() {
    const hash = window.location.hash || '#home';
    const view = hash.slice(1).split('?')[0];

    const protectedViews = ['catalog'];
    if (protectedViews.includes(view) && !checkAuth()) {
        navigateTo('#login');
        return;
    }

    if (checkAuth()) {
        logoutBtn.classList.remove('hidden');
    } else {
        logoutBtn.classList.add('hidden');
    }

    content.innerHTML = getTemplate(view);

    if (view === 'login') setupLoginForm();
    if (view === 'register') setupRegisterForm();
    if (view === 'catalog') loadPets();
}

function setupLoginForm() {
    const form = document.getElementById('login-form');
    const message = document.getElementById('login-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');

        email.classList.remove('error', 'success');
        password.classList.remove('error', 'success');
        message.innerHTML = '';

        try {
            const data = await API.login({ email: email.value, password: password.value });
            TokenManager.setToken(data.token);
            message.innerHTML = '<div class="form-message success">¡Bienvenido! Redirigiendo...</div>';
            setTimeout(() => navigateTo('#catalog'), 1000);
        } catch (err) {
            email.classList.add('error');
            password.classList.add('error');
            message.innerHTML = `<div class="form-message error">${err.message}</div>`;
        }
    });
}

function setupRegisterForm() {
    const form = document.getElementById('register-form');
    const message = document.getElementById('register-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name');
        const email = document.getElementById('reg-email');
        const password = document.getElementById('reg-password');

        [name, email, password].forEach(i => i.classList.remove('error', 'success'));
        message.innerHTML = '';

        try {
            await API.register({ name: name.value, email: email.value, password: password.value });
            message.innerHTML = '<div class="form-message success">¡Registro exitoso! Redirigiendo al login...</div>';
            setTimeout(() => navigateTo('#login'), 1500);
        } catch (err) {
            [name, email, password].forEach(i => i.classList.add('error'));
            message.innerHTML = `<div class="form-message error">${err.message}</div>`;
        }
    });
}

function createPetCard(pet) {
    return `
        <article class="pet-card" data-pet-id="${pet.id}">
            <img src="${pet.image || 'https://via.placeholder.com/300x250?text=Sin+imagen'}" alt="Foto de ${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p><strong>Especie:</strong> ${pet.species}</p>
                <p>${pet.description || 'Sin descripción'}</p>
                <button class="btn adopt-btn" data-id="${pet.id}" aria-label="Adoptar a ${pet.name}">Adoptar</button>
            </div>
        </article>
    `;
}

function createPetCardScrollSnap(pet) {
    return `
        <article class="pet-card" data-pet-id="${pet.id}" style="min-width: 300px;">
            <img src="${pet.image || 'https://via.placeholder.com/300x250?text=Sin+imagen'}" alt="Foto de ${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p><strong>Especie:</strong> ${pet.species}</p>
                <button class="btn adopt-btn" data-id="${pet.id}" aria-label="Adoptar a ${pet.name}">Adoptar</button>
            </div>
        </article>
    `;
}

async function loadPets() {
    const grid = document.getElementById('pet-grid');
    const featured = document.getElementById('featured-pets');
    if (!grid) return;

    try {
        const pets = await API.getPets();

        if (pets.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No hay mascotas disponibles en este momento.</p>';
            if (featured) featured.innerHTML = '<p style="color: var(--text-secondary);">No hay mascotas destacadas.</p>';
            return;
        }

        grid.innerHTML = pets.map(createPetCard).join('');

        if (featured) {
            const featuredPets = pets.slice(0, 5);
            featured.innerHTML = featuredPets.map(pet => createPetCardScrollSnap(pet)).join('');
        }

        if ('IntersectionObserver' in window && !CSS.supports('animation-timeline', 'view()')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.pet-card').forEach(card => observer.observe(card));
        }

        document.querySelectorAll('.adopt-btn').forEach(btn => {
            btn.addEventListener('click', () => handleAdopt(btn.dataset.id, btn));
        });
    } catch (err) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--error);">Error al cargar mascotas: ${err.message}</p>`;
    }
}

async function handleAdopt(petId, btn) {
    if (!confirm('¿Estás seguro de que quieres adoptar esta mascota?')) return;

    btn.disabled = true;
    btn.textContent = 'Procesando...';

    try {
        await API.adoptPet(petId);
        btn.textContent = '¡Adoptado!';
        btn.style.background = 'var(--success)';
        const card = btn.closest('.pet-card');
        if (card) card.style.opacity = '0.7';
    } catch (err) {
        alert(`Error al adoptar: ${err.message}`);
        btn.disabled = false;
        btn.textContent = 'Adoptar';
    }
}

window.addEventListener('hashchange', renderView);
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderView();
});
