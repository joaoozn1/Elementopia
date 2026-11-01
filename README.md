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
- Textos ampliados e contraste automático das células para cores personalizadas, inclusive nos arquivos exportados. A prévia de personalização é compacta e permite rolagem horizontal em telas menores, sem reduzir a resolução das exportações.
- Prévia com os 118 elementos, paletas, cores por grupo e opção de exibir nomes.
- Downloads PNG e JPG em 3120 × 2000 pixels e SVG vetorial.
- PDF pelo diálogo de impressão do navegador: escolha **Salvar como PDF**, orientação paisagem.
- Logos originais em `assets/`; nenhuma fonte ou biblioteca externa.

A categoria “Outros grupos” reúne semimetais, gases nobres e os elementos limítrofes classificados separadamente nesta apresentação simplificada. As massas atômicas vêm dos PDFs “Projeto tabela periódica - MA Decimal” e “Projeto tabela periódica - MA arredondada”, fornecidos pela equipe do projeto. `atomic-masses.js` guarda os 118 pares de valores, incluindo os valores arredondados independentes (por exemplo, Cl = 35 e Rb = 85) e os colchetes originais. O seletor permite ocultar a massa, usar os valores de cada PDF ou formatar com 1, 2 ou 3 casas decimais. Os PDFs só fornecem uma casa decimal: as opções de 2 e 3 casas completam com zeros, sem acrescentar precisão científica. A escolha vale também para PNG, JPG, SVG e PDF. Não há cadastro, backend ou envio de dados.

## Verificação

`node --check app.js` verifica a sintaxe. A página foi validada com Chromium nas larguras de 320, 375, 390, 768, 900, 1024 e 1440 px, sem transbordamento horizontal da página. Foram conferidos: 118 células, paletas, nomes, detalhes, downloads PNG/JPG/SVG, fluxo de impressão PDF, abertura e fechamento do menu, tecla Esc, retorno do foco, cores personalizadas claras/escuras, movimento reduzido e carregamento da logo do IFPR no rodapé. Também foram conferidos os 118 registros de massa, a correspondência dos símbolos, os seis modos de exibição, a restauração do padrão e a preservação dos 34 valores entre colchetes nas exportações.
