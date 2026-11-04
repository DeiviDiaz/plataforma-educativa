import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function VolumeCapacityLabGame() {
  const generateLevel = () => {
    // 3 casos fundamentales de equivalencia
    const type = rand(1, 3);

    if (type === 1) {
      // 1 dm3 = 1 Litro
      const val = rand(2, 12);
      return {
        type: 1,
        title: 'Cubo en Decímetros Cúbicos',
        volVal: val,
        volUnit: 'dm³',
        capUnit: 'Litros',
        expectedCap: val,
        ruleText: '1 dm³ equivale exactamente a 1 Litro',
      };
    } else if (type === 2) {
      // 1 cm3 = 1 ml
      const val = rand(5, 50) * 10;
      return {
        type: 2,
        title: 'Frasco en Centímetros Cúbicos',
        volVal: val,
        volUnit: 'cm³',
        capUnit: 'mililitros (ml)',
        expectedCap: val,
        ruleText: '1 cm³ equivale exactamente a 1 ml',
      };
    } else {
      // 1 m3 = 1000 Litros
      const val = rand(2, 8);
      return {
        type: 3,
        title: 'Tanque en Metros Cúbicos',
        volVal: val,
        volUnit: 'm³',
        capUnit: 'Litros',
        expectedCap: val * 1000,
        ruleText: '1 m³ equivale a 1.000 Litros de agua',
      };
    }
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [userNumber, setUserNumber] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const checkAnswer = () => {
    if (feedback) return;

    const parsed = parseFloat(userNumber);

    if (!isNaN(parsed) && parsed === level.expectedCap) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Transvase exitoso! ${level.volVal} ${level.volUnit} = ${level.expectedCap} ${level.capUnit} (${level.ruleText}) 💧📦`,
      });
      setTimeout(() => {
        setFeedback(null);
        setUserNumber('');
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1200);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Equivalencia incorrecta. Recuerda que ${level.ruleText}. El valor requerido era ${level.expectedCap}.`,
      });
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Depósito Desbordado! 📦💧</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Equivalencias logradas: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setUserNumber('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Reiniciar Laboratorio</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📦 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-lab-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Equivalencia: Volumen Geométrico ⇄ Capacidad
        </span>

        {/* Desafío de Transvase */}
        <div style={styles.missionCard}>
          <div style={{ fontSize: '0.85rem', color: '#475569' }}><span>VOLUMEN GEOMÉTRICO MEDIDO:</span></div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#7c3aed', margin: '4px 0' }}>
            <span>{level.volVal} {level.volUnit}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#6d28d9', fontWeight: '600' }}>
            <span>{level.title}</span>
          </div>
        </div>

        {/* Gráfico 3D Isométrico y Tanque SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <svg width="320" height="120" viewBox="0 0 320 120">
            {/* Cubo isométrico 3D (Izquierda) */}
            <g transform="translate(40, 30)">
              {/* Cara superior */}
              <polygon points="40,0 80,15 40,30 0,15" fill="#a78bfa" stroke="#6d28d9" strokeWidth="2" />
              {/* Cara frontal izquierda */}
              <polygon points="0,15 40,30 40,75 0,60" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2" />
              {/* Cara frontal derecha */}
              <polygon points="40,30 80,15 80,60 40,75" fill="#6d28d9" stroke="#4c1d95" strokeWidth="2" />
              <text x="40" y="55" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">{level.volUnit}</text>
            </g>

            {/* Canal de transvase con líquido en movimiento */}
            <path d="M 130 65 L 180 65" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            <polygon points="185,65 175,60 175,70" fill="#0284c7" />

            {/* Tanque receptor de capacidad (Derecha) */}
            <g transform="translate(195, 20)">
              <rect x="10" y="10" width="75" height="80" rx="8" fill="#f8fafc" stroke="#0284c7" strokeWidth="3" />
              <rect x="13" y="45" width="69" height="42" rx="4" fill="#38bdf8" opacity="0.8" />
              <text x="47" y="32" fontSize="11" fontWeight="bold" fill="#0284c7" textAnchor="middle">Capacidad</text>
              <text x="47" y="70" fontSize="12" fontWeight="900" fill="#0369a1" textAnchor="middle">{level.capUnit}</text>
            </g>
          </svg>
        </div>

        <p style={{ color: '#334155', margin: '6px 0 12px', fontSize: '0.95rem' }}>
          <span>Si llenamos completamente este cuerpo de <strong>{level.volVal} {level.volUnit}</strong> con agua, ¿cuántos <strong>{level.capUnit}</strong> caben exactamente?</span>
        </p>

        {/* Input numérico */}
        <div style={{ margin: '10px 0' }}>
          <input
            type="number"
            placeholder={`Total en ${level.capUnit}...`}
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            style={styles.textInput}
          />
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Validar Equivalencia</span>
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
  missionCard: { backgroundColor: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: '14px', padding: '10px', margin: '8px auto', maxWidth: '360px' },
  textInput: { width: '80%', maxWidth: '240px', padding: '10px', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#7c3aed', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};