import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';

export default function Home() {
  const gradosList = Object.values(mallaData.grados);
  const primaria = gradosList.filter((g) => g.numero <= 5);
  const secundaria = gradosList.filter((g) => g.numero >= 6);

  const [seccionActiva, setSeccionActiva] = useState('todos');

  // Catálogo completo de juegos con diseño visual inmersivo
  const juegosDestacados = [
    {
      titulo: 'Abecedario Parlante',
      subtitulo: 'Fonética guiada y sonidos de letras con voz real interactiva',
      nivel: '1° y 2°',
      icono: '🔤',
      color: 'from-blue-600 via-indigo-600 to-indigo-700',
      tag: 'Fonética y Voz',
      link: '/espanol/juegos?juego=abecedario&grado=1'
    },
    {
      titulo: 'Sílabas Ninja a Ráfaga',
      subtitulo: 'Corta sílabas voladoras con combos y modo fiebre contrarreloj',
      nivel: '1° a 9°',
      icono: '🥷',
      color: 'from-amber-500 via-orange-600 to-red-600',
      tag: 'Reflejos y Sílabas',
      link: '/espanol/juegos?juego=ninja&grado=3'
    },
    {
      titulo: 'Tribunal de Falacias',
      subtitulo: 'Juez supremo de debates, oratoria y detección de falacias lógicas',
      nivel: '7° a 9°',
      icono: '⚖️',
      color: 'from-indigo-600 via-violet-700 to-purple-800',
      tag: 'Debate y Lógica',
      link: '/espanol/juegos?juego=juicio&grado=8'
    },
    {
      titulo: 'Escape Room Macondo',
      subtitulo: 'Aventura de enigmas inspirados en el Realismo Mágico de Gabo',
      nivel: '6° a 9°',
      icono: '🦋',
      color: 'from-amber-500 via-yellow-600 to-emerald-700',
      tag: 'Realismo Mágico',
      link: '/espanol/juegos?juego=escape&grado=7'
    },
    {
      titulo: 'Batalla de Rimas y Flow',
      subtitulo: 'Sigue el beatbox metrónomo y clava la copla con métrica exacta',
      nivel: '2° a 8°',
      icono: '🎤',
      color: 'from-fuchsia-600 via-pink-600 to-rose-600',
      tag: 'Métrica y Ritmo',
      link: '/espanol/juegos?juego=batalla&grado=5'
    },
    {
      titulo: 'Duelo de Vocabulario',
      subtitulo: 'Contrarreloj de 15 segundos con multiplicadores de racha y velocidad',
      nivel: '6° a 9°',
      icono: '⚔️',
      color: 'from-sky-600 via-blue-700 to-indigo-800',
      tag: 'Rapidez Léxica',
      link: '/espanol/juegos?juego=duelo&grado=8'
    },
    {
      titulo: 'Crucigrama Literario',
      subtitulo: 'Pistas pedagógicas de métrica, sonetos y figuras retóricas',
      nivel: '6° a 9°',
      icono: '🧩',
      color: 'from-teal-600 via-emerald-600 to-cyan-700',
      tag: 'Léxico y Poesía',
      link: '/espanol/juegos?juego=crucigrama&grado=7'
    },
    {
      titulo: 'Trivia Concurso TV',
      subtitulo: 'Preguntas con comodines 50:50, cronómetro de televisión y podio',
      nivel: '1° a 9°',
      icono: '🏆',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      tag: 'Trivia y Cultura',
      link: '/espanol/juegos?juego=trivia&grado=6'
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      
      {/* ══════════ HERO BANNER PRINCIPAL ELEGANTE ══════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white p-8 sm:p-12 shadow-xl border border-slate-700/60">
        
        {/* Luces de profundidad difusas */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
            <span>✨</span> Módulo Oficial de Lengua Castellana • 1° a 9° Grado
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Aprende, Lee y Juega en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400">
              Lengua Viva
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Plataforma pedagógica interactiva con lecciones oficiales, comprensión lectora multinivel y un salón de <strong className="text-white font-semibold">15 juegos didácticos</strong> adaptados a cada ciclo escolar.
          </p>

          {/* Botones de Acción Directa */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/espanol/juegos"
              onClick={() => sounds.playClick()}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer btn-press"
            >
              <span className="text-lg">🎮</span>
              <span>Entrar a la Sala de Juegos</span>
            </Link>

            <Link
              to="/espanol/grado/1"
              onClick={() => sounds.playClick()}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer btn-press"
            >
              <span>🔤</span>
              <span>Fonética para 1° Grado</span>
            </Link>
          </div>

          {/* Insignias de garantía técnica */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-700/60 px-3 py-1.5 rounded-lg">
              <span>🔊</span> Voces Reales y Fonética
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-700/60 px-3 py-1.5 rounded-lg">
              <span>📶</span> 100% Funcional Sin Internet
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-700/60 px-3 py-1.5 rounded-lg">
              <span>📚</span> Malla Curricular 1° a 9°
            </div>
          </div>
        </div>

        {/* Marca de agua de fondo */}
        <div className="absolute -right-6 -bottom-8 text-9xl sm:text-[12rem] opacity-10 select-none pointer-events-none transform -rotate-12">
          📖
        </div>
      </div>

      {/* ══════════ SALA DE JUEGOS DIDÁCTICOS (REDISEÑO INMERSIVO TOP-TIER) ══════════ */}
      <div className="space-y-6">
        
        {/* Banner de Cabecera de la Sección */}
        <div className="bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/60 rounded-2xl p-5 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎮</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#3659d9]">
                Catálogo de Entretenimiento Pedagógico
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Sala Central de Juegos Didácticos
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              15 actividades interactivas gamificadas con audio, fonética, desafíos y sistema de logros XP.
            </p>
          </div>

          <Link
            to="/espanol/juegos"
            onClick={() => sounds.playClick()}
            className="px-4 py-2.5 rounded-xl bg-[#3659d9] hover:bg-[#2563eb] text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 cursor-pointer btn-press"
          >
            <span>Ver los 15 Juegos</span>
            <span>→</span>
          </Link>
        </div>

        {/* Cuadrícula de Tarjetas de Juegos Inmersivas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {juegosDestacados.map((j, i) => (
            <Link
              key={i}
              to={j.link}
              onClick={() => sounds.playClick()}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#3659d9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Portada Visual / Banner con Degradado y Efectos */}
              <div className={`relative h-28 bg-gradient-to-br ${j.color} p-3.5 flex flex-col justify-between text-white overflow-hidden shadow-inner`}>
                
                {/* Pastillas Superiores */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/30 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/20">
                    {j.tag}
                  </span>
                  <span className="text-[10px] font-black bg-white/25 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                    {j.nivel}
                  </span>
                </div>

                {/* Ícono 3D Flotante */}
                <div className="z-10 flex items-center">
                  <span className="text-4xl filter drop-shadow-md group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
                    {j.icono}
                  </span>
                </div>

                {/* Ícono gigante de agua en el fondo */}
                <div className="absolute -right-3 -bottom-4 text-7xl opacity-20 pointer-events-none select-none transform rotate-12">
                  {j.icono}
                </div>
              </div>

              {/* Cuerpo de la Tarjeta */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#3659d9] transition-colors leading-snug">
                    {j.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5 line-clamp-2">
                    {j.subtitulo}
                  </p>
                </div>

                {/* Botón de Acción Estilizado */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-[#3659d9] text-slate-700 group-hover:text-white font-bold text-xs flex items-center justify-between transition-all duration-200">
                    <span>¡Jugar ahora!</span>
                    <span className="w-5 h-5 rounded-md bg-slate-200/80 group-hover:bg-white/20 flex items-center justify-center text-[10px] group-hover:translate-x-1 transition-transform">
                      ▶
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════ FILTROS DE CICLO ESCOLAR ELEGANTE ══════════ */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setSeccionActiva('todos');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              seccionActiva === 'todos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Todos los Grados (1° a 9°)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSeccionActiva('primaria');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              seccionActiva === 'primaria'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Primaria (1° a 5°)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSeccionActiva('secundaria');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              seccionActiva === 'secundaria'
                ? 'bg-[#3659d9] text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            Secundaria (6° a 9°)
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden md:inline-block pr-2">
          Selecciona un grado escolar para explorar su plan de estudios
        </span>
      </div>

      {/* ══════════ SECCIÓN 1: BÁSICA PRIMARIA (1° AL 5°) ══════════ */}
      {(seccionActiva === 'todos' || seccionActiva === 'primaria') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎒</span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Aventuras de Primaria (1° a 5° Grado)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Lectoescritura, fonética con pronunciación guiada, fábulas, rimas y creación de historias
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {primaria.map((grado) => (
              <div
                key={grado.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-lg card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-3xl border border-emerald-200/60 group-hover:scale-105 transition-transform">
                      {grado.icono}
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
                      {grado.nombre}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {grado.mundo}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-600 mb-3 flex items-center gap-1">
                    <span>✨</span> {grado.mascota}
                  </p>

                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    {grado.lema}
                  </p>
                </div>

                <Link
                  to={`/espanol/grado/${grado.id}`}
                  onClick={() => sounds.playClick()}
                  className="w-full py-3 text-center font-bold text-xs sm:text-sm rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-press"
                >
                  <span>Explorar {grado.nombre}</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ SECCIÓN 2: BÁSICA SECUNDARIA (6° AL 9°) ══════════ */}
      {(seccionActiva === 'todos' || seccionActiva === 'secundaria') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏛️</span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Literatura y Crítica de Secundaria (6° a 9° Grado)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Mitología precolombina, crónica, debate de falacias, figuras retóricas y Realismo Mágico
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {secundaria.map((grado) => (
              <div
                key={grado.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#3659d9] hover:shadow-lg card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl border border-indigo-200/60 group-hover:scale-105 transition-transform">
                      {grado.icono}
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-wide">
                      {grado.nombre}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3659d9] transition-colors">
                    {grado.mundo}
                  </h3>

                  <p className="text-xs font-semibold text-indigo-600 mb-3 flex items-center gap-1">
                    <span>⚡</span> {grado.mascota}
                  </p>

                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    {grado.lema}
                  </p>
                </div>

                <Link
                  to={`/espanol/grado/${grado.id}`}
                  onClick={() => sounds.playClick()}
                  className="w-full py-3 text-center font-bold text-xs sm:text-sm rounded-xl text-white bg-[#3659d9] hover:bg-[#2845b5] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-press"
                >
                  <span>Iniciar {grado.nombre}</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
