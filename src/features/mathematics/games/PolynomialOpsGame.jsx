import React, { useState } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function PolynomialOpsGame() {
  const generateLevel = () => {
    const isMultiplication = Math.random() > 0.5;

    if (isMultiplication) {
      // Producto de monomio por binomio: kx * (ax + b) = (k*a)x^2 + (k*b)x
      const k = pick([-4, -3, -2, 2, 3, 4]);
      const a = pick([2, 3, 5]);
      const b = pick([-5, -3, 3, 4, 6]);

      const coefX2 = k * a;
      const coefX = k * b;

      return {
        type: 'mult',
        title: 'Multiplicación de Polinomios',
        expr: `${k}x · (${a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`})`,
        expected: { x2: coefX2, x: coefX, c: 0 },
        hint: `${k} · ${a} = ${coefX2}  y  ${k} · (${b}) = ${coefX}`,
      };
    } else {
      // Suma/Resta de polinomios: (a1 x^2 + b1 x + c1) + (a2 x^2 + b2 x + c2)
      const a1 = rand(1, 5);
      const b1 = pick([-4, -2, 3, 5]);
      const c1 = pick([-6, -2, 4, 7]);

      const a2 = pick([-3, 2, 4]);
      const b2 = pick([-5, -1, 2, 6]);
      const c2 = pick([-4, 1, 5]);

      const p1Str = `${a1}x² ${b1 >= 0 ? `+ ${b1}x` : `- ${Math.abs(b1)}x`} ${c1 >= 0 ? `+ ${c1}` : `- ${Math.abs(c1)}`}`;
      const p2Str = `${a2 >= 0 ? `${a2}x²` : `- ${Math.abs(a2)}x²`} ${b2 >= 0 ? `+ ${b2}x` : `- ${Math.abs(b2)}x`} ${c2 >= 0 ? `+ ${c2}` : `- ${Math.abs(c2)}`}`;

      return {
        type: 'add',
        title: 'Suma de Polinomios',
        expr: `(${p1Str}) + (${p2Str})`,
        expected: { x2: a1 + a2, x: b1 + b2, c: c1 + c2 },
        hint: `x²: (${a1}+${a2}),  x: (${b1}+${b2}),  Const: (${c1}+${c2})`,
      };
    }
  };

  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(generateLevel);
  const [inputX2, setInputX2] = useState('');
  const [inputX, setInputX] = useState('');
  const [inputC, setInputC] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);

  const checkAnswer = () => {
    if (feedback) return;

    const uX2 = parseInt(inputX2, 10);
    const uX = parseInt(inputX, 10);
    const uC = level.type === 'mult' ? 0 : parseInt(inputC, 10);

    const x2Ok = uX2 === level.expected.x2;
    const xOk = uX === level.expected.x;
    const cOk = level.type === 'mult' ? true : uC === level.expected.c;

    if (x2Ok && xOk && cOk) {
      setScore((s) => s + 30);
      setFeedback({
        type: 'success',
        text: `¡Polinomio exacto! Coeficientes: [${level.expected.x2}, ${level.expected.x}${level.type === 'add' ? `, ${level.expected.c}` : ''}] 🎉`,
      });
      setTimeout(() => {
        setFeedback(null);
        setInputX2('');
        setInputX('');
        setInputC('');
        setRound((r) => r + 1);
        setLevel(generateLevel());
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback({
        type: 'error',
        text: `Revisa los términos semejantes: ${level.hint}.`,
      });
      setTimeout(() => setFeedback(null), 1700);
    }
  };

  if (lives <= 0) {
    return (
      <div style={styles.card} translate="no" className="notranslate">
        <h2><span>¡Fin de la Operación! 📐</span></h2>
        <p style={{ margin: '14px 0', fontSize: '1.2rem' }}>
          <span>Puntaje final: <strong>{score} pts</strong></span>
        </p>
        <p style={{ color: '#64748b' }}>
          <span>Polinomios resueltos: {round - 1}</span>
        </p>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            setLives(3);
            setScore(0);
            setRound(1);
            setInputX2('');
            setInputX('');
            setInputC('');
            setLevel(generateLevel());
            setFeedback(null);
          }}
        >
          <span>Reiniciar Ejercicio</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container} translate="no" className="notranslate">
      <div style={styles.hud}>
        <span>❤️ {lives}</span>
        <span>📐 Reto #{round}</span>
        <span>⭐ {score} pts</span>
      </div>

      <div key={`board-poly-${round}`} style={styles.board}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {level.title}
        </span>

        {/* Expresión del Reto */}
        <div style={styles.polyBadge}>
          <span>{level.expr}</span>
        </div>

        <p style={{ color: '#334155', margin: '4px 0 14px', fontSize: '0.95rem' }}>
          <span>Completa los coeficientes del polinomio resultante:</span>
        </p>

        {/* Campos de coeficientes */}
        <div style={styles.inputsRow}>
          <div style={styles.inputCol}>
            <input
              type="number"
              placeholder="0"
              value={inputX2}
              onChange={(e) => setInputX2(e.target.value)}
              style={styles.coefInput}
            />
            <span style={styles.termLabel}>x²</span>
          </div>

          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#64748b' }}>+</span>

          <div style={styles.inputCol}>
            <input
              type="number"
              placeholder="0"
              value={inputX}
              onChange={(e) => setInputX(e.target.value)}
              style={styles.coefInput}
            />
            <span style={styles.termLabel}>x</span>
          </div>

          {level.type === 'add' && (
            <>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#64748b' }}>+</span>
              <div style={styles.inputCol}>
                <input
                  type="number"
                  placeholder="0"
                  value={inputC}
                  onChange={(e) => setInputC(e.target.value)}
                  style={styles.coefInput}
                />
                <span style={styles.termLabel}>Cte</span>
              </div>
            </>
          )}
        </div>

        <button style={styles.actionBtn} onClick={checkAnswer}>
          <span>Comprobar Polinomio</span>
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
  polyBadge: { backgroundColor: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: '14px', padding: '12px', margin: '10px auto', maxWidth: '420px', fontSize: '1.4rem', fontWeight: '900', color: '#1d4ed8' },
  inputsRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '16px 0' },
  inputCol: { display: 'flex', alignItems: 'center', gap: '4px' },
  coefInput: { width: '64px', padding: '8px', borderRadius: '8px', border: '2px solid #cbd5e1', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
  termLabel: { fontSize: '1.2rem', fontWeight: '800', color: '#334155' },
  actionBtn: { width: '100%', maxWidth: '280px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' },
  card: { textAlign: 'center', padding: '36px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};