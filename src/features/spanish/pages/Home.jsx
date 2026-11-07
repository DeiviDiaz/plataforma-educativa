import { useState } from 'react';
import { Link } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';
import IlustracionGrado from '../components/IlustracionGrado';

const grados = Object.values(mallaData.grados);
const rutas = [
  'Vocales y primeras palabras', 'Rimas, sentidos y palabras', 'Cuentos, poemas y gestos',
  'Fábulas, mitos y descripciones', 'Relatos, poemas y entrevistas', 'Narración y tradición oral',
  'Personajes, medios y argumentos', 'Mitos, crónicas y literatura', 'Culturas, ensayo y realismo mágico',
];

export default function Home() {
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [modalReglasAbierto, setModalReglasAbierto] = useState(false);

  const toggleDyslexicFont = () => {
    sounds.playClick();
    const next = !dyslexicMode;
    setDyslexicMode(next);
    voiceReader.speak(next ? 'Espaciado de lectura ampliado.' : 'Espaciado de lectura estándar.');
  };

  return (
    <div className={`space-y-7 pb-8 ${dyslexicMode ? 'tracking-wide' : ''}`}>
      <section className="lengua-hero lengua-portada">
        <div>
          <p className="lengua-kicker">Lengua Viva · 1.º a 9.º</p>
          <h1>Español</h1>
          <p>Lee, escribe y practica a tu ritmo. Elige tu grado para empezar.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <a href="#grados" className="lengua-action">Elegir mi grado</a>
            <Link to="/espanol/juegos" className="lengua-action lengua-action-outline" onClick={() => sounds.playClick()}>
              Sala de juegos
            </Link>
            <button type="button" className="lengua-action lengua-action-outline" onClick={() => {
              sounds.playClick();
              voiceReader.speak('Bienvenido a Lengua Viva. Elige tu grado para leer, escribir y practicar.');
            }}>
              Escuchar bienvenida
            </button>
          </div>
        </div>
        <span aria-hidden="true" className="lengua-letras">Aa</span>
      </section>

      <section id="grados" className="space-y-4 scroll-mt-32" aria-labelledby="elige-grado">
        <h2 id="elige-grado" className="text-2xl font-extrabold">Elige tu grado</h2>
        <ul className="lengua-tarjetas-grado">
          {grados.map((grado) => (
            <li key={grado.id}>
              <Link to={`/espanol/grado/${grado.id}`} className="lengua-tarjeta-grado"
                data-grado={grado.numero} onClick={() => sounds.playClick()}>
                <IlustracionGrado numero={grado.numero} mascota={grado.icono} />
                <div className="lengua-tarjeta-texto">
                  <span className="lengua-tarjeta-nivel">{grado.numero <= 5 ? 'Primaria' : 'Secundaria'}</span>
                  <h3>{grado.nombre}</h3>
                  <p>{rutas[grado.numero - 1]}</p>
                  <span className="lengua-tarjeta-entrada">Entrar <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-blue-100">
        {/* Herramienta 1 */}
        <div className="bg-white rounded-3xl p-5 border-2 border-blue-100 shadow-sm flex items-center justify-between gap-4 group hover:border-blue-300 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all border border-blue-200">
              📖
            </div>
            <div>
              <h5 className="font-title font-black text-sm text-slate-900">Guía de Reglas</h5>
              <p className="text-xs text-slate-500 font-bold">Ortografía y acentuación.</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              setModalReglasAbierto(true);
            }}
            className="text-xs font-title font-black bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3.5 py-2.5 rounded-xl border border-blue-200 hover:border-blue-600 transition-all cursor-pointer"
          >
            Consultar
          </button>
        </div>

        {/* Herramienta 3 */}
        <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 shadow-sm flex items-center justify-between gap-4 group hover:border-purple-300 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all border border-purple-200">
              👓
            </div>
            <div>
              <h5 className="font-title font-black text-sm text-slate-900">Lectura Accesible</h5>
              <p className="text-xs text-slate-500 font-bold">Espaciado de la página</p>
            </div>
          </div>
          <button
            onClick={toggleDyslexicFont}
            aria-pressed={dyslexicMode}
            className={`text-xs font-title font-black px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
              dyslexicMode
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white border-purple-200'
            }`}
          >
            {dyslexicMode ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </section>

      {/* ══════════ MODAL DE REGLAS DE ORTOGRAFÍA ══════════ */}
      {modalReglasAbierto && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-blue-300 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-blue-700">
                <span className="text-2xl">📖</span>
                <h3 className="font-title font-black text-lg text-slate-900">
                  Guía Rápida de Ortografía y Acentuación
                </h3>
              </div>
              <button
                onClick={() => setModalReglasAbierto(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-semibold leading-relaxed">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <strong className="text-blue-900 block font-title font-black text-sm mb-1">
                  🔴 Palabras Agudas
                </strong>
                Llevan el acento en la <em>última sílaba</em>. Llevan tilde si terminan en <strong>N</strong>, <strong>S</strong> o <strong>Vocal</strong> (ej. <em>canción, compás, papá</em>).
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <strong className="text-emerald-900 block font-title font-black text-sm mb-1">
                  🟢 Palabras Graves (o Llanas)
                </strong>
                Llevan el acento en la <em>penúltima sílaba</em>. Llevan tilde si <strong>NO</strong> terminan en N, S ni Vocal (ej. <em>árbol, lápiz, cóndor</em>).
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <strong className="text-amber-900 block font-title font-black text-sm mb-1">
                  🟡 Palabras Esdrújulas
                </strong>
                Llevan el acento en la <em>antepenúltima sílaba</em>. <strong>¡Siempre llevan tilde!</strong> (ej. <em>pájaro, música, teléfono</em>).
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                <strong className="text-purple-900 block font-title font-black text-sm mb-1">
                  🟣 Verbos en Infinitivo
                </strong>
                Nombran la acción pura y terminan siempre en <strong>-ar</strong>, <strong>-er</strong> o <strong>-ir</strong> (ej. <em>cantar, correr, escribir</em>).
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setModalReglasAbierto(false);
              }}
              className="mt-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-title font-black text-xs transition-colors cursor-pointer"
            >
              ¡Entendido, volver a explorar! 👍
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
