import React, { useState, useEffect, useRef } from 'react';
import GameShell from '../components/GameShell.jsx';
import { generateGradeSevenChallenge } from '../data/grade-seven-games.js';

export default function GradeSevenGame({ topicId }) {
  const [levelIndex, setLevelIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [level, setLevel] = useState(() => generateGradeSevenChallenge(topicId));

  const [userNum, setUserNum] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [selectedSlices, setSelectedSlices] = useState([]);
  const [cursorPos, setCursorPos] = useState(0);
  const svgRef = useRef(null);

  // Reiniciar estados al cambiar de tema
  useEffect(() => {
    setLevelIndex(1);
    setScore(0);
    setUserNum('');
    setUserChoice('');
    setSelectedSlices([]);
    setCursorPos(0);
    setFeedback(null);
    setLevel(generateGradeSevenChallenge(topicId));
  }, [topicId]);

  const nextLevel = (msg) => {
    setScore((s) => s + 20);
    setFeedback({ type: 'success', text: msg });
    setTimeout(() => {
      setFeedback(null);
      setUserNum('');
      setUserChoice('');
      setSelectedSlices([]);
      setCursorPos(0);
      setLevelIndex((prev) => (prev >= 5 ? 1 : prev + 1));
      setLevel(generateGradeSevenChallenge(topicId));
    }, 1200);
  };

  const failLevel = (msg) => {
    setFeedback({ type: 'error', text: msg });
    setTimeout(() => setFeedback(null), 1800);
  };

  // Interacción de clic y arrastre sobre la recta numérica
  const handleLineInteraction = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = offsetX / rect.width;
    const val = -2.2 + pct * 4.4;
    const rounded = parseFloat(val.toFixed(2));
    setCursorPos(rounded);
    setUserNum(String(rounded));
  };

  // Comprobación de todas las mecánicas de los 4 periodos
  const checkAnswer = () => {
    if (feedback) return;

    // 1. Recta Numérica (Periodo 2 - Tema 1)
    if (level.type === 'number-line') {
      const parsed = parseFloat(userNum.replace(',', '.'));
      if (!isNaN(parsed) && Math.abs(parsed - level.expected) <= 0.15) {
        nextLevel(`¡Exacto! ${level.badge} se ubica en ${level.expected} 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 2. Juego de las Pizzas Heterogéneas (Periodo 2 - Tema 2)
    else if (level.type === 'fraction-pizza') {
      if (selectedSlices.length === level.expected) {
        nextLevel(`¡Perfecto! Seleccionaste ${selectedSlices.length}/${level.den} porciones 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 3. Juegos de respuesta numérica (Ecuaciones, Recetas, Tanque %, Volumen y Capacidad)
    else if (
      [
        'scale-eq',
        'proportion-recipe',
        'percentage-tank',
        'volume-converter',
        'capacity-dispenser',
        'volume-capacity-lab',
      ].includes(level.type)
    ) {
      if (!userNum.trim()) {
        failLevel('Escribe un valor numérico antes de comprobar.');
        return;
      }
      const parsed = parseFloat(userNum.replace(',', '.'));
      if (!isNaN(parsed) && Math.abs(parsed - level.expected) <= 0.05) {
        nextLevel(`¡Correcto! El resultado exacto es ${level.expected} 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 4. Clasificador Variables vs Constantes (Periodo 1 - Tema 2)
    else if (level.type === 'classifier') {
      if (!userChoice) {
        failLevel('Selecciona "Variable" o "Constante" antes de comprobar.');
        return;
      }
      const ok =
        (userChoice === 'Variable' && level.isVariable) ||
        (userChoice === 'Constante' && !level.isVariable);
      if (ok) {
        nextLevel(`¡Muy bien! "${level.badge}" es ${userChoice} 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 5. Conjunto Solución (Periodo 1 - Tema 3)
    else if (level.type === 'inequality') {
      if (!userChoice) {
        failLevel('Elige una de las opciones antes de comprobar.');
        return;
      }
      if (userChoice === level.expectedChoice) {
        nextLevel(`¡Correcto! ${level.expectedChoice} al conjunto solución 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 6. Variación Directa e Inversa (Periodo 3 - Tema 3)
    else if (level.type === 'variation') {
      if (!userChoice) {
        failLevel('Selecciona "Directa" o "Inversa" antes de comprobar.');
        return;
      }
      if (userChoice === level.expectedType) {
        nextLevel(`¡Exacto! Es una variación proporcional ${level.expectedType} 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }

    // 7. Emparejamiento de Decimales y Fracciones (Periodo 2 - Tema 3)
    else if (level.type === 'decimal-match') {
      if (!userChoice) {
        failLevel('Toca una de las fichas fraccionarias antes de comprobar.');
        return;
      }
      if (userChoice === level.expectedStr) {
        nextLevel(`¡Exacto! ${level.badge} equivale a ${level.expectedStr} 🎉`);
      } else {
        failLevel(level.failHint);
      }
    }
  };

  // Dibujar las porciones de cada pizza en SVG
  const renderPizzaSlices = (totalSlices, activeSlices, isInteractive = false) => {
    const slices = [];
    const r = 55;
    const cx = 65;
    const cy = 65;

    for (let i = 0; i < totalSlices; i++) {
      const angleStart = (i * 360) / totalSlices - 90;
      const angleEnd = ((i + 1) * 360) / totalSlices - 90;
      const radStart = (angleStart * Math.PI) / 180;
      const radEnd = (angleEnd * Math.PI) / 180;

      const x1 = cx + r * Math.cos(radStart);
      const y1 = cy + r * Math.sin(radStart);
      const x2 = cx + r * Math.cos(radEnd);
      const y2 = cy + r * Math.sin(radEnd);

      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
      const isSelected = isInteractive ? selectedSlices.includes(i) : i < activeSlices;

      slices.push(
        <path
          key={i}
          d={d}
          fill={isSelected ? '#f59e0b' : '#fde68a'}
          stroke="#0f172a"
          strokeWidth="2"
          style={{ cursor: isInteractive ? 'pointer' : 'default', transition: 'all 0.15s' }}
          onClick={() => {
            if (!isInteractive) return;
            setSelectedSlices((prev) =>
              prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
            );
          }}
        />
      );
    }
    return slices;
  };

  return (
    <GameShell
      period={level.period || 1}
      missionNumber={levelIndex}
      title={level.title}
      learnConcept={level.learnConcept}
      howToPlay={level.howToPlay}
      levelText={`Nivel ${levelIndex} de 5`}
      badge={level.badge}
      formulaHint={level.formulaHint}
      prompt={level.prompt}
      onCheck={checkAnswer}
      checkLabel="Comprobar respuesta"
      feedback={feedback}
    >
      {/* =============================================================
          MECÁNICA 1: RECTA NUMÉRICA CON CURSOR MÓVIL (Periodo 2 - Tema 1)
          ============================================================= */}
      {level.type === 'number-line' && (
        <div style={{ margin: '16px 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>
            Haz clic o arrastra el punto rojo sobre la recta:
          </p>

          <svg
            ref={svgRef}
            viewBox="0 0 500 80"
            onMouseDown={handleLineInteraction}
            onMouseMove={(e) => e.buttons === 1 && handleLineInteraction(e)}
            onTouchMove={handleLineInteraction}
            style={{
              width: '100%',
              maxWidth: '460px',
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '2px solid #0f172a',
              padding: '10px 0',
            }}
          >
            <line x1="30" y1="40" x2="470" y2="40" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {[-2, -1, 0, 1, 2].map((val) => {
              const xPos = 30 + ((val - -2.2) / 4.4) * 440;
              return (
                <g key={val}>
                  <line x1={xPos} y1="28" x2={xPos} y2="52" stroke="#0f172a" strokeWidth="2.5" />
                  <text x={xPos} y="68" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">
                    {val}
                  </text>
                </g>
              );
            })}

            {(() => {
              const currentX = 30 + ((cursorPos - -2.2) / 4.4) * 440;
              return (
                <g>
                  <circle cx={currentX} cy="40" r="11" fill="#ef4444" stroke="#0f172a" strokeWidth="3" />
                  <circle cx={currentX} cy="40" r="4" fill="#ffffff" />
                </g>
              );
            })()}
          </svg>

          <div style={{ marginTop: '14px' }}>
            <span style={{ fontSize: '0.95rem', color: '#475569', fontWeight: '800' }}>
              Coordenada seleccionada:{' '}
            </span>
            <input
              type="number"
              step="any"
              value={userNum}
              onChange={(e) => {
                setUserNum(e.target.value);
                const p = parseFloat(e.target.value);
                if (!isNaN(p)) setCursorPos(p);
              }}
              style={{
                width: '100px',
                padding: '6px',
                borderRadius: '10px',
                border: '2px solid #0f172a',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: '900',
                backgroundColor: '#ffffff',
                boxShadow: '2px 2px 0px 0px #0f172a',
              }}
            />
          </div>
        </div>
      )}

      {/* =============================================================
          MECÁNICA 2: PIZZERÍA HETEROGÉNEA (Periodo 2 - Tema 2)
          ============================================================= */}
      {level.type === 'fraction-pizza' && (
        <div style={{ margin: '14px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                {level.n1}/{level.d1 || level.den}
              </span>
              <svg width="120" height="120" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="60" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
                {renderPizzaSlices(level.d1 || level.den, level.n1, false)}
              </svg>
            </div>

            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a' }}>+</span>

            <div>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                {level.n2}/{level.d2 || level.den}
              </span>
              <svg width="120" height="120" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="60" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
                {renderPizzaSlices(level.d2 || level.den, level.n2, false)}
              </svg>
            </div>

            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a' }}>=</span>

            <div>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#2563eb', display: 'block', marginBottom: '4px' }}>
                Seleccionadas: ({selectedSlices.length}/{level.den})
              </span>
              <svg width="120" height="120" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="60" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
                {renderPizzaSlices(level.den, 0, true)}
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', marginTop: '10px' }}>
            Toca las rebanadas en la tercera pizza para encenderlas o apagarlas.
          </p>
        </div>
      )}

      {/* =============================================================
          GRÁFICOS DE APOYO PARA PERIODOS 3 Y 4
          ============================================================= */}

      {/* Escalador de Recetas (Periodo 3 - Tema 1) */}
      {level.type === 'proportion-recipe' && (
        <div
          style={{
            backgroundColor: '#fff7ed',
            border: '2px solid #0f172a',
            borderRadius: '16px',
            padding: '14px',
            margin: '10px auto',
            maxWidth: '380px',
            textAlign: 'center',
            boxShadow: '2px 2px 0px 0px #0f172a',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🥣</span>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#9a3412', marginTop: '4px' }}>
            Receta Base: {level.basePortions} porciones = {level.baseGrams} g
          </div>
          <div style={{ fontSize: '0.9rem', color: '#c2410c', fontWeight: '700', marginTop: '2px' }}>
            Meta a preparar: <strong>{level.targetPortions} porciones</strong>
          </div>
        </div>
      )}

      {/* Tanque de Agua con Nivel Dinámico (Periodo 3 - Tema 2) */}
      {level.type === 'percentage-tank' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '96px',
              height: '140px',
              border: '3px solid #0f172a',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#f1f5f9',
              boxShadow: '3px 3px 0px 0px #0f172a',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: `${level.pct}%`,
                backgroundColor: '#38bdf8',
                borderTop: '2.5px solid #0284c7',
                transition: 'height 0.4s ease',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '42%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontWeight: '900',
                fontSize: '1.1rem',
                color: '#0f172a',
              }}
            >
              {level.pct}%
            </span>
          </div>
        </div>
      )}

      {/* Escalera Métrica de Volumen (Periodo 4 - Tema 1) */}
      {level.type === 'volume-converter' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '14px 0' }}>
          {['m³', 'dm³', 'cm³'].map((unit) => (
            <div
              key={unit}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                border: '2px solid #0f172a',
                backgroundColor: level.badge.includes(unit) ? '#fde047' : '#ffffff',
                fontWeight: '900',
                fontSize: '1rem',
                color: '#0f172a',
                boxShadow: '2px 2px 0px 0px #0f172a',
              }}
            >
              {unit}
            </div>
          ))}
        </div>
      )}

      {/* Probeta de Laboratorio para Capacidad y Equivalencias (Periodo 4 - Temas 2 y 3) */}
      {(level.type === 'capacity-dispenser' || level.type === 'volume-capacity-lab') && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '12px 0' }}>
          <div
            style={{
              width: '48px',
              height: '110px',
              border: '2.5px solid #0f172a',
              borderRadius: '10px',
              backgroundColor: '#e0f2fe',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '2px 2px 0px 0px #0f172a',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', backgroundColor: '#60a5fa', borderTop: '2px solid #2563eb' }} />
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a' }}>🧪 ➔ 💧</span>
        </div>
      )}

      {/* =============================================================
          CAJA DE ENTRADA NUMÉRICA (Para Ecuaciones y Periodos 3 y 4)
          ============================================================= */}
      {[
        'scale-eq',
        'proportion-recipe',
        'percentage-tank',
        'volume-converter',
        'capacity-dispenser',
        'volume-capacity-lab',
      ].includes(level.type) && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '14px 0' }}>
          <div
            style={{
              border: '2.5px dashed #0f172a',
              borderRadius: '16px',
              backgroundColor: '#fffbeb',
              padding: '22px',
              width: '100%',
              maxWidth: '420px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1rem', color: '#334155', fontWeight: '800', display: 'block', marginBottom: '12px' }}>
              Tu respuesta aparecerá aquí:
            </span>
            <input
              type="number"
              step="any"
              placeholder="?"
              value={userNum}
              onChange={(e) => setUserNum(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              style={{
                width: '140px',
                padding: '12px',
                borderRadius: '14px',
                border: '2.5px solid #0f172a',
                textAlign: 'center',
                fontSize: '1.6rem',
                fontWeight: '900',
                backgroundColor: '#ffffff',
                boxShadow: '3px 4px 0px 0px #0f172a',
                outline: 'none',
              }}
            />
          </div>
        </div>
      )}

      {/* =============================================================
          BOTONES DE SELECCIÓN DE 2 OPCIONES (Variables, Inecuaciones, Variación)
          ============================================================= */}
      {(level.type === 'classifier' || level.type === 'inequality' || level.type === 'variation') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
          {level.type === 'variation' && (
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #0f172a',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '16px',
                maxWidth: '480px',
                fontWeight: '700',
                color: '#1e293b',
                fontStyle: 'italic',
                boxShadow: '2px 2px 0px 0px #0f172a',
              }}
            >
              "{level.scenarioText}"
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {(level.type === 'classifier'
              ? ['Variable', 'Constante']
              : level.type === 'inequality'
              ? ['Sí pertenece', 'No pertenece']
              : ['Directa', 'Inversa']
            ).map((opt) => {
              const isSelected = userChoice === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setUserChoice(opt)}
                  style={{
                    padding: '16px 30px',
                    borderRadius: '14px',
                    border: '2.5px solid #0f172a',
                    fontSize: '1.15rem',
                    fontWeight: '900',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#60a5fa' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    boxShadow: isSelected ? '1px 2px 0px 0px #0f172a' : '3px 4px 0px 0px #0f172a',
                    transform: isSelected ? 'translate(2px, 2px)' : 'none',
                    transition: 'all 0.1s ease',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =============================================================
          CUADRÍCULA DE FICHAS PARA DECIMALES (Periodo 2 - Tema 3)
          ============================================================= */}
      {level.type === 'decimal-match' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '16px 0' }}>
          {level.options.map((opt) => {
            const isSelected = userChoice === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setUserChoice(opt)}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: '2.5px solid #0f172a',
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#60a5fa' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  boxShadow: isSelected ? '1px 2px 0px 0px #0f172a' : '3px 4px 0px 0px #0f172a',
                  transform: isSelected ? 'translate(2px, 2px)' : 'none',
                  transition: 'all 0.1s ease',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </GameShell>
  );
}