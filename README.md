# Elementopia

Landing page em português para personalizar tabelas periódicas, feita com HTML, CSS e JavaScript, sem dependências externas.

## Executar localmente

Na pasta do projeto:

```sh
python -m http.server 8000
```

Abra a porta 8000 no seu navegador. Também é possível abrir `index.html` diretamente.

## Recursos

- Layout responsivo, navegação móvel e animações com respeito à preferência de movimento reduzido.
- Prévia com os 118 elementos, paletas, cores por grupo e opção de exibir nomes.
- Downloads PNG e JPG em 3120 × 2000 pixels e SVG vetorial.
- PDF pelo diálogo de impressão do navegador: escolha **Salvar como PDF**, orientação paisagem.
- Logos originais em `assets/`; nenhuma fonte ou biblioteca externa.

A categoria “Outros grupos” reúne semimetais, gases nobres e os elementos limítrofes classificados separadamente nesta apresentação simplificada. A tabela não mostra massas atômicas. Não há cadastro, backend ou envio de dados.

## Verificação

`node --check app.js` verifica a sintaxe. A página também foi validada com Chromium em desktop (1440 px) e celular (390 px), incluindo as 118 células, paletas, nomes, detalhes, menu e downloads. O fluxo PDF usa a impressão do navegador.
