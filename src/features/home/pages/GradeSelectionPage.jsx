import { Link } from 'react-router-dom';

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SUBJECTS = {
  matematicas: {
    title: 'Matemáticas',
    description: 'Descubre números, resuelve problemas y supera retos.',
  },
  espanol: {
    title: 'Español',
    description: 'Explora la lectura, la escritura y el lenguaje.',
  },
};

function GradeSelectionPage({ subject }) {
  const selectedSubject = SUBJECTS[subject];

  if (!selectedSubject) {
    return (
      <main className="page-container">
        <h1>Asignatura no encontrada</h1>
        <Link className="back-link" to="/">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link className="back-link" to="/">
        ← Volver al inicio
      </Link>

      <header className="page-heading">
        <p className="page-eyebrow">SELECCIÓN DE GRADO</p>
        <h1>{selectedSubject.title}</h1>
        <p>{selectedSubject.description}</p>
      </header>

      <section aria-labelledby="grades-title">
        <h2 id="grades-title">¿En qué grado estás?</h2>

        <div className="grades-grid">
          {GRADES.map((grade) => {
            const isAvailable =
              subject === 'matematicas' && grade === 6;

            const gradeContent = (
              <>
                <span className="grade-number">{grade}</span>
                <span className="grade-label">
                  {grade === 1 ? 'Primer grado' : `${grade}.º grado`}
                </span>

                <span
                  className={
                    isAvailable
                      ? 'grade-status grade-status--available'
                      : 'grade-status'
                  }
                >
                  {isAvailable ? 'Disponible' : 'Próximamente'}
                </span>
              </>
            );

            return isAvailable ? (
              <Link
                key={grade}
                className="grade-card grade-card--available"
                to="/matematicas/grado/6"
              >
                {gradeContent}
              </Link>
            ) : (
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

export default GradeSelectionPage;
