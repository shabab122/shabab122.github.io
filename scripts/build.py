#!/usr/bin/env python3
"""Build a fresh GitHub Pages artifact with content-fingerprinted asset names."""
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import json
import os
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'
PUBLIC = ('index.html', '404.html', 'robots.txt', 'sitemap.xml', '.nojekyll')


def fingerprint(path, data):
    return path.with_name(f'{path.stem}.{sha256(data).hexdigest()[:12]}{path.suffix}')


def build():
    assets = sorted(p for p in (ROOT / 'assets').rglob('*') if p.is_file())
    digest = sha256()
    for path in [ROOT / name for name in PUBLIC] + assets:
        if not path.is_file():
            raise SystemExit(f'Missing public file: {path.relative_to(ROOT)}')
        digest.update(path.relative_to(ROOT).as_posix().encode())
        digest.update(path.read_bytes())
    commit = os.environ.get('GITHUB_SHA', '')
    valid_commit = bool(re.fullmatch(r'[0-9a-fA-F]{40,64}', commit))
    version = commit[:12] if valid_commit else digest.hexdigest()[:12]
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    mapping = {}

    # Resolve font/image names before computing the rewritten CSS hash.
    for path in assets:
        if path.suffix == '.css':
            continue
        relative = path.relative_to(ROOT)
        data = path.read_bytes()
        target = relative if path.suffix == '.txt' else fingerprint(relative, data)
        destination = OUTPUT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        mapping[relative.as_posix()] = target.as_posix()

    for path in assets:
        if path.suffix != '.css':
            continue
        def rewrite_css(match):
            local = (path.parent / match.group(1)).resolve()
            try:
                original = local.relative_to(ROOT).as_posix()
            except ValueError:
                raise SystemExit('CSS asset path leaves the project')
            if original not in mapping:
                raise SystemExit(f'Missing CSS asset: {original}')
            return os.path.relpath(ROOT / mapping[original], path.parent).replace(os.sep, '/')
        content = re.sub(r'(\.\./(?:fonts|img)/[^\s\)\'"?]+)(?:\?v=[^\s\)\'"]+)?', rewrite_css, path.read_text())
        data = content.encode()
        relative = path.relative_to(ROOT)
        target = fingerprint(relative, data)
        destination = OUTPUT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        mapping[relative.as_posix()] = target.as_posix()

    def rewrite_html(match):
        original = match.group(0).split('?')[0]
        if original not in mapping:
            raise SystemExit(f'Missing HTML asset: {original}')
        return mapping[original]
    for name in PUBLIC:
        content = (ROOT / name).read_text()
        if name.endswith('.html'):
            content = re.sub(r'assets/[^\s\'"<>?]+(?:\?v=[^\s\'"<>]+)?', rewrite_html, content)
            content = re.sub(r'(<meta name="portfolio-version" content=")[^"]+(">)', lambda m: m[1]+version+m[2], content)
        (OUTPUT / name).write_text(content)
    (OUTPUT / 'version.json').write_text(json.dumps({
        'version': version, 'commit': commit if valid_commit else None,
        'builtAt': datetime.now(timezone.utc).isoformat(), 'website': 'https://shabab122.github.io/'
    }, indent=2)+'\n')
    print(f'Built _site: version {version}; {len(mapping)} assets; https://shabab122.github.io/')


if __name__ == '__main__':
    build()
