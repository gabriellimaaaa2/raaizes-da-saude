export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
};

export const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const setContent = (html) => {
    document.getElementById('app').innerHTML = html;
};

export const showMessage = (message, type = 'success') => {
    const app = document.getElementById('app');
    const existingAlert = document.querySelector('.app-alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `app-alert app-alert-${type}`;
    alertDiv.textContent = message;

    app.prepend(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
};

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        return null;
    }
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};
