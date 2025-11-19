# 🚀 INSTRUÇÕES DE DEPLOY SIMPLIFICADO NO VERCEL - RAÍZES DA SAÚDE

O projeto foi **COMPLETAMENTE REESCRITO** para usar **HTML, CSS e JavaScript puro** no Frontend, mantendo o Backend em Node.js/Express. Isso torna o projeto muito mais leve e o deploy no Vercel muito mais simples e robusto.

**Nova Arquitetura:**
*   **Frontend (Client):** HTML, CSS e JavaScript Puro (Vanilla JS).
*   **Backend (Server):** Node.js/Express (Serverless Function no Vercel).

---

## PASSO 1: Envie o Projeto Refatorado para o GitHub

Você precisa substituir o projeto antigo pelo novo e enviar as alterações para o seu repositório.

1.  **Substitua os arquivos:** Baixe o projeto refatorado que será anexado e substitua todos os arquivos do seu projeto local.
2.  **Execute os comandos Git** no seu terminal, na pasta raiz do projeto:

```bash
# 1. Adicione todas as alterações (incluindo exclusões e novos arquivos)
git add .

# 2. Crie um novo commit
git commit -m "Refatoracao completa para HTML/CSS/JS puro e deploy simplificado no Vercel"

# 3. Envie as alterações para o GitHub
git push
```

---

## PASSO 2: Configuração das Variáveis de Ambiente (ENV)

As variáveis de ambiente continuam sendo cruciais para o Backend. Você deve configurá-las **EXATAMENTE** como antes no painel do Vercel.

1.  Acesse o painel do Vercel e selecione seu projeto.
2.  Vá em **Settings** > **Environment Variables**.
3.  Certifique-se de que as seguintes variáveis estejam configuradas para os ambientes **Production, Preview e Development**:

| Variável | Descrição |
| :--- | :--- |
| `SUPABASE_URL` | URL do seu projeto Supabase. |
| `SUPABASE_KEY` | Chave `anon` (pública) do seu projeto Supabase. |
| `MP_PUBLIC_KEY` | Chave pública do Mercado Pago. |
| `MP_ACCESS_TOKEN` | Token de acesso privado do Mercado Pago. |
| `MP_CLIENT_ID` | ID do Cliente do Mercado Pago. |
| `MP_CLIENT_SECRET` | Segredo do Cliente do Mercado Pago. |
| `JWT_SECRET` | Chave secreta para autenticação (JWT). |

---

## PASSO 3: Deploy no Vercel (Automático)

O Vercel detectará o novo `push` e iniciará o deploy automaticamente.

**O arquivo `vercel.json` foi ajustado para:**
*   Tratar a pasta `client` como um site estático (HTML/CSS/JS puro).
*   Tratar a pasta `server` como uma *Serverless Function* (API).
*   Garantir que todas as rotas da API (`/api/*`) sejam direcionadas para o Backend.
*   Garantir que todas as outras rotas sejam direcionadas para o `client/index.html` (para o roteamento interno do JavaScript).

**Não é mais necessário configurar a variável `VITE_API_URL`**, pois o novo código JavaScript usa a URL relativa (`/api`) que o `vercel.json` roteia corretamente.

Se o deploy não iniciar automaticamente, vá para a aba **Deployments** e clique em **Redeploy**.

O projeto agora está na arquitetura mais simples possível para o Vercel. Se houver qualquer problema, ele estará relacionado às suas variáveis de ambiente ou ao Supabase.

**Boa sorte!**
