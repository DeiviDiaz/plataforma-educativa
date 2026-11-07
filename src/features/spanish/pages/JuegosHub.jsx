import { Link, useSearchParams } from 'react-router-dom';
import ArcadeDidactico from '../components/games/ArcadeDidactico';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';

const grados = Object.values(mallaData.grados);

export default function JuegosHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const grado = grados.find((item) => item.id === searchParams.get('grado')) || grados[0];
  const juego = searchParams.get('juego');

  function cambiarGrado(id) {
    if (grado.id === id) return;
    sounds.playClick();
    setSearchParams({ grado: id }, { preventScrollReset: true });
  }

  return (
    <div className={`space-y-5 ${grado.numero <= 2 ? 'lengua-inicial' : grado.numero <= 5 ? 'lengua-primaria' : 'lengua-secundaria'}`}>
      <header className="lengua-hero lengua-curso">
        <div>
          <p className="lengua-kicker">Lengua Viva</p>
          <h1>Sala de juegos</h1>
          <p>Elige tu grado y practica con los juegos de Español.</p>
        </div>
        <Link to={`/espanol/grado/${grado.id}`} className="lengua-action lengua-action-outline">
          Ver guías de {grado.numero}.º
        </Link>
      </header>

      <section className="lengua-panel space-y-3" aria-labelledby="juegos-grado">
        <h2 id="juegos-grado" className="text-lg font-extrabold">Elige tu grado</h2>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2" role="group" aria-label="Grado de los juegos">
          {grados.map((item) => (
            <button key={item.id} type="button" aria-pressed={grado.id === item.id} aria-label={item.nombre}
              className="lengua-pestana text-center" onClick={() => cambiarGrado(item.id)}>
              {item.numero}.º
            </button>
          ))}
        </div>
      </section>

      <ArcadeDidactico key={`${grado.id}:${juego || ''}`} gradoNumero={grado.numero} juegoInicial={juego} />
    </div>
  );
}
