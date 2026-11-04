import { useParams, Link } from 'react-router-dom';
import { gradeFivePeriods } from '../data/grade-five-games.js';
import { gradeSixMathematics } from '../data/grade-six.js';
import { gradesCurriculum } from '../data/grades-data.js';

export default function PeriodSelectionPage() {
  const { gradeId } = useParams();
  const currentGrade = Number(gradeId);
  const curriculum = currentGrade === 5
    ? { periods: gradeFivePeriods }
    : currentGrade === 6
      ? gradeSixMathematics
      : gradesCurriculum[currentGrade];

  if (!curriculum) {
    return (
      <main className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Grado {currentGrade}° no encontrado</h2>
        <Link to="/matematicas">← Volver a selección de grados</Link>
      </main>
    );
  }

  return (
    <main className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <header style={{ marginBottom: '24px' }}>
        <Link to="/matematicas" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver a Grados
        </Link>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '12px 0 6px' }}>
          Matemáticas - Grado {currentGrade}°
        </h1>
        <p style={{ color: '#64748b' }}>Selecciona el periodo que deseas repasar</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {curriculum.periods.map((period) => (
          <div
            key={period.id}
            style={{
              backgroundColor: '#fff',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.04)'
            }}
          >
            <h3 style={{ marginTop: 0, color: '#1e293b' }}>{period.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              {currentGrade === 5 ? period.description : `${period.topics.length} temas disponibles`}
            </p>
            <Link
              to={`/matematicas/grado/${currentGrade}/periodo/${period.id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              Ver temas →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
