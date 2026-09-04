const PASSWORD='rnffjrkdb';
const members=['윈터','파타','다나','에렌','키엘','브루나'];
const ideaCategories=['패션','뷰티','브이로그','예능','기타'];
const adManagers=['로건','메이브','젤라'];
const channels=['주우재','이혜영','도운'];
const statuses=['기획','촬영예정','촬영완료','편집중','검수중','업로드완료'];
const uploadStatuses=statuses.filter(s=>s!=='검수중');
const workStatuses=['근무중','재택중','연차'];
const meetingSectionDefs=[
  {title:'📣 공지사항',tone:'notice'},
  {title:'💡 아이템 논의',tone:'idea'},
  {title:'🧥 주우재',tone:'joo'},
  {title:'👗 이혜영',tone:'hye'},
  {title:'🐶 도운',tone:'dow'},
  {title:'💬 기타',tone:'etc'}
];
const memberColors={
  '윈터': {bg:'#eef8ff', line:'#68b7e8'},'파타': {bg:'#eef9f0', line:'#69b879'},'다나': {bg:'#fff0f6', line:'#ed7eaa'},
  '에렌': {bg:'#fff3e8', line:'#ee9850'},'키엘':{bg:'#fff8e6',line:'#f3b940'},'브루나':{bg:'#f7f0fc',line:'#bb8ddd'}
};
const channelClass={'주우재':'joo','이혜영':'hye','도운':'dow','전체':'all'};
const channelLabel={'주우재':'주우재','이혜영':'이혜영','도운':'도운'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function addDaysISO(n){const d=new Date();d.setDate(d.getDate()+n);return localDate(d)}
function seed(){
  return {
    memberStatus:Object.fromEntries(members.map((m,i)=>[m,i===3?'연차':(i===1||i===5?'재택중':'근무중')])),
    memberRemoteDays:Object.fromEntries(members.map(m=>[m,[]])),
    adTargets:Object.fromEntries(channels.map(ch=>[ch,null])),
    calendarEvents:[],
    resourceMemos:[],
    todos:[
      {id:uid(),title:'촬영 준비 리스트 확인',assignee:'윈터',channel:'주우재',status:'촬영예정',due:''},
      {id:uid(),title:'업로드 스케줄 정리',assignee:'파타',channel:'이혜영',status:'기획',due:''},
      {id:uid(),title:'회의록 정리',assignee:'다나',channel:'도운',status:'검수중',due:''},
      {id:uid(),title:'광고 제안서 수정',assignee:'키엘',channel:'주우재',status:'편집중',due:''},
      {id:uid(),title:'대본 1차 작성',assignee:'브루나',channel:'도운',status:'기획',due:''}
    ],
    homeTodos:[],
    uploads:[
      {id:uid(),channel:'주우재',type:'롱폼',title:'가을 옷 구경 입어만볼게요',assignee:'윈터',date:addDaysISO(2),status:'기획'},
      {id:uid(),channel:'이혜영',type:'쇼츠',title:'웨이션 하울',assignee:'파타',date:addDaysISO(5),status:'편집중'},
      {id:uid(),channel:'도운',type:'롱폼',title:'투어5끼 vlog',assignee:'브루나',date:addDaysISO(9),status:'촬영완료'},
      {id:uid(),channel:'주우재',type:'롱폼',title:'AD 네이버 경보 군자',assignee:'키엘',date:addDaysISO(14),status:'기획'}
    ],
    shoots:[
      {id:uid(),channel:'주우재',title:'패션 입어만볼게요',assignee:'윈터',date:addDaysISO(2),method:'촬영팀 동행',equipment:'카메라 2대 / 무선마이크',crew:'윈터, 키엘',notes:'착장 리스트 확인'},
      {id:uid(),channel:'이혜영',title:'아웃아티비 부산',assignee:'파타',date:addDaysISO(5),method:'셀프캠',equipment:'셀프캠',crew:'촬영팀 없음',notes:'촬영 없이 전달'},
      {id:uid(),channel:'도운',title:'투어5끼 vlog',assignee:'브루나',date:addDaysISO(9),method:'PD 자체 촬영',equipment:'FX3 / 고프로',crew:'브루나, 다나',notes:'이동 동선 확인'}
    ],
    ads:[
      {id:uid(),channel:'주우재',brand:'푸드올로지 CCA',product:'건강기능식품',adType:'BDC',assignee:'키엘',amount:'25000000',status:'촬영완료',month:currentYM(),proposal:addDaysISO(-10),rough:addDaysISO(-3),final:addDaysISO(4),memo:''},
      {id:uid(),channel:'주우재',brand:'터마버',product:'패션',adType:'기획PPL',assignee:'윈터',amount:'18000000',status:'업로드완료',month:currentYM(),proposal:addDaysISO(-15),rough:addDaysISO(-7),final:addDaysISO(-1),memo:''},
      {id:uid(),channel:'이혜영',brand:'탬버린즈',product:'뷰티',adType:'기획PPL',assignee:'파타',amount:'22000000',status:'기획',month:currentYM(),proposal:addDaysISO(2),rough:addDaysISO(7),final:addDaysISO(12),memo:''},
      {id:uid(),channel:'도운',brand:'토리든',product:'스킨케어',adType:'단순PPL',assignee:'다나',amount:'15000000',status:'촬영예정',month:currentYM(),proposal:addDaysISO(1),rough:addDaysISO(8),final:addDaysISO(15),memo:''}
    ],
    meetings:[
      {id:uid(),title:'9월 1주차 주간회의',date:localDate(),week:'1',sections:[
        {title:'📣 공지사항',tone:'notice',items:['9월 촬영 스케줄 확정하기','멤버별 강점과 개선점 면담 일정 잡기']},
        {title:'💡 아이템 논의',tone:'idea',items:['가을 옷 구경 입어만볼게요','서울의 숨은 빈티지샵 디깅','집에서 더 바쁜 브이로그']}
      ]}
    ],
    ideas:[
      {id:uid(),title:'가을 옷장 털기',content:'각자 가지고 있는 가을 최애 아이템을 가져와 스타일링과 구매 이유를 이야기하는 콘텐츠.',proposer:'윈터',createdAt:localDate()},
      {id:uid(),title:'랜덤 동네 하루 여행',content:'목적지를 미리 정하지 않고 룰렛으로 동네를 뽑아 하루 동안 먹고 놀고 체험하는 아이템.',proposer:'다나',createdAt:localDate()}
    ],
    notices:[{id:uid(),channel:'전체',title:'팀 대시보드 오픈',content:'일정과 진행상황은 여기에서 같이 업데이트해요.',author:'윈터'}],
    schedules:[],
    resources:[
      {id:uid(),name:'오늘의 주우재',url:'https://www.youtube.com/@todaysjoowoojae',category:'YouTube'},
      {id:uid(),name:'혜영이는 못말려',url:'https://www.youtube.com/@Cantstop_Haeyoung',category:'YouTube'},
      {id:uid(),name:'윤도운도윤',url:'https://www.youtube.com/@ydwdy',category:'YouTube'}
    ]
  };
}
function load(){
  const saved=JSON.parse(localStorage.getItem('teamDashDataV3')||'null');
  if(saved){
    saved.ideas=Array.isArray(saved.ideas)?saved.ideas.map(x=>({...x,archived:Boolean(x.archived),comments:Array.isArray(x.comments)?x.comments:[],category:x.category||'기타'})):[];
    saved.homeTodos=Array.isArray(saved.homeTodos)?saved.homeTodos:[];
    saved.memberRemoteDays=saved.memberRemoteDays&&typeof saved.memberRemoteDays==='object'?saved.memberRemoteDays:{};
    members.forEach(m=>{if(!Array.isArray(saved.memberRemoteDays[m]))saved.memberRemoteDays[m]=[];});
    saved.adTargets=saved.adTargets&&typeof saved.adTargets==='object'?saved.adTargets:{};
    channels.forEach(ch=>{if(saved.adTargets[ch]===undefined)saved.adTargets[ch]=null;});
    saved.calendarEvents=Array.isArray(saved.calendarEvents)?saved.calendarEvents:[];
    saved.resourceMemos=Array.isArray(saved.resourceMemos)?saved.resourceMemos:[];
    // V3.20에서 캘린더로 직접 작성했던 일정만 1회 호환해서 불러옴.
    if(Array.isArray(saved.schedules)){
      saved.schedules.filter(x=>x&&(x.isLeave||['manual','meeting','leave'].includes(x.type))).forEach(x=>{
        if(!saved.calendarEvents.some(c=>c.id===x.id)){
          saved.calendarEvents.push({...x});
        }
      });
    }
    return saved;
  }
  const old=JSON.parse(localStorage.getItem('teamDashDataV2')||'null'); const base=seed();
  if(old){['todos','homeTodos','uploads','shoots','ads','meetings','notices','schedules','resources','ideas'].forEach(k=>{if(old[k]?.length)base[k]=old[k].map(x=>({...x,id:x.id||uid()}));});}
  return base;
}
const state=load();
function save(){localStorage.setItem('teamDashDataV3',JSON.stringify(state));renderAll();}
function localDate(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`;}
function currentYM(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
function fmtDate(s){if(!s)return '-';const d=new Date(s+'T00:00:00');return `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;}
function channelPill(ch){return `<span class="channel-pill ${channelClass[ch]||'all'}">${esc(ch)}</span>`;}
function statusBadge(s){return `<span class="status ${esc(s)}">${esc(s)}</span>`;}

function autoLinkText(value){
  const safe=esc(String(value??''));
  return safe
    .replace(/(https?:\/\/[^\s<]+)/gi,(url)=>{
      let href=url,trail='';
      while(/[),.!?;:]$/.test(href)){trail=href.slice(-1)+trail;href=href.slice(0,-1);}
      return `<a class="auto-text-link" href="${href}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${href}</a>${trail}`;
    })
    .replace(/\n/g,'<br>');
}
function autoLinkHtml(html){
  const box=document.createElement('div');
  box.innerHTML=html||'';
  const walker=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    if(node.parentElement?.closest('a,script,style'))return;
    const text=node.nodeValue||'';
    const re=/https?:\/\/[^\s<]+/gi;
    if(!re.test(text))return;
    re.lastIndex=0;
    const frag=document.createDocumentFragment();let last=0,m;
    while((m=re.exec(text))){
      frag.appendChild(document.createTextNode(text.slice(last,m.index)));
      let url=m[0],trail='';
      while(/[),.!?;:]$/.test(url)){trail=url.slice(-1)+trail;url=url.slice(0,-1);}
      const a=document.createElement('a');a.className='auto-text-link';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=url;
      a.addEventListener('click',e=>e.stopPropagation());
      frag.appendChild(a);if(trail)frag.appendChild(document.createTextNode(trail));
      last=m.index+m[0].length;
    }
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.replaceWith(frag);
  });
  return box.innerHTML;
}

function workBadge(s){return `<span class="work-dot ${s}"></span>${esc(s)}`;}

