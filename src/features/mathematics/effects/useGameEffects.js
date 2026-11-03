import { useCallback, useEffect, useRef } from 'react';
import JSConfetti from 'js-confetti';

import { sounds } from './soundEffects.js';

export function useGameEffects() {
  const confettiRef = useRef(null);
  const timersRef = useRef(new Set());

  useEffect(() => {
    confettiRef.current = new JSConfetti();
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      confettiRef.current?.clearCanvas();
      confettiRef.current = null;
    };
  }, []);

  const schedule = useCallback((callback, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
    return timer;
  }, []);

  const celebrate = useCallback(() => {
    sounds.playVictory();
    confettiRef.current?.addConfetti({
      emojis: ['⭐', '🔺', '🟦', '✨'],
      emojiSize: 30,
      confettiNumber: 40,
    });
  }, []);

  return {
    playSelection: sounds.playPop.bind(sounds),
    playReset: sounds.playPop.bind(sounds),
    playError: sounds.playError.bind(sounds),
    celebrate,
    schedule,
  };
}
