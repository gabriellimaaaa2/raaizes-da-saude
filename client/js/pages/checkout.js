import { setContent, showMessage, formatarMoeda, navigate } from '../utils.js';
import { getPublicKey, criarPix, verificarPagamento } from '../api.js';

let mp;
let cardForm;
let timerInterval;

const renderCheckoutContent = (plano) => {
    return `
        <div class="checkout-container">
            <h2>Finalizar Assinatura</h2>

            <div class="plano-resumo">
                <h3>Resumo do Pedido</h3>
                <p><strong>Plano:</strong> ${plano.nome}</p>
                <p><strong>Valor:</strong> ${formatarMoeda(plano.preco)}</p>
            </div>

            <div class="checkout-options">
                <h3>Escolha o Método de Pagamento</h3>
                <button id="btn-pix">Pagar com PIX</button>
                <!-- <button id="btn-cartao">Pagar com Cartão de Crédito</button> -->
            </div>

            <div id="pix-section" style="display: none;">
                <div class="pix-area">
                    <p>Escaneie o QR Code ou copie o código PIX para pagar.</p>
                    <img id="qr-code-img" src="" alt="QR Code PIX" style="display: none;">
                    <p id="pix-code" style="word-break: break-all; font-weight: bold;"></p>
                    <button id="copy-pix-btn" style="display: none;">Copiar Código PIX</button>
                    <p id="pix-timer" class="pix-timer"></p>
                    <p><strong>Aguardando pagamento... Não feche esta página!</strong></p>
                </div>
            </div>

            <div id="card-section" style="display: none;">
                <!-- Formulário do Mercado Pago será injetado aqui -->
            </div>
        </div>
    `;
};

const startTimer = (duration) => {
    let timer = duration;
    const timerElement = document.getElementById('pix-timer');

    timerInterval = setInterval(() => {
        const minutes = parseInt(timer / 60, 10);
        const seconds = parseInt(timer % 60, 10);

        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = `Tempo restante: ${displayMinutes}:${displaySeconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Tempo expirado. Gere um novo PIX.";
        }
    }, 1000);
};

const checkPaymentStatus = (paymentId) => {
    const checkInterval = setInterval(async () => {
        try {
            const status = await verificarPagamento(paymentId);
            if (status.status === 'approved') {
                clearInterval(checkInterval);
                clearInterval(timerInterval);
                showMessage('Pagamento aprovado! Seu plano está ativo.', 'success');
                navigate('/perfil');
            }
        } catch (error) {
            console.error('Erro ao verificar status:', error);
        }
    }, 5000); // Verifica a cada 5 segundos
};

const handlePixPayment = (plano) => {
    document.getElementById('btn-pix').addEventListener('click', async () => {
        try {
            document.getElementById('pix-section').style.display = 'block';
            document.getElementById('btn-pix').disabled = true;

            const response = await criarPix(plano.id);
            const { qr_code_base64, qr_code, payment_id } = response;

            const qrCodeImg = document.getElementById('qr-code-img');
            const pixCode = document.getElementById('pix-code');
            const copyBtn = document.getElementById('copy-pix-btn');

            qrCodeImg.src = `data:image/jpeg;base64,${qr_code_base64}`;
            qrCodeImg.style.display = 'block';
            pixCode.textContent = qr_code;
            copyBtn.style.display = 'block';

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(qr_code);
                showMessage('Código PIX copiado!', 'success');
            });

            // O Mercado Pago geralmente dá 20 minutos, mas o projeto original usava 2 minutos
            startTimer(120); // 2 minutos

            checkPaymentStatus(payment_id);

        } catch (error) {
            showMessage(error.message, 'error');
            document.getElementById('pix-section').style.display = 'none';
            document.getElementById('btn-pix').disabled = false;
        }
    });
};

export const renderCheckout = async () => {
    const params = new URLSearchParams(window.location.search);
    const plano = {
        id: params.get('planoId'),
        nome: params.get('nome'),
        preco: parseFloat(params.get('preco'))
    };

    if (!plano.id) {
        navigate('/planos');
        return;
    }

    setContent(renderCheckoutContent(plano));

    // Inicializa o Mercado Pago SDK
    try {
        const publicKeyResponse = await getPublicKey();
        mp = new window.MercadoPago(publicKeyResponse.public_key, {
            locale: 'pt-BR'
        });
    } catch (error) {
        showMessage('Erro ao inicializar o Mercado Pago.', 'error');
        return;
    }

    handlePixPayment(plano);
};
