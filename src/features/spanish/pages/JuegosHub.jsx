import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArcadeDidactico from '../components/games/ArcadeDidactico';
import { sounds } from '../utils/audio';

export default function JuegosHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const gradoParam = parseInt(searchParams.get('grado') || '1', 10);
  const juegoParam = searchParams.get('juego');

  const [gradoSeleccionado, setGradoSeleccionado] = useState(
    !isNaN(gradoParam) && gradoParam >= 1 && gradoParam <= 9 ? gradoParam : 1
  );

  useEffect(() => {
    const g = parseInt(searchParams.get('grado') || '', 10);
    if (!isNaN(g) && g >= 1 && g <= 9 && g !== gradoSeleccionado) {
      setGradoSeleccionado(g);
    }
  }, [searchParams]);

  const niveles = [
    { grado: 1, label: '1° Grado', desc: 'Fonética, vocales y letras con voz', icono: '🐥', badge: 'Lectoescritura' },
    { grado: 2, label: '2° Grado', desc: 'Sílabas sonoras y palabras', icono: '🐰', badge: 'Primeras lecturas' },
    { grado: 3, label: '3° Grado', desc: 'Fábulas, rimas y memoria', icono: '🦊', badge: 'Rimas y fábulas' },
    { grado: 4, label: '4° Grado', desc: 'Mitos, trivia y detective', icono: '🦉', badge: 'Tradición y mitos' },
    { grado: 5, label: '5° Grado', desc: 'Sintaxis, ahorcado y concursos', icono: '🦁', badge: 'Cuentos y novelas' },
    { grado: 6, label: '6° Grado', desc: 'Duelos, crucigramas y tradición oral', icono: '🐺', badge: 'Secundaria' },
    { grado: 7, label: '7° Grado', desc: 'Argumentación, figuras y detectives', icono: '🦅', badge: 'Secundaria' },
    { grado: 8, label: '8° Grado', desc: 'Literatura precolombina y crónicas', icono: '🐆', badge: 'Secundaria' },
    { grado: 9, label: '9° Grado', desc: 'Realismo mágico, oratoria y sintaxis', icono: '🦋', badge: 'Secundaria' }
  ];

  const handleCambiarGrado = (g) => {
    sounds.playClick();
    setGradoSeleccionado(g);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set('grado', String(g));
      p.delete('juego');
      return p;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* ══════════ HERO DE LA SALA DE JUEGOS ══════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] p-6 sm:p-10 text-white shadow-xl border border-slate-700/60">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
            <span>🎮</span> Sala Central de Juegos Didácticos • 100% Sin Internet
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Arcade de Lengua Castellana 🕹️✨
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Selecciona el grado escolar para activar los <strong className="text-white">15 juegos didácticos interactivos</strong> calibrados por edad: desde fonética con pronunciación real para primer grado, hasta el Tribunal de Falacias, Escape Room de Macondo y duelos de vocabulario para secundaria.
          </p>
        </div>

        <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 select-none pointer-events-none">
          🎮
        </div>
      </div>

      {/* ══════════ SELECTOR TÁCTIL DE GRADO ELEGANTE ══════════ */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/90">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Paso 1: Selecciona el Grado para Cargar su Catálogo:
          </span>
          <span className="text-xs font-semibold text-[#3659d9] bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
            Grado Activo: {gradoSeleccionado}°
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {niveles.map((n) => {
            const activo = gradoSeleccionado === n.grado;
            return (
              <button
                key={n.grado}
                onClick={() => handleCambiarGrado(n.grado)}
                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer border select-none btn-press ${
                  activo
                    ? 'bg-[#3659d9] text-white border-[#2563eb] shadow-md shadow-indigo-500/25 ring-2 ring-indigo-200'
                    : 'bg-slate-50 hover:bg-slate-100/90 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl mb-1">{n.icono}</span>
                <span className="font-bold text-xs sm:text-sm">{n.label}</span>
                <span className={`text-[8px] font-extrabold uppercase mt-1 px-1.5 py-0.5 rounded-full ${
                  activo ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}>
                  {n.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════ COMPONENTE ARCADE ACTIVO ══════════ */}
      <div className="space-y-4">
        <ArcadeDidactico gradoNumero={gradoSeleccionado} juegoInicial={juegoParam} />
      </div>
    </div>
  );
}
