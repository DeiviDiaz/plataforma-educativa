import { Link } from 'react-router-dom';

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const AVAILABLE_GRADES = [5, 6, 7, 8, 9];

export default function GradeSelectionPage({ subject = 'matematicas' }) {
  const isSubjectAvailable = subject === 'matematicas';

  return (
    <main className="page-container">
      <Link className="back-link" to="/">
        ← Volver al inicio
      </Link>

      <header className="page-heading">
        <p className="page-eyebrow">SELECCIÓN DE GRADO</p>
        <h1>Selecciona tu grado escolar</h1>
        <p>Materia: <strong style={{ textTransform: 'capitalize' }}>{subject}</strong></p>
      </header>

      <section aria-labelledby="grades-title">
        <h2 id="grades-title">¿En qué grado estás?</h2>
        <div className="grades-grid">
        {GRADES.map((grade) => {
          const isAvailable = isSubjectAvailable && AVAILABLE_GRADES.includes(grade);
          const gradeContent = (
            <>
              <span className="grade-number">{grade}</span>
              <span className="grade-label">
                {grade === 1 ? 'Primer grado' : `${grade}.º grado`}
              </span>
              <span className={isAvailable ? 'grade-status grade-status--available' : 'grade-status'}>
                {isAvailable ? 'Disponible' : 'Próximamente'}
              </span>
            </>
          );

          if (isAvailable) {
            return (
              <Link
                key={grade}
                className="grade-card grade-card--available"
                to={`/${subject}/grado/${grade}`}
              >
                {gradeContent}
              </Link>
            );
          }

          return (
            <article key={grade} className="grade-card">
              {gradeContent}
            </article>
          );
        })}
        </div>
      </section>
    </main>
  );
}
