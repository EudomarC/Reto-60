/* Reto 60 — game booster bridge */
(function(){
  const TEST_PARAM='r60test';
  function testEnabled(){try{return new URLSearchParams(location.search).get(TEST_PARAM)==='1'}catch(e){return false}}
  function installTestButton(){
    if(!testEnabled()||document.getElementById('r60BoosterTestButton'))return;
    const home=document.getElementById('home');if(!home||!window.R60Store)return;
    const b=document.createElement('button');b.id='r60BoosterTestButton';b.className='restart';b.style.cssText='background:#432c68;color:#fff;border:1px dashed #b597ff;margin-bottom:16px';
    const refresh=()=>{const n=Number(window.R60Store.count('time10')||0);b.textContent=`🧪 PRUEBA INTERNA · AÑADIR +10 s (${n} disponibles)`};refresh();
    b.onclick=()=>{window.R60Store.add('time10',1);window.R60Store.activateTime();refresh();alert('🧪 Unidad de prueba añadida y activada.\n\nLa próxima partida debe comenzar en 70 segundos.\nNo se realizó ningún cobro.')};
    const store=document.getElementById('r60StoreButton');if(store)store.insertAdjacentElement('afterend',b);else home.appendChild(b);
    window.addEventListener('r60inventorychange',refresh);
  }
  function install(){
    if(window.__r60BoosterInstalled){installTestButton();return true}
    if(typeof window.startGame!=='function'||!window.R60Store)return false;
    const original=window.startGame;
    window.startGame=function(category='all',challenge=null){
      const active=window.R60Store?.isTimeActive?.()===true;
      const available=Number(window.R60Store?.count?.('time10')||0)>0;
      const useBoost=active&&available;
      original(category,challenge);
      if(useBoost){
        window.seconds=70;
        const timeEl=document.getElementById('time');if(timeEl)timeEl.innerText='70';
        const mode=document.getElementById('gameMode');if(mode)mode.innerText+=(mode.innerText?' · ':'')+'⏳ +10 s ACTIVADO';
        window.R60Store.consumeTime();
        try{window.dispatchEvent(new CustomEvent('r60boosterused',{detail:{id:'time10',seconds:10,challenge:!!challenge}}));}catch(e){}
      }
    };
    window.__r60BoosterInstalled=true;installTestButton();return true;
  }
  function boot(){if(install())return;let n=0;const t=setInterval(()=>{n++;if(install()||n>120)clearInterval(t)},100)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.R60GameBoosters={install,testEnabled};
})();