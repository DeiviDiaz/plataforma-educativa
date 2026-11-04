import React, { useState, useEffect } from 'react';

export default function UniversalTopicEngine({ generatorFn, topicTitle }) {
  const [level, setLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);


const nextChallenge = () => {
  if (typeof generatorFn !== 'function') return;

  let newLevel = generatorFn();
  let attempts = 0;

  // Si genera la misma pregunta de la ronda anterior, vuelve a tirar (hasta 10 intentos)
  while (level && newLevel.prompt === level.prompt && attempts < 10) {
    newLevel = generatorFn();
    attempts++;
  }

  setLevel(newLevel);
};
  useEffect(() => {
    nextChallenge();
    setScore(0);
    setLives(3);
    setStreak(0);
  }, [generatorFn]);

  const handleSelect = (option) => {
    if (!level) return;

    if (option === level.correct) {
      setScore((s) => s + 15 + streak * 5);
      setStreak((st) => st + 1);
      setFeedback({ type: 'success', msg: '¡Excelente! ' + (level.explanation || '') });
      setTimeout(() => {
        setFeedback(null);
        nextChallenge();
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
      setFeedback({
        type: 'error',
        msg: `Incorrecto. La respuesta era: "${level.correct}". ${level.explanation || ''}`
      });
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  if (!level) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Cargando desafío...</div>;
  }

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Ronda Terminada! 🎯</h2>
        <p style={{ fontSize: '1.2rem', margin: '12px 0' }}>Puntaje: <strong>{score}</strong> pts</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setStreak(0);
            nextChallenge();
          }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🔥 Racha: {streak}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <span style={styles.category}>{level.title || topicTitle}</span>
        <h3 style={styles.promptText}>{level.prompt}</h3>

        <div style={styles.gridBtn}>
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              style={styles.optionBtn}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div style={{
            marginTop: '18px',
            padding: '12px',
            borderRadius: '10px',
            fontWeight: '600',
            backgroundColor: feedback.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: feedback.type === 'success' ? '#166534' : '#991b1b'
          }}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '540px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  category: { fontSize: '0.85rem', color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
  promptText: { fontSize: '1.25rem', color: '#1e293b', margin: '14px 0 24px 0', lineHeight: 1.4, whiteSpace: 'pre-line' },
  gridBtn: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  optionBtn: { padding: '14px 10px', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.15s ease' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)', maxWidth: '400px', margin: '0 auto' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};