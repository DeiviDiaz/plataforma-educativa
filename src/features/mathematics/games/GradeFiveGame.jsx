import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Eye,
  Lightbulb,
  RotateCcw,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { useGameEffects } from '../effects/useGameEffects.js';
import { buttonMotion, levelVariants, shakeVariants } from '../effects/motionVariants.js';

function VisualItem({ item }) {
  const icons = {
    '🔎': { label: 'Buscar', icon: Search },
    '🧠': { label: 'Pensar', icon: Brain },
    '✅': { label: 'Respuesta correcta', icon: CheckCircle2 },
  };
  const shapes = {
    '△': {
      label: 'Triángulo',
      content: (
        <polygon points="50,10 90,86 10,86" className="visual-shape visual-shape--triangle" />
      ),
    },
    '□': {
      label: 'Cuadrado',
      content: <rect x="14" y="14" width="72" height="72" rx="10" className="visual-shape visual-shape--square" />,
    },
    '⬟': {
      label: 'Pentágono',
      content: (
        <polygon points="50,8 91,38 75,88 25,88 9,38" className="visual-shape visual-shape--pentagon" />
      ),
    },
    '▣': {
      label: 'Cubo',
      content: (
        <>
          <path d="M50 10 87 30v43L50 93 13 73V30L50 10Z" className="visual-shape visual-shape--cube" />
          <path d="M13 30 50 51l37-21M50 51v42" className="visual-shape-line" />
        </>
      ),
    },
    '⚽': {
      label: 'Esfera',
      content: (
        <>
          <circle cx="50" cy="50" r="38" className="visual-shape visual-shape--sphere" />
          <path d="m50 31 12 9-5 15H43l-5-15 12-9ZM43 55 31 64m26-9 12 9M38 40 27 35m35 5 11-5" className="visual-shape-line" />
        </>
      ),
    },
  };
  const shape = shapes[item];
  const icon = icons[item];

  if (!shape && !icon) return item;

  if (icon) {
    const Icon = icon.icon;
    return <Icon className="visual-item-icon" aria-label={icon.label} />;
  }

  return (
    <svg
      className="visual-shape-svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label={shape.label}
    >
      {shape.content}
    </svg>
  );
}

function FirstPeriodVisual({ gameNumber }) {
  const visuals = [
    { title: 'Múltiplos y divisores', items: ['6', '12', '18', '24'], note: '6 × 2 = 12  ·  24 ÷ 12 = 2' },
    { title: 'Partes de un entero', items: ['¼', '¼', '¼', '¼'], note: '4 partes iguales forman 1 entero' },
    { title: 'Sumamos fracciones', items: ['½', '+', '¼', '=', '¾'], note: '2/4 + 1/4 = 3/4' },
    { title: 'Décimas y centésimas', items: ['10', '20', '30', '40', '50'], note: 'Cada bloque representa una parte del entero' },
    { title: 'Medimos una figura', items: ['4 cm', '×', '3 cm', '=', '12 cm²'], note: 'Área = largo × ancho' },
    { title: 'Lados y polígonos', items: ['△', '□', '⬟'], note: '3 lados  ·  4 lados  ·  5 lados' },
  ];
  const visual = visuals[gameNumber] ?? visuals[0];

  return (
    <div className={`first-period-visual first-period-visual--${gameNumber}`} aria-label={`Ilustración: ${visual.title}`}>
      <strong>{visual.title}</strong>
      <div className="first-period-visual__drawing">
        {visual.items.map((item, index) => (
          <span key={`${item}-${index}`}><VisualItem item={item} /></span>
        ))}
      </div>
      <small>{visual.note}</small>
    </div>
  );
}

