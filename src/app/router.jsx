// src/app/router.jsx
import { Navigate, Route, Routes, Link } from 'react-router-dom';

import HomePage from '../features/home/pages/HomePage.jsx';
import GradeSelectionPage from '../features/home/pages/GradeSelectionPage.jsx';
import PeriodSelectionPage from '../features/mathematics/pages/PeriodSelectionPage.jsx';
import TopicSelectionPage from '../features/mathematics/pages/TopicSelectionPage.jsx';
import GameContainerPage from '../features/mathematics/pages/GameContainerPage.jsx';

function ComingSoonPage() {
  return (
    <main className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
      <Link className="back-link" to="/">← Volver al inicio</Link>
      <section className="message-card" style={{ marginTop: '20px' }}>
        <p style={{ color: '#2563eb', fontWeight: 'bold' }}>EN DESARROLLO</p>
        <h1>Actividad en Construcción</h1>
        <p>Próximamente estará disponible este módulo pedagógico.</p>
      </section>
    </main>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Selectores de Grado */}
      <Route path="/matematicas" element={<GradeSelectionPage subject="matematicas" />} />
      <Route path="/espanol" element={<GradeSelectionPage subject="espanol" />} />

      {/* Rutas dinámicas para matemáticas: grados 6, 7, 8 y 9 */}
      <Route path="/matematicas/grado/:gradeId" element={<PeriodSelectionPage />} />
      <Route path="/matematicas/grado/:gradeId/periodo/:periodId" element={<TopicSelectionPage />} />
      <Route path="/matematicas/grado/:gradeId/tema/:topicId" element={<GameContainerPage />} />

      {/* Español u otros */}
      <Route path="/espanol/grado/:gradeId" element={<ComingSoonPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;