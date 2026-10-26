import { Link } from 'react-router-dom';

const PERIODS = [
  {
    id: 1,
    title: 'Periodo 1',
    description:
      'Números naturales, operaciones, divisibilidad, MCD, MCM y ángulos.',
  },
  {
    id: 2,
    title: 'Periodo 2',
    description:
      'Conjuntos, relaciones entre conjuntos, operaciones y polígonos.',
  },
  {
    id: 3,
    title: 'Periodo 3',
    description:
      'Fracciones, números decimales, circunferencia y estadística.',
  },
  {
    id: 4,
    title: 'Periodo 4',
    description:
      'Decimales, geometría, tablas de frecuencia, gráficas y probabilidad.',
  },
];

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
          <article className="period-card" key={period.id}>
            <span className="period-number">
              {String(period.id).padStart(2, '0')}
            </span>

            <h2>{period.title}</h2>
            <p>{period.description}</p>

            <span className="period-status">
              Temas en preparación
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}

export default PeriodSelectionPage;
