/* =========================
   CSK Fan Hub - script.js
   Editable data below:
   ========================= */

// ---------- CONFIG / DATA ----------
const PLAYERS = [
  // Replace these entries with real images & stats for accuracy
  { id:1, name:"MS Dhoni", role:"Captain • Wicketkeeper", bio:"Legendary leader. Finisher extraordinaire.", image:"msd.jpeg", matches:278, runs:5439, wickets:0, country:"India" },
  { id:2, name:"Ruturaj Gaikwad", role:"Batsman", bio:"Top-order opener with elegant strokeplay.", image:"ruturaj.jpeg", matches:72, runs:2800, wickets:0, country:"India" },
  { id:3, name:"Ravindra Jadeja", role:"All-rounder", bio:"Brilliant fielder, key all-rounder.", image:"jadeja.jpeg", matches:210, runs:2600, wickets:150, country:"India" },
  { id:4, name:"Deepak Chahar", role:"Pacer", bio:"Skilled new-ball bowler with swing.", image:"chahar.jpeg", matches:110, runs:200, wickets:120, country:"India" },
  { id:5, name:"Moeen Ali", role:"All-rounder", bio:"Spin-bowling all-rounder (overseas).", image:"moeen.jpeg", matches:50, runs:900, wickets:25, country:"England" },
  { id:6, name:"Devon Conway", role:"Batsman", bio:"Spin-bowling all-rounder (overseas).", image:"conway.jpeg", matches:50, runs:900, wickets:25, country:"New Zealand" },
  { id:7, name:"Imran Tahir", role:"Spin Bowler", bio:"Spin-bowling all-rounder (overseas).", image:"tahir.jpeg", matches:50, runs:900, wickets:25, country:"South Africa" },
  { id:8, name:"Dwayne Bravo", role:"All-rounder", bio:"Spin-bowling all-rounder (overseas).", image:"bravo.jpeg", matches:50, runs:900, wickets:25, country:"West Indies" },
  { id:9, name:"Suresh Raina", role:"Batsman", bio:"Top Ordered Batsmen with great shot selection", image:"raina.jpeg", matches:190, runs:900, wickets:25, country:"India" },
  { id:10, name:"Faf du Plesis", role:"Batsman", bio:"Top ordered opener-Right Handed (overseas).", image:"faf.jpeg", matches:50, runs:900, wickets:25, country:"South Africa" },
  { id:11, name:"Michael Hussey", role:"Batsman", bio:"Consistent Opener (overseas).", image:"hussey.jpeg", matches:50, runs:900, wickets:25, country:"Australia" },
  { id:12, name:"Murali Vijay", role:"Batsman", bio:"Dependent Run-getter at the top.", image:"murali.jpeg", matches:50, runs:900, wickets:25, country:"India" },
  { id:13, name:"Ambati Rayudu", role:"Batsman", bio:"Clutch middle order batsman.", image:"rayudu.jpeg", matches:50, runs:900, wickets:25, country:"India" },
  { id:14, name:"Ravichandran Ashwin", role:"All-rounder", bio:"Spin-bowling all-rounder-Right Handed.", image:"ash.jpeg", matches:50, runs:900, wickets:25, country:"India" },
  { id:15, name:"Shane Watson", role:"Batsman", bio:"Powerful batting,key performance in IPL finals (overseas).", image:"watson.jpeg", matches:50, runs:900, wickets:25, country:"Australia" },
  { id:16, name:"Ashish Nehra", role:"Pacer", bio:"Death Over Specialist.", image:"nehra.jpeg", matches:50, runs:150, wickets:25, country:"India" },


  // add more players here...
];

const SCHEDULE = [
  { id:1, date:"2025-03-25", opponent:"Mumbai Indians", venue:"Chepauk💛", time:"7:30 PM", home:true },
  { id:2, date:"2025-03-29", opponent:"Royal Challengers Bangalore", venue:"Bengaluru", time:"7:30 PM", home:false },
  { id:3, date:"2025-04-02", opponent:"Kolkata Knight Riders", venue:"Kolkata", time:"7:30 PM", home:false },
  { id:4, date:"2025-04-08", opponent:"Gujarat Titans", venue:"Chepauk💛", time:"3:30 PM", home:true },
  { id:5, date:"2025-04-13", opponent:"Lucknow Super Giants", venue:"Lucknow", time:"7:30 PM", home:false },
  { id:6, date:"2025-04-17", opponent:"Rajasthan Royals", venue:"Chepauk💛", time:"7:30 PM", home:true },
  { id:7, date:"2025-04-23", opponent:"Punjab Kings", venue:"Chepauk💛", time:"7:30 PM", home:true },
  { id:8, date:"2025-04-29", opponent:"Delhi Capitals", venue:"Delhi", time:"3:30 PM", home:false },
  { id:9, date:"2025-05-05", opponent:"Sunrisers Hyderabad", venue:"Chepauk💛", time:"7:30 PM", home:true },
  // add more fixtures...
];

// Poll storage key
const POLL_KEY = "csk_poll_votes_v1";

// ---------- DOM Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ---------- Initialize page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // fill players grid
  renderPlayers();

  // fill schedule
  renderSchedule();

  // fill poll options
  populatePoll();

  // hero counters animate
  animateHeroCounters();

  // year in footer
  $("#year").textContent = new Date().getFullYear();

  // nav toggle for mobile
  const navToggle = $("#navToggle");
  if(navToggle){
    navToggle.addEventListener("click", () => {
      const navList = $("#navList");
      const open = navList.style.display === "block";
      navList.style.display = open ? "none" : "block";
      navToggle.setAttribute("aria-expanded", String(!open));
    });
  }

  // contact form submit
  const contactForm = $("#contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleContact();
  });
});

