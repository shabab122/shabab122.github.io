# Verification — 1 October 2026

## Content and sources

- The supplied ZIP and the existing live portfolio were reviewed. The new introduction contains no degree, university, CGPA, or expected-graduation widgets.
- The public GitHub profile’s six pinned repositories were checked and arranged in the requested order: GitStack, E-commerce, PDF RAG, CarePulse, Pac-Man AI, and Campus Evacuation Planner.
- Project descriptions were checked against the repositories’ current READMEs. GitStack’s completion label follows the owner’s confirmation that it was completed in September 2026.
- Both student management projects appear below the six featured projects. The existing MERN card is preserved; its old `module-17-assignment` link returns 404 publicly, so it offers a source-code request by email. The separate C project links to `Student-Information-Management-System`.
- The old TriMart link has been corrected to the public `Trimart-B2B-Project` repository.
- The original portrait and résumé are retained. Lower-page education comes from the previous live portfolio; no new academic claim was added.

Coding snapshots obtained during this work:

| Platform | Snapshot | Source |
| --- | --- | --- |
| Codeforces, `shabab_sa` | 242 unique accepted problems; rating 1407; Specialist | Official `user.info` and `user.status` APIs |
| LeetCode, `Shabab01` | 273 solved; 111 Easy / 142 Medium / 20 Hard; rank 580980 | Public Alfa LeetCode API proxy |

## Browser and layout checks

19 browser integration checks passed using Chromium 145 and Playwright. These include:

- Correct section/project order and student projects in the lower section.
- No horizontal page overflow at widths 320, 360, 390, 430, 640, 681, 768, 800, 900, 1024, 1280, and 1440 pixels.
- Category filters, additional project expansion, persistent themes, mobile menu, Escape-key focus, and anchor navigation.
- Correct email clipboard output and a working original PDF résumé link.
- Successful API refresh with duplicate Codeforces submissions counted once; outage fallback; preservation of a later successful snapshot; and blocked browser storage.
- All six featured projects and navigation remain usable without JavaScript at 320px.
- No uncaught JavaScript errors or missing local resources during the browser checks.
- The generated deployment artifact loads its fingerprinted assets in a real browser.

Desktop/mobile light and dark views were visually inspected. Automated axe-core 4.10.3 WCAG A/AA checks reported **zero violations** in all four views. Automated checks are one part of accessibility verification, rather than a guarantee about every possible browser or assistive device.

## Build and deployment checks

- Source and `_site` verification pass: local asset paths, CSS font paths, anchor targets, project/section order, canonical URL, and build metadata.
- JavaScript syntax validation passes.
- A simulated second source commit produces the new commit/version in `version.json`.
- Changing the CSS produces a different fingerprinted stylesheet URL. Obsolete build output is removed before the next build.
- The current public repository has no pre-existing `.github` workflow files. The included Pages workflow therefore supplies the deployment automation.

The local build and browser checks have been completed. No GitHub account settings were changed, and no commit was pushed or deployed to the live domain during this delivery. Enable the documented Pages setting and push/merge to `main` to run the production deployment. GitHub/CDN propagation and external profile API availability remain external dependencies.

## Reference links

- Portfolio: https://shabab122.github.io/
- Public profile: https://github.com/shabab122
- Pages workflow guidance: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Publishing source setting: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
