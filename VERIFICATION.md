# Verification — 26 October 2026 (Asia/Dhaka)

## Source and scope

Based on current public `main` commit `6828acc985938866bce1ff5cfee84de73f9618b1` (Modified the Resume). Both newly supplied screenshots and the reference portfolio/logo were inspected.

- Full name on one line, followed by the existing bio.
- Smaller portrait: 260px maximum on desktop, 220px on most phones, with a close face-focused CSS crop.
- Custom full-name wordmark and matching favicon replace the SA initials. The share-card logo matches.
- Existing section content/order, 1200px maximum content width, compact cards, six selected projects, Education alignment, and email-only Contact remain in place.

The current short résumé PDF, original portrait JPEG, navigation/profile JavaScript, build script, and working Pages workflow are preserved byte-for-byte from the source commit.

## Browser checks

Nine integration groups passed in Playwright/Chromium 145. Tests covered 20 widths: 320, 360, 390, 430, 600, 601, 640, 680, 681, 768, 800, 900, 960, 961, 1024, 1280, 1440, 1600, 1908, and 2560px.

- One-line name, bio placement, no horizontal overflow or clipped card text.
- No header/logo/navigation overlaps; shared container alignment.
- Smaller square portrait, equal frame margins, and aligned caption/location text.
- Three/two/one project columns at the existing desktop/tablet/phone breakpoints; all six repositories retained.
- Education institution/location alignment.
- Navigation active state for every section, bottom-of-page Contact, and stable state after actual smooth scrolling.
- Persistent themes, mobile menu, Escape, Contact selection, and email copying.
- Current short résumé opens in both source and built pages.
- Built fingerprinted assets load without missing local resources or JavaScript exceptions.
- Mobile content and navigation remain usable without JavaScript at 320px.

Axe-core WCAG A/AA checks returned zero violations for desktop/mobile in both light and dark themes. Internal browser previews were visually reviewed. No browser screenshots are packaged as deliverables.

At a 1440 × 1000 viewport, the introduction height fell from 494.6px to 353.6px. The Problem Solving heading moved approximately 141px upward. Other viewports use their responsive layouts.

## Build and delivery checks

- Source and built-site verification pass for asset paths, anchors, six-project order, canonical URL, and version metadata.
- Navigation JavaScript syntax validation passes.
- Final ZIP CRC/integrity checks pass; required hidden deployment files are included.
- The extracted ZIP builds and verifies successfully.
- A simulated successive commit records the new commit/version; changed CSS/PDF bytes produce new hashed URLs and obsolete generated output is removed.
- Current résumé, original portrait, navigation JavaScript, and deployment workflow match the source commit.

The archive excludes repository history, local build output, QA browsers/screenshots, caches, and workspace metadata. No repository settings, commits, or live deployment were changed. The included workflow deploys when the user's update reaches `main`, with the existing GitHub Actions Pages setting.

[Website](https://shabab122.github.io/) · [Repository](https://github.com/shabab122/shabab122.github.io) · [Deployment instructions](DEPLOY_BN.md)
