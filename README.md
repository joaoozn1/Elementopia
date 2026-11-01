# Elementopia · Beta v1.0.6

Site em português com landing page e uma página dedicada à customização de tabelas periódicas. Feito com HTML, CSS e JavaScript, sem dependências externas. A versão está registrada em `VERSION`.

## Executar localmente

Na pasta do projeto:

```sh
python -m http.server 8000
```

Abra a porta 8000 no seu navegador. `index.html` apresenta o projeto; os botões **Criar tabela** abrem `customizar.html`. A página de customização também funciona por acesso direto e oferece retorno à landing. As duas páginas podem ser abertas diretamente do sistema de arquivos para navegação; para exportar com a logo incorporada, use o servidor local acima, que permite carregar a imagem da marca.

## Organização

- `index.html`: landing page, sem prévia interativa e sem carregar os dados ou scripts da tabela.
- `customizar.html`: espaço de customização com os quatro cards e a tabela.
- `site.js`: navegação compartilhada; funciona mesmo em páginas sem menu ou rodapé com ano.
- `customizar.js` e `atomic-masses.js`: comportamento e dados carregados apenas no customizador.
- `styles.css`: identidade compartilhada e layout da landing.
- `customizar.css`: layout dedicado dos controles e tabela, sem cabeçalho flutuante sobre o espaço de trabalho.

## Recursos

- Layout responsivo, navegação flutuante com menu móvel acessível e animações com respeito à preferência de movimento reduzido.
- Design com vidro fosco, brilho sutil e paleta roxa definida em variáveis CSS; fundo branco e superfícies de fallback para navegadores sem desfoque.
- Navegação do customizador com atalhos, botão de voltar ao início e botão de versão que abre um histórico de atualizações animado, acessível por teclado.
- Número atômico, massa e nomes ampliados na tabela, no destaque e nas exportações.
- Logo colorida original incorporada no cabeçalho de todos os formatos exportados.
- Customizador com quatro cards: elemento em destaque, cores, massa atômica e exportação.
- Cores independentes para fundo e texto de metais e ametais; semimetais, gases nobres e outros elementos usam a segunda combinação. Um aviso aparece quando o contraste escolhido fica abaixo de 4,5:1.
- Prévia com os 118 elementos, numeração de grupos e períodos, seleção de elementos e opção de exibir nomes e massas.
- Massas em modo decimal (1, 2 ou 3 casas) ou arredondado. A precisão escolhida também aparece no destaque e nas exportações.
- Nome de arquivo personalizável e downloads PNG/JPEG em 1560 × 1000, 3120 × 2000 ou 4680 × 3000 pixels. SVG vetorial e PDF não dependem do seletor de qualidade.
- PDF por download direto em A4 paisagem, com imagem de alta resolução (3120 × 2000 px), sem abrir a impressão do navegador e sem cabeçalhos com data, hora, endereço ou nome de arquivo.
- Logos originais em `assets/`; nenhuma fonte ou biblioteca externa.

### Dados de massa atômica

Os valores decimais de `atomic-masses.js` foram transcritos da referência visual com três casas decimais enviada pela equipe do projeto (por exemplo, H = 1,008; Mg = 24,305; Fe = 55,845). Agora as opções de duas e três casas usam esses valores, em vez de completar os antigos valores de uma casa com zeros. A interface usa vírgula decimal em português e arredonda os valores de forma decimal: Mg = 24,3 / 24,31 / 24,305.

O campo `rounded` preserva os valores dos PDFs originais para rastreabilidade, mas o modo **Arredondada** calcula o inteiro a partir da referência decimal atual. Para os 34 registros identificados como isótopos nos PDFs, a interface mantém o número de massa entre colchetes, sem atribuir precisão decimal artificial. Alguns números de massa da referência visual diferem dos PDFs antigos; a visualização atual usa os números da referência mais recente. Esses dados são a referência do projeto, sem alegação de atualização para uma edição específica da IUPAC.

As escolhas de cores, nomes e massas valem também para PNG, JPEG, SVG e PDF. Não há cadastro, backend ou envio de dados.

## Verificação

`node --check site.js`, `node --check customizar.js` e `node --check atomic-masses.js` verificam a sintaxe.

A beta foi validada em Chromium, tanto na landing quanto no customizador, nas larguras de 320, 390, 768, 1024, 1280 e 1544 px, sem transbordamento horizontal da página, com os cards em uma, duas ou quatro colunas. Foram conferidos os 118 registros, a correspondência dos símbolos, os três níveis de precisão, o arredondamento, os 34 valores entre colchetes, a atualização do elemento em destaque, as quatro cores, o aviso de contraste, a visibilidade dos nomes e massas, a restauração dos padrões, o nome do arquivo, PNG/JPEG em alta qualidade, SVG e o download direto do PDF.

Também foram verificados: ausência da prévia e dos scripts de tabela na landing, os três botões que abrem o customizador, acesso direto à nova página, retorno à landing, identificação Beta v1.0.6, funcionamento do menu móvel e ausência de erros JavaScript nas duas páginas.

Na beta v1.0.6 também foram validados: abertura e fechamento do histórico por botão, Esc e clique fora; foco contido no modal e devolvido ao botão da versão; preferência de movimento reduzido; fontes ampliadas sem sobreposição do número e da massa; correspondência exata dos bytes da logo incorporada ao SVG e presença visual da logo no PNG exportado.

Na beta v1.0.6, os 18 números de grupo foram conferidos acima dos elementos que iniciam cada coluna, tanto no DOM quanto no SVG. O PDF foi aberto e renderizado com PyMuPDF: uma página A4 paisagem, sem reparo estrutural, sem título ou datas nos metadados e sem a frase abaixo da logo. O arquivo preserva o nome escolhido apenas para o download, sem imprimi-lo na página.
