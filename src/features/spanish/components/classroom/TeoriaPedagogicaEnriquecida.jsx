import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import { sounds } from '../../utils/audio';
import { voiceReader } from '../../utils/speech';
import { GameProgress } from '../../utils/gamification';
import { getEnrichedKnowledge } from '../../utils/knowledgeEngine';
import { TERMINOS_GLOSARIO } from './GlosarioInteractivo';

export default function TeoriaPedagogicaEnriquecida({
  guia,
  gradoNumero = 1,
  gradoNombre = 'Grado Escolar',
  onAvanzarPaso
}) {
  const esInicial = gradoNumero <= 2;
  const esSecundaria = gradoNumero >= 6;
  const tituloGuia = guia.titulo || guia.nombre || 'Guía de Aprendizaje';
  const lecturaOriginal = guia.leccion?.lectura || '';
  const dba = guia.dba || '';

  // Motor de Conocimiento Enriquecido
  const sabiduria = getEnrichedKnowledge(guia, gradoNumero);

  // Si la lectura original no es genérica, se usa; de lo contrario se usa la lectura viva del motor
  const esLecturaGenerica = lecturaOriginal.includes('nos reunimos en torno a la palabra para explorar');
  const lecturaMostrar = !esLecturaGenerica && lecturaOriginal.length > 80
    ? lecturaOriginal
    : sabiduria.lecturaViva;

  // Modos de Aprendizaje (Pestañas Interactivas de Sabiduría)
  const [pestanaActiva, setPestanaActiva] = useState('lectura'); // 'lectura', 'laboratorio', 'desafio', 'pergamino'
  const [pasoActivoFormula, setPasoActivoFormula] = useState(0);

  // Estados de Accesibilidad y Voz
  const [tamanoFuente, setTamanoFuente] = useState(esInicial ? 'text-xl' : 'text-lg');
  const [modoDislexia, setModoDislexia] = useState(false);
  const [leyendoVoz, setLeyendoVoz] = useState(false);
  const [copiadoExito, setCopiadoExito] = useState(false);
  const [modalGlosario, setModalGlosario] = useState(false);
  const [busquedaGlosario, setBusquedaGlosario] = useState('');
  const [verDbaDetalle, setVerDbaDetalle] = useState(false);

  // Estados del Desafío Progresivo de Sabiduría (3 Niveles)
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [opcionElegida, setOpcionElegida] = useState(null);
  const [feedbackActual, setFeedbackActual] = useState(null); // 'correcto' | 'incorrecto'
  const [aciertosDesafio, setAciertosDesafio] = useState([false, false, false]);
  const [desafioCompletado, setDesafioCompletado] = useState(false);

  useEffect(() => {
    return () => {
      voiceReader.stop();
    };
  }, []);

  // Locución Text-to-Speech
  const toggleLecturaVoz = () => {
    if (leyendoVoz) {
      voiceReader.stop();
      setLeyendoVoz(false);
    } else {
      sounds.playClick();
      setLeyendoVoz(true);
      const texto = `${sabiduria.tituloAtractivo}. Lección oficial de ${gradoNombre}. ${lecturaMostrar}`;
      voiceReader.speak(texto, () => {
        setLeyendoVoz(false);
      });
    }
  };

  const hablarTexto = (txt) => {
    sounds.playClick();
    voiceReader.speak(txt);
  };

  // Manejo de respuestas en el Desafío Mente de Oro
  const preguntaActual = sabiduria.preguntasReto[indicePregunta] || sabiduria.preguntasReto[0];

  const handleResponderPregunta = (opcion) => {
    setOpcionElegida(opcion);
    if (opcion.esCorrecta) {
      sounds.playSuccess();
      setFeedbackActual('correcto');

      const nuevosAciertos = [...aciertosDesafio];
      nuevosAciertos[indicePregunta] = true;
      setAciertosDesafio(nuevosAciertos);

      try {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          emojis: ['⭐', '🎉', '🦉', '✨', '📚'],
          emojiSize: 32,
          confettiNumber: 35
        });
      } catch {}

      // Premiar con XP según el nivel
      const xpGanados = indicePregunta === 0 ? 15 : indicePregunta === 1 ? 20 : 25;
      GameProgress.addXP(xpGanados, 'desafio_sabiduria');

      // Si es la última pregunta, completar desafío
      if (indicePregunta === sabiduria.preguntasReto.length - 1) {
        setDesafioCompletado(true);
        setTimeout(() => {
          sounds.playFanfare();
        }, 500);
      }
    } else {
      sounds.playIncorrect();
      setFeedbackActual('incorrecto');
    }
  };

  const avanzarSiguientePregunta = () => {
    sounds.playClick();
    setOpcionElegida(null);
    setFeedbackActual(null);
    if (indicePregunta < sabiduria.preguntasReto.length - 1) {
      setIndicePregunta((prev) => prev + 1);
    }
  };

  const reiniciarDesafio = () => {
    sounds.playClick();
    setIndicePregunta(0);
    setOpcionElegida(null);
    setFeedbackActual(null);
    setAciertosDesafio([false, false, false]);
    setDesafioCompletado(false);
  };

  // Copiar Ficha de Oro al portapapeles
  const handleCopiarFichaOro = () => {
    sounds.playClick();
    const textoFicha = `📜 PERGAMINO DE SABIDURÍA: ${sabiduria.tituloAtractivo}\n` +
      `Curso: ${gradoNombre} • Guía: ${tituloGuia}\n\n` +
      `⭐ REGLA DE ORO:\n${sabiduria.fichaOro.reglaPrincipal}\n\n` +
      `✨ EJEMPLO ESTRELLA:\n${sabiduria.fichaOro.ejemploEstrella}\n\n` +
      `💡 APLICACIÓN PARA LA VIDA:\n${sabiduria.fichaOro.aplicacionVida}\n\n` +
      `🦉 TRUCO SECRETO DEL BÚHO:\n${sabiduria.trucoMnemotecnico.truco}\n\n` +
      `¡Registrado en mi Cuaderno de Español! 📖✨`;

    navigator.clipboard.writeText(textoFicha).then(() => {
      setCopiadoExito(true);
      setTimeout(() => setCopiadoExito(false), 3000);
    });
  };

  // Filtrado de términos en el glosario
  const terminosFiltrados = TERMINOS_GLOSARIO.filter(
    (t) =>
      t.termino.toLowerCase().includes(busquedaGlosario.toLowerCase()) ||
      t.definicion.toLowerCase().includes(busquedaGlosario.toLowerCase()) ||
      t.categoria.toLowerCase().includes(busquedaGlosario.toLowerCase())
  );

  return (
    <div className={`space-y-8 animate-fade-in ${modoDislexia ? 'tracking-wider font-sans' : ''}`}>
      {/* ══════════════════════════════════════════════════════════════
          1. CABECERA HERO DE SABIDURÍA (IDENTIDAD Y ALINEACIÓN MEN)
          ══════════════════════════════════════════════════════════════ */}
      <div className="lengua-panel relative">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {!esInicial && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-600">{guia.componente || 'Español'} · Estándar MEN Colombia</p>
              <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                {sabiduria.tituloAtractivo}
              </h3>

              <p className="text-slate-700 text-sm max-w-2xl leading-relaxed">
                {sabiduria.subtituloPedagogico}
              </p>
            </div>
          )}

          {/* Botones de Audio y Glosario Rápido */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={toggleLecturaVoz}
              className={`px-5 py-3.5 rounded-2xl font-title font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                leyendoVoz
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 shadow-[0_4px_0_#b45309]'
              }`}
            >
              <span>{leyendoVoz ? 'Detener lectura' : 'Escuchar lectura'}</span>
            </button>

            <button
              onClick={() => setModalGlosario(true)}
              className="lengua-pestana"
            >
              <span>📖</span>
              <span>Glosario</span>
            </button>
          </div>
        </div>

        {/* Desglose de DBA Oficial Expandible */}
        {!esInicial && dba && (
          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xl">📘</span>
                <div>
                  <strong className="block font-bold text-sm text-slate-900">
                    Derecho básico de aprendizaje
                  </strong>
                  <p className="mt-0.5 leading-relaxed">
                    {verDbaDetalle ? dba : `${dba.slice(0, 150)}...`}
                  </p>
                </div>
              </div>
              <button
                aria-expanded={verDbaDetalle}
                onClick={() => setVerDbaDetalle(!verDbaDetalle)}
                className="text-indigo-800 font-bold text-sm underline shrink-0 cursor-pointer"
              >
                {verDbaDetalle ? 'Menos ▲' : 'Ver Completo ▼'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. SELECTOR DE PESTAÑAS INTERACTIVAS DE SABIDURÍA (4 MODOS)
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Recursos de lectura">
        {[
          ['lectura', 'Texto'],
          ['laboratorio', esInicial ? 'Ejemplos' : 'Reglas y ejemplos'],
          ['desafio', 'Reto'],
          ['pergamino', esInicial ? 'Repasar' : 'Ficha de repaso'],
        ].map(([id, nombre]) => (
          <button key={id} type="button" className="lengua-pestana" aria-pressed={pestanaActiva === id}
            onClick={() => {
              sounds.playClick();
              setPestanaActiva(id);
            }}>
            {nombre}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PESTAÑA 1: LECTURA VIVA Y AVENTURA
          ══════════════════════════════════════════════════════════════ */}
      {pestanaActiva === 'lectura' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border-2 border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <h3 className="font-title font-black text-xl text-slate-900">
                    Texto de la lección
                  </h3>
                  {!esInicial && <p className="text-sm text-slate-600">Descubre cómo se usan las palabras en este texto.</p>}
                </div>
              </div>

              {/* Controles de tipografía */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  aria-pressed={modoDislexia}
                  onClick={() => setModoDislexia(!modoDislexia)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-title font-bold border transition-all cursor-pointer ${
                    modoDislexia
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Aa Espaciado
                </button>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    aria-label="Letra normal"
                    aria-pressed={tamanoFuente === 'text-base'}
                    onClick={() => setTamanoFuente('text-base')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-base' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
                  >
                    A
                  </button>
                  <button
                    aria-label="Letra grande"
                    aria-pressed={tamanoFuente === 'text-lg'}
                    onClick={() => setTamanoFuente('text-lg')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-lg' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
                  >
                    A+
                  </button>
                  <button
                    aria-label="Letra muy grande"
                    aria-pressed={tamanoFuente === 'text-xl'}
                    onClick={() => setTamanoFuente('text-xl')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${tamanoFuente === 'text-xl' ? 'bg-white shadow-xs font-black' : 'text-slate-500'}`}
                  >
                    A++
                  </button>
                </div>
              </div>
            </div>

            {/* Texto de Lectura Principal */}
            <div
              className={`lengua-lectura text-slate-800 font-body font-medium p-3 sm:p-6 rounded-xl border ${
                esSecundaria ? 'bg-slate-50/70 border-indigo-100' : 'bg-emerald-50/30 border-emerald-100'
              } ${tamanoFuente}`}
            >
              {lecturaMostrar.split('\n\n').map((parrafo, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {parrafo}
                </p>
              ))}
            </div>

            {/* Curiosidad Asombrosa */}
            {sabiduria.curiosidadAsombrosa && (
              <details className="rounded-xl border border-amber-200 bg-amber-50 p-4" open={esInicial ? undefined : true}>
                <summary className="lengua-summary">Dato curioso</summary>
                <div className="flex items-start gap-4 mt-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-[0_3px_0_#b45309] shrink-0">
                    💡
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-title font-black text-amber-950 text-sm uppercase tracking-wide">
                      {sabiduria.curiosidadAsombrosa.titulo}
                    </h4>
                    <p className="text-amber-900 font-bold text-xs sm:text-sm leading-relaxed">
                      {sabiduria.curiosidadAsombrosa.texto}
                    </p>
                    <span className="inline-block bg-amber-200/80 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-md mt-1">
                      ✨ {sabiduria.curiosidadAsombrosa.datoCurioso}
                    </span>
                  </div>
                </div>
              </details>
            )}

            {/* Botón para pasar al Laboratorio */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setPestanaActiva('laboratorio');
                }}
                className="btn-3d-purple px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-title font-black text-sm rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Paso Siguiente: Entrar al Laboratorio de Reglas</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PESTAÑA 2: LABORATORIO INTERACTIVO DE REGLAS Y FÓRMULAS
          ══════════════════════════════════════════════════════════════ */}
      {pestanaActiva === 'laboratorio' && (
        <div className="space-y-6 animate-fade-in">
          {/* FÓRMULA VISUAL EN PASOS / BLOQUES DE COLOR */}
          {sabiduria.formulaVisual && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🧪</span>
                  <div>
                    <h3 className="font-title font-black text-lg sm:text-xl text-slate-900">
                      {sabiduria.formulaVisual.titulo}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold">
                      Presiona cada bloque para explorar cómo funciona el esquema
                    </p>
                  </div>
                </div>
                <span className="bg-purple-100 text-purple-900 font-black text-xs px-3 py-1 rounded-full border border-purple-200">
                  Esquema Interactivo
                </span>
              </div>

              {/* Bloques de la Fórmula */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sabiduria.formulaVisual.pasos.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      sounds.playClick();
                      setPasoActivoFormula(idx);
                    }}
                    className={`rounded-2xl p-5 text-white transition-all cursor-pointer shadow-md flex flex-col justify-between ${p.color} ${
                      pasoActivoFormula === idx
                        ? 'scale-103 ring-4 ring-yellow-300 shadow-xl'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{p.icono}</span>
                        <span className="bg-black/25 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                          Paso #{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-title font-black text-lg leading-tight mb-1">
                        {p.paso}
                      </h4>
                      <p className="text-xs font-bold text-white/90 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/20 mt-3 flex items-center justify-between text-[11px] font-black text-white/80">
                      <span>{pasoActivoFormula === idx ? '✓ Seleccionado' : 'Toca para ver'}</span>
                      <span>➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONCEPTOS CLAVE PROFUNDOS (CON TRUCOS Y ERRORES A EVITAR) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="font-title font-black text-lg sm:text-xl text-slate-900">
                    Cazador de Conceptos: Leyes de Oro
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    Definición, ejemplos reales, secretos del sabio y errores comunes
                  </p>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-900 font-black text-xs px-3 py-1 rounded-full border border-blue-200">
                {sabiduria.conceptosClave.length} Conceptos
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {sabiduria.conceptosClave.map((c, i) => (
                <div
                  key={i}
                  className="bg-slate-50/80 rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-400 transition-all shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex items-center justify-center text-2xl">
                          {c.icono || '📌'}
                        </span>
                        <div>
                          <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                            Concepto #{i + 1}
                          </span>
                          <h4 className="font-title font-black text-slate-900 text-lg leading-tight">
                            {c.concepto}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => hablarTexto(`${c.concepto}. ${c.definicion}. Ejemplo: ${c.ejemplo}`)}
                        className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center cursor-pointer transition-colors"
                        title="Escuchar locución del concepto"
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {c.definicion}
                    </p>

                    {/* Ejemplo Real */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <span>✅</span> Ejemplo en Acción:
                      </span>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">
                        {c.ejemplo}
                      </p>
                    </div>

                    {/* Truco del Sabio */}
                    {c.trucoSabio && (
                      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-bold text-amber-950 flex items-start gap-2">
                        <span className="text-base shrink-0">🦉</span>
                        <span>{c.trucoSabio}</span>
                      </div>
                    )}
                  </div>

                  {/* Error común a evitar */}
                  {c.errorComun && (
                    <div className="pt-2 border-t border-slate-200/80 text-[11px] font-bold text-rose-700 flex items-start gap-1.5">
                      <span className="shrink-0">⚠️</span>
                      <span><strong>Ojo:</strong> {c.errorComun}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TRUCO SECRETO DEL BÚHO Y ERROR TÍPICO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tarjeta Dorada Mnemotécnica */}
            {sabiduria.trucoMnemotecnico && (
              <div className="bg-gradient-to-br from-amber-400 to-yellow-300 text-slate-950 p-6 rounded-3xl shadow-lg border-3 border-amber-500 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{sabiduria.trucoMnemotecnico.icono || '🗝️'}</span>
                  <h4 className="font-title font-black text-lg leading-tight">
                    {sabiduria.trucoMnemotecnico.titulo}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-extrabold leading-relaxed text-slate-900">
                  {sabiduria.trucoMnemotecnico.truco}
                </p>
              </div>
            )}

            {/* Tarjeta de Advertencia contra el Error Común */}
            {sabiduria.errorTipico && (
              <div className="bg-rose-50 text-rose-950 p-6 rounded-3xl shadow-sm border-3 border-rose-300 space-y-2">
                <div className="flex items-center gap-2.5 text-rose-700">
                  <span className="text-3xl">🚫</span>
                  <h4 className="font-title font-black text-lg leading-tight text-rose-950">
                    El Error que Todos Cometen
                  </h4>
                </div>
                <p className="text-xs font-bold text-rose-900 leading-relaxed">
                  <strong>Confusión típica:</strong> {sabiduria.errorTipico.queConfunden}
                </p>
                <p className="text-xs font-extrabold text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-300">
                  <strong>✅ Cómo se hace bien:</strong> {sabiduria.errorTipico.comoSeHace}
                </p>
              </div>
            )}
          </div>

          {/* Botón para pasar al Desafío */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                setPestanaActiva('desafio');
              }}
              className="btn-3d-amber px-6 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-title font-black text-sm rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all border border-yellow-200"
            >
              <span>¡Pruébate! Ir al Desafío Mente de Oro (Quiz)</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PESTAÑA 3: DESAFÍO MENTE DE ORO (QUIZ PROGRESIVO DE 3 NIVELES)
          ══════════════════════════════════════════════════════════════ */}
      {pestanaActiva === 'desafio' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 space-y-6 relative overflow-hidden">
            {/* Header del Desafío con Barra de Estrellas */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-[0_4px_0_#b45309]">
                  🏆
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                    {preguntaActual.nivel} • Pregunta {indicePregunta + 1} de {sabiduria.preguntasReto.length}
                  </span>
                  <h3 className="font-title font-black text-xl sm:text-2xl text-white">
                    Desafío Mente de Oro
                  </h3>
                </div>
              </div>

              {/* Indicador de 3 Estrellas de Maestría */}
              <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-white/20">
                <span className="text-xs font-black text-amber-300 mr-1">Maestría:</span>
                {aciertosDesafio.map((acierto, idx) => (
                  <span
                    key={idx}
                    className={`text-xl transition-all ${
                      acierto ? 'text-amber-400 scale-120 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'text-slate-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Enunciado de la Pregunta */}
            <div>
              <p className="text-lg sm:text-xl font-title font-extrabold text-blue-100 leading-snug">
                {preguntaActual.pregunta}
              </p>
            </div>

            {/* Opciones de respuesta */}
            <div className="grid grid-cols-1 gap-3.5">
              {preguntaActual.opciones.map((opcion, idx) => {
                const estaSeleccionada = opcionElegida === opcion;
                let estiloBoton = 'bg-white/10 hover:bg-white/20 border-white/20 text-white';

                if (estaSeleccionada) {
                  if (opcion.esCorrecta) {
                    estiloBoton = 'bg-emerald-600 border-emerald-300 text-white shadow-[0_4px_0_#065f46] scale-101';
                  } else {
                    estiloBoton = 'bg-rose-600 border-rose-300 text-white shadow-[0_4px_0_#be123c]';
                  }
                } else if (feedbackActual === 'correcto' && opcion.esCorrecta) {
                  estiloBoton = 'bg-emerald-600/60 border-emerald-400 text-white';
                }

                return (
                  <button
                    key={idx}
                    disabled={feedbackActual === 'correcto'}
                    onClick={() => handleResponderPregunta(opcion)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-150 flex items-start gap-4 cursor-pointer ${estiloBoton}`}
                  >
                    <span className="w-8 h-8 rounded-xl bg-black/40 font-title font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-sm sm:text-base leading-snug">
                      {opcion.texto}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación inmediata */}
            {feedbackActual && (
              <div
                className={`p-5 rounded-2xl border-2 flex items-start gap-3.5 ${
                  feedbackActual === 'correcto'
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-400 text-rose-200'
                }`}
              >
                <span className="text-3xl shrink-0">
                  {feedbackActual === 'correcto' ? '🎉' : '💡'}
                </span>
                <div className="space-y-1">
                  <h4 className="font-title font-black text-base">
                    {feedbackActual === 'correcto'
                      ? '¡Excelente deducción!'
                      : 'Pista para aprender:'}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {opcionElegida?.feedback}
                  </p>
                </div>
              </div>
            )}

            {/* Controles de avance */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-blue-200">
                Ganas XP por cada respuesta correcta en la primera oportunidad.
              </span>

              {feedbackActual === 'correcto' && !desafioCompletado && (
                <button
                  onClick={avanzarSiguientePregunta}
                  className="btn-3d-amber px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-title font-black text-xs sm:text-sm rounded-xl cursor-pointer shadow-md flex items-center gap-2"
                >
                  <span>Siguiente Nivel de Pregunta</span>
                  <span>➔</span>
                </button>
              )}

              {desafioCompletado && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={reiniciarDesafio}
                    className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-title font-black text-xs cursor-pointer border border-white/30"
                  >
                    🔄 Reintentar Quiz
                  </button>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setPestanaActiva('pergamino');
                    }}
                    className="btn-3d-emerald px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-title font-black text-xs sm:text-sm rounded-xl cursor-pointer shadow-md flex items-center gap-2 border border-emerald-300"
                  >
                    <span>¡Desafío Superado! Ver Pergamino</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PESTAÑA 4: PERGAMINO DE ORO COLECCIONABLE (PARA EL CUADERNO)
          ══════════════════════════════════════════════════════════════ */}
      {pestanaActiva === 'pergamino' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-amber-200 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-[0_3px_0_#b45309] border-2 border-yellow-200">
                  📜
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                    Ficha de Estudio Oficial • {gradoNombre}
                  </span>
                  <h3 className="font-title font-black text-2xl text-slate-950">
                    Pergamino de Oro Coleccionable
                  </h3>
                </div>
              </div>

              {/* Acciones de la Ficha */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => hablarTexto(sabiduria.fichaOro.reglaPrincipal + '. ' + sabiduria.fichaOro.ejemploEstrella)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-title font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  <span>Escuchar</span>
                </button>

                <button
                  onClick={handleCopiarFichaOro}
                  className="btn-3d-amber px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-title font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs border border-yellow-200"
                >
                  <span>{copiadoExito ? '✓ ¡Copiado con Éxito!' : '📋 Copiar Pergamino'}</span>
                </button>
              </div>
            </div>

            {/* 3 Pilares del Pergamino */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-2">
                <span className="text-xs font-black text-amber-900 uppercase block tracking-wider">
                  ⭐ 1. Regla de Oro
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  {sabiduria.fichaOro.reglaPrincipal}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-2">
                <span className="text-xs font-black text-amber-900 uppercase block tracking-wider">
                  ✨ 2. Ejemplo Estrella
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  {sabiduria.fichaOro.ejemploEstrella}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-2">
                <span className="text-xs font-black text-amber-900 uppercase block tracking-wider">
                  💡 3. Sabiduría para la Vida
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  {sabiduria.fichaOro.aplicacionVida}
                </p>
              </div>
            </div>

            {/* Consejo especial del búho */}
            <div className="bg-white/80 p-4 rounded-2xl border border-amber-300 flex items-center gap-3">
              <span className="text-3xl">🦉</span>
              <p className="text-xs font-bold text-amber-950 leading-relaxed">
                <strong>Consejo de Plumita:</strong> Anota este resumen en las primeras páginas de tu cuaderno físico. ¡Será tu guía antes de cualquier prueba o taller!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          BOTÓN GLOBAL DE PASO AL SIGUIENTE PILAR (COMPRENSIÓN Y CUADERNO)
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <span className="text-4xl">🚀</span>
          <div>
            <span className="font-title font-black text-slate-900 block text-base">
              ¿Listo para aplicar esta sabiduría?
            </span>
            <p className="text-xs text-slate-500 font-bold">
              Pasa al Paso 2: Taller de Comprensión en 3 Niveles y Actividades al Cuaderno.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            if (onAvanzarPaso) onAvanzarPaso('comprension');
          }}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-title font-black text-sm rounded-2xl shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-400"
        >
          <span>Paso 2: Taller de Comprensión y Cuaderno</span>
          <span>➔</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MODAL DE GLOSARIO RÁPIDO EN CONTEXTO
          ══════════════════════════════════════════════════════════════ */}
      {modalGlosario && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-indigo-200 overflow-hidden">
            {/* Header del modal */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-indigo-50">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-title font-black text-lg text-slate-900">
                    Glosario Pedagógico en Contexto
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    Consulta términos y figuras literarias sin salir de la lección
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalGlosario(false)}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm cursor-pointer border border-slate-300"
              >
                ✕
              </button>
            </div>

            {/* Buscador */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <input
                type="text"
                placeholder="Buscar término (ej. Metáfora, Símil, Copla, Minga)..."
                value={busquedaGlosario}
                onChange={(e) => setBusquedaGlosario(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 text-sm font-bold text-slate-800 outline-none"
              />
            </div>

            {/* Lista de términos */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1 bg-slate-50">
              {terminosFiltrados.slice(0, 10).map((t, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{t.icono}</span>
                      <h4 className="font-title font-black text-slate-900 text-sm">{t.termino}</h4>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                      {t.categoria}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    {t.definicion}
                  </p>
                  <p className="text-xs text-emerald-800 font-bold bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                    Ejemplo: {t.ejemplo}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => setModalGlosario(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-title font-black text-xs cursor-pointer hover:bg-slate-800"
              >
                Cerrar Glosario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
