import { useParams, Link } from 'react-router-dom';
import { Compass, DoorOpen, Hammer, Sparkles, Target, Wrench } from 'lucide-react';
import { gradeFivePeriods } from '../data/grade-five-games.js';
import { gradeFourPeriods } from '../data/grade-four-games.js';
import { gradesCurriculum } from '../data/grades-data.js';
import { interactivePeriods } from '../data/interactive-missions.js';

export default function PeriodSelectionPage() {
  const { gradeId } = useParams();
  const currentGrade = Number(gradeId);
  const curriculum = currentGrade === 4
    ? { periods: gradeFourPeriods }
    : currentGrade === 5
      ? { periods: gradeFivePeriods }
    : currentGrade === 6
      ? { periods: interactivePeriods }
      : gradesCurriculum[currentGrade];
  const periodIcons = {
    1: Compass,
    2: Wrench,
    3: DoorOpen,
    4: Sparkles,
  };

  if (!curriculum) {
    return (
      <main className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Grado {currentGrade}° no encontrado</h2>
        <Link to="/matematicas">← Volver a selección de grados</Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link className="back-link" to="/matematicas">
          ← Volver a Grados
      </Link>
      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · GRADO {currentGrade}</p>
        <h1>Selecciona un periodo</h1>
        <p>Explora los contenidos y prepárate para resolver nuevos retos.</p>
      </header>

      <section className="periods-grid" aria-label="Periodos académicos">
        {curriculum.periods.map((period) => (
          <Link
            key={period.id}
            className={`period-card period-card--${period.color ?? ['green', 'orange', 'purple', 'red'][(period.id - 1) % 4]}`}
            to={`/matematicas/grado/${currentGrade}/periodo/${period.id}`}
          >
            <span className="period-number">{String(period.id).padStart(2, '0')}</span>
            <h2>{period.title}</h2>
            <p>{period.description ?? `${period.topics.length} temas disponibles para explorar.`}</p>
            <span className="period-status">
              {currentGrade === 6 ? period.icon : (() => {
                const Icon = currentGrade === 5
                  ? [Compass, Target, Sparkles, Hammer][period.id - 1]
                  : periodIcons[period.id];
                return Icon ? <Icon aria-hidden="true" size={18} /> : null;
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
