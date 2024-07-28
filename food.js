export class Food {
    constructor() {
        this.x = 15;
        this.y = 15;
        this.gridSize = 20;
        this.tileCount = 20;
        this.types = ['hamster', 'bird', 'apple', 'frog'];
        this.currentType = 'hamster';
    }

    setGridSize(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
    }

    draw(ctx) {
        switch (this.currentType) {
            case 'hamster':
                this.drawHamster(ctx);
                break;
            case 'bird':
                this.drawBird(ctx);
                break;
            case 'apple':
                this.drawApple(ctx);
                break;
            case 'frog':
                this.drawFrog(ctx);
                break;
        }
    }

    drawHamster(ctx) {
        // Draw hamster body
        ctx.fillStyle = 'burlywood';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw ears
        ctx.fillStyle = 'peru';
        ctx.beginPath();
        ctx.arc((this.x + 0.3) * this.gridSize, (this.y + 0.3) * this.gridSize, this.gridSize / 5, 0, 2 * Math.PI);
        ctx.arc((this.x + 0.7) * this.gridSize, (this.y + 0.3) * this.gridSize, this.gridSize / 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc((this.x + 0.35) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.arc((this.x + 0.65) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.fill();

        // Draw nose
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.6) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.fill();

        // Draw whiskers
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((this.x + 0.2) * this.gridSize, (this.y + 0.6) * this.gridSize);
        ctx.lineTo((this.x + 0.1) * this.gridSize, (this.y + 0.6) * this.gridSize);
        ctx.moveTo((this.x + 0.8) * this.gridSize, (this.y + 0.6) * this.gridSize);
        ctx.lineTo((this.x + 0.9) * this.gridSize, (this.y + 0.6) * this.gridSize);
        ctx.stroke();
    }

    drawBird(ctx) {
        // Draw bird body
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw wings
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.moveTo((this.x + 0.2) * this.gridSize, (this.y + 0.5) * this.gridSize);
        ctx.lineTo((this.x + 0.1) * this.gridSize, (this.y + 0.3) * this.gridSize);
        ctx.lineTo((this.x + 0.1) * this.gridSize, (this.y + 0.7) * this.gridSize);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((this.x + 0.8) * this.gridSize, (this.y + 0.5) * this.gridSize);
        ctx.lineTo((this.x + 0.9) * this.gridSize, (this.y + 0.3) * this.gridSize);
        ctx.lineTo((this.x + 0.9) * this.gridSize, (this.y + 0.7) * this.gridSize);
        ctx.closePath();
        ctx.fill();

        // Draw beak
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.moveTo((this.x + 0.5) * this.gridSize, (this.y + 0.5) * this.gridSize);
        ctx.lineTo((this.x + 0.7) * this.gridSize, (this.y + 0.4) * this.gridSize);
        ctx.lineTo((this.x + 0.7) * this.gridSize, (this.y + 0.6) * this.gridSize);
        ctx.closePath();
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc((this.x + 0.35) * this.gridSize, (this.y + 0.4) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.arc((this.x + 0.35) * this.gridSize, (this.y + 0.6) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawApple(ctx) {
        // Draw apple body
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw stem
        ctx.fillStyle = 'brown';
        ctx.beginPath();
        ctx.rect((this.x + 0.45) * this.gridSize, (this.y + 0.2) * this.gridSize, this.gridSize / 10, this.gridSize / 5);
        ctx.fill();

        // Draw leaf
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo((this.x + 0.5) * this.gridSize, (this.y + 0.2) * this.gridSize);
        ctx.lineTo((this.x + 0.6) * this.gridSize, (this.y + 0.1) * this.gridSize);
        ctx.lineTo((this.x + 0.7) * this.gridSize, (this.y + 0.2) * this.gridSize);
        ctx.closePath();
        ctx.fill();
    }

    drawFrog(ctx) {
        // Draw frog body
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.5) * this.gridSize, this.gridSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc((this.x + 0.35) * this.gridSize, (this.y + 0.35) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.arc((this.x + 0.65) * this.gridSize, (this.y + 0.35) * this.gridSize, this.gridSize / 10, 0, 2 * Math.PI);
        ctx.fill();

        // Draw pupils
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc((this.x + 0.35) * this.gridSize, (this.y + 0.35) * this.gridSize, this.gridSize / 20, 0, 2 * Math.PI);
        ctx.arc((this.x + 0.65) * this.gridSize, (this.y + 0.35) * this.gridSize, this.gridSize / 20, 0, 2 * Math.PI);
        ctx.fill();

        // Draw mouth
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * this.gridSize, (this.y + 0.6) * this.gridSize, this.gridSize / 10, 0, Math.PI);
        ctx.fill();
    }

    generate(snake, obstacles) {
        let validPosition = false;

        while (!validPosition) {
            this.x = Math.floor(Math.random() * this.tileCount);
            this.y = Math.floor(Math.random() * this.tileCount);

            // Check if the food position overlaps with any part of the snake
            validPosition = !snake.body.some(segment => segment.x === this.x && segment.y === this.y);

            // Check if the food position overlaps with any obstacle
            if (validPosition && obstacles) {
                validPosition = !obstacles.some(obstacle => obstacle.x === this.x && obstacle.y === this.y);
            }
        }

        // Randomly select a food type
        this.currentType = this.types[Math.floor(Math.random() * this.types.length)];
    }
}