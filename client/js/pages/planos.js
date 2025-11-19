import { setContent, showMessage, isAuthenticated, navigate, formatarMoeda } from '../utils.js';

const planos = [
    { id: 'teste', nome: 'Plano Teste', preco: 0.01, descricao: 'Teste o sistema por 1 dia.' },
    { id: 'mensal', nome: 'Plano Mensal', preco: 19.90, descricao: 'Acesso completo por 30 dias.' },
    { id: 'anual', nome: 'Plano Anual', preco: 199.90, descricao: 'Acesso completo por 1 ano. Economize!' },
];

const renderPlanosContent = () => {
    return `
        <div class="planos-container">
            <h2>Escolha seu Plano</h2>
            <p>Tenha acesso ilimitado a todas as receitas e funcionalidades.</p>

            <div class="planos-list">
                ${planos.map(plano => `
                    <div class="plano-card">
                        <h3>${plano.nome}</h3>
                        <p class="plano-preco">${formatarMoeda(plano.preco)}</p>
                        <p>${plano.descricao}</p>
                        <button data-plano-id="${plano.id}" data-plano-nome="${plano.nome}" data-plano-preco="${plano.preco}" class="assinar-btn">Assinar</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

const handlePlanosActions = () => {
    document.querySelectorAll('.assinar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const planoId = e.target.dataset.planoId;
            const planoNome = e.target.dataset.planoNome;
            const planoPreco = e.target.dataset.planoPreco;

            // Redireciona para o checkout com os dados do plano
            navigate(`/checkout?planoId=${planoId}&nome=${planoNome}&preco=${planoPreco}`);
        });
    });
};

export const renderPlanos = () => {
    if (!isAuthenticated()) {
        navigate('/login');
        return;
    }
    setContent(renderPlanosContent());
    handlePlanosActions();
};