$('#loginForm').addEventListener('submit',e=>{e.preventDefault();if($('#passwordInput').value===PASSWORD){sessionStorage.setItem('dashAuth','1');$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');}else $('#loginError').textContent='비밀번호가 틀렸어요.';});
if(sessionStorage.getItem('dashAuth')==='1'){$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');}
$$('#nav button').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.page)));
function navigate(id){$$('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));$$('.page').forEach(p=>p.classList.toggle('active-page',p.id===id));if(id==='meetings'){const n=new Date(),week=String(Math.min(5,Math.ceil(n.getDate()/7)));renderMeetingMonth(n.getFullYear(),n.getMonth()+1,week);}if(id==='calendar')renderCalendar();window.scrollTo({top:0,behavior:'instant'});}

function renderHome(){
  const now=new Date(),tom=new Date();tom.setDate(now.getDate()+1);const weekEnd=new Date();weekEnd.setDate(now.getDate()+7);const td=localDate(now),tm=localDate(tom);
  const scheduleItems=[...state.schedules.map(x=>({...x,kind:'일정'})),...state.shoots.map(x=>({...x,kind:'촬영'})),...state.uploads.map(x=>({...x,kind:'업로드'}))];
  const renderSchedule=(arr,msg)=>arr.length?arr.slice(0,5).map(x=>`<div class="schedule-item ${channelClass[x.channel]||''}"><span class="bar"></span><div><strong>${esc(x.title)}</strong><small>${esc(x.channel||'전체')} · ${esc(x.kind)}</small></div><time>${shootDates(x).map(d=>fmtDate(d.date)+(d.memo?` ${esc(d.memo)}`:'')).join(' · ')||'-'}</time></div>`).join(''):`<div class="empty">${msg}</div>`;
  const today=scheduleItems.filter(x=>x.date===td), tomorrow=scheduleItems.filter(x=>x.date===tm), week=state.uploads.filter(x=>x.date&&new Date(x.date+'T00:00:00')>=new Date(td+'T00:00:00')&&new Date(x.date+'T00:00:00')<=weekEnd).sort((a,b)=>a.date.localeCompare(b.date));
  $('#todayCount').textContent=today.length;$('#tomorrowCount').textContent=tomorrow.length;$('#weekCount').textContent=week.length;
  $('#todaySchedule').innerHTML=renderSchedule(today,'오늘 일정이 없어요');$('#tomorrowSchedule').innerHTML=renderSchedule(tomorrow,'예정된 일정이 없어요');$('#weekUploads').innerHTML=renderSchedule(week.map(x=>({...x,kind:'업로드'})),'이번 주 업로드가 없어요');
  renderHomeTodos();
  const overdue=state.ads.filter(x=>x.final&&x.final<td&&x.status!=='업로드완료');
  $('#homeAlert').classList.toggle('hidden',!overdue.length);if(overdue.length)$('#homeAlert').innerHTML=`<b>주의 필요</b><span>${overdue.length}건 마감 지남</span><strong>📣 ${esc(overdue[0].brand)} 최종본 전달</strong><em>광고</em>`;
  $('#memberBoard').innerHTML=members.map(m=>{
    const col=memberColors[m];
    const memberLeaveEvents=(state.calendarEvents||[]).filter(e=>e.type==='leave'&&(e.member===m||String(e.title||'').startsWith(m+' ')));
    const onLeaveToday=memberLeaveEvents.some(e=>e.date===td);
    const hasPastCalendarLeave=memberLeaveEvents.some(e=>e.date&&e.date<td);
    const savedWs=state.memberStatus?.[m]||'근무중';
    const ws=onLeaveToday?'연차':(hasPastCalendarLeave&&savedWs==='연차'?'근무중':savedWs);
    const manualTasks=state.todos.filter(t=>t.assignee===m).map(t=>({kind:'todo',id:t.id,title:t.title,channel:t.channel||'기타',status:t.status||'',date:t.due||''}));
    const weekStart=new Date(td+'T00:00:00');
    weekStart.setDate(weekStart.getDate()-((weekStart.getDay()+6)%7));
    const weekEndDate=new Date(weekStart);weekEndDate.setDate(weekEndDate.getDate()+6);
    const weekStartISO=localDate(weekStart),weekEndISO=localDate(weekEndDate);
    const uploadTasks=state.uploads.filter(u=>uploadAssignees(u).includes(m)&&u.date&&u.date>=weekStartISO&&u.date<=weekEndISO).map(u=>({kind:'upload',id:u.id,title:u.title,status:u.status||'',date:u.date||''}));
    const tasks=[...manualTasks,...uploadTasks].sort((a,b)=>{
      if(a.date&&b.date)return a.date.localeCompare(b.date);
      if(a.date)return -1;if(b.date)return 1;return 0;
    }).slice(0,6);
    const remoteDays=state.memberRemoteDays?.[m]||[];
    const remoteDayButtons=['월','화','수','목','금'].map(day=>`<button type="button" class="remote-day-btn ${remoteDays.includes(day)?'active':''}" onclick="toggleRemoteDay('${m}','${day}')">${day}</button>`).join('');
    return `<article class="member-card" style="--member-bg:${col.bg};--member-line:${col.line}"><div class="member-head"><div class="member-name"><span class="avatar" style="background:${col.line}">${m[0]}</span><div><b>${m}</b><small>${workBadge(ws)}</small></div></div><select class="work-select" onchange="setWorkStatus('${m}',this.value)">${workStatuses.map(s=>`<option ${s===ws?'selected':''}>${s}</option>`).join('')}</select></div><div class="remote-days-wrap"><span>재택근무</span><div class="remote-day-list">${remoteDayButtons}</div></div><div class="member-tasks">${tasks.length?tasks.map(t=>t.kind==='upload'?`<div class="mini-task upload-mini-task" onclick="openUploadModal('${t.id}')" title="업로드 일정 수정"><span><b class="mini-task-kind">업로드</b>${esc(t.title)}</span><div class="mini-task-right"><em>${t.date?fmtDate(t.date):esc(t.status)}</em></div></div>`:`<div class="mini-task" onclick="openModal('todoModal','${t.id}')" title="클릭해서 수정"><span class="mini-task-main">○ &nbsp;${esc(t.title)} <b class="mini-channel-tag ${t.channel==='기타'?'other':''}">${esc(t.channel||'기타')}</b></span><div class="mini-task-right"><em>${esc(t.status)}</em><button type="button" class="mini-task-delete" onclick="event.stopPropagation();deleteById('todos','${t.id}')" title="업무 삭제">×</button></div></div>`).join(''):'<div class="no-task">등록된 업무가 없어요.</div>'}</div><button class="member-add" onclick="openTodoFor('${m}')">+ 업무 추가</button></article>`;
  }).join('');
  const shoots=[...state.shoots].filter(x=>x.date).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);$('#homeShoots').innerHTML=shoots.length?shoots.map(x=>`<div class="simple-row">${channelPill(x.channel)}<b>${esc(x.title)}</b><small>${fmtDate(x.date)} · ${esc(x.assignee)}</small></div>`).join(''):'<div class="empty">등록된 촬영이 없어요.</div>';
  $('#homeNotices').innerHTML=state.notices.length?[...state.notices].reverse().slice(0,5).map(x=>`<div class="simple-row">${channelPill(x.channel)}<b>${esc(x.title)}</b><small>${esc(x.author)}</small></div>`).join(''):'<div class="empty">공지사항이 없어요.</div>';
}

function safeHomeTodoHtml(html){
  const box=document.createElement('div');box.innerHTML=html||'';
  const walk=node=>{
    [...node.childNodes].forEach(ch=>{
      if(ch.nodeType===3)return;
      if(ch.nodeType!==1){ch.remove();return;}
      const tag=ch.tagName.toLowerCase();
      if(tag==='b'){const strong=document.createElement('strong');strong.innerHTML=ch.innerHTML;ch.replaceWith(strong);walk(strong);return;}
      if(!['strong','br','div','p'].includes(tag)){
        const frag=document.createDocumentFragment();while(ch.firstChild)frag.appendChild(ch.firstChild);ch.replaceWith(frag);return;
      }
      [...ch.attributes].forEach(a=>ch.removeAttribute(a.name));walk(ch);
    });
  };
  walk(box);return box.innerHTML;
}
function homeTodoText(html){
  const box=document.createElement('div');box.innerHTML=html||'';return (box.textContent||'').trim();
}
function renderHomeTodos(){
  const list=$('#homeTodoList');if(!list)return;
  state.homeTodos=Array.isArray(state.homeTodos)?state.homeTodos:[];
  const items=[...state.homeTodos].sort((a,b)=>Number(a.done)-Number(b.done)||String(a.createdAt||'').localeCompare(String(b.createdAt||'')));
  list.innerHTML=items.length?items.map(x=>`<div class="home-todo-item ${x.done?'done':''}" onclick="openHomeTodoModal('${x.id}')">
    <button type="button" class="home-todo-check" onclick="event.stopPropagation();toggleHomeTodo('${x.id}')" aria-label="완료">${x.done?'✓':''}</button>
    <div class="home-todo-content">${autoLinkHtml(safeHomeTodoHtml(x.richHtml||esc(x.text||'')))}</div>
    <button type="button" class="home-todo-delete" onclick="event.stopPropagation();deleteHomeTodo('${x.id}')" aria-label="삭제">×</button>
  </div>`).join(''):`<div class="home-todo-empty">아직 할 일이 없어요. <button onclick="openHomeTodoModal()">+ 첫 항목 추가</button></div>`;
}
window.toggleHomeTodo=id=>{const x=state.homeTodos.find(v=>v.id===id);if(!x)return;x.done=!x.done;save();};
window.deleteHomeTodo=id=>{
  const index=state.homeTodos.findIndex(v=>v.id===id);if(index<0)return;
  const removed=state.homeTodos[index];state.homeTodos.splice(index,1);save();
  showDeleteUndo('To Do가 삭제되었습니다',()=>{
    if(!state.homeTodos.some(v=>v.id===removed.id))state.homeTodos.splice(Math.min(index,state.homeTodos.length),0,removed);
    save();
  });
};
function homeTodoFormat(cmd){
  const editor=$('#homeTodoEditor');if(!editor)return;
  editor.focus();
  if(cmd==='bold')document.execCommand('bold',false,null);
  if(cmd==='normal')document.execCommand('removeFormat',false,null);
}
window.homeTodoFormat=homeTodoFormat;
function openHomeTodoModal(id=null){
  state.homeTodos=Array.isArray(state.homeTodos)?state.homeTodos:[];
  const existing=id?state.homeTodos.find(x=>x.id===id):null;
  const initial=existing?.richHtml||esc(existing?.text||'');
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal home-todo-modal">
    <div class="modal-head"><h3>${existing?'To Do 수정':'To Do 추가'}</h3><button class="icon-btn" id="closeModal">×</button></div>
    <div class="home-todo-editor-wrap">
      <div class="rich-toolbar">
        <button type="button" onmousedown="event.preventDefault();homeTodoFormat('bold')"><b>B</b></button>
        <button type="button" onmousedown="event.preventDefault();homeTodoFormat('normal')">기본</button>
      </div>
      <div id="homeTodoEditor" class="home-todo-editor" contenteditable="true" data-placeholder="할 일을 입력하세요">${initial}</div>
    </div>
    <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteHomeTodoModal">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button type="button" class="accent-btn" id="saveHomeTodo">저장</button></div>
  </div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteHomeTodoModal').onclick=()=>{deleteHomeTodo(existing.id);closeModal();};
  $('#saveHomeTodo').onclick=()=>{
    const editor=$('#homeTodoEditor'),richHtml=safeHomeTodoHtml(editor.innerHTML),text=homeTodoText(richHtml);
    if(!text){editor.focus();return;}
    if(existing){existing.richHtml=richHtml;existing.text=text;}
    else state.homeTodos.push({id:uid(),text,richHtml,done:false,createdAt:new Date().toISOString()});
    save();closeModal();
  };
  setTimeout(()=>$('#homeTodoEditor')?.focus(),0);
}
window.openHomeTodoModal=openHomeTodoModal;

window.setWorkStatus=(m,v)=>{state.memberStatus=state.memberStatus||{};state.memberStatus[m]=v;save();};
window.toggleRemoteDay=(m,day)=>{
  state.memberRemoteDays=state.memberRemoteDays||{};
  const days=Array.isArray(state.memberRemoteDays[m])?[...state.memberRemoteDays[m]]:[];
  const i=days.indexOf(day);
  if(i>=0)days.splice(i,1);else days.push(day);
  const order=['월','화','수','목','금'];
  state.memberRemoteDays[m]=days.sort((a,b)=>order.indexOf(a)-order.indexOf(b));
  save();
};
window.openTodoFor=m=>openModal('todoModal',null,{assignee:m});

let uploadFilter={channel:'전체',type:'전체',assignee:'전체',status:'전체'};
function uploadAssignees(x){return Array.isArray(x.assignees)&&x.assignees.length?x.assignees:(x.assignee?[x.assignee]:[]);}
function linkedAd(x){return x?.adId?(state.ads||[]).find(a=>a.id===x.adId):null;}
function adOptionLabel(a){return `${a.brand||'브랜드 미정'} · ${a.channel||'채널 미정'}${a.month?` · ${a.month}`:''}`;}

function inferredEditRange(x,m){
  if(x.editRanges&&x.editRanges[m]&&x.editRanges[m].start&&x.editRanges[m].end)return x.editRanges[m];
  if(!x.date)return {start:'',end:''};
  const d=new Date(x.date+'T00:00:00'),e=new Date(d),st=new Date(d);e.setDate(e.getDate()-2);st.setDate(st.getDate()-14);return {start:localDate(st),end:localDate(e)};
}
function renderUploads(){
  const buttons=(label,key,opts)=>`<div class="filter-row"><b>${label}</b>${opts.map(o=>`<button class="${uploadFilter[key]===o?'active':''}" onclick="setUploadFilter('${key}','${o}')">${o}</button>`).join('')}</div>`;
  $('#uploadControls').innerHTML=`${buttons('채널','channel',['전체',...channels])}${buttons('유형','type',['전체','롱폼','쇼츠','기타'])}${buttons('담당자','assignee',['전체',...members])}${buttons('상태','status',['전체',...uploadStatuses])}`;
  const data=state.uploads.filter(x=>{
    if(uploadFilter.channel!=='전체'&&x.channel!==uploadFilter.channel)return false;
    if(uploadFilter.type!=='전체'&&x.type!==uploadFilter.type)return false;
    if(uploadFilter.status!=='전체'&&x.status!==uploadFilter.status)return false;
    if(uploadFilter.assignee!=='전체'&&!uploadAssignees(x).includes(uploadFilter.assignee))return false;
    return true;
  }).sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999'));
  const weeks=[];data.forEach(x=>{const d=new Date((x.date||localDate())+'T00:00:00');const monday=new Date(d);monday.setDate(d.getDate()-((d.getDay()+6)%7));const key=localDate(monday);let w=weeks.find(q=>q.key===key);if(!w){w={key,monday,items:[]};weeks.push(w)}w.items.push(x)});
  $('#uploadSchedule').innerHTML=weeks.length?weeks.map(w=>{const left=w.items.filter(x=>x.channel==='주우재'),mid=w.items.filter(x=>x.channel==='이혜영'),right=w.items.filter(x=>x.channel==='도운');const card=x=>`<div class="upload-card ${channelClass[x.channel]}" onclick="editItem('uploads','${x.id}')"><div>${channelPill(x.channel)} <b>${esc(x.title)}</b>${x.sevenNeed?'<span class="seven-star">⭐ 광고 영상</span>':''}${linkedAd(x)?`<span class="linked-ad-badge">AD · ${esc(linkedAd(x).brand||'광고')}</span>`:''}</div><span>${esc(uploadAssignees(x).join(', ')||'미정')} &nbsp; ↑ ${esc(x.date||'미정')}</span><em>${statusBadge(x.status)}</em></div>`;return `<div class="week-row"><div class="week-date"><b>${fmtDate(w.key)}</b><small>${w.monday.getMonth()+1}월 ${Math.ceil(w.monday.getDate()/7)}주</small></div><div class="week-channel">${left.map(card).join('')||'<i>—</i>'}</div><div class="week-channel">${mid.map(card).join('')||'<i>—</i>'}</div><div class="week-channel">${right.map(card).join('')||'<i>—</i>'}</div></div>`}).join(''):'<div class="empty large-empty">조건에 맞는 업로드 일정이 없어요.</div>';
  renderEditTimeline(data.length?data:state.uploads);
}
window.setUploadFilter=(k,v)=>{uploadFilter[k]=v;renderUploads();};
function eachDate(start,end){const arr=[],d=new Date(start+'T00:00:00'),e=new Date(end+'T00:00:00');while(d<=e){arr.push(localDate(d));d.setDate(d.getDate()+1)}return arr;}
function renderEditTimeline(items){
  const assignments=[];
  items.forEach(x=>uploadAssignees(x).forEach(m=>{const r=inferredEditRange(x,m);if(r.start&&r.end)assignments.push({item:x,member:m,start:r.start,end:r.end})}));
  const milestoneDates=items.flatMap(x=>[x.firstDraftDate,x.date].filter(Boolean));
  if(!assignments.length&&!milestoneDates.length){$('#editTimeline').innerHTML='<div class="empty large-empty">담당자를 선택하고 편집 기간을 입력하면 타임라인이 표시돼요.</div>';return;}
  const starts=[...assignments.map(a=>a.start),...milestoneDates].filter(Boolean).sort();
  const ends=[...assignments.map(a=>a.end),...milestoneDates].filter(Boolean).sort();
  let min=starts[0],max=ends.slice(-1)[0];
  let sd=new Date(min+'T00:00:00'),ed=new Date(max+'T00:00:00');sd.setDate(sd.getDate()-2);ed.setDate(ed.getDate()+3);min=localDate(sd);max=localDate(ed);
  const days=eachDate(min,max),dayW=34,labelW=92,totalW=labelW+days.length*dayW;
  const monthSpans=[];let cur=null;days.forEach((ds,i)=>{const d=new Date(ds+'T00:00:00'),key=`${d.getFullYear()}-${d.getMonth()+1}`;if(!cur||cur.key!==key){cur={key,label:`${d.getFullYear()}년 ${d.getMonth()+1}월`,start:i,count:0};monthSpans.push(cur)}cur.count++});
  const header=`<div class="timeline-canvas" style="width:${totalW}px"><div class="timeline-months" style="padding-left:${labelW}px">${monthSpans.map(m=>`<div style="width:${m.count*dayW}px">${m.label}</div>`).join('')}</div><div class="timeline-days" style="padding-left:${labelW}px">${days.map(ds=>{const d=new Date(ds+'T00:00:00'),wk=d.getDay(),weekend=wk===0||wk===6;return `<div class="${weekend?'weekend':''}" style="width:${dayW}px">${d.getDate()}</div>`}).join('')}</div>`;
  const rows=members.map(m=>{
    const memberAssignments=assignments.filter(a=>a.member===m);
    const bars=memberAssignments.map(a=>{const si=days.indexOf(a.start),ei=days.indexOf(a.end);if(si<0||ei<0)return '';const left=labelW+si*dayW+3,width=(ei-si+1)*dayW-6;return `<button class="timeline-bar ${channelClass[a.item.channel]} ${a.item.sevenNeed?'save-needed':''}" style="left:${left}px;width:${width}px" onclick="editItem('uploads','${a.item.id}')" title="${esc(a.item.title)}">${a.item.sevenNeed?'⭐ ':''}${esc(a.item.title)}</button>`}).join('');
    const milestones=memberAssignments.map(a=>{
      const marks=[];
      if(a.item.firstDraftDate){const i=days.indexOf(a.item.firstDraftDate);if(i>=0){const left=labelW+i*dayW+dayW/2;marks.push(`<button class="timeline-milestone draft" style="left:${left}px" onclick="editItem('uploads','${a.item.id}')" title="1차 가편 공유 · ${esc(a.item.title)}">✔️</button>`);}}
      if(a.item.date){const i=days.indexOf(a.item.date);if(i>=0){const left=labelW+i*dayW+dayW/2;marks.push(`<button class="timeline-milestone upload" style="left:${left}px" onclick="editItem('uploads','${a.item.id}')" title="업로드일 · ${esc(a.item.title)}">💟</button>`);}}
      return marks.join('');
    }).join('');
    return `<div class="timeline-row" style="width:${totalW}px"><div class="timeline-person">${m}</div>${days.map((ds,i)=>{const d=new Date(ds+'T00:00:00'),weekend=[0,6].includes(d.getDay());return `<span class="timeline-cell ${weekend?'weekend':''}" style="left:${labelW+i*dayW}px;width:${dayW}px"></span>`}).join('')}${bars}${milestones}</div>`;
  }).join('');
  $('#editTimeline').innerHTML=`${header}${rows}</div><div class="timeline-legend"><span>✔️ 1차 가편 공유</span><span>💟 업로드일</span></div>`;
}
function openUploadModal(id=null){
  const existing=id?state.uploads.find(x=>x.id===id):null;
  const vals=existing||{channel:channels[0],type:'롱폼',title:'',date:localDate(),status:'기획',sevenNeed:false,firstDraftDate:'',adId:'',memo:''};
  const selected=uploadAssignees(vals),ranges=Object.fromEntries(members.map(m=>[m,inferredEditRange(vals,m)]));
  const adOptions=(channel,selectedId='')=>{
    const same=(state.ads||[]).filter(a=>a.channel===channel);
    const linked=selectedId?(state.ads||[]).find(a=>a.id===selectedId):null;
    const list=[...same]; if(linked&&!list.some(a=>a.id===linked.id))list.unshift(linked);
    return `<option value="">광고 선택</option>${list.map(a=>`<option value="${a.id}" ${a.id===selectedId?'selected':''}>${esc(adOptionLabel(a))}</option>`).join('')}`;
  };
  $('#modalRoot').innerHTML=`<div class="modal-backdrop upload-modal-backdrop"><div class="modal upload-edit-modal"><div class="modal-head"><h3>${existing?'업로드 일정 수정':'업로드 일정 추가'}</h3><button class="icon-btn" id="closeModal">×</button></div><form id="uploadEditForm"><div class="upload-form-grid">
    <label>채널<select name="channel" id="uploadChannelSelect">${channels.map(ch=>`<option ${ch===vals.channel?'selected':''}>${ch}</option>`).join('')}</select></label>
    <div class="upload-type-block"><span>영상 유형</span><div class="upload-type-options">${['롱폼','쇼츠','기타'].map(t=>`<label class="type-option"><input type="radio" name="type" value="${t}" ${t===(vals.type||'롱폼')?'checked':''}><span>${t==='롱폼'?'🎬':t==='쇼츠'?'📱':'▣'} ${t}</span></label>`).join('')}</div></div>
    <label class="full">영상 제목<input name="title" value="${esc(vals.title||'')}" required></label>
    <div class="full assignee-editor"><div class="field-label">담당자 <em>(선택하면 편집 기간 입력 가능)</em></div>${members.map(m=>`<div class="assignee-range-row"><label class="assignee-check"><input type="checkbox" name="assignees" value="${m}" ${selected.includes(m)?'checked':''}><span>${m}</span></label><div class="range-inputs ${selected.includes(m)?'':'disabled hidden-until-selected'}" data-range="${m}"><input type="date" data-start="${m}" value="${esc(ranges[m]?.start||'')}"><span>~</span><input type="date" data-end="${m}" value="${esc(ranges[m]?.end||'')}"></div></div>`).join('')}</div>
    <label>예정 업로드일<input type="date" name="date" value="${esc(vals.date||'')}"></label>
    <label>상태<select name="status">${(vals.status==='검수중'?[...uploadStatuses,'검수중']:uploadStatuses).map(st=>`<option ${st===vals.status?'selected':''}>${st}${st==='검수중'?' (기존)':''}</option>`).join('')}</select></label>
    <label class="full seven-check ad-video-check"><input type="checkbox" name="sevenNeed" ${vals.sevenNeed?'checked':''}><span>⭐️ 광고 영상</span></label>
    <label class="full upload-ad-link-field ${vals.sevenNeed?'':'hidden'}" id="uploadAdLinkField">어떤 광고인가요?
      <select name="adId" id="uploadAdSelect">${adOptions(vals.channel,vals.adId||'')}</select>
      <small>${(state.ads||[]).length?'광고 탭에 등록된 같은 채널의 광고가 표시돼요.':'광고 탭에 광고 건을 먼저 등록해주세요.'}</small>
    </label>
    <label class="full first-draft-field ${vals.sevenNeed?'':'hidden'}" id="firstDraftDateField">1차 가편본 전달일<input type="date" name="firstDraftDate" value="${esc(vals.firstDraftDate||'')}"></label>
    <label class="full">메모 (선택)<textarea name="memo" placeholder="추가 메모가 있다면 입력하세요!">${esc(vals.memo||'')}</textarea></label>
  </div><div class="modal-actions upload-actions">${existing?'<button type="button" class="danger-btn" id="deleteUpload">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div></form></div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;

  const setAssigneeRangeToToday=(member)=>{
    if(existing)return;
    const startInput=document.querySelector(`[data-start="${member}"]`);
    const endInput=document.querySelector(`[data-end="${member}"]`);
    if(!startInput||!endInput)return;
    const today=localDate();
    startInput.value=today;
    endInput.value=today;
  };

  $$('input[name="assignees"]').forEach(cb=>cb.addEventListener('change',()=>{
    const box=document.querySelector(`[data-range="${cb.value}"]`);
    if(!box)return;
    box.classList.toggle('disabled',!cb.checked);
    box.classList.toggle('hidden-until-selected',!cb.checked);
    if(cb.checked)setAssigneeRangeToToday(cb.value);
  }));

  const adVideoCb=document.querySelector('input[name="sevenNeed"]'),firstDraftField=$('#firstDraftDateField'),adLinkField=$('#uploadAdLinkField'),adSelect=$('#uploadAdSelect'),channelSelect=$('#uploadChannelSelect');
  adVideoCb?.addEventListener('change',()=>{const on=adVideoCb.checked;firstDraftField.classList.toggle('hidden',!on);adLinkField.classList.toggle('hidden',!on);if(!on){firstDraftField.querySelector('input').value='';adSelect.value='';}});
  channelSelect?.addEventListener('change',()=>{adSelect.innerHTML=adOptions(channelSelect.value,adSelect.value);});
  if(existing)$('#deleteUpload').onclick=()=>{deleteById('uploads',existing.id);closeModal();};
  $('#uploadEditForm').onsubmit=e=>{
    e.preventDefault();const fd=new FormData(e.target),assignees=fd.getAll('assignees'),isAdVideo=fd.get('sevenNeed')==='on';
    const obj={channel:fd.get('channel'),type:fd.get('type'),title:fd.get('title').trim(),date:fd.get('date'),status:fd.get('status'),sevenNeed:isAdVideo,adId:isAdVideo?(fd.get('adId')||''):'',firstDraftDate:isAdVideo?(fd.get('firstDraftDate')||''):'',memo:fd.get('memo')||'',assignees,assignee:assignees[0]||'',editRanges:{}};
    assignees.forEach(m=>{obj.editRanges[m]={start:document.querySelector(`[data-start="${m}"]`).value,end:document.querySelector(`[data-end="${m}"]`).value};});
    if(existing)Object.assign(existing,obj);else state.uploads.push({id:uid(),...obj});save();closeModal();
  };
}
window.openUploadModal=openUploadModal;

let shootVisibleCounts=Object.fromEntries(channels.map(ch=>[ch,10]));

function shootDates(x){
  if(Array.isArray(x.dates)&&x.dates.length)return x.dates.map(d=>typeof d==='string'?{date:d,memo:''}:d).filter(d=>d.date);
  return x.date?[{date:x.date,memo:x.dateMemo||''}]:[];
}
function shootMembers(x){
  if(Array.isArray(x.members))return x.members;
  const legacy=[...(x.assignee?[x.assignee]:[]),...String(x.crew||'').split(',').map(v=>v.trim()).filter(v=>members.includes(v))];
  return [...new Set(legacy)];
}
function openShootModal(id=null){
  const existing=id?state.shoots.find(x=>x.id===id):null;
  const vals=existing||{channel:channels[0],title:'',date:localDate(),dates:[{date:localDate(),memo:''}],members:[],selfCam:false,crew:'',method:'PD 자체 촬영',notes:''};
  const selected=shootMembers(vals),dates=shootDates(vals);
  const dateRows=(dates.length?dates:[{date:localDate(),memo:''}]).map((d,i)=>`<div class="shoot-date-row" data-shoot-date-row><input type="date" name="shootDate" value="${esc(d.date||'')}"><input name="shootDateMemo" value="${esc(d.memo||'')}" placeholder="메모 (선택)"><button type="button" class="shoot-date-remove" title="촬영일 삭제">×</button></div>`).join('');
  $('#modalRoot').innerHTML=`<div class="modal-backdrop shoot-modal-backdrop"><div class="modal shoot-preset-modal">
    <div class="modal-head"><div><small>${existing?'촬영 수정':'촬영 추가'}</small><h3>${existing?esc(vals.title||'촬영 정보'):'새 촬영 등록'}</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="shootPresetForm">
      <div class="shoot-preset-body">
        <label class="shoot-field">채널<select name="channel">${channels.map(ch=>`<option ${ch===vals.channel?'selected':''}>${ch}</option>`).join('')}</select></label>
        <label class="shoot-field">영상 / 촬영 제목<input name="title" value="${esc(vals.title||'')}" placeholder="촬영 제목을 입력하세요" required></label>
        <div class="shoot-field"><span>📅 촬영일</span><div id="shootDateRows" class="shoot-date-rows">${dateRows}</div><button type="button" class="shoot-date-add" id="addShootDate">+ 촬영일 추가</button></div>
        <div class="shoot-field"><span>📋 촬영 멤버</span><div class="shoot-member-chips">${members.map(m=>`<label><input type="checkbox" name="members" value="${m}" ${selected.includes(m)?'checked':''}><span>${m}</span></label>`).join('')}<label class="selfcam-chip"><input type="checkbox" name="selfCam" ${vals.selfCam||vals.method==='셀프캠'?'checked':''}><span>셀프캠</span></label></div></div>
        <label class="shoot-field">🎥 촬영팀<input name="crew" value="${esc(vals.crew||'')}" placeholder="예: 해리, 듀크, 외주1"></label>
        <div class="shoot-field"><span>촬영 방식</span><div class="shoot-method-options">${['장비불출 (PD 자체 촬영)','촬영팀 동행','해당없음 (셀프캠)'].map((t,i)=>{const value=i===0?'PD 자체 촬영':i===1?'촬영팀 동행':'셀프캠';return `<label><input type="radio" name="method" value="${value}" ${value===(vals.method||'PD 자체 촬영')?'checked':''}><span>${i===0?'🎒':i===1?'📹':'🦿'} ${t}</span></label>`}).join('')}</div></div>
        <label class="shoot-field">📝 촬영 준비사항 / 유의사항<textarea name="notes" placeholder="예: 조명 세팅 필요, 의상 미리 준비 등">${esc(vals.notes||'')}</textarea></label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteShoot">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div>
    </form>
  </div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteShoot').onclick=()=>{deleteById('shoots',existing.id);closeModal();};
  const bindShootDateRows=()=>{$$('[data-shoot-date-row]').forEach(row=>{const btn=row.querySelector('.shoot-date-remove');if(btn)btn.onclick=()=>{const rows=$$('[data-shoot-date-row]');if(rows.length===1){row.querySelector('input[type="date"]').value='';row.querySelector('input[name="shootDateMemo"]').value='';return;}row.remove();};});};
  bindShootDateRows();
  $('#addShootDate').onclick=()=>{const box=$('#shootDateRows'),row=document.createElement('div');row.className='shoot-date-row';row.setAttribute('data-shoot-date-row','');row.innerHTML=`<input type="date" name="shootDate"><input name="shootDateMemo" placeholder="메모 (선택)"><button type="button" class="shoot-date-remove" title="촬영일 삭제">×</button>`;box.appendChild(row);bindShootDateRows();};
  const crewInput=document.querySelector('input[name="crew"]');
  crewInput?.addEventListener('input',()=>{if(crewInput.value.trim()){const r=document.querySelector('input[name="method"][value="촬영팀 동행"]');if(r)r.checked=true;}});
  const selfCb=document.querySelector('input[name="selfCam"]');
  selfCb?.addEventListener('change',()=>{if(selfCb.checked){const r=document.querySelector('input[name="method"][value="셀프캠"]');if(r)r.checked=true;}});
  $('#shootPresetForm').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target),selectedMembers=fd.getAll('members'),selfCam=fd.get('selfCam')==='on';const dateInputs=$$('input[name="shootDate"]'),memoInputs=$$('input[name="shootDateMemo"]'),dates=dateInputs.map((el,i)=>({date:el.value,memo:memoInputs[i]?.value||''})).filter(x=>x.date);const firstDate=dates[0]||{date:'',memo:''};const obj={channel:fd.get('channel'),title:fd.get('title').trim(),date:firstDate.date,dateMemo:firstDate.memo,dates,members:selectedMembers,selfCam,assignee:selectedMembers[0]||'',crew:fd.get('crew')||'',method:selfCam?'셀프캠':fd.get('method'),notes:fd.get('notes')||'',equipment:''};if(existing)Object.assign(existing,obj);else state.shoots.push({id:uid(),...obj});save();closeModal();};
}
window.openShootModal=openShootModal;

