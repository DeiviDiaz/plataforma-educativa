import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const missions = [
  {
    number: 7, title: 'Aprendamos a adicionar reagrupando', art: '🧺🍊',
    tasks: [
      { mode: 'collect', text: 'Toca diez flores para formar una decena.', emoji: '🌼', count: 10, goal: 10 },
      { mode: 'choice', text: 'Ocho semillas y siete semillas. ¿Cuántas son?', picture: '🫘 × 8  +  🫘 × 7', options: [14, 15, 16], answer: 15 },
      { mode: 'collect', text: 'Lleva diez frutas al grupo de una decena.', emoji: '🍊', count: 10, goal: 10 },
      { mode: 'choice', text: 'Una decena y seis unidades más cinco. ¿Cuántas?', picture: '10 + 6 + 5', options: [20, 21, 22], answer: 21 },
      { mode: 'choice', text: 'Nueve más cuatro: agrupamos diez. ¿Cuántos?', picture: '9 + 4', options: [12, 13, 14], answer: 13 },
      { mode: 'choice', text: 'Catorce más ocho. ¿Cuántas unidades forman una nueva decena?', picture: '14 + 8', options: [20, 22, 24], answer: 22 },
      { mode: 'choice', text: 'Una decena y ocho unidades más cuatro. ¿Cuál es el total?', picture: '18 + 4', options: [21, 22, 23], answer: 22 },
    ],
  },
  {
    number: 8, title: '¡Desagrupemos para restar!', art: '🪵🔟',
    tasks: [
      { mode: 'split', text: 'Toca la barra para convertir una decena en diez unidades.', emoji: '🟨' },
      { mode: 'remove', text: 'Había doce semillas. Quita cuatro.', emoji: '🫘', count: 12, goal: 4 },
      { mode: 'choice', text: 'Una decena y dos unidades, quita cinco. ¿Cuántas quedan?', picture: '12 − 5', options: [6, 7, 8], answer: 7 },
      { mode: 'split', text: 'Desagrupa la decena para poder retirar unidades.', emoji: '🍃' },
      { mode: 'remove', text: 'Había quince flores. Quita seis y cuenta las que quedan.', emoji: '🌸', count: 15, goal: 6 },
      { mode: 'choice', text: 'Dieciséis menos siete. ¿Cuántas quedan?', picture: '16 − 7', options: [8, 9, 10], answer: 9 },
      { mode: 'choice', text: 'Una decena y tres unidades. Retira cinco. ¿Cuántas quedan?', picture: '13 − 5', options: [7, 8, 9], answer: 8 },
    ],
  },
  {
    number: 9, title: 'Encontremos la mejor solución', art: '🐒🍌',
    tasks: [
      { mode: 'choice', text: 'Llegaron dos monos a los cinco que había. ¿Qué hacemos?', picture: '5 + 2', options: ['➕ Juntar', '➖ Quitar'], answer: '➕ Juntar' },
      { mode: 'choice', text: 'Había nueve plátanos. Se comieron tres. ¿Cuántos quedan?', picture: '9 − 3', options: [5, 6, 7], answer: 6 },
      { mode: 'collect', text: 'Junta las cuatro frutas con las tres de la otra canasta.', emoji: '🍎', count: 7, goal: 7 },
      { mode: 'choice', text: 'Cuatro aves vuelan y dos llegan. ¿Cuántas hay?', picture: '4 + 2', options: [5, 6, 7], answer: 6 },
      { mode: 'remove', text: 'Ocho peces nadaban; tres se fueron. Tócalos.', emoji: '🐟', count: 8, goal: 3 },
      { mode: 'choice', text: 'Tenías seis semillas y encuentras cuatro más. ¿Qué operación haces?', picture: '6 + 4', options: ['Sumar', 'Restar'], answer: 'Sumar' },
      { mode: 'choice', text: 'Había diez flores y regalaste dos. ¿Cuántas quedan?', picture: '10 − 2', options: [7, 8, 9], answer: 8 },
    ],
  },
  {
    number: 10, title: '¡Estos son los números del 50 al 99!', art: '🔢🌼',
    tasks: [
      { mode: 'choice', text: 'Cinco decenas y tres unidades. ¿Qué número es?', picture: '🟧🟧🟧🟧🟧 + 🟡🟡🟡', options: [35, 53, 55], answer: 53 },
      { mode: 'choice', text: '¿Cuál sigue después de 76?', picture: '74 → 75 → 76 → ?', options: [77, 67, 78], answer: 77 },
      { mode: 'order', text: 'Toca los números del menor al mayor.', numbers: [91, 64, 78], ascending: true },
      { mode: 'choice', text: '¿Cuál está antes de 90?', picture: '88 → ? → 90', options: [89, 91, 80], answer: 89 },
      { mode: 'order', text: 'Toca los números del mayor al menor.', numbers: [57, 93, 81], ascending: false },
      { mode: 'choice', text: '¿Qué número tiene ocho decenas y dos unidades?', picture: '80 + 2', options: [28, 82, 92], answer: 82 },
      { mode: 'choice', text: '¿Cuál número está entre 68 y 70?', picture: '68 → ? → 70', options: [67, 69, 71], answer: 69 },
    ],
  },
  {
    number: 11, title: '¡Resolvamos situaciones con la adición!', art: '🧺➕',
    tasks: [
      { mode: 'collect', text: 'Junta siete frutas y cuatro más. Tócalas todas.', emoji: '🍐', count: 11, goal: 11 },
      { mode: 'choice', text: 'Cinco flores más ocho flores. ¿Cuántas?', picture: '5 + 8', options: [12, 13, 14], answer: 13 },
      { mode: 'choice', text: 'Hay nueve aves y llegan seis. ¿Cuántas hay?', picture: '9 + 6', options: [14, 15, 16], answer: 15 },
      { mode: 'collect', text: 'Junta tres semillas y seis semillas.', emoji: '🫘', count: 9, goal: 9 },
      { mode: 'choice', text: 'Ocho mangos y siete mangos. ¿Cuántos en total?', picture: '8 + 7', options: [14, 15, 16], answer: 15 },
      { mode: 'choice', text: 'Veintitrés más catorce. ¿Cuál es el resultado?', picture: '23 + 14', options: [36, 37, 38], answer: 37 },
      { mode: 'choice', text: 'Treinta y uno más ocho. ¿Cuántos son?', picture: '31 + 8', options: [38, 39, 40], answer: 39 },
    ],
  },
  {
    number: 12, title: '¡Resolvamos situaciones con la sustracción!', art: '🐢➖',
    tasks: [
      { mode: 'remove', text: 'Había diez hojas. Quita cuatro.', emoji: '🍃', count: 10, goal: 4 },
      { mode: 'choice', text: 'Doce peces menos cinco peces. ¿Cuántos quedan?', picture: '12 − 5', options: [6, 7, 8], answer: 7 },
      { mode: 'remove', text: 'Había catorce semillas. Retira seis.', emoji: '🫘', count: 14, goal: 6 },
      { mode: 'choice', text: 'Nueve tortugas; cuatro se fueron. ¿Cuántas quedan?', picture: '9 − 4', options: [4, 5, 6], answer: 5 },
      { mode: 'choice', text: 'Dieciséis frutas, llegan tres y se van cinco. ¿Cuántas quedan?', picture: '16 + 3 − 5', options: [13, 14, 15], answer: 14 },
      { mode: 'choice', text: 'Veinticuatro menos doce. ¿Cuántos quedan?', picture: '24 − 12', options: [11, 12, 13], answer: 12 },
      { mode: 'choice', text: 'Cuarenta y seis menos veintitrés. ¿Cuál es el resultado?', picture: '46 − 23', options: [22, 23, 24], answer: 23 },
    ],
  },
];

