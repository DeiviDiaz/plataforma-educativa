import React, { useState } from 'react';

// Generador de inecuaciones sin ambigüedad
const generateChallenge = (prevLimit = null) => {
  let limit = Math.floor(Math.random() * 9) - 4; // Entre -4 y 4
  while (limit === prevLimit) {
    limit = Math.floor(Math.random() * 9) - 4;
  }
  const isGreater = Math.random() > 0.5;
  return {
    limit,
    isGreater,
    symbol: isGreater ? '>' : '<',
  };
};

export default function NumberLineInequalityGame() {
  const [level, setLevel] = useState(() => generateChallenge());
  const [sliderVal, setSliderVal] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const checkAnswer = () => {
    if (feedback) return;

    // Comprobación matemática idéntica a lo que se muestra en pantalla
    const belongs = level.isGreater ? sliderVal > level.limit : sliderVal < level.limit;

    if (belongs) {
      setScore((s) => s + 20);
      setFeedback({
        type: 'success',
        text: `¡Correcto! ${sliderVal} ${level.symbol} ${level.limit} es una afirmación verdadera 🎉`
      });

      // Pasa al siguiente reto automáticamente
      setTimeout(() => {
        setFeedback(null);
        setRound((r) => r + 1);
        setLevel((prev) => generateChallenge(prev.limit));
        setSliderVal(0);
      }, 900);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Incorrecto. ${sliderVal} no es ${level.isGreater ? 'mayor' : 'menor'} que ${level.limit}.`
      });
      setTimeout(() => setFeedback(null), 1400);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card}>
        <h2>¡Fin de la partida! 📏</h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>Puntaje final: <strong>{score} pts</strong></p>
        <p style={{ color: '#64748b' }}>Rondas superadas: {round - 1}</p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setLevel(generateChallenge());
            setSliderVal(0);
            setFeedback(null);
          }}
        >
          Volver a Jugar
        </button>
      </div>
    );
  }

  // Mapeo coordenado para el SVG (Centro 0 = 160px; 18px por cada unidad)
  const toSvgX = (val) => 160 + val * 18;
  const limitX = toSvgX(level.limit);
  const userX = toSvgX(sliderVal);

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>🎯 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>
          INECUACIÓN OBJETIVO
        </span>

        {/* Título dinámico: siempre sincronizado con level.symbol y level.limit */}
        <div style={styles.equationBadge}>
          x {level.symbol} {level.limit}
        </div>

        <p style={{ color: '#334155', margin: '4px 0 16px', fontSize: '0.95rem' }}>
          Mueve el cursor a un número que sea <strong>{level.isGreater ? 'mayor que' : 'menor que'} {level.limit}</strong>:
        </p>

        {/* Recta numérica interactiva en SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <svg width="340" height="90" viewBox="0 0 340 90">
            {/* Eje de la recta */}
            <line x1="20" y1="50" x2="320" y2="50" stroke="#94a3b8" strokeWidth="3" />

            {/* Sombra del conjunto solución hacia el lado correspondiente */}
            {level.isGreater ? (
              <rect
                x={limitX}
                y="42"
                width={Math.max(0, 320 - limitX)}
                height="16"
                fill="rgba(59, 130, 246, 0.35)"
              />
            ) : (
              <rect
                x="20"
                y="42"
                width={Math.max(0, limitX - 20)}
                height="16"
                fill="rgba(59, 130, 246, 0.35)"
              />
            )}

            {/* Ticks numéricos de -6 a 6 */}
            {[-6, -4, -2, 0, 2, 4, 6].map((tick) => (
              <g key={tick}>
                <line x1={toSvgX(tick)} y1="44" x2={toSvgX(tick)} y2="56" stroke="#64748b" strokeWidth="2" />
                <text x={toSvgX(tick)} y="72" fontSize="11" textAnchor="middle" fill="#64748b" fontWeight="600">
                  {tick}
                </text>
              </g>
            ))}

            {/* Círculo abierto en el valor frontera */}
            <circle cx={limitX} y="50" r="6" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
            <text x={limitX} y="26" fontSize="11" textAnchor="middle" fill="#2563eb" fontWeight="bold">
              {level.limit}
            </text>

            {/* Indicador rojo del valor que el estudiante tiene seleccionado */}
            <circle cx={userX} y="36" r="6" fill="#ef4444" />
            <polygon points={`${userX},46 ${userX - 5},40 ${userX + 5},40`} fill="#ef4444" />
          </svg>
        </div>

        {/* Deslizador */}
        <div style={{ margin: '14px auto', maxWidth: '300px' }}>
          <input
            type="range"
            min="-6"
            max="6"
            step="1"
            value={sliderVal}
            onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
            style={{ width: '100%', cursor: 'pointer' }}
          />

          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#7c3aed', marginTop: '6px' }}>
            x elegido = {sliderVal}
          </div>
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          Comprobar punto en la recta
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
  equationBadge: { fontSize: '2.3rem', fontWeight: '900', color: '#2563eb', margin: '8px 0', letterSpacing: '1px' },
  actionBtn: { width: '100%', maxWidth: '300px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};