import React, { useState, useEffect } from 'react';
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

export default function ModuloLeccion({ guia, gradoNombre, gradoNumero = 1, mascota }) {
  const esSecundaria = gradoNumero >= 6;

  // 4 Pilares Maestros de Aprendizaje
  const [seccionPrincipal, setSeccionPrincipal] = useState('leccion'); // 'leccion', 'comprension', 'juegos', 'herramientas'
  const [subSeccion, setSubSeccion] = useState('principal'); // sub-vistas dentro de cada pilar
  const [tamanoFuente, setTamanoFuente] = useState('text-lg');
  const [leyendoVoz, setLeyendoVoz] = useState(false);

  const tituloGuia = guia.titulo || guia.nombre || 'Guía de Aprendizaje';

  useEffect(() => {
    return () => {
      voiceReader.stop();
    };
  }, []);

  const cambiarSeccion = (sec, sub = 'principal') => {
    sounds.playClick();
    voiceReader.stop();
    setLeyendoVoz(false);
    setSeccionPrincipal(sec);
    setSubSeccion(sub);
  };

  const toggleLecturaVoz = () => {
    if (leyendoVoz) {
      voiceReader.stop();
      setLeyendoVoz(false);
    } else {
      sounds.playClick();
      setLeyendoVoz(true);
      const textoCompleto = `${tituloGuia}. ${guia.leccion?.lectura || ''}`;
      voiceReader.speak(textoCompleto, () => {
        setLeyendoVoz(false);
      });
    }
  };

  const pilares = [
    {
      id: 'leccion',
      label: '1. Lectura y Lección',
      icono: '📖',
      desc: 'Lectura oficial, conceptos y teatro',
      color: esSecundaria ? 'bg-violet-600 border-violet-700' : 'bg-emerald-600 border-emerald-700'
    },
    {
      id: 'comprension',
      label: '2. Comprensión y Cuaderno',
      icono: '🧠',
      desc: 'Preguntas en 3 niveles, cuaderno y glosario',
      color: 'bg-indigo-600 border-indigo-700'
    },
    {
      id: 'juegos',
      label: '3. Sala de Juegos Didácticos',
      icono: '🎮',
      desc: 'Arcade adaptado con 15 juegos',
      color: 'bg-amber-500 border-amber-600'
    },
    {
      id: 'herramientas',
      label: '4. Taller y Herramientas',
      icono: '🛠️',
      desc: 'Pizarra, fichas imprimibles y retos',
      color: 'bg-slate-800 border-slate-900'
    }
  ];

  return (
    <div className="space-y-6">
      {/* ══════════ MENÚ SUPERIOR DE LOS 4 PILARES PEDAGÓGICOS ══════════ */}
      <div className="bg-white rounded-3xl p-3 shadow-md border-2 border-slate-200">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-2 text-center sm:text-left">
          Pasos de la Guía: Aprende ➔ Comprende ➔ Juega ➔ Aplica
        </span>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {pilares.map((p) => {
            const activo = seccionPrincipal === p.id;
            return (
              <button
                key={p.id}
                onClick={() => cambiarSeccion(p.id)}
                className={`p-3.5 rounded-2xl border-b-4 text-left transition-all duration-150 flex items-center gap-3 cursor-pointer select-none active:border-b-0 active:translate-y-1 ${
                  activo
                    ? `${p.color} text-white shadow-lg scale-102 ring-4 ring-amber-300`
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-2xl sm:text-3xl shrink-0">{p.icono}</span>
                <div className="min-w-0">
                  <span className="font-black text-xs sm:text-sm block truncate leading-tight">
                    {p.label}
                  </span>
                  <p className={`text-[10px] mt-0.5 truncate ${activo ? 'text-white/80' : 'text-slate-400'}`}>
                    {p.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════ PILAR 1: LECTURA Y LECCIÓN PRINCIPAL ══════════ */}
      {seccionPrincipal === 'leccion' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub-navegación interna de la lección */}
          <div className="flex items-center justify-between gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSubSeccion('principal')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  subSeccion === 'principal'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📖 Teoría y Lectura Guiada
              </button>

              <button
                onClick={() => setSubSeccion('teatro')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  subSeccion === 'teatro'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎭 Teatro Ilustrado / Oratoria
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 mr-1">Letra:</span>
              <button
                onClick={() => setTamanoFuente('text-base')}
                className={`px-2 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-base' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setTamanoFuente('text-lg')}
                className={`px-2 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-lg' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
              >
                A+
              </button>
              <button
                onClick={() => setTamanoFuente('text-xl')}
                className={`px-2 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-xl' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
              >
                A++
              </button>
            </div>
          </div>

          {subSeccion === 'principal' ? (
            <TeoriaPedagogicaEnriquecida
              guia={guia}
              gradoNumero={gradoNumero}
              gradoNombre={gradoNombre}
              mascota={mascota}
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
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSubSeccion('principal')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'principal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🧠 Taller en 3 Niveles
            </button>
            <button
              onClick={() => setSubSeccion('cuaderno')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'cuaderno' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              📓 Actividades al Cuaderno
            </button>
            <button
              onClick={() => setSubSeccion('glosario')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'glosario' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              📚 Glosario de Términos
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
                  <span>Paso 3: ¡Jugar en el Arcade de esta Guía!</span>
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
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSubSeccion('principal')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                subSeccion === 'principal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🎮 Arcade Didáctico Completo ({gradoNumero}° Grado)
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