function GradeFivePeriodVisual({ periodId, gameNumber }) {
  const visuals = {
    2: [
      { title: 'Operaciones con decimales', items: ['2,50', '+', '1,25', '=', '3,75'], note: 'Alinea siempre las comas decimales' },
      { title: 'Números enteros', items: ['−3', '−2', '−1', '0', '1', '2'], note: 'Moverse a la derecha suma; a la izquierda resta' },
      { title: 'Potencias y raíces', items: ['2 × 2 × 2', '=', '2³', '=', '8'], note: 'La raíz deshace una potencia' },
      { title: 'Plano cartesiano', items: ['x →', '•', '↑ y'], note: 'Primero avanza en x y después en y' },
      { title: 'Orden de operaciones', items: ['(', ')', '×', '÷', '+', '−'], note: 'Resuelve en el orden correcto' },
      { title: 'Propiedades', items: ['3 + 7', '=', '7 + 3'], note: 'Cambiar el orden no cambia el resultado' },
    ],
    3: [
      { title: 'Masa y volumen', items: ['1 kg', '=', '1000 g'], note: 'Las unidades permiten comparar medidas' },
      { title: 'Razones y proporciones', items: ['1 : 2', '→', '2 : 4'], note: 'Las dos cantidades crecen con el mismo factor' },
      { title: 'Regla de tres', items: ['5 m', '→', '15 fichas', '→', '8 m'], note: 'Encuentra primero el valor de una unidad' },
      { title: 'Datos en gráficas', items: ['▮', '▮▮', '▮▮▮'], note: 'Cada barra representa una cantidad' },
      { title: 'Transformaciones', items: ['△', '→', '△', '→', '△'], note: 'Una figura puede trasladarse, girar o cambiar de tamaño' },
    ],
    4: [
      { title: 'Capacidad', items: ['1 L', '=', '1000 mL'], note: 'Un litro contiene mil mililitros' },
      { title: 'Porcentajes', items: ['100%', '▰▰▰▰', '25%'], note: 'Un porcentaje representa una parte de cien' },
      { title: 'Probabilidad', items: ['●', '○', '○', '○'], note: 'Algunos resultados son más posibles que otros' },
      { title: 'Sólidos geométricos', items: ['▣', '△', '⚽'], note: 'Los sólidos ocupan un espacio' },
      { title: 'Resolver problemas', items: ['🔎', '→', '🧠', '→', '✅'], note: 'Comprende, calcula y comprueba la respuesta' },
    ],
  };
  const visual = visuals[periodId]?.[gameNumber];

  if (!visual) return null;

  return (
    <div className={`grade-five-visual grade-five-visual--period-${periodId}`} aria-label={`Ilustración: ${visual.title}`}>
      <strong>{visual.title}</strong>
      <div className="grade-five-visual__drawing">
        {visual.items.map((item, index) => (
          <span key={`${item}-${index}`}><VisualItem item={item} /></span>
        ))}
      </div>
      <small>{visual.note}</small>
    </div>
  );
}

