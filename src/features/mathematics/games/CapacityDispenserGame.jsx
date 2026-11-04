import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function CapacityDispenserGame() {
  const generateLevel = () => {
    // Objetivos en ml entre 250 y 2500 ml
    const targetMl = pick([500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500]);
    const targetLiters = (targetMl / 1000).toFixed(targetMl % 1000 === 0 ? 0 : targetMl % 100 === 0 ? 1 : 2);
    const showInLiters = Math.random() > 0.4;

    return { targetMl, targetLiters, showInLiters };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [currentMl, setCurrentMl] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const handleDispense = (amount) => {
    if (feedback) return;
    setCurrentMl((prev) => Math.max(0, Math.min(prev + amount, 3000)));
  };

  const checkAnswer = () => {
    if (feedback) return;

    if (currentMl === level.targetMl) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Medición exacta! ${currentMl} ml equivalen a ${level.targetLiters} Litro(s) 🧪💧`,
      });
      setTimeout(() => {
        setFeedback(null);
        setCurrentMl(0);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1100);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Nivel actual: ${currentMl} ml. El objetivo era ${level.targetMl} ml (${level.targetLiters} L). Recuerda: 1 L = 1.000 ml.`,
      });
      setTimeout(() => setFeedback(null), 1700);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Probeta Descalibrada! 🧪</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Líquidos dispensados: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setCurrentMl(0);
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Llenar Nuevamente</span>
        </button>
      </div>
    );
  }

  // Gráfico SVG de probeta graduada: altura líquida reactiva
  const maxCap = 3000;
  const cylinderHeight = 150;
  const fillPixels = (currentMl / maxCap) * cylinderHeight;

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🧪 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-cap-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Dispensador y Capacidad de Líquidos
        </span>

        {/* Desafío de Volumen Objetivo */}
        <div style={styles.targetCard}>
          <div style={{ fontSize: '0.85rem', color: '#475569' }}><span>CAPACIDAD OBJETIVO:</span></div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0284c7', margin: '4px 0' }}>
            <span>{level.showInLiters ? `${level.targetLiters} L` : `${level.targetMl} ml`}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#0369a1' }}>
            <span>({level.showInLiters ? `${level.targetMl} ml` : `${level.targetLiters} Litros`})</span>
          </div>
        </div>

        {/* Probeta Graduada SVG en tiempo real */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width="180" height="190" viewBox="0 0 180 190">
            {/* Base sólida de la probeta */}
            <path d="M 50 180 L 130 180 L 120 170 L 60 170 Z" fill="#475569" />

            {/* Vaso cilíndrico de cristal */}
            <rect x="65" y="20" width="50" height="150" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />

            {/* Líquido coloreado reactivo */}
            <clipPath id="probClip">
              <rect x="67" y="22" width="46" height="146" rx="4" />
            </clipPath>

            <rect
              x="67"
              y={22 + (cylinderHeight - fillPixels)}
              width="46"
              height={fillPixels}
              fill="url(#liquidGrad)"
              clipPath="url(#probClip)"
              style={{ transition: 'height 0.2s ease, y 0.2s ease' }}
            />

            {/* Menisco en la superficie del líquido */}
            {currentMl > 0 && (
              <ellipse
                cx="90"
                cy={22 + (cylinderHeight - fillPixels)}
                rx="22"
                ry="3"
                fill="#38bdf8"
                clipPath="url(#probClip)"
              />
            )}

            {/* Graduaciones y marcas de escala (cada 500 ml) */}
            {[500, 1000, 1500, 2000, 2500].map((val) => {
              const yPos = 22 + cylinderHeight - (val / maxCap) * cylinderHeight;
              return (
                <g key={val}>
                  <line x1="65" y1={yPos} x2="78" y2={yPos} stroke="#0f172a" strokeWidth="2" />
                  <text x="56" y={yPos + 4} fontSize="9" fontWeight="bold" textAnchor="end" fill="#475569">
                    {val / 1000}L
                  </text>
                  <text x="122" y={yPos + 4} fontSize="9" fontWeight="bold" textAnchor="start" fill="#64748b">
                    {val}ml
                  </text>
                </g>
              );
            })}

            <defs>
              <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Indicador numérico actual */}
        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0284c7', margin: '4px 0 10px' }}>
          <span>Líquido actual: {currentMl} ml ({(currentMl / 1000).toFixed(2)} L)</span>
        </div>

        {/* Botones de dosificación de líquido */}
        <div style={styles.valvesGrid}>
          <button style={styles.valveBtn} onClick={() => handleDispense(500)}><span>+500 ml</span></button>
          <button style={styles.valveBtn} onClick={() => handleDispense(250)}><span>+250 ml</span></button>
          <button style={styles.valveBtn} onClick={() => handleDispense(100)}><span>+100 ml</span></button>
          <button style={styles.valveBtn} onClick={() => handleDispense(50)}><span>+50 ml</span></button>
          <button style={{ ...styles.valveBtn, backgroundColor: '#fee2e2', color: '#b91c1c', borderColor: '#fca5a5' }} onClick={() => setCurrentMl(0)}>
            <span>Vaciar 🚰</span>
          </button>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Comprobar Nivel de Capacidad</span>
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
            <span>{feedback.text}</span>
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
  targetCard: { backgroundColor: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '14px', padding: '10px', margin: '8px auto', maxWidth: '360px' },
  valvesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', margin: '10px 0' },
  valveBtn: { padding: '9px 4px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#0284c7', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};