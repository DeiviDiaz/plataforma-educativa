import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const missions = [
  {
    title: 'Descubramos la centena', icon: '🌱',
    tasks: [
      { type: 'choice', prompt: 'Una semilla es…', visual: '🌱', options: ['1 unidad', '1 decena', '1 centena'], answer: '1 unidad', hint: 'Busca el grupo más pequeño.' },
      { type: 'choice', prompt: '¿Cuántas semillas forman una decena?', visual: '🌰 × 10', options: ['5', '10', '100'], answer: '10', hint: 'Cuenta dos manos llenas.' },
      { type: 'build', prompt: 'Agrupa 10 semillas.', target: [0, 1, 0], hint: 'Diez unidades forman una decena.' },
      { type: 'choice', prompt: '¿Cuántas decenas forman una centena?', visual: '📦 × 10', options: ['1', '10', '100'], answer: '10', hint: 'Cuenta las diez cajitas.' },
      { type: 'build', prompt: 'Construye una centena.', target: [1, 0, 0], hint: 'Una centena es un bloque grande.' },
      { type: 'choice', prompt: 'Mira los bloques. ¿Qué número ves?', visual: '🟩 🟨🟨 🟥🟥🟥', options: ['123', '132', '213'], answer: '123', hint: 'Verde: centenas; amarillo: decenas; coral: unidades.' },
      { type: 'choice', prompt: 'Lleva la equivalencia al puente: 10 decenas ➜ ?', visual: '10 decenas ➜ ?', options: ['1 unidad', '1 decena', '1 centena'], answer: '1 centena', hint: 'Diez decenas se convierten en una centena.' },
    ],
  },
  {
    title: 'Conozcamos los números hasta 999', icon: '🔢',
    tasks: [
      { type: 'choice', prompt: '¿Qué número muestran los bloques?', visual: '🟩🟩 🟨🟨🟨🟨 🟥', options: ['241', '214', '421'], answer: '241', hint: 'Lee centenas, decenas y unidades.' },
      { type: 'build', prompt: 'Construye 352.', target: [3, 5, 2], hint: 'Pon 3 centenas, 5 decenas y 2 unidades.' },
      { type: 'choice', prompt: 'Elige el número de las frutas.', visual: '🍍 4 centenas · 2 decenas · 6 unidades', options: ['462', '426', '264'], answer: '426', hint: 'Sigue el orden: centenas, decenas y unidades.' },
      { type: 'choice', prompt: 'Lleva el número al puesto.', visual: '6 centenas · 0 decenas · 8 unidades', options: ['680', '608', '860'], answer: '608', hint: 'El cero ocupa el lugar de las decenas.' },
      { type: 'choice', prompt: '¿Cuántas centenas tiene 789?', visual: '🟩 789', options: ['7', '8', '9'], answer: '7', hint: 'Mira la primera cifra.' },
      { type: 'build', prompt: 'Representa 904.', target: [9, 0, 4], hint: 'No hay barras amarillas en este número.' },
      { type: 'choice', prompt: '¿Cómo se lee 215?', visual: '🔢 215', options: ['Doscientos quince', 'Doscientos cincuenta', 'Ciento veinticinco'], answer: 'Doscientos quince', hint: 'Primero lee el 2 de las centenas.' },
    ],
  },
  {
    title: 'Juguemos con las secuencias numéricas', icon: '🌉',
    tasks: [
      { type: 'choice', prompt: 'Completa el puente: 101 · 102 · ? · 104', visual: '101 · 102 · ? · 104', options: ['103', '105', '113'], answer: '103', hint: 'Avanza de uno en uno.' },
      { type: 'order', prompt: 'Ordena las piedras de menor a mayor.', numbers: [302, 300, 301], ascending: true, hint: 'Empieza por el número más pequeño.' },
      { type: 'choice', prompt: '¿Qué número va antes de 450?', visual: '← 450', options: ['449', '451', '440'], answer: '449', hint: 'Retrocede un paso.' },
      { type: 'choice', prompt: 'Salta de diez en diez: 210 · 220 · ? · 240', visual: '210 · 220 · ? · 240', options: ['230', '225', '250'], answer: '230', hint: 'Cada salto agrega una decena.' },
      { type: 'order', prompt: 'Cruza el río en orden, de menor a mayor.', numbers: [590, 570, 580], ascending: true, hint: 'Los saltos son de diez.' },
      { type: 'choice', prompt: 'Sigue las centenas: 300 · 400 · ? · 600', visual: '300 · 400 · ? · 600', options: ['500', '450', '700'], answer: '500', hint: 'Agrega una centena cada vez.' },
      { type: 'choice', prompt: '¿Qué número sigue después de 698?', visual: '698 ➜ ?', options: ['699', '700', '697'], answer: '699', hint: 'Avanza solamente una unidad.' },
    ],
  },
  {
    title: 'Aprendamos a sumar con centenas', icon: '🍍',
    tasks: [
      { type: 'choice', prompt: 'Junta los canastos: 100 + 200.', visual: '🍍 100 + 🍍 200', options: ['300', '200', '400'], answer: '300', hint: 'Junta una centena con dos centenas.' },
      { type: 'build', prompt: 'Construye el resultado: 120 + 30.', target: [1, 5, 0], hint: 'Se juntan las decenas: 2 más 3.' },
      { type: 'choice', prompt: '¿Cuántas frutas hay en total? 210 + 120.', visual: '🥭 210 + 🥭 120', options: ['330', '320', '430'], answer: '330', hint: 'Suma centenas con centenas y decenas con decenas.' },
      { type: 'choice', prompt: 'Lleva la suma correcta al río: 300 + 400.', visual: '300 + 400 = ?', options: ['500', '700', '800'], answer: '700', hint: 'Tres centenas y cuatro centenas.' },
      { type: 'choice', prompt: 'Agrega las unidades: 234 + 5.', visual: '🪺 234 + 5', options: ['239', '284', '235'], answer: '239', hint: 'Solo cambian las unidades.' },
      { type: 'build', prompt: 'Construye 420 + 130.', target: [5, 5, 0], hint: 'Suma 4 + 1 centenas y 2 + 3 decenas.' },
      { type: 'choice', prompt: 'En la tienda: 105 + 202.', visual: '🏪 🍌 + 🍍', options: ['307', '303', '317'], answer: '307', hint: 'Reúne centenas y luego unidades.' },
    ],
  },
  {
    title: 'Aprendamos a restar con centenas', icon: '🛶',
    tasks: [
      { type: 'choice', prompt: 'Se fueron dos canastos: 500 − 200.', visual: '🍌 500 − 🍌 200', options: ['300', '200', '700'], answer: '300', hint: 'Quita dos centenas de cinco.' },
      { type: 'build', prompt: '¿Qué queda? 460 − 20.', target: [4, 4, 0], hint: 'Quita dos barras de decena.' },
      { type: 'choice', prompt: 'Restamos las unidades: 238 − 5.', visual: '🐠 238 − 5', options: ['233', '232', '243'], answer: '233', hint: 'Quita cinco unidades.' },
      { type: 'choice', prompt: 'Lleva el resultado a la canoa: 900 − 400.', visual: '900 − 400 = ?', options: ['400', '500', '600'], answer: '500', hint: 'Nueve centenas menos cuatro centenas.' },
      { type: 'choice', prompt: 'Frutas que quedan: 365 − 120.', visual: '🥭 365 − 120', options: ['245', '255', '485'], answer: '245', hint: 'Quita una centena y dos decenas.' },
      { type: 'build', prompt: 'Construye 784 − 302.', target: [4, 8, 2], hint: 'Quita 3 centenas y 2 unidades.' },
      { type: 'choice', prompt: '¿Cuántos peces quedan? 670 − 50.', visual: '🐟 670 − 50', options: ['620', '630', '720'], answer: '620', hint: 'Quita cinco decenas.' },
    ],
  },
  {
    title: 'Resolvamos situaciones matemáticas', icon: '🏡',
    tasks: [
      { type: 'choice', prompt: 'Cosecha de piñas: 200 y 100 más.', visual: '🍍🍍 + 🍍', options: ['300', '200', '400'], answer: '300', hint: 'Reúne las dos cosechas.' },
      { type: 'build', prompt: 'En la tienda hay 243 frutas.', visual: '🏪 🍌🥭🍍', target: [2, 4, 3], hint: 'Representa centenas, decenas y unidades.' },
      { type: 'order', prompt: 'Ordena los canastos, del menor al mayor.', numbers: [405, 450, 400], ascending: true, hint: 'Compara primero las centenas y luego las decenas.' },
      { type: 'choice', prompt: 'Relaciona la cosecha con su número.', visual: '🍌 3 centenas · 1 decena · 2 unidades', options: ['321', '312', '132'], answer: '312', hint: 'Mira primero las centenas, después las decenas.' },
      { type: 'choice', prompt: 'Había 450 peces; nadaron 200.', visual: '🐟 − 🐟', options: ['250', '650', '350'], answer: '250', hint: 'Quita dos centenas.' },
      { type: 'choice', prompt: 'Continúa el sendero: 620 · 630 · ? · 650.', visual: '620 · 630 · ? · 650', options: ['640', '635', '660'], answer: '640', hint: 'Avanza una decena cada vez.' },
      { type: 'choice', prompt: 'La tienda tenía 120 mangos y recibió 210.', visual: '🏪 🥭 + 🥭', options: ['330', '310', '430'], answer: '330', hint: 'Junta las dos cantidades.' },
    ],
  },
];

