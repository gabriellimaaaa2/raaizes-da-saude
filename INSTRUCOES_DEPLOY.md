# 🚀 INSTRUÇÕES DE DEPLOY NO VERCEL - RAÍZES DA SAÚDE

O projeto foi analisado e ajustado para ser hospedado na Vercel como um **Monorepo** (Frontend e Backend no mesmo projeto), utilizando a configuração de *Serverless Functions* para o backend.

**Tecnologias Identificadas:**
*   **Frontend (Client):** React com Vite
*   **Backend (Server):** Node.js (Express)
*   **Banco de Dados:** Supabase
*   **Pagamentos:** Mercado Pago

---

## PASSO 1: Preparação do Repositório Git

Para fazer o deploy no Vercel, o projeto precisa estar em um repositório Git (GitHub, GitLab ou Bitbucket).

1.  **Crie um novo repositório** vazio (ex: `raizes-da-saude-app`) no seu serviço de preferência (GitHub é o mais comum).
2.  **Inicialize o Git** na pasta do projeto (`raizes-da-saude`):
    ```bash
    cd raizes-da-saude
    git init
    git add .
    git commit -m "Initial commit: Projeto Raizes da Saude pronto para Vercel"
    ```
3.  **Conecte e envie** para o repositório remoto que você criou:
    ```bash
    git remote add origin [URL_DO_SEU_REPOSITORIO]
    git push -u origin master
    ```

---

## PASSO 2: Configuração das Variáveis de Ambiente (ENV)

O projeto depende de variáveis de ambiente sensíveis que **NÃO DEVEM** ser incluídas no código. Você deve configurá-las diretamente no painel do Vercel.

**Variáveis de Ambiente Necessárias:**

| Variável | Descrição | Exemplo de Valor (Não use estes!) |
| :--- | :--- | :--- |
| `SUPABASE_URL` | URL do seu projeto Supabase. | `https://bubqhemqdgprdrfijrew.supabase.co` |
| `SUPABASE_KEY` | Chave `anon` (pública) do seu projeto Supabase. | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `MP_PUBLIC_KEY` | Chave pública do Mercado Pago. | `APP_USR-81c2464c-ea7d-4311-bb08-ff23ecfd566d` |
| `MP_ACCESS_TOKEN` | Token de acesso privado do Mercado Pago. | `APP_USR-6003200364336443-111809-...` |
| `MP_CLIENT_ID` | ID do Cliente do Mercado Pago. | `6003200364336443` |
| `MP_CLIENT_SECRET` | Segredo do Cliente do Mercado Pago. | `kfIF69tPJyrx0txvCRTrrqUoeF2USlCx` |
| `JWT_SECRET` | Chave secreta para autenticação (JWT). | `raizes-da-saude-secret-key-2024-super-secure` |

**Como Configurar no Vercel:**

1.  Acesse o painel do Vercel e selecione seu projeto.
2.  Vá em **Settings** > **Environment Variables**.
3.  Adicione cada variável da tabela acima com o seu respectivo valor.
4.  Certifique-se de que o campo **Environments** esteja marcado como **Production, Preview e Development**.

---

## PASSO 3: Deploy no Vercel

O arquivo `vercel.json` foi criado e configurado para que o Vercel saiba como construir e rotear seu projeto.

1.  Acesse o painel do Vercel e clique em **Add New...** > **Project**.
2.  Selecione o repositório que você criou no **Passo 1**.
3.  Na tela de **Configure Project**, o Vercel deve detectar automaticamente que é um projeto Node.js.
4.  **Root Directory:** O Vercel deve detectar a raiz do projeto. Se não detectar, defina como `/`.
5.  **Build & Output Settings:** Deixe as configurações padrão, pois o `vercel.json` irá sobrescrevê-las.
6.  Clique em **Deploy**.

### ⚠️ Configuração de Rotas (Importante)

O arquivo `vercel.json` garante que:
*   Todas as requisições para `/api/*` sejam roteadas para o seu backend (`server/index.js`).
*   Todas as outras requisições sejam roteadas para o seu frontend (`client/`).

---

## PASSO 4: Configuração do Supabase (Opcional, mas Recomendado)

Se você ainda não fez, execute o arquivo `INSTRUCOES_SQL.md` no **SQL Editor** do seu projeto Supabase para garantir que o banco de dados esteja com a estrutura correta.

---

## PRÓXIMOS PASSOS

Eu preparei o projeto e criei os seguintes arquivos para você:
1.  `vercel.json`: Arquivo de configuração para o deploy no Vercel.
2.  `.env.example`: Exemplo das variáveis de ambiente necessárias.
3.  `INSTRUCOES_DEPLOY.md`: Este guia passo a passo.

Você pode baixar o projeto ajustado e seguir as instruções acima.

**O projeto final ajustado está pronto para ser baixado e enviado para o seu repositório Git.**
