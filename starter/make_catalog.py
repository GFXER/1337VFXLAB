#!/usr/bin/env python3
"""Turn a folder of Markdown entries into catalog.js for the viewer (index.html).

Each entry is one .md file with a small front-matter block:

    ---
    id: t_whip
    kind: transition            # transition | effect | gradient | rule | prompt | tool | anything you like
    name: Whip blur
    group: Motion through the cut
    preview: ../docs/previews/t_whip.gif   # optional: gif, mp4, jpg or png, relative to index.html
    tags: [demo, fast]
    stops: [[0, "#000000"], [1, "#ffffff"]] # gradients only
    ---
    One-line description (the card text).

    ## How
    The recipe: effect names, values, frame counts.

Usage:  python3 make_catalog.py [catalog_dir] [out.js]
No dependencies. The output is a .js file (not .json) so index.html also works when opened straight from disk.
"""
import json, os, re, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'catalog')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'catalog.js')


def value(v):
    v = v.strip()
    if v.startswith('[') or v.startswith('{'):
        try:
            return json.loads(v)
        except ValueError:
            return [x.strip().strip('"\'') for x in v.strip('[]').split(',') if x.strip()]
    if re.fullmatch(r'-?\d+(\.\d+)?', v):
        return float(v) if '.' in v else int(v)
    return v.strip('"\'')


def parse(path):
    text = open(path, encoding='utf-8').read()
    m = re.match(r'---\s*\n(.*?)\n---\s*\n?(.*)', text, re.S)
    if not m:
        return None
    item = {}
    for line in m.group(1).splitlines():
        line = line.split(' #', 1)[0]
        if ':' in line:
            k, v = line.split(':', 1)
            item[k.strip()] = value(v)
    body = m.group(2).strip()
    parts = re.split(r'^##\s+How\s*$', body, maxsplit=1, flags=re.M | re.I)
    item['desc'] = parts[0].strip()
    item['how'] = parts[1].strip() if len(parts) > 1 else ''
    item.setdefault('id', os.path.splitext(os.path.basename(path))[0])
    item.setdefault('name', item['id'])
    item.setdefault('kind', os.path.basename(os.path.dirname(path)).rstrip('s') or 'item')
    item.setdefault('group', '')
    item.setdefault('tags', [])
    return item


items = []
for root, _, files in os.walk(SRC):
    for f in sorted(files):
        if f.endswith('.md'):
            it = parse(os.path.join(root, f))
            if it:
                items.append(it)

ids = [i['id'] for i in items]
dupes = {i for i in ids if ids.count(i) > 1}
if dupes:
    sys.exit('duplicate ids: ' + ', '.join(sorted(dupes)))

items.sort(key=lambda i: (i['kind'], str(i.get('num', '')).zfill(4), i['name'].lower()))
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('window.CATALOG = ' + json.dumps(items, ensure_ascii=False, indent=1) + ';\n')
kinds = {}
for i in items:
    kinds[i['kind']] = kinds.get(i['kind'], 0) + 1
print(f'{len(items)} items -> {OUT}  ' + '  '.join(f'{k}:{n}' for k, n in sorted(kinds.items())))
