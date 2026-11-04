import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const SCENARIOS = [
  // Directas
  {
    type: 'directa',
    title: 'Fábrica de Juguetes',
    varA: 'Máquinas activas',
    varB: 'Juguetes producidos por hora',
    unitA: 'máquinas',
    unitB: 'juguetes',
    k: 25, // juguetes por máquina
    iconA: '⚙️',
    iconB: '🧸',
    calcPrompt: (val, k) => val * k,
  },
  {
    type: 'directa',
    title: 'Compra de Cuadernos',
    varA: 'Cantidad de cuadernos',
    varB: 'Costo total en pesos',
    unitA: 'cuadernos',
    unitB: 'pesos',
    k: 3000,
    iconA: '📓',
    iconB: '💰',
    calcPrompt: (val, k) => val * k,
  },
  // Inversas
  {
    type: 'inversa',
    title: 'Construcción de Muros',
    varA: 'Número de albañiles',
    varB: 'Días necesarios para terminar',
    unitA: 'albañiles',
    unitB: 'días',
    k: 24, // 24 obreros-días
    iconA: '👷',
    iconB: '📅',
    calcPrompt: (val, k) => Math.round(k / val),
  },
  {
    type: 'inversa',
    title: 'Llenado de Tanque',
    varA: 'Grifos abiertos al mismo flujo',
    varB: 'Horas requeridas de llenado',
    unitA: 'grifos',
    unitB: 'horas',
    k: 36, // 36 grifo-horas
    iconA: '🚰',
    iconB: '⏳',
    calcPrompt: (val, k) => Math.round(k / val),
  },
];

export default function VariationSimulatorGame() {
  const generateLevel = () => {
    const scenario = SCENARIOS[rand(0, SCENARIOS.length - 1)];
    const testA = scenario.type === 'directa' ? rand(2, 6) : [2, 3, 4, 6][rand(0, 3)];
    const expectedB = scenario.calcPrompt(testA, scenario.k);

    return { ...scenario, testA, expectedB };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [sliderA, setSliderA] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [predictedB, setPredictedB] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  // Valor simulado en vivo según el slider
  const simulatedB = level.calcPrompt(sliderA, level.k);

  const checkAnswer = () => {
    if (feedback) return;

    if (!selectedType) {
      setFeedback({ type: 'error', text: 'Por favor selecciona si la relación es Directa o Inversa.' });
      setTimeout(() => setFeedback(null), 1200);
      return;
    }

    const isTypeCorrect = selectedType === level.type;
    const isValCorrect = parseInt(predictedB, 10) === level.expectedB;

    if (isTypeCorrect && isValCorrect) {
      setScore((s) => s + 30);
      setFeedback({
        type: 'success',
        text: `¡Análisis impecable! Es variación ${level.type.toUpperCase()} y el valor exacto es ${level.expectedB} ${level.unitB} 🎉`,
      });
      setTimeout(() => {
        setFeedback(null);
        setSelectedType(null);
        setPredictedB('');
        setSliderA(1);
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      const errorMsg = !isTypeCorrect
        ? `No es ${selectedType}. Observa que cuando ${level.varA} sube, ${level.varB} ${level.type === 'directa' ? 'también sube' : 'disminuye'}.`
        : `El tipo es correcto, pero el cálculo falló: para ${level.testA} ${level.unitA} corresponden ${level.expectedB} ${level.unitB}.`;
      setFeedback({ type: 'error', text: errorMsg });
      setTimeout(() => setFeedback(null), 1600);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2>¡Fin del Simulador! 📉📈</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Retos superados: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setSelectedType(null);
            setPredictedB('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          Reiniciar Simulador
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📊 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Simulador de Magnitudes: {level.title}
        </span>

        {/* Laboratorio de simulación interactiva */}
        <div style={styles.simBox}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
            Mueve la palanca para observar cómo responde la segunda magnitud:
          </div>

          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={sliderA}
            onChange={(e) => setSliderA(parseInt(e.target.value, 10))}
            style={{ width: '85%', cursor: 'pointer' }}
          />

          <div style={styles.magnitudesGrid}>
            <div style={styles.magCard}>
              <span style={{ fontSize: '1.5rem' }}>{level.iconA}</span>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{level.varA}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#2563eb' }}>
                {sliderA} {level.unitA}
              </div>
            </div>

            <div style={styles.magCard}>
              <span style={{ fontSize: '1.5rem' }}>{level.iconB}</span>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{level.varB}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#7c3aed' }}>
                {simulatedB} {level.unitB}
              </div>
            </div>
          </div>
        </div>

        {/* Preguntas de análisis */}
        <div style={{ margin: '14px 0' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '0.95rem' }}>
            1. ¿Qué tipo de variación modela este experimento?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedType('directa')}
              style={{
                ...styles.typeBtn,
                backgroundColor: selectedType === 'directa' ? '#2563eb' : '#f1f5f9',
                color: selectedType === 'directa' ? '#fff' : '#0f172a',
                borderColor: selectedType === 'directa' ? '#1d4ed8' : '#cbd5e1'
              }}
            >
              📈 Directa (ambas crecen)
            </button>
            <button
              onClick={() => setSelectedType('inversa')}
              style={{
                ...styles.typeBtn,
                backgroundColor: selectedType === 'inversa' ? '#7c3aed' : '#f1f5f9',
                color: selectedType === 'inversa' ? '#fff' : '#0f172a',
                borderColor: selectedType === 'inversa' ? '#6d28d9' : '#cbd5e1'
              }}
            >
              📉 Inversa (una sube, otra baja)
            </button>
          </div>
        </div>

        <div style={{ margin: '14px 0' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#1e293b', fontSize: '0.95rem' }}>
            2. Si se fijan exactamente <strong>{level.testA} {level.unitA}</strong>, ¿cuántos {level.unitB} resultan?
          </p>
          <input
            type="number"
            placeholder="Escribe el valor calculado..."
            value={predictedB}
            onChange={(e) => setPredictedB(e.target.value)}
            style={styles.textInput}
          />
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          Comprobar Análisis
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
  simBox: { backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '14px', margin: '10px 0' },
  magnitudesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' },
  magCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '10px', border: '1px solid #e2e8f0' },
  typeBtn: { flex: 1, padding: '10px', borderRadius: '10px', border: '2px solid', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  textInput: { width: '80%', maxWidth: '240px', padding: '10px', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '8px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};