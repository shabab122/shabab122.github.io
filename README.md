# Shabab Ahmed — Portfolio

**Website:** https://shabab122.github.io/  
**Repository:** https://github.com/shabab122/shabab122.github.io

A complete static portfolio, redesigned for clear reading, project discovery, and reliable GitHub Pages deployment. There is no npm installation, API key, or framework build to configure.

## What changed

- A simple professional introduction and portrait, without degree/graduation widgets.
- Section order: About → Problem Solving → Projects → Skills → Education → Contact.
- Six featured projects, verified against the pinned GitHub profile on 1 October 2026:
  1. GitStack — completed in September 2026, as confirmed by the portfolio owner.
  2. Norda E-commerce
  3. PDF RAG Study Assistant
  4. CarePulse
  5. Pac-Man AI
  6. Campus Evacuation Planner
- The existing MERN Student Management System, the public C Student Information Management project, and other builds in the lower project section.
- Light/dark themes, responsive navigation, project category filters, and email copying.
- Locally hosted fonts, original SVG project illustrations, and a social sharing image.
- Live coding profiles with validated, dated snapshots when API refresh is unavailable.
- Canonical URL, sitemap, robots file, and a custom 404 page.
- A clean GitHub Actions deployment with fingerprinted asset filenames and a commit version.

The original portrait and supplied résumé are preserved. Project cover illustrations are editorial artwork, rather than screenshots of the applications. No demo links, work experience, project metrics, or certifications were invented.

## Preview locally

From the directory containing `index.html`:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/. For the exact deployed artifact:

```bash
python3 scripts/build.py
python3 scripts/verify.py _site
python3 -m http.server 8000 --directory _site
```

## Deploy to GitHub Pages

1. Copy the **contents** of this folder into the root of `shabab122.github.io`. Include `.github`, `.gitignore`, and `.nojekyll`. Keep your existing `.git` folder. Do not commit just the ZIP or nest the new folder inside the repository.
2. Open the repository’s **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. This is a one-time setting required for the included workflow.
3. Commit and push to `main`, or merge a reviewed pull request into `main`.
4. In **Actions**, wait for **Deploy portfolio to GitHub Pages** to finish successfully, including both `build` and `deploy` jobs.
5. Visit https://shabab122.github.io/.

The workflow deploys `_site` built from the pushed commit. It does not deploy an old `dist` folder or reuse a build cache. CSS, JavaScript, fonts, images, and the résumé get content-based filenames. A changed asset therefore gets a new URL. The public `version.json` records the actual commit and build time.

**A deployment is not instantaneous.** GitHub’s deployment/CDN and the browser can briefly serve cached HTML. After the successful deployment, allow propagation and use Ctrl+Shift+R once if needed. Asset fingerprinting prevents the new HTML from mixing with old assets; source code alone cannot force immediate cache expiry at GitHub’s edge. No service worker is registered by this portfolio.

To check the version independently of a normal cached page:

```bash
git rev-parse HEAD
curl -fsSL -H 'Cache-Control: no-cache' "https://shabab122.github.io/version.json?check=$(date +%s)"
```

The `commit` in the response should match the deployed commit. If you use a PR, that may be the new merge commit on `main`. See `DEPLOY_BN.md` for Bengali instructions and a complete copy/push example.

## File structure

```text
shabab122.github.io/
├── index.html
├── 404.html
├── assets/
│   ├── Shabab_Ahmed_Resume_V2.pdf
│   ├── css/style.css
│   ├── js/main.js
│   ├── fonts/                 # fonts and OFL licenses
│   └── img/                   # portrait, monogram, project art, social image
├── scripts/
│   ├── build.py
│   └── verify.py
├── .github/workflows/pages.yml
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── DEPLOY_BN.md
├── VERIFICATION.md
└── ATTRIBUTION.md
```

## Updating content

- Edit text, projects, project categories, and education in `index.html`.
- Edit colors/layout in `assets/css/style.css`.
- Edit interactions and coding snapshots in `assets/js/main.js`.
- Replace the résumé or portrait at the existing path to keep links intact.
- Push or merge to `main`; the workflow rebuilds and publishes the latest source.

GitHub’s pinned projects are curated into the source in the requested order. The project list does not depend on a runtime GitHub request. Codeforces uses its public API; LeetCode uses public community API proxies and a dated fallback. Third-party API uptime and CORS behavior are outside this static website’s control.

The previous live portfolio linked its MERN Student Management System to `module-17-assignment`, which now returns 404 publicly. That project remains in the lower section with a source-code request by email. The separate C Student Information Management project links to its verified public repository. The old TriMart URL has also been corrected to `Trimart-B2B-Project`.
