import { Link } from 'react-router-dom';
import { interactivePeriods } from '../data/interactive-missions.js';

const PERIODS = interactivePeriods;

function PeriodSelectionPage() {
  return (
    <main className="page-container">
      <Link className="back-link" to="/matematicas">
        ← Volver a los grados
      </Link>

      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · SEXTO GRADO</p>
        <h1>Selecciona un periodo</h1>
        <p>
          Explora los contenidos y prepárate para resolver nuevos retos.
        </p>
      </header>

      <section className="periods-grid" aria-label="Periodos académicos">
        {PERIODS.map((period) => (
          <Link
            className={`period-card period-card--${period.color}`}
            key={period.id}
            to={`/matematicas/grado/6/periodo/${period.id}`}
          >
            <span className="period-number">
              {String(period.id).padStart(2, '0')}
            </span>

            <h2>{period.title}</h2>
            <p>{period.description}</p>

            <span className="period-status">{period.icon} {period.action} →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default PeriodSelectionPage;
