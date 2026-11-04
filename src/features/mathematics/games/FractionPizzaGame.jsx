import React, { useState } from 'react';

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

export default function FractionPizzaGame() {
  const generateLevel = () => {
    const isHeterogeneous = Math.random() > 0.35;

    if (isHeterogeneous) {
      const pairs = [
        { d1: 2, d2: 4 },
        { d1: 4, d2: 2 },
        { d1: 2, d2: 6 },
        { d1: 6, d2: 2 },
        { d1: 3, d2: 6 },
        { d1: 6, d2: 3 },
        { d1: 2, d2: 3 },
        { d1: 3, d2: 2 },
        { d1: 2, d2: 8 },
        { d1: 8, d2: 2 },
        { d1: 4, d2: 8 },
        { d1: 8, d2: 4 },
      ];

      const chosen = pairs[Math.floor(Math.random() * pairs.length)];
      const d1 = chosen.d1;
      const d2 = chosen.d2;
      const commonDen = lcm(d1, d2);

      const validCombos = [];
      for (let n1 = 1; n1 < d1; n1++) {
        for (let n2 = 1; n2 < d2; n2++) {
          const s1 = n1 * (commonDen / d1);
          const s2 = n2 * (commonDen / d2);
          if (s1 + s2 <= commonDen) {
            validCombos.push({ n1, n2, s1, s2, targetSlices: s1 + s2 });
          }
        }
      }

      const combo = validCombos[Math.floor(Math.random() * validCombos.length)] || {
        n1: 1,
        n2: 1,
        s1: 1,
        s2: 1,
        targetSlices: 2,
      };

      return {
        n1: combo.n1,
        d1,
        n2: combo.n2,
        d2,
        commonDen,
        targetSlices: combo.targetSlices,
        s1: combo.s1,
        s2: combo.s2,
        isHetero: true,
      };
    } else {
      const den = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
      const n1 = Math.floor(Math.random() * (den - 2)) + 1;
      const n2 = Math.floor(Math.random() * (den - n1)) + 1;
      return {
        n1,
        d1: den,
        n2,
        d2: den,
        commonDen: den,
        targetSlices: n1 + n2,
        s1: n1,
        s2: n2,
        isHetero: false,
      };
    }
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [selectedSlices, setSelectedSlices] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleToggleSlice = (sliceIndex) => {
    if (feedback) return;

    setSelectedSlices((prev) => {
      if (prev.includes(sliceIndex)) {
        return prev.filter((i) => i !== sliceIndex);
      } else {
        return [...prev, sliceIndex];
      }
    });
  };

  const checkAnswer = () => {
    if (feedback) return;

    const markedCount = selectedSlices.length;

    if (markedCount === level.targetSlices) {
      setScore((s) => s + 25);
      const div = gcd(level.targetSlices, level.commonDen);
      const simp = `${level.targetSlices / div}/${level.commonDen / div}`;

      setFeedback({
        type: 'success',
        text: `¡Correcto! ${level.n1}/${level.d1} + ${level.n2}/${level.d2} = ${level.targetSlices}/${level.commonDen} ${simp !== `${level.targetSlices}/${level.commonDen}` ? `(${simp})` : ''} 🍕`,
      });

      setTimeout(() => {
        setFeedback(null);
        setSelectedSlices([]);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 900);
    } else {
      setLives((l) => l - 1);
      const detalle = level.isHetero
        ? `(${level.n1}/${level.d1} = ${level.s1} porciones, ${level.n2}/${level.d2} = ${level.s2} porciones)`
        : '';
      setFeedback({
        type: 'error',
        text: `Pintaste ${markedCount} porciones. La suma requiere ${level.targetSlices} de ${level.commonDen} porciones ${detalle}.`,
      });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2>¡Fin del Taller de Fracciones! 🍕</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Rondas completadas: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setSelectedSlices([]);
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          Reiniciar Juego
        </button>
      </div>
    );
  }

  const sliceAngle = 360 / level.commonDen;

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🍕 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      {/* key={round} fuerza la regeneración limpia del DOM en cada nueva pregunta */}
      <div key={`board-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Suma Gráfica de Racionales
        </span>

        <div style={styles.equationRow}>
          <span style={styles.frac}>{level.n1}/{level.d1}</span>
          <span style={{ fontSize: '1.8rem', color: '#ea580c', fontWeight: 'bold' }}>+</span>
          <span style={styles.frac}>{level.n2}/{level.d2}</span>
          <span style={{ fontSize: '1.8rem', color: '#ea580c', fontWeight: 'bold' }}>=</span>
          <span style={styles.fracHighlight}>?/{level.commonDen}</span>
        </div>

        <p style={{ color: '#334155', margin: '4px 0 14px', fontSize: '0.95rem' }}>
          {level.isHetero ? (
            <span>Convierte al común denominador (<strong>{level.commonDen}</strong> partes) y pinta el total:</span>
          ) : (
            <span>Pinta en la pizza las porciones que resultan de la suma:</span>
          )}
        </p>

        {/* SVG de la Pizza */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width="220" height="220" viewBox="-105 -105 210 210">
            <circle cx="0" cy="0" r="92" fill="#fed7aa" stroke="#c2410c" strokeWidth="5" />

            {Array.from({ length: level.commonDen }).map((_, i) => {
              const startA = (i * sliceAngle - 90) * (Math.PI / 180);
              const endA = ((i + 1) * sliceAngle - 90) * (Math.PI / 180);
              const x1 = 86 * Math.cos(startA);
              const y1 = 86 * Math.sin(startA);
              const x2 = 86 * Math.cos(endA);
              const y2 = 86 * Math.sin(endA);

              const isSelected = selectedSlices.includes(i);
              const pathData = `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A 86 86 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

              return (
                <path
                  key={`slice-${level.commonDen}-${i}`}
                  d={pathData}
                  fill={isSelected ? '#ea580c' : '#fffbeb'}
                  stroke="#c2410c"
                  strokeWidth="2.5"
                  style={{
                    cursor: 'pointer',
                    transition: 'fill 0.15s ease',
                  }}
                  onClick={() => handleToggleSlice(i)}
                />
              );
            })}

            <circle cx="0" cy="0" r="5" fill="#c2410c" />
          </svg>
        </div>

        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ea580c', margin: '8px 0' }}>
          <span>Porciones marcadas: {selectedSlices.length} de {level.commonDen}</span>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          Comprobar Porciones
        </button>

        {feedback && (
          <div style={{
            marginTop: '14px',
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
  container: { maxWidth: '500px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  equationRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '12px 0' },
  frac: { fontSize: '1.7rem', fontWeight: '900', color: '#1e293b' },
  fracHighlight: { fontSize: '1.7rem', fontWeight: '900', color: '#ea580c' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#ea580c', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};