import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const periods = [
  ['¡Acerquémonos a nuestros amigos los números!', '🐒', 'Cuenta, agrupa y descubre los números del 1 al 50.', 'Números, decenas y operaciones'],
  ['Cuando contamos aprendemos.', '🦜', 'Aprende a reagrupar y resuelve situaciones cotidianas.', 'Reagrupación y problemas'],
  ['Reconozcamos nuestro entorno y aprendamos de él.', '🌳', 'Explora centenas, secuencias y operaciones.', 'Centenas y resolución de situaciones'],
  ['Juguemos con las operaciones matemáticas.', '🧭', 'Descubre formas, medidas, tiempo y datos.', 'Geometría, medidas y pictogramas'],
];

function speak(text, enabled) {
  if (!enabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CO';
  utterance.rate = 0.9;
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase() === 'es-co')
    ?? window.speechSynthesis.getVoices().find((item) => /^es[-_]/i.test(item.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export default function GradeOneAdventurePage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('welcome');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const welcome = '¡Hola! Soy tu guía. Vamos a descubrir las matemáticas de primer grado.';

  useEffect(() => {
    if (screen === 'welcome') speak(welcome, voiceEnabled);
    return () => window.speechSynthesis?.cancel();
  }, [screen, voiceEnabled]);

  return (
    <main className="grade-two-adventure">
      <header className="grade-two-topbar">
        <Link to="/matematicas" className="grade-two-secondary">← Volver a Matemáticas</Link>
        <span>Matemáticas <span aria-hidden="true">›</span> Grado 1</span>
        <div className="grade-two-audio-controls">
          <button type="button" className="grade-two-secondary" onClick={() => speak(welcome, voiceEnabled)}>🔁 Repetir</button>
          <button
            type="button"
            className="grade-two-secondary"
            aria-pressed={voiceEnabled}
            onClick={() => setVoiceEnabled((enabled) => !enabled)}
          >
            {voiceEnabled ? '🔊 Voz' : '🔇 Voz'}
          </button>
        </div>
      </header>

      {screen === 'welcome' && (
        <section className="grade-two-hero">
          <div>
            <span className="grade-two-eyebrow">Matemáticas · Grado primero</span>
            <h1>¡Aventuras matemáticas!</h1>
            <p>Explora cuatro periodos con los minijuegos originales de grado 1.</p>
            <button type="button" className="grade-two-primary" onClick={() => setScreen('map')}>
              ¡Comenzar aventura! →
            </button>
          </div>
          <div className="grade-two-guide" aria-hidden="true">🌳 👧🏽🎒 🌴</div>
        </section>
      )}

      {screen === 'map' && (
        <section>
          <p className="grade-two-kicker">Mapa de aventuras</p>
          <h1>¿A dónde vamos hoy?</h1>
          <p>Elige un periodo y juega sus retos sin cambiar sus mecánicas.</p>
          <div className="grade-two-worlds">
            {periods.map(([title, icon, description, topics], index) => (
              <button
                type="button"
                className="grade-two-world-card"
                key={title}
                onClick={() => navigate(`/matematicas/grado/1/periodo/${index + 1}`)}
              >
                <span>{icon}</span>
                <strong>Periodo {index + 1}<br />{title}</strong>
                <small>{description}</small>
                <small>{topics} · Explorar →</small>
              </button>
            ))}
          </div>
          <button type="button" className="grade-two-secondary" onClick={() => setScreen('welcome')}>
            ← Presentación
          </button>
        </section>
      )}
    </main>
  );
}
