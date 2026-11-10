import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const topics = [
  {
    title: 'Unidades de mil', icon: '🧺',
    tasks: [
      ['choice', '¿Cuál tarjeta muestra mil?', '🧺 1.000 semillas', ['100', '1.000', '10'], '1.000'],
      ['choice', '¿Cuántas centenas forman mil?', '🟨 × 10', ['10 centenas', '2 centenas', '5 centenas'], '10 centenas'],
      ['place', 'Lleva cada bloque a su lugar.', '🧱 Valor de los bloques', ['1.000', '100', '10'], ['unidad de mil', 'centena', 'decena']],
      ['choice', 'Encuentra la unidad de mil.', '🧱 1.000 · 🟨 100 · 🔹 10', ['🧱 1.000', '🟨 100', '🔹 10'], '🧱 1.000'],
      ['choice', '¿Qué número representan los bloques?', '🧱 🟨 🟨', ['1.200', '1.020', '120'], '1.200'],
      ['place', 'Ordena de menor a mayor.', '🔹 10 · 🟨 100 · 🧱 1.000', ['10', '100', '1.000'], ['primero', 'después', 'al final']],
      ['choice', '¿Qué canasta tiene más semillas?', '🧺 1.000 · 🧺 100', ['1.000', '100'], '1.000'],
    ],
  },
  {
    title: 'Figuras planas', icon: '🔺',
    tasks: [
      ['choice', '¿Qué figura tiene la rueda?', '🛞', ['Círculo', 'Triángulo', 'Cuadrado'], 'Círculo'],
      ['choice', 'Encuentra el triángulo del techo.', '🏠', ['🔺', '🟦', '⚪'], '🔺'],
      ['place', 'Une cada figura con su nombre.', '🎨 Figuras del pueblo', ['⚪', '🔺', '🟦'], ['círculo', 'triángulo', 'cuadrado']],
      ['choice', '¿Cuál parece una puerta?', '🚪', ['Rectángulo', 'Círculo', 'Triángulo'], 'Rectángulo'],
      ['place', 'Construye una casita: techo y pared.', '🏠', ['🔺', '🟦'], ['techo', 'pared']],
      ['choice', 'Encuentra una figura redonda.', '☀️ · 🏠 · 📘', ['☀️ Sol', '🏠 Casa', '📘 Libro'], '☀️ Sol'],
      ['place', 'Clasifica las figuras.', '🔺 · ⚪ · ▭', ['🔺', '⚪', '▭'], ['triángulo', 'círculo', 'rectángulo']],
    ],
  },
  {
    title: 'Sólidos geométricos', icon: '📦',
    tasks: [
      ['choice', '¿Qué sólido parece una pelota?', '⚽', ['Esfera', 'Cubo', 'Cilindro'], 'Esfera'],
      ['choice', '¿Qué sólido parece un dado?', '🎲', ['Cubo', 'Esfera', 'Cilindro'], 'Cubo'],
      ['place', 'Relaciona objeto y sólido.', '⚽ · 🎲 · 🥫', ['⚽', '🎲', '🥫'], ['esfera', 'cubo', 'cilindro']],
      ['choice', '¿Cuál puede rodar como una pelota?', '⚽ · 📦', ['Esfera', 'Cubo'], 'Esfera'],
      ['choice', 'Mira la lata. ¿Qué sólido es?', '🥫', ['Cilindro', 'Cubo', 'Esfera'], 'Cilindro'],
      ['place', 'Lleva los objetos a su forma.', '🎲 · 🥫 · ⚽', ['🎲', '🥫', '⚽'], ['cubo', 'cilindro', 'esfera']],
      ['choice', '¿Qué objeto se parece a un cubo?', '🎲 · ⚽ · 🥫', ['🎲 Dado', '⚽ Pelota', '🥫 Lata'], '🎲 Dado'],
    ],
  },
  {
    title: 'Medidas', icon: '📏',
    tasks: [
      ['choice', '¿Cuál camino es más largo?', '〰️〰️〰️〰️ · 〰️', ['Camino largo', 'Camino corto'], 'Camino largo'],
      ['choice', '¿Qué árbol es más alto?', '🌳 · 🌱', ['Árbol', 'Brote'], 'Árbol'],
      ['place', 'Ordena de pequeño a grande.', '🌱 · 🌿 · 🌳', ['🌱', '🌿', '🌳'], ['pequeño', 'mediano', 'grande']],
      ['choice', '¿Cuál recipiente puede contener más?', '🪣 · 🥄', ['Balde', 'Cuchara'], 'Balde'],
      ['choice', '¿Qué cinta es más corta?', '➖ · ➖➖➖➖', ['Primera cinta', 'Segunda cinta'], 'Primera cinta'],
      ['place', 'Compara los objetos.', '🐜 · 🐒', ['🐜', '🐒'], ['más pequeño', 'más grande']],
      ['choice', '¿Qué fila tiene más frutas?', '🍌🍌🍌🍌 · 🍌🍌', ['Primera fila', 'Segunda fila'], 'Primera fila'],
    ],
  },
  {
    title: 'El tiempo', icon: '☀️',
    tasks: [
      ['choice', '¿Cuándo sale el sol?', '🌅', ['Amanecer', 'Noche', 'Tarde'], 'Amanecer'],
      ['place', 'Ordena los momentos del día.', '🌅 · ☀️ · 🌇 · 🌙', ['🌅', '☀️', '🌇', '🌙'], ['1', '2', '3', '4']],
      ['choice', '¿Cuándo vemos las estrellas?', '✨🌙', ['Noche', 'Mañana', 'Tarde'], 'Noche'],
      ['choice', '¿Cuándo almorzamos normalmente?', '🍽️ ☀️', ['Mediodía', 'Noche', 'Amanecer'], 'Mediodía'],
      ['place', 'Ordena la aventura de Coli.', '🛏️ · 🛶 · 🌙', ['🛏️', '🛶', '🌙'], ['despertar', 'pasear', 'dormir']],
      ['choice', '¿Qué viene después de la mañana?', '🌅 → ☀️ → ?', ['Tarde', 'Amanecer', 'Noche'], 'Tarde'],
      ['choice', '¿Qué hacemos antes de dormir?', '🪥 · 🛏️', ['Cepillarnos', 'Despertarnos'], 'Cepillarnos'],
    ],
  },
  {
    title: 'Organización de datos', icon: '📊',
    tasks: [
      ['choice', 'Cuenta los plátanos.', '🍌🍌🍌', ['3', '2', '4'], '3'],
      ['place', 'Clasifica los hallazgos.', '🍌 · 🐒 · 🌺', ['🍌', '🐒', '🌺'], ['fruta', 'animal', 'flor']],
      ['choice', '¿Qué fruta aparece más?', '🍌🍌🍌 · 🍍🍍', ['Plátano', 'Piña'], 'Plátano'],
      ['choice', 'En el pictograma, ¿cuántos monos hay?', '🐒 🐒 🐒 🐒', ['4', '3', '5'], '4'],
      ['place', 'Completa el pictograma: dos flores.', '🌺 🌺', ['🌺', '🌺'], ['flor 1', 'flor 2']],
      ['choice', '¿Cuál grupo tiene menos?', '🦋🦋 · 🐸🐸🐸', ['Mariposas', 'Ranas'], 'Mariposas'],
      ['place', 'Organiza lo que encontró Coli.', '🐸 · 🍌 · 🐸', ['🐸', '🍌', '🐸'], ['animal 1', 'fruta', 'animal 2']],
    ],
  },
];

