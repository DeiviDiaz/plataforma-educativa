import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../features/home/pages/HomePage.jsx';
import GradeSelectionPage from '../features/home/pages/GradeSelectionPage.jsx';
import PeriodSelectionPage from '../features/mathematics/pages/PeriodSelectionPage.jsx';

function ComingSoonPage() {
  return (
    <main className="page-container">
      <a className="back-link" href="/">
        ← Volver al inicio
      </a>

      <section className="message-card">
        <p className="page-eyebrow">EN DESARROLLO</p>
        <h1>Estamos preparando esta sección</h1>
        <p>
          Próximamente encontrarás nuevas actividades educativas.
        </p>
      </section>
    </main>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/matematicas"
        element={<GradeSelectionPage subject="matematicas" />}
      />

      <Route
        path="/espanol"
        element={<GradeSelectionPage subject="espanol" />}
      />

      <Route
        path="/matematicas/grado/6"
        element={<PeriodSelectionPage />}
      />

      <Route
        path="/espanol/grado/6"
        element={<ComingSoonPage />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;