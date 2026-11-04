import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function PercentageTankGame() {
  const generateLevel = () => {
    // Capacidades totales redondas
    const totalCapacity = [100, 150, 200, 250, 300, 400][rand(0, 5)];
    // Porcentajes amigables
    const percent = [10, 20, 25, 30, 40, 50, 60, 75, 80][rand(0, 8)];
    const targetValue = Math.round((totalCapacity * percent) / 100);

    return { totalCapacity, percent, targetValue };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [injectedValue, setInjectedValue] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleAdjust = (delta) => {
    if (feedback) return;
    setInjectedValue((prev) => Math.max(0, Math.min(prev + delta, level.totalCapacity)));
  };

  const checkAnswer = () => {
    if (feedback) return;

    if (injectedValue === level.targetValue) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Batería calibrada! El ${level.percent}% de ${level.totalCapacity} es exactamente ${level.targetValue} kWh ⚡`,
      });
      setTimeout(() => {
        setFeedback(null);
        setInjectedValue(0);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Inyectaste ${injectedValue} kWh. Cálculo: (${level.percent} × ${level.totalCapacity}) / 100 = ${level.targetValue} kWh.`,
      });
      setTimeout(() => setFeedback(null), 1600);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2>¡Falla de Sobrecarga! ⚡</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Baterías cargadas: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setInjectedValue(0);
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          Reiniciar Batería
        </button>
      </div>
    );
  }

  // Progreso visual de la batería (0% a 100%)
  const currentPctOfTotal = ((injectedValue / level.totalCapacity) * 100).toFixed(0);
  const barHeight = 110;
  const fillPixels = (injectedValue / level.totalCapacity) * barHeight;

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>⚡ Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Tanto Por Ciento de una Cantidad
        </span>

        {/* Desafío Central */}
        <div style={styles.challengeBox}>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>MISIÓN DE CARGA</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#059669', margin: '4px 0' }}>
            Inyectar el {level.percent}%
          </div>
          <div style={{ fontSize: '1rem', color: '#334155' }}>
            de la capacidad total: <strong>{level.totalCapacity} kWh</strong>
          </div>
        </div>

        {/* Gráfico SVG de Batería Cilíndrica */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width="120" height="150" viewBox="0 0 120 150">
            {/* Terminales de la batería */}
            <rect x="50" y="8" width="20" height="10" rx="3" fill="#64748b" />

            {/* Contenedor cilíndrico */}
            <rect x="25" y="18" width="70" height="120" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="4" />

            {/* Relleno de energía brillante */}
            <clipPath id="batteryInnerClip">
              <rect x="29" y="22" width="62" height="112" rx="10" />
            </clipPath>

            <rect
              x="29"
              y={22 + (barHeight - fillPixels)}
              width="62"
              height={fillPixels}
              fill="url(#energyGrad)"
              clipPath="url(#batteryInnerClip)"
            />

            {/* Marcas de porcentaje en la batería (25%, 50%, 75%) */}
            {[0.25, 0.5, 0.75].map((pct, i) => (
              <line
                key={i}
                x1="32"
                y1={22 + barHeight * (1 - pct)}
                x2="88"
                y2={22 + barHeight * (1 - pct)}
                stroke="#475569"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
            ))}

            <defs>
              <linearGradient id="energyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Controles interactivos de inyección */}
        <div style={{ margin: '8px auto', maxWidth: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
            <button style={styles.stepBtn} onClick={() => handleAdjust(-10)}>-10</button>
            <button style={styles.stepBtn} onClick={() => handleAdjust(-1)}>-1</button>
            <button style={styles.stepBtn} onClick={() => handleAdjust(1)}>+1</button>
            <button style={styles.stepBtn} onClick={() => handleAdjust(10)}>+10</button>
          </div>

          <input
            type="range"
            min="0"
            max={level.totalCapacity}
            step="1"
            value={injectedValue}
            onChange={(e) => setInjectedValue(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />

          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#059669', marginTop: '6px' }}>
            {injectedValue} kWh ({currentPctOfTotal}%)
          </div>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          Inyectar Carga a la Red
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
  challengeBox: { backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '14px', padding: '12px', margin: '8px auto', maxWidth: '360px' },
  stepBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold', cursor: 'pointer' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#059669', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};