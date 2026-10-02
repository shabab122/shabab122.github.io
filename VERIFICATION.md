# Verification — 3 October 2026 (Asia/Dhaka)

## Source and requested changes

The update starts from public `main` commit `b64e6969b2dae36864500a60a055a6c79ceb7bef` (the working portfolio and updated résumé deployment). The six supplied screenshots were reviewed.

- Simplified the introduction and increased the portrait crop by 8% using CSS.
- Correct section and navigation order: About, Problem Solving, Tools, Selected Projects, Education, Contact; section labels 01 through 05.
- Removed section descriptions, project filters, additional-project cards, and profile-refresh status text.
- Kept the six existing selected projects and their repository links, in the requested order.
- Added one compact link to all GitHub repositories.
- Kept ratings/ranks inside the Codeforces and LeetCode cards.
- Used the exact requested contact invitation, with email only and a copy button.
- Preserved the portrait and current résumé file byte-for-byte. Education records and selected-project details remain from the current source.

Coding snapshots verified on 2 October UTC / 3 October Dhaka:

| Platform | Snapshot | Verification source |
| --- | --- | --- |
| Codeforces `shabab_sa` | 242 unique accepted problems; rating 1407; Specialist | Official `user.info` and `user.status` APIs |
| LeetCode `Shabab01` | 273 solved; 111 Easy / 142 Medium / 20 Hard; global rank 581623 | Official LeetCode profile GraphQL response |

Runtime statistics still refresh through the existing browser-compatible endpoints, with validated static/cached fallbacks.

## Browser checks

16 integration/check groups passed with Playwright and Chromium 145. They cover:

- Requested headings, section order, six project cards, GitHub link, and email-only contact.
- Offline profile statistics and ranks inside their two cards.
- No horizontal page overflow at widths 320, 360, 390, 430, 640, 681, 768, 800, 900, 1024, 1280, and 1440 pixels.
- Every navigation link, manual scrolling, and Contact activation when the final section cannot reach the sticky header.
- Real smooth scrolling, including Education near the page end and upward navigation after reaching Contact.
- Persistent light/dark themes, mobile menu closing, Escape focus, scrolling unlock, and email clipboard output.
- Current résumé loading as a PDF in source and built-site previews.
- Built pages loading fingerprinted assets with no uncaught JavaScript errors or missing local resources.
- Mocked API refresh, unique accepted-problem counting, rank updates, outage fallback, and retention of a newer cached snapshot.
- Blocked browser storage and a 320px preview with JavaScript disabled.

Desktop/mobile light/dark layouts were visually reviewed. Automated axe-core WCAG A/AA checks reported **zero violations in all four views**. This records the tested views rather than guaranteeing every browser or assistive technology.

## Build and archive checks

- Source and built-site verification pass, including local assets, font paths, anchor targets, project/section order, canonical URL, and build metadata.
- JavaScript syntax validation passes.
- A build from the extracted delivery ZIP passes verification.
- A simulated second commit and changed CSS/PDF produce new version metadata and new asset URLs; obsolete build output is removed.
- The ZIP includes the existing GitHub Pages workflow and hidden deployment files. It excludes local build output, caches, repository history, and workspace metadata.

The Pages workflow publishes the freshly verified `_site` artifact when changes reach `main`. No GitHub settings, commits, or live deployment were changed during this delivery.

## References

- [Portfolio](https://shabab122.github.io/)
- [Repository](https://github.com/shabab122/shabab122.github.io)
- [Codeforces profile](https://codeforces.com/profile/shabab_sa)
- [LeetCode profile](https://leetcode.com/u/Shabab01/)
- [Official Pages workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
