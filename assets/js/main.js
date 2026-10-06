'use strict';

const THEME_KEY='shabab-portfolio-theme';
const STATS_KEY='shabab-profile-stats-v2';
const SNAPSHOT_TIME=Date.UTC(2026,9,2,18,50);
const snapshots={
  codeforces:{solved:242,rating:1407,rank:'Specialist',updatedAt:SNAPSHOT_TIME},
  leetcode:{totalSolved:273,ranking:581623,easySolved:111,mediumSolved:142,hardSolved:20,updatedAt:SNAPSHOT_TIME}
};
const numbers=new Intl.NumberFormat('en-US');

function initializeTheme(){
  const button=document.getElementById('themeToggle');
  function apply(theme){
    document.documentElement.dataset.theme=theme;
    const next=theme==='light'?'dark':'light';
    button.setAttribute('aria-label',`Switch to ${next} theme`);
    button.title=`Switch to ${next} theme`;
    button.querySelector('use').setAttribute('href',theme==='light'?'#i-moon':'#i-sun');
    document.querySelector('meta[name="theme-color"]').content=theme==='light'?'#f7f7f2':'#141613';
  }
  apply(document.documentElement.dataset.theme==='dark'?'dark':'light');
  button.hidden=false;
  button.addEventListener('click',()=>{
    const theme=document.documentElement.dataset.theme==='light'?'dark':'light';apply(theme);
    try{localStorage.setItem(THEME_KEY,theme);}catch(_){/* Storage is optional. */}
  });
}

function initializeNavigation(){
  const button=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
  const mobile=matchMedia('(max-width:680px)');
  function close(restoreFocus=false){
    const wasOpen=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');
    nav.classList.remove('is-open');document.body.classList.remove('menu-open');
    if(restoreFocus&&wasOpen)button.focus();
  }
  document.documentElement.classList.add('nav-enhanced');button.hidden=false;
  button.addEventListener('click',()=>{
    if(button.getAttribute('aria-expanded')==='true')return close();
    button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close navigation');
    nav.classList.add('is-open');document.body.classList.add('menu-open');nav.querySelector('a').focus();
  });
  document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!button.contains(event.target))close();});
  document.addEventListener('keydown',event=>{
    if(button.getAttribute('aria-expanded')!=='true'||!mobile.matches)return;
    if(event.key==='Escape'){event.preventDefault();close(true);}
    if(event.key==='Tab'){
      const items=[button,...nav.querySelectorAll('a')];
      if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}
      else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
    }
  });
  mobile.addEventListener('change',()=>close());
  const links=[...nav.querySelectorAll('a[href^="#"]')],sections=links.map(link=>document.getElementById(link.hash.slice(1)));
  let scheduled=false,current='',pending=null,anchor=null,pendingTimer;
  function activate(section){
    if(current===section.id)return;current=section.id;
    links.forEach(link=>{const selected=link.hash===`#${section.id}`;link.classList.toggle('is-active',selected);if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  }
  function cancelPending(){pending=null;anchor=null;clearTimeout(pendingTimer);schedule();}
  function update(){
    scheduled=false;
    const header=document.querySelector('.site-header').getBoundingClientRect().height;
    const marker=header+30,root=document.scrollingElement;
    const atEnd=root.scrollHeight>innerHeight+2&&Math.ceil(root.scrollTop+innerHeight)>=root.scrollHeight-2;
    if(pending){
      const box=pending.getBoundingClientRect();
      const padding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
      const maxScroll=Math.max(0,root.scrollHeight-innerHeight);
      const targetScroll=Math.min(maxScroll,Math.max(0,root.scrollTop+box.top-padding));
      // Wait for the real anchor destination, including browser-clamped targets.
      const arrived=Math.abs(root.scrollTop-targetScroll)<=1;
      if(!arrived){activate(pending);return;}
      anchor={section:pending,scrollY:targetScroll};pending=null;clearTimeout(pendingTimer);
    }
    if(anchor){
      const box=anchor.section.getBoundingClientRect();
      if(Math.abs(root.scrollTop-anchor.scrollY)<2&&box.bottom>header&&box.top<innerHeight){activate(anchor.section);return;}
      anchor=null;
    }
    let active=sections[0];
    for(const section of sections)if(section.getBoundingClientRect().top<=marker)active=section;
    // The final card cannot always reach the header before scrolling stops.
    if(atEnd)active=sections.at(-1);
    activate(active);
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  links.forEach(link=>link.addEventListener('click',()=>{
    clearTimeout(pendingTimer);anchor=null;pending=document.getElementById(link.hash.slice(1));
    activate(pending);close();
    pendingTimer=setTimeout(()=>{pending=null;schedule();},2000);schedule();
  }));
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  addEventListener('wheel',cancelPending,{passive:true});addEventListener('touchstart',cancelPending,{passive:true});
  addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))cancelPending();});
  update();
}

function initializeContact(){
  const button=document.getElementById('copyEmail'),status=document.getElementById('copyStatus');let timer;
  if(!navigator.clipboard?.writeText)return;button.hidden=false;
  button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText('imshababahmed@gmail.com');status.textContent='Copied!';}
    catch(_){status.textContent='Select the address to copy.';}
    clearTimeout(timer);timer=setTimeout(()=>{status.textContent='';},4000);
  });
}

