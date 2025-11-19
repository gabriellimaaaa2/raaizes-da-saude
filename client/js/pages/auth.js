import { setContent, showMessage, isAuthenticated } from '../utils.js';
import { login, register, recuperarSenha } from '../api.js';
import { navigate } from '../router.js';

const renderLoginForm = () => {
    return `
        <div class="auth-container">
            <h2>Login</h2>
            <form id="login-form" class="auth-form">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="senha" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
            <div class="auth-links">
                <a href="/cadastro" onclick="event.preventDefault(); navigate('/cadastro')">Criar conta</a>
                <a href="/recuperar-senha" onclick="event.preventDefault(); navigate('/recuperar-senha')">Esqueci minha senha</a>
            </div>
        </div>
    `;
};

const handleLogin = () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await login({ email, senha });
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            showMessage('Login realizado com sucesso!');
            navigate('/perfil');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
};

export const renderLogin = () => {
    if (isAuthenticated()) {
        navigate('/perfil');
        return;
    }
    setContent(renderLoginForm());
    handleLogin();
};

const renderCadastroForm = () => {
    return `
        <div class="auth-container">
            <h2>Criar Conta</h2>
            <form id="cadastro-form" class="auth-form">
                <input type="text" id="nome" placeholder="Nome" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="text" id="telefone" placeholder="Telefone (Opcional)">
                <input type="password" id="senha" placeholder="Senha" required>
                <button type="submit">Cadastrar</button>
            </form>
            <div class="auth-links">
                <a href="/login" onclick="event.preventDefault(); navigate('/login')">Já tenho conta</a>
            </div>
        </div>
    `;
};

const handleCadastro = () => {
    const form = document.getElementById('cadastro-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await register({ nome, email, telefone, senha });
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            showMessage('Conta criada com sucesso! Bem-vindo(a)!');
            navigate('/perfil');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
};

export const renderCadastro = () => {
    if (isAuthenticated()) {
        navigate('/perfil');
        return;
    }
    setContent(renderCadastroForm());
    handleCadastro();
};

const renderRecuperarSenhaForm = () => {
    return `
        <div class="auth-container">
            <h2>Recuperar Senha</h2>
            <p>Informe seu email para receber o link de redefinição.</p>
            <form id="recuperar-senha-form" class="auth-form">
                <input type="email" id="email" placeholder="Email" required>
                <button type="submit">Enviar Link</button>
            </form>
            <div class="auth-links">
                <a href="/login" onclick="event.preventDefault(); navigate('/login')">Voltar para Login</a>
            </div>
        </div>
    `;
};

const handleRecuperarSenha = () => {
    const form = document.getElementById('recuperar-senha-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;

        try {
            await recuperarSenha(email);
            showMessage('Se o email estiver cadastrado, você receberá um link para redefinição de senha. (Verifique o console do servidor em desenvolvimento)');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
};

export const renderRecuperarSenha = () => {
    setContent(renderRecuperarSenhaForm());
    handleRecuperarSenha();
};
