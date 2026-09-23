/* Reto 60 player profile + achievements */
function reto60ProfileStats(){
  const p=typeof reto60Progress==='function'?reto60Progress():{xp:0,best:0,level:1,base:0,next:100,pct:0};
  const points=Number(localStorage.getItem('reto60points')||0);
  const streak=Number(localStorage.getItem('reto60streak')||0);
  const matches=Math.max(Number(localStorage.getItem('reto60_local_matches')||0),p.xp>0?1:0);
  const name=(typeof playerShareName==='function'?playerShareName():localStorage.getItem('reto60_display_name'))||'Jugador';
  return {...p,points,streak,matches,name};
}
function reto60Achievements(s){return [
  {icon:'🎮',name:'Primera partida',desc:'Completa tu primera partida',ok:s.matches>=1},
  {icon:'⭐',name:'Mil puntos',desc:'Alcanza 1.000 puntos acumulados',ok:s.points>=1000},
  {icon:'🏆',name:'Centurión',desc:'Consigue un récord de 100 puntos',ok:s.best>=100},
  {icon:'🔥',name:'Semana de fuego',desc:'Mantén una racha de 7 días',ok:s.streak>=7},
  {icon:'⚡',name:'Nivel 5',desc:'Alcanza el nivel 5',ok:s.level>=5}
];}
function reto60CloseProfile(){document.getElementById('reto60ProfileOverlay')?.remove();}
function reto60OpenProfile(){
  reto60CloseProfile();
  const s=reto60ProfileStats(),ach=reto60Achievements(s),unlocked=ach.filter(a=>a.ok).length;
  const overlay=document.createElement('div');overlay.id='reto60ProfileOverlay';
  overlay.style.cssText='position:fixed;inset:0;z-index:100002;background:rgba(4,7,18,.97);overflow:auto;padding:22px;font-family:Arial,sans-serif;color:white';
  const badges=ach.map(a=>`<div style="display:flex;gap:12px;align-items:center;padding:13px;margin-top:10px;border-radius:16px;background:${a.ok?'#1d2347':'#10152d'};border:1px solid ${a.ok?'#3a478c':'#252c58'};opacity:${a.ok?'1':'.55'}"><div style="font-size:31px;filter:${a.ok?'none':'grayscale(1)'}">${a.ok?a.icon:'🔒'}</div><div style="text-align:left"><div style="font-weight:800">${a.name}${a.ok?' ✓':''}</div><div style="font-size:12px;color:#aaa;margin-top:3px">${a.desc}</div></div></div>`).join('');
  overlay.innerHTML=`<div style="max-width:500px;margin:0 auto"><button id="reto60ProfileCloseTop" style="width:auto;padding:10px 14px;margin:0 0 14px;background:#252c58;color:white">← VOLVER</button><div style="text-align:center"><div style="font-size:15px;color:#aaa">👤 PERFIL DEL JUGADOR</div><h1 style="margin:8px 0 4px">${typeof escapeHtml==='function'?escapeHtml(s.name):s.name}</h1><div style="color:#ffb800;font-size:24px;font-weight:900">⚡ NIVEL ${s.level}</div></div><div style="background:#151a35;border:1px solid #292f5c;border-radius:22px;padding:20px;margin-top:20px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center"><div style="background:#1d2347;border-radius:16px;padding:14px"><b style="font-size:22px">⭐ ${s.points}</b><div style="font-size:11px;color:#aaa;margin-top:5px">PUNTOS</div></div><div style="background:#1d2347;border-radius:16px;padding:14px"><b style="font-size:22px">🏆 ${s.best}</b><div style="font-size:11px;color:#aaa;margin-top:5px">RÉCORD</div></div><div style="background:#1d2347;border-radius:16px;padding:14px"><b style="font-size:22px">🔥 ${s.streak}</b><div style="font-size:11px;color:#aaa;margin-top:5px">RACHA</div></div><div style="background:#1d2347;border-radius:16px;padding:14px"><b style="font-size:22px">🎮 ${s.matches}</b><div style="font-size:11px;color:#aaa;margin-top:5px">PARTIDAS*</div></div></div><div style="margin-top:18px"><div style="display:flex;justify-content:space-between;font-size:12px;color:#aaa"><span>${s.xp} XP</span><span>${s.next-s.xp} XP para nivel ${s.level+1}</span></div><div style="height:10px;background:#252c58;border-radius:20px;overflow:hidden;margin-top:7px"><div style="height:100%;width:${s.pct}%;background:#ffb800"></div></div></div></div><div style="background:#151a35;border:1px solid #292f5c;border-radius:22px;padding:20px;margin-top:16px"><h2 style="margin:0">🏅 Logros</h2><div style="color:#aaa;font-size:13px;margin-top:5px">${unlocked} de ${ach.length} desbloqueados</div>${badges}</div><div style="font-size:11px;color:#777;text-align:center;margin:14px 0">*El contador local empieza desde esta versión del perfil.</div><button id="reto60ProfileClose" style="background:#252c58;color:white;margin-bottom:30px">CERRAR PERFIL</button></div>`;
  document.body.appendChild(overlay);overlay.querySelector('#reto60ProfileClose').onclick=reto60CloseProfile;overlay.querySelector('#reto60ProfileCloseTop').onclick=reto60CloseProfile;
}
function reto60InstallProfile(){
  const home=document.getElementById('home');if(!home||document.getElementById('reto60ProfileButton'))return;
  const progress=document.getElementById('reto60ProgressBox');
  const b=document.createElement('button');b.id='reto60ProfileButton';b.className='restart';b.textContent='👤 VER MI PERFIL Y LOGROS';b.onclick=reto60OpenProfile;
  if(progress)progress.insertAdjacentElement('afterend',b);else{const stats=home.querySelector('.stats');stats?.insertAdjacentElement('afterend',b);}
  document.addEventListener('reto60-match-recorded',()=>{});
}
function reto60TrackLocalMatch(){localStorage.setItem('reto60_local_matches',String(Number(localStorage.getItem('reto60_local_matches')||0)+1));}
(function(){
  let lastResultHidden=true;
  const boot=()=>{reto60InstallProfile();const result=document.getElementById('result');if(result)new MutationObserver(()=>{const hidden=result.classList.contains('hidden');if(lastResultHidden&&!hidden)reto60TrackLocalMatch();lastResultHidden=hidden;}).observe(result,{attributes:true,attributeFilter:['class']});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,50));else setTimeout(boot,50);
})();