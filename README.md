# Shabab Ahmed — Portfolio

**Website:** [shabab122.github.io](https://shabab122.github.io/)  
**Repository:** [shabab122/shabab122.github.io](https://github.com/shabab122/shabab122.github.io)

A static portfolio with local fonts, light/dark themes, responsive navigation, and an automatic GitHub Pages build. No npm installation, API key, or application server is needed.

## 26 October 2026 update

- A compact introduction with **Shabab Ahmed on one line** and the existing professional bio directly below.
- A smaller portrait card with a close face-focused crop, keeping the full hairline and a little shoulder context. The original photograph is preserved; the framing is controlled by CSS.
- A custom full-name serif/script wordmark and matching full-name favicon, replacing the SA initials. The lettering is stored as vector paths, so no extra font service is needed.
- Matching full-name branding on the social share card.
- The existing 1200px desktop content width, compact profile cards, six selected projects, Education alignment, unnumbered headings, and email-only Contact.
- The latest short résumé from the current repository remains linked.

Section order: About → Problem Solving → Tools I build with → Selected Projects → Education → Contact.

Selected repositories, in order: GitStack, Ecommerce_Web_Project, Pdf-Rag-Study-Assistant, CarePulse-Healthcare-Management-System, Pac-Man-AI-Project, and Campus-Evacuation-Planner. Projects use three columns on desktop, two on tablets, and one on narrow phones. The remaining repositories are linked from “View all repositories”.

## Local preview

Run inside the directory containing `index.html`:

```bash
python3 scripts/verify.py
python3 scripts/build.py
python3 scripts/verify.py _site
python3 -m http.server 8023 --directory _site
```

Open [localhost:8023](http://localhost:8023/). Ports 3000 and 3002 are not used.

## Automatic deployment

Copy the **contents** of `shabab122.github.io/` from the ZIP into the existing repository root. Include `.github`, `.gitignore`, and `.nojekyll`; keep the repository's existing `.git` directory. The root must contain `index.html`.

The included **Deploy portfolio to GitHub Pages** workflow builds and publishes after a push to `main`, or after a pull request is merged into `main`. Keep **Settings → Pages → Source → GitHub Actions**, matching the working deployment. Wait for both the `build` and `deploy` jobs to succeed, then open [shabab122.github.io](https://shabab122.github.io/).

Every build clears the old `_site` output and fingerprints changed CSS, JavaScript, images, fonts, and PDFs. The generated `version.json` records the deployed commit and build time. A changed file gets a changed asset URL; no service worker is registered.

[DEPLOY_BN.md](DEPLOY_BN.md) contains the Bengali copy/push instructions.

## Maintenance

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, projects, profile snapshots, links, tools, education, contact |
| `assets/css/style.css` | Responsive layout, portrait framing, themes |
| `assets/img/wordmark.svg` | Full-name header logo |
| `assets/img/logo.svg` | Full-name favicon |
| `assets/js/main.js` | Active navigation, theme, mobile menu, email copying, profile refresh |
| `assets/Shabab_Ahmed_Resume(Short).pdf` | Current short résumé |
| `scripts/build.py` / `scripts/verify.py` | Deployment build and validation |
| `.github/workflows/pages.yml` | Automatic deployment on `main` |

Replace the résumé at **`assets/Shabab_Ahmed_Resume(Short).pdf`** to update it. If its filename changes, also update the link in `index.html`. A PDF content change creates a new hashed deployment URL.

Codeforces refresh uses its public API; LeetCode refresh uses public community endpoints. Both have cached/static fallbacks when their APIs are unavailable. This layout update preserves their existing data and refresh behavior.

[Verification](VERIFICATION.md) · [Attribution](ATTRIBUTION.md)
