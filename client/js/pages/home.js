import { setContent } from '../utils.js';
import { getCategorias } from '../api.js';
import { navigate } from '../router.js';

const renderBottomNav = () => {
    return `
        <div class="bottom-nav">
            <a href="/" class="active" onclick="event.preventDefault(); navigate('/')">
                <i class="fas fa-home"></i>
                <span>Início</span>
            </a>
            <a href="/receitas" onclick="event.preventDefault(); navigate('/receitas')">
                <i class="fas fa-leaf"></i>
                <span>Receitas</span>
            </a>
            <a href="/consulta-virtual" onclick="event.preventDefault(); navigate('/consulta-virtual')">
                <i class="fas fa-robot"></i>
                <span>Consulta</span>
            </a>
            <a href="/perfil" onclick="event.preventDefault(); navigate('/perfil')">
                <i class="fas fa-user"></i>
                <span>Perfil</span>
            </a>
        </div>
    `;
};

const renderHomeContent = (categorias) => {
    return `
        <div class="home-container">
            <div class="home-header">
                <img src="/public/logo.png" alt="Logo Raízes da Saúde">
                <h1>Raízes da Saúde</h1>
                <p>A sabedoria popular brasileira ao seu alcance.</p>
            </div>

            <div class="home-section">
                <h2>Categorias Populares</h2>
                <div class="category-list">
                    ${categorias.map(cat => `
                        <a href="/receitas?categoria=${cat.id}" class="category-item" onclick="event.preventDefault(); navigate('/receitas?categoria=${cat.id}')" style="color: ${cat.cor}; border-color: ${cat.cor}50;">
                            <i class="${cat.icone}"></i>
                            <p>${cat.nome}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
        ${renderBottomNav()}
    `;
};

export const renderHome = async () => {
    try {
        // Adicionar a biblioteca de ícones Font Awesome
        if (!document.querySelector('link[href*="fontawesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(link);
        }

        const categorias = await getCategorias();
        setContent(renderHomeContent(categorias));
    } catch (error) {
        setContent(`
            <div class="home-container">
                <p class="app-alert app-alert-error">Erro ao carregar a página inicial: ${error.message}</p>
            </div>
        `);
    }
};
