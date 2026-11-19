import { useState } from 'react';
import RetoDeGuia from './RetoDeGuia';
import { retosPorGuia, secuenciasPorGuia } from '../data/retosPorGuia';
import ArcadeDidactico from './games/ArcadeDidactico';
import PizarraDigital from './PizarraDigital';
import TemporizadorClase from './TemporizadorClase';
import TallerNarrativo from './TallerNarrativo';
import CazaLetrasJuego from './interactive/CazaLetrasJuego';
import CuentacuentosIlustrado from './interactive/CuentacuentosIlustrado';
import KaraokeCoplas from './interactive/KaraokeCoplas';
import SelectorEstudiante from './interactive/SelectorEstudiante';
import CofreTesoros from './interactive/CofreTesoros';
import ComprensionLectora from './classroom/ComprensionLectora';
import GeneradorFichas from './classroom/GeneradorFichas';
import BancoRetosAula from './classroom/BancoRetosAula';
import GlosarioInteractivo from './classroom/GlosarioInteractivo';
import TeoriaPedagogicaEnriquecida from './classroom/TeoriaPedagogicaEnriquecida';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';

export default function ModuloLeccion({ guia, gradoNombre, gradoNumero = 1, onSiguienteGuia }) {
  const esSecundaria = gradoNumero >= 6;

  // 4 Pilares Maestros de Aprendizaje
  const rondas = retosPorGuia[guia.id];
  const [seccionPrincipal, setSeccionPrincipal] = useState(rondas && !esSecundaria ? 'reto' : 'leccion'); // 'leccion', 'comprension', 'juegos', 'herramientas'
  const [subSeccion, setSubSeccion] = useState('principal'); // sub-vistas dentro de cada pilar
  const tituloGuia = guia.titulo || guia.nombre || 'Guía de Aprendizaje';

  const cambiarSeccion = (sec, sub = 'principal') => {
    sounds.playClick();
    voiceReader.stop();
    setSeccionPrincipal(sec);
    setSubSeccion(sub);
  };

  const pilares = [
    ...(!esSecundaria && rondas ? [{ id: 'reto', label: 'Aprender jugando' }] : []),
    { id: 'leccion', label: gradoNumero <= 2 ? 'Leer' : 'Lectura' },
    { id: 'comprension', label: gradoNumero <= 2 ? 'Responder' : 'Comprensión' },
    ...(esSecundaria && rondas ? [{ id: 'reto', label: 'Reto de la guía' }] : []),
    { id: 'juegos', label: !esSecundaria && rondas ? 'Más juegos' : 'Juegos' },
  ];

  return (
    <div className="lengua-leccion space-y-4">
      <div className="lengua-actividades" role="group" aria-label="Actividades de la guía">
        {pilares.map((pilar) => (
          <button key={pilar.id} type="button" className="lengua-pestana"
            aria-pressed={seccionPrincipal === pilar.id} onClick={() => cambiarSeccion(pilar.id)}>
            {pilar.label}
          </button>
        ))}
        <details className="lengua-mas-recursos">
          <summary className="lengua-pestana">Recursos</summary>
          <button type="button" className="lengua-pestana" aria-pressed={seccionPrincipal === 'herramientas'}
            onClick={() => cambiarSeccion('herramientas')}>Taller y herramientas</button>
          <button type="button" className="lengua-pestana" aria-pressed={seccionPrincipal === 'leccion' && subSeccion === 'teatro'}
            onClick={() => cambiarSeccion('leccion', 'teatro')}>Narrar y representar</button>
        </details>
      </div>

      {seccionPrincipal === 'reto' && rondas && (
        <RetoDeGuia rondas={rondas} secuencia={secuenciasPorGuia[guia.id]}
          explorarVocales={guia.id === '1-1-3'} grado={gradoNumero} guiaId={guia.id} onSiguienteGuia={onSiguienteGuia} />
      )}

      {/* ══════════ PILAR 1: LECTURA Y LECCIÓN PRINCIPAL ══════════ */}
      {seccionPrincipal === 'leccion' && (
        <div className="space-y-6 animate-fade-in">
          {subSeccion === 'principal' ? (
            <TeoriaPedagogicaEnriquecida
              guia={guia}
              gradoNumero={gradoNumero}
              gradoNombre={gradoNombre}
              onAvanzarPaso={(sec) => cambiarSeccion(sec)}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <CuentacuentosIlustrado titulo={`Teatro y Oratoria: ${tituloGuia}`} />
            </div>
          )}
        </div>
      )}

      {/* ══════════ PILAR 2: COMPRENSIÓN LECTORA Y CUADERNO ══════════ */}
      {seccionPrincipal === 'comprension' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub-navegación de comprensión */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSubSeccion('principal')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'principal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Preguntas
            </button>
            <button
              onClick={() => setSubSeccion('cuaderno')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'cuaderno' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Cuaderno
            </button>
            <button
              onClick={() => setSubSeccion('glosario')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'glosario' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Glosario
            </button>
          </div>

          {subSeccion === 'principal' && (
            <div className="space-y-6">
              <ComprensionLectora
                lecturaTitulo={tituloGuia}
                preguntas={guia.preguntasComprension || null}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => cambiarSeccion('juegos')}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Elegir un juego</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          )}

          {subSeccion === 'cuaderno' && (
            <div className="space-y-6">
              <TemporizadorClase />
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl border border-indigo-200">
                    📓
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 px-3 py-0.5 rounded-full border border-indigo-200">
                      Trabajo en Cuaderno Físico
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                      {guia.retoCuaderno?.titulo || "Reto de Producción Textual"}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {guia.retoCuaderno?.pasos ? (
                    guia.retoCuaderno.pasos.map((paso, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3.5">
                        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
                          {paso.replace(/^\d+\.\s*/, '')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2.5 text-sm">
                      <p className="font-bold text-slate-800">1. Escribe en tu cuaderno el título: <strong>{tituloGuia}</strong>.</p>
                      <p className="font-bold text-slate-800">2. Resume en tres oraciones lo más importante que aprendiste en la lectura guiada.</p>
                      <p className="font-bold text-slate-800">3. Elabora un mapa conceptual o dibujo a color que represente la idea central del tema.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {subSeccion === 'glosario' && (
            <GlosarioInteractivo />
          )}
        </div>
      )}

      {/* ══════════ PILAR 3: SALA DE JUEGOS DIDÁCTICOS ══════════ */}
      {seccionPrincipal === 'juegos' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub-selector de juegos */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSubSeccion('principal')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'principal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Juegos del grado
            </button>
            {!esSecundaria && (
              <>
                <button
                  onClick={() => setSubSeccion('burbujas')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    subSeccion === 'burbujas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  🫧 Caza de Burbujas
                </button>
                <button
                  onClick={() => setSubSeccion('karaoke')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    subSeccion === 'karaoke' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  🎤 Karaoke de Coplas
                </button>
              </>
            )}
          </div>

          {subSeccion === 'principal' && (
            <ArcadeDidactico gradoNumero={gradoNumero} />
          )}

          {subSeccion === 'burbujas' && (
            <CazaLetrasJuego modo={gradoNumero <= 2 ? 'vocales' : 'rimas'} />
          )}

          {subSeccion === 'karaoke' && (
            <KaraokeCoplas />
          )}
        </div>
      )}

      {/* ══════════ PILAR 4: TALLER Y HERRAMIENTAS DOCENTES ══════════ */}
      {seccionPrincipal === 'herramientas' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub-navegación de herramientas */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSubSeccion('principal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'principal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🖨️ Ficha Imprimible
            </button>
            <button
              onClick={() => setSubSeccion('pizarra')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'pizarra' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🖍️ Pizarra Táctil
            </button>
            <button
              onClick={() => setSubSeccion('retos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'retos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🎭 Retos de Clase (45m)
            </button>
            <button
              onClick={() => setSubSeccion('sorteo')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'sorteo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🎲 ¿Quién Pasa?
            </button>
            <button
              onClick={() => setSubSeccion('cuentos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'cuentos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              ✍️ Taller de Cuentos
            </button>
            <button
              onClick={() => setSubSeccion('tesoros')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'tesoros' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              👑 Medallero
            </button>
          </div>

          {subSeccion === 'principal' && (
            <GeneradorFichas guia={{ ...guia, titulo: tituloGuia }} gradoNombre={gradoNombre} />
          )}

          {subSeccion === 'pizarra' && (
            <PizarraDigital tituloGuia={tituloGuia} />
          )}

          {subSeccion === 'retos' && (
            <BancoRetosAula />
          )}

          {subSeccion === 'sorteo' && (
            <SelectorEstudiante />
          )}

          {subSeccion === 'cuentos' && (
            <TallerNarrativo />
          )}

          {subSeccion === 'tesoros' && (
            <CofreTesoros />
          )}
        </div>
      )}
    </div>
  );
}
