'use strict';
const symbols = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const names = 'Hidrogênio Hélio Lítio Berílio Boro Carbono Nitrogênio Oxigênio Flúor Neônio Sódio Magnésio Alumínio Silício Fósforo Enxofre Cloro Argônio Potássio Cálcio Escândio Titânio Vanádio Cromo Manganês Ferro Cobalto Níquel Cobre Zinco Gálio Germânio Arsênio Selênio Bromo Criptônio Rubídio Estrôncio Ítrio Zircônio Nióbio Molibdênio Tecnécio Rutênio Ródio Paládio Prata Cádmio Índio Estanho Antimônio Telúrio Iodo Xenônio Césio Bário Lantânio Cério Praseodímio Neodímio Promécio Samário Európio Gadolínio Térbio Disprósio Hólmio Érbio Túlio Itérbio Lutécio Háfnio Tântalo Tungstênio Rênio Ósmio Irídio Platina Ouro Mercúrio Tálio Chumbo Bismuto Polônio Astato Radônio Frâncio Rádio Actínio Tório Protactínio Urânio Netúnio Plutônio Amerício Cúrio Berquélio Califórnio Einstênio Férmio Mendelévio Nobélio Laurêncio Rutherfórdio Dúbnio Seabórgio Bóhrio Hássio Meitnério Darmstádtio Roentgênio Copernício Nihônio Fleróvio Moscóvio Livermório Tenessino Oganessônio'.split(' ');
const nonmetals=new Set([1,6,7,8,9,15,16,17,34,35,53]);
const others=new Set([2,5,10,14,18,32,33,36,51,52,54,84,85,86,117,118]);
const positions=[];
for(let n=1;n<=118;n++){
 let row,col;
 if(n<=2){row=1;col=n===1?1:18;}
 else if(n<=10){row=2;col=n<=4?n-2:n+8;}
 else if(n<=18){row=3;col=n<=12?n-10:n;}
 else if(n<=36){row=4;col=n-18;}
 else if(n<=54){row=5;col=n-36;}
 else if(n<=56){row=6;col=n-54;}
 else if(n<=71){row=9;col=n-53;}
 else if(n<=86){row=6;col=n-68;}
 else if(n<=88){row=7;col=n-86;}
 else if(n<=103){row=10;col=n-85;}
 else {row=7;col=n-100;}
 positions.push({n,symbol:symbols[n-1],name:names[n-1],row,col,group:nonmetals.has(n)?'nonmetal':others.has(n)?'other':'metal'});
}
// Find the first main-table element in each group, shared by screen and export layouts.
const groupStarts = Array.from({ length: 18 }, (_, index) =>
  positions.find(element => element.col === index + 1 && element.row <= 7));
// Shared state: the same values drive the table, spotlight and downloads.
const table = document.querySelector('#periodic-table');
const decimalPlaces = document.querySelector('#decimal-places');
const showMass = document.querySelector('#show-mass');
const namesToggle = document.querySelector('#names');
const colorIds = ['nonmetal', 'metal', 'nonmetal-ink', 'metal-ink'];
const defaultColors = ['#947100', '#6024a3', '#ffffff', '#ffffff'];
let selectedElement = positions[11];

