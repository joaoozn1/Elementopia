# Elementopia — Update Log

## v1.1.0 (beta) — 20/07/2026

**Escopo:** criação da landing page inicial + preparação da arquitetura de arquivos para o futuro (rebranding total, Firebase, novas páginas). O app da tabela (antigo `index.html`) não teve nenhuma mudança visual ou de comportamento — só mudou de nome.

### Estrutura de páginas

| Antes | Agora | O que é |
|---|---|---|
| `index.html` | `tabela.html` | O app completo: login, tabela interativa, customização de cores e exportação em PDF. Sem mudanças de comportamento — só renomeado. |
| — | `index.html` (novo) | Landing page pública: explica o que é o Elementopia e deixa testar a customização da tabela sem precisar de login. |

### Novidades

- **Landing page nova** (`index.html`), com:
  - Hero de apresentação estilizado como uma "célula de elemento" gigante (número atômico, símbolo `Eo`, nome, versão no lugar da massa) — usando a paleta real da marca (`#8439d1` roxo, `#f8cf18` amarelo).
  - Seção "Como funciona" com 3 cards explicando cores customizáveis, formato da massa atômica e exportação em PDF.
  - Seção "Experimente agora" com uma **prévia funcional da tabela periódica** (cores, formato de massa, hover no elemento), sem exigir login. O botão de exportar PDF fica reservado à plataforma completa.
  - Marca d'água discreta no canto inferior direito mostrando a versão (`Beta 1.1.0`).
  - Link "Entrar" no menu e nos botões, levando para `tabela.html`.
  - Favicon e logo (`assets/icon-aba.png`, `assets/elementopia-logo-branca.png`) já referenciados.
- **Link de volta** ("← Elementopia") adicionado no cabeçalho de `tabela.html`, apontando para a landing.

### Reorganização interna (preparação para o futuro)

- `js/elements-data.js` (novo): array com os 118 elementos, agora centralizado num único lugar. Antes vivia só dentro de `script.js`.
- `js/table-builder.js` (novo): a lógica de montar a grade da tabela periódica (que antes estava só em `script.js`) virou um módulo compartilhado, usado tanto pelo app quanto pela prévia da landing.
- `js/script.js`: passou a usar `elements-data.js` e `table-builder.js` em vez de código duplicado. Comportamento idêntico ao de antes — validado com testes.
- `js/landing.js` (novo): lógica da prévia interativa da landing (cores, formato de massa), sem login e sem exportação.
- `css/brand.css` (novo): cores oficiais da marca centralizadas em variáveis (`--brand-purple`, `--brand-yellow`, etc.), prontas para quando o rebranding visual do app acontecer.
- `css/landing.css` (novo): estilos exclusivos da landing page. Reaproveita classes já existentes em `styles.css` (tabela, cards, controles) para não duplicar CSS.

### Por que isso importa pra você

Com essa separação, quando entrarmos na etapa de rebranding total do `tabela.html` (ou adicionarmos login com Google/Firebase), não vamos precisar duplicar a lógica da tabela nem os dados dos elementos — é só um lugar pra mudar.

### Arquivos novos
- `index.html` (landing — substituiu o antigo)
- `tabela.html` (app, renomeado do antigo `index.html`)
- `js/elements-data.js`
- `js/table-builder.js`
- `js/landing.js`
- `css/brand.css`
- `css/landing.css`

### Arquivos alterados
- `js/script.js` (refatorado para usar os módulos compartilhados — sem mudança de comportamento)
- `css/styles.css` (adicionado estilo do link "← Elementopia" no cabeçalho do app)

### Pendências para as próximas versões
- Rebranding visual completo do `tabela.html` com as cores da marca (`css/brand.css` já está pronto para isso).
- Login via Google / Firebase.
- Persistência das customizações de cor entre sessões.
