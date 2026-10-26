# Portfolio update — 26 October 2026

ওয়েবসাইট: [shabab122.github.io](https://shabab122.github.io/)  
Repository: [shabab122/shabab122.github.io](https://github.com/shabab122/shabab122.github.io)

এই version-এ ছবির zoom আগের তুলনায় কমানো হয়েছে, যাতে head ও shoulders স্বাভাবিকভাবে দেখা যায়। Navbar-এ ফ্রেমসহ পরিষ্কার full-name logo badge আছে; একই logo favicon-এও ব্যবহৃত হচ্ছে। নাম এক লাইনে, নিচে bio, বর্তমান short résumé এবং বাকি section-এর content রাখা হয়েছে।

## Files copy করা

1. `Shabab-Portfolio-Final-2026-10-26.zip` extract করো।
2. ভেতরের `shabab122.github.io` folder খুলে **তার ভেতরের files** existing repository root-এ copy করো। Hidden files-ও copy করবে: `.github`, `.gitignore`, `.nojekyll`।
3. Existing `.git` directory রাখবে। Repository-র ভেতরে আরেকটি `shabab122.github.io` folder বানাবে না এবং শুধু ZIP upload করবে না।

Existing repository-তে নিজের unfinished পরিবর্তন থাকলে copy করার আগে সংরক্ষণ করো।

## Check, commit, push

Repository root-এ terminal খুলে চালাও:

```bash
git status --short
python3 scripts/verify.py
python3 scripts/build.py
python3 scripts/verify.py _site

git add index.html assets scripts .github .gitignore .nojekyll \
  404.html robots.txt sitemap.xml README.md DEPLOY_BN.md VERIFICATION.md ATTRIBUTION.md

git diff --cached --stat
git commit -m "style: balance portrait crop and clarify navbar logo"
```

তুমি `main` branch-এ থাকলে push:

```bash
git push origin main
```

অন্য branch-এ থাকলে নিজের branch push করে GitHub-এ `main`-এ Pull Request merge করবে। **Deployment trigger হয় পরিবর্তন `main`-এ পৌঁছালে।**

## Automatic deployment

তোমার working deployment workflow এই ZIP-এ রাখা হয়েছে। **Settings → Pages → Source → GitHub Actions** আগের মতোই থাকবে।

Push/merge-এর পরে **Actions → Deploy portfolio to GitHub Pages** খুলে `build` এবং `deploy`—দুটো job সফল হওয়া পর্যন্ত অপেক্ষা করো। তারপর [shabab122.github.io](https://shabab122.github.io/) খুলবে। Successful deployment-এর পরেও পুরোনো HTML দেখালে **Ctrl+Shift+R** দাও।

প্রতি build-এ পুরোনো output পরিষ্কার হয় এবং নতুন contents অনুযায়ী CSS, JS, logo/image ও PDF-এর URL তৈরি হয়। Deployed commit দেখতে পারো:

[version.json](https://shabab122.github.io/version.json)

এটির `commit` deployed `main` commit-এর সঙ্গে মিলবে। Pull Request merge করলে নতুন merge commit থাকতে পারে।

## Résumé

বর্তমান file: `assets/Shabab_Ahmed_Resume(Short).pdf`। **View résumé** link এই file-এই যায়। পরে update করতে একই জায়গায় একই নামে replace করো। নাম বদলালে `index.html`-এর link-ও বদলাবে।

Local preview চাইলে:

```bash
python3 -m http.server 8023 --directory _site
```

[localhost:8023](http://localhost:8023/) খুলবে। GitStack-এর 3000/3002 ports ব্যবহার করতে হবে না।