function shootPdChip(name){
  const c=memberColors[name]||{bg:'#f1f1ef',line:'#888'};
  return `<span class="shoot-person-chip shoot-pd-chip" style="--chip-bg:${c.bg};--chip-color:${c.line}">${esc(name)}</span>`;
}
function shootCrewChips(crew){
  const names=String(crew||'').split(',').map(v=>v.trim()).filter(Boolean);
  if(!names.length)return '';
  return names.map(n=>`<span class="shoot-person-chip shoot-camera-chip">${esc(n)}</span>`).join('');
}
function renderShoots(){
  const total=state.shoots.length,equip=state.shoots.filter(x=>x.equipment&&x.equipment!=='없음'&&x.method!=='셀프캠').length,crew=state.shoots.filter(x=>x.method==='촬영팀 동행').length,self=state.shoots.filter(x=>x.method==='셀프캠').length;
  $('#shootSummary').innerHTML=`<div class="summary-box green"><small>🎒 장비불출</small><strong>${equip}건</strong><span>/ 촬영 ${total}건 · ${total?Math.round(equip/total*100):0}%</span></div><div class="summary-box"><small>🎥 촬영팀 동행</small><strong>${crew}건</strong><span>/ ${total?Math.round(crew/total*100):0}%</span></div><div class="summary-box gray"><small>🦿 해당없음 (셀프캠)</small><strong>${self}건</strong><span>비율 제외</span></div>`;
  $('#shootColumns').innerHTML=channels.map(ch=>{
    const arr=state.shoots.filter(x=>x.channel===ch).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    const limit=shootVisibleCounts[ch]||10,shown=arr.slice(0,limit),remain=Math.max(0,arr.length-limit),next=Math.min(10,remain);
    const cards=shown.length?shown.map(x=>`<article class="shoot-card ${channelClass[ch]}" onclick="editItem('shoots','${x.id}')"><div class="shoot-card-head"><h4>${esc(x.title)}</h4><time>${shootDates(x).map(d=>fmtDate(d.date)+(d.memo?` ${esc(d.memo)}`:'')).join(' · ')||'-'}</time></div><div class="crew-chips">${shootMembers(x).map(shootPdChip).join('')}${shootCrewChips(x.crew)}${x.selfCam||x.method==='셀프캠'?'<span class="shoot-person-chip shoot-selfcam-chip">셀프캠</span>':''}</div><small>${esc(x.method||'촬영 방식 미정')}</small>${x.notes?`<em>${esc(x.notes)}</em>`:''}</article>`).join(''):'<div class="empty">등록된 촬영이 없어요.</div>';
    return `<section class="channel-col"><h3>${channelPill(ch)}</h3><p>촬영 ${arr.length}건</p><div class="shoot-list">${cards}</div>${remain?`<button class="shoot-more-btn" onclick="showMoreShoots('${ch}')">지난 촬영 ${next}건 펼치기 <span>↓</span></button>`:''}</section>`;
  }).join('');
}
window.showMoreShoots=ch=>{shootVisibleCounts[ch]=(shootVisibleCounts[ch]||10)+10;renderShoots();};