function massMode() {
  return document.querySelector('input[name="mass-mode"]:checked').value;
}
function formatMass(element) {
  if (!showMass.checked) return '';
  const source = atomicMasses[element.n - 1];
  // Isotopes have a mass number, not a decimal standard atomic weight.
  if (source.isotope) return '[' + Number(source.decimal.replace(',', '.')) + ']';
  // Round integer thousandths to avoid binary floating-point ties (24.305 → 24.31).
  if (massMode() === 'rounded') return String(Math.round(Number(source.decimal.replace(',', '.'))));
  const places = Number(decimalPlaces.value);
  const thousandths = Number(source.decimal.replace(',', ''));
  const rounded = Math.round(thousandths / 10 ** (3 - places));
  return (rounded / 10 ** places).toFixed(places).replace('.', ',');
}
function elementDescription(element) {
  const mass = formatMass(element);
  return `${element.name}, ${element.symbol}, número atômico ${element.n}${mass ? ', massa atômica ' + mass : ''}`;
}
function cellContent(element) {
  return `<span class="number">${element.n}</span><span class="mass">${formatMass(element)}</span><b>${element.symbol}</b><span class="name">${element.name}</span>`;
}
function updateSpotlight() {
  const spotlight = document.querySelector('#spotlight-element');
  spotlight.innerHTML = cellContent(selectedElement);
  spotlight.className = 'spotlight-element ' + selectedElement.group;
  spotlight.classList.toggle('hide-names', !namesToggle.checked);
  spotlight.setAttribute('aria-label', elementDescription(selectedElement));
  requestAnimationFrame(drawSpotlightAnnotations);
  document.querySelector('#element-detail').textContent = elementDescription(selectedElement);
}
function refreshTable() {
  table.querySelectorAll('.cell').forEach((button, index) => {
    const element = positions[index];
    button.innerHTML = cellContent(element);
    button.setAttribute('aria-label', elementDescription(element));
    button.setAttribute('aria-pressed', String(element === selectedElement));
  });
  table.classList.toggle('hide-names', !namesToggle.checked);
  decimalPlaces.disabled = massMode() === 'rounded' || !showMass.checked;
  updateSpotlight();
}
for (const element of positions) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'cell ' + element.group;
  button.style.gridColumn = element.col + 1;
  button.style.gridRow = element.row + 1;
  button.addEventListener('click', () => { selectedElement = element; refreshTable(); });
  table.append(button);
}
function addTableLabel(text, row, column, className = 'table-axis') {
  const label = document.createElement('span');
  label.className = className;
  label.textContent = text;
  label.style.gridRow = row;
  label.style.gridColumn = column;
  table.append(label);
}
groupStarts.forEach((element, index) => {
  addTableLabel(index + 1, element.row + 1, element.col + 1, 'table-axis group-axis');
});
for (let period = 1; period <= 7; period++) addTableLabel(period, period + 1, 1);
addTableLabel('6*', 10, 1);
addTableLabel('7*', 11, 1);
const seriesLinks = [
  { start: 57, row: 6, label: '57–71', name: 'lantanídeos' },
  { start: 89, row: 7, label: '89–103', name: 'actinídeos' }
];
seriesLinks.forEach(series => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'series-label';
  button.dataset.series = series.start;
  button.textContent = series.label;
  button.style.gridRow = series.row + 1;
  button.style.gridColumn = 4;
  button.setAttribute('aria-label', `Ver ${series.name}, elementos ${series.label}`);
  button.addEventListener('click', () => {
    const target = table.querySelectorAll('.cell')[series.start - 1];
    selectedElement = positions[series.start - 1];
    refreshTable();
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
    target.focus({ preventScroll: true });
  });
  table.append(button);
});
addTableLabel('Lantanídeos e actinídeos', 9, '2 / 20', 'series-heading');

