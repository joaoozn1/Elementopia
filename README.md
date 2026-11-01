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
- Textos ampliados e contraste automático das células para cores personalizadas, inclusive nos arquivos exportados. A tabela permite rolagem horizontal para manter as células legíveis.
- Prévia com os 118 elementos, paletas, cores por grupo e opção de exibir nomes.
- Downloads PNG e JPG em 3120 × 2000 pixels e SVG vetorial.
- PDF pelo diálogo de impressão do navegador: escolha **Salvar como PDF**, orientação paisagem.
- Logos originais em `assets/`; nenhuma fonte ou biblioteca externa.

A categoria “Outros grupos” reúne semimetais, gases nobres e os elementos limítrofes classificados separadamente nesta apresentação simplificada. A tabela não mostra massas atômicas. Não há cadastro, backend ou envio de dados.

## Verificação

`node --check app.js` verifica a sintaxe. A página foi validada com Chromium nas larguras de 320, 375, 390, 768, 900, 1024 e 1440 px, sem transbordamento horizontal da página. Foram conferidos: 118 células, paletas, nomes, detalhes, downloads PNG/JPG/SVG, fluxo de impressão PDF, abertura e fechamento do menu, tecla Esc, retorno do foco, cores personalizadas claras/escuras e movimento reduzido.