function formatAdMoney(v){
  const n=Number(v||0);
  if(n>=100000000)return `${(n/100000000).toFixed(n%100000000===0?0:1)}억원`;
  return `${Math.round(n/10000).toLocaleString()}만원`;
}
function adDisplayMonth(x){
  if(x?.final){
    const parts=String(x.final).split('-');
    if(parts.length>=2)return `${parts[0]}.${parts[1]}`;
  }
  return x?.month||'최종본 전달일 미정';
}
function adTypeBadge(type){
  const v=type||'BDC';
  const cls={'BDC':'bdc','기획PPL':'planned','단순PPL':'simple','쇼츠':'shorts'}[v]||'legacy';
  return `<span class="ad-type ad-type-${cls}">${esc(v)}</span>`;
}
function adStatusBadge(status){
  const v=status||'내부 논의중';
  const cls={'내부 논의중':'internal','소속사 논의중':'agency','구성안 작성중':'proposal','촬영 완료':'shot','업로드 완료':'uploaded'}[v]||'legacy';
  return `<span class="ad-status-badge ad-status-${cls}">${esc(v)}</span>`;
}
function renderAds(){
  $('#adColumns').innerHTML=channels.map(ch=>{const arr=state.ads.filter(x=>x.channel===ch);return `<section class="channel-col ad-col"><h3>${channelPill(ch)}</h3><div>${arr.length?arr.map(x=>`<article class="ad-row ${channelClass[ch]} ${x.status==='업로드 완료'?'ad-completed':''}" onclick="editItem('ads','${x.id}')"><div>${adTypeBadge(x.adType)}<b>${esc(x.brand)}</b><small>${esc(adDisplayMonth(x))}</small></div>${adStatusBadge(x.status)}</article>`).join(''):'<div class="empty">등록된 광고가 없어요.</div>'}</div></section>`}).join('');
  state.adTargets=state.adTargets||{};
  $('#adKpi').innerHTML=channels.map(ch=>{
    const arr=state.ads.filter(x=>x.channel===ch),amt=arr.reduce((s,x)=>s+Number(x.amount||0),0);
    const target=Number(state.adTargets[ch]||0);
    const rate=target>0?(amt/target*100):null;
    return `<div class="kpi ${channelClass[ch]}">
      ${channelPill(ch)} <b>KPI</b>
      <div class="ad-kpi-grid">
        <span>진행 건수<strong>${arr.length}건</strong></span>
        <span>진행 금액<strong>${formatAdMoney(amt)}</strong></span>
        <span class="ad-target-cell" onclick="setAdTarget('${ch}')">목표 금액<strong>${target>0?formatAdMoney(target):'아직 설정 안됨'}</strong><small>클릭해서 설정</small></span>
        <span>달성률<strong>${rate===null?'—':`${rate.toFixed(1)}%`}</strong>${rate!==null?`<small>${rate>=100?'목표 달성':'진행 중'}</small>`:''}</span>
      </div>
    </div>`;
  }).join('');
}
window.setAdTarget=ch=>{
  state.adTargets=state.adTargets||{};
  const current=Number(state.adTargets[ch]||0);
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal ad-target-modal">
    <div class="modal-head"><div><small>${esc(ch)} 광고 KPI</small><h3>목표 금액 설정</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="adTargetForm">
      <label class="ad-target-input-label">목표 금액
        <div class="ad-target-input-wrap"><input type="number" name="target" min="0" step="10000" value="${current||''}" placeholder="0"><span>원</span></div>
      </label>
      <p class="ad-target-guide">진행 금액을 기준으로 달성률이 자동 계산돼요.</p>
      <div class="modal-actions"><span></span><span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div>
    </form>
  </div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  $('#adTargetForm').onsubmit=e=>{
    e.preventDefault();
    const value=Number(new FormData(e.target).get('target')||0);
    state.adTargets[ch]=value>0?value:null;save();closeModal();
  };
};


