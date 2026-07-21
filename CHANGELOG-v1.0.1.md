# Elementopia — Update Log

## v1.0.1 (beta) — 20/07/2026

**Escopo:** apenas correção de bugs. Nenhuma mudança visual/rebranding foi feita nesta versão.

### Bugs corrigidos

| # | Arquivo | Bug | Correção |
|---|---------|-----|----------|
| BUG-01 | `js/script.js` | Nome do elemento 66 (Dy) grafado errado: "Dispróbio" | Corrigido para "**Disprósio**" |
| BUG-02 | `index.html` | Favicon (`icon-aba.png`) existia na pasta `assets` mas não estava vinculado — a aba do navegador ficava sem ícone | Adicionada tag `<link rel="icon" type="image/png" href="assets/icon-aba.png">` no `<head>` |
| BUG-03 | `css/styles.css` | `grid-template-rows` tinha `repeat(9, var(--cell-size))` quando deveria ser `repeat(7, ...)` (um por período, 1 a 7). Isso criava 2 linhas "fantasma" do tamanho de uma célula, o que: (a) fazia o separador "── Lantanídeos e Actinídeos ──" ocupar uma linha inteira de ~62px em vez de ficar compacto (16px), e (b) empurrava a fileira dos **Actinídeos** para dentro da linha de 16px reservada ao separador — fazendo os elementos daquela fileira ficarem espremidos/cortados visualmente | Corrigido para `repeat(7, var(--cell-size))`, alinhando exatamente com a lógica do `script.js` (períodos 1-7 → linhas 2-8, separador → linha 9, Lantanídeos → linha 10, Actinídeos → linha 11) |

### Observações revisadas mas NÃO alteradas (fora do escopo desta versão)

- **Alinhamento "escalonado" dos números de grupo**: o cabeçalho do grupo 3 aparece mais abaixo que os demais. Parece intencional (indica onde os metais de transição começam), então não foi alterado. Avaliar se deve mudar no rebranding.
- **Senhas em texto puro no `localStorage`**: sem criptografia. Não foi tratado agora porque a migração planejada é para Firebase Auth.
- **Customizações de cor (metais/ametais) não são salvas** ao recarregar a página ou fazer logout. Não foi corrigido nesta versão para não misturar escopo — bom candidato para a próxima etapa (rebranding).

### Arquivos alterados
- `index.html`
- `css/styles.css`
- `js/script.js`