const finalTasks = [
  ['¿Cuál es mil?', '🧺 1.000', ['1.000', '100'], '1.000'],
  ['¿Qué forma tiene el sol?', '☀️', ['Círculo', 'Cuadrado'], 'Círculo'],
  ['¿Qué forma tiene la pelota?', '⚽', ['Esfera', 'Cubo'], 'Esfera'],
  ['¿Cuál es más alto?', '🌳 · 🌱', ['Árbol', 'Brote'], 'Árbol'],
  ['¿Qué viene después del día?', '☀️ → ?', ['Noche', 'Mañana'], 'Noche'],
  ['¿Cuántas flores hay?', '🌺🌺🌺', ['3', '2'], '3'],
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
  const [message, setMessage] = useState('');
  const [placements, setPlacements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [used, setUsed] = useState([]);
  const [choice, setChoice] = useState(null);
  const type = task[0];
  const options = task[3];
  const answer = task[4];

  if (type === 'choice') {
    return <><div className="first-grade-sequence"><span>{task[2]}</span></div><div className="first-grade-options">{options.map((option) => <button className={`token ${choice === option ? 'token--selected' : ''}`} type="button" key={option} onClick={() => { setChoice(option); if (option === answer) onDone(); else setMessage('Observa la pista visual e inténtalo otra vez.'); }}>{option}</button>)}</div><p className="game-feedback">{message}</p></>;
  }

  const completePlacement = (next) => {
    setPlacements(next);
    if (next.length === answer.length) {
      const correct = next.every((value, index) => value === index);
      if (correct) onDone();
      else { setMessage('Revisa el lugar de cada ficha.'); setPlacements([]); setUsed([]); }
    }
  };

  return <><div className="first-grade-sequence"><span>{task[2]}</span></div><div className="first-grade-options">{options.map((option, index) => <button className={`token ${used.includes(index) ? 'token--selected' : ''}`} type="button" key={`${option}-${index}`} disabled={used.includes(index)} onClick={() => { setSelected(index); setMessage('Ahora toca el lugar que corresponde.'); }}>{option}</button>)}</div><div className="first-grade-options">{answer.map((label, index) => <button className="token" type="button" key={label} disabled={placements[index] !== undefined || selected === null} onClick={() => { if (selected === null) return; if (selected !== index) { setMessage('Esa ficha va en otro lugar.'); return; } setUsed([...used, selected]); setSelected(null); completePlacement([...placements, selected]); }}>{label}</button>)}</div><p className="game-feedback">{message}</p></>;
}

function FinalTask({ task, onDone }) {
  const [message, setMessage] = useState('');
  return <><div className="first-grade-sequence"><span>{task[1]}</span></div><div className="first-grade-options">{task[2].map((option) => <button className="token" type="button" key={option} onClick={() => option === task[3] ? onDone() : setMessage('Mira la imagen y vuelve a intentarlo.')}>{option}</button>)}</div><p className="game-feedback">{message}</p></>;
}

export default function FirstGradeFourthPeriodGame() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('map');
  const [topicIndex, setTopicIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [finalStep, setFinalStep] = useState(0);
  const isFinal = screen === 'final';
  const topic = topics[topicIndex];
  const task = isFinal ? finalTasks[finalStep] : topic.tasks[step];
  const line = screen === 'map' ? 'Elige una estación del cuarto periodo.' : screen === 'win' ? 'Aventura superada. Ganaste siete estrellas.' : isFinal ? task[0] : task[1];
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => { speak(line, muted, volume); }, [line, muted, volume]);
  const progress = useMemo(() => screen === 'map' ? 0 : screen === 'win' ? 100 : isFinal ? Math.round((finalStep / finalTasks.length) * 100) : Math.round((step / topic.tasks.length) * 100), [screen, isFinal, step, finalStep, topic.tasks.length]);
  const start = (index) => { setTopicIndex(index); setStep(0); setScreen('play'); };
  const done = () => {
    if (isFinal) {
      if (finalStep < finalTasks.length - 1) setFinalStep(finalStep + 1);
      else setScreen('complete');
    } else if (step < topic.tasks.length - 1) setStep(step + 1);
    else { setCompleted((items) => [...new Set([...items, topicIndex])]); setScreen('win'); }
  };
  const allTopicsDone = completed.length === topics.length;
  return <main className="first-grade-game">
    <header className="first-grade-header"><button className="back-link" type="button" onClick={() => navigate('/matematicas/grado/1')}><ArrowLeft size={18} /> Volver al periodo</button><span>⭐ {completed.length * 7} / 42</span><button className="voice-button" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Activar voz' : 'Silenciar voz'}>{muted ? <VolumeX /> : <Volume2 />}</button></header>
    <div className="first-grade-audio"><button type="button" onClick={() => speak(line, muted, volume)}>▶ Escuchar / repetir</button><label htmlFor="fourth-period-volume">Volumen</label><input id="fourth-period-volume" type="range" min="0" max="100" value={volume * 100} onChange={(event) => setVolume(Number(event.target.value) / 100)} /></div>
    {screen === 'map' && <><div className="page-heading"><p className="page-eyebrow">MATEMÁTICAS · PRIMER GRADO · PERIODO 4</p><h1>¡Juguemos con las operaciones matemáticas!</h1><p>Recorre las seis estaciones y descubre nuevas formas de aprender.</p></div><section className="mission-grid">{topics.map((item, index) => <button className="mission-card first-grade-adventure" type="button" key={item.title} onClick={() => start(index)}><span className="mission-card__icon">{item.icon}</span><span className="mission-card__number">AVENTURA {index + 1}</span><h2>{item.title}</h2><span className="period-status">{completed.includes(index) ? '⭐ ¡Completada!' : '✨ ¡Explorar!'}</span></button>)}</section>{allTopicsDone && <button className="game-primary-button" type="button" onClick={() => { setFinalStep(0); setScreen('final'); }}>🏅 Gran misión final</button>}</>}
    {screen !== 'map' && <section className="first-grade-play"><div className="first-grade-play-top"><button className="back-link" type="button" onClick={() => setScreen('map')}><ArrowLeft size={18} /> Mapa</button><h1>{isFinal ? '🏅 Gran misión final' : topic.title}</h1><span>{isFinal ? `Parada ${finalStep + 1} / 6` : `Reto ${step + 1} / 7`}</span></div><div className="first-grade-progress"><span style={{ width: `${progress}%` }} /></div><div className="first-grade-field">{screen === 'win' ? <div className="first-grade-intro"><div className="first-grade-art">🏆</div><h2>¡Aventura superada!</h2><p>Conseguiste 7 estrellas.</p><button className="game-secondary-button" type="button" onClick={() => setScreen('map')}>← Volver al mapa</button></div> : screen === 'complete' ? <div className="first-grade-intro"><div className="first-grade-art">🏅</div><h2>¡Gran explorador matemático!</h2><p>Completaste todas las estaciones y la misión final.</p><button className="game-primary-button" type="button" onClick={() => setScreen('map')}>Volver al mapa</button></div> : <><p className="page-eyebrow">{isFinal ? 'MISIÓN FINAL' : `RETO ${step + 1} DE 7`}</p><h2>{isFinal ? task[0] : task[1]}</h2>{isFinal ? <FinalTask task={task} onDone={done} /> : <Task task={task} onDone={done} />}</>}</div></section>}
  </main>;
}