function GradeFiveGame({ period, game, gameNumber, onBack, onNextGame }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [order, setOrder] = useState([]);
  const [coordinate, setCoordinate] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const { playSelection, playReset, playError, celebrate } = useGameEffects();

  const current = game.levels[levelIndex];
  const periodIcons = {
    1: Compass,
    2: Target,
    3: Lightbulb,
    4: Sparkles,
  };
  const PeriodIcon = periodIcons[period.id] ?? Compass;

  function resetLevel() {
    playReset();
    setAnswer('');
    setSelected(null);
    setPieces([]);
    setOrder([]);
    setCoordinate(null);
    setFeedback(null);
    setSolved(false);
    setMissionComplete(false);
  }

  function check(value) {
    const normalized = (item) => String(item).trim().replace(/\s+/g, '').replace('.', ',');
    const correct =
      game.type === 'build'
        ? pieces.reduce((sum, item) => sum + item, 0) === Number(current.answer)
        : game.type === 'order'
          ? order.join('|') === current.answer
          : game.type === 'grid'
            ? value === current.answer
          : normalized(value) === normalized(current.answer);

    if (correct) {
      setSolved(true);
      if (levelIndex === game.levels.length - 1) setMissionComplete(true);
      celebrate();
      setFeedback({ ok: true, text: `¡Bien hecho! ${current.explanation}` });
    } else {
      playError();
      setFeedback({ ok: false, text: `Todavía no. ${current.hint}` });
    }
  }

  if (missionComplete) {
    return (
      <motion.div
        className="game-complete-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles aria-hidden="true" size={64} />
        </motion.div>
        <h2>¡Misión completada!</h2>
        <p>Superaste los tres niveles de esta aventura.</p>
        <motion.button {...buttonMotion} className="game-secondary-button" type="button" onClick={resetLevel}>
          <RotateCcw aria-hidden="true" size={17} /> Repetir misión
        </motion.button>
        <motion.button {...buttonMotion} className="game-next-button" type="button" onClick={onNextGame}>
          Continuar <ArrowRight aria-hidden="true" size={17} />
        </motion.button>
      </motion.div>
    );
  }

  function next() {
    if (levelIndex === game.levels.length - 1) {
      onNextGame();
      return;
    }
    setLevelIndex((value) => value + 1);
    resetLevel();
  }

  return (
    <motion.main
      className="game-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="back-link game-back" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" size={18} /> Volver a las misiones
      </button>
      <div className="game-layout">
        <aside className="mission-intro">
          <span className="mission-icon" aria-hidden="true"><PeriodIcon /></span>
          <p className="page-eyebrow">PERIODO {period.id} · MISIÓN {gameNumber + 1}</p>
          <h1>{game.name}</h1>
          <div className="lesson-box">
            <h2><Eye aria-hidden="true" size={21} /> Mira y aprende</h2>
            <p>{game.concept}</p>
          </div>
          <p className="reward-hint"><Sparkles aria-hidden="true" size={18} /> Tres niveles para practicar y comprender.</p>
        </aside>
        <section className="challenge-card" aria-labelledby="fifth-challenge-title">
          <div className="game-heading-row">
            <h2 id="fifth-challenge-title"><Target aria-hidden="true" size={21} /> Tu desafío</h2>
            <span>Nivel {levelIndex + 1} de {game.levels.length}</span>
          </div>
          {period.id === 1 && <FirstPeriodVisual gameNumber={gameNumber} />}
          {period.id > 1 && period.id < 5 && (
            <GradeFivePeriodVisual periodId={period.id} gameNumber={gameNumber} />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${game.name}-${levelIndex}`}
              variants={levelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="challenge-prompt">{current.prompt}</p>
              <motion.div
                className="play-area"
                variants={shakeVariants}
                animate={feedback?.ok === false ? 'shake' : 'idle'}
              >
            {game.type === 'pick' && (
              <div className="mission-options">
                {current.options.map((option) => (
                  <motion.button
                    {...buttonMotion}
                    className={`token ${selected === option ? 'token--selected' : ''}`}
                    key={option}
                    type="button"
                    onClick={() => { playSelection(); setSelected(option); check(option); }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
            {game.type === 'input' && (
              <form className="game-input-form" onSubmit={(event) => {
                event.preventDefault();
                check(answer);
              }}>
                <label htmlFor="fifth-answer">Tu respuesta</label>
                <div className="game-input-row">
                  <input id="fifth-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} />
                  <motion.button {...buttonMotion} className="game-primary-button" type="submit">Comprobar</motion.button>
                </div>
              </form>
            )}
            {game.type === 'build' && (
              <>
                <p className="build-total">{pieces.reduce((sum, item) => sum + item, 0)} / {current.answer}</p>
                <div className="mission-options">
                  {current.options.map((value) => (
                    <motion.button {...buttonMotion} className="token" key={value} type="button" onClick={() => { playSelection(); setPieces((items) => [...items, value]); }}>
                      +{value}
                    </motion.button>
                  ))}
                </div>
                <div className="game-actions">
                  <motion.button {...buttonMotion} className="game-secondary-button" type="button" onClick={() => setPieces((items) => items.slice(0, -1))}>Quitar última</motion.button>
                  <motion.button {...buttonMotion} className="game-primary-button" type="button" onClick={() => check('')}>Comprobar construcción</motion.button>
                </div>
              </>
            )}
            {game.type === 'order' && (
              <>
                <p className="order-result">{order.length ? order.join(' → ') : 'Tu orden aparecerá aquí'}</p>
                <div className="mission-options">
                  {current.options.map((option) => (
                    <motion.button {...buttonMotion} className="token" key={option} type="button" disabled={order.includes(option)} onClick={() => { playSelection(); setOrder((items) => [...items, option]); }}>
                      {option}
                    </motion.button>
                  ))}
                </div>
                <motion.button {...buttonMotion} className="game-primary-button" type="button" onClick={() => check('')}>Comprobar orden</motion.button>
              </>
            )}
            {game.type === 'grid' && (
              <>
                <div className="coordinate-grid" aria-label="Cuadrícula de coordenadas">
                  {Array.from({ length: 25 }, (_, index) => {
                    const x = (index % 5) + 1;
                    const y = 5 - Math.floor(index / 5);
                    const value = `${x},${y}`;
                    return (
                      <motion.button
                        {...buttonMotion}
                        className={`coordinate-cell ${coordinate === value ? 'coordinate-cell--selected' : ''}`}
                        key={value}
                        type="button"
                        onClick={() => { playSelection(); setCoordinate(value); check(value); }}
                      >
                        ({value})
                      </motion.button>
                    );
                  })}
                </div>
              </>
            )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {feedback && (
            <motion.div
              className={`game-feedback game-feedback--${feedback.ok ? 'success' : 'error'}`}
              role="status"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {feedback.text}
            </motion.div>
          )}
          <div className="game-actions">
            <motion.button {...buttonMotion} className="game-secondary-button" type="button" onClick={resetLevel}>
              <RotateCcw aria-hidden="true" size={17} /> Reiniciar nivel
            </motion.button>
            {solved && (
              <motion.button {...buttonMotion} className="game-next-button" type="button" onClick={next}>
                {levelIndex === game.levels.length - 1 ? 'Terminar misión' : 'Siguiente nivel'}
                <ArrowRight aria-hidden="true" size={17} />
              </motion.button>
            )}
          </div>
        </section>
      </div>
    </motion.main>
  );
}

export default GradeFiveGame;