function meetingMonthData(year,month){return state.meetings.filter(x=>{if(!x.date)return false;const d=new Date(x.date+'T00:00:00');return d.getFullYear()===year&&d.getMonth()+1===month;});}
function normalizeMeetingSections(meeting){
  meeting.sections=meetingSectionDefs.map(def=>{
    const old=(meeting.sections||[]).find(s=>s.tone===def.tone || s.title===def.title);
    return {title:def.title,tone:def.tone,items:[...(old?.items||[])]};
  });
  return meeting.sections;
}
function renderMeetingsLanding(){
  $('#meetingDetail').classList.add('hidden');$('#meetingLanding').classList.remove('hidden');const now=new Date(),year=now.getFullYear(),cur=now.getMonth()+1;
  $('#meetingLanding').innerHTML=`<div class="page-head"><div><h1>회의</h1></div><strong class="meeting-year">${year}년</strong></div><div class="month-grid">${Array.from({length:12},(_,i)=>i+1).map(m=>`<button class="month-tile ${m===cur?'current':''}" onclick="openMeetingMonth(${year},${m})"><strong>${m}월</strong>${m===cur?'<span>이번 달</span>':''}<small>${meetingMonthData(year,m).length?meetingMonthData(year,m).length+'개 회의록':''}</small></button>`).join('')}</div>`;
}
window.openMeetingMonth=(year,month)=>{renderMeetingMonth(year,month,'1');};

function sanitizeMeetingRich(html){
  const box=document.createElement('div');box.innerHTML=String(html||'');
  const walk=node=>{
    if(node.nodeType===Node.TEXT_NODE)return esc(node.nodeValue||'');
    if(node.nodeType!==Node.ELEMENT_NODE)return '';
    const tag=node.tagName.toUpperCase();
    const inner=[...node.childNodes].map(walk).join('');
    if(tag==='STRONG'||tag==='B')return `<strong>${inner}</strong>`;
    if(tag==='BR')return '<br>';
    if(tag==='DIV'||tag==='P')return `${inner}<br>`;
    return inner;
  };
  return [...box.childNodes].map(walk).join('').replace(/(?:<br>){3,}/g,'<br><br>').replace(/<br>$/,'');
}
function meetingPlainTextFromHtml(html){
  const box=document.createElement('div');box.innerHTML=String(html||'');return (box.innerText||box.textContent||'').trim();
}
window.toggleMeetingBold=()=>{
  const editor=$('#meetingItemEditor');if(!editor)return;
  editor.focus();
  document.execCommand('bold',false,null);
};
function renderMeetingMonth(year,month,week='1'){
  $('#meetingLanding').classList.add('hidden');$('#meetingDetail').classList.remove('hidden');
  const arr=meetingMonthData(year,month);let selected=arr.find(x=>String(x.week||'1')===String(week));
  if(!selected){
    selected={id:uid(),title:`${month}월 ${week}주차 회의`,date:`${year}-${String(month).padStart(2,'0')}-${String(Math.min(28,(Number(week)-1)*7+1)).padStart(2,'0')}`,week:String(week),sections:meetingSectionDefs.map(x=>({...x,items:[]}))};
    state.meetings.push(selected);localStorage.setItem('teamDashDataV3',JSON.stringify(state));
  }
  normalizeMeetingSections(selected);
  const activeWeek=String(selected.week||week);
  const itemHTML=(it,ii,si)=>{
    const obj=typeof it==='string'?{text:it,format:'bullet',mentions:[],related:''}:it;
    const icon=obj.format==='check'?`<button type="button" class="meeting-check ${obj.checked?'checked':''}" onclick="event.stopPropagation();toggleMeetingCheck('${selected.id}',${si},${ii})" aria-label="체크">${obj.checked?'✓':''}</button>`:'<span class="meeting-bullet">•</span>';
    const mentions=(obj.mentions||[]).map(m=>`<span class="meeting-mention">@${esc(m)}</span>`).join('');
    const related=obj.related?`<small class="meeting-related">↳ ${esc(obj.related)}</small>`:'';
    return `<div class="meeting-item ${obj.format==='check'?'check-item':''} ${obj.checked?'checked-item':''}"><span class="meeting-item-icon">${icon}</span><div class="meeting-item-body"><span>${autoLinkHtml(obj.richHtml?sanitizeMeetingRich(obj.richHtml):esc(obj.text||''))}</span>${related}${mentions?`<div class="meeting-mentions-inline">${mentions}</div>`:''}</div><div class="meeting-item-actions"><button onclick="editMeetingItem('${selected.id}',${si},${ii})">수정</button><button onclick="deleteMeetingItem('${selected.id}',${si},${ii})">×</button></div></div>`;
  };
  $('#meetingDetail').innerHTML=`<div class="meeting-detail-head"><button class="back-btn" onclick="renderMeetingsLanding()">← 뒤로</button><h1>${year}년 ${month}월 회의록</h1></div>
  <div class="week-tabs">${['1','2','3','4','5'].map(w=>`<button class="${activeWeek===w?'active':''}" onclick="renderMeetingMonth(${year},${month},'${w}')">${w}주차</button>`).join('')}<button class="week-plus" onclick="addMeetingWeek(${year},${month})">+ 주차</button></div>
  <div class="meeting-meta">${esc(selected.date)} 작성 <button class="del" onclick="deleteById('meetings','${selected.id}')">이 주차 삭제</button></div>
  <div class="meeting-sections">${selected.sections.map((sec,si)=>`<section class="meeting-section ${esc(sec.tone)}">
    <h3>${esc(sec.title)}</h3>
    <div class="meeting-items">${sec.items.length?sec.items.map((it,ii)=>itemHTML(it,ii,si)).join(''):''}</div>
    <div class="meeting-inline-add"><button class="meeting-add-btn" onclick="openMeetingItemModal('${selected.id}',${si})">+ 항목 추가</button></div>
  </section>`).join('')}</div>`;
}
window.renderMeetingMonth=renderMeetingMonth;window.renderMeetingsLanding=renderMeetingsLanding;
window.toggleMeetingCheck=(meetingId,sectionIndex,itemIndex)=>{
  const m=state.meetings.find(x=>x.id===meetingId);if(!m)return;normalizeMeetingSections(m);
  const raw=m.sections?.[sectionIndex]?.items?.[itemIndex];if(raw==null)return;
  if(typeof raw==='string'){
    m.sections[sectionIndex].items[itemIndex]={text:raw,richHtml:esc(raw),format:'check',mentions:[],related:'',checked:true};
  }else{
    raw.checked=!Boolean(raw.checked);
  }
  localStorage.setItem('teamDashDataV3',JSON.stringify(state));
  renderMeetingMonth(new Date(m.date+'T00:00:00').getFullYear(),new Date(m.date+'T00:00:00').getMonth()+1,String(m.week||'1'));
};

function meetingRelatedOptions(){
  const rows=[
    ...state.uploads.map(x=>`업로드 · ${x.title}`),
    ...state.shoots.map(x=>`촬영 · ${x.title}`),
    ...state.ads.map(x=>`광고 · ${x.brand}`)
  ];
  return [...new Set(rows)].slice(0,60);
}
window.openMeetingItemModal=(meetingId,sectionIndex,itemIndex=null)=>{
  const m=state.meetings.find(x=>x.id===meetingId);if(!m)return;normalizeMeetingSections(m);
  const sec=m.sections[sectionIndex];const raw=itemIndex===null?null:sec.items[itemIndex];
  const current=typeof raw==='string'?{text:raw,richHtml:esc(raw),format:'bullet',related:'',mentions:[]}:({...raw}); current.richHtml=current.richHtml||esc(current.text||'');
  const mentions=new Set(current.mentions||[]);
  const relatedOptions=meetingRelatedOptions();
  $('#modalRoot').innerHTML=`<div class="modal-backdrop meeting-modal-backdrop"><div class="meeting-item-modal">
    <div class="meeting-popup-head"><h3>${itemIndex===null?'항목 추가':'항목 수정'}</h3><button class="icon-btn" onclick="closeMeetingItemModal()">×</button></div>
    <div class="meeting-popup-group"><label>형식</label><div class="format-options">
      <label><input type="radio" name="meetingFormat" value="bullet" ${current.format!=='check'?'checked':''}><span>● 불릿 <em>(아이디어)</em></span></label>
      <label><input type="radio" name="meetingFormat" value="check" ${current.format==='check'?'checked':''}><span>□ 체크박스 <em>(할일)</em></span></label>
    </div></div>
    <div class="meeting-popup-group"><label>연관 아이템 <em>(선택 · 미지정 가능)</em></label><select id="meetingRelated"><option value="">— 미지정 —</option>${relatedOptions.map(o=>`<option ${o===current.related?'selected':''}>${esc(o)}</option>`).join('')}</select></div>
    <div class="meeting-popup-group"><label>내용 <em>· 글자를 선택한 뒤 B를 누르면 굵게 표시돼요</em></label>
      <div class="meeting-editor-wrap">
        <div class="meeting-editor-toolbar"><button type="button" class="meeting-bold-btn" onclick="toggleMeetingBold()" title="굵게"><strong>B</strong></button></div>
        <div id="meetingItemEditor" class="meeting-rich-editor" contenteditable="true" data-placeholder="회의 내용을 자유롭게 적어주세요">${sanitizeMeetingRich(current.richHtml||esc(current.text||''))}</div>
      </div>
    </div>
    <div class="meeting-popup-group"><label>멘션 <em>(클릭해서 추가)</em></label><div class="mention-picker">${members.map(name=>`<button type="button" class="mention-chip ${mentions.has(name)?'active':''}" data-name="${esc(name)}" onclick="toggleMeetingMention(this)">@${esc(name)}</button>`).join('')}</div></div>
    <div class="meeting-popup-actions"><button class="outline" onclick="closeMeetingItemModal()">취소</button><button class="accent-btn" onclick="saveMeetingPopup('${meetingId}',${sectionIndex},${itemIndex===null?'null':itemIndex})">저장</button></div>
  </div></div>`;
  setTimeout(()=>$('#meetingItemEditor')?.focus(),30);
};
window.toggleMeetingMention=btn=>btn.classList.toggle('active');
window.closeMeetingItemModal=()=>{$('#modalRoot').innerHTML='';};
window.saveMeetingPopup=(meetingId,sectionIndex,itemIndex)=>{
  const editor=$('#meetingItemEditor');const richHtml=sanitizeMeetingRich(editor?.innerHTML||'');const text=meetingPlainTextFromHtml(richHtml);if(!text){editor?.focus();return;}
  const m=state.meetings.find(x=>x.id===meetingId);if(!m)return;normalizeMeetingSections(m);
  const format=document.querySelector('input[name="meetingFormat"]:checked')?.value||'bullet';
  const related=$('#meetingRelated')?.value||'';
  const mentions=$$('.mention-chip.active').map(x=>x.dataset.name);
  const obj={text,richHtml,format,related,mentions};
  if(itemIndex===null||itemIndex==='null')m.sections[sectionIndex].items.push(obj);else m.sections[sectionIndex].items[Number(itemIndex)]=obj;
  closeMeetingItemModal();saveMeetingAndStay(m);
};
window.editMeetingItem=(meetingId,sectionIndex,itemIndex)=>openMeetingItemModal(meetingId,sectionIndex,itemIndex);
window.deleteMeetingItem=(meetingId,sectionIndex,itemIndex)=>{
  const m=state.meetings.find(x=>x.id===meetingId);if(!m)return;
  normalizeMeetingSections(m);
  const items=m.sections?.[sectionIndex]?.items;if(!items||!items[itemIndex])return;
  const removed=items[itemIndex];
  items.splice(itemIndex,1);saveMeetingAndStay(m);
  showDeleteUndo('회의록 항목이 삭제되었습니다',()=>{
    const meeting=state.meetings.find(x=>x.id===meetingId);if(!meeting)return;
    normalizeMeetingSections(meeting);
    const restoreItems=meeting.sections?.[sectionIndex]?.items;if(!restoreItems)return;
    restoreItems.splice(Math.min(itemIndex,restoreItems.length),0,removed);
    saveMeetingAndStay(meeting);
  });
};
function saveMeetingAndStay(m){localStorage.setItem('teamDashDataV3',JSON.stringify(state));const d=new Date(m.date+'T00:00:00');renderMeetingMonth(d.getFullYear(),d.getMonth()+1,String(m.week||'1'));renderHome();}
window.renderCurrentMeeting=(meetingId)=>{const m=state.meetings.find(x=>x.id===meetingId);if(!m)return;const d=new Date(m.date+'T00:00:00');renderMeetingMonth(d.getFullYear(),d.getMonth()+1,String(m.week||'1'));};
window.addMeetingWeek=(year,month)=>{const used=new Set(meetingMonthData(year,month).map(x=>String(x.week)));const w=['1','2','3','4','5'].find(x=>!used.has(x));if(w)renderMeetingMonth(year,month,w);};


