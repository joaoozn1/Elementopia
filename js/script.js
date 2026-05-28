const elements = [
    [1, "H", "Hidrogênio", 1.008, "ametal", 1, 1],
    [2, "He", "Hélio", 4.003, "ametal", 1, 18],
    [3, "Li", "Lítio", 6.941, "metal", 2, 1],
    [4, "Be", "Berílio", 9.012, "metal", 2, 2],
    [5, "B", "Boro", 10.811, "ametal", 2, 13],
    [6, "C", "Carbono", 12.011, "ametal", 2, 14],
    [7, "N", "Nitrogênio", 14.007, "ametal", 2, 15],
    [8, "O", "Oxigênio", 15.999, "ametal", 2, 16],
    [9, "F", "Flúor", 18.998, "ametal", 2, 17],
    [10, "Ne", "Neônio", 20.180, "ametal", 2, 18],
    [11, "Na", "Sódio", 22.990, "metal", 3, 1],
    [12, "Mg", "Magnésio", 24.305, "metal", 3, 2],
    [13, "Al", "Alumínio", 26.982, "metal", 3, 13],
    [14, "Si", "Silício", 28.086, "ametal", 3, 14],
    [15, "P", "Fósforo", 30.974, "ametal", 3, 15],
    [16, "S", "Enxofre", 32.065, "ametal", 3, 16],
    [17, "Cl", "Cloro", 35.453, "ametal", 3, 17],
    [18, "Ar", "Argônio", 39.948, "ametal", 3, 18],
    [19, "K", "Potássio", 39.098, "metal", 4, 1],
    [20, "Ca", "Cálcio", 40.078, "metal", 4, 2],
    [21, "Sc", "Escândio", 44.956, "metal", 4, 3],
    [22, "Ti", "Titânio", 47.867, "metal", 4, 4],
    [23, "V", "Vanádio", 50.942, "metal", 4, 5],
    [24, "Cr", "Cromo", 51.996, "metal", 4, 6],
    [25, "Mn", "Manganês", 54.938, "metal", 4, 7],
    [26, "Fe", "Ferro", 55.845, "metal", 4, 8],
    [27, "Co", "Cobalto", 58.933, "metal", 4, 9],
    [28, "Ni", "Níquel", 58.693, "metal", 4, 10],
    [29, "Cu", "Cobre", 63.546, "metal", 4, 11],
    [30, "Zn", "Zinco", 65.38, "metal", 4, 12],
    [31, "Ga", "Gálio", 69.723, "metal", 4, 13],
    [32, "Ge", "Germânio", 72.63, "ametal", 4, 14],
    [33, "As", "Arsênio", 74.922, "ametal", 4, 15],
    [34, "Se", "Selênio", 78.96, "ametal", 4, 16],
    [35, "Br", "Bromo", 79.904, "ametal", 4, 17],
    [36, "Kr", "Criptônio", 83.798, "ametal", 4, 18],
    [37, "Rb", "Rubídio", 85.468, "metal", 5, 1],
    [38, "Sr", "Estrôncio", 87.62, "metal", 5, 2],
    [39, "Y", "Ítrio", 88.906, "metal", 5, 3],
    [40, "Zr", "Zircônio", 91.224, "metal", 5, 4],
    [41, "Nb", "Nióbio", 92.906, "metal", 5, 5],
    [42, "Mo", "Molibdênio", 95.96, "metal", 5, 6],
    [43, "Tc", "Tecnécio", 98, "metal", 5, 7],
    [44, "Ru", "Rutênio", 101.07, "metal", 5, 8],
    [45, "Rh", "Ródio", 102.906, "metal", 5, 9],
    [46, "Pd", "Paládio", 106.42, "metal", 5, 10],
    [47, "Ag", "Prata", 107.868, "metal", 5, 11],
    [48, "Cd", "Cádmio", 112.411, "metal", 5, 12],
    [49, "In", "Índio", 114.818, "metal", 5, 13],
    [50, "Sn", "Estanho", 118.71, "metal", 5, 14],
    [51, "Sb", "Antimônio", 121.76, "ametal", 5, 15],
    [52, "Te", "Telúrio", 127.6, "ametal", 5, 16],
    [53, "I", "Iodo", 126.904, "ametal", 5, 17],
    [54, "Xe", "Xenônio", 131.293, "ametal", 5, 18],
    [55, "Cs", "Césio", 132.905, "metal", 6, 1],
    [56, "Ba", "Bário", 137.327, "metal", 6, 2],
    [57, "La", "Lantânio", 138.905, "metal", 9, 1],
    [58, "Ce", "Cério", 140.116, "metal", 9, 2],
    [59, "Pr", "Praseodímio", 140.908, "metal", 9, 3],
    [60, "Nd", "Neodímio", 144.242, "metal", 9, 4],
    [61, "Pm", "Promécio", 145, "metal", 9, 5],
    [62, "Sm", "Samário", 150.36, "metal", 9, 6],
    [63, "Eu", "Európio", 151.964, "metal", 9, 7],
    [64, "Gd", "Gadolínio", 157.25, "metal", 9, 8],
    [65, "Tb", "Térbio", 158.925, "metal", 9, 9],
    [66, "Dy", "Dispróbio", 162.5, "metal", 9, 10],
    [67, "Ho", "Hólmio", 164.930, "metal", 9, 11],
    [68, "Er", "Érbio", 167.259, "metal", 9, 12],
    [69, "Tm", "Túlio", 168.934, "metal", 9, 13],
    [70, "Yb", "Itérbio", 173.054, "metal", 9, 14],
    [71, "Lu", "Lutécio", 174.967, "metal", 9, 15],
    [72, "Hf", "Háfnio", 178.49, "metal", 6, 4],
    [73, "Ta", "Tântalo", 180.948, "metal", 6, 5],
    [74, "W", "Tungstênio", 183.84, "metal", 6, 6],
    [75, "Re", "Rênio", 186.207, "metal", 6, 7],
    [76, "Os", "Ósmio", 190.23, "metal", 6, 8],
    [77, "Ir", "Irídio", 192.217, "metal", 6, 9],
    [78, "Pt", "Platina", 195.084, "metal", 6, 10],
    [79, "Au", "Ouro", 196.967, "metal", 6, 11],
    [80, "Hg", "Mercúrio", 200.59, "metal", 6, 12],
    [81, "Tl", "Tálio", 204.383, "metal", 6, 13],
    [82, "Pb", "Chumbo", 207.2, "metal", 6, 14],
    [83, "Bi", "Bismuto", 208.980, "metal", 6, 15],
    [84, "Po", "Polônio", 209, "ametal", 6, 16],
    [85, "At", "Astato", 210, "ametal", 6, 17],
    [86, "Rn", "Radônio", 222, "ametal", 6, 18],
    [87, "Fr", "Frâncio", 223, "metal", 7, 1],
    [88, "Ra", "Rádio", 226, "metal", 7, 2],
    [89, "Ac", "Actínio", 227, "metal", 10, 1],
    [90, "Th", "Tório", 232.038, "metal", 10, 2],
    [91, "Pa", "Protactínio", 231.036, "metal", 10, 3],
    [92, "U", "Urânio", 238.029, "metal", 10, 4],
    [93, "Np", "Neptúnio", 237, "metal", 10, 5],
    [94, "Pu", "Plutônio", 244, "metal", 10, 6],
    [95, "Am", "Amerício", 243, "metal", 10, 7],
    [96, "Cm", "Cúrio", 247, "metal", 10, 8],
    [97, "Bk", "Berquélio", 247, "metal", 10, 9],
    [98, "Cf", "Califórnio", 251, "metal", 10, 10],
    [99, "Es", "Einstênio", 252, "metal", 10, 11],
    [100, "Fm", "Férmio", 257, "metal", 10, 12],
    [101, "Md", "Mendelévio", 258, "metal", 10, 13],
    [102, "No", "Nobélio", 259, "metal", 10, 14],
    [103, "Lr", "Laurêncio", 262, "metal", 10, 15],
    [104, "Rf", "Rutherfórdio", 267, "metal", 7, 4],
    [105, "Db", "Dúbnio", 268, "metal", 7, 5],
    [106, "Sg", "Seabórgio", 271, "metal", 7, 6],
    [107, "Bh", "Bóhrio", 272, "metal", 7, 7],
    [108, "Hs", "Hássio", 270, "metal", 7, 8],
    [109, "Mt", "Meitnério", 276, "metal", 7, 9],
    [110, "Ds", "Darmstádtio", 281, "metal", 7, 10],
    [111, "Rg", "Roentgênio", 280, "metal", 7, 11],
    [112, "Cn", "Copernício", 285, "metal", 7, 12],
    [113, "Nh", "Nihônio", 284, "metal", 7, 13],
    [114, "Fl", "Fleróvio", 289, "metal", 7, 14],
    [115, "Mc", "Moscóvio", 288, "metal", 7, 15],
    [116, "Lv", "Livermório", 293, "metal", 7, 16],
    [117, "Ts", "Tenesso", 294, "ametal", 7, 17],
    [118, "Og", "Oganessônio", 294, "ametal", 7, 18],
];

