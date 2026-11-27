import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameEffects } from '../effects/useGameEffects.js';
import { buttonMotion, levelVariants } from '../effects/motionVariants.js';
import GradeShortcut from '../components/GradeShortcut.jsx';

const worlds = [
  {
    name: 'Cuanto más aprendemos, más crecemos',
    icon: '🌳',
    intro: '¡Entre semillas, ríos y caminos descubriremos números y medidas!',
    tasks: [
      ['El misterio de la centena', '🌰', 'build', 'Forma 100 con decenas.', '10 decenas hacen una centena.', { target: 10, unit: 'decenas' }],
      ['La ruta de los números hasta 500', '🛤️', 'sequence', 'Ordena de menor a mayor.', ['807', '780', '870'], ['780', '807', '870']],
      ['La misión de las centenas', '🍊', 'choice', 'En el mercado hay 120 naranjas y llegan 130 más. ¿Cuántas hay?', 'Junta 100 + 100 y después 20 + 30.', { options: ['250', '230', '350'], answer: '250' }],
      ['El gran camino hasta 999', '🚣', 'sequence', 'Ordena las estaciones del río, de menor a mayor.', ['807', '780', '870'], ['780', '807', '870']],
      ['Exploradores de medidas', '🍃', 'measure', 'Mide la hoja con pasos de regla.', null, 5],
      ['Constructores de líneas', '✏️', 'draw', 'Dibuja un camino desde el punto verde hasta el naranja.', null, null],
      ['El vivero de centenas', '🌱', 'build', 'Construye 246 semillas con bloques de centenas, decenas y unidades.', 'Usa 2 centenas, 4 decenas y 6 unidades.', { target: [2, 4, 6], unit: 'CDU' }],
      ['Piedras del río', '🪨', 'sequence', 'Ordena las piedras de menor a mayor.', ['605', '560', '506'], ['506', '560', '605']],
      ['La cosecha compartida', '🍍', 'choice', 'En la huerta hay 235 piñas y llegan 142. ¿Cuántas hay ahora?', 'Suma 200 + 100, 30 + 40 y 5 + 2.', { options: ['377', '367', '477'], answer: '377' }],
      ['El sendero de las hojas', '🍃', 'measure', 'Mide la hoja del sendero contando marcas.', null, 5],
    ],
  },
  {
    name: 'Exploradores de números y formas',
    icon: '🏞️',
    intro: '¡Las formas y los números esconden tesoros por el sendero!',
    tasks: [
      ['El tesoro de la adición', '🧺', 'choice', 'Hay 214 semillas y encontramos 125 más. ¿Cuántas son?', 'Suma unidades, decenas y centenas por separado.', { options: ['339', '329', '439'], answer: '339' }],
      ['El desafío de las restas', '🍌', 'tap', 'Toca 3 bananos para retirarlos de la canasta de 8.', 'Toca tres bananos; quedarán cinco.', { count: 8, target: 3, emoji: '🍌' }],
      ['El mundo de los números y sus secretos', '🦋', 'choice', 'Hay 6 mariposas. ¿Se pueden formar parejas sin que sobre ninguna?', 'Forma 3 parejas de 2.', { options: ['Sí, es par', 'No, es impar'], answer: 'Sí, es par' }],
      ['Constructores de caminos', '🪵', 'choice', '¿Qué caminos nunca se cruzan?', 'Piensa en dos rieles que van juntos.', { options: ['Paralelos ║', 'Perpendiculares ⊥', 'Curvos ∿'], answer: 'Paralelos ║' }],
      ['El desafío de las secuencias', '🔺', 'pattern', '¿Qué figura sigue? 🔺 🔵 🔺 🔵 🔺 ...', 'El patrón alterna dos figuras.', { options: ['🔵', '🔺', '🟩'], answer: '🔵' }],
      ['La isla de las figuras geométricas', '🏝️', 'sort', 'Lleva cada figura a su familia.', 'Un triángulo tiene tres lados; un círculo no tiene lados.', { items: ['🔺', '🔵', '🟦', '▭'], labels: ['Triángulo', 'Círculo', 'Cuadrado', 'Rectángulo'] }],
      ['Puente de figuras', '🌉', 'sort', 'Clasifica las formas del puente.', 'Cuenta los lados de cada figura.', { items: ['🔺', '🟦', '🔵', '🔺'], labels: ['Triángulo', 'Cuadrado', 'Círculo', 'Triángulo'] }],
      ['Huellas del sendero', '🐾', 'pattern', 'Completa las huellas: 🟦 🟦 🔺 🟦 🟦 🔺 ...', 'Después de dos cuadrados viene un triángulo.', { options: ['🟦', '🔺', '🔵'], answer: '🟦' }],
      ['Canasta de guayabas', '🍈', 'tap', 'Toca 4 guayabas para sacar de una canasta de 9.', 'Si retiras cuatro de nueve, quedan cinco.', { count: 9, target: 4, emoji: '🍈' }],
      ['El tesoro del mercado', '🧺', 'choice', 'Hay 326 semillas y se usan 114. ¿Cuántas quedan?', 'Resta centenas, decenas y unidades por separado.', { options: ['212', '222', '412'], answer: '212' }],
    ],
  },
  {
    name: 'Pongamos a prueba nuestro ingenio',
    icon: '🏪',
    intro: '¡Visitemos la tienda y resolvamos misterios de grupos, tiempo y espacio!',
    tasks: [
      ['La tienda de los exploradores', '🪙', 'choice', 'Un jugo cuesta $2.000. Tienes dos monedas de $1.000. ¿Alcanza?', 'Suma 1.000 + 1.000.', { options: ['Sí, justo', 'Falta $1.000', 'Sobra $1.000'], answer: 'Sí, justo' }],
      ['Los grupos misteriosos', '🥭', 'group', 'Forma 3 grupos de 2 mangos.', 'Tres grupos de dos son 2 + 2 + 2.', { groups: 3, each: 2, emoji: '🥭' }],
      ['La gran aventura de agrupar', '🌼', 'group', 'Hay 4 macetas con 3 flores cada una. ¿Cuántas flores hay?', 'Suma 3 + 3 + 3 + 3.', { groups: 4, each: 3, emoji: '🌼' }],
      ['El camino de las direcciones', '🧭', 'move', 'Guía a Luna hasta la escuela 🏫.', 'Desde la esquina, camina dos pasos a la derecha y uno abajo.', { target: [2, 1] }],
      ['El mundo de las superficies y los patrones', '🟨', 'cover', 'Cubre el jardín con sus 6 cuadritos.', 'Toca los seis espacios vacíos.', { target: 6 }],
      ['La aventura contra el reloj', '🕒', 'choice', 'La manecilla corta señala el 3 y la larga el 12. ¿Qué hora es?', 'Cuando la larga está en el 12, es una hora en punto.', { options: ['3:00', '12:15', '6:30'], answer: '3:00' }],
      ['Exploradores de cuerpos geométricos', '🎲', 'sort', 'Clasifica los objetos: ¿ruedan o tienen caras planas?', 'Una pelota rueda; una caja tiene caras planas.', { items: ['⚽', '🎲', '🥫', '📦'], labels: ['Rueda', 'Caras planas', 'Rueda', 'Caras planas'] }],
      ['Mangos para la feria', '🥭', 'group', 'Llena 4 canastas con 2 mangos cada una.', 'Toca cada canasta dos veces.', { groups: 4, each: 2, emoji: '🥭' }],
      ['La ruta de Luna', '🧭', 'move', 'Lleva a Luna hasta la escuela siguiendo el camino.', 'Avanza dos casillas a la derecha y una hacia abajo.', { target: [2, 1] }],
      ['Mosaico de la escuela', '🟨', 'cover', 'Cubre el jardín con 6 baldosas cuadradas.', 'Toca cada espacio vacío una vez.', { target: 6 }],
      ['Objetos de la tienda', '🛍️', 'sort', 'Agrupa lo que rueda y lo que tiene caras planas.', 'Las latas ruedan; las cajas tienen caras planas.', { items: ['🥫', '📦', '⚽', '🎲'], labels: ['Rueda', 'Caras planas', 'Rueda', 'Caras planas'] }],
    ],
  },
  {
    name: 'Aventuras para compartir y descubrir',
    icon: '🏡',
    intro: '¡Ayudemos a la comunidad a repartir, observar y organizar!',
    tasks: [
      ['Exploradores del clima y las medidas', '🌡️', 'choice', 'Un termómetro marca 28 °C y otro 22 °C. ¿Cuál indica más calor?', ['28 °C', '22 °C', 'Son iguales'], '28 °C'],
      ['La misión de compartir', '🍈', 'share', 'Reparte 6 frutas entre 2 amigos por igual.', 'Dale una fruta a cada amigo por turnos.', { count: 6, groups: 2, emoji: '🍈' }],
      ['El gran desafío del reparto equitativo', '🌰', 'share', 'Reparte 8 semillas entre 4 amigos por igual.', 'Cada amigo debe recibir la misma cantidad.', { count: 8, groups: 4, emoji: '🌰' }],
      ['Detectives de pictogramas', '🍎', 'pictogram', 'Crea el pictograma: 3 manzanas y 2 mangos.', 'Toca las imágenes hasta completar cada fila.', { targets: [3, 2] }],
      ['El misterio de la información', '📊', 'choice', 'En el pictograma hay 🍎🍎🍎🍎 y 🥭🥭. ¿Cuál hay más?', 'Compara las cantidades de cada fila.', { options: ['Manzanas', 'Mangos', 'La misma cantidad'], answer: 'Manzanas' }],
      ['La aventura de los recipientes', '🫙', 'choice', 'Una jarra llena 4 vasos; una taza llena 1. ¿Cuál tiene mayor capacidad?', 'Compara cuántos vasos llena cada recipiente.', { options: ['La jarra', 'La taza', 'Son iguales'], answer: 'La jarra' }],
      ['La mesa de la comunidad', '🍊', 'share', 'Reparte 12 naranjas entre 3 vecinos por igual.', 'Da una a cada vecino por turnos.', { count: 12, groups: 3, emoji: '🍊' }],
      ['Frutas del mercado', '📊', 'pictogram', 'Construye el pictograma de 3 manzanas y 2 mangos.', 'Cada dibujo vale una fruta.', { targets: [3, 2] }],
      ['El termómetro del jardín', '🌡️', 'choice', 'En la mañana hay 19 °C y al mediodía 27 °C. ¿Cuándo hace más calor?', 'El número mayor indica más temperatura.', { options: ['Al mediodía', 'En la mañana', 'Hace igual calor'], answer: 'Al mediodía' }],
      ['Vasos para la visita', '🥛', 'choice', 'Una jarra llena 6 vasos y otra llena 3. ¿Cuál tiene más capacidad?', 'Cuenta los vasos que llena cada jarra.', { options: ['La de 6 vasos', 'La de 3 vasos', 'Son iguales'], answer: 'La de 6 vasos' }],
    ],
  },
];

