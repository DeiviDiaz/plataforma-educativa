import React, { useState } from 'react';

export default function LinearFunctionGame() {
  const generateLevel = () => {
    // Pendiente m (positiva o negativa, nunca 0)
    const mValues = [-3, -2, -1, 1, 2, 3];
    const m = mValues[Math.floor(Math.random() * mValues.length)];
    // Punto de corte b
    const b = Math.floor(Math.random() * 9) - 4; // entre -4 y 4

    // Elegir tipo de pregunta
    const type = Math.random() > 0.5 ? 'slope' : 'intercept';

    let question = '';
    let correctAnswer = '';
    let options = [];

    if (type === 'slope') {
      question = '¿Cuál es la PENDIENTE (m) de esta recta?';
      correctAnswer = `${m}`;
      options = [correctAnswer, `${-m}`, `${m + 1}`, `${b}`];
    } else {
      question = '¿En qué punto corta al eje Y (intercepto b)?';
      correctAnswer = `(0, ${b})`;
      options = [correctAnswer, `(0, ${-b})`, `(${b}, 0)`, `(0, ${m})`];
    }

    const uniqueOptions = Array.from(new Set(options)).slice(0, 4).sort(() => Math.random() - 0.5);

    return { m, b, question, correctAnswer, options: uniqueOptions };
  };

  const [level, setLevel] = useState(generateLevel);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (ans) => {
    if (ans === level.correctAnswer) {
      setScore((s) => s + 20);
      setFeedback('¡Correcto! Análisis de función acertado 📈');
      setTimeout(() => {
        setFeedback(null);
        setLevel(generateLevel());
      }, 700);
    } else {
      setLives((l) => l - 1);
      setFeedback(`Incorrecto. La respuesta era: ${level.correctAnswer}`);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Simulación finalizada! 📈</h2>
        <p style={{ margin: '16px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score}</strong></p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setLevel(generateLevel());
          }}
        >
          Reiniciar
        </button>
      </div>
    );
  }

  const funcStr = `y = ${level.m === 1 ? '' : level.m === -1 ? '-' : level.m}x ${level.b >= 0 ? '+ ' + level.b : '- ' + Math.abs(level.b)}`;

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📈 Funciones 9°</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>ECUACIÓN DE LA RECTA</span>
        <div style={styles.functionBadge}>{funcStr}</div>

        <p style={{ color: '#334155', fontWeight: '600', margin: '14px 0' }}>{level.question}</p>

        <div style={styles.gridBtn}>
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              style={styles.optionBtn}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p style={{
            marginTop: '16px',
            fontWeight: 'bold',
            color: feedback.startsWith('¡') ? '#16a34a' : '#dc2626'
          }}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '480px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  functionBadge: { fontSize: '2.2rem', fontWeight: '900', color: '#7c3aed', margin: '10px 0', letterSpacing: '1px' },
  gridBtn: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' },
  optionBtn: { padding: '14px', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer' },
  card: { textAlign: 'center', padding: '32px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};