import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function ProportionRecipeGame() {
  const generateLevel = () => {
    const a = rand(2, 5); // Base rojo
    const b = rand(3, 6); // Base azul
    const k = rand(2, 5); // Factor multiplicador
    const c = a * k;      // Rojo ampliado
    const targetX = b * k; // Azul requerido

    return { a, b, c, k, targetX };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [currentDrops, setCurrentDrops] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleAdjust = (delta) => {
    if (feedback) return;
    setCurrentDrops((prev) => Math.max(0, Math.min(prev + delta, 40)));
  };

  const checkAnswer = () => {
    if (feedback) return;

    if (currentDrops === level.targetX) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Poción perfecta! La proporción es x${level.k}: (${level.a} / ${level.b} = ${level.c} / ${level.targetX}) ✨`,
      });
      setTimeout(() => {
        setFeedback(null);
        setCurrentDrops(0);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Mezclaste ${currentDrops} frascos. Para mantener la proporción ${level.a}:${level.b} con ${level.c} rojos, necesitabas ${level.targetX} azules.`,
      });
      setTimeout(() => setFeedback(null), 1600);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2>¡Caldero Desbordado! 🧪</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Pociones logradas: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setCurrentDrops(0);
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          Reiniciar Laboratorio
        </button>
      </div>
    );
  }

  // Altura del líquido en el caldero SVG según los frascos agregados
  const liquidFillY = Math.max(20, 110 - (currentDrops / Math.max(level.targetX * 1.5, 15)) * 80);

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🧪 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Laboratorio de Razones y Proporciones
        </span>

        {/* Tarjeta de Receta */}
        <div style={styles.recipeCard}>
          <div style={{ fontSize: '0.95rem', color: '#475569' }}>Receta Maestra:</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>
            {level.a} 🔴 Frascos Rubí  ⇄  {level.b} 🔵 Frascos Zafiro
          </div>
          <div style={{ fontSize: '0.9rem', color: '#2563eb', fontWeight: '600' }}>
            Razón: {level.a} / {level.b}
          </div>
        </div>

        <p style={{ color: '#334155', margin: '8px 0 10px', fontSize: '0.95rem' }}>
          Se vertieron <strong>{level.c} frascos Rubí 🔴</strong> en el caldero grande.<br />
          ¿Cuántos frascos Zafiro 🔵 debes verter para mantener la proporción?
        </p>

        {/* Caldero SVG Interactivo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <svg width="220" height="140" viewBox="0 0 220 140">
            {/* Cuerpo del caldero */}
            <ellipse cx="110" cy="125" rx="75" ry="12" fill="#0f172a" opacity="0.2" />
            <path
              d="M 45 40 Q 30 90 60 120 Q 110 135 160 120 Q 190 90 175 40 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="4"
            />
            {/* Cuello y borde */}
            <ellipse cx="110" cy="40" rx="65" ry="12" fill="#334155" stroke="#0f172a" strokeWidth="3" />

            {/* Líquido mágico adentro */}
            <clipPath id="calderoClip">
              <path d="M 45 42 Q 30 90 60 120 Q 110 135 160 120 Q 190 90 175 42 Z" />
            </clipPath>
            <rect
              x="30"
              y={liquidFillY}
              width="160"
              height="100"
              fill="url(#liquidGrad)"
              clipPath="url(#calderoClip)"
            />
            {/* Superficie del líquido */}
            <ellipse
              cx="110"
              cy={liquidFillY + 2}
              rx="55"
              ry="8"
              fill="#60a5fa"
              clipPath="url(#calderoClip)"
              opacity="0.8"
            />

            <defs>
              <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>

            {/* Burbujas decorativas */}
            <circle cx="95" cy={liquidFillY + 15} r="3" fill="#93c5fd" opacity="0.7" />
            <circle cx="125" cy={liquidFillY + 25} r="4" fill="#93c5fd" opacity="0.6" />
          </svg>
        </div>

        {/* Controles de frascos */}
        <div style={styles.controlsRow}>
          <button style={styles.counterBtn} onClick={() => handleAdjust(-5)}>-5</button>
          <button style={styles.counterBtn} onClick={() => handleAdjust(-1)}>-1</button>

          <div style={styles.displayPill}>
            <span style={{ fontSize: '1.4rem' }}>🔵</span>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#1d4ed8' }}>{currentDrops}</span>
          </div>

          <button style={styles.counterBtn} onClick={() => handleAdjust(1)}>+1</button>
          <button style={styles.counterBtn} onClick={() => handleAdjust(5)}>+5</button>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          Comprobar Mezcla
        </button>

        {feedback && (
          <div style={{
            marginTop: '12px',
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 'bold',
            backgroundColor: feedback.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: feedback.type === 'success' ? '#15803d' : '#b91c1c'
          }}>
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '520px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  recipeCard: { backgroundColor: '#eff6ff', border: '2px dashed #93c5fd', borderRadius: '14px', padding: '12px', margin: '10px auto', maxWidth: '380px' },
  controlsRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '14px 0' },
  counterBtn: { width: '44px', height: '44px', borderRadius: '12px', border: '2px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  displayPill: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#dbeafe', padding: '6px 20px', borderRadius: '14px', minWidth: '100px', justifyContent: 'center' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '6px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};