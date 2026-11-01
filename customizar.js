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
 else if(n<=71){row=9;col=n-54;}
 else if(n<=86){row=6;col=n-68;}
 else if(n<=88){row=7;col=n-86;}
 else if(n<=103){row=10;col=n-86;}
 else {row=7;col=n-100;}
 positions.push({n,symbol:symbols[n-1],name:names[n-1],row,col,group:nonmetals.has(n)?'nonmetal':others.has(n)?'other':'metal'});
}
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
  document.querySelector('.spotlight-mass-label').hidden = !showMass.checked;
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
for (let group = 1; group <= 18; group++) addTableLabel(group, 1, group + 1);
for (let period = 1; period <= 7; period++) addTableLabel(period, period + 1, 1);
addTableLabel('6*', 10, 1);
addTableLabel('7*', 11, 1);
addTableLabel('57–71', 7, 4, 'series-label');
addTableLabel('89–103', 8, 4, 'series-label');
addTableLabel('Lantanídeos e actinídeos', 9, '2 / 20', 'series-heading');
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
    document.documentElement.style.setProperty('--' + id, document.getElementById(id).value);
  }
  const warnings = ['metal', 'nonmetal'].filter(group =>
    contrastRatio(document.getElementById(group).value, document.getElementById(group + '-ink').value) < 4.5);
  document.querySelector('#contrast-status').textContent = warnings.length
    ? 'Contraste baixo: ajuste o fundo ou o texto para facilitar a leitura.' : '';
}
colorIds.forEach(id => document.getElementById(id).addEventListener('input', updateColors));

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
  svg += `<image x="45" y="15" width="220" height="66" preserveAspectRatio="xMinYMid meet" href="${logoDataUrl}"/><text x="45" y="98" font-size="14">Tabela periódica · Química com o seu jeito</text>`;
  for (let group = 1; group <= 18; group++) {
    svg += `<text x="${83.5 + (group - 1) * 82}" y="112" text-anchor="middle" font-size="11">${group}</text>`;
  }
  for (const element of positions) {
    const x = 45 + (element.col - 1) * 82;
    const y = 125 + (element.row - 1) * 76;
    const colors = elementColors(element);
    svg += `<g transform="translate(${x} ${y})" fill="${colors.foreground}"><rect width="77" height="71" rx="5" fill="${colors.background}"/><text x="6" y="15" font-size="13">${element.n}</text><text x="71" y="15" text-anchor="end" font-size="12">${escapeXml(formatMass(element))}</text><text x="38.5" y="46" text-anchor="middle" font-size="29" font-weight="bold">${element.symbol}</text>${namesToggle.checked ? `<text x="38.5" y="64" text-anchor="middle" font-size="11">${escapeXml(element.name)}</text>` : ''}</g>`;
  }
  svg += '<text x="222" y="540" font-size="11">57–71</text><text x="222" y="616" font-size="11">89–103</text>';
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
const originalTitle = document.title;
window.addEventListener('afterprint', () => { document.title = originalTitle; });
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
        if (format === 'pdf') {
          document.querySelector('.print-table')?.remove();
          const printArea = document.createElement('div');
          printArea.className = 'print-table';
          printArea.style.display = 'none';
          printArea.append(image);
          document.body.append(printArea);
          document.title = fileName();
          try { window.print(); } finally { document.title = originalTitle; }
          status.textContent = 'Escolha “Salvar como PDF” na janela de impressão.';
        } else {
          const canvas = document.createElement('canvas');
          canvas.width = 1560 * scale;
          canvas.height = 1000 * scale;
          const context = canvas.getContext('2d');
          context.fillStyle = '#fff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, format === 'jpg' ? 'image/jpeg' : 'image/png', .95));
          if (!blob) throw new Error('Exportação indisponível');
          saveBlob(blob, format);
          status.textContent = 'Sua tabela está pronta!';
        }
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
const updateDialog = document.querySelector('#update-log');
const updateTrigger = document.querySelector('#open-updates');
let updateCloseTimer;
function closeUpdateLog() {
  if (!updateDialog.open || updateDialog.classList.contains('is-closing')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateDialog.close();
    return;
  }
  updateDialog.classList.add('is-closing');
  updateCloseTimer = setTimeout(() => updateDialog.close(), 160);
}
updateTrigger.addEventListener('click', () => {
  if (updateDialog.open) return;
  updateDialog.classList.remove('is-closing');
  updateDialog.showModal();
});
document.querySelector('#close-updates').addEventListener('click', closeUpdateLog);
updateDialog.addEventListener('cancel', event => { event.preventDefault(); closeUpdateLog(); });
updateDialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...updateDialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
    .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (first && event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (last && !event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
updateDialog.addEventListener('click', event => {
  const bounds = updateDialog.getBoundingClientRect();
  if (event.target === updateDialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) closeUpdateLog();
});
updateDialog.addEventListener('close', () => {
  clearTimeout(updateCloseTimer);
  updateDialog.classList.remove('is-closing');
  updateTrigger.focus({ preventScroll: true });
});
