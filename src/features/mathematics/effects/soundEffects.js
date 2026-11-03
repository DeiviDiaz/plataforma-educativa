class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (this.ctx || typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();
  }

  playTone({ type, frequency, endFrequency, duration, volume }) {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    const startTime = this.ctx.currentTime;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(this.ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  playPop() {
    this.playTone({
      type: 'sine',
      frequency: 400,
      endFrequency: 800,
      duration: 0.08,
      volume: 0.15,
    });
  }

  playError() {
    this.playTone({
      type: 'triangle',
      frequency: 180,
      endFrequency: 110,
      duration: 0.2,
      volume: 0.2,
    });
  }

  playVictory() {
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((frequency, index) => {
      const startTime = this.ctx.currentTime + index * 0.1;
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      oscillator.connect(gain);
      gain.connect(this.ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  }
}

export const sounds = new SoundManager();
