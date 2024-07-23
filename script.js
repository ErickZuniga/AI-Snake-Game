const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startMenu = document.getElementById('startMenu');
const gameContainer = document.getElementById('gameContainer');
const eatSound = document.getElementById('eatSound');
const gameOverSound = document.getElementById('gameOverSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const volumeControl = document.getElementById('volumeControl');
const levelCompleteSound = document.getElementById('levelCompleteSound');
const menuItems = ['originalModeButton', 'missionModeButton', 'difficultySelect'];

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let gameSpeed;
let gameLoop;
let gameMode = 'original'; // Default to "Original" mode
let obstacles = [];
let isPaused = false;
let lastDirection = { dx: 0, dy: 0 };
let directionQueue = [];
let currentDirection = { dx: 0, dy: 0 };
let currentSelection = 0;

document.addEventListener('keydown', changeDirection);

function startGame(mode, difficulty) {
    resetGameState();
    gameMode = mode; 
    startMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    scoreElement.style.display = 'block';

    // Set game speed based on difficulty
    switch(difficulty) {
        case 'easy':
            gameSpeed = 120;
            break;
        case 'medium':
            gameSpeed = 100;
            break;
        case 'hard':
            gameSpeed = 80;
            break;
    }

    resetGame();
    if (gameMode === 'mission') {
        generateObstacles();
    }

    // Set the initial volume and update the volume control slider
    backgroundMusic.volume = 0.1;
    document.getElementById('volumeControl').value = backgroundMusic.volume;

    // Display the current game mode
    document.getElementById('currentModeDisplay').innerText = `Current Mode: ${gameMode}`;

    // Check the state of the music toggle
    if (document.getElementById('musicToggle').checked) {
        backgroundMusic.play();
    }

    gameLoop = setInterval(drawGame, gameSpeed);
}

function togglePause() {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    clearInterval(gameLoop);
    isPaused = true;
    document.getElementById('pauseMenu').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
}

function resumeGame() {
    isPaused = false;
    document.getElementById('pauseMenu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    gameLoop = setInterval(drawGame, gameSpeed);
}

function setVolume(volume) {
    backgroundMusic.volume = volume; // Set the volume of the background music
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    generateFood();
    dx = 0;
    dy = 0;
    score = 0;
    updateScore();
}

function resetGameState() {
    // Reset snake
    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200}
    ];
    dx = 10;
    dy = 0;

    // Reset food
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10
    };

    // Reset score
    score = 0;

    // Clear obstacles
    obstacles = [];

    // Reset any other game-specific variables
    // For example:
    // gameSpeed = initialGameSpeed;
    // level = 1;
    // etc.
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    let newDirection;

    if (keyPressed === LEFT_KEY) {
        newDirection = { dx: -1, dy: 0 };
    } else if (keyPressed === UP_KEY) {
        newDirection = { dx: 0, dy: -1 };
    } else if (keyPressed === RIGHT_KEY) {
        newDirection = { dx: 1, dy: 0 };
    } else if (keyPressed === DOWN_KEY) {
        newDirection = { dx: 0, dy: 1 };
    } else {
        return; // Invalid key pressed
    }

    // Only add to queue if it's different from the last queued direction
    if (directionQueue.length === 0 || 
        (newDirection.dx !== directionQueue[directionQueue.length - 1].dx || 
         newDirection.dy !== directionQueue[directionQueue.length - 1].dy)) {
        directionQueue.push(newDirection);
    }
}

function updateDirection() {
    if (directionQueue.length > 0) {
        const newDirection = directionQueue[0];
        
        // Check if the new direction is valid (not opposite to current direction)
        if ((newDirection.dx !== -currentDirection.dx || newDirection.dx === 0) &&
            (newDirection.dy !== -currentDirection.dy || newDirection.dy === 0)) {
            currentDirection = newDirection;
            dx = currentDirection.dx;
            dy = currentDirection.dy;
        }
        
        directionQueue.shift(); // Remove the processed direction
    }
}

function drawGame() {
    clearCanvas();
    drawBackground();
    updateDirection();
    moveSnake();
    drawFood();
    drawSnake();
    if (gameMode === 'mission') {
        drawObstacles();
    }
    checkCollision();
    updateScore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a8e063'); // Light green
    gradient.addColorStop(1, '#56ab2f'); // Dark green

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        eatSound.play();
        generateFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    // Draw hamster body
    ctx.fillStyle = 'burlywood';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * gridSize, (food.y + 0.5) * gridSize, gridSize / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw ears
    ctx.fillStyle = 'peru';
    ctx.beginPath();
    ctx.arc((food.x + 0.3) * gridSize, (food.y + 0.3) * gridSize, gridSize / 5, 0, 2 * Math.PI);
    ctx.arc((food.x + 0.7) * gridSize, (food.y + 0.3) * gridSize, gridSize / 5, 0, 2 * Math.PI);
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc((food.x + 0.35) * gridSize, (food.y + 0.5) * gridSize, gridSize / 10, 0, 2 * Math.PI);
    ctx.arc((food.x + 0.65) * gridSize, (food.y + 0.5) * gridSize, gridSize / 10, 0, 2 * Math.PI);
    ctx.fill();

    // Draw nose
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * gridSize, (food.y + 0.6) * gridSize, gridSize / 10, 0, 2 * Math.PI);
    ctx.fill();
}

