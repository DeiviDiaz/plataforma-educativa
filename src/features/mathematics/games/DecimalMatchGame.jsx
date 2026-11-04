import React, { useState } from 'react';

const PAIRS_POOL = [
  { frac: '1/2', dec: '0.5' },
  { frac: '1/4', dec: '0.25' },
  { frac: '3/4', dec: '0.75' },
  { frac: '1/5', dec: '0.2' },
  { frac: '2/5', dec: '0.4' },
  { frac: '3/5', dec: '0.6' },
  { frac: '1/10', dec: '0.1' },
  { frac: '1/8', dec: '0.125' },
];

export default function DecimalMatchGame() {
  const initBoard = () => {
    // Tomar 4 pares al azar (8 cartas)
    const shuffledPool = [...PAIRS_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
    const cards = [];

    shuffledPool.forEach((pair, idx) => {
      cards.push({ id: `f-${idx}`, pairId: idx, text: pair.frac, type: 'frac' });
      cards.push({ id: `d-${idx}`, pairId: idx, text: pair.dec, type: 'dec' });
    });

    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(initBoard);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [feedback, setFeedback] = useState(null);

  const handleCardClick = (card) => {
    if (matchedIds.includes(card.id) || selectedCards.some((c) => c.id === card.id) || selectedCards.length === 2) {
      return;
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [c1, c2] = newSelected;
      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        // Acierto
        setScore((s) => s + 30);
        setMatchedIds((prev) => [...prev, c1.id, c2.id]);
        setFeedback({ type: 'success', text: `¡Par encontrado! ${c1.text} = ${c2.text} ✨` });
        setTimeout(() => {
          setFeedback(null);
          setSelectedCards([]);
        }, 700);
      } else {
        // Fallo
        setLives((l) => l - 1);
        setFeedback({ type: 'error', text: 'No son equivalentes. ¡Prueba otra combinación!' });
        setTimeout(() => {
          setFeedback(null);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const isCompleted = matchedIds.length === cards.length && cards.length > 0;

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Te quedaste sin intentos! 🃏</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje: <strong>{score} pts</strong></p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(4);
            setScore(0);
            setMatchedIds([]);
            setSelectedCards([]);
            setCards(initBoard());
          }}
        >
          Reintentar Tablero
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🃏 Memoria: Fracción ↔ Decimal</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <p style={{ color: '#64748b', margin: '0 0 16px', fontSize: '0.95rem' }}>
          Empareja cada fracción con su expresión decimal correspondiente:
        </p>

        {/* Tablero de 8 cartas (4 pares) */}
        <div style={styles.cardGrid}>
          {cards.map((card) => {
            const isMatched = matchedIds.includes(card.id);
            const isSelected = selectedCards.some((c) => c.id === card.id);

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={isMatched}
                style={{
                  ...styles.gameCard,
                  backgroundColor: isMatched ? '#dcfce7' : isSelected ? '#3b82f6' : '#f8fafc',
                  color: isMatched ? '#166534' : isSelected ? '#ffffff' : '#0f172a',
                  borderColor: isMatched ? '#86efac' : isSelected ? '#1d4ed8' : '#cbd5e1',
                  opacity: isMatched ? 0.8 : 1,
                  transform: isSelected ? 'scale(1.04)' : 'none',
                }}
              >
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: isSelected ? '#e0f2fe' : '#64748b' }}>
                  {card.type === 'frac' ? 'Fracción' : 'Decimal'}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>
                  {card.text}
                </div>
              </button>
            );
          })}
        </div>

        {isCompleted && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#16a34a' }}>¡Completaste todos los pares con éxito! 🎉</h3>
            <button
              style={styles.primaryBtn}
              onClick={() => {
                setMatchedIds([]);
                setSelectedCards([]);
                setCards(initBoard());
              }}
            >
              Jugar con nuevos números
            </button>
          </div>
        )}

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
  container: { maxWidth: '520px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', marginBottom: '16px' },
  board: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #e2e8f0' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
  gameCard: { padding: '16px 8px', borderRadius: '14px', border: '2px solid', cursor: 'pointer', transition: 'all 0.15s ease' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};