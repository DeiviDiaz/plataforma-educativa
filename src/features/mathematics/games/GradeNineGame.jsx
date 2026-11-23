import { useEffect, useMemo, useState } from 'react';
import { gradeNineGames, gradeNineInstructions } from '../data/grade-nine-games.js';

const close = (value, answer) =>
  value.trim() !== '' && Number.isFinite(Number(value.replace(',', '.')))
  && Math.abs(Number(value.replace(',', '.')) - answer) < 0.011;

function CartesianPlane({ question }) {
  const scale = 22;
  const center = 130;
  const toX = (x) => center + x * scale;
  const toY = (y) => center - y * scale;
  const points = [];

  if (question?.m != null) {
    for (let x = -5; x <= 5; x += 0.2) {
      const y = question.m * x + question.b;
      if (Math.abs(y) <= 7) points.push(`${toX(x)},${toY(y)}`);
    }
  }

  return (
    <svg className="grade-nine-plane" viewBox="0 0 260 260" role="img" aria-label="Plano cartesiano interactivo">
      {Array.from({ length: 11 }, (_, index) => (
        <g key={index}>
          <line x1={20 + index * 22} y1="20" x2={20 + index * 22} y2="240" />
          <line x1="20" y1={20 + index * 22} x2="240" y2={20 + index * 22} />
        </g>
      ))}
      <line x1="20" y1="130" x2="240" y2="130" className="grade-nine-plane__axis" />
      <line x1="130" y1="20" x2="130" y2="240" className="grade-nine-plane__axis" />
      <text x="242" y="126" className="grade-nine-plane__label">x</text>
      <text x="135" y="18" className="grade-nine-plane__label">y</text>
      {points.length > 0 && (
        <polyline points={points.join(' ')} className="grade-nine-plane__line" />
      )}
    </svg>
  );
}

function Matrix({ question }) {
  if (question.matrix) {
    return (
      <div className="grade-nine-matrix grade-nine-matrix--3">
        {question.matrix.map((value, index) => (
          <span key={`${value}-${index}`}>{value}</span>
        ))}
      </div>
    );
  }
  if (question.a != null) {
    return (
      <div className="grade-nine-matrix grade-nine-matrix--2" aria-label="Matriz 2 por 2">
        <span>{question.a}</span><span>{question.b}</span>
        <span>{question.c}</span><span>{question.d}</span>
      </div>
    );
  }
  return null;
}

function TriangleVisual({ question }) {
  if (question.triple) {
    const [a, b] = question.triple;
    const scale = 18;
    return (
      <svg className="grade-nine-shape" viewBox="0 0 260 145" role="img" aria-label="Triángulo rectángulo">
        <path d={`M35 120 L${35 + b * scale} 120 L35 ${120 - a * scale} Z`} />
        <path d="M35 106 H49 V120" className="grade-nine-shape__right-angle" />
      </svg>
    );
  }
  return null;
}

function ProbabilityVisual({ question }) {
  const [rolls, setRolls] = useState([]);

  return (
    <div className="grade-nine-probability">
      <div className="grade-nine-dice" aria-live="polite">
        {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][rolls.at(-1) ? rolls.at(-1) - 1 : 0]}
      </div>
      <button type="button" onClick={() => setRolls((items) => [...items, rand(1, 6)])}>
        Lanzar dado
      </button>
      <p>Espacio muestral: 1, 2, 3, 4, 5, 6</p>
      {rolls.length > 0 && (
        <p>Últimos resultados: {rolls.slice(-12).join(' · ')}</p>
      )}
      {question.threshold != null && (
        <p>Umbral actual: mayor que {question.threshold}</p>
      )}
    </div>
  );
}

