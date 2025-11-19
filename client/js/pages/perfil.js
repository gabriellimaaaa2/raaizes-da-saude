import { setContent, showMessage, isAuthenticated, getUser, setUser, logout, formatarData } from '../utils.js';
import { getMe, cancelarPlano } from '../api.js';
import { navigate } from '../router.js';

const renderBottomNav = () => {
    return `
        <div class="bottom-nav">
            <a href="/" onclick="event.preventDefault(); navigate('/')">
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
            <a href="/perfil" class="active" onclick="event.preventDefault(); navigate('/perfil')">
                <i class="fas fa-user"></i>
                <span>Perfil</span>
            </a>
        </div>
    `;
};

const renderPerfilContent = (user) => {
    const planoStatusClass = user.plano === 'gratuito' ? 'gratuito' : 'ativo';
    const planoStatusText = user.plano === 'gratuito' ? 'Gratuito' : `Ativo (${user.plano})`;
    const dataExpiracao = user.data_expiracao_plano ? formatarData(user.data_expiracao_plano) : 'N/A';

    return `
        <div class="perfil-container">
            <div class="perfil-header">
                <h2>Meu Perfil</h2>
            </div>

            <div class="perfil-info">
                <p><strong>Nome:</strong> ${user.nome}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Telefone:</strong> ${user.telefone || 'Não informado'}</p>
                <p><strong>Plano:</strong> <span class="plano-status ${planoStatusClass}">${planoStatusText}</span></p>
                ${user.plano !== 'gratuito' ? `<p><strong>Expira em:</strong> ${dataExpiracao}</p>` : ''}
                <p><strong>Receitas Vistas Hoje:</strong> ${user.receitas_visualizadas_hoje || 0}</p>
            </div>

            <div class="perfil-actions">
                ${user.plano === 'gratuito' ? `
                    <button onclick="event.preventDefault(); navigate('/planos')">Assinar um Plano</button>
                ` : `
                    <button class="cancelar-plano-btn">Cancelar Plano</button>
                `}
                <button class="logout-btn">Sair</button>
            </div>
        </div>
        ${renderBottomNav()}
    `;
};

const handlePerfilActions = (user) => {
    document.querySelector('.logout-btn').addEventListener('click', () => {
        logout();
    });

    if (user.plano !== 'gratuito') {
        document.querySelector('.cancelar-plano-btn').addEventListener('click', async () => {
            if (confirm('Tem certeza que deseja cancelar seu plano?')) {
                try {
                    await cancelarPlano();
                    const updatedUser = await getMe();
                    setUser(updatedUser);
                    showMessage('Plano cancelado com sucesso. Você retornou ao plano gratuito.');
                    renderPerfil(); // Recarrega a página
                } catch (error) {
                    showMessage(error.message, 'error');
                }
            }
        });
    }
};

export const renderPerfil = async () => {
    if (!isAuthenticated()) {
        navigate('/login');
        return;
    }

    try {
        const user = await getMe();
        setUser(user); // Atualiza o usuário no localStorage
        setContent(renderPerfilContent(user));
        handlePerfilActions(user);
    } catch (error) {
        showMessage(error.message, 'error');
        logout(); // Força logout se o token for inválido
    }
};
