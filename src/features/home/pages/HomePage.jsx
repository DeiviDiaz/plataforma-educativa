import { Link } from 'react-router-dom';
import bandera from '../../../assets/bandera.webp';
import logo from '../../../assets/logo.webp';

function HomePage() {
  return (
    <main className="home">
      <header className="home__header">
        <div className="home__brand">
          <img className="home__logo" src={logo} alt="Logo CER Caliyaco" />
          <span className="home__brand-text">
            <span>CER Caliyaco</span>
            <span>Educación con calidad</span>
          </span>
        </div>
        <span className="home__badge">Aula Interactiva</span>
      </header>

      <section className="home__hero">
        <p className="home__eyebrow">TU ESPACIO DE APRENDIZAJE</p>

        <h1>
          ¡Aprender puede ser
          <span> una aventura!</span>
        </h1>

        <p className="home__description">
          Explora nuevos conocimientos, supera retos y aprende a tu ritmo
          con actividades interactivas.
        </p>
      </section>

      <section className="subjects" aria-labelledby="subjects-title">
        <h2 id="subjects-title">¿Qué quieres aprender hoy?</h2>

        <div className="subjects__grid">
          <Link
            className="subject-card subject-card--math"
            to="/matematicas"
          >
            <span className="subject-card__icon" aria-hidden="true">
              ∑
            </span>

            <h3>Matemáticas</h3>

            <p>
              Resuelve problemas, descubre patrones y supera desafíos
              numéricos.
            </p>

            <span className="subject-card__action">
              Explorar Matemáticas →
            </span>
          </Link>

          <Link
            className="subject-card subject-card--spanish"
            to="/espanol"
          >
            <span className="subject-card__icon" aria-hidden="true">
              Aa
            </span>

            <h3>Español</h3>

            <p>
              Descubre palabras, mejora tu comprensión y juega con el
              lenguaje.
            </p>

            <span className="subject-card__action">
              Explorar Español →
            </span>
          </Link>
        </div>
      </section>

      <footer className="institution-footer home__footer">
        <img className="institution-footer__flag" src={bandera} alt="Bandera" />
        <p>© 2026 Centro Educativo Rural Caliyaco. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

export default HomePage;