/* ---------- Players rendering & modal ---------- */
function renderPlayers(){
  const grid = $("#playersGrid");
  grid.innerHTML = "";
  PLAYERS.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${player.image}" alt="${player.name}" class="player-thumb" loading="lazy" onerror="this.src='csk.png'">
      <div class="player-meta">
        <h4>${player.name}</h4>
        <div class="role">${player.role}</div>
      </div>
    `;
    card.addEventListener("click", () => openPlayerModal(player.id));
    card.addEventListener("keypress", (e) => { if(e.key === "Enter") openPlayerModal(player.id); });
    grid.appendChild(card);
  });
}

function openPlayerModal(id){
  const player = PLAYERS.find(p => p.id === id);
  if(!player) return;
  const modal = $("#playerModal");
  const body = $("#modalBody");
  body.innerHTML = `
    <div class="modal-grid">
      <div>
        <img src="${player.image}" alt="${player.name}" style="width:100%;max-width:320px;border-radius:8px;object-fit:cover" onerror="this.src='csk.png'">
      </div>
      <div>
        <h2 id="modalTitle">${player.name}</h2>
        <p class="muted">${player.role} • ${player.country}</p>
        <p style="margin-top:10px">${player.bio}</p>
        <div style="margin-top:12px;display:flex;gap:12px">
          <div><strong>${player.matches}</strong><div class="muted">Matches</div></div>
          <div><strong>${player.runs || '—'}</strong><div class="muted">Runs</div></div>
          <div><strong>${player.wickets || '—'}</strong><div class="muted">Wickets</div></div>
        </div>
        <div style="margin-top:16px">
          <button class="btn primary" onclick="alert('Follow feature demo')">Follow</button>
          <button class="btn ghost" onclick="closePlayerModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  $("#modalClose").addEventListener("click", closePlayerModal);
  window.addEventListener("keydown", modalEscHandler);
}

function closePlayerModal(){
  const modal = $("#playerModal");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  window.removeEventListener("keydown", modalEscHandler);
}

function modalEscHandler(e){
  if(e.key === "Escape") closePlayerModal();
}

/* ---------- Schedule rendering ---------- */
function renderSchedule(){
  const list = $("#scheduleList");
  list.innerHTML = "";
  SCHEDULE.forEach(item => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div class="match-opponent">${item.opponent}</div>
          <div class="muted">${item.date} • ${item.time}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">${item.venue}</div>
          <div style="color:var(--muted);font-size:13px">${item.home ? "Home" : "Away"}</div>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

/* ---------- Poll (Fan Zone) ---------- */
function populatePoll(){
  const select = $("#pollSelect");
  select.innerHTML = "";
  PLAYERS.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  $("#voteBtn").addEventListener("click", handleVote);
  renderPollMessage();
}

function handleVote(){
  const choice = $("#pollSelect").value;
  if(!choice) return alert("Choose a player to vote");
  const votes = JSON.parse(localStorage.getItem(POLL_KEY) || "{}");
  votes[choice] = (votes[choice] || 0) + 1;
  localStorage.setItem(POLL_KEY, JSON.stringify(votes));
  renderPollMessage();
  $("#pollMessage").textContent = `Thanks! You voted for ${choice}.`;
}

function renderPollMessage(){
  const votes = JSON.parse(localStorage.getItem(POLL_KEY) || "{}");
  const total = Object.values(votes).reduce((s,n) => s + n, 0);
  const top = Object.entries(votes).sort((a,b) => b[1]-a[1])[0];
  if(total === 0){
    $("#pollMessage").textContent = "No votes yet — be the first!";
  } else {
    $("#pollMessage").textContent = `Total votes: ${total}. Leader: ${top ? `${top[0]} (${top[1]})` : '—'}`;
  }
}

/* ---------- Contact form ---------- */
function handleContact(){
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const msg = $("#message").value.trim();
  if(!name || !email || !msg) {
    $("#contactMsg").textContent = "Please fill all fields.";
    return;
  }
  // Simple email check
  if(!/^\S+@\S+\.\S+$/.test(email)){
    $("#contactMsg").textContent = "Enter a valid email.";
    return;
  }
  // Demo: just show success and clear
  $("#contactMsg").textContent = "Thanks! Message sent (demo).";
  $("#contactForm").reset();
  // After a short delay, clear the message but keep space reserved
  setTimeout(() => {
    $("#contactMsg").textContent = "\u00A0";
  }, 2000);
}

/* ---------- Hero counters animation (optimized) ---------- */
function animateHeroCounters() {
  const nodes = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const node = entry.target;
        const target = +node.dataset.target || 0;
        const duration = 1000; // reduced animation time
        const startTime = performance.now();
        
        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3); // easing
          node.textContent = Math.floor(easeOut * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(node); // animate only once
      }
    });
  }, { threshold: 0.5 });
  
  nodes.forEach(node => observer.observe(node));
}


/* ---------- Utility / Fallback images ---------- */
// create images folder with player images or use provided placeholder
// Ensure images/players/placeholder.jpg exists for missing images

