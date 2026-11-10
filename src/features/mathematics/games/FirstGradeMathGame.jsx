import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const adventures = [
  {
    title: '¡Conozcamos los números del 1 al 9!',
    icon: '🦋🌼',
    intro: 'Mira el bosque. ¡Vamos a contar sus habitantes!',
    tasks: [
      { type: 'count', icon: '🦋', amount: 4, prompt: 'Toca las mariposas.', voice: 'Toca cada mariposa para contar cuatro.' },
      { type: 'count', icon: '🐸', amount: 7, prompt: 'Cuenta las ranitas.', voice: 'Ahora toca las siete ranitas, una por una.' },
      { type: 'build', icon: '🌼', target: 6, prompt: 'Lleva 6 flores a la canasta.', voice: 'Lleva seis flores a la canasta.' },
      { type: 'build', icon: '🦋', target: 9, prompt: 'Reúne 9 mariposas.', voice: 'Reúne nueve mariposas.' },
    ],
  },
  {
    title: 'Con la decena hacemos grupo',
    icon: '🧺🌰',
    intro: 'Las semillas quieren viajar juntas. ¡Hagamos una decena!',
    tasks: [
      { type: 'build', icon: '🌰', target: 10, prompt: 'Llena la canasta con 10 semillas.', voice: 'Lleva diez semillas a la canasta. Diez forman una decena.' },
      { type: 'build', icon: '🌰', target: 0, start: 3, remove: true, prompt: 'Deja la canasta vacía.', voice: 'Retira las tres semillas hasta dejar cero.' },
      { type: 'sequence', series: [4, null, 6], answer: 5, options: [3, 4, 5, 6, 7], prompt: 'Completa el camino.', voice: 'Cuatro, ¿cuál viene antes de seis?' },
      { type: 'ordinal', animals: ['🐢', '🦜', '🐒', '🦋', '🐸'], answer: 2, prompt: 'Encuentra al tercero.', voice: 'Toca al animal que va en tercer lugar.' },
    ],
  },
  {
    title: 'Hagamos adiciones y sustracciones sencillas',
    icon: '🍌🍎',
    intro: 'Las frutas llegan y se van. ¡Mira qué sucede!',
    tasks: [
      { type: 'change', icon: '🍎', start: 2, delta: 3, prompt: 'Agrega 3 frutas.', voice: 'Hay dos frutas. Agrega tres.' },
      { type: 'change', icon: '🍎', start: 5, delta: -3, prompt: 'Quita 3 frutas.', voice: 'Hay cinco frutas. Quita tres.' },
      { type: 'change', icon: '🍌', start: 4, delta: 2, prompt: 'Agrega 2 bananos.', voice: 'El mono tenía cuatro bananos. Llegan dos más.' },
      { type: 'change', icon: '🍌', start: 6, delta: -4, prompt: 'Quita 4 bananos.', voice: 'Hay seis bananos. Retira cuatro.' },
    ],
  },
  {
    title: '¡Estos son los números hasta 50!',
    icon: '🌿🔢',
    intro: 'Sigue el sendero de los números grandes.',
    tasks: [
      { type: 'build', icon: '🌰', target: 12, start: 10, prompt: 'Completa el 12.', voice: 'Ya hay una decena. Agrega dos unidades para formar doce.' },
      { type: 'sequence', series: [19, null, 21], answer: 20, options: [18, 19, 20, 21, 22], prompt: 'Cruza al 20.', voice: 'Diecinueve, ¿qué número viene antes de veintiuno?' },
      { type: 'build', icon: '🌰', target: 34, start: 30, prompt: 'Forma el 34.', voice: 'Hay tres decenas. Agrega cuatro unidades.' },
      { type: 'sequence', series: [48, null, 50], answer: 49, options: [46, 47, 48, 49, 50], prompt: 'Llega hasta el 50.', voice: 'Cuarenta y ocho, ¿qué número sigue?' },
    ],
  },
  {
    title: 'Adicionemos sin reagrupar',
    icon: '🧺🧺',
    intro: 'Dos canastas se encuentran. ¡Juntamos sus frutos!',
    tasks: [
      { type: 'operation', mode: '+', a: 23, b: 14, prompt: 'Junta 23 y 14.', voice: 'Junta dos decenas y tres unidades con una decena y cuatro unidades.' },
      { type: 'operation', mode: '+', a: 12, b: 15, prompt: 'Junta 12 y 15.', voice: 'Junta doce frutos y quince frutos.' },
      { type: 'operation', mode: '+', a: 31, b: 8, prompt: 'Agrega 8 a 31.', voice: 'Hay treinta y un frutos. Agrega ocho unidades.' },
      { type: 'operation', mode: '+', a: 20, b: 24, prompt: 'Junta 20 y 24.', voice: 'Junta veinte y veinticuatro.' },
    ],
  },
  {
    title: 'Hagamos sustracciones sin desagrupar',
    icon: '🐒🍊',
    intro: 'El mono comparte su cosecha. ¿Cuántas frutas quedan?',
    tasks: [
      { type: 'operation', mode: '-', a: 24, b: 12, prompt: 'Retira 12 de 24.', voice: 'De veinticuatro frutos retira una decena y dos unidades.' },
      { type: 'operation', mode: '-', a: 38, b: 15, prompt: 'Retira 15 de 38.', voice: 'De treinta y ocho frutos retira una decena y cinco unidades.' },
      { type: 'operation', mode: '-', a: 46, b: 23, prompt: 'Retira 23 de 46.', voice: 'De cuarenta y seis frutos retira dos decenas y tres unidades.' },
      { type: 'operation', mode: '-', a: 29, b: 7, prompt: 'Retira 7 de 29.', voice: 'El mono tenía veintinueve frutos. Retira siete.' },
    ],
  },
];

