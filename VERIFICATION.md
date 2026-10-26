# Verification — 26 October 2026 (Asia/Dhaka)

## Source and final refinement

Based on current public `main` commit `e0aefb9198637cdee1dbe57a737bb3b22bed3f0f`. The new screenshot was inspected before editing.

- Relaxed portrait magnification from 2.3× to 1.85×, with a balanced head and shoulders composition. The original JPEG is unchanged.
- Replaced the plain horizontal navbar wordmark with a clearly framed signature badge. The navbar and favicon use the same full-name SVG asset.
- Kept the introduction compact: one-line name, bio below, and the existing small portrait card.
- Preserved the section order, existing content, 1200px maximum content width, compact cards, six selected projects, aligned Education details, and email-only Contact.

The current short résumé PDF, original portrait JPEG, navigation/profile JavaScript, build script, and working Pages workflow are preserved byte-for-byte from the source commit.

## Layout and browser verification

Nine integration groups passed in Playwright/Chromium 145. Tests covered 20 widths: 320, 360, 390, 430, 600, 601, 640, 680, 681, 768, 800, 900, 960, 961, 1024, 1280, 1440, 1600, 1908, and 2560px.

- One-line name, bio placement, no horizontal overflow, and no clipped card text.
- No logo/navigation/control overlap; all sections share the correct container alignment.
- Small square portrait, equal frame margins, and aligned caption/location text.
- Existing three/two/one project columns on desktop/tablet/phone; all six repositories retained.
- Aligned Education institution/location text.
- Correct active navigation for every section, bottom-of-page Contact, and real smooth scrolling after its timeout.
- Persistent light/dark themes, mobile menu, Escape, Contact selection, and email copying.
- Current short résumé opens in source and built pages.
- Built hashed assets load without missing resources or JavaScript exceptions.
- Mobile content and navigation remain usable without JavaScript at 320px.

Axe-core WCAG A/AA checks returned zero violations for desktop/mobile in both light and dark themes. Internal previews were visually reviewed, including the revised photo and logo. No browser screenshots are packaged as deliverables.

The desktop introduction remains compact: its tested height is 353.6px at a 1440 × 1000 viewport, compared with 353.6px in the current source. The revised crop and badge do not push the later sections down.

## Build and ZIP checks

- Source and built-site verification pass for local assets, anchors, project order, canonical URL, and metadata.
- Navigation JavaScript syntax validation passes.
- Final ZIP integrity/CRC checks pass; required hidden deployment files are included.
- The extracted ZIP builds and verifies successfully.
- Successive simulated commits record the new commit/version. Changed CSS/PDF contents produce new asset URLs; obsolete generated output is removed.
- Current résumé, original portrait, navigation script, build script, and workflow match the source commit.

The ZIP excludes repository history, local build output, QA browsers/screenshots, caches, and workspace metadata. No GitHub settings, commits, or live deployment were changed. The included workflow deploys when this update reaches `main`, using the existing GitHub Actions Pages setting.

[Website](https://shabab122.github.io/) · [Repository](https://github.com/shabab122/shabab122.github.io) · [Deployment instructions](DEPLOY_BN.md)