let ideaView='active';
function renderIdeas(){
  state.ideas=Array.isArray(state.ideas)?state.ideas:[];
  const active=state.ideas.filter(x=>!x.archived), archived=state.ideas.filter(x=>x.archived);
  const ac=$('#ideaActiveCount'),rc=$('#ideaArchiveCount');
  if(ac)ac.textContent=active.length;if(rc)rc.textContent=archived.length;
  $$('#ideaTabs button').forEach(b=>b.classList.toggle('active',b.dataset.ideaView===ideaView));
  const list=(ideaView==='archive'?archived:active).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  const grid=$('#ideaGrid');if(!grid)return;
  grid.innerHTML=list.length?list.map(x=>{
    return `<article class="idea-card ${x.archived?'idea-archived':''}" onclick="openModal('ideaModal','${x.id}')">
      <div class="idea-card-top"><div class="idea-card-meta"><span class="idea-category">${esc(x.category||'기타')}</span><span class="idea-proposer">${esc(x.proposer||'미정')} PD</span></div><small>${esc(x.createdAt||'')}</small></div>
      <h3>${esc(x.title||'제목 없음')}</h3>
      <p>${autoLinkText(x.content||'')}</p>
      <div class="idea-card-actions">
        <button type="button" class="idea-archive-btn" onclick="event.stopPropagation();toggleIdeaArchive('${x.id}')">${x.archived?'↩ 다시 꺼내기':'보관'}</button>
      </div>
      <div class="idea-card-bottom"><span>✦ ${x.archived?'ARCHIVE':'IDEA'} <em class="idea-comment-count">💬 ${(x.comments||[]).length}</em></span><button type="button" onclick="event.stopPropagation();deleteById('ideas','${x.id}')">삭제</button></div>
    </article>`;
  }).join(''):`<div class="idea-empty"><strong>${ideaView==='archive'?'보관된 아이디어가 없어요.':'아직 저장된 아이디어가 없어요.'}</strong><p>${ideaView==='archive'?'아이디어 카드에서 보관을 누르면 이곳으로 이동해요.':'떠오르는 순간 바로 기록해보세요.'}</p>${ideaView==='active'?"<button class=\"accent-btn\" onclick=\"openModal('ideaModal')\">+ 첫 아이디어 작성</button>":''}</div>`;
}
window.toggleIdeaArchive=id=>{const item=state.ideas.find(x=>x.id===id);if(!item)return;item.archived=!item.archived;save();};
window.setIdeaView=view=>{ideaView=view;renderIdeas();};


