export class Food {
    constructor() {
        this.x = 15;
        this.y = 15;
        this.gridSize = 20;
    }

    setGridSize(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
    }

    draw(ctx) {
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
    }

    generate(snake, obstacles) {
        let validPosition = false;
        const tileCount = 20; // Assuming a 20x20 grid

        while (!validPosition) {
            this.x = Math.floor(Math.random() * tileCount);
            this.y = Math.floor(Math.random() * tileCount);

            // Check if the food position overlaps with any part of the snake
            validPosition = !snake.body.some(segment => segment.x === this.x && segment.y === this.y);

            // Check if the food position overlaps with any obstacle
            if (validPosition && obstacles) {
                validPosition = !obstacles.some(obstacle => obstacle.x === this.x && obstacle.y === this.y);
            }
        }
    }
}