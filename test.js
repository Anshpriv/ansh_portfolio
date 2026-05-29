
// ENTRY VIDEO SEQUENCE
const entryOverlay = document.getElementById('entry-overlay');
const entryIntroVideo = document.getElementById('entry-intro-video');
const entryPlayBtn = document.getElementById('entry-play-btn');
const heroName = document.querySelector('.hero-name');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

function playVideoToEnd(video) {
  return new Promise(resolve => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      resolve();
    };
    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(finish);
  });
}

async function runEntrySequence() {
  if (entryPlayBtn) {
    entryPlayBtn.style.opacity = '0';
    entryPlayBtn.style.pointerEvents = 'none';
  }
  await playVideoToEnd(entryIntroVideo);
  entryOverlay.classList.add('done');
  document.body.classList.remove('entry-active');
  await wait(650);
  heroName.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
if (entryPlayBtn) {
  entryPlayBtn.addEventListener('click', runEntrySequence);
}

// VIEW ME VIDEO LOGIC
const viewMeBtn = document.getElementById('view-me-btn');
const paragraphVideoContainer = document.getElementById('paragraph-video-container');
const paragraphVideo = document.getElementById('paragraph-video');

if (viewMeBtn && paragraphVideo) {
  viewMeBtn.addEventListener('click', async () => {
    paragraphVideoContainer.style.display = 'block';
    viewMeBtn.style.display = 'none';
    await playVideoToEnd(paragraphVideo);
    paragraphVideoContainer.style.display = 'none';
    viewMeBtn.style.display = 'inline-flex';
  });
}

// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();

// CANVAS BG — particle field
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.4 + 0.4;
    this.a = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '200,181,255' : Math.random() > 0.5 ? '126,255,245' : '255,202,122';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.a})`;
    ctx.fill();
  }
}
for (let i = 0; i < 120; i++) particles.push(new Particle());
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(200,181,255,${0.08 * (1 - d / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// DATA
const honors = [
  { badge: '🥇 1st Prize · Overall Winner', badgeClass: 'gold', num: '01', title: 'Pragyantra National AI Hackathon', desc: 'Won 1st prize across all domains at a national-level AI hackathon. Built a deployable AI solution in an intense 8-hour sprint against national competitors.', tags: ['National Level', 'AI Hackathon', '8-Hour Sprint', 'Winner'] },
  { badge: '🥉 3rd Prize', badgeClass: 'teal', num: '02', title: 'Symbiosis National Level Project Expo', desc: 'Secured 3rd prize at a national-level project exhibition, presenting a strong technical solution before external evaluators and professional panels.', tags: ['Project Expo', 'External Jury', 'Presentation'] },
  { badge: '⚡ Organizer Secretariat', badgeClass: '', num: '03', title: 'IGNISIA National AI Hackathon', desc: 'Contributed to event coordination, participant handling, operational planning, and technical problem-tracking for a National AI Hackathon.', tags: ['Leadership', 'Coordination', 'Operations'] },
];

const projects = [
  { title: 'Capstone Registration Portal', desc: 'Full-stack platform for MIT-WPU Polytechnic capstone projects with multi-role dashboards and an AI-powered idea similarity checker.', img: 'assets/generated/capstone-portal.jpg', stack: ['JavaScript', 'Node.js', 'Supabase', 'HTML', 'CSS'], link: 'https://mitcapstoneregistration.netlify.app/' },
  { title: 'FANET Drone Communication', desc: 'Drone communication concept enabling real-time data exchange and coordination across swarm operations using FANET-based network thinking.', img: 'assets/generated/drone-fanet.jpg', stack: ['Python', 'FANET', 'AI', 'ML'], link: 'https://neuromesh.onrender.com/' },
  { title: 'Blue Carbon Registry', desc: 'Blockchain-based system for tracking and verifying blue carbon credits, improving transparency in environmental offset projects.', img: 'assets/generated/blue-carbon.jpg', stack: ['Blockchain', 'TypeScript', 'ML'], link: 'https://sih2k25.netlify.app/' },
  { title: 'Kisan Setu', desc: 'Decision-support app for farmers that recommends suitable crops using soil, weather, and environmental parameters through ML.', img: 'assets/generated/kisan-setu.jpg', stack: ['Python', 'Streamlit', 'SQL', 'ML'], link: 'https://kisaan-setu-1.onrender.com/' },
  { title: 'Helmet Accident Detection', desc: 'Smart helmet safety system concept using sensors to detect accidents and trigger real-time alerts to emergency contacts.', img: 'assets/generated/smart-helmet.jpg', stack: ['IoT', 'Sensors', 'HTML'], link: 'https://neuroguard.netlify.app/' },
  { title: 'English to SQL Converter', desc: 'NLP-powered web app that turns plain English queries into SQL commands, making database access easier for non-technical users.', img: 'assets/generated/hackathon-ai.jpg', stack: ['Python', 'NLP', 'SQL'], link: 'https://english-to-sql-pbl2.onrender.com' },
  { title: 'Student Attendance Tracker', desc: 'Teacher-friendly attendance platform for creating classes, managing students, and marking attendance with a simple workflow.', img: 'assets/generated/capstone-portal.jpg', stack: ['Python', 'Streamlit', 'SQL', 'Supabase'], link: 'https://attendancestraker.onrender.com' },
  { title: 'Anomaly Detection', desc: 'Transaction anomaly detection web app that surfaces suspicious patterns from uploaded or user-provided financial data.', img: 'assets/generated/hackathon-ai.jpg', stack: ['TypeScript', 'Vite', 'Tailwind CSS'], link: 'https://cyberpluse.netlify.app/' },
  { title: 'Movie Picker', desc: 'Playful React app that removes movie-night indecision by spinning through a curated set of random film suggestions.', img: 'assets/generated/capstone-portal.jpg', stack: ['HTML5', 'Tailwind CSS', 'React 18'], link: 'https://pop-spin-cinema.netlify.app/' },
];

const skills = [
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Java', icon: 'fab fa-java' },
  { name: 'JavaScript', icon: 'fab fa-js-square' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'SQL', icon: 'fas fa-database' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
];

const timeline = [
  { date: '2026', title: '1st Prize — Pragyantra National AI Hackathon', desc: 'Built and presented a deployable AI solution inside an 8-hour sprint, winning overall across domains.' },
  { date: '2026', title: '3rd Prize — Symbiosis National Project Expo', desc: 'Presented to external professional panels and secured a national-level podium finish.' },
  { date: '2026', title: 'Organizer Secretariat — IGNISIA Hackathon', desc: 'Handled event coordination, participant flow, planning support, and technical problem-tracking.' },
  { date: 'Ongoing', title: 'AI & Data Science at MIT-WPU', desc: 'Building applied AI, data, and full-stack projects with a focus on practical delivery.' },
];

const certs = [
  { name: 'Power BI for Beginners', issuer: 'Microsoft & Simplilearn', path: 'POWER_BI.png' },
  { name: 'SIH 2025 Internal Hackathon', issuer: 'MIT-WPU', path: 'SIH_2k25.jpg' },
  { name: 'Social Media Internship', issuer: 'People Conexxions', path: 'Ansh_internship.png' },
  { name: 'SIH 2023 Internal Nomination', issuer: 'MIT-WPU', path: 'Ansh_sih_2023.png' },
  { name: 'Basketball Committee Member', issuer: 'MIT-WPU Polytechnic', path: 'commite_basketball.jpg' },
  { name: 'FLAME Football Champions League', issuer: 'FLAME University', path: 'flames_basketball_win.jpg' },
  { name: 'Inter-Dept Basketball Runner Up', issuer: 'MIT-WPU Polytechnic', path: 'Inter_depts_runnerUp.jpg' },
  { name: 'Reliance Foundation Jr. NBA', issuer: 'Jr. NBA', path: 'junior_nba.jpg' },
  { name: 'Inter-Dept Basketball Referee', issuer: 'MIT-WPU Polytechnic', path: 'mit_interdepts_refering.jpg' },
  { name: 'Commando Training Program', issuer: 'Dhruv Defence Motivation Center', path: 'self_defence_training.jpg' },
  { name: 'DAV National Sports', issuer: 'DAV College Managing Committee', path: 'basketball_national.jpg' },
  { name: 'Java Course Mastering The Fundamentals', issuer: 'Scaler Topics', path: 'Ansh thakare java Certificate.jpg' },
];

// MARQUEE
const marqueeItems = ['Python', 'Machine Learning', 'Full-Stack Dev', 'AI Systems', 'Node.js', 'Blockchain', 'SQL', 'NLP', 'IoT', 'Data Science', 'Hackathon Winner', 'National Athlete'];
const track = document.getElementById('marquee-track');
const doubled = [...marqueeItems, ...marqueeItems];
track.innerHTML = doubled.map(m => `<span class="marquee-item"><i class="fas fa-circle"></i>${m}</span>`).join('');

// RENDER HONORS
document.getElementById('honors-grid').innerHTML = honors.map((h, i) => `
  <article class="honor-card reveal" style="--d:${i * 120}ms">
    <div class="honor-num">${h.num}</div>
    <span class="honor-badge ${h.badgeClass}">${h.badge}</span>
    <h3 class="honor-title">${h.title}</h3>
    <p class="honor-desc">${h.desc}</p>
    <div class="honor-tags">${h.tags.map(t => `<span class="htag">${t}</span>`).join('')}</div>
  </article>