function speak(text, muted, volume) {
  if (muted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CO'; utterance.rate = 0.88; utterance.pitch = 1.12; utterance.volume = volume;
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase() === 'es-co')
    ?? window.speechSynthesis.getVoices().find((item) => /^es[-_]/i.test(item.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function Task({ task, onDone }) {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState([]);
  const expected = task.mode === 'order' ? [...task.numbers].sort((a, b) => task.ascending ? a - b : b - a) : [];
  const choose = (answer) => answer === task.answer ? onDone() : setMessage('Mira con calma y vuelve a intentarlo. 👀');
  if (task.mode === 'choice') return <><div className="first-grade-sequence"><span>{task.picture}</span></div><div className="first-grade-options">{task.options.map((option) => <button className="token" type="button" key={option} onClick={() => choose(option)}>{option}</button>)}</div><p className="game-feedback">{message}</p></>;
  if (task.mode === 'order') return <><div className="first-grade-sequence"><span>{order.join(' → ') || '① → ② → ③'}</span></div><div className="first-grade-options">{task.numbers.map((number) => <button className="token" type="button" key={number} disabled={order.includes(number)} onClick={() => { if (number !== expected[order.length]) setMessage('Busca el número que va ahora.'); else if (order.length + 1 === expected.length) onDone(); else setOrder([...order, number]); }}>{number}</button>)}</div><p className="game-feedback">{message}</p></>;
  const isRemove = task.mode === 'remove';
  const current = selected.length;
  return <><div className="first-grade-number">{isRemove ? task.count - current : current} {isRemove ? '🌱' : '⭐'}</div><div className="first-grade-basket">{Array.from({ length: task.count }, (_, index) => <button className={`token ${selected.includes(index) ? 'token--selected' : ''}`} type="button" key={index} disabled={selected.includes(index)} onClick={() => { const next = [...selected, index]; setSelected(next); if (next.length === task.goal) onDone(); }}>{task.emoji}</button>)}</div><p className="game-counter">{isRemove ? 'Retirados' : 'Seleccionados'}: {current} / {task.goal}</p></>;
}

export default function FirstGradeSecondPeriodGame() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('map');
  const [missionIndex, setMissionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const mission = missions[missionIndex];
  const task = mission.tasks[step];
  const line = screen === 'map' ? 'Elige una misión del segundo periodo.' : screen === 'win' ? 'Terminaste esta misión y ganaste una estrella.' : task.text;
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => { speak(line, muted, volume); }, [line, muted, volume]);
  const progress = useMemo(() => screen === 'map' ? 0 : screen === 'win' ? 100 : Math.round((step / mission.tasks.length) * 100), [screen, step, mission.tasks.length]);
  const start = (index) => { setMissionIndex(index); setStep(0); setScreen('play'); };
  const done = () => { if (step < mission.tasks.length - 1) setStep(step + 1); else { setCompleted((items) => [...new Set([...items, missionIndex])]); setScreen('win'); } };
  return <main className="first-grade-game">
    <header className="first-grade-header"><button className="back-link" type="button" onClick={() => navigate('/matematicas/grado/1')}><ArrowLeft size={18} /> Volver al periodo</button><span>⭐ {completed.length} / 42</span><button className="voice-button" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Activar voz' : 'Silenciar voz'}>{muted ? <VolumeX /> : <Volume2 />}</button></header>
    <div className="first-grade-audio"><button type="button" onClick={() => speak(line, muted, volume)}>▶ Escuchar / repetir</button><label htmlFor="second-period-volume">Volumen</label><input id="second-period-volume" type="range" min="0" max="100" value={volume * 100} onChange={(event) => setVolume(Number(event.target.value) / 100)} /></div>
    {screen === 'map' && <><div className="page-heading"><p className="page-eyebrow">MATEMÁTICAS · PRIMER GRADO · PERIODO 2</p><h1>¡Cuando contamos aprendemos!</h1><p>Elige una misión y sigue el sendero con Lila 🦜</p></div><section className="mission-grid">{missions.map((item, index) => <button className="mission-card first-grade-adventure" type="button" key={item.number} onClick={() => start(index)}><span className="mission-card__icon">{item.art}</span><span className="mission-card__number">MISIÓN {item.number}</span><h2>{item.title}</h2><span className="period-status">{completed.includes(index) ? '⭐ ¡Completada!' : '✨ ¡Explorar!'}</span></button>)}</section></>}
    {screen !== 'map' && <section className="first-grade-play"><div className="first-grade-play-top"><button className="back-link" type="button" onClick={() => setScreen('map')}><ArrowLeft size={18} /> Mapa</button><h1>{mission.title}</h1><span>Reto {step + 1} / 7</span></div><div className="first-grade-progress"><span style={{ width: `${progress}%` }} /></div><div className="first-grade-field">{screen === 'win' ? <div className="first-grade-intro"><div className="first-grade-art">⭐</div><h2>¡Misión superada!</h2><button className="game-secondary-button" type="button" onClick={() => setScreen('map')}>🗺️ Mapa</button><button className="game-primary-button" type="button" onClick={() => missionIndex < missions.length - 1 && start(missionIndex + 1)}><ArrowRight size={18} /> Siguiente misión</button></div> : <><p className="page-eyebrow">MISIÓN {mission.number} · RETO {step + 1} DE 7</p><h2>{task.text}</h2><Task task={task} onDone={done} /></>}</div></section>}
  </main>;
}