// Route through the empty space beside group 3, never through element cells.
function seriesConnectionPath(source, target, index) {
  if (index === 0) {
    const corridor = (source.right + target.left) / 2;
    return `M ${source.right} ${(source.top + source.bottom) / 2} H ${corridor} V ${target.top - 14} H ${(target.left + target.right) / 2} V ${target.top - 4}`;
  }
  return `M ${(source.left + source.right) / 2} ${source.bottom} V ${(target.top + target.bottom) / 2} H ${target.left - 4}`;
}
const seriesOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
seriesOverlay.classList.add('series-connections');
seriesOverlay.setAttribute('aria-hidden', 'true');
table.append(seriesOverlay);
function drawSeriesConnections() {
  const bounds = table.getBoundingClientRect();
  const localRect = element => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left - bounds.left, right: rect.right - bounds.left, top: rect.top - bounds.top, bottom: rect.bottom - bounds.top };
  };
  seriesOverlay.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  seriesOverlay.innerHTML = '<defs><marker id="series-arrow-screen" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6" fill="#9163ce"/></marker></defs>' + seriesLinks.map((series, index) => {
    const source = localRect(table.querySelector(`[data-series="${series.start}"]`));
    const target = localRect(table.querySelectorAll('.cell')[series.start - 1]);
    return `<path data-series-arrow="${series.start}" d="${seriesConnectionPath(source, target, index)}" fill="none" stroke="#9163ce" stroke-width="1.5" stroke-linejoin="round" marker-end="url(#series-arrow-screen)"/>`;
  }).join('');
}
function drawSpotlightAnnotations() {
  const diagram = document.querySelector('.spotlight-diagram');
  const card = document.querySelector('#spotlight-element');
  const bounds = diagram.getBoundingClientRect();
  const cardBounds = card.getBoundingClientRect();
  const svg = diagram.querySelector('svg');
  const paths = [];
  diagram.querySelectorAll('[data-field]').forEach(label => {
    const field = label.dataset.field;
    const target = card.querySelector(field === 'symbol' ? 'b' : '.' + field);
    label.hidden = (field === 'mass' && !showMass.checked) || (field === 'name' && !namesToggle.checked);
    if (label.hidden) return;
    const rect = target.getBoundingClientRect();
    const y = (rect.top + rect.bottom) / 2 - bounds.top;
    const left = label.dataset.side === 'left';
    label.style.top = y + 'px';
    label.style.maxWidth = Math.max(35, (left ? cardBounds.left - bounds.left : bounds.right - cardBounds.right) - 12) + 'px';
    label.style.left = left ? 'auto' : cardBounds.right - bounds.left + 12 + 'px';
    label.style.right = left ? bounds.right - cardBounds.left + 12 + 'px' : 'auto';
    const labelBounds = label.getBoundingClientRect();
    const start = left ? labelBounds.right - bounds.left + 3 : labelBounds.left - bounds.left - 3;
    const end = left ? rect.left - bounds.left - 3 : rect.right - bounds.left + 3;
    paths.push(`<path data-annotation="${field}" d="M ${start} ${y} H ${end}" fill="none" stroke="#a981ff" stroke-width="1.3" marker-end="url(#spotlight-arrow)"/>`);
  });
  svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  svg.innerHTML = '<defs><marker id="spotlight-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3L0 6" fill="#a981ff"/></marker></defs>' + paths.join('');
}
const layoutObserver = new ResizeObserver(() => {
  requestAnimationFrame(() => { drawSeriesConnections(); drawSpotlightAnnotations(); });
});
layoutObserver.observe(table);
layoutObserver.observe(document.querySelector('.spotlight-diagram'));
for (const control of [decimalPlaces, showMass, namesToggle, ...document.querySelectorAll('[name="mass-mode"]')]) {
  control.addEventListener('change', refreshTable);
}

function luminance(hex) {
  const rgb = hex.match(/[0-9a-f]{2}/gi).map(channel => parseInt(channel, 16) / 255);
  const linear = rgb.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}
function contrastRatio(background, foreground) {
  const values = [luminance(background), luminance(foreground)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}
function updateColors() {
  for (const id of colorIds) {
    const value = document.getElementById(id).value;
    document.documentElement.style.setProperty('--' + id, value);
    const hex = document.querySelector(`[data-color-for="${id}"]`);
    if (hex && document.activeElement !== hex) hex.value = value.toUpperCase();
    if (hex && normalizedHex(hex.value) === value) hex.removeAttribute('aria-invalid');
  }
  document.querySelectorAll('[data-palette]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.palette.split(',').every((color, index) => color === document.getElementById(colorIds[index]).value)));
  });
  document.querySelector('#hex-error').hidden = !document.querySelector('.hex-input[aria-invalid="true"]');
  const warnings = ['metal', 'nonmetal'].filter(group =>
    contrastRatio(document.getElementById(group).value, document.getElementById(group + '-ink').value) < 4.5);
  document.querySelector('#contrast-status').textContent = warnings.length
    ? 'Contraste baixo: ajuste o fundo ou o texto para facilitar a leitura.' : '';
}
colorIds.forEach(id => document.getElementById(id).addEventListener('input', updateColors));
function normalizedHex(value) {
  let hex = value.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split('').map(character => character + character).join('');
  return /^[0-9a-f]{6}$/i.test(hex) ? '#' + hex.toLowerCase() : null;
}
document.querySelectorAll('.hex-input').forEach(input => {
  input.addEventListener('input', () => {
    const color = normalizedHex(input.value);
    input.removeAttribute('aria-invalid');
    document.querySelector('#hex-error').hidden = !document.querySelector('.hex-input[aria-invalid="true"]');
    if (color) {
      document.getElementById(input.dataset.colorFor).value = color;
      updateColors();
    }
  });
  input.addEventListener('blur', () => {
    const color = normalizedHex(input.value);
    if (color) {
      input.value = color.toUpperCase();
      input.removeAttribute('aria-invalid');
    } else {
      input.setAttribute('aria-invalid', 'true');
    }
    document.querySelector('#hex-error').hidden = !document.querySelector('.hex-input[aria-invalid="true"]');
  });
});
document.querySelectorAll('[data-palette]').forEach(button => button.addEventListener('click', () => {
  button.dataset.palette.split(',').forEach((color, index) => {
    document.getElementById(colorIds[index]).value = color;
  });
  updateColors();
}));

