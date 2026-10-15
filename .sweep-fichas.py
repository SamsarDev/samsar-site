"""Sweep the component catalog against the code (phase 7, block D).

Compares what each ficha declares - props and variant values - with what the
component defines, and prints only the entries where the two disagree.
"""

import glob
import re
from pathlib import Path

DOCS = sorted(glob.glob('docs/03-design/components/*.md'))
VARIANT_PROPS = ('variant', 'status', 'type')


def parse_entries(text: str) -> list[dict]:
    entries = []
    for part in re.split(r'^## ', text, flags=re.M)[1:]:
        lines = part.splitlines()
        heading = lines[0]
        m = re.match(r'\d+\.\s+`<([^`]+?)\s*/?>`\s*\(([^)]+)\)', heading)
        entry = {
            'name': m.group(1) if m else heading,
            'file': m.group(2) if m else '?',
            'props': [],
            'variants': [],
            'estado': None,
        }
        bucket = None
        for line in lines[1:]:
            s = line.strip()
            if s.startswith('- **Estado:'):
                entry['estado'] = s
                bucket = None
                continue
            if s.startswith('- **Props'):
                entry['props'].append(s)
                bucket = 'props'
                continue
            if s.startswith('- **Variantes'):
                entry['variants'].append(s)
                bucket = 'variants'
                continue
            if s.startswith('- **'):
                bucket = None
                continue
            if s.startswith('- ') and bucket:
                entry[bucket].append(s)
        entries.append(entry)
    return entries


def ficha_props(chunks: list[str]) -> set[str]:
    names = set()
    for chunk in chunks:
        # Strip parenthesised groups first: `variant` (`primary` | …) declares one
        # prop and lists its values, and the values are not props.
        stripped = re.sub(r'\([^)]*\)', '', chunk)
        for token in re.findall(r'`([^`]+)`', stripped):
            name = token.split(':')[0].split('(')[0].strip().rstrip('?')
            if re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*', name):
                names.add(name)
    return names


def ficha_variants(entry: dict) -> set[str]:
    values = set()
    for chunk in entry['variants']:
        # `primary`: Fondo…  ->  the value is the leading backticked token
        lead = re.match(r'- `([^`]+)`', chunk.strip())
        if lead:
            values.add(lead.group(1))
            continue
        # `default` (estática), `interactive` (…), `featured` (…) -> whole-line list
        for token in re.findall(r'`([^`]+)`', chunk):
            token = token.strip()
            if re.fullmatch(r'[a-z][a-z0-9-]*', token):
                values.add(token)
    return values


def code_props(text: str) -> set[str]:
    block = re.search(r'interface Props\s*\{(.*?)\n\}', text, re.S)
    if not block:
        block = re.search(r'defineProps<\{(.*?)\n\}>\(\)', text, re.S)
    if not block:
        return set()
    return set(re.findall(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\??\s*:', block.group(1), re.M))


def code_variants(text: str) -> tuple[str, set[str]]:
    for prop in VARIANT_PROPS:
        decl = re.search(rf'\b{prop}\??:\s*([^;\n]+)', text)
        if not decl:
            continue
        values = set(re.findall(r"'([^']+)'", decl.group(1)))
        if values:
            return prop, values
        # The type is an alias: resolve it before giving up.
        alias = re.search(r'[A-Za-z_][A-Za-z0-9_]*', decl.group(1))
        if alias:
            definition = re.search(rf'\b{re.escape(alias.group(0))}\s*=\s*([^;\n]+)', text)
            if definition:
                values = set(re.findall(r"'([^']+)'", definition.group(1)))
                if values:
                    return prop, values
    return '', set()


rows = []
total = 0
for doc in DOCS:
    for entry in parse_entries(Path(doc).read_text(encoding='utf-8')):
        estado = entry['estado'] or ''
        target = re.search(r'Implementado — `([^`]+)`', estado)
        if not target:
            continue
        total += 1
        path = Path(target.group(1))
        if not path.exists():
            rows.append((entry['name'], Path(doc).name, 'RUTA INEXISTENTE', target.group(1), '', ''))
            continue
        text = path.read_text(encoding='utf-8')
        declared, real = ficha_props(entry['props']), code_props(text)
        prop_gap = declared - real
        prop_missing = real - declared
        claim = ficha_variants(entry)
        prop_name, real_values = code_variants(text)
        variant_gap = claim - real_values if real_values else set()
        variant_extra = real_values - claim if claim else set()
        if prop_gap or variant_gap:
            rows.append(
                (
                    entry['name'],
                    Path(doc).name,
                    '; '.join(sorted(prop_gap)) or '-',
                    '; '.join(sorted(prop_missing)) or '-',
                    '; '.join(sorted(variant_gap)) or '-',
                    f'{prop_name}: ' + ('; '.join(sorted(variant_extra)) or '-'),
                )
            )

print(f'Entradas Implementado revisadas: {total}')
print(f'Con afirmaciones que el codigo no respalda: {len(rows)}\n')
header = f'{"Componente":<18} {"Doc":<14} {"Prop declarada inexistente":<28} {"Prop real sin documentar":<34} {"Variante inexistente":<22} Variantes reales'
print(header)
print('-' * len(header))
for row in rows:
    print(f'{row[0]:<18} {row[1]:<14} {row[2]:<28} {row[3]:<34} {row[4]:<22} {row[5]}')
