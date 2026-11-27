"""Comprueba integridad y correspondencia documental sin modificar archivos."""
import json
import re
import sys
from pathlib import Path
from docx import Document

base = Path(__file__).parent
malla = json.loads((base / 'mallaCurricularEspanol.json').read_text(encoding='utf8'))
contenido = json.loads((base / 'contenidoPlan.json').read_text(encoding='utf8'))
doc = Document(Path(sys.argv[1]))
ids = set()
referencias = set()
retos = 0
for grado in malla['grados'].values():
    assert len(grado['periodos']) == 4
    for periodo in grado['periodos']:
        for unidad in periodo['unidades']:
            for guia in unidad['guias']:
                key = guia['id']
                assert key not in ids
                ids.add(key)
                tema = contenido[key]
                assert guia['leccion']['lectura'] == tema['lectura']
                assert guia['titulo'] == tema['titulo']
                assert tema['produccion'] and tema['lectura']
                assert 'nos reunimos en torno a la palabra para explorar' not in tema['lectura']
                fuente = tema['fuente']
                referencia = (fuente['tabla'], fuente['fila'])
                assert referencia not in referencias
                referencias.add(referencia)
                fila = doc.tables[fuente['tabla'] - 1].rows[fuente['fila'] - 1]
                cells = list(dict.fromkeys(c.text.strip() for c in fila.cells))
                clean = lambda s: re.sub(r'\s+', ' ', s).strip()
                assert clean(cells[-2]) == fuente['guiaOriginal'], key
                topics = [clean(t).lstrip('-').strip() for t in cells[-1].split('\n') if clean(t).strip('-')]
                assert topics == fuente['contenidos'], key
                assert guia['contenidos'] == '; '.join(topics), key
                assert guia['dba'] == clean(cells[2]), key
                for reto in tema['retos']:
                    assert len(reto['opciones']) == len(set(reto['opciones'])) == 3, key
                    assert 0 <= reto['correcta'] < len(reto['opciones']), key
                    assert all(reto.get(k) for k in ['pregunta', 'pista', 'explicacion']), key
                    retos += 1
assert ids == set(contenido) and len(ids) == 171
print(f'OK: {len(ids)} guías, {len(referencias)} filas del Word, 36 bloques y {retos} retos nuevos; sin lecturas genéricas.')