function selectedFormat() {
  return document.querySelector('[name="export-format"]:checked').value;
}
function updateQuality() {
  const raster = ['png', 'jpg'].includes(selectedFormat());
  document.querySelector('#quality').disabled = !raster;
  document.querySelector('#export-status').textContent = '';
}
document.querySelectorAll('[name="export-format"]').forEach(input => input.addEventListener('change', updateQuality));
document.querySelector('#reset').addEventListener('click', () => {
  colorIds.forEach((id, index) => document.getElementById(id).value = defaultColors[index]);
  document.querySelectorAll('.hex-input').forEach(input => input.removeAttribute('aria-invalid'));
  document.querySelector('[name="mass-mode"][value="decimal"]').checked = true;
  document.querySelector('[name="export-format"][value="pdf"]').checked = true;
  decimalPlaces.value = '1';
  showMass.checked = true;
  namesToggle.checked = true;
  selectedElement = positions[11];
  document.querySelector('#filename').value = 'tabela-periodica';
  document.querySelector('#quality').value = '1';
  updateColors();
  refreshTable();
  updateQuality();
});
updateColors();
refreshTable();
updateQuality();

function escapeXml(text) {
  return text.replace(/[<>&"']/g, character => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  }[character]));
}
function fileName() {
  // Keep the selected name local and strip characters invalid in file systems.
  return document.querySelector('#filename').value.trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-').replace(/\.+$/, '').slice(0, 100) || 'tabela-periodica';
}
function elementColors(element) {
  const group = element.group === 'metal' ? 'metal' : 'nonmetal';
  return {
    background: document.getElementById(group).value,
    foreground: document.getElementById(group + '-ink').value
  };
}
// Embed the original logo so exported SVGs, raster images and PDFs are self-contained.
let exportLogoPromise;
function loadExportLogo() {
  if (!exportLogoPromise) {
    exportLogoPromise = fetch(new URL('assets/elementopia-logo-colorida.png', document.baseURI))
      .then(response => {
        if (!response.ok) throw new Error('Logo indisponível');
        return response.arrayBuffer();
      })
      .then(bytes => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(new Blob([bytes], { type: 'image/png' }));
      }))
      .catch(error => { exportLogoPromise = null; throw error; });
  }
  return exportLogoPromise;
}
function createSvg(logoDataUrl) {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="1000" viewBox="0 0 1560 1000"><rect width="1560" height="1000" fill="white"/><g font-family="Arial, sans-serif" fill="#352844">';
  svg += `<image x="45" y="15" width="220" height="66" preserveAspectRatio="xMinYMid meet" href="${logoDataUrl}"/>`;
  groupStarts.forEach((element, index) => {
    svg += `<text x="${83.5 + (element.col - 1) * 82}" y="${116 + (element.row - 1) * 76}" text-anchor="middle" font-size="11">${index + 1}</text>`;
  });
  for (const element of positions) {
    const x = 45 + (element.col - 1) * 82;
    const y = 125 + (element.row - 1) * 76;
    const colors = elementColors(element);
    svg += `<g transform="translate(${x} ${y})" fill="${colors.foreground}"><rect width="77" height="71" rx="5" fill="${colors.background}"/><text x="6" y="15" font-size="13">${element.n}</text><text x="71" y="15" text-anchor="end" font-size="12">${escapeXml(formatMass(element))}</text><text x="38.5" y="46" text-anchor="middle" font-size="29" font-weight="bold">${element.symbol}</text>${namesToggle.checked ? `<text x="38.5" y="64" text-anchor="middle" font-size="11">${escapeXml(element.name)}</text>` : ''}</g>`;
  }
  svg += '<defs><marker id="series-arrow-export" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6" fill="#9163ce"/></marker></defs>';
  seriesLinks.forEach((series, index) => {
    const source = { left: 209, right: 286, top: 125 + (series.row - 1) * 76, bottom: 196 + (series.row - 1) * 76 };
    const element = positions[series.start - 1];
    const left = 45 + (element.col - 1) * 82;
    const top = 125 + (element.row - 1) * 76;
    const target = { left, right: left + 77, top, bottom: top + 71 };
    svg += `<rect x="209" y="${source.top}" width="77" height="71" rx="5" fill="#faf6ff" stroke="#d0bcfc" stroke-dasharray="3 2"/><text x="222" y="${160 + (series.row - 1) * 76}" font-size="11">${series.label}</text><path data-series-arrow="${series.start}" d="${seriesConnectionPath(source, target, index)}" fill="none" stroke="#9163ce" stroke-width="1.5" stroke-linejoin="round" marker-end="url(#series-arrow-export)"/>`;
  });
  for (let period = 1; period <= 7; period++) {
    svg += `<text x="20" y="${165 + (period - 1) * 76}" font-size="11">${period}</text>`;
  }
  svg += '<text x="20" y="773" font-size="11">6*</text><text x="20" y="849" font-size="11">7*</text><text x="45" y="719" font-size="11">Lantanídeos e actinídeos</text>';
  ['metal', 'nonmetal'].forEach((group, index) => {
    const x = 45 + index * 170;
    svg += `<rect x="${x}" y="925" width="14" height="14" rx="3" fill="${document.getElementById(group).value}"/><text x="${x + 23}" y="937" font-size="12">${index === 0 ? 'Metais' : 'Ametais e demais grupos'}</text>`;
  });
  return svg + '<text x="1515" y="968" text-anchor="end" font-size="12">Feita por você.</text></g></svg>';
}
function saveBlob(blob, extension) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName() + '.' + extension;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
// Generate a one-page PDF directly: browser print headers never enter the document.
function createPdfBlob(jpegBytes, imageWidth, imageHeight) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  function append(value) {
    const bytes = typeof value === 'string' ? encoder.encode(value) : value;
    chunks.push(bytes);
    length += bytes.length;
  }
  function object(number, content) {
    offsets[number] = length;
    append(`${number} 0 obj\n${content}\nendobj\n`);
  }
  append('%PDF-1.4\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Table 4 0 R >> >> /Contents 5 0 R >>');
  offsets[4] = length;
  append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  append(jpegBytes);
  append('\nendstream\nendobj\n');
  const width = 805.89;
  const height = width * imageHeight / imageWidth;
  const y = (595.28 - height) / 2;
  const content = `q\n${width} 0 0 ${height.toFixed(3)} 18 ${y.toFixed(3)} cm\n/Table Do\nQ\n`;
  object(5, `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream`);
  const xrefOffset = length;
  append('xref\n0 6\n0000000000 65535 f \n');
  for (let number = 1; number <= 5; number++) {
    append(String(offsets[number]).padStart(10, '0') + ' 00000 n \n');
  }
  append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  return new Blob(chunks, { type: 'application/pdf' });
}
document.querySelector('#download').addEventListener('click', async () => {
  const status = document.querySelector('#export-status');
  const button = document.querySelector('#download');
  const format = selectedFormat();
  const scale = Number(document.querySelector('#quality').value);
  button.disabled = true;
  status.textContent = 'Préparando sua tabela…';
  try {
    const logoDataUrl = await loadExportLogo();
    const svg = createSvg(logoDataUrl);
    if (format === 'svg') {
      saveBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), 'svg');
      status.textContent = 'Tabela SVG preparada!';
    } else {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
      const image = new Image();
      try {
        await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = url; });
        const canvas = document.createElement('canvas');
        const renderScale = format === 'pdf' ? 2 : scale;
        canvas.width = 1560 * renderScale;
        canvas.height = 1000 * renderScale;
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const mime = format === 'png' ? 'image/png' : 'image/jpeg';
        const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, .98));
        if (!blob) throw new Error('Exportação indisponível');
        if (format === 'pdf') {
          const jpegBytes = new Uint8Array(await blob.arrayBuffer());
          saveBlob(createPdfBlob(jpegBytes, canvas.width, canvas.height), 'pdf');
        } else {
          saveBlob(blob, format);
        }
        status.textContent = 'Sua tabela está pronta!';
      } finally { URL.revokeObjectURL(url); }
    }
  } catch (error) {
    status.textContent = 'Não foi possível preparar o arquivo. Tente novamente.';
  } finally { button.disabled = false; }
});

