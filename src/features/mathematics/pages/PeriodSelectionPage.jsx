import { Link, useParams } from 'react-router-dom';
import { Compass, DoorOpen, Hammer, Sparkles, Target, Wrench } from 'lucide-react';
import { gradeFivePeriods } from '../data/grade-five-games.js';
import { interactivePeriods } from '../data/interactive-missions.js';

const periodIcons = {
  1: Compass,
  2: Wrench,
  3: DoorOpen,
  4: Sparkles,
};

function PeriodSelectionPage() {
  const { grade } = useParams();
  const periods = grade === '5'
    ? gradeFivePeriods
    : interactivePeriods;

  return (
    <main className="page-container">
      <Link className="back-link" to="/matematicas">
        ← Volver a los grados
      </Link>

      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · {grade === '5' ? 'QUINTO' : 'SEXTO'} GRADO</p>
        <h1>Selecciona un periodo</h1>
        <p>
          Explora los contenidos y prepárate para resolver nuevos retos.
        </p>
      </header>

      <section className="periods-grid" aria-label="Periodos académicos">
        {periods.map((period) => (
          <Link
            className={`period-card period-card--${period.color}`}
            key={period.id}
            to={`/matematicas/grado/${grade}/periodo/${period.id}`}
          >
            <span className="period-number">
              {String(period.id).padStart(2, '0')}
            </span>

            <h2>{period.title}</h2>
            <p>{period.description}</p>

            <span className="period-status">
              {(() => {
                const Icon = grade === '5'
                  ? [Compass, Target, Sparkles, Hammer][period.id - 1]
                  : periodIcons[period.id];
                return <Icon aria-hidden="true" size={18} />;
              })()}
              {period.action ?? 'Explorar periodo'}
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default PeriodSelectionPage;
