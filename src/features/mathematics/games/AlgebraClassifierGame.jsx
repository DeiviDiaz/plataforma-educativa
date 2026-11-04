import React, { useState } from 'react';

const ITEMS_POOL = [
  // Constantes
  { id: 'c1', label: '7', type: 'constante', tag: 'Número puro' },
  { id: 'c2', label: '-15', type: 'constante', tag: 'Número negativo' },
  { id: 'c3', label: 'π', type: 'constante', tag: 'Valor fijo' },
  { id: 'c4', label: '1/2', type: 'constante', tag: 'Fracción fija' },
  { id: 'c5', label: '100', type: 'constante', tag: 'Constante numérica' },

  // Variables
  { id: 'v1', label: 't (tiempo en horas)', type: 'variable', tag: 'Magnitud continua' },
  { id: 'v2', label: 'h (altura de una planta)', type: 'variable', tag: 'Magnitud cambiante' },
  { id: 'v3', label: 'x en f(x) = 2x', type: 'variable', tag: 'Variable independiente' },
  { id: 'v4', label: 'T° (temperatura del día)', type: 'variable', tag: 'Valor dinámico' },

  // Incógnitas
  { id: 'i1', label: 'x en: 3x + 2 = 11', type: 'incognita', tag: 'Valor oculto único' },
  { id: 'i2', label: 'y en: y - 8 = 20', type: 'incognita', tag: 'Desconocido a despejar' },
  { id: 'i3', label: 'w en: 2w = 14', type: 'incognita', tag: 'Valor exacto por hallar' },
  { id: 'i4', label: 'z en: z² = 25', type: 'incognita', tag: 'Solución de ecuación' },
];

export default function AlgebraClassifierGame() {
  const getShuffledItems = () => [...ITEMS_POOL].sort(() => Math.random() - 0.5);

  const [items, setItems] = useState(getShuffledItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const currentItem = items[currentIndex];

  const handleClassify = (targetType) => {
    if (!currentItem || feedback) return;

    if (currentItem.type === targetType) {
      setScore((s) => s + 20);
      setFeedback({ type: 'success', text: `¡Correcto! ${currentItem.label} es ${targetType}.` });
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 < items.length) {
          setCurrentIndex((idx) => idx + 1);
        } else {
          setItems(getShuffledItems());
          setCurrentIndex(0);
        }
      }, 700);
    } else {
      setLives((l) => l - 1);
      setFeedback({ type: 'error', text: `Incorrecto. ${currentItem.label} correspondía a ${currentItem.type}.` });
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Fin del Desafío! 📦</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje obtenido: <strong>{score} pts</strong></p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setItems(getShuffledItems());
            setCurrentIndex(0);
          }}
        >
          Reintentar clasificación
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📦 Fichas: {currentIndex + 1} / {items.length}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          Toca o envía la ficha a la caja correcta:
        </p>

        {/* Ficha interactiva flotante */}
        <div style={styles.activeToken}>
          <div style={styles.tokenTag}>{currentItem.tag}</div>
          <div style={styles.tokenLabel}>{currentItem.label}</div>
        </div>

        {/* Cajas receptoras */}
        <div style={styles.boxesRow}>
          <button
            style={{ ...styles.boxBtn, borderColor: '#f59e0b', backgroundColor: '#fffbeb' }}
            onClick={() => handleClassify('constante')}
          >
            <span style={{ fontSize: '1.8rem' }}>🔒</span>
            <strong style={{ color: '#b45309' }}>Constante</strong>
            <small style={{ color: '#92400e' }}>Valor inalterable</small>
          </button>

          <button
            style={{ ...styles.boxBtn, borderColor: '#3b82f6', backgroundColor: '#eff6ff' }}
            onClick={() => handleClassify('variable')}
          >
            <span style={{ fontSize: '1.8rem' }}>📈</span>
            <strong style={{ color: '#1d4ed8' }}>Variable</strong>
            <small style={{ color: '#1e40af' }}>Cambia en el tiempo</small>
          </button>

          <button
            style={{ ...styles.boxBtn, borderColor: '#8b5cf6', backgroundColor: '#f5f3ff' }}
            onClick={() => handleClassify('incognita')}
          >
            <span style={{ fontSize: '1.8rem' }}>❓</span>
            <strong style={{ color: '#6d28d9' }}>Incógnita</strong>
            <small style={{ color: '#5b21b6' }}>Por despejar</small>
          </button>
        </div>

        {feedback && (
          <div style={{
            marginTop: '16px',
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
  activeToken: { margin: '20px auto', padding: '18px 24px', backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '16px', maxWidth: '340px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)' },
  tokenTag: { fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
  tokenLabel: { fontSize: '1.45rem', fontWeight: '800', marginTop: '6px' },
  boxesRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' },
  boxBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '14px 6px', border: '2px dashed', borderRadius: '14px', cursor: 'pointer', transition: 'transform 0.15s ease' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};