import React, { useState, useEffect } from 'react';
import AbecedarioSonoro from './AbecedarioSonoro';
import LluviaSilabasNinja from './LluviaSilabasNinja';
import BatallaDeRimas from './BatallaDeRimas';
import TriviaLiteraria from './TriviaLiteraria';
import AhorcadoLiterario from './AhorcadoLiterario';
import CrucigramaLiterario from './CrucigramaLiterario';
import DueloVocabulario from './DueloVocabulario';
import DetectiveGramatical from './DetectiveGramatical';
import CompletarTexto from './CompletarTexto';
import ConstructorPalabras from './ConstructorPalabras';
import JuegoMemoriaParejas from './JuegoMemoriaParejas';
import RuletaRetos from './RuletaRetos';
import OrganizadorOraciones from './OrganizadorOraciones';
import JuicioFalacias from './JuicioFalacias';
import EscapeRoomMacondo from './EscapeRoomMacondo';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

export default function ArcadeDidactico({ gradoNumero = 1, juegoInicial = null }) {
  const esSecundaria = gradoNumero >= 6;
  const esPrimerosGrados = gradoNumero <= 2;

  const [progreso, setProgreso] = useState(() => GameProgress.getProgress());

  // Actualizar datos de gamificación en tiempo real
  useEffect(() => {
    const handleProgreso = () => setProgreso(GameProgress.getProgress());
    window.addEventListener('storage', handleProgreso);
    window.addEventListener('lengua_viva_progreso_actualizado', handleProgreso);
    return () => {
      window.removeEventListener('storage', handleProgreso);
      window.removeEventListener('lengua_viva_progreso_actualizado', handleProgreso);
    };
  }, []);

  const rangoActual = GameProgress.getRangoPorXP(progreso.xpTotal);
  const siguienteRango = GameProgress.getSiguienteRango(progreso.xpTotal);
  const xpParaSiguiente = siguienteRango ? siguienteRango.xpMin - progreso.xpTotal : 0;

  // Juegos para Grados 1° y 2° (Niños que están aprendiendo a leer y fonética)
  const juegosPrimeros = [
    { id: 'abecedario', nombre: 'Abecedario Parlante', icono: '🔤', desc: 'Fonética, letras y sílabas con voz humana' },
    { id: 'ninja', nombre: 'Sílabas Ninja a Ráfaga', icono: '🥷', desc: 'Corta sílabas voladoras antes de que caigan' },
    { id: 'constructor', nombre: 'Arma-Palabras con Voz', icono: '🧩', desc: 'Une sílabas sonoras para formar palabras' },
    { id: 'memoria', nombre: 'Parejas Mágicas Sonoras', icono: '🎴', desc: 'Rimas y animales que se leen al voltear' },
    { id: 'trivia', nombre: 'Trivia Infantil', icono: '🏆', desc: 'Preguntas con voz y dibujos divertidos' },
    { id: 'ahorcado', nombre: 'Palabra Secreta', icono: '🕵️', desc: 'Adivina la palabra con teclado sonoro' },
    { id: 'oraciones', nombre: 'Ordena la Frase', icono: '🔤', desc: 'Arma oraciones que se escuchan en voz alta' },
    { id: 'ruleta', nombre: 'Ruleta de Retos', icono: '🎡', desc: 'Coplas, trabalenguas y dinámicas' }
  ];

  // Juegos para Grados 3° a 5° (Primaria intermedia y avanzada)
  const juegosPrimariaMedia = [
    { id: 'ninja', nombre: 'Cazador Ninja de Verbos', icono: '🥷', desc: 'Corta verbos y palabras a toda velocidad' },
    { id: 'batalla', nombre: 'Batalla de Rimas y Coplas', icono: '🎤', desc: 'Sigue el beat rítmico y clava la rima' },
    { id: 'trivia', nombre: 'Trivia del Saber', icono: '🏆', desc: 'Concurso con comodines 50/50 y tiempo' },
    { id: 'escape', nombre: 'Escape Room de Cuentos', icono: '🦋', desc: 'Misterios y enigmas de la tradición viva' },
    { id: 'ahorcado', nombre: 'El Ahorcado Literario', icono: '🕵️', desc: 'Descifra palabras secretas con pistas' },
    { id: 'constructor', nombre: 'Constructor Silábico', icono: '🧩', desc: 'Palabras de 3 y 4 sílabas con voz' },
    { id: 'oraciones', nombre: 'Sintaxis y Frases', icono: '🔤', desc: 'Estructuración de oraciones con coherencia' },
    { id: 'memoria', nombre: 'Sinónimos y Antónimos', icono: '🎴', desc: 'Memoria de conceptos y figuras' },
    { id: 'detective', nombre: 'Detective de Ortografía', icono: '🔍', desc: 'Encuentra faltas y tildes en el texto' },
    { id: 'ruleta', nombre: 'Ruleta de Retos', icono: '🎡', desc: 'Retos de actuación, oratoria y canto' }
  ];

  // Juegos para Grados 6° a 9° (Secundaria - maduros, desafiantes y sin infantilización)
  const juegosSecundaria = [
    { id: 'juicio', nombre: 'Tribunal de Falacias', icono: '⚖️', desc: 'Juez supremo de debates y oratoria' },
    { id: 'escape', nombre: 'Escape Room Macondo', icono: '🦋', desc: 'Aventura de enigmas del Realismo Mágico' },
    { id: 'duelo', nombre: 'Duelo de Vocabulario', icono: '⚔️', desc: 'Contrarreloj de 15s con racha y multiplicadores' },
    { id: 'crucigrama', nombre: 'Crucigrama Literario', icono: '🧩', desc: 'Pistas de métrica, sonetos y figuras retóricas' },
    { id: 'batalla', nombre: 'Duelo de Rimas y Flow', icono: '🎤', desc: 'Batalla de versos y métrica sobre el compás' },
    { id: 'ninja', nombre: 'Corte Ninja de Esdrújulas', icono: '🥷', desc: 'Ráfaga de reflejos cortando tildes' },
    { id: 'detective', nombre: 'Detective Gramatical', icono: '🔍', desc: 'Caza de tildes diacríticas y concordancia en textos' },
    { id: 'completar', nombre: 'Completar Textos', icono: '📝', desc: 'Pasajes de García Márquez, crónicas y poemas' },
    { id: 'trivia', nombre: 'Trivia Concurso de Literatura', icono: '🏆', desc: 'Preguntas curriculares, comodines 50/50 y podio' },
    { id: 'ahorcado', nombre: 'Enigma de Términos Críticos', icono: '🕵️', desc: 'Descubre conceptos literarios avanzados' },
    { id: 'oraciones', nombre: 'Sintaxis Compleja', icono: '🔤', desc: 'Oraciones compuestas y subordinadas' },
    { id: 'ruleta', nombre: 'Ruleta de Debate y Oratoria', icono: '🎡', desc: 'Argumentación en 30 segundos e improvisación' }
  ];

  // Selección inicial inteligente según la edad del estudiante
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(() => {
    if (juegoInicial) return juegoInicial;
    if (esPrimerosGrados) return 'abecedario';
    if (gradoNumero <= 5) return 'ninja';
    return 'juicio';
  });

  // Reaccionar inmediatamente cuando cambia el grado escolar o el juego solicitado
  useEffect(() => {
    if (juegoInicial) {
      setJuegoSeleccionado(juegoInicial);
      return;
    }
    const catalogo = esPrimerosGrados
      ? juegosPrimeros
      : esSecundaria
      ? juegosSecundaria
      : juegosPrimariaMedia;

    const existe = catalogo.some((j) => j.id === juegoSeleccionado);
    if (!existe && catalogo.length > 0) {
      if (esPrimerosGrados) setJuegoSeleccionado('abecedario');
      else if (esSecundaria) setJuegoSeleccionado('juicio');
      else setJuegoSeleccionado('ninja');
    }
  }, [gradoNumero, juegoInicial, esPrimerosGrados, esSecundaria]);

  const cambiarJuego = (juegoId) => {
    sounds.playClick();
    setJuegoSeleccionado(juegoId);
    setProgreso(GameProgress.getProgress());
  };

  const catalogoActual = esPrimerosGrados
    ? juegosPrimeros
    : esSecundaria
    ? juegosSecundaria
    : juegosPrimariaMedia;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ══════════ SALA DE JUEGOS Y BARRA SUPERIOR ELEGANTE ══════════ */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-3xl">
              {esPrimerosGrados ? '🎈' : esSecundaria ? '⚔️' : '🎮'}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                {esPrimerosGrados
                  ? 'Arcade de Fonética y Primeras Lecturas'
                  : esSecundaria
                  ? 'Arcade Literario de Secundaria (6° a 9°)'
                  : 'Arcade Pedagógico de Primaria (3° a 5°)'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {esPrimerosGrados
                  ? 'Fonética Interactiva y Letras Parlantes'
                  : esSecundaria
                  ? 'Retos Intelectuales, Falacias y Macondo'
                  : 'Desafíos de Lenguaje, Rimas y Concursos'}
              </h3>
            </div>
          </div>

          {/* Insignia de Nivel y Rango del Jugador */}
          <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">{rangoActual.icono}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-amber-400">Rango:</span>
                <span className="text-xs font-bold text-white">{rangoActual.titulo}</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 block">
                ⭐ {progreso.xpTotal} XP {siguienteRango && `• Faltan ${xpParaSiguiente} XP`}
              </span>
            </div>
          </div>
        </div>

        {/* Carrusel / Parrilla de Selección de Juegos */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {catalogoActual.map((j) => {
            const activo = juegoSeleccionado === j.id;
            return (
              <button
                key={j.id}
                onClick={() => cambiarJuego(j.id)}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer btn-press select-none ${
                  activo
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black scale-102 ring-2 ring-amber-300'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-lg">{j.icono}</span>
                <span className="leading-tight">{j.nombre}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════ RENDERIZADO DEL JUEGO SELECCIONADO ══════════ */}
      <div className="animate-fade-in">
        {juegoSeleccionado === 'abecedario' && <AbecedarioSonoro />}
        {juegoSeleccionado === 'ninja' && <LluviaSilabasNinja gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'juicio' && <JuicioFalacias />}
        {juegoSeleccionado === 'escape' && <EscapeRoomMacondo />}
        {juegoSeleccionado === 'batalla' && <BatallaDeRimas />}
        {juegoSeleccionado === 'trivia' && <TriviaLiteraria gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'ahorcado' && <AhorcadoLiterario gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'duelo' && <DueloVocabulario gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'crucigrama' && <CrucigramaLiterario gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'detective' && <DetectiveGramatical gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'completar' && <CompletarTexto gradoNumero={gradoNumero} />}
        {juegoSeleccionado === 'constructor' && <ConstructorPalabras />}
        {juegoSeleccionado === 'memoria' && <JuegoMemoriaParejas tema={esSecundaria ? 'figuras' : 'rimas'} />}
        {juegoSeleccionado === 'oraciones' && <OrganizadorOraciones />}
        {juegoSeleccionado === 'ruleta' && <RuletaRetos />}
      </div>
    </div>
  );
}
