import { startGame, togglePause, resumeGame, exitToTitle } from './main.js';
import { setVolume, toggleMusic } from './audio.js';

let currentSelection = 0;
const menuItems = ['classicModeButton', 'missionModeButton', 'speedSelect'];

export function initUI() {
    document.getElementById('classicModeButton').onclick = () => {
        console.log('Classic Mode button clicked');
        startGame('classic', document.getElementById('speedSelect').value);
    };
    document.getElementById('missionModeButton').onclick = () => {
        console.log('Mission Mode button clicked');
        startGame('mission', document.getElementById('speedSelect').value);
    };
    document.getElementById('pauseButton').onclick = togglePause;
    document.getElementById('musicToggle').onchange = toggleMusic;
    document.getElementById('volumeControl').onchange = (e) => setVolume(e.target.value);
    document.getElementById('exitButton').onclick = exitToTitle;

    document.addEventListener('keydown', handleKeyPress);
    updateMenuSelection();
}

export function updateUI(score) {
    document.getElementById('score').textContent = 'Score: ' + score;
}

function handleKeyPress(event) {
    if (document.getElementById('startMenu').style.display !== 'none') {
        const speedSelect = document.getElementById('speedSelect');
        
        if (document.activeElement === speedSelect) {
            if (event.key === 'Enter' || event.key === 'Escape') {
                speedSelect.blur();
                updateMenuSelection();
            }
            return;
        }

        switch(event.key) {
            case 'ArrowUp':
                currentSelection = (currentSelection - 1 + menuItems.length) % menuItems.length;
                updateMenuSelection();
                break;
            case 'ArrowDown':
                currentSelection = (currentSelection + 1) % menuItems.length;
                updateMenuSelection();
                break;
            case 'Enter':
                if (currentSelection === 0) {
                    startGame('original', speedSelect.value);
                } else if (currentSelection === 1) {
                    startGame('mission', speedSelect.value);
                } else if (currentSelection === 2) {
                    speedSelect.focus();
                }
                break;
        }
    }
}

function updateMenuSelection() {
    menuItems.forEach((item, index) => {
        const element = document.getElementById(item);
        if (index === currentSelection) {
            element.style.border = '2px solid white';
        } else {
            element.style.border = 'none';
        }
    });
}

export function showStartMenu() {
    document.getElementById('startMenu').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

export function showGameContainer() {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('score').style.display = 'block';
}

export function showPauseMenu() {
    document.getElementById('pauseMenu').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
}

export function hidePauseMenu() {
    document.getElementById('pauseMenu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
}

export function updateCurrentModeDisplay(mode) {
    document.getElementById('currentModeDisplay').innerText = `Current Mode: ${mode}`;
}