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

    const card = document.getElementById('demo-highlight-card');
    card.className = `element-card ${cat}`;

    const root = document.documentElement;
    const isAmetal = cat === 'ametal';
    const bg = getComputedStyle(root).getPropertyValue(isAmetal ? '--ametal' : '--metal').trim();
    const txt = getComputedStyle(root).getPropertyValue(isAmetal ? '--ametal-text' : '--metal-text').trim();
    card.style.background = bg;
    card.style.color = txt;
}

function updateDemoColor(type, value) {
    const root = document.documentElement;

    switch (type) {
        case 'ametal-bg':
            root.style.setProperty('--ametal', value);
            const legAmetal = document.getElementById('demo-leg-ametal');
            if (legAmetal) legAmetal.style.background = value;
            document.querySelectorAll('#demo-periodic-table .el.ametal').forEach(e => e.style.background = value);
            break;

        case 'metal-bg':
            root.style.setProperty('--metal', value);
            const legMetal = document.getElementById('demo-leg-metal');
            if (legMetal) legMetal.style.background = value;
            document.querySelectorAll('#demo-periodic-table .el.metal').forEach(e => e.style.background = value);
            break;

        case 'ametal-text':
            root.style.setProperty('--ametal-text', value);
            document.querySelectorAll('#demo-periodic-table .el.ametal').forEach(e => e.style.color = value);
            break;

        case 'metal-text':
            root.style.setProperty('--metal-text', value);
            document.querySelectorAll('#demo-periodic-table .el.metal').forEach(e => e.style.color = value);
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
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
})();