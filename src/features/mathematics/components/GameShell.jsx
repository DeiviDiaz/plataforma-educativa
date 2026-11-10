import React from 'react';

export default function GameShell({
  period = 1,
  missionNumber = 1,
  title = 'Misión Matemática',
  learnConcept = '',
  howToPlay = '',
  levelText = 'Nivel 1 de 5',
  formulaHint = '',
  badge = '',
  prompt = '',
  onCheck,
  checkLabel = 'Comprobar respuesta',
  checkDisabled = false,
  feedback = null,
  children,
}) {
  return (
    <div
      translate="no"
      className="notranslate"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '16px 8px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.8fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* COLUMNA IZQUIERDA: PEDAGOGÍA */}
        <aside
          style={{
            backgroundColor: '#eff6ff',
            border: '2.5px solid #0f172a',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2.5px solid #0f172a',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
            }}
          >
            🧭
          </div>

          <div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '1px',
                color: '#2563eb',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              PERIODO {period} · MISIÓN {missionNumber}
            </div>
            <h1
              style={{
                fontSize: '1.9rem',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: '1.15',
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '900',
                fontSize: '1rem',
                color: '#0f172a',
                marginBottom: '8px',
              }}
            >
              <span>👁️</span>
              <span>Mira y aprende</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: '1.45' }}>
              {learnConcept || 'Comprende el concepto observando las relaciones entre los términos.'}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #0f172a',
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '900',
                fontSize: '1rem',
                color: '#0f172a',
                marginBottom: '8px',
              }}
            >
              <span>💡</span>
              <span>Cómo jugar</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: '1.45' }}>
              {howToPlay || '1. Observa el reto. 2. Realiza la operación. 3. Comprueba tu respuesta.'}
            </p>
          </div>
        </aside>

        {/* COLUMNA DERECHA: TABLERO INTERACTIVO */}
        <section
          style={{
            backgroundColor: '#ffffff',
            border: '2.5px solid #0f172a',
            borderRadius: '24px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 4px 0px 0px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>🎯</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Tu desafío
              </h2>
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#64748b' }}>
              {levelText}
            </span>
          </div>

          {/* Caja Superior Azul de la Expresión Matemática */}
          {(badge || formulaHint) && (
            <div
              style={{
                backgroundColor: '#eff6ff',
                border: '2px solid #0f172a',
                borderRadius: '16px',
                padding: '18px',
                textAlign: 'center',
              }}
            >
              {title && (
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>
                  {title}
                </div>
              )}
              {badge && (
                <div
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: '900',
                    color: '#0f172a',
                    display: 'inline-block',
                    padding: '6px 20px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #0f172a',
                    borderRadius: '12px',
                    boxShadow: '2px 3px 0px 0px #0f172a',
                  }}
                >
                  {badge}
                </div>
              )}
              {formulaHint && (
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px', fontWeight: '700' }}>
                  {formulaHint}
                </div>
              )}
            </div>
          )}

          {/* Pregunta Principal */}
          {prompt && (
            <p style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '4px 0 6px' }}>
              {prompt}
            </p>
          )}

          {/* Área Dinámica Interactiva (Inputs / Fichas) */}
          <div style={{ width: '100%' }}>
            {children}
          </div>

          {/* Botón Arcade */}
          <div>
            <button
              onClick={onCheck}
              disabled={checkDisabled}
              style={{
                backgroundColor: checkDisabled ? '#cbd5e1' : '#fde047',
                color: '#0f172a',
                border: '2.5px solid #0f172a',
                borderRadius: '14px',
                padding: '14px 28px',
                fontSize: '1.05rem',
                fontWeight: '900',
                cursor: checkDisabled ? 'not-allowed' : 'pointer',
                boxShadow: checkDisabled ? 'none' : '3px 4px 0px 0px #0f172a',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{checkLabel}</span>
            </button>
          </div>

          {/* Banner de Feedback */}
          {feedback && (
            <div
              style={{
                padding: '14px',
                borderRadius: '14px',
                fontWeight: '800',
                fontSize: '1rem',
                border: '2px solid #0f172a',
                backgroundColor: feedback.type === 'success' ? '#bbf7d0' : '#fecaca',
                color: '#0f172a',
                boxShadow: '2px 2px 0px 0px #0f172a',
              }}
            >
              <span>{feedback.text}</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}