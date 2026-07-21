// Elementopia — motor de montagem da tabela periódica
// Compartilhado entre js/script.js (app completo) e js/landing.js (demo da landing page)
// Mantém a lógica de grade em um único lugar para evitar duplicação e divergência entre as duas telas.

function formatMass(mass, format, precision) {
    if (format === 'rounded') return Math.round(mass).toString();
    return mass.toFixed(precision);
}

// Monta a tabela periódica dentro do container indicado.
// options:
//   containerId  (string, obrigatório) - id do elemento onde a grade será renderizada
//   elements     (array, obrigatório)  - lista de elementos no formato de elements-data.js
//   massFormat   ('decimal' | 'rounded')
//   massPrecision (1 a 3)
//   onHover      (function(dataset)) - chamada quando o mouse passa sobre uma célula
function buildPeriodicTable(options) {
    const {
        containerId,
        elements,
        massFormat = 'decimal',
        massPrecision = 1,
        onHover = null
    } = options;

    const table = document.getElementById(containerId);
    if (!table) return;
    table.innerHTML = '';

    const grid = {};
    elements.forEach(el => {
        const [, , , , , row, col] = el;
        if (row <= 7) grid[`${row},${col}`] = el;
    });

    const corner = document.createElement('div');
    corner.style.gridRow = '1';
    corner.style.gridColumn = '1';
    table.appendChild(corner);

    const firstGroupRows = {};
    elements.forEach(el => {
        const [, , , , , row, col] = el;
        if (row <= 7 && (!firstGroupRows[col] || row < firstGroupRows[col])) {
            firstGroupRows[col] = row;
        }
    });

    for (let c = 1; c <= 18; c++) {
        const hdr = document.createElement('div');
        hdr.className = 'col-header';
        hdr.style.gridRow = `${firstGroupRows[c] || 1}`;
        hdr.style.gridColumn = `${c + 1}`;
        hdr.textContent = c;
        table.appendChild(hdr);
    }

    for (let r = 1; r <= 7; r++) {
        const plabel = document.createElement('div');
        plabel.className = 'period-label';
        plabel.style.gridRow = `${r + 1}`;
        plabel.style.gridColumn = '1';
        plabel.textContent = r;
        table.appendChild(plabel);

        for (let c = 1; c <= 18; c++) {
            const key = `${r},${c}`;
            if (grid[key]) {
                const cell = makeElementCell(grid[key], { massFormat, massPrecision, onHover });
                cell.style.gridRow = `${r + 1}`;
                cell.style.gridColumn = `${c + 1}`;
                table.appendChild(cell);
            } else if ((r === 6 && c === 3) || (r === 7 && c === 3)) {
                const ph = document.createElement('div');
                ph.className = 'placeholder';
                ph.style.gridRow = `${r + 1}`;
                ph.style.gridColumn = `${c + 1}`;
                ph.textContent = r === 6 ? '57-71' : '89-103';
                table.appendChild(ph);
            }
        }
    }

    const gap = document.createElement('div');
    gap.className = 'series-spacer';
    gap.style.gridRow = '9';
    gap.style.gridColumn = '1 / -1';
    gap.textContent = '── Lantanídeos e Actinídeos ──';
    table.appendChild(gap);

    const lantEl = elements.filter(e => e[5] === 9);
    const actEl = elements.filter(e => e[5] === 10);

    [lantEl, actEl].forEach((seriesEls, si) => {
        const gridRow = 10 + si;

        const plabel = document.createElement('div');
        plabel.className = 'period-label';
        plabel.style.gridRow = `${gridRow}`;
        plabel.style.gridColumn = '1';
        plabel.textContent = si === 0 ? '6*' : '7*';
        table.appendChild(plabel);

        seriesEls.forEach((el, i) => {
            const cell = makeElementCell(el, { massFormat, massPrecision, onHover });
            cell.style.gridRow = `${gridRow}`;
            cell.style.gridColumn = `${i + 4}`;
            table.appendChild(cell);
        });
    });
}

function makeElementCell(el, { massFormat, massPrecision, onHover }) {
    const [num, sym, name, mass, cat] = el;
    const div = document.createElement('div');
    div.className = `el ${cat}`;

    div.dataset.num = num;
    div.dataset.sym = sym;
    div.dataset.name = name;
    div.dataset.mass = mass;
    div.dataset.cat = cat;

    div.innerHTML = `
    <span class="num">${num}</span>
    <span class="mass">${formatMass(mass, massFormat, massPrecision)}</span>
    <span class="sym">${sym}</span>
    <span class="name">${name}</span>
    `;

    if (onHover) div.addEventListener('mouseenter', () => onHover(div.dataset));
    return div;
}

// Atualiza apenas o texto de massa já renderizado, sem reconstruir a grade inteira
// (usado quando o usuário troca o formato/precisão da massa atômica).
function refreshTableMass(containerId, massFormat, massPrecision) {
    const table = document.getElementById(containerId);
    if (!table) return;
    table.querySelectorAll('.el').forEach(cell => {
        const massSpan = cell.querySelector('.mass');
        if (massSpan) massSpan.textContent = formatMass(parseFloat(cell.dataset.mass), massFormat, massPrecision);
    });
}
