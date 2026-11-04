import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function ExponentRootGame() {
  const generateLevel = () => {
    const type = rand(1, 3);

    if (type === 1) {
      // Producto y cociente de potencias de igual base: x^a * x^b / x^c
      const a = rand(2, 6);
      const b = rand(2, 5);
      const c = rand(1, 4);
      const expTarget = a + b - c;
      const baseVar = pick(['x', 'y', 'a', 'm']);
      return {
        type: 'exponent-rules',
        title: 'Leyes de Exponentes (Misma Base)',
        displayExpr: `(${baseVar}^${a} · ${baseVar}^${b}) / ${baseVar}^${c}`,
        baseVar,
        expTarget,
        formulaHint: `${a} + ${b} - ${c} = ${expTarget}`,
        prompt: `Simplifica la expresión. ¿Cuál es el exponente final de ${baseVar}?`,
      };
    } else if (type === 2) {
      // Potencia de una potencia: (x^a)^b
      const a = rand(2, 5);
      const b = rand(2, 4);
      const expTarget = a * b;
      const baseVar = pick(['x', 'z', 'k']);
      return {
        type: 'power-of-power',
        title: 'Potencia de una Potencia',
        displayExpr: `(${baseVar}^${a})^${b}`,
        baseVar,
        expTarget,
        formulaHint: `${a} × ${b} = ${expTarget}`,
        prompt: `Multiplica los exponentes. ¿Cuál es el exponente final de ${baseVar}?`,
      };
    } else {
      // Radicación de números reales exactos
      const base = rand(2, 12);
      const isCube = Math.random() > 0.6;
      if (isCube) {
        const radBase = rand(2, 6);
        const radicando = Math.pow(radBase, 3);
        return {
          type: 'root-eval',
          title: 'Radicación de Reales',
          displayExpr: `∛${radicando}`,
          expTarget: radBase,
          formulaHint: `${radBase}³ = ${radicando}`,
          prompt: `Calcula la raíz cúbica exacta de ${radicando}:`,
        };
      } else {
        const radicando = base * base;
        return {
          type: 'root-eval',
          title: 'Radicación de Reales',
          displayExpr: `√${radicando}`,
          expTarget: base,
          formulaHint: `${base}² = ${radicando}`,
          prompt: `Calcula la raíz cuadrada exacta de ${radicando}:`,
        };
      }
    }
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [userVal, setUserVal] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const checkAnswer = () => {
    if (feedback) return;

    const parsed = parseInt(userVal, 10);

    if (parsed === level.expTarget) {
      setScore((s) => s + 25);
      setFeedback({
        type: 'success',
        text: `¡Correcto! ${level.displayExpr} = ${level.type === 'root-eval' ? level.expTarget : `${level.baseVar}^${level.expTarget}`} (${level.formulaHint}) ⚡`,
      });
      setTimeout(() => {
        setFeedback(null);
        setUserVal('');
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Incorrecto. Para ${level.displayExpr}, la regla indica: ${level.formulaHint}.`,
      });
      setTimeout(() => setFeedback(null), 1700);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Falla en el Núcleo! ⚡</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Ejercicios resueltos: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setUserVal('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Reiniciar Reactor</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>⚡ Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-exp-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {level.title}
        </span>

        {/* Expresión Matemática Destacada */}
        <div style={styles.mathBadge}>
          <span>{level.displayExpr}</span>
        </div>

        <p style={{ color: '#334155', margin: '6px 0 14px', fontSize: '0.95rem' }}>
          <span>{level.prompt}</span>
        </p>

        {/* Reactor SVG decorativo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <svg width="140" height="110" viewBox="0 0 140 110">
            <circle cx="70" cy="55" r="45" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 4" />
            <circle cx="70" cy="55" r="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="70" y="62" fontSize="22" fontWeight="900" textAnchor="middle" fill="#1e40af">
              {level.type === 'root-eval' ? '√' : '^'}
            </text>
          </svg>
        </div>

        {/* Input numérico reactivo */}
        <div style={{ margin: '12px 0' }}>
          <input
            type="number"
            placeholder="Escribe el resultado..."
            value={userVal}
            onChange={(e) => setUserVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            style={styles.textInput}
          />
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Comprobar Potencia / Raíz</span>
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
  mathBadge: { backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '16px', padding: '12px', margin: '10px auto', maxWidth: '340px', fontSize: '2rem', fontWeight: '900', color: '#16a34a', letterSpacing: '1px' },
  textInput: { width: '80%', maxWidth: '240px', padding: '10px', borderRadius: '10px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.3rem', fontWeight: 'bold' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#16a34a', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '8px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};