`).join('');

// RENDER PROJECTS (paginated)
const projGrid = document.getElementById('projects-grid');
const viewMoreBtn = document.getElementById('view-more-btn');
const viewLessBtn = document.getElementById('view-less-btn');
const INIT_PROJ = 6;
function makeProjectCard(p, i) {
  const el = document.createElement('article');
  el.className = 'project-card reveal';
  el.style.setProperty('--d', `${(i % 6) * 100}ms`);
  el.innerHTML = `
    <div class="project-img-wrap">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="project-img-overlay"></div>
      <span class="project-img-num">${String(i+1).padStart(2,'0')}</span>
    </div>
    <div class="project-body">
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
      <a href="${p.link}" target="_blank" class="project-link">Open Project <i class="fas fa-arrow-up-right-from-square"></i></a>
    </div>
  `;
  return el;
}
function renderProjects(count) {
  projGrid.innerHTML = '';
  projects.slice(0, count).forEach((p, i) => projGrid.appendChild(makeProjectCard(p, i)));
  setTimeout(() => observeAll(), 50);
}
renderProjects(INIT_PROJ);
viewMoreBtn.addEventListener('click', () => {
  renderProjects(projects.length);
  viewMoreBtn.classList.add('hidden');
  viewLessBtn.classList.remove('hidden');
});
viewLessBtn.addEventListener('click', () => {
  renderProjects(INIT_PROJ);
  viewLessBtn.classList.add('hidden');
  viewMoreBtn.classList.remove('hidden');
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// RENDER SKILLS
document.getElementById('skills-grid').innerHTML = skills.map((s, i) => `
  <div class="skill-item reveal" style="--d:${i * 80}ms">
    <i class="${s.icon}"></i>
    <span>${s.name}</span>
  </div>
