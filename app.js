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
const table=document.querySelector('#periodic-table');
for(const e of positions){
 const button=document.createElement('button');button.className='cell '+e.group;
 button.style.gridColumn=e.col;button.style.gridRow=e.row;
 button.setAttribute('aria-label',`${e.name}, ${e.symbol}, número atômico ${e.n}`);
 button.innerHTML=`<span class="number">${e.n}</span><b>${e.symbol}</b><span class="name">${e.name}</span>`;
 button.addEventListener('click',()=>{document.querySelector('#element-detail').textContent=`${e.symbol} · ${e.name} · Número atômico ${e.n} · ${e.group==='metal'?'Metal':e.group==='nonmetal'?'Ametal':'Outros grupos'}`;});table.append(button);
}
for(const [row,label] of [[6,'57–71'],[7,'89–103']]){const el=document.createElement('span');el.className='series-label';el.style.gridRow=row;el.style.gridColumn=3;el.textContent=label;table.append(el);}
const colorIds=['metal','nonmetal','other'];
function updateColors(){for(const id of colorIds)document.documentElement.style.setProperty('--'+id,document.getElementById(id).value);}
function selectPalette(button){button.dataset.colors.split(',').forEach((color,i)=>document.getElementById(colorIds[i]).value=color);document.querySelectorAll('.palette').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});updateColors();}
document.querySelectorAll('.palette').forEach(button=>button.addEventListener('click',()=>selectPalette(button)));
colorIds.forEach(id=>document.getElementById(id).addEventListener('input',()=>{updateColors();document.querySelectorAll('.palette').forEach(el=>{el.classList.remove('active');el.setAttribute('aria-pressed','false');});}));
const namesToggle=document.querySelector('#names');namesToggle.addEventListener('change',()=>table.classList.toggle('hide-names',!namesToggle.checked));
document.querySelector('#reset').addEventListener('click',()=>{selectPalette(document.querySelector('.palette'));namesToggle.checked=true;table.classList.remove('hide-names');document.querySelector('#element-detail').textContent='Selecione um elemento e conheça o essencial.';document.querySelector('#export-status').textContent='';});
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=document.querySelector('.header nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.header nav').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}));
document.querySelector('#year').textContent=new Date().getFullYear();
function escapeXml(text){return text.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));}
function createSvg(){
 const colors=Object.fromEntries(colorIds.map(id=>[id,document.getElementById(id).value]));
 let svg='<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="1000" viewBox="0 0 1560 1000"><rect width="1560" height="1000" fill="white"/><g font-family="Arial, sans-serif" fill="#352844"><text x="45" y="62" font-size="30" font-weight="bold">Elementopia</text><text x="45" y="95" font-size="15">Tabela periódica · Química com o seu jeito</text>';
 for(const e of positions){const x=45+(e.col-1)*82,y=125+(e.row-1)*76;svg+=`<g transform="translate(${x} ${y})"><rect width="77" height="71" rx="5" fill="${colors[e.group]}"/><text x="7" y="15" font-size="11">${e.n}</text><text x="38.5" y="43" text-anchor="middle" font-size="28" font-weight="bold">${e.symbol}</text>${namesToggle.checked?`<text x="38.5" y="61" text-anchor="middle" font-size="8">${escapeXml(e.name)}</text>`:''}</g>`;}
 svg+='<text x="222" y="540" font-size="11">57–71</text><text x="222" y="616" font-size="11">89–103</text>';
 colorIds.forEach((id,i)=>{const x=45+i*170;svg+=`<rect x="${x}" y="925" width="14" height="14" rx="3" fill="${colors[id]}"/><text x="${x+23}" y="937" font-size="12">${['Metais','Ametais','Outros grupos'][i]}</text>`;});return svg+'<text x="1515" y="968" text-anchor="end" font-size="12" fill="#80718d">Feita por você. Com Elementopia.</text></g></svg>';
}
function saveBlob(blob,extension){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='minha-tabela-elementopia.'+extension;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
document.querySelector('#download').addEventListener('click',async()=>{
 const status=document.querySelector('#export-status'),button=document.querySelector('#download'),format=document.querySelector('#format').value;
 button.disabled=true;status.textContent='Preparando sua tabela…';
 try{
  const svg=createSvg();
  if(format==='svg'){saveBlob(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),'svg');status.textContent='Tabela SVG preparada!';}
  else{
   const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));const img=new Image();
   try{await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});
    if(format==='pdf'){
     document.querySelector('.print-table')?.remove();const printArea=document.createElement('div');printArea.className='print-table';printArea.style.display='none';printArea.append(img);document.body.append(printArea);window.print();status.textContent='Escolha “Salvar como PDF” na janela de impressão.';
    }else{const canvas=document.createElement('canvas');canvas.width=3120;canvas.height=2000;const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(img,0,0,3120,2000);const blob=await new Promise(resolve=>canvas.toBlob(resolve,format==='jpg'?'image/jpeg':'image/png',.95));if(!blob)throw new Error('Exportação indisponível');saveBlob(blob,format);status.textContent='Sua tabela está pronta!';}
   }finally{URL.revokeObjectURL(url);}
  }
 }catch(error){status.textContent='Não foi possível exportar. Tente o formato SVG.';}finally{button.disabled=false;}
});
