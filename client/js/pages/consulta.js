import { setContent, showMessage, navigate } from '../utils.js';
import { criarConsulta } from '../api.js';

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
            <a href="/consulta-virtual" class="active" onclick="event.preventDefault(); navigate('/consulta-virtual')">
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

const renderConsultaContent = () => {
    return `
        <div class="consulta-container">
            <h2>Consulta Virtual com a Vovó</h2>
            <p>Descreva seus sintomas ou o que você está sentindo e nossa IA (a Vovó) fará uma recomendação de remédio caseiro.</p>

            <form id="consulta-form">
                <textarea id="sintomas" placeholder="Descreva seus sintomas aqui..." rows="6" required></textarea>
                <button type="submit">Obter Recomendação</button>
            </form>

            <div id="resultado-consulta" style="margin-top: 30px;">
                <!-- Resultado da consulta será injetado aqui -->
            </div>
        </div>
        ${renderBottomNav()}
    `;
};

const handleConsulta = () => {
    const form = document.getElementById('consulta-form');
    const resultadoDiv = document.getElementById('resultado-consulta');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sintomas = document.getElementById('sintomas').value;

        resultadoDiv.innerHTML = '<p>Buscando a sabedoria da Vovó... aguarde.</p>';
        form.querySelector('button').disabled = true;

        try {
            const response = await criarConsulta({ sintomas });
            resultadoDiv.innerHTML = `
                <h3>Recomendação da Vovó:</h3>
                <p>${response.recomendacao}</p>
                <p><strong>Atenção:</strong> Esta é uma recomendação popular. Consulte um médico em caso de persistência dos sintomas.</p>
            `;
        } catch (error) {
            showMessage(error.message, 'error');
            resultadoDiv.innerHTML = `<p class="app-alert app-alert-error">Erro na consulta: ${error.message}</p>`;
        } finally {
            form.querySelector('button').disabled = false;
        }
    });
};

export const renderConsultaVirtual = () => {
    setContent(renderConsultaContent());
    handleConsulta();
};
