import { Game } from './game.js';
import { initUI, updateUI, showGameContainer, showStartMenu } from './ui.js';
import { initAudio, playBackgroundMusic, pauseBackgroundMusic } from './audio.js';

let game = new Game();

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initAudio();
});

export function startGame(mode, speed) {
    const size = document.getElementById('sizeSelect').value;
    console.log(`Starting game: mode = ${mode}, speed = ${speed}, size = ${size}`);
    game = new Game(updateUI);
    game.start(mode, speed, size);
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

export function exitToTitle() {
    console.log('Exiting to title menu');
    showStartMenu();
    pauseBackgroundMusic();
    if (game) {
        clearInterval(game.gameLoop);
        game = null;
    }
    document.getElementById('pauseMenu').style.display = 'none'; // Hide the pause menu
}

// Expose resumeGame to the global window object
window.resumeGame = resumeGame;