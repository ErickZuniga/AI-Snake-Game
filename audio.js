let backgroundMusic, eatSound, gameOverSound, levelCompleteSound;

export function initAudio() {
    backgroundMusic = document.getElementById('backgroundMusic');
    eatSound = document.getElementById('eatSound');
    gameOverSound = document.getElementById('gameOverSound');
    levelCompleteSound = document.getElementById('levelCompleteSound');

    // Set initial volume
    setVolume(0.2);
}

export function playBackgroundMusic() {
    backgroundMusic.play();
}

export function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

export function playEatSound() {
    eatSound.play();
}

export function playGameOverSound() {
    gameOverSound.play();
}

export function playLevelCompleteSound() {
    levelCompleteSound.play();
}

export function setVolume(volume) {
    if (backgroundMusic) backgroundMusic.volume = volume;
    if (eatSound) eatSound.volume = volume;
    if (gameOverSound) gameOverSound.volume = volume;
    if (levelCompleteSound) levelCompleteSound.volume = volume;
}

export function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle.checked) {
        playBackgroundMusic();
    } else {
        pauseBackgroundMusic();
    }
}