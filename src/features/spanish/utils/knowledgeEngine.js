// Motor Pedagógico de Sabiduría y Conocimiento de Español
// Transforma cualquier lección en una experiencia fascinante, profunda e interactiva (Cero aburrimiento)

export const BANCO_TEMATICO_PEDAGOGICO = {
  // 1. EL CUENTO Y LA NARRACIÓN
  CUENTO_ESTRUCTURA: {
    categoria: 'Género Narrativo',
    icono: '📖',
    tituloAtractivo: 'El Arte Secreto del Cuento: Inicio, Nudo y Desenlace',
    subtituloPedagogico: 'Aprende la fórmula que usan los grandes autores para atrapar al lector desde la primera línea.',
    lecturaViva: `¿Alguna vez te has quedado despierto hasta tarde leyendo una historia o escuchando un relato de los abuelos sin poder parar? Eso ocurre porque todo gran cuento tiene una trampa mágica: una estructura invisible que despierta nuestra curiosidad.

Todo cuento empieza en el INICIO (el mundo en calma donde conocemos a los personajes y el lugar). De repente, algo rompe la tranquilidad: ¡ocurre un conflicto o problema! Ese es el NUDO, la parte más emocionante donde el héroe debe luchar, investigar o inventar una solución. Finalmente llega el DESENLACE: el momento en que el misterio se resuelve y el mundo cambia para siempre.

En la tradición colombiana y latinoamericana, los mejores cuentistas saben que un buen personaje no es perfecto: tiene miedos, comete errores divertidos y tiene que ingeniárselas para salir adelante. ¡Eso es lo que hace a las historias inolvidables!`,
    formulaVisual: {
      titulo: 'Estructura en 3 Actos de una Gran Historia',
      pasos: [
        { paso: '1. Inicio (Calma)', desc: 'Presenta el personaje, su deseo y el lugar mágico donde vive.', color: 'bg-emerald-500', icono: '🌱' },
        { paso: '2. Nudo (Conflicto)', desc: '¡Aparece el gran problema! El personaje debe superar pruebas difíciles.', color: 'bg-amber-500', icono: '⚡' },
        { paso: '3. Desenlace (Resolución)', desc: 'Se resuelve el enigma. Nada vuelve a ser exactamente igual.', color: 'bg-purple-600', icono: '✨' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'El Conflicto Central',
        icono: '💥',
        definicion: 'Es el motor de toda la historia. Si todo fuera perfecto y nadie tuviera problemas, ¡no habría cuento!',
        ejemplo: 'Caperucita no solo va donde la abuela: el conflicto aparece cuando el lobo engaña y toma el camino corto.',
        trucoSabio: 'Para encontrar el conflicto, hazte la pregunta: "¿Qué es lo que impide que el personaje consiga lo que desea?".',
        errorComun: 'Creer que el conflicto debe ser violento. Puede ser un malentendido, un objeto perdido o un misterio.'
      },
      {
        concepto: 'El Personaje Protagónico',
        icono: '🦊',
        definicion: 'Es quien vive la aventura principal y toma decisiones cruciales que cambian el rumbo del relato.',
        ejemplo: 'En los relatos campesinos, Tío Conejo siempre usa el ingenio para escapar de Tío Tigre, que es más fuerte.',
        trucoSabio: 'Dale a tu protagonista una virtud brillante (ej. curiosidad) y un defecto divertido (ej. es distraído).',
        errorComun: 'Hacer personajes perfectos que nunca se equivocan. Los personajes imperfectos son los más queridos.'
      },
      {
        concepto: 'La Atmósfera o Ambiente',
        icono: '🌲',
        definicion: 'El escenario físico y emocional: los sonidos, colores y clima que hacen sentir al lector dentro del lugar.',
        ejemplo: 'Un páramo con niebla espesa donde el viento silba entre los frailejones crea suspenso de inmediato.',
        trucoSabio: 'Usa los 5 sentidos para describir: ¿A qué huele el bosque? ¿Cómo crujen las hojas bajo las botas?',
        errorComun: 'Describir solo lo que se ve y olvidar los olores, la temperatura y los sonidos.'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'El Truco IND: La Llave de Oro',
      icono: '🗝️',
      truco: 'Recuerda las letras I - N - D: Inicio (te conozco), Nudo (te complico), Desenlace (te soluciono). Si falta una, ¡el cuento se cae!'
    },
    errorTipico: {
      queConfunden: 'Terminar el cuento de golpe diciendo: "...y de repente todo fue un sueño y despertó".',
      comoSeHace: 'Haz que el personaje use algo que aprendió durante la aventura para resolver el problema con su propio mérito.',
      consejo: 'Un buen final recompensa la valentía y el ingenio del personaje.'
    },
    curiosidadAsombrosa: {
      titulo: '¿Sabías que el cuento más corto del mundo tiene 7 palabras?',
      texto: 'El escritor Augusto Monterroso escribió: "Cuando despertó, el dinosaurio todavía estaba allí." ¡En una sola línea logró inicio, nudo y misterio infinito!',
      datoCurioso: '¡Solo 7 palabras bastaron para que miles de lectores imaginen mundos enteros!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: '¿Cuál es la función principal del "NUDO" en un texto narrativo?',
        opciones: [
          { texto: 'Presentar el nombre de los personajes y el paisaje.', esCorrecta: false, feedback: 'Eso ocurre en el Inicio.' },
          { texto: 'Plantear el gran problema o conflicto que desafía al protagonista.', esCorrecta: true, feedback: '¡Exacto! Sin nudo no hay emoción ni suspenso.' },
          { texto: 'Escribir la bibliografía y la fecha del cuento.', esCorrecta: false, feedback: 'Eso no forma parte de la trama narrativa.' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: 'Si un cuento describe el crujir de ramas secas y el olor a tierra mojada antes de una tormenta, está trabajando:',
        opciones: [
          { texto: 'La atmósfera o ambiente sensorial del relato.', esCorrecta: true, feedback: '¡Brillante! Activar los sentidos sumerge al lector en la escena.' },
          { texto: 'La ortografía de los verbos en infinitivo.', esCorrecta: false, feedback: 'Aquí estamos analizando el recurso descriptivo ambiental.' },
          { texto: 'El desenlace trágico del argumento.', esCorrecta: false, feedback: 'Eso describe el entorno, no la resolución final.' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: '¿Por qué los personajes con defectos y dudas suelen ser más memorables que los personajes perfectos?',
        opciones: [
          { texto: 'Porque así el cuento se vuelve más aburrido y largo.', esCorrecta: false, feedback: 'Al contrario, se vuelve mucho más entretenido.' },
          { texto: 'Porque el lector se siente identificado con sus emociones y celebra su superación.', esCorrecta: true, feedback: '¡Maestría pura! La empatía humana hace que nos importe lo que le suceda al protagonista.' },
          { texto: 'Porque los autores no saben cómo inventar personajes fuertes.', esCorrecta: false, feedback: 'Los mejores escritores crean personajes profundamente humanos.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'Todo cuento requiere un conflicto que obligue al protagonista a transformarse y tomar decisiones.',
      ejemploEstrella: 'Inicio (Calma) ➔ Nudo (¡Problema inesperado!) ➔ Desenlace (Solución con ingenio).',
      aplicacionVida: 'En tu propia vida, los problemas son como el nudo de un cuento: ¡la oportunidad de demostrar tu valentía!'
    }
  },

  // 2. FÁBULA Y PERSONIFICACIÓN
  FABULA_MORALEJA: {
    categoria: 'Tradición y Sabiduría',
    icono: '🦊',
    tituloAtractivo: 'La Fábula: Animales que Hablan y Dejan Sabiduría Viva',
    subtituloPedagogico: 'Descubre cómo los antiguos sabios usaban zorros, tortugas y hormigas para enseñar lecciones eternas.',
    lecturaViva: `¿Alguna vez te has preguntado por qué en las fábulas los animales hablan, discuten, sienten vanidad o aprenden a ser generosos? Este recurso literario se llama PERSONIFICACIÓN y es una de las herramientas más ingeniosas de la humanidad.

Desde el sabio Esopo en la antigua Grecia hasta Rafael Pombo en Colombia, los escritores descubrieron que si le decías a una persona sus errores directamente, se enojaba; pero si le contabas una historia divertida sobre una liebre orgullosa que se durmió en la carrera o un ratón que salvó a un león, ¡la enseñanza entraba directo al corazón!

Cada fábula culmina con una MORALEJA: una perla de sabiduría práctica sobre el trabajo constante, la humildad, el respeto por los demás y el valor de no juzgar por las apariencias.`,
    formulaVisual: {
      titulo: 'El Engranaje Mágico de la Fábula',
      pasos: [
        { paso: '1. Personajes Animales', desc: 'Cada animal representa una cualidad humana (astucia, vanidad, pereza, lealtad).', color: 'bg-amber-500', icono: '🦉' },
        { paso: '2. El Dilema Moral', desc: 'Se enfrentan dos actitudes opuestas (el presumido contra el paciente).', color: 'bg-rose-500', icono: '⚖️' },
        { paso: '3. La Moraleja Final', desc: 'La lección sabia que podemos aplicar en la escuela, la casa y la vereda.', color: 'bg-emerald-600', icono: '💡' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'La Moraleja',
        icono: '💡',
        definicion: 'Es la enseñanza ética o reflexión final que se desprende de las consecuencias vividas por los personajes.',
        ejemplo: 'En "La Liebre y la Tortuga", la moraleja enseña que la constancia y la humildad vencen al talento descuidado.',
        trucoSabio: 'Pregúntate siempre: "¿Qué aprendió el animal presumido después de cometer su error?".',
        errorComun: 'Pensar que la moraleja es solo una frase aburrida; en realidad es un escudo contra los errores de la vida.'
      },
      {
        concepto: 'La Personificación (Prosopopeya)',
        icono: '🎭',
        definicion: 'Figura retórica que otorga voz, pensamientos y emociones humanas a animales, plantas o cosas inanimadas.',
        ejemplo: 'El zorro felicitó al cuervo con palabras dulces para que abriera el pico y soltara el queso.',
        trucoSabio: 'Si un objeto o animal hace algo que solo una persona puede hacer (pensar, hablar, mentir), ¡es personificación!',
        errorComun: 'Confundir la personificación con una simple descripción física del animal.'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'El Secreto de la Tortuga',
      icono: '🐢',
      truco: 'En la fábula, quien corre con soberbia tropieza; quien avanza paso a paso con alegría, ¡siempre llega a la meta!'
    },
    errorTipico: {
      queConfunden: 'Confundir una fábula con un cuento de hadas o un informe de ciencias naturales.',
      comoSeHace: 'La fábula es corta, sus protagonistas son casi siempre animales con defectos humanos y SIEMPRE deja una moraleja.',
      consejo: 'Si no hay lección para la vida, es un cuento fantástico, no una fábula clásica.'
    },
    curiosidadAsombrosa: {
      titulo: '¿Conocías a Rafael Pombo, el gran fabulista colombiano?',
      texto: 'Escribió fábulas en verso inolvidables como "Rinrín Renacuajo", "Simón el Bobito" y "La Pobre Viejecita", llenas de picardía, rima musical y críticas divertidas a las costumbres de la época.',
      datoCurioso: '¡"El hijo de rana, Rinrín Renacuajo, salió esta mañana muy tieso y muy majo" es el verso más recitado de Colombia!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: '¿Qué elemento es OBLIGATORIO en una fábula para considerarse como tal?',
        opciones: [
          { texto: 'Tener una moraleja o enseñanza sobre la conducta humana.', esCorrecta: true, feedback: '¡Correcto! La moraleja es el alma de la fábula.' },
          { texto: 'Tener más de 500 páginas de texto.', esCorrecta: false, feedback: 'Las fábulas son breves y directas.' },
          { texto: 'Ocurrir únicamente en naves espaciales.', esCorrecta: false, feedback: 'Suelen ocurrir en bosques, granjas o caminos rurales.' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: 'Cuando decimos: "El viejo sauce lloraba y el viento le susurraba secretos al oído", usamos:',
        opciones: [
          { texto: 'Personificación o Prosopopeya.', esCorrecta: true, feedback: '¡Exacto! Ni los sauces lloran ni el viento susurra como personas.' },
          { texto: 'Una regla de acentuación aguda.', esCorrecta: false, feedback: 'Es una figura literaria de significado.' },
          { texto: 'Una falta de ortografía.', esCorrecta: false, feedback: 'Al contrario, es un recurso poético bellísimo.' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: '¿Por qué la fábula sigue siendo una de las formas de literatura más poderosas miles de años después?',
        opciones: [
          { texto: 'Porque los animales nos permiten ver nuestros propios defectos sin sentirnos atacados.', esCorrecta: true, feedback: '¡Extraordinario análisis! Nos vemos reflejados en el espejo de los animales.' },
          { texto: 'Porque a nadie le gustan los seres humanos.', esCorrecta: false, feedback: 'No tiene nada que ver con eso.' },
          { texto: 'Porque los diccionarios obligan a leerlas.', esCorrecta: false, feedback: 'Se leen porque son entretenidas y sabias.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'La fábula utiliza la personificación de animales para transmitir una moraleja ética que educa con humor.',
      ejemploEstrella: 'Animales con rasgos humanos ➔ Conflicto de actitudes ➔ Moraleja final práctica.',
      aplicacionVida: 'Observa a las personas con sabiduría: no te dejes llevar por palabras lisonjeras como el cuervo que perdió su queso.'
    }
  },

  // 3. ACENTUACIÓN Y MÉTODO SEGA
  ACENTUACION_SEGA: {
    categoria: 'Ortografía y Fonética',
    icono: '⚡',
    tituloAtractivo: 'Cazadores de Tildes: El Infalible Método SEGA',
    subtituloPedagogico: 'Domina las palabras agudas, graves, esdrújulas y sobresdrújulas para no dudar jamás de una tilde.',
    lecturaViva: `¿Alguna vez te has preguntado por qué una pequeña rayita inclinada llamada TILDE tiene tanto poder? Mira esto: no es lo mismo decir "Yo CANTO una copla", "Él CANTÓ en la fiesta" o "El CÁNTARO de agua". ¡Una sola tilde cambia por completo el tiempo, el significado y la persona que habla!

Todas las palabras en español tienen una sílaba que suena más fuerte: se llama SÍLABA TÓNICA. Pero no todas llevan tilde escrita. Para saber cuándo ponerla, los maestros inventaron el truco definitivo: la palabra mágica **S - E - G - A**, que se lee de derecha a izquierda:

1. **A (Agudas)**: La fuerza cae en la ÚLTIMA sílaba. Llevan tilde si terminan en **N, S o VOCAL** (ej. *canción, compás, papá*).
2. **G (Graves o Llanas)**: La fuerza cae en la PENÚLTIMA sílaba. Llevan tilde si **NO** terminan en N, S ni Vocal (ej. *árbol, lápiz, cóndor*).
3. **E (Esdrújulas)**: La fuerza cae en la ANTEPENÚLTIMA sílaba. ¡Y son las más generosas de todas porque **SIEMPRE LLEVAN TILDE**! (ej. *música, pájaro, teléfono*).
4. **S (Sobresdrújulas)**: La fuerza cae antes de la antepenúltima. ¡También **SIEMPRE LLEVAN TILDE**! (ej. *cómpratelo, dígaselo*).`,
    formulaVisual: {
      titulo: 'El Mapa del Método SEGA (De Derecha a Izquierda)',
      pasos: [
        { paso: 'S • Sobresdrújula', desc: 'Antes de la antepenúltima: ¡SIEMPRE tilde! (fácilmente)', color: 'bg-purple-600', icono: '🟣' },
        { paso: 'E • Esdrújula', desc: 'Antepenúltima sílaba: ¡SIEMPRE tilde! (mágica, brújula)', color: 'bg-blue-600', icono: '🔵' },
        { paso: 'G • Grave', desc: 'Penúltima sílaba: Tilde si NO termina en N, S ni Vocal (árbol)', color: 'bg-emerald-600', icono: '🟢' },
        { paso: 'A • Aguda', desc: 'Última sílaba: Tilde si termina en N, S o Vocal (café, corazón)', color: 'bg-rose-500', icono: '🔴' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'La Sílaba Tónica',
        icono: '📢',
        definicion: 'La sílaba que se pronuncia con mayor intensidad o golpe de voz en una palabra.',
        ejemplo: 'En "co-ra-ZÓN", el golpe está en ZÓN; en "VEN-ta-na", el golpe está en VEN-ta.',
        trucoSabio: 'Imagina que llamas a la palabra desde la colina: "¡¡Ven-TAAA-na!!". Donde alargues la voz, ¡ahí está la tónica!',
        errorComun: 'Confundir acento prosódico (el sonido) con el acento ortográfico (la rayita de la tilde).'
      },
      {
        concepto: 'La Tilde Diacrítica',
        icono: '🎯',
        definicion: 'Tilde especial que se usa para diferenciar dos palabras que se escriben igual pero tienen distinto significado.',
        ejemplo: 'Él (pronombre personal: Él vino) vs El (artículo: El perro). Té (bebida) vs Te (pronombre: Te quiero).',
        trucoSabio: 'Si se refiere a una persona real, "Él", "Tú" y "Mí" llevan corona (tilde).',
        errorComun: 'Ponerle tilde a "ti". La palabra "ti" ¡NUNCA lleva tilde porque no existe otra palabra "ti"!'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'La Regla de los Monosílabos Rebeldes',
      icono: '🚫',
      truco: 'Las palabras de una sola sílaba (pan, sol, fe, dio, fui, vio) NUNCA llevan tilde, a menos que sean de la lista diacrítica (él, tú, mí, sí, té, dé, sé, más).'
    },
    errorTipico: {
      queConfunden: 'Ponerle tilde a palabras graves que terminan en N, S o vocal como "examen" o "joven".',
      comoSeHace: '"Examen" no lleva tilde porque es grave y termina en N. Pero en plural se vuelve esdrújula: "e-XÁ-me-nes" y ahí sí lleva tilde obligatoria.',
      consejo: '¡Fíjate en qué letra termina antes de dibujar la tilde!'
    },
    curiosidadAsombrosa: {
      titulo: '¿Sabías que una tilde salvó la vida de un hombre?',
      texto: 'Cuenta la historia que un rey mandó un telegrama que decía: "Perdón imposible, que vaya a prisión". Pero el mensajero movió la coma y la tilde: "Perdón, ¡imposible que vaya a prisión!". ¡Y el inocente fue liberado!',
      datoCurioso: '¡La puntuación y la tilde salvan vidas y evitan malentendidos épicos!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: '¿Por qué la palabra "MÚSICA" lleva tilde obligatoria?',
        opciones: [
          { texto: 'Porque es una palabra esdrújula y TODAS las esdrújulas llevan tilde sin excepción.', esCorrecta: true, feedback: '¡Exacto! MÚ-si-ca tiene el golpe en la antepenúltima sílaba.' },
          { texto: 'Porque empieza con la letra M.', esCorrecta: false, feedback: 'La letra inicial no tiene nada que ver con la tilde.' },
          { texto: 'Porque termina en vocal A.', esCorrecta: false, feedback: 'Esa es la regla de las agudas, no de las esdrújulas.' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: 'Entre las siguientes palabras, ¿cuál de ellas es GRAVE y lleva tilde correctamente?',
        opciones: [
          { texto: 'Lápiz (porque la fuerza cae en "Lá" y termina en Z).', esCorrecta: true, feedback: '¡Brillante! Como termina en Z (que no es N ni S), lleva tilde.' },
          { texto: 'Canción (porque termina en N).', esCorrecta: false, feedback: 'Canción es aguda, no grave.' },
          { texto: 'Cántaro (porque tiene 3 sílabas).', esCorrecta: false, feedback: 'Cántaro es esdrújula.' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: 'En la frase: "___ quieres que te prepare un poco de ___ aromático", ¿cuáles palabras completan la oración correctamente?',
        opciones: [
          { texto: 'Si / té (Si condicional sin tilde / té infusión con tilde).', esCorrecta: true, feedback: '¡Maestría diacrítica absoluta! "Si" de condición va sin tilde y "té" de bebida lleva tilde.' },
          { texto: 'Sí / te (Sí de afirmación / te de pronombre).', esCorrecta: false, feedback: 'Invertiste las funciones de las tildes.' },
          { texto: 'Si / te (ninguna con tilde).', esCorrecta: false, feedback: 'El té como bebida aromática siempre exige tilde diacrítica.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'Usa el método SEGA: Agudas (tilde en N, S, vocal), Graves (tilde si NO terminan en N, S, vocal), Esdrújulas (¡SIEMPRE!).',
      ejemploEstrella: 'Aguda: Ca-fé | Grave: Ár-bol | Esdrújula: Pí-la-ra | Sobresdrújula: Pán-sa-me-lo.',
      aplicacionVida: 'Escribir con tildes correctas demuestra respeto por las personas que leen tus cartas, tareas y mensajes.'
    }
  },

  // 4. LA ORACIÓN: SUJETO, PREDICADO Y CONCORDANCIA
  ORACION_SINTAXIS: {
    categoria: 'Gramática y Sintaxis',
    icono: '📐',
    tituloAtractivo: 'El Detective de Oraciones: Sujeto, Verbo y Predicado',
    subtituloPedagogico: 'Aprende a desarmar y construir oraciones poderosas con la regla de oro de la concordancia.',
    lecturaViva: `Una oración no es una bolsa desordenada de palabras. Es como un tren en marcha: cada vagón cumple una misión precisa para que el mensaje llegue a su destino con fuerza y claridad.

Toda oración bien formada tiene dos partes esenciales:
1. **El SUJETO**: Es el protagonista, la persona, animal o cosa de quien se dice algo en la oración.
2. **El PREDICADO**: Es todo lo que se dice sobre el sujeto. ¡Y en el corazón de todo predicado late un VERBO (la acción que ocurre)!

El secreto mejor guardado de los escritores es la **CONCORDANCIA**: el sujeto y el verbo deben cantar con el mismo número (singular o plural) y la misma persona. Si dices "Los pájaros canta", ¡el tren se descarrila! Debe ser: "Los pájaros (plural) CANTAN (plural)".`,
    formulaVisual: {
      titulo: 'La Fórmula Magistral de la Oración Bimembre',
      pasos: [
        { paso: '1. ¿Quién realiza la acción?', desc: 'SUJETO: "La capitana valiente..." (Núcleo: Capitana)', color: 'bg-blue-600', icono: '👤' },
        { paso: '2. ¿Cuál es el motor?', desc: 'VERBO CONJUGADO: "...navega..." (Acción en tiempo presente)', color: 'bg-rose-600', icono: '⚡' },
        { paso: '3. ¿Qué, cómo o dónde?', desc: 'COMPLEMENTOS: "...hacia la isla del tesoro."', color: 'bg-emerald-600', icono: '🗺️' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'El Sujeto Tácito (o Fantasma)',
        icono: '👻',
        definicion: 'Es cuando el sujeto no está escrito en la oración, pero sabemos quién es gracias a la terminación del verbo.',
        ejemplo: 'En "Viajamos a Cartagena", el sujeto tácito es NOSOTROS (nadie más puede decir "viajamos").',
        trucoSabio: 'Mira la terminación del verbo: si dice "comí", el sujeto eres TÚ? ¡No, soy YO!',
        errorComun: 'Creer que si una oración no tiene la palabra "Juan" o "Ella", entonces no tiene sujeto.'
      },
      {
        concepto: 'El Núcleo del Predicado',
        icono: '❤️',
        definicion: 'Es siempre el VERBO conjugado. Sin verbo, no existe predicado ni oración completa.',
        ejemplo: 'En "Los campesinos madrugan a recolectar café", el núcleo del predicado es "madrugan".',
        trucoSabio: 'El verbo es el rey de la oración: si lo cambias de tiempo, cambia toda la película.',
        errorComun: 'Confundir un adjetivo ("rápido") con un verbo de acción ("corre").'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'La Pregunta Infalible del Detective',
      icono: '🔍',
      truco: 'Para encontrar el sujeto en cualquier oración, localiza el verbo y pregúntale: "¿Quién o quiénes hacen la acción?". La respuesta SIEMPRE será el sujeto.'
    },
    errorTipico: {
      queConfunden: 'Poner una coma entre el sujeto y el verbo: "El profesor de matemáticas, explicó la clase." ❌',
      comoSeHace: '¡NUNCA se separa el sujeto del verbo con una coma! Se escribe seguido: "El profesor de matemáticas explicó la clase." ✅',
      consejo: 'Imagina que el sujeto y el verbo van tomados de la mano; no pongas una coma en medio.'
    },
    curiosidadAsombrosa: {
      titulo: '¿Sabías que una oración puede tener una sola palabra?',
      texto: 'Si alguien grita: "¡Corran!", es una oración completa con sentido total. El verbo es "Corran" y el sujeto tácito es "Ustedes".',
      datoCurioso: '¡Una sola palabra puede tener la fuerza de una novela entera!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: 'En la oración: "Las mariposas amarillas revolotean sobre el río", ¿cuál es el SUJETO?',
        opciones: [
          { texto: 'Las mariposas amarillas (quienes realizan la acción).', esCorrecta: true, feedback: '¡Exacto! ¿Quiénes revolotean? Las mariposas amarillas.' },
          { texto: 'Sobre el río.', esCorrecta: false, feedback: 'Ese es un complemento de lugar del predicado.' },
          { texto: 'Revolotean.', esCorrecta: false, feedback: 'Revolotean es el verbo (núcleo del predicado).' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: '¿Cuál de las siguientes oraciones tiene un SUJETO TÁCITO correctamente identificado?',
        opciones: [
          { texto: '"Descubrimos un secreto antiguo en la cueva." (Sujeto tácito: Nosotros)', esCorrecta: true, feedback: '¡Brillante deducción! El verbo "descubrimos" indica claramente que somos nosotros.' },
          { texto: '"El gato duerme en el tejado." (Sujeto tácito: El perro)', esCorrecta: false, feedback: 'Aquí el sujeto sí está escrito: "El gato".' },
          { texto: '"Los árboles crecen muy alto." (Sujeto tácito: Nadie)', esCorrecta: false, feedback: 'Aquí el sujeto expreso es "Los árboles".' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: '¿Cuál de las siguientes frases respeta rigurosamente la regla de CONCORDANCIA gramatical?',
        opciones: [
          { texto: 'La manada de lobos aulló bajo la luna llena.', esCorrecta: true, feedback: '¡Maestría absoluta! "La manada" es un sustantivo colectivo singular, por eso el verbo va en singular "aulló".' },
          { texto: 'La manada de lobos aullaron bajo la luna llena.', esCorrecta: false, feedback: 'Aunque los lobos son muchos, el sujeto gramatical es "La manada" (singular).' },
          { texto: 'Los lobo salvaje corren en la nieve.', esCorrecta: false, feedback: 'Falta concordancia de número entre artículo, sustantivo y adjetivo.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'Una oración coherente une un Sujeto (quién) y un Predicado (qué hace) con perfecta concordancia de número y persona.',
      ejemploEstrella: '[Sujeto: Los exploradores curiosos] + [Predicado: encontraron un mapa en el baúl].',
      aplicacionVida: 'Expresarte con oraciones claras y ordenadas te permitirá defender tus ideas en debates, cartas y exposiciones.'
    }
  },

  // 5. MITOS, LEYENDAS Y TRADICIÓN ORAL
  MITO_LEYENDA: {
    categoria: 'Cosmovisión y Literatura',
    icono: '🌿',
    tituloAtractivo: 'Mitos y Leyendas: El Eco Sagrado de Nuestros Ancestros',
    subtituloPedagogico: 'Diferencia el Mito de la Creación de la Leyenda Popular y descubre los relatos de Colombia.',
    lecturaViva: `Antes de que existieran los libros impresos, las pantallas y los aviones, los pueblos indígenas y campesinos de Colombia se reunían alrededor del fuego para responder a las grandes preguntas del universo: ¿De dónde salió el agua? ¿Quién creó el sol? ¿Por qué debemos cuidar la montaña?

Aquí nacen dos tesoros diferentes de nuestra memoria viva:
1. **El MITO**: Es un relato sagrado que explica el ORIGEN del cosmos, de los seres humanos o de los fenómenos de la naturaleza. Sus protagonistas son DIOSES, seres sobrenaturales o los primeros héroes ancestrales (como Bochica lanzando su vara de oro para crear el Salto del Tequendama o Bachué emergiendo de la laguna de Iguaque).
2. **La LEYENDA**: Es un relato popular ubicado en una época histórica y geográfica real (una vereda, un río, un pueblo colonial). Tiene como protagonistas a seres misteriosos que castigan a quienes destruyen la naturaleza o rompen la paz de la comunidad (como el Mohán en el río Magdalena, la Madremonte o la Patasola).`,
    formulaVisual: {
      titulo: 'El Duelo de Saberes: ¿Mito o Leyenda?',
      pasos: [
        { paso: 'MITO (Origen Sagrado)', desc: 'Tiempo primordial antes del mundo actual. Dioses y creadores (Bochica, Bachué, Popol Vuh).', color: 'bg-amber-500', icono: '☀️' },
        { paso: 'LEYENDA (Memoria Local)', desc: 'Lugar conocido (un río, una montaña). Seres guardianes que enseñan respeto ecológico.', color: 'bg-emerald-600', icono: '🌊' },
        { paso: 'TRADICIÓN ORAL (El Puente)', desc: 'Se transmiten de generación en generación mediante la voz de los abuelos.', color: 'bg-indigo-600', icono: '👵' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'La Cosmovisión Ancestral',
        icono: '🌎',
        definicion: 'La forma de entender el mundo donde la tierra no es una mercancía, sino una madre viva conectada con los seres humanos.',
        ejemplo: 'Para los pueblos indígenas de la Sierra Nevada, cuidar los ríos de la cumbre es cuidar el corazón del planeta.',
        trucoSabio: 'Un mito no es una "mentira"; es una metáfora poética para explicar verdades profundas de la vida.',
        errorComun: 'Pensar que los mitos son simples cuentos de hadas infantiles.'
      },
      {
        concepto: 'El Guardián Ecológico en la Leyenda',
        icono: '🌲',
        definicion: 'Personajes legendarios cuya función tradicional era proteger los bosques, las aguas y la fauna silvestre de los abusos humanos.',
        ejemplo: 'La Madremonte castiga con tempestades e inundaciones a los leñadores que talan árboles sagrados cerca de los nacimientos.',
        trucoSabio: 'Pregúntate: "¿Qué daño a la naturaleza o a la comunidad intentaba frenar esta leyenda?".',
        errorComun: 'Creer que las leyendas solo buscan asustar; su verdadero propósito es educar y proteger la vida.'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'El Truco del Tiempo y el Espacio',
      icono: '⏳',
      truco: 'Si habla de la creación del universo y dioses celestiales: MITO. Si habla de un ser que asusta en la quebrada de la vereda: LEYENDA.'
    },
    errorTipico: {
      queConfunden: 'Usar la palabra "mito" como sinónimo de "mentira" o "falsedad".',
      comoSeHace: 'En literatura y antropología, el mito es el relato fundacional que da identidad y valores sagrados a una cultura entera.',
      consejo: 'Trata los mitos de nuestros pueblos indígenas con el mismo respeto con que se tratan las grandes escrituras del mundo.'
    },
    curiosidadAsombrosa: {
      titulo: '¿Sabías que el mito de El Dorado inspiró expediciones de todo el planeta?',
      texto: 'En la laguna de Guatavita, los caciques muiscas se cubrían de polvo de oro y navegaban en una balsa sagrada para ofrendar esmeraldas a los dioses del agua. Los conquistadores creyeron que existía una ciudad entera de oro macizo y pasaron siglos buscándola.',
      datoCurioso: '¡La balsa muisca de oro original se conserva intacta en el Museo del Oro en Bogotá!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: '¿Cuál es la diferencia fundamental entre un MITO y una LEYENDA?',
        opciones: [
          { texto: 'El mito explica el origen sagrado del mundo y los dioses; la leyenda ocurre en lugares locales y enseña normas comunitarias.', esCorrecta: true, feedback: '¡Distinción perfecta! Esa es la frontera entre cosmogonía y relato popular.' },
          { texto: 'El mito se escribe en inglés y la leyenda en español.', esCorrecta: false, feedback: 'Ambos géneros existen en todas las lenguas del mundo.' },
          { texto: 'Las leyendas siempre son científicas y comprobadas en laboratorio.', esCorrecta: false, feedback: 'Las leyendas forman parte de la tradición oral y popular.' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: 'En la tradición colombiana, ¿qué mensaje ecológico transmite el relato de la Madremonte?',
        opciones: [
          { texto: 'El respeto y protección de los bosques, manantiales y cuencas hidrográficas.', esCorrecta: true, feedback: '¡Brillante! Nuestros abuelos usaban este relato para frenar la deforestación.' },
          { texto: 'La necesidad de construir carreteras de cemento en todas las montañas.', esCorrecta: false, feedback: 'Al contrario, castiga la destrucción de los bosques.' },
          { texto: 'Que es bueno botar basura en las quebradas.', esCorrecta: false, feedback: '¡Totalmente opuesto al sentido del relato!' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: '¿Por qué la tradición oral es considerada un patrimonio cultural inmaterial invaluable?',
        opciones: [
          { texto: 'Porque preserva la memoria, la identidad, la sabiduría y la historia viva de los pueblos a través de la voz.', esCorrecta: true, feedback: '¡Maestría antropológica! La voz de los abuelos es la biblioteca más antigua de la humanidad.' },
          { texto: 'Porque ahorra papel y tinta para las impresoras.', esCorrecta: false, feedback: 'Su valor no es económico, es cultural y humano.' },
          { texto: 'Porque nadie debería aprender a escribir.', esCorrecta: false, feedback: 'La tradición oral se complementa maravillosamente con la escritura.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'Los mitos explican el origen sagrado del universo; las leyendas cuidan la convivencia y la armonía con la naturaleza.',
      ejemploEstrella: 'Mito: Bachué emerge de la laguna ➔ Leyenda: El Mohán custodia los peces del río.',
      aplicacionVida: 'Escucha con atención las historias de tus abuelos y mayores: guardan secretos que ningún buscador de internet conoce.'
    }
  },

  // 6. FIGURAS RETÓRICAS Y REALISMO MÁGICO
  FIGURAS_LITERARIAS: {
    categoria: 'Poética y Estilo',
    icono: '✨',
    tituloAtractivo: 'Pintores del Lenguaje: Metáforas, Símiles y Realismo Mágico',
    subtituloPedagogico: 'Aprende a transformar oraciones comunes en imágenes poéticas deslumbrantes que despiertan la imaginación.',
    lecturaViva: `El lenguaje ordinario sirve para pedir el almuerzo o saber la hora. Pero cuando un escritor utiliza FIGURAS RETÓRICAS, las palabras dejan de ser simples sonidos y se convierten en pinceles llenos de color, magia y emoción.

No es lo mismo decir: "Tus ojos son oscuros" que decir: "Tus ojos son dos pozos de noche estrellada". En esa segunda frase acabas de crear una METÁFORA: una equivalencia mágica donde una cosa se transforma en otra sin usar la palabra "como". Si hubieras dicho "Tus ojos son COMO la noche", habrías creado un SÍMIL o comparación directa.

En Colombia floreció el movimiento literario más famoso del siglo XX: el REALISMO MÁGICO de Gabriel García Márquez. Su genialidad consistió en narrar acontecimientos extraordinarios (lluvias de flores amarillas, mariposas que siguen a un enamorado, alfombras voladoras) con la misma naturalidad con que una abuela campesina cuenta que va a llover porque le pica la rodilla.`,
    formulaVisual: {
      titulo: 'El Laboratorio de Figuras Retóricas',
      pasos: [
        { paso: 'Metáfora (Identidad Mágica)', desc: 'Dice que X ES Y: "Las nubes son copos de algodón en el cielo."', color: 'bg-purple-600', icono: '✨' },
        { paso: 'Símil (Comparación Directa)', desc: 'Usa conectores (como, parece): "El caballo corría COMO el viento."', color: 'bg-blue-600', icono: '🔍' },
        { paso: 'Hipérbole (Exageración Épica)', desc: 'Multiplica la realidad: "Tardó mil años en contestar el saludo."', color: 'bg-rose-500', icono: '💥' }
      ]
    },
    conceptosClave: [
      {
        concepto: 'La Metáfora',
        icono: '✨',
        definicion: 'Traslada el significado de una palabra a otra gracias a una semejanza poética oculta, sin usar la palabra "como".',
        ejemplo: '"El río es una serpiente de plata que baja de la montaña."',
        trucoSabio: 'Identifica los dos elementos: Río (real) + Serpiente de plata (imaginario). Al unirlos sin "como", ¡nace la metáfora!',
        errorComun: 'Confundirla con el símil. Si ves la palabra "como", "cual" o "parece", ya no es metáfora.'
      },
      {
        concepto: 'El Realismo Mágico',
        icono: '🦋',
        definicion: 'Estilo literario donde lo prodigioso y fantástico es vivido por los personajes como parte normal de su vida diaria.',
        ejemplo: 'En "Cien años de soledad", Remedios la Bella asciende al cielo entre sábanas blancas y el pueblo solo se preocupa por las sábanas.',
        trucoSabio: 'El truco de Gabo: narra lo mágico con cara seria y precisión de periodista, y narra lo cotidiano con asombro poético.',
        errorComun: 'Confundirlo con la fantasía medieval de dragones. En Macondo, lo mágico brota de la cotidianidad campesina caribeña.'
      }
    ],
    trucoMnemotecnico: {
      titulo: 'La Prueba del "COMO"',
      icono: '🗝️',
      truco: '¿Lleva "como"? SÍMIL. ¿Dice que "es" directamente? METÁFORA. ¿Exagera hasta el infinito? HIPÉRBOLE.'
    },
    errorTipico: {
      queConfunden: 'Creer que las figuras literarias solo se usan en poemas viejos.',
      comoSeHace: '¡Las usas todos los días! Cuando dices "me muero de hambre" (hipérbole) o "ese jugador es un rayo" (metáfora).',
      consejo: 'El lenguaje vivo de la calle y el campo está repleto de figuras retóricas espontáneas.'
    },
    curiosidadAsombrosa: {
      titulo: '¿De dónde salieron las mariposas amarillas de Mauricio Babilonia?',
      texto: 'García Márquez contó que en su infancia en Aracataca, vio a un electricista que llegaba a la casa acompañado por mariposas amarillas que revoloteaban a su alrededor. Ese detalle real se convirtió en el símbolo universal del amor eterno en la literatura.',
      datoCurioso: '¡El Nobel colombiano demostró que la realidad de nuestra tierra supera cualquier fantasía!'
    },
    preguntasReto: [
      {
        nivel: 'Nivel 1 • Explorador',
        pregunta: 'En el verso: "El pasto brillaba tan verde COMO una esmeralda recién pulida", ¿qué figura literaria encontramos?',
        opciones: [
          { texto: 'Símil o comparación directa (por la presencia del conector "como").', esCorrecta: true, feedback: '¡Exacto! El conector "como" define al símil.' },
          { texto: 'Metáfora pura.', esCorrecta: false, feedback: 'Si dijera "El pasto era una esmeralda" sería metáfora, pero lleva "como".' },
          { texto: 'Una oración con sujeto tácito.', esCorrecta: false, feedback: 'Estamos analizando figuras retóricas de significado.' }
        ]
      },
      {
        nivel: 'Nivel 2 • Cazador de Letras',
        pregunta: 'Si un habitante de la vereda dice con una sonrisa: "¡Llueve tanto que los peces van a tener que aprender a usar paraguas!", está utilizando:',
        opciones: [
          { texto: 'Una Hipérbole (exageración poética con humor).', esCorrecta: true, feedback: '¡Brillante! Exagera la intensidad del aguacero para divertir y asombrar.' },
          { texto: 'Un pronóstico meteorológico oficial.', esCorrecta: false, feedback: 'Es una expresión metafórica exagerada.' },
          { texto: 'Un error gramatical grave.', esCorrecta: false, feedback: 'Es un recurso retórico popular riquísimo.' }
        ]
      },
      {
        nivel: 'Nivel 3 • Maestro Sabio',
        pregunta: '¿Cuál es la esencia que distingue al Realismo Mágico latinoamericano de otros géneros de fantasía?',
        opciones: [
          { texto: 'Que lo milagroso o extraordinario se experimenta con total naturalidad como parte del mundo cotidiano.', esCorrecta: true, feedback: '¡Maestría literaria! En Macondo, lo mágico es parte de la respiración diaria de la comunidad.' },
          { texto: 'Que solo ocurren cosas científicamente explicables.', esCorrecta: false, feedback: 'Todo lo contrario: desafía las leyes mecánicas con poesía.' },
          { texto: 'Que está prohibido usar la imaginación.', esCorrecta: false, feedback: 'Es la máxima fiesta de la imaginación en castellano.' }
        ]
      }
    ],
    fichaOro: {
      reglaPrincipal: 'Las figuras retóricas transforman el lenguaje cotidiano en arte vivo a través de la comparación, la metáfora y la exageración.',
      ejemploEstrella: 'Metáfora: "Tu risa es música" | Símil: "Tan fiel como un perro" | Hipérbole: "Lloró ríos de lágrimas".',
      aplicacionVida: 'Usa metáforas en tus textos y exposiciones para que tus oyentes no solo te escuchen, sino que visualicen tus ideas.'
    }
  }
};

/**
 * Resolver temático inteligente:
 * Analiza la guía y detecta su tema pedagógico real para devolver un banco de conocimiento rico y profundo.
 */
export function getEnrichedKnowledge(guia, gradoNumero = 1) {
  const nombre = (guia.nombre || guia.titulo || '').toLowerCase();
  const contenidos = (guia.contenidos || '').toLowerCase();
  const componente = (guia.componente || '').toLowerCase();
  const esSecundaria = gradoNumero >= 6;

  // Detección temática por palabras clave
  if (
    nombre.includes('acento') ||
    nombre.includes('tilde') ||
    nombre.includes('aguda') ||
    nombre.includes('grave') ||
    nombre.includes('esdrújula') ||
    contenidos.includes('acento') ||
    contenidos.includes('tilde')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.ACENTUACION_SEGA;
  }

  if (
    nombre.includes('fábula') ||
    nombre.includes('moraleja') ||
    contenidos.includes('fábula') ||
    contenidos.includes('moraleja')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.FABULA_MORALEJA;
  }

  if (
    nombre.includes('mito') ||
    nombre.includes('leyenda') ||
    nombre.includes('origen') ||
    contenidos.includes('mito') ||
    contenidos.includes('leyenda') ||
    contenidos.includes('tradición oral')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.MITO_LEYENDA;
  }

  if (
    nombre.includes('figura') ||
    nombre.includes('metáfora') ||
    nombre.includes('poema') ||
    nombre.includes('poesía') ||
    nombre.includes('rima') ||
    nombre.includes('verso') ||
    contenidos.includes('metáfora') ||
    contenidos.includes('figuras') ||
    contenidos.includes('realismo')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.FIGURAS_LITERARIAS;
  }

  if (
    nombre.includes('oración') ||
    nombre.includes('sujeto') ||
    nombre.includes('predicado') ||
    nombre.includes('verbo') ||
    nombre.includes('sustantivo') ||
    contenidos.includes('oración') ||
    contenidos.includes('sujeto') ||
    contenidos.includes('verbo') ||
    componente.includes('sintáct')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.ORACION_SINTAXIS;
  }

  if (
    nombre.includes('cuento') ||
    nombre.includes('narrat') ||
    nombre.includes('relato') ||
    nombre.includes('narrar') ||
    contenidos.includes('cuento') ||
    contenidos.includes('narrat')
  ) {
    return BANCO_TEMATICO_PEDAGOGICO.CUENTO_ESTRUCTURA;
  }

  // Fallbacks inteligentes según el ciclo escolar
  if (esSecundaria) {
    if (gradoNumero >= 8) return BANCO_TEMATICO_PEDAGOGICO.MITO_LEYENDA;
    return BANCO_TEMATICO_PEDAGOGICO.FIGURAS_LITERARIAS;
  }

  if (gradoNumero <= 3) {
    return BANCO_TEMATICO_PEDAGOGICO.CUENTO_ESTRUCTURA;
  }

  return BANCO_TEMATICO_PEDAGOGICO.ACENTUACION_SEGA;
}
