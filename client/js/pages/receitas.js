import { setContent, showMessage, isAuthenticated, navigate } from '../utils.js';
import { getReceitas, getReceita } from '../api.js';

const renderBottomNav = () => {
    return `
        <div class="bottom-nav">
            <a href="/" onclick="event.preventDefault(); navigate('/')">
                <i class="fas fa-home"></i>
                <span>Início</span>
            </a>
            <a href="/receitas" class="active" onclick="event.preventDefault(); navigate('/receitas')">
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

const renderReceitasContent = (receitas) => {
    return `
        <div class="receitas-container">
            <div class="receitas-header">
                <h2>Receitas Naturais</h2>
                <input type="text" id="busca-input" placeholder="Buscar receitas..." value="${new URLSearchParams(window.location.search).get('busca') || ''}">
            </div>

            <div class="receitas-list">
                ${receitas.map(receita => `
                    <a href="/receita/${receita.id}" class="receita-card" onclick="event.preventDefault(); navigate('/receita/${receita.id}')">
                        <img src="${receita.imagem_url || 'https://via.placeholder.com/150'}" alt="${receita.nome}">
                        <div class="receita-card-content">
                            <h4>${receita.nome}</h4>
                            <p>${receita.categorias.nome}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
        ${renderBottomNav()}
    `;
};

const handleBusca = () => {
    const input = document.getElementById('busca-input');
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || input.value.length === 0 || input.value.length > 2) {
            const params = new URLSearchParams(window.location.search);
            if (input.value) {
                params.set('busca', input.value);
            } else {
                params.delete('busca');
            }
            navigate(`/receitas?${params.toString()}`);
        }
    });
};

export const renderReceitas = async () => {
    if (!isAuthenticated()) {
        navigate('/login');
        return;
    }

    try {
        const params = new URLSearchParams(window.location.search);
        const busca = params.get('busca');
        const categoria = params.get('categoria');

        const response = await getReceitas({ busca, categoria });
        setContent(renderReceitasContent(response.receitas));
        handleBusca();
    } catch (error) {
        showMessage(error.message, 'error');
        setContent(`
            <div class="receitas-container">
                <p class="app-alert app-alert-error">Erro ao carregar receitas: ${error.message}</p>
            </div>
            ${renderBottomNav()}
        `);
    }
};

const renderReceitaDetalhesContent = (receita) => {
    return `
        <div class="receita-detalhes-container">
            <h1>${receita.nome}</h1>
            <p style="color: ${receita.categorias.cor}; font-weight: bold;">Categoria: ${receita.categorias.nome}</p>
            <img src="${receita.imagem_url || 'https://via.placeholder.com/400'}" alt="${receita.nome}">

            <section>
                <h3>Descrição</h3>
                <p>${receita.descricao}</p>
            </section>

            <section>
                <h3>Indicações</h3>
                <p>${receita.indicacoes}</p>
            </section>

            <section>
                <h3>Ingredientes</h3>
                <ul>
                    ${receita.ingredientes.split('\n').map(item => `<li>${item}</li>`).join('')}
                </ul>
            </section>

            <section>
                <h3>Modo de Preparo</h3>
                <p>${receita.modo_preparo}</p>
            </section>

            <button onclick="event.preventDefault(); navigate('/receitas')">Voltar para Receitas</button>
        </div>
        ${renderBottomNav()}
    `;
};

export const renderReceitaDetalhes = async (id) => {
    if (!isAuthenticated()) {
        navigate('/login');
        return;
    }

    try {
        const receita = await getReceita(id);
        setContent(renderReceitaDetalhesContent(receita));
    } catch (error) {
        if (error.message.includes('Limite de receitas gratuitas atingido')) {
            setContent(`
                <div class="receita-detalhes-container">
                    <p class="app-alert app-alert-error">${error.message}. Assine um plano para ter acesso ilimitado.</p>
                    <button onclick="event.preventDefault(); navigate('/planos')">Ver Planos</button>
                </div>
                ${renderBottomNav()}
            `);
        } else {
            showMessage(error.message, 'error');
            setContent(`
                <div class="receita-detalhes-container">
                    <p class="app-alert app-alert-error">Erro ao carregar a receita: ${error.message}</p>
                </div>
                ${renderBottomNav()}
            `);
        }
    }
};
