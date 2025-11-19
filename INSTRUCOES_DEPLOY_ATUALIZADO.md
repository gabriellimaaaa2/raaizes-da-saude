# 🚀 INSTRUÇÕES DE DEPLOY (ATUALIZADO) - RAÍZES DA SAÚDE

Olá! Identifiquei a causa dos problemas no seu site (tela branca e falta de dados) e já realizei as correções necessárias no código. O problema era que o frontend (React) não estava conseguindo se comunicar com o backend (API) no ambiente de produção do Vercel.

**O que foi corrigido:**
1.  **URL da API Dinâmica:** O frontend agora usará uma variável de ambiente (`VITE_API_URL`) para encontrar o backend. Isso permite que ele funcione tanto localmente quanto no Vercel.
2.  **Remoção do Proxy de Desenvolvimento:** A configuração de `proxy` no arquivo `vite.config.js`, que só funciona em ambiente local, foi removida para evitar conflitos.

---

## PASSO 1: Envie as Correções para o GitHub

Você precisa enviar as alterações que eu fiz para o seu repositório. Execute os seguintes comandos no seu terminal, na pasta do projeto:

```bash
# 1. Adicione as alterações
git add .

# 2. Crie um novo commit com a descrição da correção
git commit -m "Fix: Configura URL da API para produção no Vercel"

# 3. Envie as alterações para o GitHub
git push
```

O Vercel detectará automaticamente o `push` e iniciará um novo deploy.

---

## PASSO 2: Adicione a Nova Variável de Ambiente no Vercel

Este é o passo mais importante. Você precisa informar ao Vercel qual é o endereço do seu backend.

1.  **Acesse o painel do seu projeto no Vercel.**
2.  Vá para **Settings** > **Environment Variables**.
3.  Clique em **Add New** e adicione a seguinte variável:

| Chave (Name) | Valor (Value) | Ambiente(s) |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://[SEU-DOMINIO-VERCEL]/api` | Production, Preview, Development |

**Como encontrar o seu domínio Vercel:**
*   Vá para a aba **Deployments** no seu projeto Vercel.
*   Copie a URL do seu último deploy (ex: `raizes-da-saude-git-main-seu-usuario.vercel.app`).
*   O valor da variável será: `https://raizes-da-saude-git-main-seu-usuario.vercel.app/api`

---

## PASSO 3: Redeploy (se necessário)

Após adicionar a variável de ambiente, o Vercel pode não fazer o redeploy automaticamente. Para garantir que as novas configurações sejam aplicadas:

1.  Vá para a aba **Deployments**.
2.  Encontre o último deploy (que foi acionado pelo seu `git push`).
3.  Clique no menu de três pontos (`...`) e selecione **Redeploy**.

Após o novo deploy ser concluído, seu site deve funcionar corretamente, carregando os produtos e permitindo o login sem a tela branca.

Se ainda encontrar problemas, verifique os logs do Vercel (na aba **Logs** do seu deploy) para ver se há algum erro no backend e me informe.
