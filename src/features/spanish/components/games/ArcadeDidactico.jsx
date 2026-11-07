import { useState } from 'react';
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

const juegos = {
  abecedario: ['🔤', 'Letras con voz', 'Escucha y reconoce letras y sílabas.'],
  constructor: ['🧩', 'Arma palabras', 'Une sílabas para construir palabras.'],
  memoria: ['🐾', 'Parejas de rimas', 'Encuentra las palabras que riman.'],
  batalla: ['🎵', 'Rimas y versos', 'Escucha el ritmo y completa la rima.'],
  oraciones: ['🧱', 'Ordena la frase', 'Coloca las palabras en un orden que tenga sentido.'],
  detective: ['🔎', 'Detective de palabras', 'Revisa la ortografía y la gramática en textos breves.'],
  trivia: ['💡', 'Preguntas de literatura', 'Pon a prueba lo que sabes sobre textos y relatos.'],
  completar: ['✏️', 'Completa el pasaje', 'Usa el contexto para recuperar las palabras del texto.'],
  crucigrama: ['▦', 'Crucigrama literario', 'Resuelve pistas sobre literatura y lenguaje.'],
  juicio: ['⚖️', 'Tribunal de argumentos', 'Distingue argumentos válidos de razonamientos engañosos.'],
  escape: ['🦋', 'Escape de Macondo', 'Resuelve enigmas de realismo mágico.'],
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
  const solicitado = Object.hasOwn(juegos, juegoInicial) || juegosAnteriores.has(juegoInicial)
    ? juegoInicial
    : catalogo[0];
  const juegoSeleccionado = seleccion || solicitado;

  return (
    <div className="space-y-5">
      <section className="lengua-panel space-y-3" aria-labelledby="lengua-juegos-recomendados">
        <h2 id="lengua-juegos-recomendados" className="text-xl font-extrabold">Juegos para {gradoNumero}.º</h2>
        <div className="lengua-juegos-grid">
          {catalogo.map((id) => {
            const [icono, nombre, descripcion] = juegos[id];
            return (
              <button key={id} type="button" className="lengua-juego-card" aria-pressed={juegoSeleccionado === id}
                onClick={() => {
                  sounds.playClick();
                  setSeleccion(id);
                }}>
                <span aria-hidden="true">{icono}</span>
                <strong>{nombre}</strong>
                <small>{descripcion}</small>
              </button>
            );
          })}
        </div>
      </section>

      <div key={juegoSeleccionado} className="animate-fade-in">
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
        {juegoSeleccionado === 'memoria' && <JuegoMemoriaParejas tema={gradoNumero >= 6 ? 'figuras' : 'rimas'} />}
        {juegoSeleccionado === 'oraciones' && <OrganizadorOraciones />}
        {juegoSeleccionado === 'ruleta' && <RuletaRetos />}
      </div>
    </div>
  );
}
