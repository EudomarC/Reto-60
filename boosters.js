/* Reto 60 gameplay boosters */
(function(){
 function install(){
  if(window.__r60BoostersInstalled||typeof window.startGame!=='function')return false;
  const originalStart=window.startGame;
  window.startGame=function(category='all',challenge=null){
   const store=window.R60Store;
   const useTime10=!!(store?.isTimeActive?.()&&store?.count?.('time10')>0);
   const result=originalStart.apply(this,arguments);
   if(useTime10){
    const consumed=store.consumeTime();
    if(consumed){
     window.seconds=70;
     const timeEl=document.getElementById('time');
     if(timeEl)timeEl.innerText='70';
     const modeEl=document.getElementById('gameMode');
     if(modeEl)modeEl.innerText += ' · ⏳ +10 s ACTIVADO';
     window.dispatchEvent(new CustomEvent('r60boosterused',{detail:{id:'time10',seconds:10,challenge:!!challenge}}));
    }
   }
   return result;
  };
  window.__r60BoostersInstalled=true;
  return true;
 }
 function boot(){let tries=0;const t=setInterval(()=>{tries++;if(install()||tries>100)clearInterval(t)},50)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
 window.R60Boosters={install};
})();