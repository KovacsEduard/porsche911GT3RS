const $=s=>document.querySelector(s),R=document.documentElement;
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function theme(t){R.dataset.theme=t;$('#th').textContent=t=='dark'?'☀ Világos':'☾ Sötét';sv('th',t)}
theme(ld('th')||'dark');$('#th').onclick=()=>theme(R.dataset.theme=='dark'?'light':'dark');
function accent(c){R.style.setProperty('--ac',c);$('#pick').value=c;sv('ac',c)}
if(/^#[0-9a-f]{6}$/i.test(ld('ac')||''))accent(ld('ac'));
$('#sw').onclick=e=>{if(e.target.dataset.c)accent(e.target.dataset.c)};$('#pick').oninput=e=>accent(e.target.value);
$('#mn').onclick=()=>$('#nav').classList.toggle('open');
$('#nav').onclick=e=>{if(e.target.matches('a.l'))$('#nav').classList.remove('open')};
addEventListener('scroll',()=>{const h=R.scrollHeight-innerHeight;$('#prog').style.width=(scrollY/h*100)+'%';$('#top').classList.toggle('on',scrollY>600)},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const fmt=n=>n.toLocaleString('hu-HU').replace(/\u00a0/g,' ');
function count(el){const t=+el.dataset.n,d=+el.dataset.d||0,s=performance.now();(function f(n){const p=Math.min((n-s)/1800,1),e=1-Math.pow(1-p,3);el.textContent=(t*e).toFixed(d);if(p<1)requestAnimationFrame(f)})(s)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('on');e.target.querySelectorAll('[data-n]').forEach(count);if(e.target.id=='gauge'){const s=performance.now();(function f(n){const p=Math.min((n-s)/2600,1);$('#rpm').textContent=fmt(Math.round(9000*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)})(s)}io.unobserve(e.target)}),{threshold:.25});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.querySelectorAll('.gal img').forEach(i=>i.onclick=()=>{$('#lb img').src=i.src;$('#lb').classList.add('on')});
$('#lb').onclick=()=>$('#lb').classList.remove('on');
addEventListener('keydown',e=>{if(e.key=='Escape')$('#lb').classList.remove('on')});
const D={col:[['Laguna kék','#0b86e0',0],['Shark kék','#0a4db3',0],['Carrara fehér','#f1f3f5',0],['Guards vörös','#d9232d',0],['Python zöld','#2f9e55',0],['Racing sárga','#f5c400',0],['Ében fekete','#15181c',0],['Egyedi festés (Paint to Sample)','#8a3ffc',12500]],
eng:[['4,0 boxer, 525 LE','Széria',0],['Sportkipufogó, 525 LE','Titán rendszer',4500],['Tuning, 560 LE','Illusztratív',16000]],
trim:[['Alap','Menetkész',0],['Clubsport','Bukócső, hevederek',3000],['Weissach','Karbon, könnyítés',18500],['Exclusive Manufaktur','Egyedi bőr, varrás',27000]],
whl:[['Kovácsolt alu','20/21 col, széria',0],['Magnézium kerekek','20/21 col, könnyített',17000]]};
const S={col:0,eng:0,trim:0,whl:0},BASE=241000;
function draw(){let p=BASE;for(const k in D){const o=D[k][S[k]];p+=o[o.length-1];$('#c-'+k.replace('col','col'))}
for(const k in D){$('#c-'+k).innerHTML=D[k].map((o,i)=>`<div class="chip${S[k]==i?' sel':''}" tabindex="0" role="button" data-k="${k}" data-i="${i}">${k=='col'?`<span class="dot" style="background:${o[1]}"></span>`:''}${o[0]}${k=='col'?(o[2]?` <small>+${fmt(o[2])} EUR</small>`:''):`<small>${o[1]}${o[2]?' · +'+fmt(o[2])+' EUR':''}</small>`}</div>`).join('')}
$('#car').style.fill=D.col[S.col][1];$('#wh').style.filter=S.whl?'brightness(1.4) sepia(.3)':'none';
$('#price').textContent=fmt(p)+' EUR';
$('#sum').textContent=[D.col[S.col][0],D.eng[S.eng][0],D.trim[S.trim][0],D.whl[S.whl][0]].join(' · ');return p}
function pick(e){const c=e.target.closest('.chip');if(!c||(e.type=='keydown'&&e.key!='Enter'&&e.key!=' '))return;if(e.type=='keydown')e.preventDefault();S[c.dataset.k]=+c.dataset.i;draw()}
$('#f').addEventListener('click',pick);$('#f').addEventListener('keydown',pick);draw();
const BAD=['kurva','kurvi','fasszopo','faszfej','faszom','picsa','baszd','baszod','bazd','buzi','kibaszott','bazdmeg','bazmeg','szopj','retkes','csicska','geci','fuck','shit','bitch','cunt','asshole','nigger','faggot','whore','slut'],BADW=['fasz','fos','szar','pina','dick','hulye','balfasz'];
function bad(t){const n=t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[0]/g,'o').replace(/[1!]/g,'i').replace(/3/g,'e').replace(/[4@]/g,'a').replace(/[$5]/g,'s');const j=n.replace(/[^a-z]/g,''),w=n.split(/[^a-z]+/);return BAD.some(b=>j.includes(b))||w.some(x=>BADW.includes(x))}
function err(m){const r=$('#er');r.textContent=m;r.style.display='block';$('#ok').style.display='none'}
$('#f').onsubmit=e=>{e.preventDefault();const nm=$('#nm').value.trim(),em=$('#em').value.trim(),ms=$('#ms').value.trim();
if(!/^[A-Za-zÀ-ÖØ-öø-ſ]+([ '’.-][A-Za-zÀ-ÖØ-öø-ſ]+)*$/.test(nm))return err('A név csak betűket tartalmazhat, számot és különleges jeleket nem.');
if(!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(em))return err('Csak @gmail.com végű e-mail címet fogadunk el.');
if(bad(nm)||bad(ms)||bad(em.split('@')[0]))return err('Kérjük, kerüld a sértő vagy durva szavakat.');
$('#er').style.display='none';const o=$('#ok');o.style.display='block';o.textContent='Köszönjük, '+$('#nm').value+'! Üzenetét elküldtük. A konfigurációd ('+$('#sum').textContent+', '+$('#price').textContent+') megérkezett hozzánk, hamarosan jelentkezünk.';$('#f').reset()};