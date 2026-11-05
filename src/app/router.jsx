// src/app/router.jsx
import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../features/home/pages/HomePage.jsx';
import GradeSelectionPage from '../features/home/pages/GradeSelectionPage.jsx';
import PeriodSelectionPage from '../features/mathematics/pages/PeriodSelectionPage.jsx';
import TopicSelectionPage from '../features/mathematics/pages/TopicSelectionPage.jsx';
import GameContainerPage from '../features/mathematics/pages/GameContainerPage.jsx';

// ══════════════════════════════════════════════════════════════
// MÓDULO OFICIAL DE ESPAÑOL ("Lengua Viva" - Grados 1° a 9°)
// ══════════════════════════════════════════════════════════════
import SpanishLayout from '../features/spanish/layouts/SpanishLayout.jsx';
import SpanishHome from '../features/spanish/pages/Home.jsx';
import SpanishGradoView from '../features/spanish/pages/GradoView.jsx';
import SpanishJuegosHub from '../features/spanish/pages/JuegosHub.jsx';
import SpanishAdminView from '../features/spanish/pages/AdminView.jsx';
import SpanishLetrasView from '../features/spanish/pages/LetrasView.jsx';

function AppRouter() {
  return (
    <Routes>
      {/* Portal Principal */}
      <Route path="/" element={<HomePage />} />

      {/* ═══ MATEMÁTICAS (Área de tu compañero - 100% Intacta) ═══ */}
      <Route path="/matematicas" element={<GradeSelectionPage subject="matematicas" />} />
      <Route path="/matematicas/grado/:gradeId" element={<PeriodSelectionPage />} />
      <Route path="/matematicas/grado/:gradeId/periodo/:periodId" element={<TopicSelectionPage />} />
      <Route path="/matematicas/grado/:gradeId/tema/:topicId" element={<GameContainerPage />} />

      {/* ═══ ESPAÑOL (Módulo interactivo completo de 1° a 9°) ═══ */}
      <Route path="/espanol" element={<SpanishLayout />}>
        {/* Dashboard de Español con selector de 1° a 9° */}
        <Route index element={<SpanishHome />} />

        {/* Abecedario y Fonética Interactiva (Diapositivas 4 y 5) */}
        <Route path="letras" element={<SpanishLetrasView />} />

        {/* Sala Central de Juegos Didácticos (Arcade de 15 juegos) */}
        <Route path="juegos" element={<SpanishJuegosHub />} />

        {/* Flujo Docente y Gestión de Aula (Diapositiva 6) */}
        <Route path="admin" element={<SpanishAdminView />} />

        {/* Malla Curricular, Lecciones y Comprensión por Grado */}
        <Route path="grado/:gradoId" element={<SpanishGradoView />} />

        {/* Redirección para rutas no encontradas dentro de español */}
        <Route path="*" element={<Navigate to="/espanol" replace />} />
      </Route>

      {/* Redirección global */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
