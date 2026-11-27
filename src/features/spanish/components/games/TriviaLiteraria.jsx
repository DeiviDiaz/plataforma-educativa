import RondasJuego from './RondasJuego';
import { preguntasPorGrado } from '../../data/preguntasPorGrado';

export default function TriviaLiteraria({ gradoNumero = 1 }) {
  return <RondasJuego insignia="trivia_oro" titulo="Preguntas de Español" retos={preguntasPorGrado[gradoNumero] || preguntasPorGrado[1]} gradoNumero={gradoNumero} />;
}
