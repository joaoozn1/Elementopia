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

    // .element-card.metal / .element-card.ametal já resolvem a cor via CSS (var(--metal)/var(--ametal)),
    // então só trocar a classe é suficiente — nada de getComputedStyle ou estilo inline aqui.
    document.getElementById('highlight-card').className = `element-card ${cat}`;
}

// As células (.el.metal/.el.ametal) e a legenda (.leg-metal/.leg-ametal) já
// resolvem sua cor via var(--metal)/var(--ametal) no CSS — então mudar a
// variável no :root já atualiza todos os elementos automaticamente, sem
// precisar percorrer e reescrever o estilo de cada célula manualmente.
function updateColor(type, value) {
    const root = document.documentElement;

    switch (type) {
        case 'ametal-bg':
            root.style.setProperty('--ametal', value);
            break;
        case 'metal-bg':
            root.style.setProperty('--metal', value);
            break;
        case 'ametal-text':
            root.style.setProperty('--ametal-text', value);
            break;
        case 'metal-text':
            root.style.setProperty('--metal-text', value);
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

// ---------- Deck de exportação (seletor de formato) ----------
// PDF já é funcional (exportPDF, acima). PNG e JPEG ainda são apenas a
// interface — os botões existem e podem ser selecionados, mas a exportação
// nesses formatos ainda não foi implementada (fica para uma próxima versão).
let exportFormat = 'pdf';

function updateExportFormat(value) {
    exportFormat = value;

    // O campo de qualidade só faz sentido para imagens raster (PNG/JPEG);
    // para PDF ele fica desabilitado, já pronto para quando PNG/JPEG
    // forem implementados.
    const qualitySelect = document.getElementById('export-quality');
    if (qualitySelect) qualitySelect.disabled = (value === 'pdf');
}

function handleDownload() {
    if (exportFormat === 'pdf') {
        exportPDF();
        return;
    }

    // PNG/JPEG: ainda não programado, apenas avisa que está a caminho.
    const toast = document.getElementById('toast');
    const label = exportFormat === 'png' ? 'PNG' : 'JPEG';
    toast.textContent = `🛠 Exportação em ${label} chega em breve.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Painel "Como usar" ----------
function toggleDeckHelp() {
    const help = document.getElementById('deck-help');
    const btn = document.getElementById('deck-help-toggle');
    if (!help || !btn) return;

    const isHidden = help.hasAttribute('hidden');
    if (isHidden) {
        help.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        help.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
    }
}

renderTable();