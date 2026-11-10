import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function MonomialDegreeGame() {
  const generateLevel = () => {
    const templates = [
      {
        v1: 'x', exp1: 2, v2: 'y', exp2: 1,
        literal: 'x²y',
        absDegree: 3,
        distractors: ['x³y', 'xy²', 'x²z', 'x²']
      },
      {
        v1: 'x', exp1: 3, v2: 'y', exp2: 2,
        literal: 'x³y²',
        absDegree: 5,
        distractors: ['x²y²', 'x³y³', 'x³z²', 'xy⁵']
      },
      {
        v1: 'x', exp1: 1, v2: 'y', exp2: 3,
        literal: 'xy³',
        absDegree: 4,
        distractors: ['x²y³', 'xy²', 'x³y', 'xz³']
      },
      {
        v1: 'a', exp1: 2, v2: 'b', exp2: 2,
        literal: 'a²b²',
        absDegree: 4,
        distractors: ['a³b²', 'a²b', 'ab²', 'a²c²']
      },
      {
        v1: 'm', exp1: 4, v2: 'n', exp2: 1,
        literal: 'm⁴n',
        absDegree: 5,
        distractors: ['m³n', 'm⁴n²', 'mn⁴', 'm⁴p']
      },
    ];

    const chosen = pick(templates);
    const targetCoef = pick([-9, -7, -5, -3, 2, 4, 7, 8]);
    const targetMonomial = `${targetCoef}${chosen.literal}`;

    // Exactamente 3 semejantes reales (diferente coeficiente, mismo literal)
    const availableCoefs = [-8, -6, -4, -2, 3, 5, 6, 9].filter((c) => c !== targetCoef);
    const shuffledCoefs = availableCoefs.sort(() => Math.random() - 0.5).slice(0, 3);

    const cards = shuffledCoefs.map((c, idx) => ({
      id: `sim-${idx}`,
      text: `${c}${chosen.literal}`,
      isSimilar: true,
    }));

    // Exactamente 3 distractores garantizados (literales visiblemente distintos)
    const shuffledDist = chosen.distractors.sort(() => Math.random() - 0.5).slice(0, 3);
    shuffledDist.forEach((dLiteral, idx) => {
      const distCoef = pick([-5, -3, 2, 4, 5, 7]);
      cards.push({
        id: `dist-${idx}`,
        text: `${distCoef}${dLiteral}`,
        isSimilar: false,
      });
    });

    return {
      targetMonomial,
      literal: chosen.literal,
      absDegree: chosen.absDegree,
      cards: cards.sort(() => Math.random() - 0.5),
    };
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [degreeInput, setDegreeInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const toggleCard = (id) => {
    if (feedback) return;
    setSelectedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checkAnswer = () => {
    if (feedback) return;

    // Verificar si las cartas seleccionadas coinciden exactamente con las semejantes
    const correctIds = level.cards.filter((c) => c.isSimilar).map((c) => c.id);
    const allSimilarChosen =
      correctIds.length === selectedCardIds.length &&
      correctIds.every((id) => selectedCardIds.includes(id));

    const parsedDegree = parseInt(degreeInput, 10);
    const degreeCorrect = parsedDegree === level.absDegree;

    if (allSimilarChosen && degreeCorrect) {
      setScore((s) => s + 30);
      setFeedback({
        type: 'success',
        text: `¡Exacto! Tienen la misma parte literal (${level.literal}) y su grado absoluto es ${level.absDegree} 🎉`,
      });
      setTimeout(() => {
        setFeedback(null);
        setSelectedCardIds([]);
        setDegreeInput('');
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      const errorMsg = !allSimilarChosen
        ? `Debes seleccionar ÚNICAMENTE las 3 fichas que tengan exactamente la parte literal "${level.literal}".`
        : `Identificaste los términos, pero el grado absoluto es la suma de los exponentes (${level.absDegree}).`;
      setFeedback({ type: 'error', text: errorMsg });
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Fin de la Clasificación! 🎯</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Rondas superadas: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setSelectedCardIds([]);
            setDegreeInput('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Intentar de Nuevo</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🎯 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-mon-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Términos Semejantes y Grado
        </span>

        {/* Monomio Objetivo */}
        <div style={styles.targetBadge}>
          <div style={{ fontSize: '0.8rem', color: '#6d28d9' }}><span>MONOMIO OBJETIVO:</span></div>
          <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#7c3aed' }}>
            <span>{level.targetMonomial}</span>
          </div>
        </div>

        <p style={{ color: '#334155', margin: '6px 0 10px', fontSize: '0.95rem' }}>
          <span>1. Toca <strong>únicamente</strong> las 3 fichas con términos semejantes:</span>
        </p>

        {/* Grilla de Fichas */}
        <div style={styles.cardGrid}>
          {level.cards.map((card) => {
            const isSelected = selectedCardIds.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => toggleCard(card.id)}
                style={{
                  ...styles.monomialCard,
                  backgroundColor: isSelected ? '#7c3aed' : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  borderColor: isSelected ? '#6d28d9' : '#cbd5e1',
                  transform: isSelected ? 'scale(1.05)' : 'none',
                }}
              >
                <span>{card.text}</span>
              </button>
            );
          })}
        </div>

        {/* Pregunta sobre el grado */}
        <div style={{ margin: '14px 0' }}>
          <p style={{ margin: '0 0 6px', fontWeight: 'bold', color: '#1e293b', fontSize: '0.95rem' }}>
            <span>2. ¿Cuál es el <strong>grado absoluto</strong> de {level.targetMonomial}?</span>
          </p>
          <input
            type="number"
            placeholder="Grado..."
            value={degreeInput}
            onChange={(e) => setDegreeInput(e.target.value)}
            style={styles.degreeInput}
          />
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Comprobar Términos y Grado</span>
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
  targetBadge: { backgroundColor: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: '14px', padding: '10px', margin: '8px auto', maxWidth: '300px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '12px 0' },
  monomialCard: { padding: '14px 8px', borderRadius: '12px', border: '2px solid', fontSize: '1.2rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.15s ease' },
  degreeInput: { width: '120px', padding: '8px', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#7c3aed', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '6px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};