"""Regenera el contenido y su trazabilidad: python generarContenidoPlan.py PLAN.docx.

Las explicaciones de leccionesPlan.txt son adaptaciones didácticas, no citas del plan.
El documento se lee; nunca se modifica.
"""
import json
import re
import sys
from pathlib import Path
from docx import Document

base = Path(__file__).parent
source = Path(sys.argv[1])
doc = Document(source)
malla_path = base / 'mallaCurricularEspanol.json'
malla = json.loads(malla_path.read_text(encoding='utf8'))
tables = {
    1: list(range(1, 9)), 2: [9, 10, 11, 12],
    3: [14, 16, 18, 20], 4: [22, 24, 26, 28],
    5: [30, 32, 34, 36], 6: [38, 40, 42, 44],
    7: [46, 48, 50, 52], 8: [54, 56, 58, 60],
    9: [62, 64, 66, 68],
}

def clean(text):
    return re.sub(r'\s+', ' ', text).strip()

lessons = {}
for line in (base / 'leccionesPlan.txt').read_text(encoding='utf8').splitlines():
    if not line or line.startswith('#'):
        continue
    key, title, reading, challenge, production = line.split('|')
    question, correct, *wrong = challenge.split('~')
    assert key not in lessons and len(wrong) == 2
    # La respuesta cambia de posición sin azar para facilitar pruebas y reintentos.
    position = sum(map(int, key.split('-'))) % 3
    options = wrong[:]
    options.insert(position, correct)
    lessons[key] = {
        'titulo': title, 'lectura': reading, 'produccion': production,
        'retos': [{'pregunta': question, 'opciones': options, 'correcta': position,
                   'pista': 'Escucha o lee la explicación del tema antes de volver a elegir.',
                   'explicacion': reading}],
    }

for line in (base / 'retosPlanSecundaria.txt').read_text(encoding='utf8').splitlines():
    if not line or line.startswith('#'):
        continue
    key, challenge, explanation = line.split('|')
    question, correct, *wrong = challenge.split('~')
    position = (sum(map(int, key.split('-'))) + 1) % 3
    options = wrong[:]
    options.insert(position, correct)
    lessons[key]['retos'].append({'pregunta': question, 'opciones': options,
                                'correcta': position, 'pista': explanation,
                                'explicacion': explanation})

count = 0
for grade in malla['grados'].values():
    guides = [g for p in grade['periodos'] for u in p['unidades'] for g in u['guias']]
    rows = []
    for table_index in tables[grade['numero']]:
        for row_index, row in enumerate(doc.tables[table_index].rows[1:], start=1):
            cells = list(dict.fromkeys(cell.text.strip() for cell in row.cells))
            if len(cells) >= 5:
                rows.append((table_index, row_index, cells))
    assert len(rows) == len(guides), (grade['numero'], len(rows), len(guides))
    for guide, (table_index, row_index, cells) in zip(guides, rows):
        lesson = lessons[guide['id']]
        topics = [clean(t).lstrip('-').strip() for t in cells[-1].split('\n') if clean(t).strip('-')]
        guide.update(nombre=lesson['titulo'], titulo=lesson['titulo'],
                     contenidos='; '.join(topics), componente=clean(cells[0]),
                     estandares=clean(cells[1]), dba=clean(cells[2]))
        lesson['fuente'] = {'documento': source.name, 'tabla': table_index + 1,
                            'fila': row_index + 1, 'guiaOriginal': clean(cells[-2]),
                            'contenidos': topics, 'aprendizajeEsperado': clean(cells[2])}
        guide['leccion'] = {'lectura': lesson['lectura'], 'conceptosClave': [],
                            'sabiasQue': ''}
        guide['retoCuaderno'] = {'titulo': 'Crea y comparte', 'pasos': [lesson['produccion']]}
        # Preguntas abiertas centradas en esta explicación y en la producción concreta.
        guide['preguntasComprension'] = {
            'literal': [{'id': 'tema', 'pregunta': lesson['retos'][0]['pregunta'],
                         'guiaRespuesta': lesson['retos'][0]['opciones'][lesson['retos'][0]['correcta']]}],
            'inferencial': [{'id': 'explica', 'pregunta': 'Explica tu respuesta al reto usando una pista de la explicación.',
                            'guiaRespuesta': 'Comprobar que la justificación corresponde a este tema: ' + lesson['lectura']}],
            'critico': [{'id': 'crea', 'pregunta': lesson['produccion'],
                        'guiaRespuesta': 'Valorar la aplicación al tema y la explicación del estudiante. No hay una única producción correcta.'}],
        }
        count += 1

malla['fuenteCurricular'] = source.name
malla['notasCurriculares'] = {
    '2': 'El Word rotula primer y segundo periodo para sus cuatro unidades. Aquí se conserva la distribución didáctica previa en cuatro bloques; el docente debe confirmar su calendario. Los 18 temas mantienen el orden del documento.',
    '6': 'El Word agrupa las guías 4 (mito) y 5 (leyenda) en una misma celda. Se mantienen juntas y se incluyen ambos contenidos.',
}
assert len(lessons) == count == 171
malla_path.write_text(json.dumps(malla, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
(base / 'contenidoPlan.json').write_text(json.dumps(lessons, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(f'{count} guías contrastadas con el Word; {len(tables)} grados.')
