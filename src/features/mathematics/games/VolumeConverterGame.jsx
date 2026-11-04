import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const UNITS = [
  { id: 'm3', name: 'Metros cúbicos', sym: 'm³', step: 3 },
  { id: 'dm3', name: 'Decímetros cúbicos', sym: 'dm³', step: 2 },
  { id: 'cm3', name: 'Centímetros cúbicos', sym: 'cm³', step: 1 },
];

export default function VolumeConverterGame() {
  const generateLevel = () => {
    // Seleccionar origen y destino distintos
    const fromIdx = rand(0, 2);
    let toIdx = rand(0, 2);
    while (toIdx === fromIdx) {
      toIdx = rand(0, 2);
    }

    const fromUnit = UNITS[fromIdx];
    const toUnit = UNITS[toIdx];
    const isGoingDown = fromUnit.step > toUnit.step;
    const jumps = Math.abs(fromUnit.step - toUnit.step);

    // Valor base didáctico
    const val = rand(2, 9);
    const factor = Math.pow(1000, jumps);
    const targetResult = isGoingDown ? val * factor : val / factor;

    return { val, fromUnit, toUnit, isGoingDown, jumps, factor, targetResult };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [userJumps, setUserJumps] = useState(1);
  const [userOp, setUserOp] = useState('multiplicar');
  const [userInputVal, setUserInputVal] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const checkAnswer = () => {
    if (feedback) return;

    const parsed = parseFloat(userInputVal.replace(/\./g, '').replace(',', '.'));
    const expected = level.targetResult;

    const opCorrect = level.isGoingDown ? userOp === 'multiplicar' : userOp === 'dividir';
    const jumpsCorrect = userJumps === level.jumps;
    const valCorrect = !isNaN(parsed) && Math.abs(parsed - expected) < 0.0001;

    if (valCorrect && opCorrect) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Conversión perfecta! ${level.val} ${level.fromUnit.sym} = ${expected.toLocaleString('es-CO')} ${level.toUnit.sym} 🎉`,
      });
      setTimeout(() => {
        setFeedback(null);
        setUserInputVal('');
        setUserJumps(1);
        setUserOp('multiplicar');
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1200);
    } else {
      setLives((l) => l - 1);
      const directionMsg = level.isGoingDown
        ? `hacia abajo se MULTIPLICA por 1.000 por cada peldaño`
        : `hacia arriba se DIVIDE entre 1.000 por cada peldaño`;
      setFeedback({
        type: 'error',
        text: `Error en la escala: Hay ${level.jumps} salto(s) (${directionMsg}). Resultado esperado: ${expected.toLocaleString('es-CO')}.`,
      });
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Escalera Inestable! 🧱</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Conversiones logradas: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setUserInputVal('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Reiniciar Conversor</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🧱 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-vol-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Escalera Cúbica: Unidades de Volumen
        </span>

        {/* Misión de Conversión */}
        <div style={styles.missionCard}>
          <div style={{ fontSize: '0.85rem', color: '#475569' }}><span>TRANSFORMAR:</span></div>
          <div style={{ fontSize: '1.9rem', fontWeight: '900', color: '#2563eb', margin: '4px 0' }}>
            <span>{level.val} {level.fromUnit.sym}</span>
            <span style={{ color: '#64748b', margin: '0 8px' }}>➔</span>
            <span>? {level.toUnit.sym}</span>
          </div>
        </div>

        {/* Escalera Visual Interactiva SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width="320" height="130" viewBox="0 0 320 130">
            {/* Peldaño 1: m3 */}
            <g>
              <rect x="20" y="20" width="85" height="32" rx="8" fill={level.fromUnit.id === 'm3' ? '#3b82f6' : level.toUnit.id === 'm3' ? '#10b981' : '#f1f5f9'} stroke="#94a3b8" strokeWidth="2" />
              <text x="62" y="41" fontSize="14" fontWeight="800" textAnchor="middle" fill={level.fromUnit.id === 'm3' || level.toUnit.id === 'm3' ? '#ffffff' : '#1e293b'}>m³</text>
            </g>

            {/* Flecha peldaño 1 -> 2 */}
            <path d="M 105 36 L 125 36 Q 135 36 135 55 L 135 65" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="148" y="52" fontSize="10" fill="#64748b" fontWeight="bold">×1.000</text>

            {/* Peldaño 2: dm3 */}
            <g>
              <rect x="115" y="60" width="90" height="32" rx="8" fill={level.fromUnit.id === 'dm3' ? '#3b82f6' : level.toUnit.id === 'dm3' ? '#10b981' : '#f1f5f9'} stroke="#94a3b8" strokeWidth="2" />
              <text x="160" y="81" fontSize="14" fontWeight="800" textAnchor="middle" fill={level.fromUnit.id === 'dm3' || level.toUnit.id === 'dm3' ? '#ffffff' : '#1e293b'}>dm³</text>
            </g>

            {/* Flecha peldaño 2 -> 3 */}
            <path d="M 205 76 L 225 76 Q 235 76 235 95 L 235 102" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="248" y="90" fontSize="10" fill="#64748b" fontWeight="bold">×1.000</text>

            {/* Peldaño 3: cm3 */}
            <g>
              <rect x="215" y="95" width="90" height="32" rx="8" fill={level.fromUnit.id === 'cm3' ? '#3b82f6' : level.toUnit.id === 'cm3' ? '#10b981' : '#f1f5f9'} stroke="#94a3b8" strokeWidth="2" />
              <text x="260" y="116" fontSize="14" fontWeight="800" textAnchor="middle" fill={level.fromUnit.id === 'cm3' || level.toUnit.id === 'cm3' ? '#ffffff' : '#1e293b'}>cm³</text>
            </g>
          </svg>
        </div>

        {/* Panel de Configuración de la Operación */}
        <div style={styles.stepControls}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
            <button
              onClick={() => setUserOp('multiplicar')}
              style={{
                ...styles.opBtn,
                backgroundColor: userOp === 'multiplicar' ? '#2563eb' : '#f8fafc',
                color: userOp === 'multiplicar' ? '#ffffff' : '#1e293b',
              }}
            >
              <span>Multiplicar (Bajar)</span>
            </button>
            <button
              onClick={() => setUserOp('dividir')}
              style={{
                ...styles.opBtn,
                backgroundColor: userOp === 'dividir' ? '#2563eb' : '#f8fafc',
                color: userOp === 'dividir' ? '#ffffff' : '#1e293b',
              }}
            >
              <span>Dividir (Subir)</span>
            </button>
          </div>

          <div style={{ margin: '8px 0' }}>
            <span style={{ fontSize: '0.9rem', color: '#475569' }}>
              <span>¿Cuál es el valor final en <strong>{level.toUnit.sym}</strong>?</span>
            </span>
            <div style={{ marginTop: '6px' }}>
              <input
                type="text"
                placeholder="Ejemplo: 4000 o 0.005"
                value={userInputVal}
                onChange={(e) => setUserInputVal(e.target.value)}
                style={styles.textInput}
              />
            </div>
          </div>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Comprobar Conversión</span>
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
  missionCard: { backgroundColor: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: '14px', padding: '10px', margin: '8px auto', maxWidth: '380px' },
  stepControls: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px', margin: '10px 0' },
  opBtn: { padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  textInput: { width: '80%', maxWidth: '240px', padding: '10px', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '8px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};