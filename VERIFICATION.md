# Verification — 6 October 2026

## Requested refinement

Continues the delivered compact portfolio update. Both new reference screenshots were reviewed.

| Detail | Previous compact version | This version |
| --- | --- | --- |
| Maximum desktop content width | 1040px | 1200px |
| Portrait crop | Landscape, 5:4 | Square, 1:1 |
| Portrait frame padding | 7px | 16px on every side |
| Section number labels | 01–05 | Removed |

The portrait card follows the supplied reference's square photo, rounded outline, equal margins, and aligned details. It aligns with the introduction at the top on desktop and remains centered on mobile. Availability and location stay inside its frame. Its original JPEG is unchanged.

Compact problem-solving cards, six projects in three columns/two rows on desktop, Education alignment, introduction wording, and email-only Contact remain in place. Navigation JavaScript, résumé PDF, and GitHub Pages workflow are byte-for-byte identical to the compact version.

## Browser checks

18 integration/check groups passed in Playwright with Chromium 145:

- Unnumbered headings, requested section order, all six projects, repository links, and email-only Contact.
- Shared container width/alignment and correct 3/2/1 project columns at 20 widths: 320, 360, 390, 430, 600, 601, 640, 680, 681, 768, 800, 900, 960, 961, 1024, 1280, 1440, 1600, 1908, and 2560px.
- No horizontal page overflow or clipped card text at those widths.
- Square portrait crop, symmetric padding/borders, and aligned Education details.
- Manual scroll, all navigation links, real smooth scrolling, and active Contact at the bottom.
- Persistent light/dark themes, mobile menu/Escape focus, scroll unlocking, and email copying.
- The updated résumé opens in source and built previews.
- Built hashed assets load with no JavaScript exceptions or missing local resources.
- Mocked profile API updates, accepted-problem deduplication, cached outage fallback, and blocked-storage behavior.
- Projects, profiles, and navigation remain readable without JavaScript at 320px.

Desktop/mobile light/dark views were visually reviewed. Axe-core found zero WCAG A/AA violations in all four tested views; this records the tested views rather than guaranteeing every browser or assistive technology.

## Deployment and archive checks

- Source and built-site validation pass, including asset paths, anchors, canonical URL, project order, and metadata.
- JavaScript syntax validation passes.
- The extracted final ZIP builds and verifies successfully.
- Simulated successive commits produce the correct deployment version metadata.
- Changed CSS and résumé bytes produce new hashed URLs, and obsolete generated assets/output are removed.
- The archive includes the workflow, hidden deployment files, updated instructions, and four current previews. Repository history, workspace metadata, caches, and local build output are excluded.

The included workflow publishes after the update reaches `main`. No repository settings, commits, or live deployment were changed during this delivery.

[Website](https://shabab122.github.io/) · [Repository](https://github.com/shabab122/shabab122.github.io) · [Push/deployment instructions](DEPLOY_BN.md)