let massFormat = 'decimal';
let massPrecision = 1;
function formatMass(mass) {
    if (massFormat === 'rounded') return Math.round(mass).toString();
    return mass.toFixed(massPrecision);
}

function buildTable() {
    const table = document.getElementById('periodic-table');
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
                const cell = makeCell(grid[key]);
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
            const cell = makeCell(el);
            cell.style.gridRow = `${gridRow}`;
            cell.style.gridColumn = `${i + 4}`;
            table.appendChild(cell);
        });
    });
}

function makeCell(el) {
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
    <span class="mass">${formatMass(mass)}</span>
    <span class="sym">${sym}</span>
    <span class="name">${name}</span>
    `;

    div.addEventListener('mouseenter', () => updateHighlight(div));
    return div;
}

function updateHighlight(cell) {
    const { num, sym, name, mass, cat } = cell.dataset;

    document.getElementById('hc-num').textContent = num;
    document.getElementById('hc-sym').textContent = sym;
    document.getElementById('hc-name').textContent = name;
    const hcMass = document.getElementById('hc-mass');
    if (hcMass) {
        hcMass.dataset.raw = mass;
        hcMass.textContent = formatMass(parseFloat(mass));
    }

    const card = document.getElementById('highlight-card');
    card.className = `element-card ${cat}`;

    const root = document.documentElement;
    const isAmetal = cat === 'ametal';
    const bg = getComputedStyle(root).getPropertyValue(isAmetal ? '--ametal' : '--metal').trim();
    const txt = getComputedStyle(root).getPropertyValue(isAmetal ? '--ametal-text' : '--metal-text').trim();
    card.style.background = bg;
    card.style.color = txt;
}

function updateColor(type, value) {
    const root = document.documentElement;

    switch (type) {
        case 'ametal-bg':
            root.style.setProperty('--ametal', value);
            document.getElementById('leg-ametal').style.background = value;
            document.querySelectorAll('.el.ametal').forEach(e => e.style.background = value);
            break;

        case 'metal-bg':
            root.style.setProperty('--metal', value);
            document.getElementById('leg-metal').style.background = value;
            document.querySelectorAll('.el.metal').forEach(e => e.style.background = value);
            break;

        case 'ametal-text':
            root.style.setProperty('--ametal-text', value);
            document.querySelectorAll('.el.ametal').forEach(e => e.style.color = value);
            break;

        case 'metal-text':
            root.style.setProperty('--metal-text', value);
            document.querySelectorAll('.el.metal').forEach(e => e.style.color = value);
            break;
    }
}

function updateMassFormat(fmt) {
    massFormat = fmt;
    const precisionControl = document.getElementById('mass-precision');
    if (precisionControl) precisionControl.disabled = massFormat === 'rounded';

    document.querySelectorAll('.el').forEach(cell => {
        const massSpan = cell.querySelector('.mass');
        if (massSpan) massSpan.textContent = formatMass(parseFloat(cell.dataset.mass));
    });

    const hcMass = document.getElementById('hc-mass');
    if (hcMass && hcMass.textContent) {
        const currentMassRaw = parseFloat(hcMass.dataset?.raw ?? hcMass.textContent);
        if (!isNaN(currentMassRaw)) hcMass.textContent = formatMass(currentMassRaw);
    }
}

function updateMassPrecision(value) {
    const precision = parseInt(value, 10);
    if (!isNaN(precision) && precision >= 1 && precision <= 3) {
        massPrecision = precision;
        document.querySelectorAll('.el').forEach(cell => {
            const massSpan = cell.querySelector('.mass');
            if (massSpan) massSpan.textContent = formatMass(parseFloat(cell.dataset.mass));
        });

        const hcMass = document.getElementById('hc-mass');
        if (hcMass && hcMass.textContent) {
            const currentMassRaw = parseFloat(hcMass.dataset?.raw ?? hcMass.textContent);
            if (!isNaN(currentMassRaw)) hcMass.textContent = formatMass(currentMassRaw);
        }
    }
}

async function exportPDF() {
    const toast = document.getElementById('toast');
    toast.textContent = '⏳ Gerando PDF...';
    toast.classList.add('show');

    try {
        const tableEl = document.getElementById('table-export');

        const canvas = await html2canvas(tableEl, {
            backgroundColor: '#0a0a0f',
            scale: 1.5,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a3' });
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();

        const ratio = canvas.width / canvas.height;
        let imgW = pdfW - 20;
        let imgH = imgW / ratio;
        if (imgH > pdfH - 20) { imgH = pdfH - 20; imgW = imgH * ratio; }

        pdf.setFillColor(10, 10, 15);
        pdf.rect(0, 0, pdfW, pdfH, 'F');
        pdf.addImage(imgData, 'PNG', (pdfW - imgW) / 2, (pdfH - imgH) / 2, imgW, imgH);
        pdf.save('tabela-periodica.pdf');

        toast.textContent = '✅ PDF salvo com sucesso!';
    } catch (e) {
        toast.textContent = '❌ Erro ao gerar PDF.';
        console.error(e);
    }

    setTimeout(() => toast.classList.remove('show'), 3000);
}

buildTable();

let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;

    document.getElementById('auth-title').textContent =
        isLogin ? 'Entrar' : 'Cadastrar';

    document.getElementById('auth-btn').textContent =
        isLogin ? 'Entrar' : 'Cadastrar';

    document.getElementById('switch-text').textContent =
        isLogin ? 'Não tem conta?' : 'Já possui conta?';

    document.getElementById('switch-btn').textContent =
        isLogin ? 'Cadastrar' : 'Entrar';

    document.getElementById('auth-message').textContent = '';
}

function handleAuth() {

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    const msg = document.getElementById('auth-message');

    if (!user || !pass) {
        msg.textContent = 'Preencha todos os campos.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {

        const found = users.find(
            u => u.user === user && u.pass === pass
        );

        if (found) {
            localStorage.setItem('loggedUser', user);

            document.getElementById('auth-screen').style.display = 'none';
        } else {
            msg.textContent = 'Usuário ou senha incorretos.';
        }

    } else {

        const exists = users.find(u => u.user === user);

        if (exists) {
            msg.textContent = 'Usuário já existe.';
            return;
        }

        users.push({
            user,
            pass
        });

        localStorage.setItem('users', JSON.stringify(users));

        msg.style.color = '#7bff95';
        msg.textContent = 'Conta criada com sucesso!';

        toggleMode();
    }
}

function logout() {
    localStorage.removeItem('loggedUser');
    location.reload();
}

window.addEventListener('load', () => {

    const logged = localStorage.getItem('loggedUser');

    if (logged) {
        document.getElementById('auth-screen').style.display = 'none';
    }
});