`).join('');

// RENDER TIMELINE
document.getElementById('timeline').innerHTML = timeline.map((t, i) => `
  <div class="timeline-item reveal" style="--d:${i * 130}ms">
    <p class="tl-date">${t.date}</p>
    <h3 class="tl-title">${t.title}</h3>
    <p class="tl-desc">${t.desc}</p>
  </div>
`).join('');

// RENDER CERTS (paginated)
const certsGrid = document.getElementById('certs-grid');
const viewMoreCerts = document.getElementById('view-more-certs-btn');
const viewLessCerts = document.getElementById('view-less-certs-btn');
const INIT_CERTS = 6;
function makeCertCard(c, i) {
  const el = document.createElement('article');
  el.className = 'cert-card reveal';
  el.style.setProperty('--d', `${(i % 6) * 90}ms`);
  el.innerHTML = `
    <div class="cert-img-wrap">
      <img src="${c.path}" alt="${c.name}" loading="lazy">
      <div class="cert-overlay"><button class="cert-view-btn">View Proof</button></div>
    </div>
    <div class="cert-body">
      <div class="cert-name">${c.name}</div>
      <div class="cert-issuer">${c.issuer}</div>
    </div>
  `;
  el.addEventListener('click', () => openModal(c.path));
  return el;
}
function renderCerts(count) {
  certsGrid.innerHTML = '';
  certs.slice(0, count).forEach((c, i) => certsGrid.appendChild(makeCertCard(c, i)));
  setTimeout(() => observeAll(), 50);
}
renderCerts(INIT_CERTS);
viewMoreCerts.addEventListener('click', () => {
  renderCerts(certs.length);
  viewMoreCerts.classList.add('hidden');
  viewLessCerts.classList.remove('hidden');
});
viewLessCerts.addEventListener('click', () => {
  renderCerts(INIT_CERTS);
  viewLessCerts.classList.add('hidden');
  viewMoreCerts.classList.remove('hidden');
  document.getElementById('certificates').scrollIntoView({ behavior: 'smooth' });
});

// MODAL
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
function openModal(src) { modalImg.src = src; modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// INTERSECTION OBSERVER
function observeAll() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}
observeAll();

// CONTACT FORM
const emailToggle = document.getElementById('show-email-form');
const emailPanel = document.getElementById('email-panel');
const contactForm = document.getElementById('contact-form');
emailToggle.addEventListener('click', () => {
  const isOpen = emailPanel.classList.toggle('open');
  emailToggle.setAttribute('aria-expanded', String(isOpen));
  emailToggle.innerHTML = isOpen
    ? '<i class="fas fa-envelope-open-text"></i> Hide Email Form'
    : '<i class="fas fa-paper-plane"></i> Send Email';
  if (isOpen) {
    emailPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => contactForm.elements.name?.focus(), 320);
  }
});

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const status = document.getElementById('form-status');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  status.style.color = 'var(--accent)';
  status.textContent = 'Sending your message...';
  try {
    const res = await fetch('https://formsubmit.co/ajax/thakareansh3@gmail.com', {
      method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target)
    });
    if (!res.ok) throw new Error();
    e.target.reset();
    status.style.color = 'var(--accent2)';
    status.textContent = '✓ Message sent. I\'ll get back to you soon.';
  } catch {
    status.style.color = 'var(--accent3)';
    status.textContent = 'Could not send. Please try again.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});
