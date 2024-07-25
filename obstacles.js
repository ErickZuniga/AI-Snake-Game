export class Obstacles {
    constructor() {
        this.list = [];
        this.gridSize = 20;
        this.tileCount = 20;
    }

    setGridSize(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
    }

    generate() {
        this.list = []; // Clear previous obstacles
        let obstacleCount = 5; // Number of obstacles
        for (let i = 0; i < obstacleCount; i++) {
            let obstacle;
            do {
                obstacle = {
                    x: Math.floor(Math.random() * this.tileCount),
                    y: Math.floor(Math.random() * this.tileCount),
                    color: Math.random() > 0.5 ? '#8B4513' : '#808080' // Brown or gray
                };
            } while (this.list.some(existingObstacle => 
                existingObstacle.x === obstacle.x && existingObstacle.y === obstacle.y));
            this.list.push(obstacle);
        }
    }

    draw(ctx) {
        this.list.forEach(obstacle => {
            ctx.beginPath();
            ctx.arc(
                obstacle.x * this.gridSize + this.gridSize / 2, 
                obstacle.y * this.gridSize + this.gridSize / 2, 
                this.gridSize / 2, 
                0, 
                2 * Math.PI
            );
            ctx.fillStyle = obstacle.color;
            ctx.fill();
            ctx.stroke();
        });
    }
}