// src/features/mathematics/games/AlgebraScaleGame.jsx
import React, { useState } from 'react';

export default function AlgebraScaleGame({ onFinish }) {
  // Genera un reto de la forma: a * x + b = c
  const generateLevel = () => {
    const a = Math.floor(Math.random() * 3) + 1; // 1, 2 o 3
    const x = Math.floor(Math.random() * 8) + 1; // incógnita entre 1 y 8
    const b = Math.floor(Math.random() * 10) + 1; // término independiente
    const c = a * x + b;
    return { a, b, c, targetX: x };
  };

  const [problem, setProblem] = useState(generateLevel);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericGuess = parseInt(userGuess, 10);

    if (numericGuess === problem.targetX) {
      setScore((s) => s + 15 + streak * 5);
      setStreak((st) => st + 1);
      setFeedback('¡Correcto! La balanza está equilibrada 🎉');
      setTimeout(() => {
        setFeedback(null);
        setUserGuess('');
        setProblem(generateLevel());
      }, 900);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
      setFeedback(`Incorrecto. Si x = ${numericGuess}, ${problem.a > 1 ? problem.a + '·' + numericGuess : numericGuess} + ${problem.b} = ${problem.a * numericGuess + problem.b} (no da ${problem.c})`);
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Fin del Desafío! ⚖️</h2>
        <p style={{ fontSize: '1.2rem', margin: '14px 0' }}>Puntaje final: <strong>{score}</strong></p>
        <button
          style={styles.btnPrimary}
          onClick={() => {
            setLives(3);
            setScore(0);
            setStreak(0);
            setProblem(generateLevel());
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  const equationStr = `${problem.a > 1 ? problem.a : ''}x + ${problem.b} = ${problem.c}`;

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🔥 Racha: {streak}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Encuentra el valor de <strong>x</strong> para equilibrar la igualdad:</p>
        <div style={styles.equationBadge}>{equationStr}</div>

        {/* Representación conceptual de balanza */}
        <div style={styles.scaleContainer}>
          <div style={styles.scalePlate}>
            <span style={{ fontSize: '1rem', color: '#1e293b' }}>
              Plato Izquierdo<br />
              <strong>{problem.a > 1 ? `${problem.a} cajas (x)` : '1 caja (x)'} + {problem.b} kg</strong>
            </span>
          </div>
          <div style={{ fontSize: '2rem' }}>⚖️</div>
          <div style={styles.scalePlate}>
            <span style={{ fontSize: '1rem', color: '#1e293b' }}>
              Plato Derecho<br />
              <strong>{problem.c} kg</strong>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: 'bold' }}>
            ¿Cuánto pesa cada caja (x)?
          </label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Valor de x"
              style={styles.input}
              required
              autoFocus
            />
            <button type="submit" style={styles.btnPrimary}>Comprobar</button>
          </div>
        </form>

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
  container: { maxWidth: '520px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  equationBadge: { fontSize: '2rem', fontWeight: '900', color: '#2563eb', margin: '14px 0', letterSpacing: '1px' },
  scaleContainer: { display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '20px 0', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px' },
  scalePlate: { flex: 1, padding: '10px', backgroundColor: '#e2e8f0', borderRadius: '10px', margin: '0 8px' },
  form: { marginTop: '16px' },
  input: { width: '130px', padding: '10px', fontSize: '1.2rem', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center' },
  btnPrimary: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  card: { textAlign: 'center', padding: '32px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
};