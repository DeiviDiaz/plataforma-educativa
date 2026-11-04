import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Compass, Hammer, Sparkles, Target } from 'lucide-react';

import { gradeFiveGames, gradeFivePeriods } from '../data/grade-five-games.js';
import { gradeSixMathematics } from '../data/grade-six.js';
import { gradesCurriculum } from '../data/grades-data.js';
import { interactiveMissions } from '../data/interactive-missions.js';
import GradeFiveGame from '../games/GradeFiveGame.jsx';
import InteractiveMissionGame from '../games/InteractiveMissionGame.jsx';

const periodIcons = [Compass, Target, Sparkles, Hammer];

function TopicSelectionPage() {
  const { gradeId, periodId } = useParams();
  const currentGrade = Number(gradeId);
  const [activeMissionId, setActiveMissionId] = useState(null);
  const [activeGameIndex, setActiveGameIndex] = useState(null);

  if (currentGrade === 5) {
    const selectedPeriod = gradeFivePeriods.find((period) => period.id === Number(periodId));
    const games = selectedPeriod ? gradeFiveGames[selectedPeriod.id - 1] : [];
    const activeGame = games[activeGameIndex];

    if (!selectedPeriod) {
      return (
        <main className="page-container">
          <Link className="back-link" to={`/matematicas/grado/${currentGrade}`}>← Volver a los periodos</Link>
          <section className="message-card"><h1>Periodo no encontrado</h1></section>
        </main>
      );
    }

    if (activeGame) {
      return (
        <GradeFiveGame
          period={selectedPeriod}
          game={activeGame}
          gameNumber={activeGameIndex}
          onBack={() => setActiveGameIndex(null)}
          onNextGame={() => setActiveGameIndex(activeGameIndex === games.length - 1 ? null : activeGameIndex + 1)}
        />
      );
    }

    return (
      <main className="page-container">
        <Link className="back-link" to={`/matematicas/grado/${currentGrade}`}>← Volver a los periodos</Link>
        <header className="page-heading">
          <p className="page-eyebrow">MATEMÁTICAS · QUINTO GRADO · PERIODO {selectedPeriod.id}</p>
          <h1>{selectedPeriod.title}</h1>
          <p>{selectedPeriod.description}</p>
        </header>
        <section className="mission-grid-list" aria-label={`Misiones de ${selectedPeriod.title}`}>
          {games.map((game, index) => (
            <article className="mission-card" key={game.name}>
              <span className="mission-card__icon" aria-hidden="true">
                {(() => { const Icon = periodIcons[selectedPeriod.id - 1] ?? Compass; return <Icon />; })()}
              </span>
              <span className="mission-card__number">Misión {String(index + 1).padStart(2, '0')}</span>
              <h2>{game.name}</h2>
              <p>{game.topics}</p>
              <button type="button" onClick={() => setActiveGameIndex(index)}>Mira y aprende →</button>
            </article>
          ))}
        </section>
      </main>
    );
  }

  const curriculum = currentGrade === 6 ? gradeSixMathematics : gradesCurriculum[currentGrade];
  const period = curriculum?.periods.find((item) => item.id === Number(periodId));
  const missions = interactiveMissions.filter((mission) => mission.period === Number(periodId));
  const activeMission = missions.find((mission) => mission.id === activeMissionId);

  if (!period) {
    return (
      <main className="page-container">
        <Link className="back-link" to={`/matematicas/grado/${currentGrade}`}>← Volver al grado</Link>
        <section className="message-card"><h1>Periodo no encontrado</h1></section>
      </main>
    );
  }

  if (activeMission) {
    const nextMission = missions[missions.indexOf(activeMission) + 1];
    return (
      <InteractiveMissionGame
        mission={activeMission}
        onBack={() => setActiveMissionId(null)}
        onNext={() => setActiveMissionId(nextMission?.id ?? null)}
      />
    );
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <header style={{ marginBottom: '24px' }}>
        <Link to={`/matematicas/grado/${currentGrade}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver a Periodos de {currentGrade}°
        </Link>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '12px 0 6px' }}>{period.title}</h1>
        <p style={{ color: '#64748b' }}>Selecciona una lección o reto</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {period.topics.map((topic) => {
          const hasGames = topic.gameIds?.length > 0;
          return (
            <div key={topic.id} style={{
              backgroundColor: '#fff',
              border: '2px solid',
              borderColor: hasGames ? '#3b82f6' : '#e2e8f0',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
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
              {hasGames ? (
                <Link
                  to={`/matematicas/grado/${currentGrade}/tema/${topic.id}`}
                  style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  ¡Jugar Ahora!
                </Link>
              ) : (
                <button disabled style={{ backgroundColor: '#e2e8f0', color: '#94a3b8', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'not-allowed' }}>
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

export default TopicSelectionPage;
