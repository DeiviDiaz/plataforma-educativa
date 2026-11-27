import contenidoPlan from '../../data/contenidoPlan.json';

export default function GeneradorFichas({ guia, gradoNombre }) {
  const tema = contenidoPlan[guia.id];
  if (!tema) return null;
  return <section className="lengua-panel space-y-5">
    <button className="lengua-nav-guia print:hidden" onClick={() => window.print()}>Imprimir ficha</button>
    <header><p>{gradoNombre} · {guia.numero}</p><h2 className="text-xl font-bold">{tema.titulo}</h2></header>
    <p>Nombre: ________________________ Fecha: ______________</p>
    <h3 className="font-bold">Descubre</h3><p>{tema.lectura}</p>
    <h3 className="font-bold">Practica</h3>
    {tema.retos.map(reto => <div key={reto.pregunta}><p>{reto.pregunta}</p><ul className="list-disc pl-5">{reto.opciones.map(opcion => <li key={opcion}>{opcion}</li>)}</ul><p>Explica tu elección: __________________________________</p></div>)}
    <h3 className="font-bold">Crea y comparte</h3><p>{tema.produccion}</p>
    <div className="min-h-40 border border-slate-300 rounded-lg p-3 text-slate-500">Espacio para tu respuesta, esquema o dibujo.</div>
    <p className="text-sm text-slate-500">Adaptación didáctica basada en {tema.fuente.documento}. Tabla {tema.fuente.tabla}, fila {tema.fuente.fila}.</p>
  </section>;
}
