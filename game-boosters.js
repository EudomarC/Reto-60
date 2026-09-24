/* Reto 60 — game booster bridge */
(function(){
  function install(){
    if(window.__r60BoosterInstalled)return true;
    if(typeof window.startGame!=='function'||!window.R60Store)return false;
    const original=window.startGame;
    window.startGame=function(category='all',challenge=null){
      const active=window.R60Store?.isTimeActive?.()===true;
      const available=Number(window.R60Store?.count?.('time10')||0)>0;
      const useBoost=active&&available;
      original(category,challenge);
      if(useBoost){
        window.seconds=70;
        const timeEl=document.getElementById('time');
        if(timeEl)timeEl.innerText='70';
        const mode=document.getElementById('gameMode');
        if(mode)mode.innerText+=(mode.innerText?' · ':'')+'⏳ +10 s ACTIVADO';
        window.R60Store.consumeTime();
        try{window.dispatchEvent(new CustomEvent('r60boosterused',{detail:{id:'time10',seconds:10,challenge:!!challenge}}));}catch(e){}
      }
    };
    window.__r60BoosterInstalled=true;
    return true;
  }
  function boot(){
    if(install())return;
    let n=0;
    const t=setInterval(()=>{n++;if(install()||n>120)clearInterval(t)},100);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.R60GameBoosters={install};
})();