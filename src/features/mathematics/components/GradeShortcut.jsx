import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function GradeShortcut({ className = '' }) {
  return (
    <Link
      className={`grade-shortcut ${className}`}
      to="/matematicas"
      aria-label="Ir a seleccionar grado"
    >
      <GraduationCap aria-hidden="true" size={18} />
      <span>Seleccionar grado</span>
    </Link>
  );
}
