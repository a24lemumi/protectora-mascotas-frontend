const API_BASE_URL = 'https://protectora-mascotas-backend.onrender.com';

const TokenManager = {
    setToken(token) {
        localStorage.setItem('auth_token', token);
    },
    getToken() {
        return localStorage.getItem('auth_token');
    },
    removeToken() {
        localStorage.removeItem('auth_token');
    }
};

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const token = TokenManager.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response.json();
}

const API = {
    login(credentials) {
        return apiRequest('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },
    register(userData) {
        return apiRequest('/api/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    getPets() {
        return apiRequest('/api/pets');
    },
    adoptPet(petId) {
        return apiRequest(`/api/adoptions`, {
            method: 'POST',
            body: JSON.stringify({ pet_id: petId })
        });
    },
    logout() {
        TokenManager.removeToken();
    }
};