const finalMissions = [
  ['🌰', '¿Cuántas decenas forman 100?', ['10', '5', '100'], '10'],
  ['🚣', 'Ordena de menor a mayor: 412, 241, 124.', ['412', '241', '124'], ['124', '241', '412']],
  ['🍃', '¿Qué usarías para medir una mesa?', ['Una regla', 'Un reloj', 'Una moneda'], 'Una regla'],
];

export default function GradeTwoAdventurePage() {
  const [screen, setScreen] = useState('welcome');
  const [worldIndex, setWorldIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());
  const [badges, setBadges] = useState(() => new Set());
  const [choice, setChoice] = useState('');
  const [sequence, setSequence] = useState([]);
  const [measure, setMeasure] = useState(0);
  const [tapped, setTapped] = useState([]);
  const [drawn, setDrawn] = useState(false);
  const [covered, setCovered] = useState([]);
  const [buildValues, setBuildValues] = useState([0, 0, 0]);
  const [groups, setGroups] = useState([]);
  const [movePosition, setMovePosition] = useState([0, 0]);
  const [sortValues, setSortValues] = useState([]);
  const [pictogram, setPictogram] = useState([0, 0]);
  const [feedback, setFeedback] = useState('');
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const drawingStartRef = useRef(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastInstruction, setLastInstruction] = useState('¡Hola! Soy Luna. ¡Vamos a descubrir las matemáticas!');
  const { playSelection, playError, celebrate } = useGameEffects();

  const world = worlds[worldIndex];
  const task = taskIndex < 0 ? finalMissions[missionIndex] : world.tasks[taskIndex];
  const isFinal = taskIndex < 0;
  const progress = useMemo(() => world.tasks.filter((_, index) => completed.has(`${worldIndex}-${index}`)).length, [completed, world.tasks, worldIndex]);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  function speak(text) {
    setLastInstruction(text);
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO';
    utterance.rate = 0.9;
    utterance.pitch = 1.08;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === 'es-co')
      || voices.find((voice) => voice.lang.toLowerCase().startsWith('es'))
      || null;
    window.speechSynthesis.speak(utterance);
  }

  function playSound(frequency = 690) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!soundEnabled || !AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  }

  function toggleVoice() {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (!next && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else if (next) {
      speak(lastInstruction);
    }
  }

  function startTask(index) {
    if (index < 0) setMissionIndex(0);
    setTaskIndex(index);
    setChoice('');
    setSequence([]);
    setMeasure(0);
    setTapped([]);
    setDrawn(false);
    drawingStartRef.current = null;
    setCovered([]);
    setBuildValues([0, 0, 0]);
    setGroups([]);
    setMovePosition([0, 0]);
    setSortValues([]);
    setPictogram([0, 0]);
    setFeedback('');
    setScreen('task');
    playSound();
    speak(index < 0 ? '¡Gran misión final! Resuelve los tres desafíos.' : world.tasks[index][3]);
  }

  function checkAnswer() {
    const data = isFinal ? { options: task[2], answer: task[3] } : task[5];
    const type = isFinal ? (missionIndex === 1 ? 'sequence' : 'choice') : task[2];
    let correct;

    if (type === 'draw') {
      correct = drawn;
    } else if (type === 'group' || type === 'share') {
      const expectedCount = type === 'group' ? data.each : data.count / data.groups;
      correct = groups.length === data.groups && groups.every((count) => count === expectedCount);
    } else {
      const answer = type === 'sort'
        ? data.labels
        : type === 'measure'
          ? data
          : type === 'pictogram'
            ? data.targets
            : data.answer ?? data.target ?? data;
      const value = type === 'build'
        ? data.unit === 'CDU' ? buildValues : buildValues[0]
        : type === 'sequence' ? sequence
          : type === 'sort' ? sortValues
            : type === 'measure' ? measure
              : type === 'tap' ? tapped.length
                : type === 'move' ? movePosition
                  : type === 'cover' ? covered.length
                    : type === 'pictogram' ? pictogram
                      : type === 'choice' ? choice
                        : choice;
      correct = JSON.stringify(value) === JSON.stringify(answer);
    }

    if (!correct) {
      setFeedback('💡 Revisa la pista y prueba otra vez.');
      playError();
      playSound(420);
      return;
    }
    setFeedback('¡Muy bien! ¡Lo lograste!');
    celebrate();
    playSound(880);
    speak('¡Excelente trabajo! Lo lograste. ¡Sigamos explorando!');
    if (!isFinal) setCompleted((previous) => new Set(previous).add(`${worldIndex}-${taskIndex}`));
  }

  function drawPreset(kind) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#228c70';
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(25, 90);
    if (kind === 'curva') context.quadraticCurveTo(210, 10, 405, 90);
    else context.lineTo(405, 90);
    context.stroke();
    setDrawn(true);
    drawingStartRef.current = null;
    playSound();
  }

  function clearDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    setDrawn(false);
    drawingStartRef.current = null;
  }

  function getCanvasPosition(event) {
    const canvas = canvasRef.current;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * canvas.width / bounds.width,
      y: (event.clientY - bounds.top) * canvas.height / bounds.height,
    };
  }

  function startDrawing(event) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const position = getCanvasPosition(event);
    drawingRef.current = true;
    drawingStartRef.current = position;
    setDrawn(false);
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.setPointerCapture(event.pointerId);
    context.strokeStyle = '#228c70';
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(position.x, position.y);
  }

  function continueDrawing(event) {
    if (!drawingRef.current) return;
    const context = canvasRef.current.getContext('2d');
    const position = getCanvasPosition(event);
    context.lineTo(position.x, position.y);
    context.stroke();
    setDrawn(true);
  }

  function finishDrawing(event) {
    if (!drawingRef.current) return;
    drawingRef.current = false;

    const start = drawingStartRef.current;
    drawingStartRef.current = null;
    const end = getCanvasPosition(event);
    const startPoint = { x: 25, y: 90 };
    const endPoint = { x: 405, y: 90 };
    const isNear = (point, target) => Math.hypot(point.x - target.x, point.y - target.y) <= 40;
    const connectsEndpoints = start && (
      (isNear(start, startPoint) && isNear(end, endPoint))
      || (isNear(start, endPoint) && isNear(end, startPoint))
    );

    setDrawn(Boolean(connectsEndpoints));
    if (!connectsEndpoints) setFeedback('Conecta el camino desde el punto verde hasta el naranja.');
  }

  function next() {
    if (isFinal && missionIndex < finalMissions.length - 1) {
      setMissionIndex((value) => value + 1);
      setChoice('');
      setFeedback('');
      speak(`Vamos con el desafío ${missionIndex + 2}.`);
      return;
    }
    if (isFinal) {
      setBadges((previous) => new Set(previous).add(worldIndex));
      setScreen('world');
      return;
    }
    setScreen('world');
  }

  return (
    <motion.main className="grade-two-adventure" variants={levelVariants} initial="initial" animate="animate">
      <header className="grade-two-topbar">
        <GradeShortcut className="grade-two-secondary" />
        <div className="grade-two-audio-controls">
          <button type="button" className="grade-two-secondary" onClick={() => speak(lastInstruction)} aria-label="Repetir instrucción">🔁 Repetir</button>
          <button type="button" className="grade-two-secondary" onClick={toggleVoice} aria-pressed={voiceEnabled}>{voiceEnabled ? '🔊 Voz' : '🔇 Voz'}</button>
          <button type="button" className="grade-two-secondary" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-pressed={soundEnabled}>{soundEnabled ? '🎵 Efectos' : '🔕 Efectos'}</button>
        </div>
      </header>

      {screen === 'welcome' && (
        <section className="grade-two-hero">
          <div>
            <span className="grade-two-eyebrow">Matemáticas · Grado segundo</span>
            <h1>¡Aventuras matemáticas en el Putumayo!</h1>
            <p>Explora, toca, construye y descubre cuatro mundos con Luna.</p>
            <button type="button" className="grade-two-primary" onClick={() => { setScreen('map'); playSound(); speak('Escoge un mundo para explorar.'); }}>¡Comenzar aventura! →</button>
          </div>
          <div className="grade-two-guide" aria-hidden="true">🌳 👧🏽🎒 🌴</div>
        </section>
      )}

      {screen === 'map' && (
        <section>
          <p className="grade-two-kicker">Mapa de aventuras</p>
          <h1>¿A dónde vamos hoy?</h1>
          <p>¡Elige un mundo! Puedes visitarlos en el orden que quieras.</p>
          <div className="grade-two-worlds">
            {worlds.map((item, index) => (
              <button type="button" className="grade-two-world-card" key={item.name} onClick={() => { setWorldIndex(index); setScreen('world'); }}>
                <span>{item.icon}</span><strong>Mundo {index + 1}<br />{item.name}</strong>
                <small>{worlds[index].tasks.filter((_, taskNumber) => completed.has(`${index}-${taskNumber}`)).length}/{item.tasks.length} retos completados</small>
              </button>
            ))}
          </div>
        </section>
      )}

      {screen === 'world' && (
        <section>
          <button type="button" className="grade-two-secondary" onClick={() => setScreen('map')}>← Mapa general</button>
          <p className="grade-two-kicker">Mundo {worldIndex + 1} {world.icon}</p>
          <h1>{world.name}</h1>
          <p>{world.intro}</p>
          <div className="grade-two-progress" aria-label={`Progreso: ${progress} de ${world.tasks.length}`}><span style={{ width: `${(progress / world.tasks.length) * 100}%` }} /></div>
          <div className="grade-two-trail">
            {world.tasks.map((item, index) => (
              <button type="button" className="grade-two-task-card" key={item[0]} onClick={() => startTask(index)}>
                <span>{completed.has(`${worldIndex}-${index}`) ? '✓' : item[1]}</span><strong>{item[0]}</strong><small>{completed.has(`${worldIndex}-${index}`) ? '¡Completado!' : 'Jugar →'}</small>
              </button>
            ))}
            <button type="button" className="grade-two-task-card grade-two-final" onClick={() => startTask(-1)}>
              <span>🏆</span><strong>Gran misión final</strong><small>{badges.has(worldIndex) ? '🏅 Insignia conseguida' : '3 desafíos cortos →'}</small>
            </button>
          </div>
        </section>
      )}

      {screen === 'task' && (
        <section className="grade-two-play">
          <button type="button" className="grade-two-secondary" onClick={() => setScreen('world')}>← Sendero del mundo</button>
          <p className="grade-two-kicker">{isFinal ? `Gran misión final · ${missionIndex + 1} / 3` : `Mundo ${worldIndex + 1} · Reto ${taskIndex + 1} / ${world.tasks.length}`}</p>
          <article className="grade-two-play-card">
            <h2><span>{isFinal ? task[0] : task[1]}</span> {isFinal ? task[1] : task[0]}</h2>
            <p className="grade-two-instructions">{isFinal ? task[1] : task[3]}</p>
            {((isFinal && missionIndex !== 1) || (!isFinal && ['choice', 'pattern'].includes(task[2]))) && (
              <div className="grade-two-options">
                {(isFinal ? task[2] : task[5].options).map((option) => (
                  <motion.button {...buttonMotion} type="button" className={choice === option ? 'selected' : ''} key={option} onClick={() => { playSelection(); setChoice(option); }}>{option}</motion.button>
                ))}
              </div>
            )}
            {isFinal && missionIndex === 1 && (
              <div className="grade-two-options">{task[2].map((option) =>               <motion.button {...buttonMotion} type="button" className={sequence.includes(option) ? 'selected' : ''} disabled={sequence.includes(option)} key={option} onClick={() => { playSelection(); setSequence((items) => [...items, option]); }}>{option}</motion.button>)}</div>
            )}
            {!isFinal && task[2] === 'build' && (
              <div className="grade-two-build">
                <p>{task[5].unit === 'CDU' ? '🟦 Centenas · 🟩 Decenas · 🟨 Unidades' : '🌰 Cada barra representa 10 semillas'}</p>
                {(task[5].unit === 'CDU' ? ['Centenas', 'Decenas', 'Unidades'] : ['Decenas']).map((label, index) => (
                  <div key={label}><strong>{label}: {buildValues[task[5].unit === 'CDU' ? index : 0]}</strong>
                    <button type="button" className="grade-two-secondary" onClick={() => setBuildValues((values) => values.map((value, i) => i === (task[5].unit === 'CDU' ? index : 0) ? Math.max(0, value - 1) : value))}>−</button>
                    <button type="button" className="grade-two-primary" onClick={() => setBuildValues((values) => values.map((value, i) => i === (task[5].unit === 'CDU' ? index : 0) ? Math.min(10, value + 1) : value))}>+</button>
                  </div>
                ))}
                <p>Número construido: {task[5].unit === 'CDU' ? buildValues.join('') : buildValues[0] * 10}</p>
              </div>
            )}
            {!isFinal && task[2] === 'sequence' && (
              <>
                <p>Selecciona los números en orden:</p>
                <div className="grade-two-options">{task[4].map((option) => <button type="button" className={sequence.includes(option) ? 'selected' : ''} disabled={sequence.includes(option)} key={option} onClick={() => setSequence((items) => [...items, option])}>{option}</button>)}</div>
                <p>Orden: {sequence.join(' → ') || '...'}</p><button type="button" className="grade-two-secondary" onClick={() => setSequence([])}>Reiniciar orden</button>
              </>
            )}
            {!isFinal && task[2] === 'sort' && (
              <div className="grade-two-options">{task[5].items.map((item, index) => (
              <label key={`${item}-${index}`}>{item}<select value={sortValues[index] || ''} onChange={(event) => setSortValues((values) => { const next = [...values]; next[index] = event.target.value; return next; })}>
                  <option value="">Elegir…</option>{[...new Set(task[5].labels)].map((label) => <option key={label}>{label}</option>)}
                </select></label>
              ))}</div>
            )}
            {!isFinal && task[2] === 'measure' && (
              <div className="grade-two-measure"><span>{measure} marcas</span><button type="button" onClick={() => setMeasure((value) => Math.max(0, value - 1))}>−</button><button type="button" onClick={() => setMeasure((value) => Math.min(10, value + 1))}>+</button></div>
            )}
            {!isFinal && task[2] === 'tap' && (
              <div className="grade-two-options">
                {Array.from({ length: task[5].count }, (_, index) => (
                  <button type="button" className={tapped.includes(index) ? 'selected' : ''} key={index} onClick={() => setTapped((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])}>{task[5].emoji}</button>
                ))}
              </div>
            )}
            {!isFinal && task[2] === 'group' && (
              <div className="grade-two-options">{(groups.length ? groups : Array(task[5].groups).fill(0)).map((count, index) => <button type="button" className="grade-two-basket" key={index} onClick={() => setGroups((values) => { const next = values.length ? [...values] : Array(task[5].groups).fill(0); if (next.reduce((sum, item) => sum + item, 0) < task[5].groups * task[5].each) next[index] += 1; return next; })}>{task[5].emoji.repeat(count) || '🧺'}<small>{count}</small></button>)}</div>
            )}
            {!isFinal && task[2] === 'share' && (
              <div className="grade-two-options">{(groups.length ? groups : Array(task[5].groups).fill(0)).map((count, index) => <button type="button" className="grade-two-basket" key={index} onClick={() => setGroups((values) => { const next = values.length ? [...values] : Array(task[5].groups).fill(0); if (next.reduce((sum, item) => sum + item, 0) < task[5].count) next[index] += 1; return next; })}>👧🏽 {index + 1}<br />{task[5].emoji.repeat(count) || '🧺'}<small>{count}</small></button>)}</div>
            )}
            {!isFinal && task[2] === 'cover' && (
              <div className="grade-two-options" aria-label="Baldosas del jardín">
                {Array.from({ length: task[5].target }, (_, index) => (
                  <button type="button" className={covered.includes(index) ? 'selected' : ''} key={index} onClick={() => setCovered((value) => value.includes(index) ? value.filter((item) => item !== index) : [...value, index] )}>🟨</button>
                ))}
                <p>Has cubierto {covered.length} baldosas.</p>
              </div>
            )}
            {!isFinal && task[2] === 'move' && (
              <div className="grade-two-move">
                <p>Lleva a Luna hasta 🏫</p>
                <div className="grade-two-grid">{Array.from({ length: 12 }, (_, index) => <span key={index}>{movePosition[0] === index % 4 && movePosition[1] === Math.floor(index / 4) ? '👧🏽' : index === 6 ? '🏫' : '·'}</span>)}</div>
                <div className="grade-two-options">
                  <button type="button" onClick={() => setMovePosition(([x, y]) => [Math.max(0, x - 1), y])}>←</button>
                  <button type="button" onClick={() => setMovePosition(([x, y]) => [x, Math.max(0, y - 1)])}>↑</button>
                  <button type="button" onClick={() => setMovePosition(([x, y]) => [x, Math.min(2, y + 1)])}>↓</button>
                  <button type="button" onClick={() => setMovePosition(([x, y]) => [Math.min(3, x + 1), y])}>→</button>
                </div>
              </div>
            )}
            {!isFinal && task[2] === 'pictogram' && (
              <div className="grade-two-pictogram">{['🍎', '🥭'].map((emoji, index) => <div className="grade-two-options" key={emoji}><strong>{emoji}</strong><button type="button" onClick={() => setPictogram((values) => values.map((value, i) => i === index ? Math.max(0, value - 1) : value))}>−</button><span>{emoji.repeat(pictogram[index]) || '·'}</span><button type="button" onClick={() => setPictogram((values) => values.map((value, i) => i === index ? Math.min(6, value + 1) : value))}>+</button></div>)}</div>
            )}
            {!isFinal && task[2] === 'draw' && (
              <div className="grade-two-drawing">
                <p>🟢 Inicio &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🟠 Llegada</p>
                <canvas
                  ref={canvasRef}
                  className="grade-two-drawpad"
                  width="430"
                  height="180"
                  aria-label="Área para dibujar el camino"
                  onPointerDown={startDrawing}
                  onPointerMove={continueDrawing}
                  onPointerUp={finishDrawing}
                  onPointerCancel={() => { drawingRef.current = false; drawingStartRef.current = null; setDrawn(false); }}
                />
                <div className="grade-two-options">
                  <button type="button" onClick={() => drawPreset('recta')}>Trazar recta</button>
                  <button type="button" onClick={() => drawPreset('curva')}>Trazar curva</button>
                  <button type="button" onClick={clearDrawing}>Borrar</button>
                </div>
              </div>
            )}
            <div className="grade-two-controls">
              <button type="button" className="grade-two-secondary" onClick={() => { setFeedback('💡 Piensa paso a paso y vuelve a intentarlo.'); speak('Piensa paso a paso y vuelve a intentarlo.'); }}>💡 Pista</button>
              <button type="button" className="grade-two-primary" onClick={checkAnswer}>Comprobar ✓</button>
            </div>
            <p className="grade-two-feedback" role="status">{feedback}</p>
            {feedback.startsWith('¡Muy bien') && <button type="button" className="grade-two-primary" onClick={next}>{isFinal && missionIndex < 2 ? 'Siguiente desafío →' : isFinal ? 'Ver mi insignia 🏅' : 'Volver al sendero →'}</button>}
          </article>
        </section>
      )}
    </motion.main>
  );
}
