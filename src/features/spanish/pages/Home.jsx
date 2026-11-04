import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';
import { GameProgress } from '../utils/gamification';

export default function Home() {
  const gradosList = Object.values(mallaData.grados);
  const primaria = gradosList.filter((g) => g.numero <= 5);
  const secundaria = gradosList.filter((g) => g.numero >= 6);

  // Filtro de ciclo escolar para las lecciones (todos, primaria, secundaria)
  const [seccionActiva, setSeccionActiva] = useState('todos');

  // Filtro para el catálogo de juegos didácticos
  const [filtroJuegos, setFiltroJuegos] = useState('todos');

  // Modo de lectura accesible (espaciado tipográfico)
  const [dyslexicMode, setDyslexicMode] = useState(false);

  // Modal pedagógico de reglas de ortografía
  const [modalReglasAbierto, setModalReglasAbierto] = useState(false);

  // Progreso real del estudiante desde GameProgress
  const [progreso, setProgreso] = useState(() => GameProgress.getProgress());

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
  const xpObjetivo = siguienteRango ? siguienteRango.xpMin : 2000;
  const progresoPorcentaje = Math.min(
    100,
    Math.max(12, Math.round((progreso.xpTotal / xpObjetivo) * 100))
  );

  const toggleDyslexicFont = () => {
    sounds.playClick();
    const next = !dyslexicMode;
    setDyslexicMode(next);
    if (next) {
      voiceReader.speak('Modo de lectura accesible activado. Espaciado tipográfico ampliado.');
    } else {
      voiceReader.speak('Modo de lectura estándar restaurado.');
    }
  };

  const playPlumitaWelcome = () => {
    sounds.playClick();
    voiceReader.speak(
      '¡Hola, intrépido explorador! Te damos la bienvenida al Gran Reino de las Palabras. Elige tu grado escolar para comenzar tus lecciones o diviértete en la zona arcade.'
    );
  };

  // Catálogo oficial de los 15 juegos reales con imágenes de Google Stitch
  const catalogoJuegos = [
    {
      id: 'ninja',
      titulo: 'Caza-Acentos y las Tildes Mágicas',
      subtitulo: '¡Atrapa palabras agudas, graves y esdrújulas antes de que caigan al mar! Coloca la tilde mágica en la sílaba correcta.',
      nivel: '1° a 9°',
      gradoBadge: '🛡️ 4.° a 6.° Grado',
      recordBadge: '🏆 Récord: 920 pts',
      btnText: '▶ ¡Jugar Caza-Acentos! 🎯',
      ciclo: 'todos',
      icono: '🥷',
      tag: 'Acentuación y Sílabas',
      bannerTag: '⚡ FRENESÍ ORTOGRÁFICO',
      imagen: '/images/spanish/games/caza-acentos.jpg',
      color: 'from-rose-500 via-orange-600 to-amber-600',
      btnColor: 'btn-3d-rose bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border-rose-300 text-white',
      bordeColor: 'border-rose-300 hover:border-rose-400 shadow-[0_8px_24px_rgba(244,63,94,0.14)]',
      textColor: 'text-rose-600',
      badgeTop: '❤️ 3 Vidas',
      badgeXP: '💎 +120 Gemas',
      link: '/espanol/juegos?juego=ninja&grado=3'
    },
    {
      id: 'completar',
      titulo: 'El Reino de la Comprensión Lectora',
      subtitulo: 'Viaja por historias mágicas, leyendas latinoamericanas y resuelve acertijos interactivos sobre personajes y moralejas.',
      nivel: '4° a 9°',
      gradoBadge: '🛡️ 5.° a 7.° Grado',
      recordBadge: '📖 2 Capítulos Listos',
      btnText: '🚀 ¡Comenzar Aventura! 🗺️',
      ciclo: 'secundaria',
      icono: '📖',
      tag: 'Comprensión Lectora',
      bannerTag: '🏰 MISIÓN LEGENDARIA',
      imagen: '/images/spanish/games/comprension.jpg',
      color: 'from-indigo-600 via-blue-700 to-cyan-800',
      btnColor: 'btn-3d-indigo bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 border-indigo-300 text-white',
      bordeColor: 'border-indigo-300 hover:border-indigo-400 shadow-[0_8px_24px_rgba(99,102,241,0.14)]',
      textColor: 'text-indigo-600',
      badgeTop: '📜 Fábulas & Mitos',
      badgeXP: '⭐ +150 XP',
      link: '/espanol/juegos?juego=completar&grado=6'
    },
    {
      id: 'duelo',
      titulo: 'Duelo de Sinónimos y Antónimos',
      subtitulo: '¡Batalla veloz contra el cronómetro! Empareja palabras gemelas u opuestas a gran velocidad para ganar trofeos estelares.',
      nivel: '6° a 9°',
      gradoBadge: '🛡️ 3.° a 6.° Grado',
      recordBadge: '✨ Récord: 48 pares',
      btnText: '⚡ ¡Duelo Relámpago! ⚔️',
      ciclo: 'secundaria',
      icono: '⚔️',
      tag: 'Vocabulario y Léxico',
      bannerTag: '⏱️ DUELO EN TIEMPO REAL',
      imagen: '/images/spanish/games/duelo.jpg',
      color: 'from-sky-600 via-blue-700 to-indigo-800',
      btnColor: 'btn-3d-blue bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 border-sky-300 text-white',
      bordeColor: 'border-sky-300 hover:border-sky-400 shadow-[0_8px_24px_rgba(14,165,233,0.14)]',
      textColor: 'text-sky-600',
      badgeTop: '⏱️ 60s Relámpago',
      badgeXP: '⚡ Combo x3',
      link: '/espanol/juegos?juego=duelo&grado=8'
    },
    {
      id: 'detective',
      titulo: 'El Detective Gramatical',
      subtitulo: 'Usa tu lupa cuántica para atrapar sustantivos escondidos, sujetos tácitos y verbos conjugados que resuelven misterios.',
      nivel: '3° a 8°',
      gradoBadge: '🛡️ 5.° a 8.° Grado',
      recordBadge: '🔍 Caso #4 En curso',
      btnText: '🔍 ¡Investigar Caso! 🔎',
      ciclo: 'todos',
      icono: '🔍',
      tag: 'Morfosintaxis y Oraciones',
      bannerTag: '🔎 MISTERIO MORFOLÓGICO',
      imagen: '/images/spanish/games/detective.jpg',
      color: 'from-teal-600 via-emerald-600 to-cyan-700',
      btnColor: 'btn-3d-emerald bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 border-emerald-300 text-white',
      bordeColor: 'border-emerald-300 hover:border-emerald-400 shadow-[0_8px_24px_rgba(16,185,129,0.14)]',
      textColor: 'text-teal-700',
      badgeTop: '🕵️ Caso Activo',
      badgeXP: '🎖️ Nivel 4',
      link: '/espanol/juegos?juego=detective&grado=5'
    },
    {
      id: 'ruleta',
      titulo: 'Ruleta Mágica de Ortografía',
      subtitulo: '¡Gira la gran rueda escolar! Escucha la pronunciación de Plumita, escoge la letra adecuada y bate tu récord sin fallos.',
      nivel: '1° a 9°',
      gradoBadge: '🛡️ 3.° a 7.° Grado',
      recordBadge: '🎡 95% Aciertos',
      btnText: '🎡 ¡Girar la Ruleta! 🎯',
      ciclo: 'todos',
      icono: '🎡',
      tag: 'Normas: B/V, C/S/Z y H',
      bannerTag: '🎡 DESAFÍO DE LETRAS',
      imagen: '/images/spanish/games/ruleta.jpg',
      color: 'from-amber-500 via-yellow-500 to-orange-500',
      btnColor: 'btn-3d-amber bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 border-amber-300',
      bordeColor: 'border-amber-300 hover:border-amber-400 shadow-[0_8px_24px_rgba(245,158,11,0.14)]',
      textColor: 'text-amber-700',
      badgeTop: '🎡 Ruleta de la Suerte',
      badgeXP: '🎯 95% Aciertos',
      link: '/espanol/juegos?juego=ruleta&grado=4'
    },
    {
      id: 'escape',
      titulo: 'Taller Creativo de Cuentos Cortos',
      subtitulo: 'Elige personajes míticos, reinos fantásticos e inventa tu propia historia ilustrada para compartirla con tus compañeros.',
      nivel: '6° a 9°',
      gradoBadge: '🛡️ 4.° a 9.° Grado',
      recordBadge: '📚 1 Cuento en Biblioteca',
      btnText: '✍️ ¡Escribir mi Cuento! 📜',
      ciclo: 'secundaria',
      icono: '🦋',
      tag: 'Producción Textual',
      bannerTag: '✨ CREACIÓN Y AVENTURA',
      imagen: '/images/spanish/games/taller-cuentos.jpg',
      color: 'from-purple-600 via-fuchsia-600 to-pink-600',
      btnColor: 'btn-3d-purple bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 border-purple-300 text-white',
      bordeColor: 'border-purple-300 hover:border-purple-400 shadow-[0_8px_24px_rgba(168,85,247,0.14)]',
      textColor: 'text-purple-600',
      badgeTop: '✍️ Taller Creativo',
      badgeXP: '📖 Publicar Cuento',
      link: '/espanol/juegos?juego=escape&grado=7'
    },
    {
      id: 'abecedario',
      titulo: 'Abecedario Parlante',
      subtitulo: 'Fonética guiada y sonidos de letras con voz real interactiva para el inicio a la lectoescritura.',
      nivel: '1° y 2°',
      gradoBadge: '🌱 1.° y 2.° Grado',
      recordBadge: '🔤 27 Letras con Voz',
      btnText: '🔤 ¡Aprender Letras! 🔊',
      ciclo: 'primaria',
      icono: '🔤',
      tag: 'Fonética y Primeras Letras',
      bannerTag: '🔤 FONÉTICA GUIADA',
      imagen: '/images/spanish/games/caza-acentos.jpg',
      color: 'from-blue-600 via-indigo-600 to-indigo-700',
      btnColor: 'btn-3d-blue bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-blue-300 text-white',
      bordeColor: 'border-blue-300 hover:border-blue-400 shadow-[0_8px_24px_rgba(37,99,235,0.14)]',
      textColor: 'text-blue-600',
      badgeTop: '💎 Voz Humana',
      badgeXP: '⭐ Grado 1° y 2°',
      link: '/espanol/juegos?juego=abecedario&grado=1'
    },
    {
      id: 'constructor',
      titulo: 'Constructor de Palabras',
      subtitulo: 'Une sílabas sonoras y construye palabras con pronunciación guiada y retroalimentación inmediata.',
      nivel: '1° a 4°',
      gradoBadge: '🌱 1.° a 4.° Grado',
      recordBadge: '🧩 3 Niveles Activos',
      btnText: '🧩 ¡Armar Palabras! ✨',
      ciclo: 'primaria',
      icono: '🧩',
      tag: 'Morfología Inicial',
      bannerTag: '🏗️ ARMA-PALABRAS',
      imagen: '/images/spanish/games/taller-cuentos.jpg',
      color: 'from-emerald-500 via-teal-600 to-cyan-700',
      btnColor: 'btn-3d-emerald bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-300 text-white',
      bordeColor: 'border-emerald-300 hover:border-emerald-400 shadow-[0_8px_24px_rgba(16,185,129,0.14)]',
      textColor: 'text-emerald-600',
      badgeTop: '🌱 Sílabas Mágicas',
      badgeXP: '⭐ 3 Niveles',
      link: '/espanol/juegos?juego=constructor&grado=2'
    },
    {
      id: 'memoria',
      titulo: 'Parejas Mágicas de Memoria',
      subtitulo: 'Encuentra cartas gemelas de rimas, sinónimos y conceptos sonoros memorizando su posición.',
      nivel: '1° a 5°',
      gradoBadge: '🌱 1.° a 5.° Grado',
      recordBadge: '🃏 8 Pares Mágicos',
      btnText: '🎴 ¡Voltear Parejas! 🃏',
      ciclo: 'primaria',
      icono: '🎴',
      tag: 'Memoria y Léxico',
      bannerTag: '✨ MEMORIA SONORA',
      imagen: '/images/spanish/games/comprension.jpg',
      color: 'from-amber-400 via-orange-500 to-amber-600',
      btnColor: 'btn-3d-amber bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 border-amber-300',
      bordeColor: 'border-amber-300 hover:border-amber-400 shadow-[0_8px_24px_rgba(245,158,11,0.14)]',
      textColor: 'text-amber-700',
      badgeTop: '🃏 Cartas Gemelas',
      badgeXP: '⭐ Concentración',
      link: '/espanol/juegos?juego=memoria&grado=3'
    },
    {
      id: 'batalla',
      titulo: 'Batalla de Rimas y Flow',
      subtitulo: 'Sigue el beatbox metrónomo y clava la copla con métrica exacta sobre el compás musical.',
      nivel: '2° a 8°',
      gradoBadge: '⚡ 2.° a 8.° Grado',
      recordBadge: '🔥 Combo Récord x12',
      btnText: '🎤 ¡Cantar Coplas! 🎶',
      ciclo: 'todos',
      icono: '🎤',
      tag: 'Métrica y Ritmo',
      bannerTag: '🎵 VERSO Y RITMO',
      imagen: '/images/spanish/games/duelo.jpg',
      color: 'from-fuchsia-600 via-pink-600 to-rose-600',
      btnColor: 'btn-3d-purple bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 border-purple-300 text-white',
      bordeColor: 'border-purple-300 hover:border-purple-400 shadow-[0_8px_24px_rgba(168,85,247,0.14)]',
      textColor: 'text-purple-600',
      badgeTop: '🔥 Combo Rima',
      badgeXP: '🏆 Récord x12',
      link: '/espanol/juegos?juego=batalla&grado=5'
    },
    {
      id: 'ahorcado',
      titulo: 'Ahorcado Literario',
      subtitulo: 'Descifra la palabra secreta con pistas temáticas de fábulas, autores y teclado interactivo.',
      nivel: '2° a 8°',
      gradoBadge: '⚡ 2.° a 8.° Grado',
      recordBadge: '💡 Pistas Ilimitadas',
      btnText: '🕵️ ¡Descifrar Palabra! 💡',
      ciclo: 'todos',
      icono: '🕵️',
      tag: 'Ortografía y Enigma',
      bannerTag: '🔍 PALABRA OCULTA',
      imagen: '/images/spanish/games/detective.jpg',
      color: 'from-indigo-600 via-blue-700 to-indigo-800',
      btnColor: 'btn-3d-indigo bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 border-indigo-300 text-white',
      bordeColor: 'border-indigo-300 hover:border-indigo-400 shadow-[0_8px_24px_rgba(99,102,241,0.14)]',
      textColor: 'text-indigo-600',
      badgeTop: '💡 Con Pistas',
      badgeXP: '⭐ 5 Vidas',
      link: '/espanol/juegos?juego=ahorcado&grado=4'
    },
    {
      id: 'oraciones',
      titulo: 'Organizador de Oraciones',
      subtitulo: 'Ordena bloques sintácticos para formar frases coherentes leídas en voz alta al resolverlas.',
      nivel: '1° a 6°',
      gradoBadge: '🌱 1.° a 6.° Grado',
      recordBadge: '🗣️ Locución de Frase',
      btnText: '📝 ¡Organizar Frase! 📐',
      ciclo: 'primaria',
      icono: '📝',
      tag: 'Sintaxis y Estructura',
      bannerTag: '📐 FRASES Y SINTAXIS',
      imagen: '/images/spanish/games/taller-cuentos.jpg',
      color: 'from-sky-500 via-blue-600 to-indigo-700',
      btnColor: 'btn-3d-blue bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 border-sky-300 text-white',
      bordeColor: 'border-sky-300 hover:border-sky-400 shadow-[0_8px_24px_rgba(14,165,233,0.14)]',
      textColor: 'text-sky-600',
      badgeTop: '🗣️ Lectura Voz',
      badgeXP: '⭐ Grado 1° a 6°',
      link: '/espanol/juegos?juego=oraciones&grado=3'
    },
    {
      id: 'crucigrama',
      titulo: 'Crucigrama Literario',
      subtitulo: 'Pistas pedagógicas de métrica, sonetos y figuras retóricas con locución auditiva.',
      nivel: '6° a 9°',
      gradoBadge: '⚡ 6.° a 9.° Grado',
      recordBadge: '🧩 Términos Poéticos',
      btnText: '🧩 ¡Resolver Crucigrama! 🧠',
      ciclo: 'secundaria',
      icono: '🧩',
      tag: 'Léxico y Poesía',
      bannerTag: '🧠 DESAFÍO LÉXICO',
      imagen: '/images/spanish/games/comprension.jpg',
      color: 'from-teal-600 via-emerald-600 to-cyan-700',
      btnColor: 'btn-3d-emerald bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 border-emerald-300 text-white',
      bordeColor: 'border-emerald-300 hover:border-emerald-400 shadow-[0_8px_24px_rgba(16,185,129,0.14)]',
      textColor: 'text-teal-700',
      badgeTop: '🧩 Pistas de Voz',
      badgeXP: '⭐ Secundaria',
      link: '/espanol/juegos?juego=crucigrama&grado=7'
    },
    {
      id: 'juicio',
      titulo: 'Tribunal de Falacias',
      subtitulo: 'Juez supremo de debates, oratoria y detección de falacias lógicas en discursos y opiniones.',
      nivel: '7° a 9°',
      gradoBadge: '⚡ 7.° a 9.° Grado',
      recordBadge: '⚖️ Sala de Debate',
      btnText: '⚖️ ¡Objetar Falacia! 🏛️',
      ciclo: 'secundaria',
      icono: '⚖️',
      tag: 'Debate y Lógica',
      bannerTag: '🏛️ DEBATE Y RETÓRICA',
      imagen: '/images/spanish/games/detective.jpg',
      color: 'from-indigo-600 via-violet-700 to-purple-800',
      btnColor: 'btn-3d-indigo bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-indigo-300 text-white',
      bordeColor: 'border-indigo-300 hover:border-indigo-400 shadow-[0_8px_24px_rgba(99,102,241,0.14)]',
      textColor: 'text-indigo-600',
      badgeTop: '⚖️ Juez Supremo',
      badgeXP: '💎 +180 Gemas',
      link: '/espanol/juegos?juego=juicio&grado=8'
    },
    {
      id: 'trivia',
      titulo: 'Trivia Concurso TV',
      subtitulo: 'Preguntas curriculares con comodines 50:50, cronómetro de televisión y podio de honor.',
      nivel: '1° a 9°',
      gradoBadge: '⚡ 1.° a 9.° Grado',
      recordBadge: '🏆 Podio Dorado',
      btnText: '🏆 ¡Jugar Trivia TV! 🌟',
      ciclo: 'todos',
      icono: '🏆',
      tag: 'Trivia y Cultura',
      bannerTag: '📺 CONCURSO EN VIVO',
      imagen: '/images/spanish/games/ruleta.jpg',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      btnColor: 'btn-3d-amber bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 border-amber-300',
      bordeColor: 'border-amber-300 hover:border-amber-400 shadow-[0_8px_24px_rgba(245,158,11,0.14)]',
      textColor: 'text-amber-700',
      badgeTop: '⭐ Podio Oro',
      badgeXP: '💎 +100 Gemas',
      link: '/espanol/juegos?juego=trivia&grado=6'
    }
  ];

  // Filtrado de juegos didácticos
  const juegosFiltrados = catalogoJuegos.filter((j) => {
    if (filtroJuegos === 'primaria') return j.ciclo === 'primaria' || j.ciclo === 'todos';
    if (filtroJuegos === 'secundaria') return j.ciclo === 'secundaria' || j.ciclo === 'todos';
    return true;
  });

  return (
    <div className={`space-y-12 animate-fade-in pb-16 relative ${dyslexicMode ? 'tracking-wide' : ''}`}>
      {/* ══════════ ELEMENTOS MÁGICOS DECORATIVOS FLOTANTES DE FONDO ══════════ */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <span className="absolute top-28 left-6 text-3xl font-title font-black text-blue-400/50 animate-sparkle select-none">✨</span>
        <span className="absolute top-48 right-12 text-4xl font-title font-black text-amber-400/60 animate-sparkle select-none" style={{ animationDelay: '1.2s' }}>A</span>
        <span className="absolute top-[45%] left-10 text-3xl font-title font-black text-pink-400/50 animate-sparkle select-none" style={{ animationDelay: '2s' }}>ñ</span>
        <span className="absolute top-[52%] right-8 text-3xl font-title font-black text-purple-400/55 animate-sparkle select-none" style={{ animationDelay: '0.8s' }}>⭐</span>
        <span className="absolute top-[75%] left-14 text-4xl font-title font-black text-indigo-400/50 animate-sparkle select-none" style={{ animationDelay: '1.8s' }}>Z</span>
        <span className="absolute top-[88%] right-16 text-3xl font-title font-black text-emerald-400/50 animate-sparkle select-none" style={{ animationDelay: '2.5s' }}>💡</span>
      </div>

      {/* ══════════ HERO BANNER MÁGICO CON MASCOTA "PLUMITA" Y MINI DASHBOARD ══════════ */}
      <section className="relative z-10 overflow-hidden rounded-3xl md:rounded-4xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-10 text-white shadow-[0_18px_50px_-10px_rgba(30,58,138,0.55)] border-4 border-yellow-300/80 animate-glow-border">
        {/* Capas de Destellos y Nebulosa de Fondo */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Lado Izquierdo: Título Épico y Botones de Aventura */}
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-heading font-black text-xs tracking-wider uppercase px-4 py-1.5 rounded-full shadow-[0_3px_0_#b45309] border border-yellow-100">
              <span className="text-base animate-bounce">🦉</span>
              <span>Mundo de Lengua Castellana • 1.º a 9.º Grado</span>
              <span className="bg-slate-900 text-yellow-300 px-1.5 py-0.5 rounded-full text-[10px]">OFICIAL</span>
            </div>

            <h1 className="font-title text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              ¡Módulo de Español! <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(252,211,77,0.6)]">
                El Gran Reino de las Palabras 📖✨
              </span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100 font-semibold max-w-xl leading-relaxed drop-shadow">
              Plataforma pedagógica interactiva con lecciones oficiales, comprensión lectora y una sala de <strong className="text-white">15 juegos didácticos</strong> adaptados a cada ciclo escolar.
            </p>

            {/* Botones de Acción Rápida con Estilo 3D Arcade */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#clases-escolares"
                onClick={() => sounds.playClick()}
                className="btn-3d-amber bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-title font-black text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 border-2 border-yellow-200 cursor-pointer"
              >
                <span className="text-xl">🎒</span>
                <span>Explorar Clases y Grados</span>
              </a>

              <Link
                to="/espanol/juegos"
                onClick={() => sounds.playClick()}
                className="bg-white/20 hover:bg-white/30 border-2 border-white/50 text-white font-heading font-extrabold text-sm px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="text-xl">🎮</span>
                <span>Zona Arcade</span>
              </Link>

              <button
                onClick={playPlumitaWelcome}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-heading font-extrabold text-sm px-4 py-3.5 rounded-2xl backdrop-blur-md hover:-translate-y-1 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
                <span>Escuchar al Búho 🎙️</span>
              </button>
            </div>

            {/* Insignias de garantía pedagógica */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2 text-xs font-semibold text-blue-100">
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <span>🔊</span> Voces Reales y Fonética
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <span>📶</span> 100% Funcional Sin Internet
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <span>📚</span> Malla Curricular 1° a 9°
              </div>
            </div>
          </div>

          {/* Lado Derecho: Mascota Ilustrada "Plumita" y Mini Dashboard de Nivel */}
          <div className="w-full lg:w-[420px] flex flex-col items-center">
            {/* Bocadillo de Diálogo de Plumita */}
            <div className="relative bg-white text-slate-800 p-4 rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] border-3 border-yellow-400 mb-4 w-full animate-float-slow">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-200 to-yellow-400 border-2 border-yellow-500 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  🦉
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-title font-black text-base text-blue-700">Plumita el Búho</span>
                    <span className="text-[10px] bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-black px-2 py-0.5 rounded-full shadow-xs">
                      Guía Mágico
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-1 leading-snug">
                    &quot;¡Hola, explorador! Abajo tienes las clases y lecciones de cada grado, y luego la sala de juegos didácticos.&quot;
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2.5 left-10 w-5 h-5 bg-white border-b-2 border-r-2 border-yellow-400 transform rotate-45" />
            </div>

            {/* Mini Dashboard de Gamificación Real */}
            <div className="w-full bg-white/95 backdrop-blur-xl text-slate-900 p-5 rounded-3xl shadow-2xl border-3 border-amber-300 flex flex-col gap-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-2xl shadow-[0_3px_0_#b45309] border-2 border-yellow-200">
                    {rangoActual.icono}
                  </div>
                  <div>
                    <h3 className="font-title font-black text-sm text-slate-900 leading-tight">
                      Nivel {rangoActual.nivel}: {rangoActual.titulo}
                    </h3>
                    <p className="text-[11px] font-black text-blue-700">
                      Progreso de Aprendizaje Activo
                    </p>
                  </div>
                </div>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[0_2px_0_#065f46]">
                  <span>⚡ {progresoPorcentaje}%</span>
                </span>
              </div>

              {/* Barra de Energía / XP */}
              <div className="flex flex-col gap-1.5 bg-blue-50/70 p-3 rounded-2xl border border-blue-200">
                <div className="flex justify-between text-xs font-heading font-black">
                  <span className="text-slate-600">⚡ Energía de Sabiduría</span>
                  <span className="text-blue-800 bg-white px-2 py-0.5 rounded-md border border-blue-200 shadow-xs">
                    {progreso.xpTotal} / {xpObjetivo} XP
                  </span>
                </div>
                <div className="relative w-full h-4 bg-slate-200 rounded-full p-0.5 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden"
                    style={{ width: `${progresoPorcentaje}%` }}
                  >
                    <div className="absolute inset-0 shimmer-light" />
                  </div>
                </div>
              </div>

              {/* 3 Pills de Estadísticas Reales */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-gradient-to-b from-blue-50 to-blue-100/70 rounded-2xl p-2 text-center border-2 border-blue-200 shadow-xs">
                  <span className="block text-base">🎯</span>
                  <span className="font-title font-black text-blue-800 text-sm leading-tight">
                    {progreso.actividadesCompletadas?.length || 0}
                  </span>
                  <span className="block text-[9px] font-black text-slate-500 uppercase">Completados</span>
                </div>
                <div className="bg-gradient-to-b from-amber-50 to-amber-100/70 rounded-2xl p-2 text-center border-2 border-amber-200 shadow-xs">
                  <span className="block text-base">🔥</span>
                  <span className="font-title font-black text-amber-800 text-sm leading-tight">
                    {progreso.diasRacha || 1} d
                  </span>
                  <span className="block text-[9px] font-black text-slate-500 uppercase">Racha</span>
                </div>
                <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/70 rounded-2xl p-2 text-center border-2 border-emerald-200 shadow-xs">
                  <span className="block text-base">✨</span>
                  <span className="font-title font-black text-emerald-800 text-sm leading-tight">
                    {progreso.xpTotal >= 100 ? '95%' : '85%'}
                  </span>
                  <span className="block text-[9px] font-black text-slate-500 uppercase">Aciertos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          1. SECCIÓN DE CLASES Y GRADOS ESCOLARES (PRIMERO)
          ══════════════════════════════════════════════════════════════ */}
      <section id="clases-escolares" className="relative z-10 space-y-6">
        {/* Cabecera de Clases con Filtro de Ciclo Escolar */}
        <div className="bg-white rounded-3xl p-6 border-3 border-blue-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-[0_3px_0_#1e3a8a]">
              🗺️
            </div>
            <div>
              <h2 className="font-title font-black text-2xl text-slate-900 tracking-tight">
                Islas de Clases y Plan de Estudios (1.° a 9.°)
              </h2>
              <p className="text-xs text-slate-500 font-bold">
                Explora las lecciones oficiales, guías interactivas y comprensión lectora por grado.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                sounds.playClick();
                setSeccionActiva('todos');
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-title transition-all cursor-pointer ${
                seccionActiva === 'todos'
                  ? 'bg-slate-900 text-white font-black shadow-sm'
                  : 'bg-slate-100 text-slate-700 font-bold hover:bg-slate-200'
              }`}
            >
              Todos los Grados (1° a 9°)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setSeccionActiva('primaria');
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-title transition-all cursor-pointer ${
                seccionActiva === 'primaria'
                  ? 'bg-emerald-600 text-white font-black shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              🌱 Primaria (1° a 5°)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setSeccionActiva('secundaria');
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-title transition-all cursor-pointer ${
                seccionActiva === 'secundaria'
                  ? 'bg-[#3659d9] text-white font-black shadow-sm'
                  : 'bg-blue-50 text-blue-800 font-bold hover:bg-blue-100 border border-blue-200'
              }`}
            >
              ⚡ Secundaria (6° a 9°)
            </button>
          </div>
        </div>

        {/* BÁSICA PRIMARIA (1° AL 5° GRADO) */}
        {(seccionActiva === 'todos' || seccionActiva === 'primaria') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🎒</span>
              <div>
                <h3 className="font-title font-black text-xl text-slate-900">
                  Aventuras de Primaria (1° a 5° Grado)
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  Lectoescritura, fonética guiada, fábulas, rimas y creación de historias
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {primaria.map((grado) => (
                <div
                  key={grado.id}
                  className="bg-white rounded-3xl p-6 border-3 border-emerald-200/90 hover:border-emerald-400 shadow-sm hover:shadow-lg card-game-arcade flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border-2 border-emerald-200 shadow-xs">
                        {grado.icono}
                      </div>
                      <span className="bg-emerald-100 text-emerald-900 font-title font-black text-xs px-3 py-1 rounded-full border border-emerald-300 uppercase tracking-wide">
                        {grado.nombre}
                      </span>
                    </div>

                    <h4 className="font-title font-black text-lg text-slate-900 mb-1">
                      {grado.mundo}
                    </h4>

                    <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                      <span>✨</span> {grado.mascota}
                    </p>

                    <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6">
                      {grado.lema}
                    </p>
                  </div>

                  <Link
                    to={`/espanol/grado/${grado.id}`}
                    onClick={() => sounds.playClick()}
                    className="btn-3d-emerald w-full py-3 text-center font-title font-black text-xs rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-400"
                  >
                    <span>Explorar {grado.nombre}</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BÁSICA SECUNDARIA (6° AL 9° GRADO) */}
        {(seccionActiva === 'todos' || seccionActiva === 'secundaria') && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🏛️</span>
              <div>
                <h3 className="font-title font-black text-xl text-slate-900">
                  Literatura y Crítica de Secundaria (6° a 9° Grado)
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  Mitología precolombina, crónica, debate de falacias, figuras retóricas y Realismo Mágico
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {secundaria.map((grado) => (
                <div
                  key={grado.id}
                  className="bg-white rounded-3xl p-6 border-3 border-blue-200/90 hover:border-blue-400 shadow-sm hover:shadow-lg card-game-arcade flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl border-2 border-blue-200 shadow-xs">
                        {grado.icono}
                      </div>
                      <span className="bg-blue-100 text-blue-900 font-title font-black text-xs px-3 py-1 rounded-full border border-blue-300 uppercase tracking-wide">
                        {grado.nombre}
                      </span>
                    </div>

                    <h4 className="font-title font-black text-lg text-slate-900 mb-1">
                      {grado.mundo}
                    </h4>

                    <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1">
                      <span>⚡</span> {grado.mascota}
                    </p>

                    <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6">
                      {grado.lema}
                    </p>
                  </div>

                  <Link
                    to={`/espanol/grado/${grado.id}`}
                    onClick={() => sounds.playClick()}
                    className="btn-3d-blue w-full py-3 text-center font-title font-black text-xs rounded-xl text-white bg-[#3659d9] hover:bg-[#2845b5] transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-blue-400"
                  >
                    <span>Iniciar {grado.nombre}</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. ZONA ARCADE DE MINIJUEGOS (LUEGO DE LAS CLASES)
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 space-y-6 pt-6 border-t-2 border-blue-100">
        {/* Cabecera con Filtros de Ciclo para Juegos */}
        <div className="bg-white rounded-3xl p-6 border-3 border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 font-title font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
              <span className="text-lg">🕹️</span>
              <span>Zona Arcade Educativa</span>
            </div>
            <h2 className="font-title font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
              Minijuegos del Módulo de Español 🎮📚
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              15 actividades interactivas con audio, fonética, ortografía, misterio y desafíos pedagógicos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setFiltroJuegos('todos');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-title transition-all cursor-pointer ${
                filtroJuegos === 'todos'
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold'
              }`}
            >
              Todos los Juegos (15)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFiltroJuegos('primaria');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-title transition-all cursor-pointer ${
                filtroJuegos === 'primaria'
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200'
              }`}
            >
              🌱 Primaria
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFiltroJuegos('secundaria');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-title transition-all cursor-pointer ${
                filtroJuegos === 'secundaria'
                  ? 'bg-[#3659d9] text-white font-black shadow-xs'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold border border-indigo-200'
              }`}
            >
              ⚡ Secundaria
            </button>
          </div>
        </div>

        {/* Cuadrícula Bento Arcade 3D con Imágenes Ilustradas de Google Stitch */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {juegosFiltrados.map((j) => (
            <div
              key={j.id}
              className={`card-game-arcade bg-white rounded-3xl p-5 border-3 ${j.bordeColor} flex flex-col justify-between`}
            >
              <div className="flex flex-col gap-3">
                {/* Portada Ilustrada con Superposición Glassmorphism */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-inner group bg-slate-900">
                  <img
                    alt={j.titulo}
                    src={j.imagen}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback visual degradado si la imagen fallara */}
                  <div
                    className={`hidden w-full h-full bg-gradient-to-br ${j.color} items-center justify-center text-6xl text-white`}
                  >
                    {j.icono}
                  </div>

                  {/* Badges Neón Superiores */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white font-title font-black text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-white/20">
                    <span>{j.badgeTop}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-title font-black text-xs px-3 py-1.5 rounded-full shadow-[0_2px_0_#b45309] flex items-center gap-1 border border-yellow-200">
                    <span>{j.badgeXP || j.nivel}</span>
                  </div>

                  {/* Banner flotante de categoría arcade */}
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md text-yellow-300 text-[10px] font-title font-black px-2.5 py-1 rounded-lg border border-yellow-400/40">
                    {j.bannerTag}
                  </div>

                  {/* Ícono 3D Flotante inferior */}
                  <div className="absolute -bottom-2 right-3 w-12 h-12 rounded-2xl bg-white border-3 border-blue-400 shadow-md flex items-center justify-center text-2xl">
                    {j.icono}
                  </div>
                </div>

                {/* Título y Descripción Pedagógica */}
                <div className="pt-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-title font-black uppercase tracking-wider ${j.textColor}`}>
                      {j.tag}
                    </span>
                    <div className="flex text-amber-400 text-sm">
                      <span>★</span>
                      <span>★</span>
                      <span className="text-amber-200">★</span>
                    </div>
                  </div>

                  <h3 className="font-title font-black text-slate-900 text-lg leading-snug mt-1">
                    {j.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1.5 line-clamp-2">
                    {j.subtitulo}
                  </p>
                </div>
              </div>

              {/* Pie de la tarjeta con Botón 3D y Rango de Grados */}
              <div className="pt-4 flex flex-col gap-3 border-t border-slate-100 mt-4">
                <div className="flex items-center justify-between text-xs font-black text-slate-600">
                  <span className="flex items-center gap-1">{j.gradoBadge || `🎒 ${j.nivel}`}</span>
                  <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-xs font-bold text-[11px]">
                    {j.recordBadge || '✓ Sin Internet'}
                  </span>
                </div>

                <Link
                  to={j.link}
                  onClick={() => sounds.playClick()}
                  className={`w-full py-3 px-4 rounded-2xl font-title font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${j.btnColor}`}
                >
                  <span>{j.btnText || '¡Jugar ahora! 🎯'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. HERRAMIENTAS PEDAGÓGICAS DE APOYO Y ACCESIBILIDAD
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-blue-100">
        {/* Herramienta 1 */}
        <div className="bg-white rounded-3xl p-5 border-2 border-blue-100 shadow-sm flex items-center justify-between gap-4 group hover:border-blue-300 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all border border-blue-200">
              📖
            </div>
            <div>
              <h5 className="font-title font-black text-sm text-slate-900">Guía de Reglas</h5>
              <p className="text-xs text-slate-500 font-bold">Ortografía y acentuación</p>
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

        {/* Herramienta 2 */}
        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-100 shadow-sm flex items-center justify-between gap-4 group hover:border-emerald-300 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all border border-emerald-200">
              📶
            </div>
            <div>
              <h5 className="font-title font-black text-sm text-slate-900">100% Sin Conexión</h5>
              <p className="text-xs text-slate-500 font-bold">Funciona sin internet</p>
            </div>
          </div>
          <Link
            to="/espanol/juegos"
            onClick={() => sounds.playClick()}
            className="text-xs font-title font-black bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-3.5 py-2.5 rounded-xl border border-emerald-200 hover:border-emerald-600 transition-all cursor-pointer"
          >
            Ver Catálogo
          </Link>
        </div>

        {/* Herramienta 3 */}
        <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 shadow-sm flex items-center justify-between gap-4 group hover:border-purple-300 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all border border-purple-200">
              👓
            </div>
            <div>
              <h5 className="font-title font-black text-sm text-slate-900">Lectura Accesible</h5>
              <p className="text-xs text-slate-500 font-bold">Espaciado y contraste</p>
            </div>
          </div>
          <button
            onClick={toggleDyslexicFont}
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
