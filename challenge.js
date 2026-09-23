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
