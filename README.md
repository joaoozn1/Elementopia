# Elementopia

Landing page em português para personalizar tabelas periódicas, feita com HTML, CSS e JavaScript, sem dependências externas.

## Executar localmente

Na pasta do projeto:

```sh
python -m http.server 8000
```

Abra a porta 8000 no seu navegador. Também é possível abrir `index.html` diretamente.

## Recursos

- Layout responsivo, navegação flutuante com menu móvel acessível e animações com respeito à preferência de movimento reduzido.
- Design com vidro fosco, brilho sutil e paleta roxa definida em variáveis CSS; fundo branco e superfícies de fallback para navegadores sem desfoque.
- Customizador com quatro cards: elemento em destaque, cores, massa atômica e exportação.
- Cores independentes para fundo e texto de metais e ametais; semimetais, gases nobres e outros elementos usam a segunda combinação. Um aviso aparece quando o contraste escolhido fica abaixo de 4,5:1.
- Prévia com os 118 elementos, numeração de grupos e períodos, seleção de elementos e opção de exibir nomes e massas.
- Massas em modo decimal (1, 2 ou 3 casas) ou arredondado. A precisão escolhida também aparece no destaque e nas exportações.
- Nome de arquivo personalizável e downloads PNG/JPEG em 1560 × 1000, 3120 × 2000 ou 4680 × 3000 pixels. SVG vetorial e PDF não dependem do seletor de qualidade.
- PDF pelo diálogo de impressão do navegador: escolha **Salvar como PDF**, orientação paisagem.
- Logos originais em `assets/`; nenhuma fonte ou biblioteca externa.

### Dados de massa atômica

Os valores decimais de `atomic-masses.js` foram transcritos da referência visual com três casas decimais enviada pela equipe do projeto (por exemplo, H = 1,008; Mg = 24,305; Fe = 55,845). Agora as opções de duas e três casas usam esses valores, em vez de completar os antigos valores de uma casa com zeros. A interface usa vírgula decimal em português e arredonda os valores de forma decimal: Mg = 24,3 / 24,31 / 24,305.

O campo `rounded` preserva os valores dos PDFs originais para rastreabilidade, mas o modo **Arredondada** calcula o inteiro a partir da referência decimal atual. Para os 34 registros identificados como isótopos nos PDFs, a interface mantém o número de massa entre colchetes, sem atribuir precisão decimal artificial. Alguns números de massa da referência visual diferem dos PDFs antigos; a visualização atual usa os números da referência mais recente. Esses dados são a referência do projeto, sem alegação de atualização para uma edição específica da IUPAC.

As escolhas de cores, nomes e massas valem também para PNG, JPEG, SVG e PDF. Não há cadastro, backend ou envio de dados.

## Verificação

`node --check app.js` e `node --check atomic-masses.js` verificam a sintaxe.

O customizador foi validado em Chromium nas larguras de 320, 390, 768, 1024, 1280 e 1544 px, sem transbordamento horizontal da página, com os cards em uma, duas ou quatro colunas. Foram conferidos os 118 registros, a correspondência dos símbolos, os três níveis de precisão, o arredondamento, os 34 valores entre colchetes, a atualização do elemento em destaque, as quatro cores, o aviso de contraste, a visibilidade dos nomes e massas, a restauração dos padrões, o nome do arquivo, PNG/JPEG em alta qualidade, SVG e o fluxo de impressão PDF.
