# Contenido de Español basado en el plan de área

La referencia curricular es `PLAN DE AREA DE ESPAÑOL 1° -9°.docx`, aportado por el usuario. Se contrastaron las 171 filas de guías del documento con las 171 guías de la aplicación. Se mantienen sus identificadores y su orden; se abreviaron los títulos para facilitar la navegación.

Cada guía tiene una explicación original breve, un ejemplo o contexto, un reto específico y una producción oral, escrita o representada. Se conservan 145 preguntas anteriores asociadas a sus guías y se añaden 230 preguntas, para 375 en el recorrido. El repaso de cada bloque toma una pregunta de cada guía, con contexto, en vez de seleccionar preguntas solo por edad. Los juegos de práctica libre conservan sus bancos originales y se presentan como recursos adicionales.

`contenidoPlan.json` identifica para cada guía la tabla, fila, título original, contenidos y aprendizaje esperado del Word. Los números de tabla y fila son ordinales empezando en uno; la primera fila de cada tabla suele ser el encabezado. Los contenidos, componentes, estándares y aprendizajes de `mallaCurricularEspanol.json` se han recuperado de sus celdas originales. Los textos didácticos son adaptaciones, no citas del Word ni materiales oficialmente aprobados.

## Diferencias de organización del documento

- En primero, dos unidades corresponden a cada periodo.
- En segundo, el documento solo rotula primer y segundo periodo para sus cuatro unidades. La aplicación conserva la distribución previa en cuatro bloques, sin atribuirla al Word. Debe confirmarse el calendario con el docente. No faltan temas: se mantienen sus 18 guías en orden.
- En sexto, las guías 4 y 5 aparecen en una misma celda. La aplicación conserva una guía conjunta de mito, leyenda y tradición oral, incluyendo ambos conjuntos de contenidos. Por ello sexto tiene 14 tarjetas, no 15.

## Alcance pedagógico

La cobertura comprobada es la correspondencia de guías y temas con el documento; no equivale a una certificación de dominio de todos los desempeños. Las explicaciones son introducciones breves para evitar pantallas saturadas. Las tareas abiertas se realizan en el cuaderno o en clase y requieren retroalimentación docente; la casilla de revisión es una autoevaluación local, no una calificación ni un registro permanente.

Las guías de literatura piden trabajar fragmentos de obras, relatos y fuentes culturales identificadas. Se incluyen instrucciones concretas para su análisis y contextualización, pero esta versión no incorpora una antología completa ni los fragmentos de todas las obras nombradas en el plan. El docente debe seleccionar esas lecturas y validar profundidad, accesibilidad y adecuación con sus estudiantes. No se presentan textos inventados como fragmentos de autores.

## Fuentes de contraste conceptual

La organización curricular proviene exclusivamente del Word. Para contrastar conceptos literarios se consultaron también recursos educativos:

- [Soneto, Diccionario del español de México de El Colegio de México](https://dem.colmex.mx/ver/soneto).
- [Soneto, glosario Littera de la UNED](https://littera.uned.es/glosario/soneto/).
- [Lenguaje noveno, Secundaria Activa, Ministerio de Educación Nacional](https://contenidos.mineducacion.gov.co/ntg/men/archivos/Referentes_Calidad/Modelos_Flexibles/Secundaria_Activa/Guias_del_estudiante/Lenguaje/LG_Grado09.pdf).

## Mantenimiento y comprobación

`leccionesPlan.txt` contiene las adaptaciones y preguntas centrales. `retosPlanSecundaria.txt` agrega preguntas de aplicación para sexto a noveno. `generarContenidoPlan.py RUTA_AL_WORD` regenera los dos JSON utilizando python-docx. `validarContenidoPlan.py RUTA_AL_WORD` comprueba correspondencia con las filas originales, contenidos, referencias, identificadores y estructura de las preguntas sin modificar archivos.

La aplicación no necesita Python ni acceso al Word para funcionar: utiliza los JSON incluidos. Los scripts se usan únicamente al mantener o verificar contenidos.
