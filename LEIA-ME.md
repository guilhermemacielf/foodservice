# Landing Foodservice — Orgânico do Chico

Página para capturar cadastros de CNPJ de restaurantes/foodservice.
Cada cadastro cai numa planilha do Google que vira sua lista para enviar os cupons.

Arquivos:
- `index.html` — a landing page (é só isso que vai pro ar)
- `codigo-planilha.gs` — o código que recebe os cadastros e salva na planilha
- `LEIA-ME.md` — este guia

---

## Passo 1 — Criar a planilha que recebe os cadastros

1. Abra https://sheets.google.com e crie uma planilha nova. Dê o nome **"Cadastros Foodservice"**.
2. No menu de cima, clique em **Extensões → Apps Script**.
3. Apague o código que aparece (`function myFunction() {}`).
4. Abra o arquivo `codigo-planilha.gs` (desta pasta), **copie tudo** e **cole** no Apps Script.
5. Clique no ícone de **salvar** (disquete).

## Passo 2 — Publicar o Apps Script (gerar a URL)

1. No Apps Script, clique no botão azul **Implantar → Nova implantação**.
2. Em "Selecionar tipo" (engrenagem ⚙️), escolha **App da Web**.
3. Configure:
   - **Executar como:** Eu (seu e-mail)
   - **Quem pode acessar:** **Qualquer pessoa**  ← importante!
4. Clique em **Implantar**. Ele vai pedir autorização — autorize com sua conta Google
   (pode aparecer "app não verificado" → clique em *Avançado → Acessar o projeto*).
5. Ele mostra uma **URL do app da Web** (termina em `/exec`). **Copie essa URL.**

## Passo 3 — Colar a URL na landing

1. Abra o `index.html` e ache esta linha (lá no começo):
   ```js
   const URL_PLANILHA = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";
   ```
2. Troque o `COLE_AQUI...` pela URL que você copiou. Fica assim:
   ```js
   const URL_PLANILHA = "https://script.google.com/macros/s/AKf.../exec";
   ```
3. Salve.

## Passo 4 — Testar

1. Abra o `index.html` no navegador (dois cliques no arquivo).
2. Preencha o formulário e envie.
3. Volte na planilha → deve aparecer uma linha nova com o cadastro. ✅

## Passo 5 — Publicar a página (GitHub Pages)

Mesma lógica da landing do assinatura:
1. Crie um repositório novo no GitHub (ex.: `foodservice`).
2. Suba o `index.html`.
3. Settings → Pages → Branch `main` → Save.
4. Em ~1 min o link fica no ar. É esse link que você manda na mala direta.

---

## Coisas pra ajustar antes de divulgar

- **Link da loja no rodapé:** confirme se `organicodochico.com.br` é o endereço certo.
- **Texto do cupom:** a página fala "cupom de desconto exclusivo" sem citar o %.
  Decida o número (faça a conta de margem antes!) e, se quiser, coloque na faixa verde.
- **Foto real:** hoje o "hero" usa emojis 🍅🥕🥦. Se quiser, troca por uma foto dos
  produtos depois (me chama que eu te mostro onde).

## Como os cadastros viram cupons

A planilha te dá: Estabelecimento, **CNPJ**, Responsável, WhatsApp, E-mail, Tipo.
Com o CNPJ em mãos você gera/amarra o cupom no Instabuy e manda pelo WhatsApp do contato.
