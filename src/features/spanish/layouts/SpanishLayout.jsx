import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';
import { GameProgress, RANGOS_JUGADOR, INSIGNIAS_LOGROS } from '../utils/gamification';
import { lanzarConfeti } from '../utils/confetti';
import '../spanish.css';

/**
 * SpanishLayout — Envoltorio profesional de alta fidelidad para el Módulo de Español ("Lengua Viva").
 * Armonizado estéticamente con la paleta de la plataforma (Azul real #3659d9, blanco nítido y acentos dorados).
 */
export default function SpanishLayout() {
  const [estaEnLinea, setEstaEnLinea] = useState(navigator.onLine);
  const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [progreso, setProgreso] = useState(() => GameProgress.getProgress());
  const [modalTrofeosAbierto, setModalTrofeosAbierto] = useState(false);
  const [celebracionNivel, setCelebracionNivel] = useState(null);
  const [vozSilenciada, setVozSilenciada] = useState(() => voiceReader.isMuted());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setEstaEnLinea(true);
    const handleOffline = () => setEstaEnLinea(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleFullscreenChange = () => {
      setEnPantallaCompleta(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const handleProgresoActualizado = (e) => {
      const data = e.detail || {};
      const actual = GameProgress.getProgress();
      setProgreso(actual);

      if (data.subioDeNivel && data.rangoNuevo) {
        sounds.playLevelUp();
        lanzarConfeti();
        setCelebracionNivel(data.rangoNuevo);
        voiceReader.speak(`¡Felicitaciones! Has subido de nivel. Tu nuevo rango es: ${data.rangoNuevo.titulo}.`);
      }
    };

    window.addEventListener('lengua_viva_progreso_actualizado', handleProgresoActualizado);
    window.addEventListener('storage', handleProgresoActualizado);

    const handleVozCambiada = (e) => {
      if (e.detail) setVozSilenciada(e.detail.muted);
    };
    window.addEventListener('lengua_viva_voz_estado_cambiado', handleVozCambiada);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('lengua_viva_progreso_actualizado', handleProgresoActualizado);
      window.removeEventListener('storage', handleProgresoActualizado);
      window.removeEventListener('lengua_viva_voz_estado_cambiado', handleVozCambiada);
    };
  }, []);

  const togglePantallaCompleta = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleVoz = () => {
    sounds.playClick();
    const mut = voiceReader.toggleMute();
    setVozSilenciada(mut);
    if (!mut) {
      voiceReader.speak("Voz pedagógica activada.");
    }
  };

  const handleBuscar = (e) => {
    const query = e.target.value;
    setBusqueda(query);

    if (query.trim().length < 2) {
      setResultadosBusqueda([]);
      return;
    }

    const matches = [];
    Object.values(mallaData.grados).forEach((grado) => {
      const todasLasGuias = grado.periodos
        ? grado.periodos.flatMap((p) => p.unidades?.flatMap((u) => u.guias || []) || [])
        : grado.guias || [];

      todasLasGuias.forEach((guia) => {
        const titulo = guia.titulo || guia.nombre || '';
        const contenidos = guia.contenidos || '';
        const lectura = guia.leccion?.lectura || '';
        const textoBuscar = `${grado.nombre} ${titulo} ${contenidos} ${lectura}`.toLowerCase();

        if (textoBuscar.includes(query.toLowerCase())) {
          matches.push({
            gradoId: grado.id || grado.grado,
            gradoNombre: grado.nombre,
            guiaId: guia.id,
            guiaTitulo: titulo,
            tema: contenidos || titulo,
            icono: guia.icono || grado.icono
          });
        }
      });
    });

    setResultadosBusqueda(matches.slice(0, 6));
  };

  const seleccionarResultado = (res) => {
    sounds.playClick();
    setBusqueda('');
    setResultadosBusqueda([]);
    navigate(`/espanol/grado/${res.gradoId}`);
  };

  const gradosList = Object.values(mallaData.grados);
  const primaria = gradosList.filter((g) => g.numero <= 5);
  const secundaria = gradosList.filter((g) => g.numero >= 6);

  const rangoActual = GameProgress.getRangoPorXP(progreso.xpTotal);
  const siguienteRango = GameProgress.getSiguienteRango(progreso.xpTotal);
  const xpParaSiguiente = siguienteRango ? siguienteRango.xpMin - progreso.xpTotal : 0;
  const progresoPorcentaje = siguienteRango
    ? Math.min(100, Math.round(((progreso.xpTotal - rangoActual.xpMin) / (siguienteRango.xpMin - rangoActual.xpMin)) * 100))
    : 100;

  return (
    <div className="spanish-area">
      <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* ══════════ HEADER PRINCIPAL ELEGANTE ══════════ */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            
            {/* Identidad de Marca */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/espanol"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-[#2563eb] via-[#3659d9] to-[#4f46e5] rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/30 transition-all duration-200 text-xl text-white">
                  📖
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-[#3659d9] transition-colors">
                      Lengua Viva
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 tracking-wide">
                      Español
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 leading-none mt-1">
                    Grados 1° a 9° • Escuela Digital
                  </p>
                </div>
              </Link>
            </div>

            {/* Buscador de Temas Curriculares */}
            <div className="relative flex-1 max-w-sm hidden md:block">
              <input
                type="text"
                value={busqueda}
                onChange={handleBuscar}
                placeholder="Buscar temas, fábulas, gramática..."
                className="w-full py-2 px-3.5 pl-9 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#3659d9] focus:ring-3 focus:ring-indigo-100 outline-none transition-all"
              />
              <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>

              {resultadosBusqueda.length > 0 && (
                <div className="absolute top-11 left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-slide-down">
                  <div className="px-3 py-2 bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    Contenidos sugeridos:
                  </div>
                  {resultadosBusqueda.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => seleccionarResultado(r)}
                      className="w-full text-left p-3 hover:bg-indigo-50/70 flex items-center gap-3 border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors"
                    >
                      <span className="text-xl">{r.icono}</span>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-[#3659d9] uppercase tracking-wider block">
                          {r.gradoNombre}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 truncate">{r.guiaTitulo}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Herramientas & Navegación */}
            <div className="flex items-center gap-2">
              
              {/* Botón Volver al Portal Principal */}
              <Link
                to="/"
                onClick={() => sounds.playClick()}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                title="Volver al portal principal de la escuela"
              >
                <span>🏠</span>
                <span className="hidden lg:inline">Inicio General</span>
              </Link>

              {/* Botón Sala de Juegos Arcade */}
              <NavLink
                to="/espanol/juegos"
                onClick={() => sounds.playClick()}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#3659d9] text-white shadow-md shadow-indigo-500/25'
                      : 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
                  }`
                }
              >
                <span>🎮</span>
                <span className="hidden sm:inline">Sala de Juegos</span>
              </NavLink>

              {/* Nivel / XP Badge */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setModalTrofeosAbierto(true);
                }}
                title="Ver medallas y rango alcanzado"
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 shadow-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98"
              >
                <span className="text-base">{rangoActual.icono}</span>
                <div className="text-left leading-tight hidden sm:block">
                  <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block">
                    Nivel {rangoActual.nivel}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    {progreso.xpTotal} XP
                  </span>
                </div>
              </button>

              {/* Voz Pedagógica */}
              <button
                onClick={toggleVoz}
                title={vozSilenciada ? "Voz silenciada (Click para activar)" : "Voz activa (Click para silenciar)"}
                className={`p-2 rounded-xl border font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  vozSilenciada
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                <span className="text-sm">{vozSilenciada ? '🔇' : '🔊'}</span>
              </button>

              {/* Pantalla Completa / Proyector */}
              <button
                onClick={togglePantallaCompleta}
                title={enPantallaCompleta ? "Salir de pantalla completa" : "Modo Proyector de Aula"}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="text-sm">{enPantallaCompleta ? '🗗' : '🖥️'}</span>
              </button>
            </div>
          </div>

          {/* ══════════ BARRA DE SELECCIÓN RÁPIDA DE GRADOS ══════════ */}
          <div className="border-t border-slate-200/70 bg-slate-50/80 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 shrink-0">
                Grados:
              </span>

              {/* Grados Primaria */}
              <div className="flex items-center gap-1 shrink-0">
                {primaria.map((g) => (
                  <NavLink
                    key={g.id}
                    to={`/espanol/grado/${g.id}`}
                    onClick={() => sounds.playClick()}
                    className={({ isActive }) =>
                      `px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs font-bold'
                          : 'bg-white text-slate-700 border border-slate-200/80 hover:border-emerald-300 hover:text-emerald-700'
                      }`
                    }
                  >
                    <span>{g.icono}</span>
                    <span>{g.nombre.replace('Grado ', '')}</span>
                  </NavLink>
                ))}
              </div>

              <div className="h-4 w-px bg-slate-200 mx-1 shrink-0" />

              {/* Grados Secundaria */}
              <div className="flex items-center gap-1 shrink-0">
                {secundaria.map((g) => (
                  <NavLink
                    key={g.id}
                    to={`/espanol/grado/${g.id}`}
                    onClick={() => sounds.playClick()}
                    className={({ isActive }) =>
                      `px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#3659d9] text-white shadow-xs font-bold'
                          : 'bg-white text-slate-700 border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-700'
                      }`
                    }
                  >
                    <span>{g.icono}</span>
                    <span>{g.nombre.replace('Grado ', '')}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ══════════ CONTENIDO PRINCIPAL ══════════ */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Outlet />
        </main>

        {/* ══════════ PIE DE PÁGINA LIMPIO ══════════ */}
        <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-medium space-y-2 mt-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-800 font-bold">
            <span>📖✨</span>
            <span>Lengua Viva • Plataforma Interactiva de Lenguaje</span>
          </div>
          <p className="text-slate-400 max-w-lg mx-auto">
            Diseñada para grados 1° a 9° de básica rural y urbana • Fonética con voz para primero • Arcade didáctico • 100% Funcional sin Internet
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="text-[#3659d9] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>← Volver al portal general de la escuela</span>
            </Link>
          </div>
        </footer>

        {/* ══════════ MODAL DE TROFEOS Y RANGOS ══════════ */}
        {modalTrofeosAbierto && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Encabezado */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-3xl">
                    {rangoActual.icono}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                      Rango Actual
                    </span>
                    <h3 className="text-xl font-black text-white">{rangoActual.titulo}</h3>
                    <p className="text-xs text-slate-400 font-medium">{rangoActual.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => setModalTrofeosAbierto(false)}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Barra de Progreso XP */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-amber-400">⭐ {progreso.xpTotal} XP Acumulados</span>
                  {siguienteRango ? (
                    <span className="text-slate-400">
                      Siguiente: {siguienteRango.titulo} ({siguienteRango.xpMin} XP)
                    </span>
                  ) : (
                    <span className="text-emerald-400">¡Rango Máximo Alcanzado!</span>
                  )}
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progresoPorcentaje}%` }}
                  />
                </div>

                {siguienteRango && (
                  <p className="text-[11px] text-slate-400 text-center">
                    Te faltan <strong className="text-white">{xpParaSiguiente} XP</strong> para ascender a <strong className="text-amber-400">{siguienteRango.titulo}</strong>
                  </p>
                )}
              </div>

              {/* Insignias y Logros */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Insignias Obtenidas ({progreso.insignias?.length || 0} / {INSIGNIAS_LOGROS.length}):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {INSIGNIAS_LOGROS.map((ins) => {
                    const desbloqueada = (progreso.insignias || []).includes(ins.id);
                    return (
                      <div
                        key={ins.id}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                          desbloqueada
                            ? 'bg-amber-400/10 border-amber-400/40 text-white shadow-xs'
                            : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-40'
                        }`}
                      >
                        <span className="text-2xl mb-1">{ins.icono}</span>
                        <span className="text-xs font-bold block leading-tight">{ins.titulo}</span>
                        <span className="text-[9px] mt-0.5 opacity-70 leading-tight block">{ins.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón de cierre */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => setModalTrofeosAbierto(false)}
                  className="px-6 py-3 bg-[#3659d9] hover:bg-[#2845b5] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  ¡Continuar Aprendiendo!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ MODAL CELEBRACIÓN DE NIVEL ══════════ */}
        {celebracionNivel && (
          <div
            onClick={() => setCelebracionNivel(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer select-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-amber-400/40 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl relative cursor-default"
            >
              <button
                onClick={() => setCelebracionNivel(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
                title="Cerrar"
              >
                ✕
              </button>

              <span className="text-5xl block">⭐👑⭐</span>
              <span className="text-[11px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-xs inline-block">
                ¡NUEVO RANGO DESBLOQUEADO!
              </span>
              <h3 className="text-2xl font-black text-white">
                {celebracionNivel.titulo}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {celebracionNivel.desc}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setCelebracionNivel(null);
                }}
                className="w-full py-3.5 px-6 bg-[#3659d9] hover:bg-[#2845b5] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                ¡Aceptar y Continuar!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
