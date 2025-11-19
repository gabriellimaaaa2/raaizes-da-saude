const API_BASE_URL = window.location.origin.includes('localhost') ? 'http://localhost:3000/api' : `${window.location.origin}/api`;

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        throw new Error(error.error || 'Erro na requisição');
    }
    return response.json();
};

const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    if (options.body && typeof options.body !== 'string') {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse(response);
};

// Auth
export const register = (data) => request('/auth/register', { method: 'POST', body: data });
export const login = (data) => request('/auth/login', { method: 'POST', body: data });
export const getMe = () => request('/auth/me');
export const recuperarSenha = (email) => request('/auth/recuperar-senha', { method: 'POST', body: { email } });
export const cancelarPlano = () => request('/auth/cancelar-plano', { method: 'POST' });

// Categorias
export const getCategorias = () => request('/categorias');

// Receitas
export const getReceitas = (params) => {
    const query = new URLSearchParams(params).toString();
    return request(`/receitas?${query}`);
};
export const getReceita = (id) => request(`/receitas/${id}`);

// Pagamento
export const getPublicKey = () => request('/pagamento/public-key');
export const processarPagamento = (data) => request('/pagamento/processar', { method: 'POST', body: data });
export const criarPix = (plano) => request('/pagamento/pix', { method: 'POST', body: { plano } });
export const verificarPagamento = (paymentId) => request(`/pagamento/status/${paymentId}`);

// Consulta Virtual
export const criarConsulta = (data) => request('/consulta', { method: 'POST', body: data });
export const getConsultas = () => request('/consultas');

// Exportar para uso em outros módulos
export default request;
