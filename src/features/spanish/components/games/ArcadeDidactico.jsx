import { useEffect, useState } from 'react';
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
import { voiceReader } from '../../utils/speech';

const juegos = {
  abecedario: ['🔤', 'Letras con voz', 'Escucha y reconoce letras y sílabas.'],
  constructor: ['🧩', 'Arma palabras', 'Une sílabas para construir palabras.'],
  memoria: ['🐾', 'Parejas de rimas', 'Encuentra las palabras que riman.'],
  batalla: ['🎵', 'Encuentra la rima', 'Escucha y elige palabras que terminan parecido.'],
  oraciones: ['🧱', 'Ordena la frase', 'Coloca las palabras en un orden que tenga sentido.'],
  detective: ['🔎', 'Detective de palabras', 'Revisa la ortografía y la gramática en textos breves.'],
  trivia: ['💡', 'Preguntas de Español', 'Escucha la pregunta y elige una respuesta.'],
  completar: ['✏️', 'Completa el texto', 'Usa el contexto para recuperar las palabras del texto.'],
  crucigrama: ['▦', 'Crucigrama de palabras', 'Resuelve pistas sobre literatura y lenguaje.'],
  juicio: ['⚖️', 'Detecta el argumento', 'Lee una idea y encuentra cómo intenta convencer.'],
  escape: ['🦋', 'Las llaves de Macondo', 'Resuelve un enigma para abrir cada puerta.'],
  ninja: ['🌧️', 'Lluvia de sílabas', 'Reconoce las sílabas que aparecen.'],
  ahorcado: ['🔡', 'Descubre la palabra', 'Elige letras para descubrir la palabra.'],
  duelo: ['📚', 'Duelo de vocabulario', 'Relaciona las palabras y sus significados.'],
  ruleta: ['🎯', 'Ruleta de retos', 'Gira la ruleta y resuelve el reto.'],
};

const recomendados = {
  1: ['abecedario', 'constructor'],
  2: ['memoria', 'constructor', 'abecedario'],
  3: ['batalla', 'oraciones', 'trivia'],
  4: ['oraciones', 'batalla', 'detective'],
  5: ['detective', 'batalla', 'trivia'],
  6: ['trivia', 'detective', 'completar'],
  7: ['juicio', 'detective', 'trivia'],
  8: ['completar', 'crucigrama', 'detective'],
  9: ['escape', 'juicio', 'completar'],
};

const juegosAnteriores = new Set(['ninja', 'ahorcado', 'duelo', 'ruleta']);

export default function ArcadeDidactico({ gradoNumero = 1, juegoInicial = null }) {
  const catalogo = recomendados[gradoNumero] || recomendados[1];
  const [seleccion, setSeleccion] = useState(null);
  const [jugando, setJugando] = useState(false);
  useEffect(() => () => voiceReader.stop(), []);
  const solicitado = Object.hasOwn(juegos, juegoInicial) || juegosAnteriores.has(juegoInicial)
    ? juegoInicial
    : catalogo[0];
  const juegoSeleccionado = seleccion || solicitado;

  return (
    <div className="space-y-5">
      {!jugando && <>
        <section className="es-juegos" aria-label="Elegir un juego">
          {catalogo.map((id) => <button key={id} type="button" className="es-juego-elegir" aria-pressed={juegoSeleccionado === id}
            onClick={() => { sounds.playClick(); voiceReader.stop(); setSeleccion(id); }}>
            <span className="es-icono" aria-hidden="true">{juegos[id][0]}</span>
            <strong>{juegos[id][1]}</strong>
            <span>{juegos[id][2]}</span>
          </button>)}
        </section>
        <section className="es-instrucciones" aria-label="Antes de jugar">
          <div>
            <p className="es-contexto">Antes de jugar</p>
            <h2>{juegos[juegoSeleccionado][1]}</h2>
            <p>{juegos[juegoSeleccionado][2]} Sigue las indicaciones que aparecen en el juego.</p>
            <p>Practica a tu ritmo. Si te equivocas, puedes volver a intentarlo.</p>
          </div>
          <div className="es-acciones-instrucciones">
            <button type="button" className="lengua-nav-guia" onClick={() => voiceReader.speak(juegos[juegoSeleccionado][2] + '. Sigue las indicaciones del juego.')}>🔊 Escuchar instrucciones</button>
            <button type="button" className="lengua-nav-guia lengua-nav-guia-primary" onClick={() => { sounds.playClick(); voiceReader.stop(); setJugando(true); }}>Empezar juego →</button>
          </div>
        </section>
      </>}

      {jugando && <>
        <button type="button" className="lengua-nav-guia" onClick={() => { voiceReader.stop(); setJugando(false); }}>← Elegir otro juego</button>
        <div key={juegoSeleccionado} className="lengua-juego-activo animate-fade-in">
          {juegoSeleccionado === 'abecedario' && <AbecedarioSonoro gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'ninja' && <LluviaSilabasNinja gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'juicio' && <JuicioFalacias gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'escape' && <EscapeRoomMacondo gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'batalla' && <BatallaDeRimas gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'trivia' && <TriviaLiteraria gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'ahorcado' && <AhorcadoLiterario gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'duelo' && <DueloVocabulario gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'crucigrama' && <CrucigramaLiterario gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'detective' && <DetectiveGramatical gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'completar' && <CompletarTexto gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'constructor' && <ConstructorPalabras gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'memoria' && <JuegoMemoriaParejas gradoNumero={gradoNumero} tema={gradoNumero >= 6 ? 'figuras' : 'rimas'} />}
          {juegoSeleccionado === 'oraciones' && <OrganizadorOraciones gradoNumero={gradoNumero} />}
          {juegoSeleccionado === 'ruleta' && <RuletaRetos />}
        </div>
      </>}
    </div>
  );
}
