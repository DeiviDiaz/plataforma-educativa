import contenidoPlan from '../data/contenidoPlan.json';
import { retosPorGuia } from '../data/retosPorGuia';

// Conserva los retos específicos anteriores; evita el banco genérico por edad.
export function getRetosTema(id) {
  const tema = contenidoPlan[id];
  if (!tema) return [];
  const anteriores = (retosPorGuia[id] || []).map(([pregunta, respuesta, a, b, pista, icono], index) => {
    const correcta = (Number(id.split('-').at(-1)) + index) % 3;
    const opciones = [a, b];
    opciones.splice(correcta, 0, respuesta);
    // Las ilustraciones complementan el enunciado; su pista textual evita que
    // los ejercicios de completar dependan de ver o interpretar un emoji.
    return { pregunta, opciones, correcta, pista, icono, explicacion: pista,
      contexto: pregunta.startsWith('Completa:') ? pista : undefined };
  });
  return [...anteriores, ...tema.retos];
}
