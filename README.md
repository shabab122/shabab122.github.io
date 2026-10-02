# Shabab Ahmed — Portfolio

**Website:** [shabab122.github.io](https://shabab122.github.io/)  
**Repository:** [shabab122/shabab122.github.io](https://github.com/shabab122/shabab122.github.io)

A static portfolio with local fonts, light/dark themes, responsive navigation, and GitHub Pages deployment. No npm installation or API key is required.

## October 2026 update

- A plain, professional introduction and a slightly closer portrait crop.
- Section order: About → **01 Problem Solving** → **02 Tools I build with** → **03 Selected Projects** → **04 Education** → **05 Want to collaborate?**
- Section headings contain only the number and title. Supporting paragraphs, project filters, refresh labels, and additional-project cards have been removed.
- Codeforces and LeetCode statistics, including ratings/ranks, remain inside their two cards and refresh silently. Saved snapshots remain visible when an API is unavailable.
- Six selected projects, followed by one link to all GitHub repositories.
- Email-only contact, with the requested invitation and an email-copy button.
- Navigation follows the new order and correctly highlights Contact at the bottom of the page. Selecting Education remains accurate when its anchor is close to the page end.
- The updated résumé PDF remains linked from the introduction.

| Order | Selected project | Repository |
| --- | --- | --- |
| 1 | GitStack | [GitStack](https://github.com/shabab122/GitStack) |
| 2 | Norda E-commerce | [Ecommerce_Web_Project](https://github.com/shabab122/Ecommerce_Web_Project) |
| 3 | PDF RAG Study Assistant | [Pdf-Rag-Study-Assistant](https://github.com/shabab122/Pdf-Rag-Study-Assistant) |
| 4 | CarePulse | [CarePulse-Healthcare-Management-System](https://github.com/shabab122/CarePulse-Healthcare-Management-System) |
| 5 | Pac-Man AI | [Pac-Man-AI-Project](https://github.com/shabab122/Pac-Man-AI-Project) |
| 6 | Campus Evacuation Planner | [Campus-Evacuation-Planner](https://github.com/shabab122/Campus-Evacuation-Planner) |

The project list is curated in the source. Its illustrations are original SVG artwork. The portrait and updated résumé bytes are preserved from the latest repository source.

## Local preview and checks

Run from the directory containing `index.html`:

```bash
python3 scripts/verify.py
python3 scripts/build.py
python3 scripts/verify.py _site
python3 -m http.server 8000 --directory _site
```

Open [localhost:8000](http://localhost:8000/). For a source preview, use `python3 -m http.server 8000` without `--directory _site`.

## Publish the update

Copy the **contents** of `shabab122.github.io/` from the ZIP into the existing repository root, including `.github`, `.gitignore`, and `.nojekyll`. Keep the existing `.git` directory. The repository root must contain `index.html`; uploading only the ZIP or nesting this directory inside the repository will not update the site.

The included workflow publishes `_site` when changes reach `main`. The Pages source must be **GitHub Actions**; the existing working deployment setting can stay as it is. Push to `main`, or push a branch and merge its pull request into `main`, then wait for both jobs in **Deploy portfolio to GitHub Pages** to finish. See [DEPLOY_BN.md](DEPLOY_BN.md) for Bengali copy/push instructions.

Each build removes previous output and gives changed CSS, JavaScript, images, fonts, and PDFs new content-based filenames. `version.json` records the deployed commit and build time. After deployment succeeds, a hard refresh can help if the browser still displays cached HTML.

```bash
git rev-parse HEAD
curl -fsSL -H 'Cache-Control: no-cache' "https://shabab122.github.io/version.json?check=$(date +%s)"
```

Compare the response's `commit` with the deployed commit on `main`; a merged pull request may create a new merge commit.

## Maintaining the site

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, headings, projects, profile snapshots, tools, education, links |
| `assets/css/style.css` | Layout, portrait crop, responsive styles, themes |
| `assets/js/main.js` | Navigation, themes, email copying, profile refresh and snapshots |
| `assets/Shabab_Ahmed_Resume_Updated_2026.pdf` | Current résumé |
| `scripts/build.py` / `scripts/verify.py` | Fresh deployment build and validation |
| `.github/workflows/pages.yml` | Deployment after a push to `main` |
| `docs/previews/` | Updated desktop/mobile light/dark screenshots |

To update the résumé, replace **`assets/Shabab_Ahmed_Resume_Updated_2026.pdf`** at that same path. If its filename changes, also change its link in `index.html` before building. The build verifies the linked file and creates a new PDF URL whenever its contents change.

Codeforces refresh uses its public API. LeetCode refresh uses public community API endpoints; both platforms have validated static/cached fallbacks. No service worker is registered.

[Verification results](VERIFICATION.md) · [Asset attribution](ATTRIBUTION.md) · [Official Pages workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
