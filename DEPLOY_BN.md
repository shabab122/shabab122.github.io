# নতুন portfolio push ও deployment

ওয়েবসাইট: [shabab122.github.io](https://shabab122.github.io/)  
Repository: [shabab122/shabab122.github.io](https://github.com/shabab122/shabab122.github.io)

## কীভাবে নতুন files রাখবে

ZIP extract করার পরে `shabab122.github.io` folder-এর **ভেতরের files** existing repository-র root-এ copy করবে। `.github`, `.gitignore`, `.nojekyll`-ও copy হবে। Existing `.git` directory থাকবে। শুধু ZIP upload করবে না এবং repository-র ভেতরে আরেকটি `shabab122.github.io` folder বানাবে না।

তোমার working Pages deployment-এর workflow এই ZIP-এ আছে। **Settings → Pages → Source → GitHub Actions** আগের মতো থাকলেই হবে।

## Terminal-এর উদাহরণ

এখানে ZIP-এর নাম `Shabab-Portfolio-Clean-Update-2026.zip` এবং existing repository path `/home/sa/Desktop/MY PROJECT/shabab122.github.io` ধরা হয়েছে। তোমার path আলাদা হলে সেটি ব্যবহার করবে। `git status`-এ অসমাপ্ত নিজের পরিবর্তন থাকলে সেগুলো আগে সংরক্ষণ করবে।

```bash
unzip -o "$HOME/Downloads/Shabab-Portfolio-Clean-Update-2026.zip" \
  -d "$HOME/Downloads/Shabab-Portfolio-Clean-Update-2026"

cd "/home/sa/Desktop/MY PROJECT/shabab122.github.io"
git status --short
git switch main
git pull --ff-only origin main
git switch -c portfolio/clean-update-2026

rsync -av \
  --exclude='.git' \
  --exclude='.openai' \
  --exclude='_site' \
  --exclude='__pycache__' \
  "$HOME/Downloads/Shabab-Portfolio-Clean-Update-2026/shabab122.github.io/" \
  ./

python3 scripts/verify.py
python3 scripts/build.py
python3 scripts/verify.py _site

git add index.html 404.html assets scripts .github .gitignore .nojekyll \
  robots.txt sitemap.xml README.md DEPLOY_BN.md VERIFICATION.md ATTRIBUTION.md docs

git diff --cached --stat
git commit -m "Simplify portfolio sections and fix active navigation"
git push -u origin portfolio/clean-update-2026
```

এরপর GitHub-এ এই branch থেকে `main`-এ Pull Request খুলে merge করবে। **শুধু নতুন branch-এ push করলে live site বদলাবে না**—পরিবর্তন `main`-এ পৌঁছালে deployment হবে। সরাসরি `main`-এ কাজ করতে চাইলে branch তৈরির command বাদ দিয়ে শেষে `git push origin main` ব্যবহার করতে পারো।

`rsync`-এ `--delete` নেই, তাই repository-র অন্য files নিজে থেকে মুছবে না। Preview করতে চাইলে `python3 -m http.server 8000 --directory _site` চালিয়ে [localhost:8000](http://localhost:8000/) খুলবে।

## নতুন résumé-এর link

এই ZIP-এ নতুন résumé আছে:

`assets/Shabab_Ahmed_Resume_Updated_2026.pdf`

`index.html`-এর **View résumé** link এই file-এই যায়। পরে résumé বদলালে একই নামে একই জায়গায় replace করো। নাম পরিবর্তন করলে `index.html`-এর link-ও পরিবর্তন করতে হবে; না হলে build-এ missing asset error হবে। PDF-এর contents বদলালে deployment build নতুন hashed URL বানাবে।

## Push বা merge-এর পরে

1. Repository-র **Actions → Deploy portfolio to GitHub Pages** খুলবে।
2. `build` ও `deploy` দুটো job সফল হওয়া পর্যন্ত অপেক্ষা করবে।
3. [shabab122.github.io](https://shabab122.github.io/) খুলবে। পুরোনো page দেখালে সফল deployment-এর পরে **Ctrl+Shift+R** দেবে।

নতুন CSS/JS/PDF-এর URL contents অনুযায়ী বদলায়। GitHub/browser-এ পুরোনো HTML সাময়িকভাবে cache থাকতে পারে; push শেষ হওয়া এবং deployment শেষ হওয়া আলাদা ধাপ।

Deployed version মিলিয়ে দেখতে:

```bash
git fetch origin main
git rev-parse origin/main
curl -fsSL -H 'Cache-Control: no-cache' \
  "https://shabab122.github.io/version.json?check=$(date +%s)"
```

Response-এর `commit` deployed `main`-এর commit-এর সঙ্গে মিলবে। Pull Request merge করলে merge commit-এর hash মিলাতে হবে।

Build fail হলে Actions-এর failed step-এর log দেখবে। Local `scripts/verify.py` source এবং `_site`-এর broken asset/anchor চেক করে। এই delivery-তে local build ও browser checks করা হয়েছে; live site তুমি push/merge করার পর update হবে।

[GitHub-এর official publishing নির্দেশনা](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
