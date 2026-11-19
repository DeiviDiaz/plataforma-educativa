import { Link, useSearchParams } from 'react-router-dom';
import ArcadeDidactico from '../components/games/ArcadeDidactico';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';

const grados = Object.values(mallaData.grados);

export default function JuegosHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const grado = grados.find((item) => item.id === searchParams.get('grado')) || grados[0];
  const juego = searchParams.get('juego');
  const guia = searchParams.get('guia');

  function cambiarGrado(id) {
    if (grado.id === id) return;
    sounds.playClick();
    setSearchParams({ grado: id }, { preventScrollReset: true });
  }

  return (
    <div className={`space-y-5 ${grado.numero <= 2 ? 'lengua-inicial' : grado.numero <= 5 ? 'lengua-primaria' : 'lengua-secundaria'}`}>
      <header className="lengua-cabecera-grado">
        <h1>Juegos de Español</h1>
        <Link to={'/espanol/grado/' + grado.id + (guia ? '?' + new URLSearchParams({ guia }) : '')} className="lengua-nav-guia">
          ← Guías de {grado.numero}.º
        </Link>
      </header>
      <label className="lengua-elegir-grado">
        Grado
        <select className="lengua-select" value={grado.id} onChange={(event) => cambiarGrado(event.target.value)}>
          {grados.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
      </label>

      <ArcadeDidactico key={`${grado.id}:${juego || ''}`} gradoNumero={grado.numero} juegoInicial={juego} />
    </div>
  );
}
