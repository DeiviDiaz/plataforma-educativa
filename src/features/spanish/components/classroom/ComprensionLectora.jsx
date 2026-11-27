import { useState } from 'react';
import { sounds } from '../../utils/audio';

export default function ComprensionLectora({ lecturaTitulo = "Lectura de Clase", preguntas = null, gradoNumero = 1 }) {
  const [nivelActivo, setNivelActivo] = useState('literal'); // 'literal' | 'inferencial' | 'critico'
  const [conclusionesSalón, setConclusionesSalón] = useState('');

  const preguntasDefault = {
    literal: [
      {
        id: 'lit-1',
        pregunta: '¿Quiénes son los personajes principales del relato y en qué lugar se desarrolla la historia?',
        guiaRespuesta: 'Identificar a los personajes nombrados y el entorno geográfico rural.'
      },
      {
        id: 'lit-2',
        pregunta: '¿Cuál fue el primer obstáculo o situación inesperada que se presentó al inicio?',
        guiaRespuesta: 'Describir el acontecimiento inicial que alteró la tranquilidad del relato.'
      },
      {
        id: 'lit-3',
        pregunta: '¿Qué acciones específicas realizaron los protagonistas para resolver la dificultad?',
        guiaRespuesta: 'Enumerar los pasos o decisiones tomadas por los personajes.'
      }
    ],
    inferencial: [
      {
        id: 'inf-1',
        pregunta: '¿Qué motivos internos o sentimientos impulsaron a los personajes a actuar de esa manera?',
        guiaRespuesta: 'Deducir emociones no explícitas (miedo, generosidad, valentía, apego a la tierra).'
      },
      {
        id: 'inf-2',
        pregunta: '¿Qué creen que habría ocurrido en la vereda si nadie hubiera tomado la iniciativa de actuar?',
        guiaRespuesta: 'Imaginar un desenlace alternativo de consecuencias comunitarias o ambientales.'
      },
      {
        id: 'inf-3',
        pregunta: '¿Qué simbolizan los elementos de la naturaleza (el río, la montaña, el árbol) en este texto?',
        guiaRespuesta: 'Conectar el elemento natural con valores de vida, memoria y sustento.'
      }
    ],
    critico: [
      {
        id: 'cri-1',
        pregunta: '¿Están de acuerdo con la decisión final que tomaron los personajes? ¿Qué habrían hecho ustedes?',
        guiaRespuesta: 'Construir una opinión ética argumentada desde la experiencia del estudiante.'
      },
      {
        id: 'cri-2',
        pregunta: '¿Cómo se relaciona el mensaje de esta historia con la vida cotidiana y el cuidado de nuestra propia vereda?',
        guiaRespuesta: 'Vincular la lectura con la realidad de su escuela, su familia y sus fuentes de agua.'
      },
      {
        id: 'cri-3',
        pregunta: '¿Qué propuesta le harían a los líderes de la comunidad para aplicar la enseñanza de este texto?',
        guiaRespuesta: 'Plantear una acción ciudadana transformadora y colaborativa.'
      }
    ]
  };

  const listaActual = preguntas ? preguntas[nivelActivo] || preguntasDefault[nivelActivo] : preguntasDefault[nivelActivo];

  const niveles = [
    ['literal', gradoNumero <= 5 ? 'Recuerda' : 'Recuerda · Literal'],
    ['inferencial', gradoNumero <= 5 ? 'Piensa' : 'Deduce · Inferencial'],
    ['critico', gradoNumero <= 5 ? 'Opina' : 'Opina · Crítico'],
  ];

  return (
    <section className="lengua-panel space-y-4" aria-label="Preguntas del texto">
      <header>
        <h3 className="text-lg font-bold">{gradoNumero <= 2 ? 'Hablemos del texto' : 'Comprueba lo que entendiste'}</h3>
        <p className="text-sm text-slate-600">Responde en voz alta o en tu cuaderno{gradoNumero <= 2 ? ', con ayuda de tu docente.' : '.'}</p>
      </header>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Tipos de preguntas">
        {niveles.map(([id, nombre]) => <button key={id} type="button" className="lengua-pestana"
          aria-pressed={nivelActivo === id} onClick={() => { sounds.playClick(); setNivelActivo(id); }}>{nombre}</button>)}
      </div>
      <p className="text-sm text-slate-600">{nivelActivo === 'literal' ? 'Busca las respuestas en el texto.' : nivelActivo === 'inferencial' ? 'Usa las pistas del texto para explicar tus ideas.' : 'Cuenta qué piensas y explica por qué.'}</p>
      <div className="space-y-3">
        {listaActual.map((item, index) => (
          <details key={nivelActivo + item.id} className="lengua-pregunta" open={index === 0}>
            <summary className="lengua-summary">Pregunta {index + 1}</summary>
            <p className="mt-3 font-semibold">{item.pregunta}</p>
            <details className="mt-3 text-sm text-slate-600">
              <summary className="cursor-pointer">Orientación para el docente</summary>
              <p className="mt-2">{item.guiaRespuesta}</p>
            </details>
          </details>
        ))}
      </div>
      <details className="lengua-pregunta">
        <summary className="lengua-summary">Notas de la clase</summary>
        <label htmlFor="lengua-conclusiones" className="block mt-3 text-sm">Ideas sobre {lecturaTitulo}</label>
        <textarea id="lengua-conclusiones" value={conclusionesSalón} onChange={(e) => setConclusionesSalón(e.target.value)}
          placeholder="Escribe las ideas que compartieron en clase." rows={3} className="lengua-select mt-2" />
        <button type="button" className="lengua-nav-guia mt-2" onClick={() => setConclusionesSalón('')}>Borrar notas</button>
      </details>
    </section>
  );
}
