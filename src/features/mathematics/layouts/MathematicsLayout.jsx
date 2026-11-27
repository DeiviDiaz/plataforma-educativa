import { Outlet } from 'react-router-dom';
import bandera from '../../../assets/bandera.webp';

export default function MathematicsLayout() {
  return (
    <div className="mathematics-area">
      <div className="mathematics-area__content">
        <Outlet />
      </div>
      <footer className="institution-footer">
        <img className="institution-footer__flag" src={bandera} alt="Bandera" />
        <p>© 2026 Centro Educativo Rural Caliyaco. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
