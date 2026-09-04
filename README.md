# Shabab Ahmed Portfolio

A responsive, single-page professional portfolio based on the supplied reference layout and rebuilt around Shabab Ahmed's résumé, public GitHub projects, technical skills, education, and competitive-programming profiles.

## Live Portfolio

[View the live portfolio](https://shabab122.github.io/)

## Open the portfolio

No installation or build command is required.

1. Open the `dist` folder.
2. Double-click `index.html`.

For a local web-server preview, run this command from the project folder:

```bash
python3 -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`.

## Included features

- Responsive one-page layout
- Accessible desktop and mobile navigation
- Persistent light/dark color theme
- Direct résumé link
- Personal profile, education, and contact details
- Carefully selected GitHub projects
- GitStack marked as work in progress
- Linked Codeforces and LeetCode profile cards
- Keyboard focus styles and reduced-motion support
- No runtime dependencies or external font requests

## File structure

```text
shabab-ahmed-portfolio/
├── .openai/
│   └── hosting.json
├── dist/
│   ├── index.html
│   └── assets/
│       ├── Shabab_Ahmed_Resume_V2.pdf
│       ├── css/style.css
│       ├── img/logo.svg
│       ├── img/shabab-ahmed.jpg
│       └── js/main.js
├── README.md
├── ATTRIBUTION.md
└── VERIFICATION.md
```

## Updating content

- Personal information, projects, education, skills, and profile statistics are in `dist/index.html`.
- Colors, layout, and responsive rules are in `dist/assets/css/style.css`.
- Theme, mobile navigation, active navigation, and footer year behavior are in `dist/assets/js/main.js`.
- Replace the résumé while keeping the same filename to preserve the existing button link.

## Deployment

The `dist` folder is ready for static hosting on GitHub Pages, Netlify, Cloudflare Pages, or a similar service.
