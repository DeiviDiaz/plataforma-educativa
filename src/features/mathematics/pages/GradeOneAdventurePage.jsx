import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GradeShortcut from '../components/GradeShortcut.jsx';

const periods = [
  ['Números', '🐒', 'Cuenta hasta 50 y suma.'],
  ['Sumas', '🦜', 'Junta números y resuelve retos.'],
  ['Números grandes', '🌳', 'Cuenta, suma y completa caminos.'],
  ['Formas y medidas', '🧭', 'Mide, mira la hora y cuenta.'],
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
  const location = useLocation();
  const navigate = useNavigate();
  const [screen, setScreen] = useState(() => (
    location.state?.returnToPeriodSelection ? 'map' : 'welcome'
  ));
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const welcome = '¡Hola! Soy tu guía. Vamos a descubrir las matemáticas de primer grado.';

  useEffect(() => {
    if (screen === 'welcome') speak(welcome, voiceEnabled);
    return () => window.speechSynthesis?.cancel();
  }, [screen, voiceEnabled]);

  return (
    <main className="grade-two-adventure">
      <header className="grade-two-topbar">
        <GradeShortcut className="grade-two-secondary" />
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
            <p>¡Vamos a jugar y aprender con números!</p>
            <button type="button" className="grade-two-primary" onClick={() => setScreen('map')}>
              ¡Jugar! →
            </button>
          </div>
          <div className="grade-two-guide" aria-hidden="true">🌳 👧🏽🎒 🌴</div>
        </section>
      )}

      {screen === 'map' && (
        <section>
          <p className="grade-two-kicker">¡Vamos a jugar!</p>
          <h1>¿Qué quieres aprender?</h1>
          <p>Toca un dibujo para empezar.</p>
          <div className="grade-two-worlds">
            {periods.map(([title, icon, description], index) => (
              <button
                type="button"
                className="grade-two-world-card"
                key={index}
                onClick={() => navigate(`/matematicas/grado/1/periodo/${index + 1}`)}
              >
                <span aria-hidden="true">{icon}</span>
                <strong>Periodo {index + 1}: {title}</strong>
                <small>{description}</small>
              </button>
            ))}
          </div>
          <button type="button" className="grade-two-secondary" onClick={() => setScreen('welcome')}>
            ← Volver
          </button>
        </section>
      )}
    </main>
  );
}
