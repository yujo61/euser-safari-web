/* EuserChat v3 — Logic (Production) */
(function(){
  "use strict";
  var E=window._EC,ls=E.ls,lsDel=E.lsDel,cfg=E.cfg;
  var greeting=cfg.greeting;
  var apiKey=cfg.apiKey||"";
  var MAX_MSG=2000;
  var RATE_MS=2000;
  var _lastSend=0;

  /* Check session expiry first */
  E.checkExpiry();

  /* State */
  var user=ls("ec_user")||null;
  var convos=ls("ec_convos")||[];
  var activeId=ls("ec_active")||null;
  function getMsgs(id){return ls("ec_m_"+id)||[];}
  function setMsgs(id,m){ls("ec_m_"+id,m);}

  function findEmpty(){
    for(var i=0;i<convos.length;i++){var m=getMsgs(convos[i].id);if(m.length<=1)return convos[i].id;}
    return null;
  }
  function newConvo(activate){
    var empty=findEmpty();
    if(empty){if(activate!==false){activeId=empty;ls("ec_active",activeId);}return empty;}
    var id="c_"+Math.random().toString(36).substr(2,8)+Date.now().toString(36);
    convos.unshift({id:id,title:"New Chat",ts:new Date().toISOString()});
    ls("ec_convos",convos);
    if(activate!==false){activeId=id;ls("ec_active",activeId);}
    setMsgs(id,[{role:"ai",content:greeting,ts:new Date().toISOString()}]);
    return id;
  }
  function deleteConvo(id){
    convos=convos.filter(function(c){return c.id!==id;});
    ls("ec_convos",convos);lsDel("ec_m_"+id);
    if(activeId===id){activeId=convos.length?convos[0].id:null;ls("ec_active",activeId);}
  }
  function ensureConvo(){
    if(!activeId||!convos.find(function(c){return c.id===activeId;})){
      if(convos.length){activeId=convos[0].id;ls("ec_active",activeId);}
      else newConvo();
    }
  }

  /* ═══ Security Module ═══ */
  var SAFE_TAGS=/^(b|i|em|strong|a|br|p|ul|ol|li|img|h[1-6]|blockquote|code|pre|span)$/i;
  function sanitize(html){
    if(!html)return"";
    /* Strip script tags and their content */
    html=html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"");
    /* Strip event handlers */
    html=html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi,"");
    html=html.replace(/\s*on\w+\s*=\s*\S+/gi,"");
    /* Strip javascript: and data: URLs */
    html=html.replace(/href\s*=\s*["']\s*(javascript|data|vbscript):[^"']*/gi,'href="#blocked');
    html=html.replace(/src\s*=\s*["']\s*(javascript|data|vbscript):[^"']*/gi,'src="#blocked');
    /* Only allow https src for images */
    html=html.replace(/(<img[^>]*src\s*=\s*["'])http:([^"']*)/gi,'$1#blocked');
    /* Strip iframe, object, embed, form, input, style tags */
    html=html.replace(/<\/?(?:iframe|object|embed|form|input|button|style|link|meta|base)[^>]*>/gi,"");
    return html;
  }
  function stripCtrl(s){return s?s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,""):s;}
  function clamp(s,max){return s&&s.length>max?s.substring(0,max):s;}
  function safeName(s){return clamp(stripCtrl(s),50).replace(/<[^>]*>/g,"");}

  /* Utils */
  function md(t){
    if(!t)return"";
    /* Images */
    t=t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:6px 0;display:block"/>');
    /* PDF file card — render .pdf links as download cards */
    t=t.replace(/\[([^\]]+)\]\(([^)]+\.pdf[^)]*)\)/gi,function(_,label,url){
      var cleanLabel = label.replace(/[📄📃📑]\s*/g, '').trim();
      return '<a href="'+url+'" target="_blank" rel="noopener noreferrer" class="ec-pdf-card">'
        +'<span class="ec-pdf-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>'
        +'<span class="ec-pdf-info"><span class="ec-pdf-name">'+cleanLabel+'</span><span class="ec-pdf-sub">PDF Itinerary &bull; Click to download</span></span>'
        +'<span class="ec-pdf-dl"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span>'
        +'</a>';
    });
    /* Regular links */
    t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
    t=t.replace(/\*(.+?)\*/g,"<em>$1</em>");
    /* Bullet lists */
    t=t.replace(/((?:^|<br>)- .+)+/g,function(block){
      var items=block.split(/<br>- |^- /).filter(Boolean);
      return '<ul style="margin:4px 0 4px 16px;padding:0">'+(items.map(function(i){return '<li>'+i+'</li>';}).join(''))+'</ul>';
    });
    t=t.replace(/\n/g,"<br>");
    return sanitize(t);
  }
  function fmtTime(iso){return new Date(iso).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}
  function fmtDate(iso){return new Date(iso).toLocaleDateString([],{month:"short",day:"numeric"});}

  /* Icons */
  var IC={
    chat:'<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
    msgEmpty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
  };
  function ibtn(cls,icon,title){var b=document.createElement("button");b.className=cls;b.innerHTML=icon;if(title)b.title=title;return b;}

  /* ═══ DOM ═══ */
  var wrap=document.createElement("div");wrap.className="ec-wrap";
  var fab=document.createElement("div");fab.className="ec-fab";fab.innerHTML=IC.chat;
  var win=document.createElement("div");win.className="ec-win";

  /* Header */
  var hdr=document.createElement("div");hdr.className="ec-hdr";
  var hdrL=document.createElement("div");hdrL.className="ec-hdr-l";
  hdrL.innerHTML='<span class="ec-hdr-dot"></span><div><div class="ec-hdr-n">'+cfg.agentName+'</div><div class="ec-hdr-s">'+cfg.agentTagline+'</div></div>';
  var hdrA=document.createElement("div");hdrA.className="ec-hdr-acts";
  var menuBtn=ibtn("ec-ib",IC.menu,"Chats"),newBtn=ibtn("ec-ib",IC.plus,"New chat"),closeBtn=ibtn("ec-ib",IC.x,"Close");
  hdrA.appendChild(menuBtn);hdrA.appendChild(newBtn);hdrA.appendChild(closeBtn);
  hdr.appendChild(hdrL);hdr.appendChild(hdrA);win.appendChild(hdr);

  var body=document.createElement("div");body.className="ec-body";

  /* ─ Registration ─ */
  var coOpts='<option value="" disabled selected>Select country</option>';
  var phOpts='';
  E.countries.forEach(function(c,i){
    coOpts+='<option value="'+c.n+'" data-iso="'+c.iso+'">'+c.f+'  '+c.n+'</option>';
    phOpts+='<option value="'+c.c+'" data-iso="'+c.iso+'"'+(i===0?' selected':'')+'>'+c.f+' '+c.c+'</option>';
  });

  var reg=document.createElement("div");reg.className="ec-reg";
  reg.innerHTML='<h3>Welcome! Let\u2019s get started</h3>'
    +'<p>Share your details to begin chatting with '+cfg.agentName+'.</p>'
    +'<div class="ec-name-row">'
      +'<div class="ec-fg" id="ec-fg-fn"><label>First Name *</label><input id="ec-rfn" placeholder="First"><span class="ec-err">Required</span></div>'
      +'<div class="ec-fg" id="ec-fg-ln"><label>Last Name *</label><input id="ec-rln" placeholder="Last"><span class="ec-err">Required</span></div>'
    +'</div>'
    +'<div class="ec-fg" id="ec-fg-em"><label>Email *</label><input id="ec-rem" type="email" placeholder="you@example.com"><span class="ec-err">Valid email required</span></div>'
    +'<div class="ec-fg" id="ec-fg-ph"><label>Phone *</label><div class="ec-ph-row"><select id="ec-rpc">'+phOpts+'</select><input id="ec-rph" type="tel" placeholder="712 345 678"></div><span class="ec-err">Valid phone required</span></div>'
    +'<div class="ec-fg" id="ec-fg-co"><label>Country *</label><select id="ec-rco">'+coOpts+'</select><span class="ec-err">Please select</span></div>'
    +'<button class="ec-rbtn" id="ec-rgo">\u2192  Start Chatting</button>';

  /* ─ Chat view ─ */
  var chatV=document.createElement("div");
  chatV.style.cssText="display:flex;flex-direction:column;flex:1;min-height:0";
  var msgsEl=document.createElement("div");msgsEl.className="ec-msgs";
  var typEl=document.createElement("div");typEl.className="ec-typ";
  typEl.innerHTML='<div class="ec-td"></div><div class="ec-td"></div><div class="ec-td"></div>';
  msgsEl.appendChild(typEl);chatV.appendChild(msgsEl);
  var foot=document.createElement("div");foot.className="ec-foot";
  var inp=document.createElement("textarea");inp.className="ec-inp";inp.placeholder="Type your message...";inp.rows="1";
  var sendB=document.createElement("button");sendB.className="ec-sbtn";sendB.innerHTML=IC.send;
  foot.appendChild(inp);foot.appendChild(sendB);chatV.appendChild(foot);

  /* ─ Sidebar ─ */
  var side=document.createElement("div");side.className="ec-side";
  var sideHdr=document.createElement("div");sideHdr.className="ec-side-hdr";
  sideHdr.innerHTML='<span>Conversations</span>';
  var sideX=ibtn("ec-ib",IC.x);sideHdr.appendChild(sideX);
  var sideList=document.createElement("div");sideList.className="ec-side-list";
  var sideNew=document.createElement("div");sideNew.className="ec-side-new";sideNew.textContent="+ New Conversation";
  side.appendChild(sideHdr);side.appendChild(sideList);side.appendChild(sideNew);

  /* Badge */
  var badge=document.createElement("div");badge.className="ec-badge";
  badge.innerHTML='<a href="https://euserai.com" target="_blank" rel="noopener noreferrer">Powered by Euser AI</a>';

  body.appendChild(reg);body.appendChild(chatV);body.appendChild(side);
  win.appendChild(body);win.appendChild(badge);
  wrap.appendChild(win);wrap.appendChild(fab);
  document.body.appendChild(wrap);

  /* ═══ Views ═══ */
  function showReg(){reg.style.display="flex";chatV.style.display="none";}
  function showChat(){reg.style.display="none";chatV.style.display="flex";}
  function showSide(){renderSidebar();side.classList.add("open");}
  function hideSide(){side.classList.remove("open");}

  /* ═══ Messages ═══ */
  function addMsg(role,content,save){
    var w=document.createElement("div");w.className="ec-m-wrap "+(role==="ai"?"ai":"usr");
    var m=document.createElement("div");m.className="ec-m "+(role==="ai"?"ai":"usr");
    if(role==="ai"){m.innerHTML=md(content);}else{m.textContent=content;}
    var ts=document.createElement("div");ts.className="ec-ts";ts.textContent=fmtTime(new Date().toISOString());
    w.appendChild(m);w.appendChild(ts);msgsEl.insertBefore(w,typEl);
    if(save!==false){
      var msgs=getMsgs(activeId);msgs.push({role:role,content:content,ts:new Date().toISOString()});
      setMsgs(activeId,msgs);
      if(role==="user"){
        var cv=convos.find(function(c){return c.id===activeId;});
        if(cv&&cv.title==="New Chat"){cv.title=content.substring(0,35);ls("ec_convos",convos);}
      }
    }
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }
  function renderMsgs(){
    var ch=Array.from(msgsEl.children);ch.forEach(function(c){if(c!==typEl)msgsEl.removeChild(c);});
    if(!activeId)return;
    getMsgs(activeId).forEach(function(m){
      var w=document.createElement("div");w.className="ec-m-wrap "+(m.role==="ai"?"ai":"usr");
      var el=document.createElement("div");el.className="ec-m "+(m.role==="ai"?"ai":"usr");
      if(m.role==="ai"){el.innerHTML=md(m.content);}else{el.textContent=m.content;}
      var ts=document.createElement("div");ts.className="ec-ts";ts.textContent=fmtTime(m.ts);
      w.appendChild(el);w.appendChild(ts);msgsEl.insertBefore(w,typEl);
    });
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }

  /* ═══ Sidebar ═══ */
  function renderSidebar(){
    sideList.innerHTML="";
    if(convos.length===0){
      sideList.innerHTML='<div class="ec-side-empty">'+IC.msgEmpty+'<span>No conversations yet</span></div>';
      return;
    }
    convos.forEach(function(cv){
      var row=document.createElement("div");row.className="ec-si"+(cv.id===activeId?" act":"");
      var left=document.createElement("div");left.className="ec-si-l";
      left.innerHTML='<div class="ec-si-t">'+cv.title+'</div><div class="ec-si-d">'+fmtDate(cv.ts)+'</div>';
      left.addEventListener("click",function(){activeId=cv.id;ls("ec_active",activeId);renderMsgs();hideSide();showChat();});
      var del=document.createElement("button");del.className="ec-si-del";del.innerHTML=IC.trash;del.title="Delete";
      del.addEventListener("click",function(e){e.stopPropagation();deleteConvo(cv.id);renderSidebar();});
      row.appendChild(left);row.appendChild(del);sideList.appendChild(row);
    });
  }

  /* ═══ Send (with rate limiting + security) ═══ */
  function send(){
    var text=inp.value.trim();if(!text)return;
    /* Rate limit */
    var now=Date.now();
    if(now-_lastSend<RATE_MS){return;}
    _lastSend=now;
    /* Sanitize & clamp input */
    text=clamp(stripCtrl(text),MAX_MSG);
    if(!text)return;
    /* HTTPS enforcement */
    if(cfg.webhookUrl.indexOf("https://")!==0){console.error("EuserChat: webhook must use HTTPS");return;}
    inp.value="";inp.style.height="auto";sendB.disabled=true;addMsg("user",text);
    typEl.classList.add("on");msgsEl.scrollTop=msgsEl.scrollHeight;
    var payload={sessionId:activeId,message:text};
    if(user){payload.firstName=user.firstName;payload.lastName=user.lastName;payload.email=user.email;payload.phone=user.phone;payload.country=user.country;}
    var hdrs={"Content-Type":"application/json"};
    if(apiKey)hdrs["X-EC-API-Key"]=apiKey;
    fetch(cfg.webhookUrl,{method:"POST",headers:hdrs,body:JSON.stringify(payload)})
    .then(function(r){if(!r.ok)throw new Error(r.status);return r.text();})
    .then(function(raw){
      typEl.classList.remove("on");sendB.disabled=false;inp.focus();
      var reply=raw;
      try{
        var d=JSON.parse(raw);
        /* Handle both object {output:".."} and array [{output:".."}] */
        if(Array.isArray(d))d=d[0]||{};
        reply=d.output||d.response||d.text||d.message||raw;
      }catch(e){}
      addMsg("ai",reply);
    })
    .catch(function(err){
      console.error("EuserChat:",err);
      typEl.classList.remove("on");sendB.disabled=false;
      addMsg("ai","I\u2019m sorry, I\u2019m having trouble connecting. Please try again.");
    });
  }

  /* ═══ Validation ═══ */
  function setErr(id,show){
    var fg=reg.querySelector("#"+id);
    if(show)fg.classList.add("err");else fg.classList.remove("err");
  }
  function validateEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);}
  function validatePhone(p){return /^\d{6,14}$/.test(p.replace(/[\s\-]/g,""));}

  /* ═══ Events ═══ */
  fab.addEventListener("click",function(){win.classList.add("open");fab.style.display="none";if(user)inp.focus();});
  closeBtn.addEventListener("click",function(){win.classList.remove("open");hideSide();setTimeout(function(){fab.style.display="flex";},150);});
  menuBtn.addEventListener("click",showSide);
  sideX.addEventListener("click",hideSide);
  newBtn.addEventListener("click",function(){newConvo();renderMsgs();hideSide();showChat();inp.focus();});
  sideNew.addEventListener("click",function(){newConvo();renderMsgs();hideSide();showChat();inp.focus();});
  sendB.addEventListener("click",send);
  inp.addEventListener("keydown",function(e){
    if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}
  });
  inp.addEventListener("input",function(){
    this.style.height="auto";
    this.style.height=(this.scrollHeight<120?this.scrollHeight:120)+"px";
  });

  /* Registration submit */
  reg.querySelector("#ec-rgo").addEventListener("click",function(){
    var fn=safeName(reg.querySelector("#ec-rfn").value.trim());
    var ln=safeName(reg.querySelector("#ec-rln").value.trim());
    var em=clamp(stripCtrl(reg.querySelector("#ec-rem").value.trim()),254);
    var pc=reg.querySelector("#ec-rpc").value;
    var ph=stripCtrl(reg.querySelector("#ec-rph").value.trim()).replace(/^0+/,"");
    var co=reg.querySelector("#ec-rco").value;
    var ok=true;
    setErr("ec-fg-fn",!fn);if(!fn){ok=false;}
    setErr("ec-fg-ln",!ln);if(!ln){ok=false;}
    setErr("ec-fg-em",!validateEmail(em));if(!validateEmail(em)){ok=false;}
    setErr("ec-fg-ph",!validatePhone(ph));if(!validatePhone(ph)){ok=false;}
    setErr("ec-fg-co",!co);if(!co){ok=false;}
    if(!ok)return;
    user={firstName:fn,lastName:ln,email:em,phone:pc+ph,country:co};
    ls("ec_user",user);ls("ec_user_ts",Date.now());
    showChat();
    if(convos.length===0){newConvo();renderMsgs();}
    else{ensureConvo();renderMsgs();}
    showSide();
  });

  /* Clear errors on input */
  ["ec-rfn","ec-rln","ec-rem","ec-rph"].forEach(function(id){
    var el=reg.querySelector("#"+id);
    if(el)el.addEventListener("input",function(){el.closest(".ec-fg").classList.remove("err");});
  });
  ["ec-rco"].forEach(function(id){
    var el=reg.querySelector("#"+id);
    if(el)el.addEventListener("change",function(){el.closest(".ec-fg").classList.remove("err");});
  });

  /* ═══ IP Detection ═══ */
  if(!user){
    E.detectCountry(function(iso){
      var idx=E.countries.findIndex(function(c){return c.iso===iso;});
      if(idx>-1){
        var coSel=reg.querySelector("#ec-rco");
        var pcSel=reg.querySelector("#ec-rpc");
        if(coSel)coSel.value=E.countries[idx].n;
        if(pcSel)pcSel.value=E.countries[idx].c;
      }
    });
  }

  /* ═══ Init ═══ */
  if(user){ensureConvo();showChat();renderMsgs();}else{showReg();}
  console.log("EuserChat ready.");
})();
