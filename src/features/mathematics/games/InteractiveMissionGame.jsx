import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Eye,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { useGameEffects } from '../effects/useGameEffects.js';
import { buttonMotion, levelVariants, shakeVariants } from '../effects/motionVariants.js';

function InteractiveMissionGame({ mission, onBack, onNext }) {
  const [selected, setSelected] = useState([]);
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { playSelection, playReset, playError, celebrate } = useGameEffects();

  function toggle(index) {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
    setFeedback(null);
  }

  function reset() {
    playReset();
    setSelected([]);
    setChoice(null);
    setFeedback(null);
    setCompleted(false);
  }

  function checkAnswer(event) {
    event.preventDefault();
    const answer =
      mission.type === 'choice'
        ? choice === mission.answer
        : mission.type === 'position'
          ? selected.length === 1 && selected[0] === mission.answer - 1
          : mission.type === 'classify'
            ? selected.length === mission.answer.length &&
              mission.answer.every((item) => selected.includes(item))
            : selected.length === mission.answer;

    if (!answer) {
      playError();
      setFeedback({
        type: 'error',
        text: 'Todavía no se abre el camino. Revisa la explicación e inténtalo otra vez.',
      });
      return;
    }

    setCompleted(true);
    celebrate();
    setFeedback({
      type: 'success',
      text: '¡Misión superada! Ganaste una insignia, 20 puntos y 5 monedas. 🌟',
    });
  }

  const isSelectable = ['count', 'position', 'classify'].includes(mission.type);
  const periodIcons = {
    1: Compass,
    2: Target,
    3: Sparkles,
    4: Trophy,
  };
  const PeriodIcon = periodIcons[mission.period] ?? Compass;

  if (completed) {
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
          <Trophy aria-hidden="true" size={64} />
        </motion.div>
        <h2>¡Misión completada!</h2>
        <p>Ganaste una insignia, 20 puntos y 5 monedas.</p>
        <motion.button {...buttonMotion} className="game-secondary-button" type="button" onClick={reset}>
          <RotateCcw aria-hidden="true" size={17} /> Repetir misión
        </motion.button>
        <motion.button {...buttonMotion} className="game-next-button" type="button" onClick={onNext}>
          Siguiente misión <ArrowRight aria-hidden="true" size={17} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.main
      className="game-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="back-link game-back" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" size={18} /> Volver al mapa de misiones
      </button>

      <div className="game-layout">
        <aside className="mission-intro">
          <span className="mission-icon" aria-hidden="true"><PeriodIcon /></span>
          <p className="page-eyebrow">
            PERIODO {mission.period} · MISIÓN {mission.number}
          </p>
          <h1>{mission.title}</h1>
          <div className="lesson-box">
            <h2><Eye aria-hidden="true" size={21} /> Mira y aprende</h2>
            <p>{mission.lesson}</p>
          </div>
          <p className="reward-hint"><Trophy aria-hidden="true" size={18} /> Completa el reto: +20 puntos y +5 monedas</p>
        </aside>

        <section className="challenge-card" aria-labelledby="challenge-title">
          <h2 id="challenge-title"><Target aria-hidden="true" size={21} /> Tu desafío</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={mission.id}
              variants={levelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="challenge-prompt">{mission.prompt}</p>
              <motion.div
                className="play-area"
                variants={shakeVariants}
                animate={feedback?.type === 'error' ? 'shake' : 'idle'}
              >
            {isSelectable && (
              <div className="mission-options">
                {(mission.type === 'classify'
                  ? mission.visual
                  : Array.from({ length: mission.items }, (_, index) =>
                      mission.type === 'position'
                        ? `${index + 1} ${mission.object}`
                        : mission.object,
                    )
                ).map((item, index) => (
                  <motion.button
                    {...buttonMotion}
                    className={`token ${selected.includes(index) ? 'token--selected' : ''}`}
                    key={`${item}-${index}`}
                    type="button"
                    aria-pressed={selected.includes(index)}
                    onClick={() => { playSelection(); toggle(index); }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            )}

            {mission.type === 'fraction' && (
              <div className="fraction-options">
                {Array.from({ length: mission.parts }, (_, index) => (
                  <motion.button
                    {...buttonMotion}
                    className={`fraction-piece ${selected.includes(index) ? 'fraction-piece--selected' : ''}`}
                    key={index}
                    type="button"
                    aria-label={`Porción ${index + 1} de ${mission.parts}`}
                    aria-pressed={selected.includes(index)}
                    onClick={() => { playSelection(); toggle(index); }}
                  >
                    <Sparkles aria-hidden="true" size={24} />
                  </motion.button>
                ))}
              </div>
            )}

            {mission.type === 'choice' && (
              <>
                <div className="visual-row">
                  {mission.visual.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
                </div>
                <div className="mission-options">
                  {mission.options.map((option) => (
                    <motion.button
                      {...buttonMotion}
                      className={`token ${choice === option ? 'token--selected' : ''}`}
                      key={option}
                      type="button"
                      aria-pressed={choice === option}
                      onClick={() => { playSelection(); setChoice(option); setFeedback(null); }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </>
            )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={checkAnswer}>
            <div className="game-actions">
              <motion.button {...buttonMotion} className="game-primary-button" type="submit">
                Comprobar respuesta <Check aria-hidden="true" size={17} />
              </motion.button>
              <motion.button {...buttonMotion} className="game-secondary-button" type="button" onClick={reset}>
                <RotateCcw aria-hidden="true" size={17} /> Reiniciar
              </motion.button>
            </div>
          </form>

          {feedback && (
            <motion.div
              className={`game-feedback game-feedback--${feedback.type}`}
              role="status"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {feedback.text}
            </motion.div>
          )}

          {completed && (
            <motion.button {...buttonMotion} className="game-next-button" type="button" onClick={onNext}>
              Siguiente misión <ArrowRight aria-hidden="true" size={17} />
            </motion.button>
          )}
        </section>
      </div>
    </motion.main>
  );
}

export default InteractiveMissionGame;
