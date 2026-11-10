import React, { useState, useEffect } from 'react';
import GameShell from '../components/GameShell.jsx';
import { generateGradeEightChallenge } from '../data/grade-eight-games.js';

export default function GradeEightGame({ topicId }) {
  const [levelIndex, setLevelIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [level, setLevel] = useState(() => generateGradeEightChallenge(topicId));

  const [userNum, setUserNum] = useState('');
  const [userChoice, setUserChoice] = useState('');

  useEffect(() => {
    setLevelIndex(1);
    setScore(0);
    setUserNum('');
    setUserChoice('');
    setFeedback(null);
    setLevel(generateGradeEightChallenge(topicId));
  }, [topicId]);

  const nextLevel = (msg) => {
    setScore((s) => s + 20);
    setFeedback({ type: 'success', text: msg });
    setTimeout(() => {
      setFeedback(null);
      setUserNum('');
      setUserChoice('');
      setLevelIndex((prev) => (prev >= 5 ? 1 : prev + 1));
      setLevel(generateGradeEightChallenge(topicId));
    }, 1200);
  };

  const failLevel = (msg) => {
    setFeedback({ type: 'error', text: msg });
    setTimeout(() => setFeedback(null), 1900);
  };

  const checkAnswer = () => {
    if (feedback) return;

    // 1. Retos de respuesta numérica (Polinomios, Productos Notables, Función Lineal, Pitágoras, Volumen, Estadística)
    if (
      [
        'numeric',
        'pythagoras',
        'geometry-3d',
        'linear-function',
        'stats-chart',
      ].includes(level.type)
    ) {
      if (!userNum.trim()) {
        failLevel('Ingresa un valor numérico antes de comprobar.');
        return;
      }
      const parsed = parseFloat(userNum.replace(',', '.'));
      if (!isNaN(parsed) && Math.abs(parsed - level.expected) <= 0.05) {
        nextLevel(`¡Excelente! El resultado exacto es ${level.expected} 🎉`);
      } else {
        failLevel(level.failHint || 'Valor incorrecto. Revisa tus operaciones.');
      }
    }

    // 2. Retos de Selección Múltiple / Clasificación (Reales, Factorización, Congruencia, Probabilidad)
    else if (level.type === 'multiple-choice') {
      if (!userChoice) {
        failLevel('Selecciona una de las opciones disponibles antes de comprobar.');
        return;
      }
      if (userChoice === level.expectedStr) {
        nextLevel(`¡Correcto! La respuesta es ${level.expectedStr} 🎉`);
      } else {
        failLevel(level.failHint || 'Opción incorrecta. Analiza nuevamente la expresión.');
      }
    }
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
          VISUAL 1: PLANO CARTESIANO PARA FUNCIÓN LINEAL (Periodo 2)
          ============================================================= */}
      {level.type === 'linear-function' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <svg
            viewBox="0 0 220 150"
            style={{
              width: '220px',
              height: '150px',
              backgroundColor: '#f8fafc',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              boxShadow: '2px 3px 0px 0px #0f172a',
            }}
          >
            {/* Cuadrícula */}
            <line x1="0" y1="35" x2="220" y2="35" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1="115" x2="220" y2="115" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="150" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="160" y1="0" x2="160" y2="150" stroke="#e2e8f0" strokeWidth="1" />
            {/* Ejes X e Y */}
            <line x1="10" y1="75" x2="210" y2="75" stroke="#0f172a" strokeWidth="2" />
            <line x1="110" y1="10" x2="110" y2="140" stroke="#0f172a" strokeWidth="2" />
            {/* Recta de la función */}
            {level.m > 0 ? (
              <line x1="40" y1="130" x2="180" y2="20" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
              <line x1="40" y1="20" x2="180" y2="130" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
            )}
            <text x="195" y="70" fontSize="11" fontWeight="900" fill="#0f172a">X</text>
            <text x="116" y="20" fontSize="11" fontWeight="900" fill="#0f172a">Y</text>
          </svg>
        </div>
      )}

      {/* =============================================================
          VISUAL 2: TRIÁNGULO RECTÁNGULO PARA PITÁGORAS (Periodo 3)
          ============================================================= */}
      {level.type === 'pythagoras' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <svg
            viewBox="0 0 240 160"
            style={{
              width: '240px',
              height: '160px',
              backgroundColor: '#f8fafc',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              boxShadow: '2px 3px 0px 0px #0f172a',
            }}
          >
            {/* Triángulo rectángulo */}
            <polygon
              points="50,130 50,30 190,130"
              fill="#dbeafe"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Marca de ángulo recto (90°) */}
            <polyline points="50,114 66,114 66,130" fill="none" stroke="#0f172a" strokeWidth="2" />
            {/* Etiquetas de lados */}
            <text x="26" y="85" fontSize="14" fontWeight="900" fill="#1e293b">
              a = {level.sideA}
            </text>
            <text x="105" y="148" fontSize="14" fontWeight="900" fill="#1e293b">
              b = {level.sideB}
            </text>
            <text x="128" y="72" fontSize="14" fontWeight="900" fill="#2563eb">
              c = {level.sideC}
            </text>
          </svg>
        </div>
      )}

      {/* =============================================================
          VISUAL 3: PRISMAS Y CILINDROS 3D (Periodo 3)
          ============================================================= */}
      {level.type === 'geometry-3d' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <svg
            viewBox="0 0 220 150"
            style={{
              width: '220px',
              height: '150px',
              backgroundColor: '#fffbeb',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              boxShadow: '2px 3px 0px 0px #0f172a',
            }}
          >
            {level.shape === 'cylinder' ? (
              <g>
                <path d="M 65,40 L 65,115 A 45,15 0 0,0 155,115 L 155,40 Z" fill="#93c5fd" stroke="#0f172a" strokeWidth="2.5" />
                <ellipse cx="110" cy="40" rx="45" ry="15" fill="#bfdbfe" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="110" y1="40" x2="155" y2="40" stroke="#dc2626" strokeWidth="2.5" />
                <text x="122" y="35" fontSize="12" fontWeight="900" fill="#dc2626">r={level.r}</text>
                <text x="164" y="82" fontSize="12" fontWeight="900" fill="#0f172a">h={level.h}</text>
              </g>
            ) : (
              <g>
                <rect x="55" y="50" width="80" height="75" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="55,50 85,25 165,25 135,50" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="135,50 165,25 165,100 135,125" fill="#eab308" stroke="#0f172a" strokeWidth="2.5" />
                <text x="80" y="142" fontSize="12" fontWeight="900" fill="#0f172a">{level.l}×{level.w}</text>
                <text x="172" y="75" fontSize="12" fontWeight="900" fill="#0f172a">h={level.h}</text>
              </g>
            )}
          </svg>
        </div>
      )}

      {/* =============================================================
          VISUAL 4: GRÁFICO DE BARRAS ESTADÍSTICO (Periodo 4)
          ============================================================= */}
      {level.type === 'stats-chart' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px',
              height: '120px',
              padding: '16px 24px 8px',
              backgroundColor: '#f8fafc',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              boxShadow: '2px 3px 0px 0px #0f172a',
            }}
          >
            {level.dataValues.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#0f172a' }}>{val}</span>
                <div
                  style={{
                    width: '28px',
                    height: `${Math.max(18, val * 5)}px`,
                    backgroundColor: '#60a5fa',
                    border: '2px solid #0f172a',
                    borderRadius: '6px 6px 0 0',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =============================================================
          ENTRADA NUMÉRICA ESTILO GRADO 4° (Para problemas de cálculo)
          ============================================================= */}
      {[
        'numeric',
        'pythagoras',
        'geometry-3d',
        'linear-function',
        'stats-chart',
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
          FICHAS INTERACTIVAS DE SELECCIÓN (Factorización, Reales, Probabilidad, Congruencia)
          ============================================================= */}
      {level.type === 'multiple-choice' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
          {level.scenarioText && (
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

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '14px',
              width: '100%',
            }}
          >
            {level.options.map((opt) => {
              const isSelected = userChoice === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setUserChoice(opt)}
                  style={{
                    padding: '14px 24px',
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
    </GameShell>
  );
}