#!/usr/bin/env python3
"""Check the deployable site: asset paths, anchors, content order, and metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = ['GitStack','Ecommerce_Web_Project','Pdf-Rag-Study-Assistant','CarePulse-Healthcare-Management-System','Pac-Man-AI-Project','Campus-Evacuation-Planner']


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.sections = []
        self.projects = []
        self.canonical = None
        self.errors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'section':
            self.sections.append(attrs.get('id'))
        if 'data-repository' in attrs:
            self.projects.append(attrs['data-repository'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        for key in ['src','href']:
            if key in attrs:
                self.references.append(attrs[key])
        if tag == 'img' and 'alt' not in attrs:
            self.errors.append('Image is missing an alt attribute')
        if attrs.get('target') == '_blank' and 'noopener' not in attrs.get('rel',''):
            self.errors.append('External window link is missing noopener')


def verify(directory):
    directory = directory.resolve()
    text = (directory/'index.html').read_text()
    page = Page()
    page.feed(text)
    errors = page.errors
    if len(page.ids) != len(set(page.ids)):
        errors.append('Duplicate HTML IDs')
    if page.sections != ['about','problem-solving','tools','projects','education','contact']:
        errors.append(f'Unexpected section order: {page.sections}')
    if page.projects != EXPECTED:
        errors.append(f'Unexpected featured repository order: {page.projects}')
    if page.canonical != 'https://shabab122.github.io/':
        errors.append('Canonical URL is incorrect')
    if re.search('expected graduation', text, re.I):
        errors.append('Unwanted expected-graduation text remains')
    hero = text.split('id="about"',1)[1].split('</section>',1)[0]
    if re.search(r'B\.Sc|BSc|University|graduation|CGPA', hero, re.I):
        errors.append('Academic details remain in the introduction')
    for value in page.references:
        url = urlsplit(value)
        if value.startswith('#'):
            if value[1:] not in page.ids:
                errors.append(f'Broken anchor: {value}')
        elif not url.scheme and not value.startswith('//'):
            path = (directory / unquote(url.path)).resolve()
            if not path.is_relative_to(directory) or not path.is_file():
                errors.append(f'Missing local asset: {value}')
    for css in (directory/'assets/css').glob('*.css'):
        for value in re.findall(r'url\([\'"]?([^\)\'"\s]+)', css.read_text()):
            url = urlsplit(value)
            if not url.scheme and not (css.parent/unquote(url.path)).resolve().is_file():
                errors.append(f'Missing CSS asset: {value}')
    for required in ['404.html','robots.txt','sitemap.xml','.nojekyll']:
        if not (directory/required).is_file():
            errors.append(f'Missing {required}')
    if directory.name == '_site':
        version = json.loads((directory/'version.json').read_text())
        if f'content="{version["version"]}"' not in text:
            errors.append('Build version does not match the HTML')
        if not re.search(r'assets/css/style\.[a-f0-9]{12}\.css', text):
            errors.append('CSS is not fingerprinted')
        if not re.search(r'assets/js/main\.[a-f0-9]{12}\.js', text):
            errors.append('JavaScript is not fingerprinted')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'PASS: {directory.name}; six featured projects; correct section order; all local paths and anchors; deployment metadata.')


if __name__ == '__main__':
    verify(ROOT / (sys.argv[1] if len(sys.argv)>1 else '.'))
