// Elementopia — lógica da prévia interativa na landing page
// Usa os mesmos dados/motor do app (elements-data.js + table-builder.js), mas sem
// login e sem exportação em PDF — isso fica reservado para a plataforma completa (tabela.html).

const demoState = {
    massFormat: 'decimal',
    massPrecision: 1
};

function renderDemoTable() {
    buildPeriodicTable({
        containerId: 'demo-periodic-table',
        elements: ELEMENTS,
        massFormat: demoState.massFormat,
        massPrecision: demoState.massPrecision,
        onHover: updateDemoHighlight
    });
}

function updateDemoHighlight(data) {
    const { num, sym, name, mass, cat } = data;

    document.getElementById('demo-hc-num').textContent = num;
    document.getElementById('demo-hc-sym').textContent = sym;
    document.getElementById('demo-hc-name').textContent = name;

    const hcMass = document.getElementById('demo-hc-mass');
    if (hcMass) {
        hcMass.dataset.raw = mass;
        hcMass.textContent = formatMass(parseFloat(mass), demoState.massFormat, demoState.massPrecision);
    }

    // .element-card.metal / .element-card.ametal já resolvem a cor via CSS,
    // então só trocar a classe é suficiente.
    document.getElementById('demo-highlight-card').className = `element-card ${cat}`;
}

// .el.metal/.el.ametal e .leg-metal/.leg-ametal já resolvem sua cor via
// var(--metal)/var(--ametal) no CSS — só a variável precisa mudar.
function updateDemoColor(type, value) {
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

function updateDemoMassFormat(fmt) {
    demoState.massFormat = fmt;
    const precisionControl = document.getElementById('demo-mass-precision');
    if (precisionControl) precisionControl.disabled = fmt === 'rounded';

    refreshTableMass('demo-periodic-table', demoState.massFormat, demoState.massPrecision);

    const hcMass = document.getElementById('demo-hc-mass');
    if (hcMass && hcMass.dataset.raw) {
        hcMass.textContent = formatMass(parseFloat(hcMass.dataset.raw), demoState.massFormat, demoState.massPrecision);
    }
}

function updateDemoMassPrecision(value) {
    const precision = parseInt(value, 10);
    if (isNaN(precision) || precision < 1 || precision > 3) return;

    demoState.massPrecision = precision;
    refreshTableMass('demo-periodic-table', demoState.massFormat, demoState.massPrecision);

    const hcMass = document.getElementById('demo-hc-mass');
    if (hcMass && hcMass.dataset.raw) {
        hcMass.textContent = formatMass(parseFloat(hcMass.dataset.raw), demoState.massFormat, demoState.massPrecision);
    }
}

renderDemoTable();

// Scrollspy da navegação: destaca automaticamente o item correspondente
// à seção visível (Home, Recursos, Prévia, Parceria) com a pílula roxa.
(function initNavScrollspy() {
    const sectionIds = ['home', 'recursos', 'demo', 'parceria'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const links = Array.from(document.querySelectorAll('.l-nav-links a'));
    const linkByHash = {};
    links.forEach(link => {
        const hash = link.getAttribute('href').replace('#', '');
        linkByHash[hash] = link;
    });

    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    function setActive(id) {
        links.forEach(link => link.classList.remove('active'));
        if (linkByHash[id]) linkByHash[id].classList.add('active');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, {
        // Considera a seção "atual" quando ela cruza a faixa central da tela,
        // em vez de exigir que esteja 100% visível.
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
})();

// Scroll reveal: elementos com a classe .l-reveal entram suavemente (fade + subida)
// conforme aparecem na tela. Uma vez visível, permanece visível (não pisca ao rolar).
(function initScrollReveal() {
    const items = document.querySelectorAll('.l-reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => observer.observe(el));
})();