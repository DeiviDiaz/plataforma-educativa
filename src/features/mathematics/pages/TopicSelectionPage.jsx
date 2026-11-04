import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Compass, Hammer, Sparkles, Target } from 'lucide-react';

import { gradeFiveGames, gradeFivePeriods } from '../data/grade-five-games.js';
import { gradeFourPeriods } from '../data/grade-four-games.js';
import { gradeSixMathematics } from '../data/grade-six.js';
import { gradesCurriculum } from '../data/grades-data.js';
import { interactiveMissions, interactivePeriods } from '../data/interactive-missions.js';
import GradeFiveGame from '../games/GradeFiveGame.jsx';
import InteractiveMissionGame from '../games/InteractiveMissionGame.jsx';

const periodIcons = [Compass, Target, Sparkles, Hammer];

function TopicSelectionPage() {
  const { gradeId, periodId } = useParams();
  const currentGrade = Number(gradeId);
  const [activeMissionId, setActiveMissionId] = useState(null);
  const [activeGameIndex, setActiveGameIndex] = useState(null);

  if (currentGrade === 4) {
    const selectedPeriod = gradeFourPeriods.find((period) => period.id === Number(periodId));
    const games = selectedPeriod?.games ?? [];
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
          <p className="page-eyebrow">MATEMÁTICAS · CUARTO GRADO · PERIODO {selectedPeriod.id}</p>
          <h1>{selectedPeriod.title}</h1>
          <p>{selectedPeriod.description}</p>
        </header>
        <section className="mission-grid-list" aria-label={`Minijuegos de ${selectedPeriod.title}`}>
          {games.map((game, index) => (
            <article className="mission-card" key={game.name}>
              <span className="mission-card__icon" aria-hidden="true">
                {selectedPeriod.icon}
              </span>
              <span className="mission-card__number">Minijuego {String(index + 1).padStart(2, '0')}</span>
              <h2>{game.name}</h2>
              <p>{game.topics}</p>
              <button type="button" onClick={() => setActiveGameIndex(index)}>Ver instrucciones y jugar →</button>
            </article>
          ))}
        </section>
      </main>
    );
  }

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

  if (currentGrade === 6) {
    const selectedPeriod = interactivePeriods.find(
      (item) => item.id === Number(periodId),
    );
    const missions = interactiveMissions.filter(
      (mission) => mission.period === selectedPeriod?.id,
    );
    const activeMission = missions.find((mission) => mission.id === activeMissionId);

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
    <main className="page-container">
      <Link className="back-link" to={`/matematicas/grado/${currentGrade}`}>
          ← Volver a Periodos de {currentGrade}°
      </Link>
      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · GRADO {currentGrade}</p>
        <h1>{period.title}</h1>
        <p>Selecciona una lección o reto</p>
      </header>

      <section className="mission-grid" aria-label={`Temas de ${period.title}`}>
        {period.topics.map((topic) => {
          const hasGames = topic.gameIds?.length > 0;
          return (
            <article key={topic.id} className="mission-card">
              <span className="mission-card__icon" aria-hidden="true">
                {hasGames ? '🎮' : '⏳'}
              </span>
              <span className="mission-card__number">
                {hasGames ? 'JUEGO DISPONIBLE' : 'EN DESARROLLO'}
              </span>
              <h2>{topic.title}</h2>
              {hasGames ? (
                <Link
                  className="mission-card__action"
                  to={`/matematicas/grado/${currentGrade}/tema/${topic.id}`}
                >
                  ¡Jugar Ahora!
                </Link>
              ) : (
                <span className="period-status">Próximamente</span>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default TopicSelectionPage;
