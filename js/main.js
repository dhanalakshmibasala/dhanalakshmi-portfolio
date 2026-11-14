
/* ==================================================
   PORTFOLIO CONTENT
   Edit this section to update your site
================================================== */

const SKILLS = {
  'Programming Languages': ['Java'],
  'Backend Development': [
    'Spring Boot',
    'REST API Development',
    'CRUD Operations'
  ],
  'Databases': ['PostgreSQL', 'SQLite', 'SQL'],
  'Frontend': ['HTML', 'CSS', 'JavaScript'],
  'API Development and Testing': ['Postman', 'Swagger/OpenAPI'],
  'Developer Tools': [
    'IntelliJ IDEA',
    'VS Code',
    'pgAdmin',
    'DBeaver',
    'Git',
    'GitHub'
  ],
  'Hardware and IoT': [
    'Raspberry Pi',
    'RFID',
    'Arduino',
    'GPIO'
  ]
};

/* Add GitHub or demo URLs only after verifying them */

const PROJECTS = [
  {
    name: 'Entry & Exit Management System',
    badge: 'Company team project · iBEST Solutions',
    description:
      'An IoT-based system that manages vehicle entry and exit for residential and corporate premises.',
    tech: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST APIs',
      'Postman',
      'Swagger',
      'Raspberry Pi',
      'Python',
      'React'
    ],
    features: [
      'Authorized vehicle and access-related data management',
      'Backend services integrated with IoT devices',
      'REST APIs documented with Swagger/OpenAPI'
    ],
    mine:
      'My contribution: backend development with Java and Spring Boot, API creation, testing and documentation, PostgreSQL data work, and supporting backend–IoT integration. The wider system is built by a team; source code is confidential and not public.'
  },
  {
    name: 'Car Over Speed Alerting System',
    badge: 'Academic team project · Team Leader',
    description:
      'Calculates vehicle speed from the time taken between two IR sensor detection points, shows it on an LCD, and sounds a buzzer when a set speed threshold is exceeded.',
    tech: [
      'AT89S52 Microcontroller',
      'IR Transmitter/Receiver',
      'LCD',
      'Buzzer',
      'Keil µVision',
      'C51 Compiler'
    ],
    features: [
      'Speed calculated from two IR detection points',
      'Live speed shown on an LCD',
      'Buzzer alert above the speed threshold'
    ],
    mine: 'My role: Team Leader.'
  }
];

const PROFILE = {
  name: 'Dhanalakshmi Basala',
  company: 'iBEST Solutions',
  role: 'Software Trainee',
  focus: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
  location: 'Hyderabad, India'
};


/* ==================================================
   HELPER FUNCTIONS
================================================== */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const el = (tag, className, html) => {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (html) element.innerHTML = html;

  return element;
};

const esc = value =>
  String(value).replace(/[&<>"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[character]));

const tags = list =>
  `<ul class="tags">${list.map(item =>
    `<li>${esc(item)}</li>`
  ).join('')}</ul>`;


/* ==================================================
   SKILLS SECTION - STAGGERED REVEAL
================================================== */

const skillGrid = $('#skill-grid');

if (skillGrid) {
  Object.entries(SKILLS).forEach(([category, items], index) => {
    const card = el(
      'article',
      'card reveal',
      `<h3>${esc(category)}</h3>${tags(items)}`
    );

    // Each skill card appears with a small delay
    card.style.setProperty(
      '--reveal-delay',
      `${Math.min(index, 6) * 100}ms`
    );

    skillGrid.append(card);
  });
}


/* ==================================================
   PROJECTS SECTION - STAGGERED REVEAL
================================================== */

const projGrid = $('#project-grid');

if (projGrid) {
  PROJECTS.forEach((project, index) => {
    const links = [
      project.github &&
        `<a href="${esc(project.github)}" target="_blank" rel="noopener noreferrer">GitHub repository</a>`,

      project.demo &&
        `<a href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>`
    ].filter(Boolean).join('');

    const card = el(
      'article',
      'card proj reveal',
      `
        <h3>${esc(project.name)}</h3>

        <p class="date">${esc(project.badge)}</p>

        <p>${esc(project.description)}</p>

        <h4>Technologies</h4>
        ${tags(project.tech)}

        <h4>Key features</h4>
        <ul>
          ${project.features.map(feature =>
            `<li>${esc(feature)}</li>`
          ).join('')}
        </ul>

        <p class="mine">${esc(project.mine)}</p>

        ${links ? `<div class="proj-links">${links}</div>` : ''}
      `
    );

    // Each project card appears after the previous one
    card.style.setProperty(
      '--reveal-delay',
      `${index * 150}ms`
    );

    projGrid.append(card);
  });
}


/* ==================================================
   HERO SECTION - TYPING ANIMATION
================================================== */

const json = JSON.stringify(PROFILE, null, 2);
const output = $('#json');

if (output) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    output.textContent = json;
  } else {
    let index = 0;

    const typeText = () => {
      output.textContent = json.slice(0, index += 3);

      if (index < json.length) {
        setTimeout(typeText, 18);
      }
    };

    typeText();
  }
}


/* ==================================================
   DARK / LIGHT THEME TOGGLE
================================================== */

const root = document.documentElement;
const themeBtn = $('#theme');

const isDark = () => {
  return root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
};

const syncTheme = () => {
  if (!themeBtn) return;

  themeBtn.setAttribute(
    'aria-label',
    isDark() ? 'Switch to light theme' : 'Switch to dark theme'
  );
};

if (themeBtn) {
  // Restore previously selected theme
  try {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      root.dataset.theme = savedTheme;
    }
  } catch (error) {
    // Continue without saved theme
  }

  themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';

    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch (error) {
      // Continue without saving preference
    }

    syncTheme();
  });

  syncTheme();
}


/* ==================================================
   MOBILE NAVIGATION
================================================== */

const menu = $('#menu');
const burger = $('#burger');

const setMenu = open => {
  if (!menu || !burger) return;

  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
};

if (menu && burger) {
  burger.addEventListener('click', () => {
    setMenu(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', event => {
    if (event.target.matches('a')) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenu(false);
    }
  });
}


/* ==================================================
   ACTIVE NAVIGATION LINK
================================================== */

if ('IntersectionObserver' in window) {
  const navLinks = menu
    ? [...menu.querySelectorAll('a')]
    : [];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-45% 0px -50% 0px'
  });

  document.querySelectorAll('main section[id]').forEach(section => {
    sectionObserver.observe(section);
  });
}


/* ==================================================
   SCROLL REVEAL ANIMATION
================================================== */

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  // Show content if IntersectionObserver is unsupported
  revealElements.forEach(element => {
    element.classList.add('in');
  });
}


/* ==================================================
   BACK TO TOP BUTTON
================================================== */

const topBtn = $('#top');

if (topBtn) {
  addEventListener('scroll', () => {
    topBtn.hidden = scrollY < 600;
  }, {
    passive: true
  });

  topBtn.addEventListener('click', () => {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* ==================================================
   CONTACT FORM
   No backend configured.
   Opens the visitor's email application.
================================================== */

const form = $('#contact-form');
const status = $('#form-status');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const body =
      `${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`;

    const emailUrl =
      `mailto:dhanalakshmibasala@gmail.com` +
      `?subject=${encodeURIComponent(data.get('subject'))}` +
      `&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent =
        'Your email app should open with the message ready. Nothing is sent until you press send there.';
    }

    window.location.href = emailUrl;
  });
}


/* ==================================================
   AUTOMATIC COPYRIGHT YEAR
================================================== */

const yearElement = $('#year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
