import { useCallback, useEffect, useState } from 'react';

import { basicOperationsQuestions } from '../data/basic-operations.js';

const INITIAL_LIVES = 3;
const QUESTION_TIME = 30;

function BasicOperationsGame() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion = basicOperationsQuestions[questionIndex];

  const handleWrongAnswer = useCallback((message) => {
    const nextAttempt = attempts + 1;
    const remainingLives = lives - 1;

    setAttempts(nextAttempt);
    setLives(remainingLives);
    setStreak(0);

    if (remainingLives === 0 || nextAttempt > 2) {
      setFeedback({
        type: 'solution',
        message: `${message} La respuesta correcta es ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`,
      });

      return;
    }

    setFeedback({
      type: 'hint',
      message: `${message} ${currentQuestion.hints[nextAttempt - 1]}`,
    });
  }, [attempts, currentQuestion, lives]);

  useEffect(() => {
    if (gameFinished || feedback?.type === 'success' ||
      feedback?.type === 'solution') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          handleWrongAnswer('Se terminó el tiempo para responder.');
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [feedback, gameFinished, handleWrongAnswer]);

  function handleAnswer(option) {
    if (feedback?.type === 'success' || feedback?.type === 'solution') {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;

    setSelectedOption(option);

    if (isCorrect) {
      const points = [100, 70, 40][attempts] ?? 40;
      const nextStreak = streak + 1;

      setScore((previousScore) => previousScore + points);
      setCorrectAnswers((previousCount) => previousCount + 1);
      setStreak(nextStreak);
      setBestStreak((previousBest) => Math.max(previousBest, nextStreak));
      setFeedback({
        type: 'success',
        message: `¡Muy bien! ${currentQuestion.explanation}`,
      });

      return;
    }

    handleWrongAnswer('Respuesta incorrecta.');
  }

  function handleNextQuestion() {
    if (
      questionIndex === basicOperationsQuestions.length - 1 ||
      lives === 0
    ) {
      setGameFinished(true);
      return;
    }

    setQuestionIndex((previousIndex) => previousIndex + 1);
    setAttempts(0);
    setSelectedOption(null);
    setFeedback(null);
    setTimeLeft(QUESTION_TIME);
  }

  function handleRestart() {
    setQuestionIndex(0);
    setAttempts(0);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setCorrectAnswers(0);
    setLives(INITIAL_LIVES);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(QUESTION_TIME);
    setGameFinished(false);
  }

  if (gameFinished) {
    return (
      <main className="page-container">
        <section className="message-card" aria-labelledby="results-title">
          <p className="page-eyebrow">RONDA COMPLETADA</p>

          <h1 id="results-title">¡Terminaste el juego!</h1>

          <p>
            Respondiste correctamente {correctAnswers} de{' '}
            {basicOperationsQuestions.length} preguntas.
          </p>

          <p>
            Tu puntuación final es de <strong>{score} puntos</strong>.
          </p>

          <p>
            Mejor racha: <strong>{bestStreak}</strong> respuestas.
          </p>

          <button type="button" onClick={handleRestart}>
            Jugar de nuevo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="page-heading">
        <p className="page-eyebrow">MATEMÁTICAS · SEXTO GRADO</p>

        <h1>Desafío de operaciones</h1>

        <p>
          Pregunta {questionIndex + 1} de {basicOperationsQuestions.length}
        </p>

        <p>
          Puntuación: <strong>{score}</strong>
        </p>

        <p>
          Vidas: <strong>{'❤️'.repeat(lives)}</strong>
        </p>

        <p>
          Racha: <strong>{streak}</strong>
        </p>

        <p>
          Tiempo: <strong>{timeLeft} s</strong>
        </p>
      </header>

      <section className="message-card" aria-labelledby="question-title">
        <h2 id="question-title">{currentQuestion.question}</h2>

        <div
          className="grades-grid"
          aria-label="Opciones de respuesta"
        >
          {currentQuestion.options.map((option) => (
            <button
              className="grade-card"
              key={option}
              type="button"
              disabled={
                feedback?.type === 'success' ||
                feedback?.type === 'solution'
              }
              aria-pressed={selectedOption === option}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {feedback && (
            <div>
              <p>
                {feedback.type === 'success'
                  ? '¡Respuesta correcta!'
                  : feedback.type === 'hint'
                    ? `Pista ${attempts} de 2`
                    : 'Veamos cómo resolverlo'}
              </p>

              <p>{feedback.message}</p>
            </div>
          )}
        </div>

        {(feedback?.type === 'success' ||
          feedback?.type === 'solution') && (
          <button type="button" onClick={handleNextQuestion}>
            {questionIndex === basicOperationsQuestions.length - 1
              ? 'Ver resultados'
              : 'Siguiente pregunta'}
          </button>
        )}
      </section>

    </main>
  );
}

export default BasicOperationsGame;
