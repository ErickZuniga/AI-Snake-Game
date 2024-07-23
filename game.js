import { Snake } from './snake.js';
import { Food } from './food.js';
import { Obstacles } from './obstacles.js';
import { playEatSound, playGameOverSound, playLevelCompleteSound, pauseBackgroundMusic, playBackgroundMusic } from './audio.js';


export class Game {
    constructor(updateUICallback) {
        this.snake = new Snake();
        this.food = new Food();
        this.obstacles = new Obstacles();
        this.updateUI = updateUICallback;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameSpeed = 100;
        this.gameLoop = null;
        this.gameMode = 'original';
        this.isPaused = false;
        this.bindKeyEvents();
    }

    bindKeyEvents() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        if (!this.isPaused) {
            this.snake.changeDirection(event.keyCode);
        }
    }

    start(mode, difficulty) {
        this.resetGameState();
        this.gameMode = mode;
        this.setDifficulty(difficulty);
        if (this.gameMode === 'mission') {
            this.obstacles.generate();
        }
        this.food.generate(this.snake, this.obstacles.list);
        playBackgroundMusic();
        this.bindKeyEvents();
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
    }

    update() {
        this.clearCanvas();
        this.drawBackground();
        this.snake.move();
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
        if (this.gameMode === 'mission') {
            this.obstacles.draw(this.ctx);
        }
        this.checkCollision();
        this.updateUI(this.score);
    }

    checkCollision() {
        if (this.snake.hasCollided(this.obstacles.list)) {
            this.gameOver();
        } else if (this.snake.canEat(this.food)) {
            this.score++;
            playEatSound();
            this.food.generate(this.snake, this.obstacles.list);
            this.snake.grow();
        }

        if ((this.gameMode === 'mission' && this.score >= 10) || 
            (this.gameMode === 'original' && this.snake.isGridFull())) {
            this.levelComplete();
        }
    }

    gameOver() {
        clearInterval(this.gameLoop);
        pauseBackgroundMusic();
        playGameOverSound();
        setTimeout(() => {
            alert('Game Over! Your score: ' + this.score);
            document.getElementById('startMenu').style.display = 'block';
            document.getElementById('gameContainer').style.display = 'none';
            document.getElementById('score').style.display = 'none';
        }, 200);
    }

    levelComplete() {
        clearInterval(this.gameLoop);
        pauseBackgroundMusic();
        playLevelCompleteSound();
        setTimeout(() => {
            alert('You have reached the end of the level. Congratulations!');
            document.getElementById('startMenu').style.display = 'block';
            document.getElementById('gameContainer').style.display = 'none';
            document.getElementById('score').style.display = 'none';
        }, 200);
    }

    resetGameState() {
        this.snake = new Snake();
        this.food = new Food();
        this.obstacles = new Obstacles();
        this.score = 0;
    }

    setDifficulty(difficulty) {
        switch(difficulty) {
            case 'easy':
                this.gameSpeed = 120;
                break;
            case 'medium':
                this.gameSpeed = 100;
                break;
            case 'hard':
                this.gameSpeed = 80;
                break;
        }
    }

    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    pause() {
        clearInterval(this.gameLoop);
        this.isPaused = true;
        document.getElementById('pauseMenu').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
    }

    resume() {
        this.isPaused = false;
        document.getElementById('pauseMenu').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#a8e063');
        gradient.addColorStop(1, '#56ab2f');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}