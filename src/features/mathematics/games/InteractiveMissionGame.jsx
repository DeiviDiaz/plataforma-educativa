import { useState } from 'react';

function InteractiveMissionGame({ mission, onBack, onNext }) {
  const [selected, setSelected] = useState([]);
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  function toggle(index) {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
    setFeedback(null);
  }

  function reset() {
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
      setFeedback({
        type: 'error',
        text: 'Todavía no se abre el camino. Revisa la explicación e inténtalo otra vez.',
      });
      return;
    }

    setCompleted(true);
    setFeedback({
      type: 'success',
      text: '¡Misión superada! Ganaste una insignia, 20 puntos y 5 monedas. 🌟',
    });
  }

  const isSelectable = ['count', 'position', 'classify'].includes(mission.type);

  return (
    <main className="game-page">
      <button className="back-link game-back" type="button" onClick={onBack}>
        ← Volver al mapa de misiones
      </button>

      <div className="game-layout">
        <aside className="mission-intro">
          <span className="mission-icon" aria-hidden="true">{mission.icon}</span>
          <p className="page-eyebrow">
            PERIODO {mission.period} · MISIÓN {mission.number}
          </p>
          <h1>{mission.title}</h1>
          <div className="lesson-box">
            <h2>👀 Mira y aprende</h2>
            <p>{mission.lesson}</p>
          </div>
          <p className="reward-hint">🏅 Completa el reto: +20 puntos y +5 monedas</p>
        </aside>

        <section className="challenge-card" aria-labelledby="challenge-title">
          <h2 id="challenge-title">🎯 Tu desafío</h2>
          <p className="challenge-prompt">{mission.prompt}</p>
          <div className="play-area">
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
                  <button
                    className={`token ${selected.includes(index) ? 'token--selected' : ''}`}
                    key={`${item}-${index}`}
                    type="button"
                    aria-pressed={selected.includes(index)}
                    onClick={() => toggle(index)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {mission.type === 'fraction' && (
              <div className="fraction-options">
                {Array.from({ length: mission.parts }, (_, index) => (
                  <button
                    className={`fraction-piece ${selected.includes(index) ? 'fraction-piece--selected' : ''}`}
                    key={index}
                    type="button"
                    aria-label={`Porción ${index + 1} de ${mission.parts}`}
                    aria-pressed={selected.includes(index)}
                    onClick={() => toggle(index)}
                  >
                    🍕
                  </button>
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
                    <button
                      className={`token ${choice === option ? 'token--selected' : ''}`}
                      key={option}
                      type="button"
                      aria-pressed={choice === option}
                      onClick={() => { setChoice(option); setFeedback(null); }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <form onSubmit={checkAnswer}>
            <div className="game-actions">
              <button className="game-primary-button" type="submit">Comprobar respuesta ✓</button>
              <button className="game-secondary-button" type="button" onClick={reset}>Reiniciar</button>
            </div>
          </form>

          {feedback && (
            <div className={`game-feedback game-feedback--${feedback.type}`} role="status">
              {feedback.text}
            </div>
          )}

          {completed && (
            <button className="game-next-button" type="button" onClick={onNext}>
              Siguiente misión →
            </button>
          )}
        </section>
      </div>
    </main>
  );
}

export default InteractiveMissionGame;