// The native dialog handles focus trapping; closing restores the version button.
document.querySelectorAll('.studio-navigation a').forEach(link => link.addEventListener('click', () => {
  document.querySelectorAll('.studio-navigation a').forEach(item => item.removeAttribute('aria-current'));
  link.setAttribute('aria-current', 'location');
}));
function connectDialog(dialog, trigger, closeButton, onOpen = () => {}) {
  let closeTimer;
  function close() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
    } else {
      dialog.classList.add('is-closing');
      closeTimer = setTimeout(() => dialog.close(), 160);
    }
  }
  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    onOpen();
    dialog.classList.remove('is-closing');
    dialog.showModal();
  });
  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
      .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (first && event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (last && !event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)) close();
  });
  dialog.addEventListener('close', () => {
    clearTimeout(closeTimer);
    dialog.classList.remove('is-closing');
    trigger.focus({ preventScroll: true });
  });
  return close;
}
connectDialog(document.querySelector('#update-log'), document.querySelector('#open-updates'), document.querySelector('#close-updates'));
const tutorialSteps = [
  ['Conheça seu elemento', 'Clique em qualquer elemento da tabela. No card em destaque, as setas mostram exatamente o número atômico, o símbolo, o nome e a massa. Você pode ocultar os nomes e as massas quando preferir.'],
  ['Dê cor às suas ideias', 'Escolha uma paleta pronta ou altere fundo e texto de cada grupo. Clique na amostra para abrir o seletor ou digite um código HEX, como #6631DB. O aviso de contraste ajuda a manter sua tabela legível.'],
  ['Escolha como ver as massas', 'Use Decimal para escolher uma, duas ou três casas, ou Arredondada para números inteiros. Os números entre colchetes identificam isótopos e mantêm esse formato. A escolha também vale para o arquivo baixado.'],
  ['Siga as setas das séries', 'Os intervalos 57–71 e 89–103 levam às duas linhas inferiores: lantanídeos e actinídeos. Siga as setas ou clique no intervalo para ir até a série. Lutécio e Laurêncio terminam alinhados à coluna 18.'],
  ['Sua tabela pronta para levar', 'Escolha PDF, PNG, JPEG ou SVG, dê um nome ao arquivo e clique em Baixar tabela. PNG e JPEG oferecem três qualidades. O PDF é baixado diretamente, sem data, hora ou cabeçalhos do navegador.']
];
let tutorialStep = 0;
const previousStep = document.querySelector('#tutorial-prev');
const nextStep = document.querySelector('#tutorial-next');
function renderTutorial() {
  const previousHadFocus = document.activeElement === previousStep;
  document.querySelector('#tutorial-title').textContent = tutorialSteps[tutorialStep][0];
  document.querySelector('#tutorial-description').textContent = tutorialSteps[tutorialStep][1];
  document.querySelector('#tutorial-counter').textContent = `Passo ${tutorialStep + 1} de ${tutorialSteps.length}`;
  document.querySelectorAll('.tutorial-progress span').forEach((dot, index) => dot.classList.toggle('active', index <= tutorialStep));
  previousStep.disabled = tutorialStep === 0;
  nextStep.textContent = tutorialStep === tutorialSteps.length - 1 ? 'Concluir ✓' : 'Próximo →';
  if (previousStep.disabled && previousHadFocus) nextStep.focus();
}
const closeTutorial = connectDialog(document.querySelector('#tutorial-dialog'), document.querySelector('#open-tutorial'), document.querySelector('#close-tutorial'), () => {
  tutorialStep = 0;
  renderTutorial();
});
previousStep.addEventListener('click', () => { tutorialStep = Math.max(0, tutorialStep - 1); renderTutorial(); });
nextStep.addEventListener('click', () => {
  if (tutorialStep === tutorialSteps.length - 1) closeTutorial();
  else { tutorialStep++; renderTutorial(); }
});
