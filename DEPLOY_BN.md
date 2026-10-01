# GitHub-এ push এবং deployment

ওয়েবসাইট: **https://shabab122.github.io/**  
Repository: **https://github.com/shabab122/shabab122.github.io**

## একবারের GitHub setting

Repository → **Settings → Pages → Build and deployment → Source → GitHub Actions** সিলেক্ট করবে। এই ZIP-এ workflow দেওয়া আছে; আলাদা template তৈরি করার দরকার নেই।

এখানকার `index.html`, `assets`, `scripts`, এবং `.github` থাকবে repository-র root-এ। `dist` ফোল্ডারে বা আরও একটি nested folder-এ রাখবে না। শুধু ZIP upload করলে website update হবে না।

## Terminal থেকে সম্পূর্ণ উদাহরণ

নিচের উদাহরণে ZIP আছে `~/Downloads/Shabab-Portfolio-Professional-2026.zip`-এ। নতুন clone-এর জন্য `~/Desktop/shabab-portfolio-publish` ব্যবহার করা হয়েছে; ওই নামে folder আগে থেকে থাকলে তোমার existing repository-র path ব্যবহার করবে।

```bash
# ZIP extract
unzip ~/Downloads/Shabab-Portfolio-Professional-2026.zip \
  -d ~/Downloads/Shabab-Portfolio-Professional-2026

# Existing repository থাকলে এই clone-এর বদলে সেই folder-এ cd করবে
git clone https://github.com/shabab122/shabab122.github.io.git \
  ~/Desktop/shabab-portfolio-publish
cd ~/Desktop/shabab-portfolio-publish

# main update; কাজের আগে git status দেখে নিজের অসমাপ্ত পরিবর্তন রাখবে
git status
git switch main
git pull --ff-only origin main

# ZIP-এর সব নতুন file copy, hidden deployment files-সহ
rsync -av \
  --exclude='.git' \
  --exclude='_site' \
  --exclude='__pycache__' \
  ~/Downloads/Shabab-Portfolio-Professional-2026/shabab122.github.io/ \
  ./

# Local verification
python3 scripts/build.py
python3 scripts/verify.py _site

# Review and push
git status
git add index.html 404.html assets scripts .github .gitignore .nojekyll \
  robots.txt sitemap.xml README.md DEPLOY_BN.md VERIFICATION.md ATTRIBUTION.md
git diff --cached --stat
git commit -m "Redesign portfolio and fix GitHub Pages deployment"
git push origin main
```

`rsync`-এ `--delete` দেওয়া নেই, তাই existing repository-র অন্য file নিজে থেকে মুছে যাবে না। পুরোনো `dist` থাকলেও এই workflow সেটি deploy করবে না। Existing repository-তে অন্য Pages-deployment workflow থাকলে সেটির সঙ্গে এই নতুন workflow একসঙ্গে চালাবে না; এই workflow-টিকেই publishing workflow হিসেবে রাখবে।

## Push-এর পরে

1. GitHub repository-র **Actions** খুলবে।
2. **Deploy portfolio to GitHub Pages**-এ `build` ও `deploy` দুটোই সবুজ হওয়া পর্যন্ত অপেক্ষা করবে।
3. তারপর **https://shabab122.github.io/** খুলবে।
4. পুরোনো page দেখালে deployment complete হওয়ার পরে একটু সময় দিয়ে **Ctrl+Shift+R** চাপবে।

নতুন page-এর asset filenames বদলায়, তাই পুরোনো CSS/JS-এর সঙ্গে মিশে যাওয়ার সমস্যা এড়ানো হয়। GitHub-এর CDN-এ পুরোনো HTML কিছু সময় থাকতে পারে; push শেষ হওয়া মানেই সঙ্গে সঙ্গে deploy শেষ হওয়া নয়।

## নতুন version হয়েছে কি না দেখবে

```bash
git rev-parse HEAD
curl -fsSL -H 'Cache-Control: no-cache' \
  "https://shabab122.github.io/version.json?check=$(date +%s)"
```

`version.json`-এর `commit` এবং deployed `main`-এর commit একই হলে ওই source প্রকাশ হয়েছে। Page source-এ `portfolio-version`-ও থাকবে।

## Deployment fail হলে

- **Pages source setting:** `GitHub Actions` সিলেক্ট হয়েছে কি না দেখবে।
- **Actions disabled:** repository-র Settings → Actions থেকে workflows চালানো সম্ভব হতে হবে।
- **Permission/environment error:** `github-pages` environment-এ `main` থেকে deployment অনুমোদিত হতে হবে।
- **Build error:** workflow-র failed step-এর log দেখবে; local `python3 scripts/verify.py _site`-ও চালাতে পারবে।

এই delivery-তে code ও local build যাচাই করা হয়েছে। তোমার GitHub account-এর settings বদলানো বা live site-এ push/deploy করা হয়নি; তুমি push করার পরেই live website update হবে।
