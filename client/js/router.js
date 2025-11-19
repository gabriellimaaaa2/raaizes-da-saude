import { renderHome } from './pages/home.js';
import { renderLogin, renderCadastro, renderRecuperarSenha } from './pages/auth.js';
import { renderPerfil } from './pages/perfil.js';
import { renderReceitas, renderReceitaDetalhes } from './pages/receitas.js';
import { renderPlanos } from './pages/planos.js';
import { renderCheckout } from './pages/checkout.js';
import { renderConsultaVirtual } from './pages/consulta.js';

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/cadastro': renderCadastro,
    '/recuperar-senha': renderRecuperarSenha,
    '/perfil': renderPerfil,
    '/receitas': renderReceitas,
    '/receita/:id': renderReceitaDetalhes,
    '/planos': renderPlanos,
    '/checkout': renderCheckout,
    '/consulta-virtual': renderConsultaVirtual
};

const app = document.getElementById('app');

const navigate = (path) => {
    window.history.pushState({}, path, path);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    let route = routes[path];

    // Lidar com rotas dinâmicas como /receita/:id
    if (!route) {
        const dynamicRoute = Object.keys(routes).find(key => {
            if (key.includes(':')) {
                const regex = new RegExp('^' + key.replace(/:\w+/g, '([^/]+)') + '$');
                return path.match(regex);
            }
            return false;
        });

        if (dynamicRoute) {
            const regex = new RegExp('^' + dynamicRoute.replace(/:\w+/g, '([^/]+)') + '$');
            const match = path.match(regex);
            const params = match.slice(1);
            route = () => routes[dynamicRoute](...params);
        }
    }

    if (route) {
        app.innerHTML = ''; // Limpa o conteúdo anterior
        await route();
    } else {
        app.innerHTML = '<h1>404 - Página não encontrada</h1>';
    }
};

window.onpopstate = handleLocation;
document.addEventListener('DOMContentLoaded', handleLocation);

// Adicionar evento de clique para navegação (SPA)
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href') && target.target !== '_blank') {
        const href = target.getAttribute('href');
        if (href.startsWith('/')) {
            e.preventDefault();
            navigate(href);
        }
    }
});

// Exportar para uso em outros módulos
export { navigate };