// Live APIs enhance the static snapshots. A failed request never hides content.
function readCache(){
  try{const value=JSON.parse(localStorage.getItem(STATS_KEY)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}
  catch(_){return {};}
}
function count(value){
  if(value===null||value===undefined||value==='')throw new Error('Missing statistic');
  const parsed=Number(value);if(!Number.isInteger(parsed)||parsed<0)throw new Error('Invalid statistic');return parsed;
}
function validate(platform,stats){
  if(!stats||typeof stats!=='object')throw new Error('Invalid profile');
  if(platform==='codeforces')return {solved:count(stats.solved),rating:stats.rating==null?null:count(stats.rating),rank:String(stats.rank||'Unrated').slice(0,40)};
  const parsed={totalSolved:count(stats.totalSolved),ranking:stats.ranking==null?null:count(stats.ranking),easySolved:count(stats.easySolved),mediumSolved:count(stats.mediumSolved),hardSolved:count(stats.hardSolved)};
  if(parsed.easySolved+parsed.mediumSolved+parsed.hardSolved!==parsed.totalSolved)throw new Error('Inconsistent totals');return parsed;
}
function latestSaved(platform){
  const cached=readCache()[platform];
  if(cached&&Number.isFinite(cached.updatedAt)&&cached.updatedAt>SNAPSHOT_TIME&&cached.updatedAt<=Date.now()+60000){
    try{return {...validate(platform,cached),updatedAt:cached.updatedAt};}catch(_){/* Ignore corrupt or stale cache. */}
  }
  return snapshots[platform];
}
function save(platform,stats){try{const cache=readCache();cache[platform]={...stats,updatedAt:Date.now()};localStorage.setItem(STATS_KEY,JSON.stringify(cache));}catch(_){}}
function setStat(key,value){const el=document.querySelector(`[data-stat="${key}"]`);if(el)el.textContent=typeof value==='number'?numbers.format(value):value??'—';}
function applyStats(platform,stats){
  if(platform==='codeforces'){setStat('cf-solved',stats.solved);setStat('cf-rating',stats.rating);setStat('cf-rank',stats.rank.replace(/\b\w/g,letter=>letter.toUpperCase()));}
  else{setStat('lc-solved',stats.totalSolved);setStat('lc-ranking',stats.ranking);setStat('lc-easy',stats.easySolved);setStat('lc-medium',stats.mediumSolved);setStat('lc-hard',stats.hardSolved);}
}
async function fetchJson(url,timeout=12000){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeout);
  try{const response=await fetch(url,{cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});if(!response.ok)throw new Error(`API ${response.status}`);return await response.json();}
  finally{clearTimeout(timer);}
}
async function fetchCodeforces(){
  const [info,submissions]=await Promise.all([fetchJson('https://codeforces.com/api/user.info?handles=shabab_sa'),fetchJson('https://codeforces.com/api/user.status?handle=shabab_sa&from=1&count=10000')]);
  if(info.status!=='OK'||submissions.status!=='OK'||!info.result?.[0]||!Array.isArray(submissions.result))throw new Error('Codeforces unavailable');
  // Preserve the saved count rather than publishing a truncated history.
  if(submissions.result.length===10000)throw new Error('Full submission history required');
  const unique=new Set(submissions.result.filter(item=>item.verdict==='OK'&&item.problem).map(item=>{const p=item.problem;return `${p.contestId??p.problemsetName??'unknown'}:${p.index??p.name}`;}));
  return validate('codeforces',{solved:unique.size,rating:info.result[0].rating,rank:info.result[0].rank||'Unrated'});
}
async function fetchLeetCode(){
  try{const [solved,profile]=await Promise.all([fetchJson('https://alfa-leetcode-api.onrender.com/Shabab01/solved'),fetchJson('https://alfa-leetcode-api.onrender.com/Shabab01')]);return validate('leetcode',{...solved,totalSolved:solved.solvedProblem??solved.totalSolved,ranking:profile.ranking});}
  catch(_){const p=await fetchJson('https://leetcode-api-faisalshohag.vercel.app/Shabab01',9000);return validate('leetcode',{...p,totalSolved:p.totalSolved??p.solvedProblem});}
}
async function refreshPlatform(platform,fetchStats){
  const card=document.querySelector(`[data-platform-card="${platform}"]`);
  applyStats(platform,latestSaved(platform));card.setAttribute('aria-busy','true');
  try{const stats=await fetchStats();applyStats(platform,stats);save(platform,stats);}
  catch(_){/* Keep the most recent saved profile without adding status text. */}
  finally{card.setAttribute('aria-busy','false');}
}
function initializeProfiles(){
  let lastRefresh=0,refreshing=false;
  async function refresh(){if(refreshing)return;refreshing=true;lastRefresh=Date.now();try{await Promise.allSettled([refreshPlatform('codeforces',fetchCodeforces),refreshPlatform('leetcode',fetchLeetCode)]);}finally{refreshing=false;}}
  void refresh();document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Date.now()-lastRefresh>600000)void refresh();});
}

initializeTheme();initializeNavigation();initializeContact();
document.getElementById('currentYear').textContent=String(new Date().getFullYear());
initializeProfiles();
