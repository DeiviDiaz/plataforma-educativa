import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gradeSixMathematics } from '../data/grade-six.js';
import { gradesCurriculum } from '../data/grades-data.js';

export default function TopicSelectionPage() {
  // 1. Obtenemos ambos datos de la URL
  const { gradeId, periodId } = useParams();
  const currentGrade = Number(gradeId) || 6;
  const numPeriodId = Number(periodId);

  // 2. Elegimos la fuente de datos correcta según el grado
  const curriculum = currentGrade === 6 ? gradeSixMathematics : gradesCurriculum[currentGrade];
  const period = curriculum?.periods.find((p) => p.id === numPeriodId);

  if (!period) {
    return (
      <main style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Periodo no encontrado</h2>
        <Link to={`/matematicas/grado/${currentGrade}`}>← Volver al grado</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <header style={{ marginBottom: '24px' }}>
        <Link to={`/matematicas/grado/${currentGrade}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver a Periodos de {currentGrade}°
        </Link>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '12px 0 6px' }}>
          {period.title}
        </h1>
        <p style={{ color: '#64748b' }}>Selecciona una lección o reto</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {period.topics.map((topic) => {
          const hasGames = topic.gameIds && topic.gameIds.length > 0;

          return (
            <div
              key={topic.id}
              style={{
                backgroundColor: '#fff',
                border: '2px solid',
                borderColor: hasGames ? '#3b82f6' : '#e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px', color: '#1e293b' }}>{topic.title}</h3>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  backgroundColor: hasGames ? '#dcfce7' : '#f1f5f9',
                  color: hasGames ? '#166534' : '#64748b',
                  marginBottom: '16px'
                }}>
                  {hasGames ? '🎮 Juego disponible' : '⏳ En desarrollo'}
                </span>
              </div>

              {/* Botón dinámico que incluye el grado y el tema en la URL */}
              {hasGames ? (
                <Link
                  to={`/matematicas/grado/${currentGrade}/tema/${topic.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  ¡Jugar Ahora!
                </Link>
              ) : (
                <button
                  disabled
                  style={{
                    backgroundColor: '#e2e8f0',
                    color: '#94a3b8',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'not-allowed'
                  }}
                >
                  Próximamente
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