function TreeVisual({ question }) {
  const [selected, setSelected] = useState('C');
  return (
    <div className="grade-nine-tree">
      <svg viewBox="0 0 310 160" role="img" aria-label="Diagrama de árbol de lanzamientos">
        <circle cx="20" cy="80" r="7" />
        {[0, 1].map((first) => (
          <g key={first}>
            <line x1="27" y1="80" x2="105" y2={40 + first * 80} />
            <text x="110" y={45 + first * 80}>{first ? 'S' : 'C'}</text>
            {[0, 1].map((second) => (
              <g key={second}>
                <line x1="130" y1={40 + first * 80} x2="225" y2={20 + first * 80 + second * 35} />
                <text x="233" y={25 + first * 80 + second * 35}>
                  {first ? 'S' : 'C'}{second ? 'S' : 'C'}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
      <div className="grade-nine-options">
        {['C', 'S'].map((option) => (
          <button
            type="button"
            key={option}
            className={selected === option ? 'is-selected' : ''}
            aria-pressed={selected === option}
            onClick={() => setSelected(option)}
          >
            {option === 'C' ? 'Cara' : 'Sello'}
          </button>
        ))}
      </div>
    </div>
  );
}

function GradeNineGame({ topicId, onBack }) {
  const game = useMemo(
    () => gradeNineGames.find((item) => item.id === topicId) ?? gradeNineGames[0],
    [topicId],
  );
  const [question, setQuestion] = useState(() => game.make());
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [extraValue, setExtraValue] = useState(1);

  useEffect(() => {
    setQuestion(game.make());
    setRound(1);
    setScore(0);
    setValue('');
    setFeedback(null);
    setCompleted(false);
    setExtraValue(1);
  }, [game]);

  const checkAnswer = () => {
    if (value.trim() === '') {
      setFeedback({ type: 'error', text: 'Escribe una respuesta antes de comprobar.' });
      return;
    }
    const correct = close(value, question.answer);
    setFeedback({
      type: correct ? 'success' : 'error',
      text: correct
        ? `¡Correcto! ${question.explain}`
        : `Todavía no. ${question.hint || 'Revisa la operación y vuelve a intentar.'}`,
    });
    if (correct) setScore((current) => current + 10);
  };

  const nextRound = () => {
    setQuestion(game.make());
    setRound((current) => current + 1);
    setValue('');
    setFeedback(null);
  };

  const resetGame = () => {
    setQuestion(game.make());
    setRound(1);
    setScore(0);
    setValue('');
    setFeedback(null);
  };

  return (
    <section className="grade-nine-game">
      <aside className="grade-nine-game__side">
        <span className="grade-nine-game__symbol" aria-hidden="true">
          {topicId === 'grado9-1' ? 'ax+b' : topicId === 'grado9-2' ? '⌖' : topicId === 'grado9-15' ? '🎲' : '∑'}
        </span>
        <p className="grade-nine-game__period">MINIJUEGO · {String(round).padStart(2, '0')}</p>
        <h2>{game.title}</h2>
        <div className="grade-nine-instructions">
          <span className="mini-label">Qué debes lograr</span>
          <p>{gradeNineInstructions[game.id].objective}</p>
        </div>
        <div className="grade-nine-instructions">
          <span className="mini-label">Cómo hacerlo</span>
          <ol>
            {gradeNineInstructions[game.id].steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="grade-nine-instructions grade-nine-instructions--learning">
          <span className="mini-label">Explicación y ejemplo</span>
          <p>{gradeNineInstructions[game.id].explanation}</p>
          <p className="grade-nine-example">
            <strong>Ejemplo:</strong> {gradeNineInstructions[game.id].example.replace(/^Ejemplo:\s*/, '')}
          </p>
        </div>
        <div className="grade-nine-side-stats">
          <div><strong>{score}</strong><span>Puntos</span></div>
          <div><strong>{round}</strong><span>Ronda</span></div>
        </div>
      </aside>

      <div className="grade-nine-game__main">
        <div className="grade-nine-game__progress" aria-label={`Ronda ${round}`}>
          <span style={{ width: `${Math.min(100, round * 12.5)}%` }} />
        </div>

        <div className="grade-nine-challenge">
          <strong>{question.prompt}</strong>
          {question.sub && <p>{question.sub}</p>}
        </div>

        {(game.id === 'grado9-2' || game.id === 'grado9-8' || game.id === 'grado9-9' || game.id === 'grado9-10' || game.id === 'grado9-11') && (
          <div className="grade-nine-visual">
            {game.id === 'grado9-2' && (
              <CartesianPlane question={{ m: question.slope, b: question.intercept }} />
            )}
            {game.id === 'grado9-8' && (
              <CartesianPlane question={{ m: question.m, b: question.b }} />
            )}
            {game.id === 'grado9-9' && (
              <div className="grade-nine-parabola" aria-label="Parábola cuadrática">
                y = {question.a}(x − ({question.h}))² {question.k < 0 ? '−' : '+'} {Math.abs(question.k)}
              </div>
            )}
            {game.id === 'grado9-10' && (
              <div className="grade-nine-exponential">f(x) = {question.base}ˣ</div>
            )}
            {game.id === 'grado9-11' && (
              <div className="grade-nine-exponential">
                log<sub>{question.base}</sub>({question.base ** question.power}) = x
              </div>
            )}
          </div>
        )}

        {game.id === 'grado9-4' && <Matrix question={question} />}
        {game.id === 'grado9-5' && <Matrix question={question} />}
        {game.id === 'grado9-13' && <TriangleVisual question={question} />}
        {game.id === 'grado9-15' && <ProbabilityVisual question={question} />}
        {game.id === 'grado9-16' && <TreeVisual question={question} />}

        {(game.id === 'grado9-12' || game.id === 'grado9-13' || game.id === 'grado9-14') && (
          <div className="grade-nine-range">
            <label htmlFor="grade-nine-explore">
              Explora: <strong>{extraValue}</strong>
            </label>
            <input
              id="grade-nine-explore"
              type="range"
              min="1"
              max="5"
              step="1"
              value={extraValue}
              onChange={(event) => setExtraValue(Number(event.target.value))}
            />
          </div>
        )}

        {feedback && (
          <div className={`grade-nine-feedback grade-nine-feedback--${feedback.type}`} role="status">
            {feedback.text}
          </div>
        )}

        <form className="grade-nine-answer" onSubmit={(event) => { event.preventDefault(); checkAnswer(); }}>
          <label htmlFor="grade-nine-answer">
            Tu respuesta
            <input
              id="grade-nine-answer"
              type="number"
              step="any"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
          <button type="submit">Comprobar respuesta</button>
        </form>

        <div className="grade-nine-game__actions">
          <button type="button" onClick={nextRound}>Siguiente reto</button>
          <button type="button" onClick={resetGame}>Reiniciar juego</button>
          {onBack && <button type="button" onClick={onBack}>Volver al periodo</button>}
        </div>
      </div>
    </section>
  );
}

export default GradeNineGame;