function generateObstacles() {
    obstacles = []; // Clear previous obstacles
    let obstacleCount = 5; // Number of obstacles
    for (let i = 0; i < obstacleCount; i++) {
        let obstacle;
        do {
            obstacle = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount),
                color: Math.random() > 0.5 ? '#8B4513' : '#808080' // Brown or gray
            };
        } while (snake.some(segment => segment.x === obstacle.x && segment.y === obstacle.y) ||
                 (food.x === obstacle.x && food.y === obstacle.y));
        obstacles.push(obstacle);
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.beginPath();
        ctx.arc(obstacle.x * gridSize + gridSize / 2, obstacle.y * gridSize + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = obstacle.color; // Use the stored color
        ctx.fill();
        ctx.stroke();
    });
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            drawSnakeHead(segment);
        } else if (index === snake.length - 1) {
            const prevSegment = snake[index - 1];
            drawSnakeTail(segment, prevSegment);
        } else {
            drawSnakeBody(segment);
        }
    });
}

function drawSnakeHead(segment) {
    const x = segment.x * gridSize;
    const y = segment.y * gridSize;
    const radius = gridSize / 2;

    // Determine the direction
    const isMovingRight = dx === 1;
    const isMovingLeft = dx === -1;
    const isMovingDown = dy === 1 || (dx === 0 && dy === 0); // Default to down when not moving
    const isMovingUp = dy === -1;

    ctx.fillStyle = 'forestgreen';
    ctx.beginPath();

    if (isMovingRight || isMovingLeft) {
        ctx.ellipse(x + radius, y + radius, radius * 1.2, radius, 0, 0, Math.PI * 2);
    } else {
        ctx.ellipse(x + radius, y + radius, radius, radius * 1.2, 0, 0, Math.PI * 2);
    }
    ctx.fill();

    // Draw tongue
    ctx.fillStyle = 'red';
    ctx.beginPath();
    if (isMovingRight) {
        ctx.moveTo(x + gridSize * 1.2, y + radius);
        ctx.lineTo(x + gridSize * 1.4, y + radius - gridSize * 0.1);
        ctx.lineTo(x + gridSize * 1.4, y + radius + gridSize * 0.1);
    } else if (isMovingLeft) {
        ctx.moveTo(x - gridSize * 0.2, y + radius);
        ctx.lineTo(x - gridSize * 0.4, y + radius - gridSize * 0.1);
        ctx.lineTo(x - gridSize * 0.4, y + radius + gridSize * 0.1);
    } else if (isMovingDown) {
        ctx.moveTo(x + radius, y + gridSize * 1.2);
        ctx.lineTo(x + radius - gridSize * 0.1, y + gridSize * 1.4);
        ctx.lineTo(x + radius + gridSize * 0.1, y + gridSize * 1.4);
    } else if (isMovingUp) {
        ctx.moveTo(x + radius, y - gridSize * 0.2);
        ctx.lineTo(x + radius - gridSize * 0.1, y - gridSize * 0.4);
        ctx.lineTo(x + radius + gridSize * 0.1, y - gridSize * 0.4);
    }
    ctx.closePath();
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = 'white';
    if (isMovingRight) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.75, y + gridSize * 0.3, radius * 0.25, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.75, y + gridSize * 0.7, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingLeft) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.25, y + gridSize * 0.3, radius * 0.25, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.25, y + gridSize * 0.7, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingDown) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.3, y + gridSize * 0.75, radius * 0.25, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.7, y + gridSize * 0.75, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingUp) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.3, y + gridSize * 0.25, radius * 0.25, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.7, y + gridSize * 0.25, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw pupils
    ctx.fillStyle = 'black';
    if (isMovingRight) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.85, y + gridSize * 0.3, radius * 0.15, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.85, y + gridSize * 0.7, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingLeft) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.15, y + gridSize * 0.3, radius * 0.15, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.15, y + gridSize * 0.7, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingDown) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.3, y + gridSize * 0.85, radius * 0.15, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.7, y + gridSize * 0.85, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
    } else if (isMovingUp) {
        ctx.beginPath();
        ctx.arc(x + gridSize * 0.3, y + gridSize * 0.15, radius * 0.15, 0, Math.PI * 2);
        ctx.arc(x + gridSize * 0.7, y + gridSize * 0.15, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawSnakeBody(segment) {
    const x = segment.x * gridSize;
    const y = segment.y * gridSize;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(x, y, x + gridSize, y + gridSize);
    gradient.addColorStop(0, 'limegreen');
    gradient.addColorStop(1, 'forestgreen');
    
    // Draw rounded rectangle for body segment
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, gridSize, gridSize, gridSize / 5);
    ctx.fill();
    
    // Add scale pattern
    ctx.fillStyle = 'rgba(0, 100, 0, 0.3)';  // Dark green with some transparency
    ctx.beginPath();
    ctx.arc(x + gridSize / 2, y + gridSize / 2, gridSize / 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawSnakeTail(segment, prevSegment) {
    ctx.fillStyle = 'green';
    ctx.beginPath();

    const dx = prevSegment.x - segment.x;
    const dy = prevSegment.y - segment.y;

    // Adjust for wrap-around
    const adjustedDx = dx === 19 ? -1 : (dx === -19 ? 1 : dx);
    const adjustedDy = dy === 19 ? -1 : (dy === -19 ? 1 : dy);

    if (adjustedDx === -1) {
        // Tail pointing left (snake moving right)
        ctx.moveTo(segment.x * gridSize, segment.y * gridSize);
        ctx.lineTo(segment.x * gridSize, (segment.y + 1) * gridSize);
        ctx.lineTo((segment.x + 0.5) * gridSize, (segment.y + 0.5) * gridSize);
    } else if (adjustedDx === 1) {
        // Tail pointing right (snake moving left)
        ctx.moveTo((segment.x + 1) * gridSize, segment.y * gridSize);
        ctx.lineTo((segment.x + 1) * gridSize, (segment.y + 1) * gridSize);
        ctx.lineTo((segment.x + 0.5) * gridSize, (segment.y + 0.5) * gridSize);
    } else if (adjustedDy === -1) {
        // Tail pointing up (snake moving down)
        ctx.moveTo(segment.x * gridSize, segment.y * gridSize);
        ctx.lineTo((segment.x + 1) * gridSize, segment.y * gridSize);
        ctx.lineTo((segment.x + 0.5) * gridSize, (segment.y + 0.5) * gridSize);
    } else {
        // Tail pointing down (snake moving up)
        ctx.moveTo(segment.x * gridSize, (segment.y + 1) * gridSize);
        ctx.lineTo((segment.x + 1) * gridSize, (segment.y + 1) * gridSize);
        ctx.lineTo((segment.x + 0.5) * gridSize, (segment.y + 0.5) * gridSize);
    }

    ctx.closePath();
    ctx.fill();
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    obstacles.forEach(obstacle => {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            gameOver();
            return;
        }
    });
    if (gameMode === 'mission' && score >= 10) {
        levelComplete();
    } else if (gameMode === 'original' && isGridFull()) {
        levelComplete();
    }
}

function levelComplete() {
    clearInterval(gameLoop);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    levelCompleteSound.play();

    setTimeout(() => {
        alert('You have reached the end of the level. Congratulations!');

        startMenu.style.display = 'block';
        gameContainer.style.display = 'none';
        scoreElement.style.display = 'none';
    }, 200);
}

function gameOver() {
    clearInterval(gameLoop);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameOverSound.play();
    setTimeout(() => {
        alert('Game Over! Your score: ' + score);
        startMenu.style.display = 'block';
        gameContainer.style.display = 'none';
        scoreElement.style.display = 'none';
    }, 200);
}

function isGridFull() {
    return snake.length === tileCount * tileCount;
}

function generateFood() {
    let validPosition = false;

    while (!validPosition) {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);

        // Check if the food position overlaps with any part of the snake
        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);

        // In mission mode, also check if the food position overlaps with any obstacle
        if (gameMode === 'mission' && validPosition) {
            validPosition = !obstacles.some(obstacle => obstacle.x === food.x && obstacle.y === food.y);
        }
    }
}

function updateScore() {
    scoreElement.textContent = 'Score: ' + score;
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle.checked) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

function adjustVolume() {
    backgroundMusic.volume = volumeControl.value;
}

// Initially hide the game canvas and score
gameContainer.style.display = 'none';
scoreElement.style.display = 'none';

// Set initial volume
backgroundMusic.volume = volumeControl.value;

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

document.addEventListener('keydown', function(event) {
    if (startMenu.style.display !== 'none') {
        const difficultySelect = document.getElementById('difficultySelect');
        
        if (document.activeElement === difficultySelect) {
            if (event.key === 'Enter' || event.key === 'Escape') {
                difficultySelect.blur();
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
                    startGame('original', difficultySelect.value);
                } else if (currentSelection === 1) {
                    startGame('mission', difficultySelect.value);
                } else if (currentSelection === 2) {
                    difficultySelect.focus();
                }
                break;
        }
    }
});

// Initialize menu selection
updateMenuSelection();