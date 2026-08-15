# Kanishk Bhatt — Portfolio

A static portfolio site (plain HTML/CSS/JS, no build step) themed around a schematic / signal-chain
aesthetic — fitting for an ECE engineer working across 5G and embedded systems.

## Files

```
.
├── index.html            → all page content
├── css/style.css          → styling (blueprint / schematic theme)
├── js/script.js           → typewriter, scroll-spy nav, reveal animations
├── assets/
│   └── Kanishk_Bhatt_Resume.pdf   → downloadable résumé (linked from the site)
└── README.md
```

## Run locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths behave exactly like production:
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Deploy with GitHub Pages

1. Create a new repository on GitHub (e.g. `kanishk-portfolio`).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
6. Wait 1–2 minutes — your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

### Using a custom domain (optional)
Add a `CNAME` file at the repo root containing just your domain (e.g. `kanishkbhatt.com`),
then point your domain's DNS at GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating content later

- **Résumé**: replace `assets/Kanishk_Bhatt_Resume.pdf` with a new export (keep the same filename,
  or update the two `href` references in `index.html`).
- **Skills**: edit the `COMPONENT_LIBRARY` array at the top of `js/script.js`.
- **Roles in the typewriter**: edit the `ROLES` array in `js/script.js`.
- **Everything else** (projects, experience, education, contact info): edit the corresponding
  `<section>` in `index.html` directly — it's plain, readable markup.

## Notes

- Colors, spacing, and type scale are all defined as CSS custom properties at the top of
  `css/style.css` under `:root` if you want to retheme.
- The site respects `prefers-reduced-motion` and is keyboard-navigable with visible focus states.
