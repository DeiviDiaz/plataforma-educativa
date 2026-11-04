import React, { useState } from 'react';

// Ternas pitagóricas base para garantizar números enteros limpios
const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20]
];

export default function PythagorasGame() {
  const generateLevel = () => {
    const triple = TRIPLES[Math.floor(Math.random() * TRIPLES.length)];
    // Elegir al azar qué lado falta: 0 = cateto A, 1 = cateto B, 2 = hipotenusa C
    const missingIndex = Math.floor(Math.random() * 3);
    const targetValue = triple[missingIndex];

    // Opciones de respuesta incorrectas
    const wrong1 = targetValue + (Math.random() > 0.5 ? 2 : -1);
    const wrong2 = targetValue + (Math.random() > 0.5 ? 3 : -2);
    const wrong3 = targetValue + 4;

    const options = Array.from(new Set([targetValue, wrong1, wrong2, wrong3]))
      .filter((v) => v > 0)
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      a: missingIndex === 0 ? '?' : triple[0],
      b: missingIndex === 1 ? '?' : triple[1],
      c: missingIndex === 2 ? '?' : triple[2],
      missingIndex,
      targetValue,
      options
    };
  };

  const [problem, setProblem] = useState(generateLevel);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (val) => {
    if (val === problem.targetValue) {
      setScore((s) => s + 20);
      setFeedback('¡Correcto! Cumple a² + b² = c² 🎉');
      setTimeout(() => {
        setFeedback(null);
        setProblem(generateLevel());
      }, 700);
    } else {
      setLives((l) => l - 1);
      setFeedback(`Incorrecto. El valor exacto era ${problem.targetValue}`);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Fin del juego! 📐</h2>
        <p style={{ margin: '16px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score}</strong></p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setProblem(generateLevel());
          }}
        >
          Volver a intentar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📐 Pitágoras 8°</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Halla la medida del lado desconocido <strong>(?)</strong>:
        </p>

        {/* Gráfico SVG del Triángulo Rectángulo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <svg width="220" height="150" viewBox="0 0 220 150">
            {/* Triángulo */}
            <polygon points="30,120 180,120 30,30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            {/* Ángulo recto */}
            <rect x="30" y="105" width="15" height="15" fill="none" stroke="#0284c7" strokeWidth="2" />
            {/* Cateto A (vertical) */}
            <text x="8" y="80" fill="#0369a1" fontWeight="bold" fontSize="16">{problem.a}</text>
            {/* Cateto B (horizontal) */}
            <text x="100" y="140" fill="#0369a1" fontWeight="bold" fontSize="16">{problem.b}</text>
            {/* Hipotenusa C */}
            <text x="120" y="65" fill="#0369a1" fontWeight="bold" fontSize="16">{problem.c}</text>
          </svg>
        </div>

        <div style={styles.gridBtn}>
          {problem.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              style={styles.optionBtn}
            >
              ? = {opt}
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
  gridBtn: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' },
  optionBtn: { padding: '14px', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer' },
  card: { textAlign: 'center', padding: '32px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};