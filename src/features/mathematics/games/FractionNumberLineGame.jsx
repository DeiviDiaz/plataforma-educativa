import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function FractionNumberLineGame() {
  const generateLevel = () => {
    const den = [2, 3, 4, 5][rand(0, 3)];
    const num = rand(1, den * 2); // Fracciones propias o impropias hasta 2
    return { num, den, targetVal: num / den };
  };

  const [level, setLevel] = useState(generateLevel);
  const [selectedTick, setSelectedTick] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  // Total de subdivisiones entre 0 y 2
  const totalSubdivisions = level.den * 2;
  const step = 2 / totalSubdivisions;

  const handleSelectTick = (index) => {
    if (feedback) return;
    const value = index * step;
    setSelectedTick(index);

    if (index === level.num) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Excelente! Ubicaste exactamente ${level.num}/${level.den} en la recta 🎯`,
      });
      setTimeout(() => {
        setFeedback(null);
        setSelectedTick(null);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Ese punto es ${index}/${level.den}. Contaste ${index} partes de ${level.den}.`,
      });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Fin del Juego en la Recta! 📏</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Rondas logradas: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setSelectedTick(null);
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          Reiniciar
        </button>
      </div>
    );
  }

  // Dimensiones del SVG
  const svgWidth = 360;
  const startX = 30;
  const endX = 330;
  const lineLength = endX - startX;
  const toX = (val) => startX + (val / 2) * lineLength;

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🎯 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>
          UBICACIÓN DE RACIONALES
        </span>

        <div style={styles.fractionTarget}>
          <span>{level.num}</span>
          <div style={styles.fractionBar} />
          <span>{level.den}</span>
        </div>

        <p style={{ color: '#334155', margin: '8px 0 16px', fontSize: '0.95rem' }}>
          Haz clic o toca la marca en la recta donde se ubica exactamente <strong>{level.num}/{level.den}</strong>:
        </p>

        {/* Recta Interactiva SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width={svgWidth} height="120" viewBox={`0 0 ${svgWidth} 120`}>
            {/* Eje principal */}
            <line x1={startX} y1="60" x2={endX} y2="60" stroke="#94a3b8" strokeWidth="4" />

            {/* Marcas de enteros: 0, 1, 2 */}
            {[0, 1, 2].map((entero) => {
              const xPos = toX(entero);
              return (
                <g key={`entero-${entero}`}>
                  <line x1={xPos} y1="45" x2={xPos} y2="75" stroke="#1e293b" strokeWidth="3" />
                  <text x={xPos} y="98" fontSize="15" textAnchor="middle" fill="#0f172a" fontWeight="800">
                    {entero}
                  </text>
                </g>
              );
            })}

            {/* Subdivisiones interactivas clickeables */}
            {Array.from({ length: totalSubdivisions + 1 }).map((_, i) => {
              const xPos = toX(i * step);
              const isSelected = selectedTick === i;
              const isWhole = i % level.den === 0;

              return (
                <g
                  key={`tick-${i}`}
                  onClick={() => handleSelectTick(i)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Área táctil invisible amplia */}
                  <rect x={xPos - 12} y="25" width="24" height="60" fill="transparent" />

                  {/* Marca pequeña si no es entero */}
                  {!isWhole && (
                    <line x1={xPos} y1="52" x2={xPos} y2="68" stroke="#3b82f6" strokeWidth="2.5" />
                  )}

                  {/* Botón interactivo sobre la marca */}
                  <circle
                    cx={xPos}
                    y="60"
                    r={isSelected ? 8 : 5}
                    fill={isSelected ? '#ef4444' : '#ffffff'}
                    stroke={isSelected ? '#b91c1c' : '#2563eb'}
                    strokeWidth="2.5"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          💡 Pista: Cada unidad entera está dividida en <strong>{level.den}</strong> partes iguales.
        </p>

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
  container: { maxWidth: '500px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  fractionTarget: { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.8rem', fontWeight: '900', color: '#2563eb', margin: '6px 0' },
  fractionBar: { width: '38px', height: '3px', backgroundColor: '#2563eb', margin: '2px 0' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};