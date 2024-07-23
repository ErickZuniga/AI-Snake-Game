import { Game } from './game.js';
import { initUI, updateUI, showGameContainer, showStartMenu } from './ui.js';
import { initAudio, playBackgroundMusic } from './audio.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initAudio();
});

export function startGame(mode, difficulty) {
    console.log(`Starting game: mode = ${mode}, difficulty = ${difficulty}`);
    game = new Game(updateUI);
    game.start(mode, difficulty);
    document.getElementById('currentModeDisplay').textContent = `Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`; // Update the display
    showGameContainer();
    playBackgroundMusic();
}

export function togglePause() {
    if (game) {
        game.togglePause();
    }
}

export function resumeGame() {
    if (game) {
        game.resume();
    }
}