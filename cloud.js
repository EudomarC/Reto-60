const RETO60_API_URL="https://grznkkkmehxclqkniobt.supabase.co/functions/v1/reto60-api";
async function reto60Cloud(action,payload={}){const initData=window.Telegram?.WebApp?.initData||"";if(!initData)return {ok:false,offline:true,error:"TELEGRAM_CONTEXT_REQUIRED"};try{const response=await fetch(RETO60_API_URL,{method:"POST",headers:{"Content-Type":"application/json","x-telegram-init-data":initData},body:JSON.stringify({action,...payload})}),data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||`HTTP_${response.status}`);return {ok:true,...data};}catch(error){console.warn("Reto 60 cloud:",error);return {ok:false,error:String(error?.message||error)};}}
async function syncCloudPlayer(){return reto60Cloud("sync_player");}
async function recordCloudMatch({category,score,seed,mode}){return reto60Cloud("record_match",{category,score,seed,mode});}
async function getCloudLeaderboard(){return reto60Cloud("leaderboard");}
async function createCloudChallenge({opponent_id,category,seed}){return reto60Cloud("create_challenge",{opponent_id,category,seed});}
async function getPendingChallenges(){return reto60Cloud("pending_challenges");}
async function respondCloudChallenge(challenge_id,decision){return reto60Cloud("respond_challenge",{challenge_id,decision});}