function openIdeaModal(id=null,preset={}){
  state.ideas=Array.isArray(state.ideas)?state.ideas:[];
  const existing=id?state.ideas.find(x=>x.id===id):null;
  const vals={title:'',content:'',proposer:members[0],category:'기타',archived:false,comments:[],...existing,...preset};
  vals.comments=Array.isArray(vals.comments)?vals.comments:[];

  const commentRows=vals.comments.length?vals.comments.map(c=>ideaCommentHTML(c,id)).join(''):'<div class="idea-comment-empty">아직 댓글이 없어요.</div>';

  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal idea-detail-modal">
    <div class="modal-head"><div><small>${existing?'아이디어 수정':'아이디어 작성'}</small><h3>${existing?esc(vals.title||'아이디어'):'새 아이디어'}</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="ideaDetailForm">
      <div class="idea-detail-form">
        <label>아이디어 제목<input name="title" value="${esc(vals.title||'')}" required></label>
        <label>내용<textarea name="content" required>${esc(vals.content||'')}</textarea></label>
        <label>카테고리<select name="category">${ideaCategories.map(c=>`<option value="${c}" ${c===(vals.category||'기타')?'selected':''}>${c}</option>`).join('')}</select></label>
        <label>제안자<select name="proposer">${members.map(m=>`<option value="${m}" ${m===vals.proposer?'selected':''}>${m}</option>`).join('')}</select></label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteIdea">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div>
    </form>

    ${existing?`<section class="idea-comments-section">
      <div class="idea-comments-head"><h4>댓글 <span>${vals.comments.length}</span></h4></div>
      <div id="ideaCommentsList" class="idea-comments-list">${commentRows}</div>
      <div class="idea-comment-compose">
        <select id="ideaCommentAuthor">${members.map(m=>`<option value="${m}">${m}</option>`).join('')}</select>
        <input id="ideaCommentInput" placeholder="댓글을 입력하세요">
        <button type="button" onclick="addIdeaComment('${existing.id}')">등록</button>
      </div>
    </section>`:'<p class="idea-comment-save-hint">아이디어를 먼저 저장하면 댓글을 달 수 있어요.</p>'}
  </div></div>`;

  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteIdea').onclick=()=>{deleteById('ideas',existing.id);closeModal();};
  $('#ideaDetailForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const obj={title:String(fd.get('title')||'').trim(),content:String(fd.get('content')||'').trim(),category:String(fd.get('category')||'기타'),proposer:String(fd.get('proposer')||members[0])};
    if(existing){
      Object.assign(existing,obj);
      save();
      openIdeaModal(existing.id);
    }else{
      const created={id:uid(),...obj,createdAt:localDate(),archived:false,comments:[]};
      state.ideas.push(created);save();openIdeaModal(created.id);
    }
  };
}
function ideaCommentHTML(c,ideaId){
  const col=memberColors[c.author]||{bg:'#f4f4f2',line:'#999'};
  return `<div class="idea-comment-row" data-comment-id="${c.id}">
    <div class="idea-comment-avatar" style="background:${col.line}">${esc((c.author||'?')[0])}</div>
    <div class="idea-comment-main">
      <div class="idea-comment-meta"><b>${esc(c.author||'미정')}</b><small>${esc(c.createdAt||'')}</small></div>
      <p>${autoLinkText(c.text||'')}</p>
    </div>
    <div class="idea-comment-actions"><button onclick="editIdeaComment('${ideaId}','${c.id}')">수정</button><button onclick="deleteIdeaComment('${ideaId}','${c.id}')">삭제</button></div>
  </div>`;
}
window.addIdeaComment=ideaId=>{
  const idea=state.ideas.find(x=>x.id===ideaId);if(!idea)return;
  idea.comments=Array.isArray(idea.comments)?idea.comments:[];
  const author=$('#ideaCommentAuthor')?.value||members[0],text=$('#ideaCommentInput')?.value.trim()||'';
  if(!text){$('#ideaCommentInput')?.focus();return;}
  idea.comments.push({id:uid(),author,text,createdAt:new Date().toLocaleString('ko-KR',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})});
  save();openIdeaModal(ideaId);
};
window.editIdeaComment=(ideaId,commentId)=>{
  const idea=state.ideas.find(x=>x.id===ideaId);const c=idea?.comments?.find(x=>x.id===commentId);if(!c)return;
  const row=document.querySelector(`.idea-comment-row[data-comment-id="${commentId}"]`);
  if(!row)return;
  row.innerHTML=`<div class="idea-comment-edit">
    <select id="editIdeaCommentAuthor">${members.map(m=>`<option value="${m}" ${m===c.author?'selected':''}>${m}</option>`).join('')}</select>
    <input id="editIdeaCommentText" value="${esc(c.text||'')}">
    <button onclick="saveIdeaComment('${ideaId}','${commentId}')">저장</button>
    <button onclick="openIdeaModal('${ideaId}')">취소</button>
  </div>`;
};
window.saveIdeaComment=(ideaId,commentId)=>{
  const idea=state.ideas.find(x=>x.id===ideaId);const c=idea?.comments?.find(x=>x.id===commentId);if(!c)return;
  const text=$('#editIdeaCommentText')?.value.trim()||'';if(!text)return;
  c.author=$('#editIdeaCommentAuthor')?.value||c.author;c.text=text;save();openIdeaModal(ideaId);
};
window.deleteIdeaComment=(ideaId,commentId)=>{
  const idea=state.ideas.find(x=>x.id===ideaId);if(!idea)return;
  idea.comments=Array.isArray(idea.comments)?idea.comments:[];
  const index=idea.comments.findIndex(x=>x.id===commentId);if(index<0)return;
  const removed=idea.comments[index];idea.comments.splice(index,1);save();openIdeaModal(ideaId);
  showDeleteUndo('댓글이 삭제되었습니다',()=>{
    const target=state.ideas.find(x=>x.id===ideaId);if(!target)return;
    target.comments=Array.isArray(target.comments)?target.comments:[];
    if(!target.comments.some(x=>x.id===removed.id))target.comments.splice(Math.min(index,target.comments.length),0,removed);
    save();openIdeaModal(ideaId);
  });
};
window.openIdeaModal=openIdeaModal;

function normalizeResource(x){
  const oldCat=String(x.category||'');
  let category=['채널 계정','툴 & 링크','참고 자료'].includes(oldCat)?oldCat:'';
  if(!category){
    if(oldCat==='YouTube')category='채널 계정';
    else if(['레퍼런스'].includes(oldCat))category='참고 자료';
    else category='툴 & 링크';
  }
  let channel=x.channel||'공통';
  if(!['주우재','이혜영','도운','공통'].includes(channel))channel='공통';
  const hay=`${x.name||''} ${x.url||''}`.toLowerCase();
  if(!x.channel){
    if(hay.includes('todaysjoowoojae')||hay.includes('주우재'))channel='주우재';
    else if(hay.includes('cantstop_haeyoung')||hay.includes('이혜영')||hay.includes('혜영'))channel='이혜영';
    else if(hay.includes('@ydwdy')||hay.includes('도운'))channel='도운';
  }
  return {...x,category,channel};
}
function resourceChannelClass(ch){
  return ch==='주우재'?'joo':ch==='이혜영'?'hye':ch==='도운'?'dow':'common';
}
function renderResources(){
  const wrap=$('#resourceTables');if(!wrap)return;
  const list=(state.resources||[]).map(normalizeResource);
  const cats=['채널 계정','툴 & 링크','참고 자료'];
  wrap.innerHTML=cats.map(cat=>{
    const rows=list.filter(x=>x.category===cat);
    return `<section class="resource-section">
      <div class="resource-section-head"><h3>${cat}</h3><span>${rows.length}</span></div>
      <div class="resource-table">
        <div class="resource-tr resource-th"><div>이름</div><div>채널</div><div>링크</div><div>관리</div></div>
        ${rows.length?rows.map(x=>`<div class="resource-tr">
          <div class="resource-name"><a href="${esc(x.url||'#')}" target="_blank" rel="noopener">${esc(x.name||'이름 없음')}</a></div>
          <div><span class="resource-channel ${resourceChannelClass(x.channel)}">${esc(x.channel)}</span></div>
          <div class="resource-url"><a href="${esc(x.url||'#')}" target="_blank" rel="noopener">${esc(x.url||'')}</a></div>
          <div class="resource-actions"><button onclick="openResourceModal('${x.id}')">수정</button><button class="delete" onclick="deleteById('resources','${x.id}')">삭제</button></div>
        </div>`).join(''):`<div class="resource-empty">등록된 항목이 없어요.</div>`}
      </div>
    </section>`;
  }).join('');
}
function openResourceModal(id=null){
  const existing=id?(state.resources||[]).find(x=>x.id===id):null;
  const vals=existing?normalizeResource(existing):{name:'',url:'',category:'채널 계정',channel:'공통'};
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal resource-modal">
    <div class="modal-head"><div><small>${existing?'링크 수정':'리소스 허브'}</small><h3>${existing?'링크 수정':'링크 추가'}</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="resourceForm">
      <div class="resource-form">
        <label>이름<input name="name" value="${esc(vals.name||'')}" placeholder="예: 팀 노션" required></label>
        <label>URL<input name="url" type="url" value="${esc(vals.url||'')}" placeholder="https://..." required></label>
        <label>카테고리<select name="category">
          ${['채널 계정','툴 & 링크','참고 자료'].map(v=>`<option value="${v}" ${vals.category===v?'selected':''}>${v}</option>`).join('')}
        </select></label>
        <label>채널<select name="channel">
          ${['주우재','이혜영','도운','공통'].map(v=>`<option value="${v}" ${vals.channel===v?'selected':''}>${v}</option>`).join('')}
        </select></label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteResource">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button type="submit" class="resource-save-btn">저장</button></div>
    </form>
  </div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteResource').onclick=()=>{deleteById('resources',existing.id);closeModal();};
  $('#resourceForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const obj={
      name:String(fd.get('name')||'').trim(),
      url:String(fd.get('url')||'').trim(),
      category:String(fd.get('category')||'채널 계정'),
      channel:String(fd.get('channel')||'공통')
    };
    if(existing)Object.assign(existing,obj);else state.resources.push({id:uid(),...obj});
    save();closeModal();
  };
}

window.openResourceModal=openResourceModal;

function sanitizeResourceMemoHtml(html){
  const box=document.createElement('div');
  box.innerHTML=String(html||'');
  const allowed=['strong','b','em','i','u','br','div','p','ul','ol','li','span'];
  const walk=node=>{
    [...node.childNodes].forEach(ch=>{
      if(ch.nodeType===3)return;
      if(ch.nodeType!==1){ch.remove();return;}
      const tag=ch.tagName.toLowerCase();
      if(!allowed.includes(tag)){
        const frag=document.createDocumentFragment();
        while(ch.firstChild)frag.appendChild(ch.firstChild);
        ch.replaceWith(frag);
        return;
      }
      [...ch.attributes].forEach(a=>{
        if(!(tag==='span'&&a.name==='data-size'))ch.removeAttribute(a.name);
      });
      if(tag==='span'&&ch.dataset.size){
        const size=['small','normal','large'].includes(ch.dataset.size)?ch.dataset.size:'normal';
        ch.dataset.size=size;
      }
      walk(ch);
    });
  };
  walk(box);
  return box.innerHTML;
}
function resourceMemoText(html){
  const box=document.createElement('div');box.innerHTML=String(html||'');
  return (box.innerText||box.textContent||'').trim();
}
let activeResourceMemoId=null;
function renderResourceMemos(){
  const wrap=$('#resourceMemoList');if(!wrap)return;
  state.resourceMemos=Array.isArray(state.resourceMemos)?state.resourceMemos:[];
  wrap.innerHTML=state.resourceMemos.length?state.resourceMemos.map(x=>{
    const active=activeResourceMemoId===x.id;
    return `<article class="resource-memo-card ${active?'active':''}">
      <div class="resource-memo-card-main">
        <div class="resource-memo-title-row" onclick="toggleResourceMemo('${x.id}')">
          <h4>${esc(x.title||'제목 없음')}</h4>
          <span class="resource-memo-toggle">${active?'−':'+'}</span>
        </div>
        <div class="resource-memo-preview" onclick="event.stopPropagation()">${autoLinkHtml(sanitizeResourceMemoHtml(x.html||esc(x.text||'')))}</div>
      </div>
      <div class="resource-memo-actions">
        <button onclick="event.stopPropagation();openResourceMemoModal('${x.id}')">✎ 수정</button>
        <button class="delete" onclick="event.stopPropagation();deleteResourceMemo('${x.id}')">삭제</button>
      </div>
    </article>`;
  }).join(''):`<div class="resource-memo-empty">등록된 메모가 없어요.</div>`;
}
window.toggleResourceMemo=id=>{
  activeResourceMemoId=activeResourceMemoId===id?null:id;
  renderResourceMemos();
};
window.deleteResourceMemo=id=>{
  const index=state.resourceMemos.findIndex(x=>x.id===id);if(index<0)return;
  const removed=state.resourceMemos[index];state.resourceMemos.splice(index,1);
  if(activeResourceMemoId===id)activeResourceMemoId=null;
  save();
  showDeleteUndo('메모가 삭제되었습니다',()=>{
    if(!state.resourceMemos.some(x=>x.id===removed.id))state.resourceMemos.splice(Math.min(index,state.resourceMemos.length),0,removed);
    save();
  });
};

let resourceMemoSavedRange=null;
function saveResourceMemoSelection(){
  const editor=$('#resourceMemoEditor');
  const sel=window.getSelection();
  if(!editor||!sel||!sel.rangeCount)return;
  const range=sel.getRangeAt(0);
  const node=range.commonAncestorContainer;
  if(editor===node||editor.contains(node)){
    resourceMemoSavedRange=range.cloneRange();
  }
  updateResourceMemoToolbar();
}
function restoreResourceMemoSelection(){
  if(!resourceMemoSavedRange)return false;
  const editor=$('#resourceMemoEditor');if(!editor)return false;
  const sel=window.getSelection();if(!sel)return false;
  try{
    sel.removeAllRanges();
    sel.addRange(resourceMemoSavedRange);
    return true;
  }catch{return false;}
}
function updateResourceMemoToolbar(){
  const editor=$('#resourceMemoEditor');
  const boldBtn=$('#resourceMemoBoldBtn');
  if(!editor||!boldBtn)return;
  let active=false;
  try{
    const sel=window.getSelection();
    if(sel&&sel.rangeCount){
      const node=sel.getRangeAt(0).commonAncestorContainer;
      if(editor===node||editor.contains(node))active=document.queryCommandState('bold');
    }
  }catch{}
  boldBtn.classList.toggle('active',!!active);
  boldBtn.setAttribute('aria-pressed',active?'true':'false');
}
function applyResourceMemoFormat(cmd,value=null){
  const editor=$('#resourceMemoEditor');if(!editor)return;
  editor.focus({preventScroll:true});
  restoreResourceMemoSelection();

  if(cmd==='bold'||cmd==='italic'||cmd==='underline'||cmd==='insertUnorderedList'){
    try{document.execCommand(cmd,false,null);}catch{}
    saveResourceMemoSelection();
    updateResourceMemoToolbar();
    return;
  }
  if(cmd==='size'){
    const sel=window.getSelection();
    if(!sel||!sel.rangeCount||sel.isCollapsed)return;
    const range=sel.getRangeAt(0);
    const span=document.createElement('span');
    span.dataset.size=value||'normal';
    try{
      range.surroundContents(span);
    }catch{
      const frag=range.extractContents();span.appendChild(frag);range.insertNode(span);
    }
    sel.removeAllRanges();
    const r=document.createRange();r.selectNodeContents(span);sel.addRange(r);
    resourceMemoSavedRange=r.cloneRange();
    updateResourceMemoToolbar();
  }
}
window.applyResourceMemoFormat=applyResourceMemoFormat;

function openResourceMemoModal(id=null){
  state.resourceMemos=Array.isArray(state.resourceMemos)?state.resourceMemos:[];
  const existing=id?state.resourceMemos.find(x=>x.id===id):null;
  const vals=existing||{title:'',html:'',text:''};

  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal resource-memo-modal">
    <div class="modal-head"><h3>${existing?'메모 수정':'메모 추가'}</h3><button class="icon-btn" id="closeModal">×</button></div>
    <form id="resourceMemoForm">
      <div class="resource-memo-form">
        <label>제목<input name="title" value="${esc(vals.title||'')}" placeholder="예: 파일 네이밍 규칙" required></label>
        <label>내용
          <div class="resource-rich-editor">
            <div class="resource-rich-toolbar">
              <button type="button" id="resourceMemoBoldBtn" aria-pressed="false" onmousedown="event.preventDefault();applyResourceMemoFormat('bold')"><b>B</b></button>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('italic')"><i>I</i></button>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('underline')"><u>U</u></button>
              <span class="toolbar-sep"></span>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('size','small')">작게</button>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('size','normal')">보통</button>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('size','large')">크게</button>
              <span class="toolbar-sep"></span>
              <button type="button" onmousedown="event.preventDefault();applyResourceMemoFormat('insertUnorderedList')">• 목록</button>
            </div>
            <div id="resourceMemoEditor" class="resource-memo-editor" contenteditable="true" data-placeholder="내용을 입력하세요">${sanitizeResourceMemoHtml(vals.html||esc(vals.text||''))}</div>
          </div>
        </label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteResourceMemoModal">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button type="submit" class="resource-save-btn">저장</button></div>
    </form>
  </div></div>`;

  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteResourceMemoModal').onclick=()=>{deleteResourceMemo(existing.id);closeModal();};
  $('#resourceMemoForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const title=String(fd.get('title')||'').trim();
    const html=sanitizeResourceMemoHtml($('#resourceMemoEditor').innerHTML);
    const text=resourceMemoText(html);
    if(!title){e.target.querySelector('input[name="title"]').focus();return;}
    if(existing)Object.assign(existing,{title,html,text});
    else state.resourceMemos.push({id:uid(),title,html,text,createdAt:new Date().toISOString()});
    save();closeModal();
  };
  const memoEditor=$('#resourceMemoEditor');
  if(memoEditor){
    ['keyup','mouseup','input','focus'].forEach(evt=>memoEditor.addEventListener(evt,saveResourceMemoSelection));
    document.addEventListener('selectionchange',saveResourceMemoSelection,{once:false});
  }
  resourceMemoSavedRange=null;
  setTimeout(()=>{
    memoEditor?.focus();
    saveResourceMemoSelection();
  },0);
}
window.openResourceMemoModal=openResourceMemoModal;
let noticeView='episode';
function normalizeNotice(x){
  return {
    ...x,
    board:x.board||x.type||'episode',
    author:x.author||x.writer||'',
    pinned:Boolean(x.pinned)
  };
}
function renderNotices(){
  state.notices=Array.isArray(state.notices)?state.notices.map(normalizeNotice):[];
  $$('#noticeTabs button').forEach(b=>b.classList.toggle('active',b.dataset.noticeView===noticeView));
  const list=[...state.notices].filter(x=>(x.board||'episode')===noticeView).sort((a,b)=>{
    if(Boolean(a.pinned)!==Boolean(b.pinned))return Number(b.pinned)-Number(a.pinned);
    return String(b.createdAt||b.date||'').localeCompare(String(a.createdAt||a.date||''));
  });
  const board=$('#noticeBoard'); if(!board)return;
  if(!list.length){
    board.innerHTML=`<div class="notice-empty">아직 공지가 없어요</div>`;
    return;
  }
  board.innerHTML=list.map(x=>`<article class="notice-row notice-title-only ${x.pinned?'pinned':''}" onclick="openNoticeDetail('${x.id}')">
    <div class="notice-pin">${x.pinned?'📌':''}</div>
    <div class="notice-main">
      <div class="notice-title-line">
        <strong>${esc(x.title||'제목 없음')}</strong>
        ${x.pinned?'<span>상단 고정</span>':''}
      </div>
    </div>
  </article>`).join('');
}
window.setNoticeView=view=>{noticeView=view;renderNotices();};
function openNoticeDetail(id){
  const existing=state.notices.find(x=>x.id===id);if(!existing)return;
  const vals=normalizeNotice(existing);
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal notice-detail-modal">
    <div class="modal-head"><div><small>${vals.board==='internal'?'🔒 내부 공지':'🎬 에피소드 공지'}</small><h3>${esc(vals.title||'제목 없음')}</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <div class="notice-detail-body">
      <div class="notice-detail-meta">${vals.pinned?'<span class="notice-detail-pin">📌 상단 고정</span>':''}${vals.author?`<span>${esc(vals.author)}</span>`:''}<span>${esc(vals.createdAt||vals.date||'')}</span></div>
      <div class="notice-detail-content">${autoLinkText(vals.content||'')}</div>
    </div>
    <div class="modal-actions notice-detail-actions">
      <span></span><span></span>
      <button type="button" class="outline" id="closeNoticeDetail">닫기</button>
      <button type="button" class="accent-btn" id="editNoticeDetail">수정</button>
    </div>
  </div></div>`;
  $('#closeModal').onclick=closeModal;
  $('#closeNoticeDetail').onclick=closeModal;
  $('#editNoticeDetail').onclick=()=>openNoticeModal(existing.id);
}
window.openNoticeDetail=openNoticeDetail;

function openNoticeModal(id=null){
  const existing=id?state.notices.find(x=>x.id===id):null;
  const vals=existing?normalizeNotice(existing):{board:noticeView,title:'',content:'',author:'',pinned:false};
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal notice-compose-modal">
    <div class="modal-head"><div><h3>공지 작성</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="noticeForm">
      <div class="notice-form-body">
        <label>게시판<select name="board">
          <option value="episode" ${vals.board==='episode'?'selected':''}>🎬 에피소드 공지</option>
          <option value="internal" ${vals.board==='internal'?'selected':''}>🔒 내부 공지</option>
        </select></label>
        <label>제목<input name="title" value="${esc(vals.title||'')}" placeholder="제목 입력" required></label>
        <label>내용<textarea name="content" placeholder="내용 입력" required>${esc(vals.content||'')}</textarea></label>
        <label>작성자<input name="author" value="${esc(vals.author||'')}" placeholder="이름"></label>
        <label class="notice-pin-check"><input type="checkbox" name="pinned" ${vals.pinned?'checked':''}><span>상단 고정</span></label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteNotice">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button type="submit" class="notice-save-btn">저장</button></div>
    </form>
  </div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  if(existing)$('#deleteNotice').onclick=()=>{deleteById('notices',existing.id);closeModal();};
  $('#noticeForm').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);const obj={board:fd.get('board'),title:fd.get('title').trim(),content:fd.get('content').trim(),author:fd.get('author').trim(),pinned:fd.get('pinned')==='on',createdAt:existing?.createdAt||localDate()};if(existing)Object.assign(existing,obj);else state.notices.push({id:uid(),...obj});save();noticeView=obj.board;closeModal();};
}
window.openNoticeModal=openNoticeModal;


let calendarCursor=(()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),1);})();

function calendarPDNames(shoot){
  return shootMembers(shoot).filter(m=>members.includes(m));
}
function calendarAutoEvents(){
  const uploads=(state.uploads||[]).filter(x=>x.date).map(x=>({
    source:'upload',type:'upload',id:x.id,date:x.date,
    title:x.title||'업로드',channel:x.channel||''
  }));
  const shoots=[];
  (state.shoots||[]).forEach(x=>{
    const pds=calendarPDNames(x);
    const pdText=pds.length?` (${pds.join(', ')})`:'';
    shootDates(x).forEach(d=>{
      if(d.date)shoots.push({
        source:'shoot',type:'shoot',id:x.id,date:d.date,
        title:`${x.title||'촬영'}${pdText}`,channel:x.channel||''
      });
    });
  });
  return [...uploads,...shoots];
}
function calendarManualEvents(){
  state.calendarEvents=Array.isArray(state.calendarEvents)?state.calendarEvents:[];
  return state.calendarEvents.filter(x=>x.date).map(x=>({
    source:'manual',
    type:x.type==='leave'?'leave':(x.type==='meeting'?'meeting':'manual'),
    id:x.id,date:x.date,title:x.title||'일정',member:x.member||''
  }));
}
function allCalendarEvents(){
  return [...calendarAutoEvents(),...calendarManualEvents()];
}
function calendarEventButton(e){
  let action='';
  if(e.source==='upload') action=`openUploadModal('${e.id}')`;
  else if(e.source==='shoot') action=`openShootModal('${e.id}')`;
  else action=`openCalendarEventModal('${e.id}')`;
  const icon=e.type==='upload'?'▸':e.type==='shoot'?'●':e.type==='meeting'?'◆':e.type==='leave'?'↻':'•';
  return `<button type="button" class="cal-event ${e.type}" onclick="event.stopPropagation();${action}" title="${esc(e.title)}"><b>${icon}</b><span>${esc(e.title)}</span></button>`;
}
function renderCalendar(){
  const grid=$('#calendarGrid'),label=$('#calendarMonthLabel');if(!grid||!label)return;
  const year=calendarCursor.getFullYear(),month=calendarCursor.getMonth();
  label.textContent=`${year}년 ${month+1}월`;

  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const weekCount=Math.ceil((firstDay+daysInMonth)/7);
  const start=new Date(year,month,1-firstDay);
  const total=weekCount*7;
  const today=localDate();
  const events=allCalendarEvents();

  grid.style.gridTemplateRows=`repeat(${weekCount}, minmax(132px, 1fr))`;
  const cells=[];
  for(let i=0;i<total;i++){
    const d=new Date(start);d.setDate(start.getDate()+i);
    const iso=localDate(d),inMonth=d.getMonth()===month,dow=d.getDay();
    const rows=events.filter(x=>x.date===iso);
    cells.push(`<div class="cal-cell ${inMonth?'':'outside'} ${iso===today?'today':''}" onclick="openCalendarEventModal(null,'${iso}')">
      <div class="cal-date ${dow===0?'sun':''} ${dow===6?'sat':''}"><span>${d.getDate()}</span>${iso===today?'<em>오늘</em>':''}</div>
      <div class="cal-events">${rows.map(calendarEventButton).join('')}</div>
    </div>`);
  }
  grid.innerHTML=cells.join('');
}
window.moveCalendarMonth=delta=>{
  calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+delta,1);
  renderCalendar();
};
window.goCalendarToday=()=>{
  const d=new Date();calendarCursor=new Date(d.getFullYear(),d.getMonth(),1);renderCalendar();
};

function openCalendarEventModal(id=null,presetDate=''){
  state.calendarEvents=Array.isArray(state.calendarEvents)?state.calendarEvents:[];
  const existing=id?state.calendarEvents.find(x=>x.id===id):null;
  const vals=existing||{title:'',date:presetDate||localDate(),type:'manual',member:'',memo:''};
  const leave=vals.type==='leave';

  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal cal-modal">
    <div class="modal-head"><div><small>${existing?'일정 수정':'일정 추가'}</small><h3>${existing?esc(vals.title||'일정'):'새 일정 등록'}</h3></div><button class="icon-btn" id="closeModal">×</button></div>
    <form id="calEventForm">
      <div class="cal-form">
        <label class="full">일정 제목<input name="title" value="${esc(vals.title||'')}" placeholder="예: 디자인 회의"></label>
        <label>날짜<input type="date" name="date" value="${esc(vals.date||localDate())}" required></label>
        <label>종류<select name="type">
          <option value="manual" ${vals.type==='manual'?'selected':''}>기타 일정</option>
          <option value="meeting" ${vals.type==='meeting'?'selected':''}>회의</option>
        </select></label>

        <div class="cal-leave-switch full">
          <div><b>연차로 등록</b><small>켜면 팀원을 선택해서 연차 일정으로 저장해요.</small></div>
          <label class="cal-switch"><input id="calLeaveSwitch" type="checkbox" ${leave?'checked':''}><span></span></label>
        </div>

        <label id="calMemberWrap" class="full ${leave?'':'hidden'}">연차 팀원
          <select name="member"><option value="">선택</option>${members.map(m=>`<option value="${m}" ${m===vals.member?'selected':''}>${m}</option>`).join('')}</select>
        </label>
        <label class="full">메모<textarea name="memo" placeholder="메모가 필요하면 적어주세요">${esc(vals.memo||'')}</textarea></label>
      </div>
      <div class="modal-actions">${existing?'<button type="button" class="danger-btn" id="deleteCalEvent">삭제</button>':'<span></span>'}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div>
    </form>
  </div></div>`;

  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;
  const sw=$('#calLeaveSwitch'),memberWrap=$('#calMemberWrap');
  sw.onchange=()=>memberWrap.classList.toggle('hidden',!sw.checked);
  if(existing)$('#deleteCalEvent').onclick=()=>{
    deleteById('calendarEvents',existing.id);closeModal();
  };
  $('#calEventForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target),isLeave=sw.checked,member=String(fd.get('member')||'');
    const title=String(fd.get('title')||'').trim();
    if(isLeave&&!member){memberWrap.classList.remove('hidden');memberWrap.querySelector('select').focus();return;}
    if(!isLeave&&!title){e.target.querySelector('input[name="title"]').focus();return;}
    const obj={
      title:isLeave?`${member} 연차`:title,
      date:String(fd.get('date')||''),
      type:isLeave?'leave':String(fd.get('type')||'manual'),
      member:isLeave?member:'',
      memo:String(fd.get('memo')||'')
    };
    if(existing)Object.assign(existing,obj);else state.calendarEvents.push({id:uid(),...obj});
    save();closeModal();
  };
}
window.openCalendarEventModal=openCalendarEventModal;

