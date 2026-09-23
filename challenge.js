const CHALLENGE_VERSION = 2;

function hashString(value){let hash=2166136261;for(let i=0;i<value.length;i++){hash^=value.charCodeAt(i);hash=Math.imul(hash,16777619);}return hash>>>0;}
function seededRandom(seed){let state=seed>>>0;return function(){state+=0x6D2B79F5;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function shuffledQuestionsWithSeed(pool,seed){const deck=[...pool],random=seededRandom(hashString(String(seed)));for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}return deck;}
function createChallengeSeed(){return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;}
function encodeChallengePayload(payload){const json=JSON.stringify(payload);return btoa(unescape(encodeURIComponent(json))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");}
function decodeChallengePayload(token){try{const normalized=token.replace(/-/g,"+").replace(/_/g,"/"),padded=normalized+"=".repeat((4-normalized.length%4)%4);return JSON.parse(decodeURIComponent(escape(atob(padded))));}catch(error){console.warn("Reto 60: desafío inválido",error);return null;}}
function getTelegramPlayer(tg){const user=tg?.initDataUnsafe?.user;if(!user)return {id:null,name:"Un jugador"};const name=[user.first_name,user.last_name].filter(Boolean).join(" ")||user.username||"Jugador";return {id:user.id||null,name:name.slice(0,40)};}
function buildChallengeToken(category,seed,score,player){return encodeChallengePayload({v:CHALLENGE_VERSION,c:category,s:seed,p:Number(score)||0,n:player?.name||"Un jugador",u:player?.id||null});}
function getChallengeFromUrl(){const params=new URLSearchParams(window.location.search),token=params.get("challenge");if(!token)return null;const payload=decodeChallengePayload(token);if(!payload||![1,CHALLENGE_VERSION].includes(payload.v)||typeof payload.c!=="string"||typeof payload.s!=="string")return null;return payload;}

function startFriendChallenge(){
  if(typeof categoryDefinitions==="undefined"||typeof getQuestionPool!=="function"||typeof startGame!=="function")return;
  const available=categoryDefinitions.filter(c=>getQuestionPool(c.id).length);
  const choices=available.map(c=>`${c.id}: ${c.label}`).join("\n");
  const selected=prompt(`⚔️ RETAR A UN AMIGO\n\nElige la categoría escribiendo su código:\n\n${choices}`,"all");
  if(!selected)return;
  const category=selected.trim().toLowerCase();
  if(!available.some(c=>c.id===category)){alert("Categoría no válida.");return;}
  startGame(category,{friendInvite:true,n:"tu amigo",s:createChallengeSeed()});
}

function installFriendChallengeButton(){
  const home=document.getElementById("home");
  if(!home||document.getElementById("friendChallengeButton"))return;
  const normalPlay=[...home.querySelectorAll("button")].find(b=>b.textContent.includes("JUGAR RETO 60"));
  if(!normalPlay)return;
  const button=document.createElement("button");
  button.id="friendChallengeButton";button.className="share";button.textContent="⚔️ RETAR A UN AMIGO";button.onclick=startFriendChallenge;
  normalPlay.insertAdjacentElement("afterend",button);
}

function challengeShareData(){
  if(typeof buildChallengeToken!=="function")return null;
  const seed=(typeof currentSeed!=="undefined"&&currentSeed)||createChallengeSeed();
  const category=(typeof currentCategory!=="undefined"&&currentCategory)||"all";
  const points=(typeof score!=="undefined"&&Number(score))||0;
  const player=(typeof currentPlayer!=="undefined"&&currentPlayer)||{name:"Un jugador"};
  const token=buildChallengeToken(category,seed,points,player);
  const url=location.origin+location.pathname+"?challenge="+encodeURIComponent(token);
  const label=typeof categoryLabel==="function"?categoryLabel(category):category;
  return {url,text:`🔥 ${player.name} hizo ${points} puntos en RETO 60 · ${label}. ¿Puedes superarlo? ⚔️`};
}
function closeChallengeShareMenu(){document.getElementById("challengeShareOverlay")?.remove();}
function openChallengeShareMenu(){
  closeChallengeShareMenu();const d=challengeShareData();if(!d)return;
  const overlay=document.createElement("div");overlay.id="challengeShareOverlay";overlay.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99999;display:flex;align-items:flex-end;justify-content:center;padding:18px";
  const box=document.createElement("div");box.style.cssText="width:100%;max-width:500px;background:#151a35;border:1px solid #292f5c;border-radius:22px;padding:22px;color:white;text-align:center";
  box.innerHTML='<h2 style="margin:0 0 8px">📤 Enviar desafío</h2><p style="color:#aaa;margin:0 0 14px">Elige dónde quieres enviarlo.</p>';
  const add=(label,bg,fn)=>{const b=document.createElement("button");b.textContent=label;b.style.cssText=`width:100%;border:0;border-radius:16px;padding:16px;margin-top:10px;font-size:17px;font-weight:bold;background:${bg};color:white`;b.onclick=fn;box.appendChild(b);};
  add("🟢 WHATSAPP","#25D366",()=>{const u="https://wa.me/?text="+encodeURIComponent(d.text+"\n\n"+d.url);window.open(u,"_blank");});
  add("✈️ TELEGRAM","#229ED9",()=>{const u="https://t.me/share/url?url="+encodeURIComponent(d.url)+"&text="+encodeURIComponent(d.text);if(window.Telegram?.WebApp)window.Telegram.WebApp.openTelegramLink(u);else window.open(u,"_blank");});
  add("🔗 COPIAR ENLACE","#5865a8",async()=>{try{await navigator.clipboard.writeText(d.text+"\n\n"+d.url);alert("Enlace del desafío copiado.");closeChallengeShareMenu();}catch{prompt("Copia este enlace:",d.url);}});
  add("📱 MÁS OPCIONES","#28a8e9",async()=>{if(navigator.share){try{await navigator.share({title:"Reto 60",text:d.text,url:d.url});}catch(e){if(e?.name!=="AbortError")console.warn(e);}}else prompt("Copia y comparte este enlace:",d.url);});
  add("CANCELAR","#252c58",closeChallengeShareMenu);overlay.onclick=e=>{if(e.target===overlay)closeChallengeShareMenu();};overlay.appendChild(box);document.body.appendChild(overlay);
}
function installCrossAppShare(){
  document.addEventListener("click",e=>{const b=e.target.closest?.("button.share");if(!b||!b.textContent.includes("COMPARTIR DESAFÍO"))return;e.preventDefault();e.stopImmediatePropagation();openChallengeShareMenu();},true);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{setTimeout(installFriendChallengeButton,0);installCrossAppShare();});else{setTimeout(installFriendChallengeButton,0);installCrossAppShare();}
