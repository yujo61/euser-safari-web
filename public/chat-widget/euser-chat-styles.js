/* EuserChat v3 — Styles + Config + Data */
(function(){
  "use strict";
  window._EC = {};
  var C = window.EuserChatConfig || {};
  var b = C.brandColor || "#D4AF37";
  var bub = C.bubbleColor || b;
  var pos = C.position || "bottom-right";
  var isLeft = pos === "bottom-left";
  
  _EC.cfg = {
    webhookUrl: C.webhookUrl || "",
    agentName: C.agentName || "AI Assistant",
    agentTagline: C.agentTagline || "Online",
    brand: b,
    greeting: C.greeting || "Hello! How can I help you today?",
    sessionTTL: C.sessionTTL || 7,
    apiKey: C.apiKey || ""
  };

  _EC.ls = function(k,v){
    if(v===undefined){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}}
    try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}
  };
  _EC.lsDel = function(k){try{localStorage.removeItem(k);}catch(e){}};

  /* Session expiry check */
  _EC.checkExpiry = function(){
    var saved = _EC.ls("ec_user_ts");
    if(saved){
      var diff = (Date.now() - saved) / (1000*60*60*24);
      if(diff > _EC.cfg.sessionTTL){
        localStorage.removeItem("ec_user");
        localStorage.removeItem("ec_user_ts");
        localStorage.removeItem("ec_convos");
        localStorage.removeItem("ec_active");
        /* Clear all message keys */
        for(var i=localStorage.length-1;i>=0;i--){
          var key=localStorage.key(i);
          if(key && key.indexOf("ec_m_")===0) localStorage.removeItem(key);
        }
        return true;
      }
    }
    return false;
  };

  _EC.countries = [
    {n:"Kenya",c:"+254",f:"\ud83c\uddf0\ud83c\uddea",iso:"KE"},
    {n:"Tanzania",c:"+255",f:"\ud83c\uddf9\ud83c\uddff",iso:"TZ"},
    {n:"Uganda",c:"+256",f:"\ud83c\uddfa\ud83c\uddec",iso:"UG"},
    {n:"Rwanda",c:"+250",f:"\ud83c\uddf7\ud83c\uddfc",iso:"RW"},
    {n:"Ethiopia",c:"+251",f:"\ud83c\uddea\ud83c\uddf9",iso:"ET"},
    {n:"South Africa",c:"+27",f:"\ud83c\uddff\ud83c\udde6",iso:"ZA"},
    {n:"Nigeria",c:"+234",f:"\ud83c\uddf3\ud83c\uddec",iso:"NG"},
    {n:"Ghana",c:"+233",f:"\ud83c\uddec\ud83c\udded",iso:"GH"},
    {n:"Egypt",c:"+20",f:"\ud83c\uddea\ud83c\uddec",iso:"EG"},
    {n:"Morocco",c:"+212",f:"\ud83c\uddf2\ud83c\udde6",iso:"MA"},
    {n:"Senegal",c:"+221",f:"\ud83c\uddf8\ud83c\uddf3",iso:"SN"},
    {n:"Cameroon",c:"+237",f:"\ud83c\udde8\ud83c\uddf2",iso:"CM"},
    {n:"Botswana",c:"+267",f:"\ud83c\udde7\ud83c\uddfc",iso:"BW"},
    {n:"Zimbabwe",c:"+263",f:"\ud83c\uddff\ud83c\uddfc",iso:"ZW"},
    {n:"Mozambique",c:"+258",f:"\ud83c\uddf2\ud83c\uddff",iso:"MZ"},
    {n:"United States",c:"+1",f:"\ud83c\uddfa\ud83c\uddf8",iso:"US"},
    {n:"United Kingdom",c:"+44",f:"\ud83c\uddec\ud83c\udde7",iso:"GB"},
    {n:"Canada",c:"+1",f:"\ud83c\udde8\ud83c\udde6",iso:"CA"},
    {n:"Germany",c:"+49",f:"\ud83c\udde9\ud83c\uddea",iso:"DE"},
    {n:"France",c:"+33",f:"\ud83c\uddeb\ud83c\uddf7",iso:"FR"},
    {n:"Italy",c:"+39",f:"\ud83c\uddee\ud83c\uddf9",iso:"IT"},
    {n:"Spain",c:"+34",f:"\ud83c\uddea\ud83c\uddf8",iso:"ES"},
    {n:"Netherlands",c:"+31",f:"\ud83c\uddf3\ud83c\uddf1",iso:"NL"},
    {n:"Belgium",c:"+32",f:"\ud83c\udde7\ud83c\uddea",iso:"BE"},
    {n:"Portugal",c:"+351",f:"\ud83c\uddf5\ud83c\uddf9",iso:"PT"},
    {n:"Austria",c:"+43",f:"\ud83c\udde6\ud83c\uddf9",iso:"AT"},
    {n:"Poland",c:"+48",f:"\ud83c\uddf5\ud83c\uddf1",iso:"PL"},
    {n:"Sweden",c:"+46",f:"\ud83c\uddf8\ud83c\uddea",iso:"SE"},
    {n:"Norway",c:"+47",f:"\ud83c\uddf3\ud83c\uddf4",iso:"NO"},
    {n:"Denmark",c:"+45",f:"\ud83c\udde9\ud83c\uddf0",iso:"DK"},
    {n:"Finland",c:"+358",f:"\ud83c\uddeb\ud83c\uddee",iso:"FI"},
    {n:"Switzerland",c:"+41",f:"\ud83c\udde8\ud83c\udded",iso:"CH"},
    {n:"Ireland",c:"+353",f:"\ud83c\uddee\ud83c\uddea",iso:"IE"},
    {n:"Australia",c:"+61",f:"\ud83c\udde6\ud83c\uddfa",iso:"AU"},
    {n:"New Zealand",c:"+64",f:"\ud83c\uddf3\ud83c\uddff",iso:"NZ"},
    {n:"India",c:"+91",f:"\ud83c\uddee\ud83c\uddf3",iso:"IN"},
    {n:"China",c:"+86",f:"\ud83c\udde8\ud83c\uddf3",iso:"CN"},
    {n:"Japan",c:"+81",f:"\ud83c\uddef\ud83c\uddf5",iso:"JP"},
    {n:"South Korea",c:"+82",f:"\ud83c\uddf0\ud83c\uddf7",iso:"KR"},
    {n:"Singapore",c:"+65",f:"\ud83c\uddf8\ud83c\uddec",iso:"SG"},
    {n:"Malaysia",c:"+60",f:"\ud83c\uddf2\ud83c\uddfe",iso:"MY"},
    {n:"Thailand",c:"+66",f:"\ud83c\uddf9\ud83c\udded",iso:"TH"},
    {n:"Philippines",c:"+63",f:"\ud83c\uddf5\ud83c\udded",iso:"PH"},
    {n:"Indonesia",c:"+62",f:"\ud83c\uddee\ud83c\udde9",iso:"ID"},
    {n:"Brazil",c:"+55",f:"\ud83c\udde7\ud83c\uddf7",iso:"BR"},
    {n:"Mexico",c:"+52",f:"\ud83c\uddf2\ud83c\uddfd",iso:"MX"},
    {n:"Argentina",c:"+54",f:"\ud83c\udde6\ud83c\uddf7",iso:"AR"},
    {n:"Colombia",c:"+57",f:"\ud83c\udde8\ud83c\uddf4",iso:"CO"},
    {n:"UAE",c:"+971",f:"\ud83c\udde6\ud83c\uddea",iso:"AE"},
    {n:"Saudi Arabia",c:"+966",f:"\ud83c\uddf8\ud83c\udde6",iso:"SA"},
    {n:"Qatar",c:"+974",f:"\ud83c\uddf6\ud83c\udde6",iso:"QA"},
    {n:"Israel",c:"+972",f:"\ud83c\uddee\ud83c\uddf1",iso:"IL"},
    {n:"Turkey",c:"+90",f:"\ud83c\uddf9\ud83c\uddf7",iso:"TR"},
    {n:"Russia",c:"+7",f:"\ud83c\uddf7\ud83c\uddfa",iso:"RU"},
    {n:"Pakistan",c:"+92",f:"\ud83c\uddf5\ud83c\uddf0",iso:"PK"}
  ];

  /* IP detection */
  _EC.detectCountry = function(cb){
    fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(3000)})
    .then(function(r){return r.json();})
    .then(function(d){cb(d.country_code||"KE");})
    .catch(function(){cb("KE");});
  };

  /* Google Font */
  var lnk=document.createElement("link");
  lnk.rel="stylesheet";lnk.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
  document.head.appendChild(lnk);

  /* CSS */
  var css=document.createElement("style");css.id="ec-css";
  css.textContent=[
    ".ec-wrap{position:fixed;bottom:0;"+(isLeft?"left":"right")+":24px;z-index:999999;font-family:'Inter',system-ui,sans-serif;font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}",
    ".ec-fab{position:fixed;bottom:24px;"+(isLeft?"left":"right")+":24px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,"+bub+",#c9962b);box-shadow:0 4px 20px rgba(0,0,0,0.3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s;border:none;z-index:999999}",
    ".ec-fab:hover{transform:scale(1.06)}",
    ".ec-fab svg{width:24px;height:24px;fill:#000}",
    ".ec-win{position:fixed;bottom:0;"+(isLeft?"left":"right")+":24px;width:380px;height:620px;max-height:100vh;background:rgba(14,14,14,0.96);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.06);border-bottom:none;border-radius:20px 20px 0 0;display:none;flex-direction:column;box-shadow:0 -4px 40px rgba(0,0,0,0.5);overflow:hidden}",
    ".ec-win.open{display:flex}",
    ".ec-hdr{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;background:rgba(18,18,18,0.98);flex-shrink:0}",
    ".ec-hdr-l{display:flex;align-items:center;gap:8px}",
    ".ec-hdr-dot{width:6px;height:6px;background:#10B981;border-radius:50%;box-shadow:0 0 6px #10B981;flex-shrink:0}",
    ".ec-hdr-n{color:#fff;font-weight:600;font-size:13px}",
    ".ec-hdr-s{color:rgba(255,255,255,0.35);font-size:11px}",
    ".ec-hdr-acts{display:flex;gap:2px}",
    ".ec-ib{background:none;border:none;color:rgba(255,255,255,0.3);cursor:pointer;padding:6px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:color .15s,background .15s}",
    ".ec-ib:hover{color:#fff;background:rgba(255,255,255,0.06)}",
    ".ec-ib svg{width:15px;height:15px}",
    ".ec-body{flex:1;display:flex;flex-direction:column;min-height:0;position:relative}",
    ".ec-msgs{flex:1;padding:14px;display:flex;flex-direction:column;gap:6px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}",
    ".ec-msgs::-webkit-scrollbar{display:none;width:0}",
    ".ec-m-wrap{display:flex;flex-direction:column;animation:ecIn .2s ease}",
    ".ec-m-wrap.usr{align-items:flex-end}",
    ".ec-m-wrap.ai{align-items:flex-start}",
    "@keyframes ecIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}",
    ".ec-m{max-width:80%;padding:10px 14px;font-size:13px;line-height:1.6;word-wrap:break-word}",
    ".ec-m.usr{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.9);border-radius:16px 16px 4px 16px}",
    ".ec-m.ai{background:rgba(22,22,22,0.9);color:rgba(255,255,255,0.8);border-radius:16px 16px 16px 4px;border:1px solid rgba(255,255,255,0.04)}",
    ".ec-m.ai img{max-width:100%;border-radius:8px;margin:6px 0;display:block}",
    ".ec-m.ai a{color:"+b+";text-decoration:none}",
    ".ec-m.ai a:hover{text-decoration:underline}",
    ".ec-ts{font-size:10px;color:rgba(255,255,255,0.2);margin-top:3px;padding:0 4px}",
    ".ec-typ{display:none;align-items:center;gap:5px;padding:10px 14px;background:rgba(22,22,22,0.9);border-radius:16px 16px 16px 4px;border:1px solid rgba(255,255,255,0.04);width:fit-content;margin-right:auto}",
    ".ec-typ.on{display:flex}",
    ".ec-td{width:5px;height:5px;background:rgba(255,255,255,0.25);border-radius:50%;animation:ecB 1.4s infinite ease-in-out both}",
    ".ec-td:nth-child(1){animation-delay:-.32s}.ec-td:nth-child(2){animation-delay:-.16s}",
    "@keyframes ecB{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}",
    ".ec-foot{padding:10px 14px;border-top:1px solid rgba(255,255,255,0.04);display:flex;gap:8px;align-items:flex-end;flex-shrink:0;background:rgba(10,10,10,0.6)}",
    ".ec-inp{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:9px 14px;color:#fff;font-size:13px;outline:none;transition:border-color .2s;font-family:inherit;resize:none;min-height:38px;max-height:120px;line-height:20px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}",
    ".ec-inp::-webkit-scrollbar{display:none;width:0}",
    ".ec-inp:focus{border-color:rgba(255,255,255,0.15)}",
    ".ec-inp::placeholder{color:rgba(255,255,255,0.18)}",
    ".ec-sbtn{background:none;border:none;color:rgba(255,255,255,0.25);cursor:pointer;padding:8px 6px;display:flex;align-items:center;transition:color .2s}",
    ".ec-sbtn:hover{color:"+b+"}",
    ".ec-sbtn:disabled{color:rgba(255,255,255,0.08);cursor:not-allowed}",
    ".ec-sbtn svg{width:20px;height:20px}",
    /* Registration */
    ".ec-reg{flex:1;padding:24px 18px;display:flex;flex-direction:column;gap:11px;overflow-y:auto}",
    ".ec-reg h3{color:#fff;font-size:15px;font-weight:600;margin:0}",
    ".ec-reg p{color:rgba(255,255,255,0.35);font-size:12px;margin:0 0 2px;line-height:1.5}",
    ".ec-fg{display:flex;flex-direction:column;gap:4px}",
    ".ec-fg label{color:rgba(255,255,255,0.4);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px}",
    ".ec-fg input,.ec-fg select{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;transition:border-color .2s;font-family:inherit}",
    ".ec-fg input:focus,.ec-fg select:focus{border-color:"+b+"}",
    ".ec-fg input::placeholder{color:rgba(255,255,255,0.15)}",
    ".ec-fg select{appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 12px center}",
    ".ec-fg select option{background:#141414;color:#fff}",
    /* Error state */
    ".ec-fg.err input,.ec-fg.err select{border-color:#ef4444}",
    ".ec-fg .ec-err{color:#ef4444;font-size:10px;margin-top:1px;display:none}",
    ".ec-fg.err .ec-err{display:block}",
    /* Name row side by side */
    ".ec-name-row{display:flex;gap:8px}",
    ".ec-name-row .ec-fg{flex:1;min-width:0}",
    /* Phone row */
    ".ec-ph-row{display:flex;gap:6px}",
    ".ec-ph-row select{width:100px;flex-shrink:0;font-size:12px;padding:9px 6px}",
    ".ec-ph-row input{flex:1;min-width:0}",
    /* Premium button */
    ".ec-rbtn{background:linear-gradient(135deg,"+b+" 0%,#e8c44a 50%,"+b+" 100%);background-size:200% 200%;color:#000;border:none;border-radius:12px;padding:12px;font-size:13px;font-weight:600;cursor:pointer;transition:background-position .4s,box-shadow .3s;font-family:inherit;margin-top:4px;letter-spacing:0.3px;box-shadow:0 2px 12px rgba(212,175,55,0.2)}",
    ".ec-rbtn:hover{background-position:100% 100%;box-shadow:0 4px 20px rgba(212,175,55,0.35)}",
    /* Sidebar */
    ".ec-side{position:absolute;inset:0;background:rgba(12,12,12,0.98);backdrop-filter:blur(24px);display:none;flex-direction:column;z-index:2}",
    ".ec-side.open{display:flex}",
    ".ec-side-hdr{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between}",
    ".ec-side-hdr span{color:#fff;font-weight:600;font-size:13px}",
    ".ec-side-list{flex:1;overflow-y:auto;padding:6px 8px}",
    ".ec-si{padding:9px 10px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background .12s;margin-bottom:2px}",
    ".ec-si:hover{background:rgba(255,255,255,0.04)}",
    ".ec-si.act{background:rgba(255,255,255,0.06)}",
    ".ec-si-l{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1}",
    ".ec-si-t{color:rgba(255,255,255,0.85);font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".ec-si-d{color:rgba(255,255,255,0.2);font-size:10px}",
    ".ec-si-del{background:none;border:none;color:rgba(255,255,255,0.15);cursor:pointer;padding:4px;border-radius:6px;display:flex;flex-shrink:0;transition:color .15s}",
    ".ec-si-del:hover{color:#ef4444}",
    ".ec-si-del svg{width:13px;height:13px}",
    ".ec-side-new{margin:8px;padding:11px;border-radius:12px;background:linear-gradient(135deg,"+b+",#e8c44a);color:#000;font-size:13px;font-weight:600;text-align:center;cursor:pointer;transition:opacity .15s;flex-shrink:0;letter-spacing:0.3px;box-shadow:0 2px 12px rgba(212,175,55,0.15)}",
    ".ec-side-new:hover{opacity:0.88}",
    ".ec-side-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:rgba(255,255,255,0.2);font-size:13px;padding:20px}",
    ".ec-badge{text-align:center;padding:6px;flex-shrink:0;border-top:1px solid rgba(255,255,255,0.03)}",
    ".ec-badge a{color:rgba(255,255,255,0.15);font-size:9px;text-decoration:none;letter-spacing:0.5px;transition:color .2s}",
    ".ec-badge a:hover{color:rgba(255,255,255,0.35)}",
    "@media(max-width:480px){.ec-win{right:0;left:0;width:100%;height:100%;max-height:100%;border-radius:0}}",
    /* PDF download card */
    ".ec-pdf-card{display:flex;align-items:center;gap:10px;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.25);border-radius:12px;padding:10px 14px;margin:6px 0;text-decoration:none;color:inherit;transition:background .2s,border-color .2s;cursor:pointer}",
    ".ec-pdf-card:hover{background:rgba(212,175,55,0.15);border-color:rgba(212,175,55,0.5)}",
    ".ec-pdf-icon{color:"+b+";flex-shrink:0;display:flex;align-items:center}",
    ".ec-pdf-info{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}",
    ".ec-pdf-name{color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;line-height:1.3}",
    ".ec-pdf-sub{color:rgba(255,255,255,0.35);font-size:10px}",
    ".ec-pdf-dl{color:"+b+";flex-shrink:0;display:flex;align-items:center;opacity:0.7}",
    ".ec-m.ai img{max-width:100%;border-radius:10px;margin:5px 0;display:block}"
  ].join("\n");
  document.head.appendChild(css);
})();

