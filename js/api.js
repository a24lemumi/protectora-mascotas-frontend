const API_BASE_URL = 'https://protectora-mascotas-backend.onrender.com';

const TokenManager = {
    setToken(token) { localStorage.setItem('auth_token', token); },
    getToken() { return localStorage.getItem('auth_token'); },
    removeToken() { localStorage.removeItem('auth_token'); }
};

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    const token = TokenManager.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const config = { ...options, headers };
    
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(errorData.error?.message || errorData.message || `Error ${response.status}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        throw error;
    }
}

const API = {
    login(credentials) { return apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }); },
    register(userData) { return apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) }); },
    getPets() { return apiRequest('/api/mascotas'); },
    getPet(id) { return apiRequest(`/api/mascotas/${id}`); },
    adoptPet(petId) { return apiRequest(`/api/mascotas/${petId}/adoptar`, { method: 'POST' }); },
    createPet(data) { return apiRequest('/api/mascotas', { method: 'POST', body: JSON.stringify(data) }); },
    updatePet(id, data) { return apiRequest(`/api/mascotas/${id}`, { method: 'POST', body: JSON.stringify({ ...data, _method: 'PUT' }) }); },
    deletePet(id) { return apiRequest(`/api/mascotas/${id}`, { method: 'POST', body: JSON.stringify({ _method: 'DELETE' }) }); },
    logout() { TokenManager.removeToken(); }
};
