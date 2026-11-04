/* ===== Content: edit here to update the site ===== */
const SKILLS = {
  'Programming Languages': ['Java'],
  'Backend Development': ['Spring Boot', 'REST API Development', 'CRUD Operations'],
  'Databases': ['PostgreSQL', 'SQLite', 'SQL'],
  'Frontend': ['HTML', 'CSS', 'JavaScript'],
  'API Development and Testing': ['Postman', 'Swagger/OpenAPI'],
  'Developer Tools': ['IntelliJ IDEA', 'VS Code', 'pgAdmin', 'DBeaver', 'Git', 'GitHub'],
  'Hardware and IoT': ['Raspberry Pi', 'RFID', 'Arduino', 'GPIO']
};

/* Add a `github` or `demo` URL ONLY once verified. Links render only when present. */
const PROJECTS = [
  {
    name: 'Entry & Exit Management System',
    badge: 'Company team project · iBEST Solutions',
    description: 'An IoT-based system that manages vehicle entry and exit for residential and corporate premises.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'Postman', 'Swagger', 'Raspberry Pi', 'Python', 'React'],
    features: ['Authorized vehicle and access-related data management', 'Backend services integrated with IoT devices', 'REST APIs documented with Swagger/OpenAPI'],
    mine: 'My contribution: backend development with Java and Spring Boot, API creation, testing and documentation, PostgreSQL data work, and supporting backend–IoT integration. The wider system is built by a team; source code is confidential and not public.'
  },
  {
    name: 'Car Over Speed Alerting System',
    badge: 'Academic team project · Team Leader',
    description: 'Calculates vehicle speed from the time taken between two IR sensor detection points, shows it on an LCD, and sounds a buzzer when a set speed threshold is exceeded.',
    tech: ['AT89S52 Microcontroller', 'IR Transmitter/Receiver', 'LCD', 'Buzzer', 'Keil µVision', 'C51 Compiler'],
    features: ['Speed calculated from two IR detection points', 'Live speed shown on an LCD', 'Buzzer alert above the speed threshold'],
    mine: 'My role: Team Leader.'
  }
];

const PROFILE = {
  name: 'Dhanalakshmi Basala', company: 'iBEST Solutions', role: 'Software Trainee',
  focus: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'], location: 'Hyderabad, India'
};
/* ================================================ */

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const tags = list => `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

// Skills
const skillGrid = $('#skill-grid');
Object.entries(SKILLS).forEach(([cat, items]) => skillGrid.append(el('article', 'card reveal', `<h3>${esc(cat)}</h3>${tags(items)}`)));

// Projects
const projGrid = $('#project-grid');
PROJECTS.forEach(p => {
  const links = [p.github && `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub repository</a>`,
                 p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>`].filter(Boolean).join('');
  projGrid.append(el('article', 'card proj reveal', `
    <h3>${esc(p.name)}</h3><p class="date">${esc(p.badge)}</p>
    <p>${esc(p.description)}</p>
    <h4>Technologies</h4>${tags(p.tech)}
    <h4>Key features</h4><ul>${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <p class="mine">${esc(p.mine)}</p>
    ${links ? `<div class="proj-links">${links}</div>` : ''}`));
});

// Hero "API response": typed once on load (skipped for reduced motion)
const json = JSON.stringify(PROFILE, null, 2);
const out = $('#json');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) out.textContent = json;
else { let i = 0; const tick = () => { out.textContent = json.slice(0, i += 3); if (i < json.length) setTimeout(tick, 18); }; tick(); }

// Theme toggle
const root = document.documentElement, themeBtn = $('#theme');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const syncTheme = () => themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
themeBtn.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  syncTheme();
});
syncTheme();

// Mobile menu
const menu = $('#menu'), burger = $('#burger');
const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.matches('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Active nav link + reveal
const navLinks = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(n => rv.observe(n));

// Back to top
const topBtn = $('#top');
addEventListener('scroll', () => { topBtn.hidden = scrollY < 600; }, { passive: true });
topBtn.addEventListener('click', () => scrollTo({ top: 0 }));

// Contact form: no backend configured. It opens the visitor's email app with the message prefilled.
// For a real service (e.g. Formspree), see README.
const form = $('#contact-form'), status = $('#form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const d = new FormData(form);
  const body = `${d.get('message')}\n\nFrom: ${d.get('name')} (${d.get('email')})`;
  location.href = `mailto:dhanalakshmibasala@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email app should open with the message ready. Nothing is sent until you press send there.';
});

$('#year').textContent = new Date().getFullYear();
