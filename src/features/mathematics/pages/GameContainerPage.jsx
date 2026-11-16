import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gradesCurriculum } from '../data/grades-data.js';
import { gradeSixMathematics } from '../data/grade-six.js';

// Controladores unificados para Grado 7° y Grado 8°
import GradeSevenGame from '../games/GradeSevenGame.jsx';
import GradeEightGame from '../games/GradeEightGame.jsx';

// Motor Universal y Registro (para grados anteriores como 4°, 5°, 6°)
import UniversalTopicEngine from '../games/UniversalTopicEngine.jsx';
import { TOPIC_GENERATORS } from '../data/topics-game-registry.js';

export default function GameContainerPage() {
  const { gradeId, topicId } = useParams();
  const numericGrade = Number(gradeId);

  const curriculum = numericGrade === 6 ? gradeSixMathematics : gradesCurriculum[numericGrade];

  let currentTopic = null;
  let currentPeriod = null;

  if (curriculum?.periods) {
    for (const period of curriculum.periods) {
      const t = period.topics.find((item) => item.id === topicId);
      if (t) {
        currentTopic = t;
        currentPeriod = period;
        break;
      }
    }
  }

  if (!currentTopic) {
    return (
      <main style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Tema no encontrado</h2>
        <Link to={`/matematicas/grado/${gradeId}`}>← Volver al grado</Link>
      </main>
    );
  }

  const renderGame = () => {
    // -------------------------------------------------------
    // GRADO 7° (Todos los periodos centralizados)
    // -------------------------------------------------------
    if (numericGrade === 7) {
      return <GradeSevenGame topicId={topicId} />;
    }

    // -------------------------------------------------------
    // GRADO 8° (Todos los periodos centralizados)
    // -------------------------------------------------------
    if (numericGrade === 8) {
      return <GradeEightGame topicId={topicId} />;
    }

    // -------------------------------------------------------
    // Grados 4°, 5° o 6° (Motor Universal)
    // -------------------------------------------------------
    const generatorFn = TOPIC_GENERATORS[topicId];
    if (generatorFn) {
      return <UniversalTopicEngine generatorFn={generatorFn} topicTitle={currentTopic.title} />;
    }

    // Fallback si no hay juego registrado
    return (
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px' }}>
        <p style={{ fontSize: '1.1rem', color: '#475569' }}>
          El minijuego para <strong>{currentTopic.title}</strong> está en preparación.
        </p>
      </div>
    );
  };

  return (
    <main style={{ minHeight: '90vh', padding: '24px 16px', backgroundColor: '#f8fafc' }}>
      <header
        style={{
          maxWidth: '1100px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to={`/matematicas/grado/${gradeId}/periodo/${currentPeriod.id}`}
          style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Volver a Temas
        </Link>
        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>
          Grado {gradeId}° • Periodo {currentPeriod.id}
        </span>
      </header>

      {renderGame()}
    </main>
  );
}