function speak(text, muted, volume) {
  if (muted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CO';
  utterance.rate = 0.87;
  utterance.pitch = 0.96;
  utterance.volume = volume;
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase() === 'es-co')
    ?? window.speechSynthesis.getVoices().find((item) => /^es[-_]/i.test(item.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function Intro({ adventure, onStart }) {
  return <div className="first-grade-intro"><div className="first-grade-art">{adventure.icon}</div><h2>{adventure.intro}</h2><button className="game-primary-button" type="button" onClick={onStart}>▶ ¡Vamos!</button></div>;
}

function Task({ task, state, setState, onDone }) {
  const [message, setMessage] = useState('');

  if (task.type === 'count') {
    return <><div className="first-grade-items">{Array.from({ length: task.amount }, (_, index) => <button className={`token ${state.selected?.includes(index) ? 'token--selected' : ''}`} type="button" key={index} onClick={() => setState({ selected: [...(state.selected ?? []), index] })} disabled={state.selected?.includes(index)}>{task.icon}</button>)}</div><p className="game-counter">{state.selected?.length ?? 0} / {task.amount}</p><button className="game-primary-button" type="button" onClick={() => (state.selected?.length === task.amount ? onDone() : setMessage('Toca todos los dibujos.'))}>✓ Comprobar</button></>;
  }
  if (task.type === 'build') {
    const current = state.value ?? task.start ?? 0;
    const correct = task.remove ? current <= task.target : current >= task.target;
    return <><div className="first-grade-number">{current}</div><div className="first-grade-basket">{Array.from({ length: current }, (_, index) => <span key={index}>{task.icon}</span>)}</div><div className="game-actions"><button className="game-secondary-button" type="button" onClick={() => setState({ value: task.remove ? Math.max(task.target, current - 1) : current + 1 })} disabled={correct}>{task.remove ? '➖ Retirar' : '➕ Agregar'} {task.icon}</button>{correct && <button className="game-primary-button" type="button" onClick={onDone}>Continuar →</button>}</div></>;
  }
  if (task.type === 'sequence') return <><div className="first-grade-sequence">{task.series.map((item, index) => <span key={index}>{item ?? state.choice ?? '?'}</span>)}</div><div className="first-grade-options">{task.options.map((option) => <button className={`token ${state.choice === option ? 'token--selected' : ''}`} type="button" key={option} onClick={() => { setState({ choice: option }); if (option === task.answer) onDone(); else setMessage('Mira el número anterior y el siguiente.'); }}>{option}</button>)}</div><p className="game-feedback">{message}</p></>;
  if (task.type === 'ordinal') return <><div className="first-grade-items">{task.animals.map((animal, index) => <button className={`token ${state.choice === index ? 'token--selected' : ''}`} type="button" key={animal} onClick={() => { setState({ choice: index }); if (index === task.answer) onDone(); else setMessage('Cuenta desde la izquierda: primero, segundo, tercero.'); }}>{animal}<small>{index + 1}.º</small></button>)}</div><p className="game-feedback">{message}</p></>;
  if (task.type === 'change') {
    const current = state.value ?? task.start;
    const target = task.start + task.delta;
    return <><div className="first-grade-equation">{task.start} {task.delta > 0 ? '+' : '−'} {Math.abs(task.delta)} = <b>{current}</b></div><div className="first-grade-items">{Array.from({ length: current }, (_, index) => <span className="token" key={index}>{task.icon}</span>)}</div><button className="game-primary-button" type="button" onClick={() => { const next = current + Math.sign(task.delta); setState({ value: next }); if (next === target) onDone(); }}>{task.delta > 0 ? '➕ Agregar' : '➖ Quitar'} {task.icon}</button></>;
  }
  const current = state.value ?? task.a;
  const target = task.a + (task.mode === '+' ? task.b : -task.b);
  return <><div className="first-grade-equation">{task.a} {task.mode} {task.b} = <b>{current}</b></div><div className="first-grade-items">{Array.from({ length: Math.max(0, current) }, (_, index) => <span className="token" key={index}>🍊</span>)}</div><button className="game-primary-button" type="button" onClick={() => { const next = current + (task.mode === '+' ? 1 : -1); setState({ value: next }); if (next === target) onDone(); }}>{task.mode === '+' ? '➕ Agregar' : '➖ Retirar'} 🍊</button></>;
}

export default function FirstGradeMathGame() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('map');
  const [adventureIndex, setAdventureIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [state, setState] = useState({});
  const [completed, setCompleted] = useState([]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const adventure = adventures[adventureIndex];
  const task = adventure.tasks[step];
  const line = screen === 'map' ? 'Elige una aventura del primer periodo.' : screen === 'intro' ? adventure.intro : screen === 'win' ? 'Terminaste esta aventura y ganaste una estrella.' : task.voice;

  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => { speak(line, muted, volume); }, [line, muted, volume]);

  const start = (index) => { setAdventureIndex(index); setStep(0); setState({}); setScreen('intro'); };
  const next = () => {
    if (step < adventure.tasks.length - 1) { setStep(step + 1); setState({}); }
    else { setCompleted((items) => [...new Set([...items, adventureIndex])]); setScreen('win'); }
  };
  const progress = useMemo(() => screen === 'intro' ? 0 : screen === 'win' ? 100 : Math.round((step / adventure.tasks.length) * 100), [screen, step, adventure.tasks.length]);

  return <main className="first-grade-game">
    <header className="first-grade-header"><button className="back-link" type="button" onClick={() => navigate('/matematicas/grado/1')}><ArrowLeft size={18} /> Volver al periodo</button><span>⭐ {completed.length}</span><button className="voice-button" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Activar voz' : 'Silenciar voz'}>{muted ? <VolumeX /> : <Volume2 />}</button></header>
    <div className="first-grade-audio"><button type="button" onClick={() => speak(line, muted, volume)}>▶ Escuchar / repetir</button><label htmlFor="first-grade-volume">Volumen</label><input id="first-grade-volume" type="range" min="0" max="100" value={volume * 100} onChange={(event) => setVolume(Number(event.target.value) / 100)} /></div>
    {screen === 'map' && <><div className="page-heading"><p className="page-eyebrow">MATEMÁTICAS · PRIMER GRADO · PERIODO 1</p><h1>Aventuras matemáticas</h1><p>Un viaje para descubrir, tocar y jugar.</p></div><section className="mission-grid">{adventures.map((item, index) => <button className="mission-card first-grade-adventure" type="button" key={item.title} onClick={() => start(index)}><span className="mission-card__icon">{item.icon}</span><span className="mission-card__number">AVENTURA {String(index + 1).padStart(2, '0')}</span><h2>{item.title}</h2><span className="period-status">{completed.includes(index) ? '⭐ ¡Completada!' : '✨ ¡Vamos!'}</span></button>)}</section></>}
    {screen !== 'map' && <section className="first-grade-play"><div className="first-grade-play-top"><button className="back-link" type="button" onClick={() => setScreen('map')}><ArrowLeft size={18} /> Aventuras</button><h1>{adventure.title}</h1><span>⭐ {completed.includes(adventureIndex) ? 'Ganada' : 'Por ganar'}</span></div><div className="first-grade-progress"><span style={{ width: `${progress}%` }} /></div><div className="first-grade-field">{screen === 'intro' && <Intro adventure={adventure} onStart={() => setScreen('play')} />}{screen === 'win' && <div className="first-grade-intro"><div className="first-grade-art">⭐</div><h2>¡Lo lograste!</h2><button className="game-secondary-button" type="button" onClick={() => setScreen('map')}>🗺️ Aventuras</button>{adventureIndex < adventures.length - 1 ? <button className="game-primary-button" type="button" onClick={() => start(adventureIndex + 1)}><ArrowRight size={18} /> Siguiente</button> : <button className="game-primary-button" type="button" onClick={() => setScreen('map')}>🏠 Volver al mapa</button>}</div>}{screen === 'play' && <><p className="page-eyebrow">RETO {step + 1} DE {adventure.tasks.length}</p><h2>{task.prompt}</h2><Task task={task} state={state} setState={setState} onDone={next} /></>}</div></section>}
  </main>;
}
