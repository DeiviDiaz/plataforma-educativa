import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { interactiveMissions, interactivePeriods } from '../data/interactive-missions.js';
import InteractiveMissionGame from '../games/InteractiveMissionGame.jsx';

function TopicSelectionPage() {
  const { periodId } = useParams();

  const selectedPeriod = interactivePeriods.find(
    (period) => period.id === Number(periodId),
  );

  const [activeMissionId, setActiveMissionId] = useState(null);

  if (!selectedPeriod) {
    return (
      <main className="page-container">
        <Link className="back-link" to="/matematicas/grado/6">
          ← Volver a los periodos
        </Link>

        <section className="message-card">
          <h1>Periodo no encontrado</h1>
          <p>El periodo que buscas no está disponible.</p>
        </section>
      </main>
    );
  }

  const missions = interactiveMissions.filter(
    (mission) => mission.period === selectedPeriod.id,
  );
  const activeMission = missions.find((mission) => mission.id === activeMissionId);

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
    <main className="page-container">
      <Link className="back-link" to="/matematicas/grado/6">
        ← Volver a los periodos
      </Link>

      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · SEXTO GRADO</p>
        <h1>{selectedPeriod.title}</h1>
        <p>{selectedPeriod.description}</p>
      </header>

      <section aria-label={`Temas de ${selectedPeriod.title}`}>
        <div className="mission-grid">
          {missions.map((mission) => (
            <article className="mission-card" key={mission.id}>
              <span className="mission-card__icon" aria-hidden="true">{mission.icon}</span>
              <span className="mission-card__number">
                Misión {String(mission.number).padStart(2, '0')}
              </span>
              <h2>{mission.title}</h2>
              <p>{mission.lesson}</p>
              <button type="button" onClick={() => setActiveMissionId(mission.id)}>
                Jugar misión →
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TopicSelectionPage;
