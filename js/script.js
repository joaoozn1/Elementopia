// Estado de exibição da massa atômica (compartilhado com table-builder.js)
let massFormat = 'decimal';
let massPrecision = 1;

// Monta a tabela periódica do app usando os dados e o motor compartilhados
// (js/elements-data.js e js/table-builder.js)
function renderTable() {
    buildPeriodicTable({
        containerId: 'periodic-table',
        elements: ELEMENTS,
        massFormat,
        massPrecision,
        onHover: updateHighlight
    });
}

function updateHighlight(data) {
    const { num, sym, name, mass, cat } = data;

    document.getElementById('hc-num').textContent = num;
    document.getElementById('hc-sym').textContent = sym;
    document.getElementById('hc-name').textContent = name;
    const hcMass = document.getElementById('hc-mass');
    if (hcMass) {
        hcMass.dataset.raw = mass;
        hcMass.textContent = formatMass(parseFloat(mass), massFormat, massPrecision);
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

    refreshTableMass('periodic-table', massFormat, massPrecision);

    const hcMass = document.getElementById('hc-mass');
    if (hcMass && hcMass.textContent) {
        const currentMassRaw = parseFloat(hcMass.dataset?.raw ?? hcMass.textContent);
        if (!isNaN(currentMassRaw)) hcMass.textContent = formatMass(currentMassRaw, massFormat, massPrecision);
    }
}

function updateMassPrecision(value) {
    const precision = parseInt(value, 10);
    if (!isNaN(precision) && precision >= 1 && precision <= 3) {
        massPrecision = precision;
        refreshTableMass('periodic-table', massFormat, massPrecision);

        const hcMass = document.getElementById('hc-mass');
        if (hcMass && hcMass.textContent) {
            const currentMassRaw = parseFloat(hcMass.dataset?.raw ?? hcMass.textContent);
            if (!isNaN(currentMassRaw)) hcMass.textContent = formatMass(currentMassRaw, massFormat, massPrecision);
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

renderTable();

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