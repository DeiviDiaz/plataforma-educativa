import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gradesCurriculum } from '../data/grades-data.js';
import { gradeSixMathematics } from '../data/grade-six.js';

// Minijuegos dedicados
import AlgebraScaleGame from '../games/AlgebraScaleGame.jsx';
import PythagorasGame from '../games/PythagorasGame.jsx';
import LinearFunctionGame from '../games/LinearFunctionGame.jsx';
import AlgebraClassifierGame from '../games/AlgebraClassifierGame.jsx';
import NumberLineInequalityGame from '../games/NumberLineInequalityGame.jsx';
import FractionNumberLineGame from '../games/FractionNumberLineGame.jsx';
import FractionPizzaGame from '../games/FractionPizzaGame.jsx';
import DecimalMatchGame from '../games/DecimalMatchGame.jsx';
import ProportionRecipeGame from '../games/ProportionRecipeGame.jsx';
import PercentageTankGame from '../games/PercentageTankGame.jsx';
import VariationSimulatorGame from '../games/VariationSimulatorGame.jsx';
import VolumeConverterGame from '../games/VolumeConverterGame.jsx';
import CapacityDispenserGame from '../games/CapacityDispenserGame.jsx';
import VolumeCapacityLabGame from '../games/VolumeCapacityLabGame.jsx';
import ExponentRootGame from '../games/ExponentRootGame.jsx';
import MonomialDegreeGame from '../games/MonomialDegreeGame.jsx';
import PolynomialOpsGame from '../games/PolynomialOpsGame.jsx';

// Motor Universal y Registro
import UniversalTopicEngine from '../games/UniversalTopicEngine.jsx';
import { TOPIC_GENERATORS } from '../data/topics-game-registry.js';

export default function GameContainerPage() {
  const { gradeId, topicId } = useParams();
  const numericGrade = Number(gradeId);

  const curriculum = numericGrade === 6 ? gradeSixMathematics : gradesCurriculum[numericGrade];

  let currentTopic = null;
  let currentPeriod = null;

  if (curriculum?.periods) {
    for (const period of curriculum.periods) {
      const t = period.topics.find((item) => item.id === topicId);
      if (t) {
        currentTopic = t;
        currentPeriod = period;
        break;
      }
    }
  }

  if (!currentTopic) {
    return (
      <main style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Tema no encontrado</h2>
        <Link to={`/matematicas/grado/${gradeId}`}>← Volver al grado</Link>
      </main>
    );
  }

  const renderGame = () => {
    // -------------------------------------------------------
    // GRADO 7° - Periodo 1: Relaciones y Ecuaciones
    // -------------------------------------------------------
    if (topicId === 'ecuaciones-lineales') return <AlgebraScaleGame />;
    if (topicId === 'variables-incognitas') return <AlgebraClassifierGame />;
    if (topicId === 'conjunto-solucion') return <NumberLineInequalityGame />;

    // -------------------------------------------------------
    // GRADO 7° - Periodo 2: Números Racionales
    // -------------------------------------------------------
    if (topicId === 'racionales-recta') return <FractionNumberLineGame />;
    if (topicId === 'operaciones-racionales') return <FractionPizzaGame />;
    if (topicId === 'decimales-racionales') return <DecimalMatchGame />;

    // -------------------------------------------------------
    // GRADO 7° - Periodo 3: Proporcionalidad y Variación
    // -------------------------------------------------------
    if (topicId === 'razones-proporciones') return <ProportionRecipeGame />;
    if (topicId === 'porcentajes') return <PercentageTankGame />;
    if (topicId === 'proporcionalidad-directa-inversa') return <VariationSimulatorGame />;

    // -------------------------------------------------------
    // GRADO 7° - Periodo 4: Capacidad y Volumen
    // -------------------------------------------------------
    if (topicId === 'unidades-volumen') return <VolumeConverterGame />;
    if (topicId === 'magnitud-capacidad') return <CapacityDispenserGame />;
    if (topicId === 'equivalencias-volumen-capacidad') return <VolumeCapacityLabGame />;

    // -------------------------------------------------------
    // GRADO 8° - Periodo 1: Reales y Polinomios
    // Usamos includes() para atrapar cualquier variante de slug
    // -------------------------------------------------------
    if (topicId.includes('potenciacion') || topicId.includes('radicacion')) {
      return <ExponentRootGame />;
    }

    if (
      topicId.includes('monomio') ||
      topicId.includes('terminos-semejantes') ||
      topicId.includes('grados-semejantes') ||
      topicId.includes('grado-absoluto')
    ) {
      return <MonomialDegreeGame />;
    }

    if (
      topicId.includes('polinomio') ||
      topicId.includes('operaciones-aditivas')
    ) {
      return <PolynomialOpsGame />;
    }

    // -------------------------------------------------------
    // GRADO 8° y 9°
    // -------------------------------------------------------
    if (topicId === 'teorema-pitagoras') return <PythagorasGame />;
    if (topicId === 'funcion-lineal-afin') return <LinearFunctionGame />;

    // Fallback con motor procedural para los demás temas del plan
    const generatorFn = TOPIC_GENERATORS[topicId];
    if (generatorFn) {
      return <UniversalTopicEngine generatorFn={generatorFn} topicTitle={currentTopic.title} />;
    }

    // Fallback en caso de tema no registrado
    return (
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px' }}>
        <p style={{ fontSize: '1.1rem', color: '#475569' }}>
          El minijuego para <strong>{currentTopic.title}</strong> está en preparación.
        </p>
      </div>
    );
  };

  return (
    <main style={{ minHeight: '90vh', padding: '24px 16px', backgroundColor: '#f8fafc' }}>
      <header style={{ maxWidth: '640px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to={`/matematicas/grado/${gradeId}/periodo/${currentPeriod.id}`}
          style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Volver a Temas
        </Link>
        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>
          Grado {gradeId}° • Periodo {currentPeriod.id}
        </span>
      </header>

      {renderGame()}
    </main>
  );
}