function speak(text, muted, volume) {
  if (muted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CO'; utterance.rate = 0.88; utterance.pitch = 1.07; utterance.volume = volume;
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase() === 'es-co')
    ?? window.speechSynthesis.getVoices().find((item) => /^es[-_]/i.test(item.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function BlockBuilder({ task, onDone }) {
  const [counts, setCounts] = useState([0, 0, 0]);
  const labels = ['Centenas', 'Decenas', 'Unidades'];
  const valid = counts.every((value, index) => value === task.target[index]);
  return <><div className="first-grade-items">{labels.map((label, index) => <div className="counter-cell" key={label}><strong>{label}</strong><div className="first-grade-number">{counts[index]}</div><button className="game-secondary-button" type="button" onClick={() => setCounts((current) => current.map((value, item) => item === index ? Math.max(0, value - 1) : value))}>−</button><button className="game-secondary-button" type="button" onClick={() => setCounts((current) => current.map((value, item) => item === index ? Math.min(9, value + 1) : value))}>+</button></div>)}</div><div className="first-grade-sequence"><span>{counts[0]} centenas · {counts[1]} decenas · {counts[2]} unidades</span></div>{valid && <button className="game-primary-button" type="button" onClick={onDone}>✓ Continuar</button>}</>;
}

function Task({ task, onDone }) {
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState([]);
  const expected = task.type === 'order' ? [...task.numbers].sort((a, b) => task.ascending ? a - b : b - a) : [];
  if (task.type === 'build') return <BlockBuilder task={task} onDone={onDone} />;
  if (task.type === 'order') return <><div className="first-grade-sequence"><span>{order.join(' → ') || '① → ② → ③'}</span></div><div className="first-grade-options">{task.numbers.map((number) => <button className="token" type="button" key={number} disabled={order.includes(number)} onClick={() => { if (number !== expected[order.length]) setMessage('Busca el número que va ahora.'); else if (order.length + 1 === expected.length) onDone(); else setOrder([...order, number]); }}>{number}</button>)}</div><p className="game-feedback">{message}</p></>;
  return <><div className="first-grade-sequence"><span>{task.visual}</span></div><div className="first-grade-options">{task.options.map((option) => <button className="token" type="button" key={option} onClick={() => option === task.answer ? onDone() : setMessage(task.hint)}>{option}</button>)}</div><p className="game-feedback">{message}</p></>;
}

export default function FirstGradeThirdPeriodGame() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('map');
  const [missionIndex, setMissionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const mission = missions[missionIndex];
  const task = mission.tasks[step];
  const line = screen === 'map' ? 'Elige un sendero del tercer periodo.' : screen === 'win' ? 'Aventura superada. Ganaste siete estrellas.' : task.prompt;
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => { speak(line, muted, volume); }, [line, muted, volume]);
  const progress = useMemo(() => screen === 'map' ? 0 : screen === 'win' ? 100 : Math.round((step / mission.tasks.length) * 100), [screen, step, mission.tasks.length]);
  const start = (index) => { setMissionIndex(index); setStep(0); setScreen('play'); };
  const done = () => { if (step < mission.tasks.length - 1) setStep(step + 1); else { setCompleted((items) => [...new Set([...items, missionIndex])]); setScreen('win'); } };
  return <main className="first-grade-game">
    <header className="first-grade-header"><button className="back-link" type="button" onClick={() => navigate('/matematicas/grado/1')}><ArrowLeft size={18} /> Volver al periodo</button><span>⭐ {completed.length * 7} / 42</span><button className="voice-button" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Activar voz' : 'Silenciar voz'}>{muted ? <VolumeX /> : <Volume2 />}</button></header>
    <div className="first-grade-audio"><button type="button" onClick={() => speak(line, muted, volume)}>▶ Escuchar / repetir</button><label htmlFor="third-period-volume">Volumen</label><input id="third-period-volume" type="range" min="0" max="100" value={volume * 100} onChange={(event) => setVolume(Number(event.target.value) / 100)} /></div>
    {screen === 'map' && <><div className="page-heading"><p className="page-eyebrow">MATEMÁTICAS · PRIMER GRADO · PERIODO 3</p><h1>¡Exploremos y descubramos las centenas!</h1><p>Elige un sendero y comienza la aventura 🗺️</p></div><section className="mission-grid">{missions.map((item, index) => <button className="mission-card first-grade-adventure" type="button" key={item.title} onClick={() => start(index)}><span className="mission-card__icon">{item.icon}</span><span className="mission-card__number">AVENTURA {index + 1}</span><h2>{item.title}</h2><span className="period-status">{completed.includes(index) ? '⭐⭐⭐⭐⭐⭐⭐' : '✨ ¡Explorar!'}</span></button>)}</section></>}
    {screen !== 'map' && <section className="first-grade-play"><div className="first-grade-play-top"><button className="back-link" type="button" onClick={() => setScreen('map')}><ArrowLeft size={18} /> Mapa</button><h1>{mission.title}</h1><span>Reto {step + 1} / 7</span></div><div className="first-grade-progress"><span style={{ width: `${progress}%` }} /></div><div className="first-grade-field">{screen === 'win' ? <div className="first-grade-intro"><div className="first-grade-art">🏆</div><h2>¡Aventura superada!</h2><p>Conseguiste 7 estrellas.</p><button className="game-secondary-button" type="button" onClick={() => setScreen('map')}>← Volver al mapa</button>{missionIndex < missions.length - 1 && <button className="game-primary-button" type="button" onClick={() => start(missionIndex + 1)}><ArrowRight size={18} /> Siguiente aventura</button>}</div> : <><p className="page-eyebrow">RETO {step + 1} DE 7 · 🌿 PUTUMAYO</p><h2>{task.prompt}</h2><Task task={task} onDone={done} /></>}</div></section>}
  </main>;
}