function renderAll(){renderHome();renderCalendar();renderUploads();renderShoots();renderAds();renderIdeas();renderMeetingsLanding();renderResources();renderResourceMemos();renderNotices();}
let deleteUndoTimer=null;
let deleteUndoAction=null;

function showDeleteUndo(message='삭제되었습니다',restoreFn){
  deleteUndoAction=restoreFn;
  if(deleteUndoTimer)clearTimeout(deleteUndoTimer);
  let toast=document.querySelector('#deleteUndoToast');
  if(!toast){
    toast=document.createElement('div');
    toast.id='deleteUndoToast';
    toast.className='delete-undo-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML=`<span>${esc(message)}</span><button type="button" onclick="undoLastDelete()">되돌리기</button>`;
  requestAnimationFrame(()=>toast.classList.add('show'));
  deleteUndoTimer=setTimeout(()=>{
    toast.classList.remove('show');
    deleteUndoAction=null;
    deleteUndoTimer=null;
    setTimeout(()=>toast.remove(),220);
  },4000);
}
window.undoLastDelete=()=>{
  if(!deleteUndoAction)return;
  const restore=deleteUndoAction;
  deleteUndoAction=null;
  if(deleteUndoTimer)clearTimeout(deleteUndoTimer);
  deleteUndoTimer=null;
  document.querySelector('#deleteUndoToast')?.remove();
  restore();
};
window.deleteById=(key,id)=>{
  const list=Array.isArray(state[key])?state[key]:[];
  const index=list.findIndex(x=>x.id===id);
  if(index<0)return;
  const removed=list[index];
  list.splice(index,1);
  save();
  showDeleteUndo('삭제되었습니다',()=>{
    state[key]=Array.isArray(state[key])?state[key]:[];
    if(!state[key].some(x=>x.id===removed.id)){
      state[key].splice(Math.min(index,state[key].length),0,removed);
    }
    save();
  });
};

const modalDefs={
  ideaModal:{title:'아이디어 작성',key:'ideas',fields:[['title','아이디어 제목','text'],['content','내용','textarea'],['proposer','제안자','select',members]]},
  todoModal:{title:'업무 추가',key:'todos',fields:[['assignee','담당자','select',members],['channel','채널','select',[...channels,'기타']],['title','업무 내용','textarea']]},
  uploadModal:{title:'업로드 일정',key:'uploads',fields:[['channel','채널','select',channels],['type','유형','select',['롱폼','쇼츠','기타']],['title','영상 제목','text'],['assignee','담당자','select',members],['date','업로드일','date'],['status','상태','select',uploadStatuses]]},
  shootModal:{title:'촬영 정보',key:'shoots',fields:[['channel','채널','select',channels],['title','영상 제목','text'],['assignee','담당 PD','select',members],['date','촬영일','date'],['method','촬영 방식','select',['PD 자체 촬영','촬영팀 동행','셀프캠','기타']],['crew','촬영팀 / 참여자 (쉼표 구분)','text'],['equipment','장비','text'],['notes','준비사항 / 유의사항','textarea']]},
  adModal:{title:'광고 정보',key:'ads',fields:[['channel','채널','select',channels],['adType','분류','select',['BDC','기획PPL','단순PPL','쇼츠']],['brand','브랜드명','text'],['product','광고 제품','text'],['assignee','담당자','select',adManagers],['pd','담당PD','select',['미정',...members]],['status','상태','select',['내부 논의중','소속사 논의중','구성안 작성중','촬영 완료','업로드 완료']],['amount','광고 금액','number'],['proposal','구성안 전달일','date'],['rough','가편 전달일','date'],['final','최종본 전달일','date'],['memo','메모','textarea']]},
  meetingModal:{title:'회의록 추가',key:'meetings',fields:[['title','회의 제목','text'],['date','날짜','date'],['week','주차','select',['1','2','3','4','5']]]},
  resourceModal:{title:'링크 추가',key:'resources',fields:[]},
  noticeModal:{title:'공지 작성',key:'notices',fields:[['channel','채널','select',['전체',...channels]],['title','제목','text'],['content','내용','textarea'],['author','작성자','select',members]]}
};
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.open)));
function openModal(name,id=null,preset={}){
  if(name==='uploadModal'){openUploadModal(id);return;}if(name==='shootModal'){openShootModal(id);return;}if(name==='resourceModal'){openResourceModal(id);return;}if(name==='ideaModal'){openIdeaModal(id,preset);return;}
  const d=modalDefs[name], existing=id?state[d.key].find(x=>x.id===id):null,values={...existing,...preset};
  const fields=d.fields.map(([n,l,t,opts])=>{const val=values[n]??'';let input=t==='select'?`<select name="${n}">${val&&!opts.includes(val)?`<option value="${esc(val)}" selected>${esc(val)} (기존)</option>`:''}${opts.map(o=>`<option value="${esc(o)}" ${o===val?'selected':''}>${esc(o)}</option>`).join('')}</select>`:t==='textarea'?`<textarea name="${n}">${esc(val)}</textarea>`:`<input name="${n}" type="${t}" value="${esc(val)}" />`;return `<label class="${t==='textarea'?'full':''}">${l}${input}</label>`;}).join('');
  const modalTitle=(name==='todoModal'&&existing)?'업무 수정':d.title;
  const compactActionModal=(name==='todoModal'||name==='adModal')?' compact-action-modal':'';
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal${compactActionModal}"><div class="modal-head"><h3>${modalTitle}</h3><button class="icon-btn" id="closeModal">×</button></div><form id="modalForm"><div class="form-grid">${fields}</div><div class="modal-actions">${existing?`<button type="button" class="danger-btn" id="deleteModal">삭제</button>`:''}<span></span><button type="button" class="outline" id="cancelModal">취소</button><button class="accent-btn" type="submit">저장</button></div></form></div></div>`;
  $('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;if(existing)$('#deleteModal').onclick=()=>{deleteById(d.key,existing.id);closeModal();};
  $('#modalForm').onsubmit=e=>{e.preventDefault();let obj=Object.fromEntries(new FormData(e.target).entries());if(name==='meetingModal'&&!existing)obj.sections=meetingSectionDefs.map(x=>({...x,items:[]}));if(name==='ideaModal'&&!existing){obj.createdAt=localDate();obj.archived=false;}if(existing){Object.assign(existing,obj);}else{obj.id=uid();state[d.key].push(obj);}save();closeModal();};
}
function closeModal(){$('#modalRoot').innerHTML='';}
window.editItem=(key,id)=>openModal({todos:'todoModal',uploads:'uploadModal',shoots:'shootModal',ads:'adModal',meetings:'meetingModal'}[key],id);
window.openModal=openModal;
document.addEventListener('click',e=>{const b=e.target.closest('[data-idea-view]');if(b){window.setIdeaView(b.dataset.ideaView);}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-notice-view]');if(b){window.setNoticeView(b.dataset.noticeView);}});
$('#globalSearch').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();$$('.member-card,.resource-tr,.resource-memo-card,.doc,.simple-row,.upload-card,.shoot-card,.ad-row,.idea-card').forEach(el=>el.style.display=!q||el.textContent.toLowerCase().includes(q)?'':'none');});
$('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='우리팀-잘-굴러가유-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);};
$('#todayLabel').textContent=new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'long',day:'numeric',weekday:'short'}).format(new Date());
window.addEventListener('focus',()=>renderHome());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderHome();});
renderAll();
