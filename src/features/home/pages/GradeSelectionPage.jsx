import React from 'react';
import { Link } from 'react-router-dom';

const GRADES = [
  { id: 1, label: 'Primer grado' },
  { id: 2, label: '2.° grado' },
  { id: 3, label: '3.° grado' },
  { id: 4, label: '4.° grado' },
  { id: 5, label: '5.° grado' },
  { id: 6, label: '6.° grado' },
  { id: 7, label: '7.° grado' },
  { id: 8, label: '8.° grado' },
  { id: 9, label: '9.° grado' },
];

// Grados habilitados actualmente para matemáticas
const AVAILABLE_GRADES = [6, 7, 8, 9];

export default function GradeSelectionPage({ subject = 'matematicas' }) {
  return (
    <main className="page-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      <header style={{ marginBottom: '28px' }}>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver al inicio
        </Link>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '14px 0 6px' }}>
          Selecciona tu grado escolar
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Materia: <strong style={{ textTransform: 'capitalize' }}>{subject}</strong>
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {GRADES.map((grade) => {
          const isAvailable = subject === 'matematicas' && AVAILABLE_GRADES.includes(grade.id);

          if (isAvailable) {
            return (
              <Link
                key={grade.id}
                to={`/${subject}/grado/${grade.id}`}
                style={{
                  display: 'block',
                  backgroundColor: '#ffffff',
                  border: '2px solid #3b82f6',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2563eb' }}>
                  {grade.id}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', margin: '8px 0 4px' }}>
                  {grade.label}
                </div>
                <div style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.9rem' }}>
                  ● Disponible
                </div>
              </Link>
            );
          }

          return (
            <div
              key={grade.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                opacity: 0.6
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6' }}>
                {grade.id}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', margin: '8px 0 4px' }}>
                {grade.label}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Próximamente
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}