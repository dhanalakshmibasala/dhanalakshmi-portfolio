# Dhanalakshmi Basala – Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or serve the folder: `npx serve .` or `python -m http.server 8000` then visit http://localhost:8000

## Add your files
- Photo → `assets/profile.jpg` (square, ~640×640, under 150 KB). Until it exists, your initials show.
- Resume → `assets/Dhanalakshmi_Basala_Resume.pdf` (exact name; the button is broken until it is added).

## Update content
Skills and projects live at the top of `js/main.js`. Add `github: 'https://...'` or `demo: 'https://...'` to a project only after verifying the URL; links appear automatically. Add Student Management System, To-Do List, Coffee Shop Management System, Student Marks Result System and Student Profile Editor as new objects once descriptions and repos are verified. Experience, education and contact text are in `index.html`; colours are the variables at the top of `css/styles.css`.

## Contact form
It opens the visitor's email app with a prefilled message (nothing is sent by the site). For real submissions: create a free form at formspree.io (or Web3Forms/Netlify Forms), then set `<form action="https://formspree.io/f/YOUR_ID" method="POST">` and replace the submit handler in `js/main.js` with a `fetch` POST that shows success/failure.

## Test
Browser DevTools → device toolbar at 375, 768, 1280 px; toggle theme; open/close mobile menu; tab through with keyboard; check every link; run Lighthouse.

## Deploy later
Push to GitHub, then enable GitHub Pages (Settings → Pages), or drag the folder to Netlify/Vercel/Cloudflare Pages. No build settings needed.
