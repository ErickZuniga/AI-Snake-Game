export class Snake {
    constructor() {
        this.body = [{x: 10, y: 10}];
        this.direction = { dx: 0, dy: 0 };
        this.directionQueue = [];
        this.gridSize = 20;
        this.tileCount = 20;
    }

    move() {
        this.updateDirection();
        const head = {
            x: (this.body[0].x + this.direction.dx + this.tileCount) % this.tileCount,
            y: (this.body[0].y + this.direction.dy + this.tileCount) % this.tileCount
        };
        this.body.unshift(head);
        this.body.pop();
    }

    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({...tail});
    }

    draw(ctx) {
        this.body.forEach((segment, index) => {
            if (index === 0) this.drawHead(ctx, segment);
            else if (index === this.body.length - 1) this.drawTail(ctx, segment, this.body[index - 1]);
            else this.drawBody(ctx, segment);
        });
    }

    drawHead(ctx, segment) {
        const x = segment.x * this.gridSize;
        const y = segment.y * this.gridSize;
        const radius = this.gridSize / 2;

        const isMovingRight = this.direction.dx === 1;
        const isMovingLeft = this.direction.dx === -1;
        const isMovingDown = this.direction.dy === 1 || (this.direction.dx === 0 && this.direction.dy === 0);
        const isMovingUp = this.direction.dy === -1;

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
            ctx.moveTo(x + this.gridSize * 1.2, y + radius);
            ctx.lineTo(x + this.gridSize * 1.4, y + radius - this.gridSize * 0.1);
            ctx.lineTo(x + this.gridSize * 1.4, y + radius + this.gridSize * 0.1);
        } else if (isMovingLeft) {
            ctx.moveTo(x - this.gridSize * 0.2, y + radius);
            ctx.lineTo(x - this.gridSize * 0.4, y + radius - this.gridSize * 0.1);
            ctx.lineTo(x - this.gridSize * 0.4, y + radius + this.gridSize * 0.1);
        } else if (isMovingDown) {
            ctx.moveTo(x + radius, y + this.gridSize * 1.2);
            ctx.lineTo(x + radius - this.gridSize * 0.1, y + this.gridSize * 1.4);
            ctx.lineTo(x + radius + this.gridSize * 0.1, y + this.gridSize * 1.4);
        } else if (isMovingUp) {
            ctx.moveTo(x + radius, y - this.gridSize * 0.2);
            ctx.lineTo(x + radius - this.gridSize * 0.1, y - this.gridSize * 0.4);
            ctx.lineTo(x + radius + this.gridSize * 0.1, y - this.gridSize * 0.4);
        }
        ctx.closePath();
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = 'white';
        if (isMovingRight) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.75, y + this.gridSize * 0.3, radius * 0.25, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.75, y + this.gridSize * 0.7, radius * 0.25, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingLeft) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.25, y + this.gridSize * 0.3, radius * 0.25, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.25, y + this.gridSize * 0.7, radius * 0.25, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingDown) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.3, y + this.gridSize * 0.75, radius * 0.25, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.7, y + this.gridSize * 0.75, radius * 0.25, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingUp) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.3, y + this.gridSize * 0.25, radius * 0.25, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.7, y + this.gridSize * 0.25, radius * 0.25, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw pupils
        ctx.fillStyle = 'black';
        if (isMovingRight) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.85, y + this.gridSize * 0.3, radius * 0.15, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.85, y + this.gridSize * 0.7, radius * 0.15, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingLeft) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.15, y + this.gridSize * 0.3, radius * 0.15, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.15, y + this.gridSize * 0.7, radius * 0.15, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingDown) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.3, y + this.gridSize * 0.85, radius * 0.15, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.7, y + this.gridSize * 0.85, radius * 0.15, 0, Math.PI * 2);
            ctx.fill();
        } else if (isMovingUp) {
            ctx.beginPath();
            ctx.arc(x + this.gridSize * 0.3, y + this.gridSize * 0.15, radius * 0.15, 0, Math.PI * 2);
            ctx.arc(x + this.gridSize * 0.7, y + this.gridSize * 0.15, radius * 0.15, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawBody(ctx, segment) {
        const x = segment.x * this.gridSize;
        const y = segment.y * this.gridSize;
        
        const gradient = ctx.createLinearGradient(x, y, x + this.gridSize, y + this.gridSize);
        gradient.addColorStop(0, 'limegreen');
        gradient.addColorStop(1, 'forestgreen');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, this.gridSize, this.gridSize, this.gridSize / 5);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(0, 100, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(x + this.gridSize / 2, y + this.gridSize / 2, this.gridSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawTail(ctx, segment, prevSegment) {
        ctx.fillStyle = 'green';
        ctx.beginPath();

        const dx = prevSegment.x - segment.x;
        const dy = prevSegment.y - segment.y;

        const adjustedDx = dx === 19 ? -1 : (dx === -19 ? 1 : dx);
        const adjustedDy = dy === 19 ? -1 : (dy === -19 ? 1 : dy);

        if (adjustedDx === -1) {
            ctx.moveTo(segment.x * this.gridSize, segment.y * this.gridSize);
            ctx.lineTo(segment.x * this.gridSize, (segment.y + 1) * this.gridSize);
            ctx.lineTo((segment.x + 0.5) * this.gridSize, (segment.y + 0.5) * this.gridSize);
        } else if (adjustedDx === 1) {
            ctx.moveTo((segment.x + 1) * this.gridSize, segment.y * this.gridSize);
            ctx.lineTo((segment.x + 1) * this.gridSize, (segment.y + 1) * this.gridSize);
            ctx.lineTo((segment.x + 0.5) * this.gridSize, (segment.y + 0.5) * this.gridSize);
        } else if (adjustedDy === -1) {
            ctx.moveTo(segment.x * this.gridSize, segment.y * this.gridSize);
            ctx.lineTo((segment.x + 1) * this.gridSize, segment.y * this.gridSize);
            ctx.lineTo((segment.x + 0.5) * this.gridSize, (segment.y + 0.5) * this.gridSize);
        } else {
            ctx.moveTo(segment.x * this.gridSize, (segment.y + 1) * this.gridSize);
            ctx.lineTo((segment.x + 1) * this.gridSize, (segment.y + 1) * this.gridSize);
            ctx.lineTo((segment.x + 0.5) * this.gridSize, (segment.y + 0.5) * this.gridSize);
        }

        ctx.closePath();
        ctx.fill();
    }

    updateDirection() {
        if (this.directionQueue.length > 0) {
            const newDirection = this.directionQueue.shift();
            if (this.isValidDirection(newDirection)) {
                this.direction = newDirection;
            }
        }
    }

    changeDirection(keyCode) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        let newDirection;

        if (keyCode === LEFT_KEY) {
            newDirection = { dx: -1, dy: 0 };
        } else if (keyCode === UP_KEY) {
            newDirection = { dx: 0, dy: -1 };
        } else if (keyCode === RIGHT_KEY) {
            newDirection = { dx: 1, dy: 0 };
        } else if (keyCode === DOWN_KEY) {
            newDirection = { dx: 0, dy: 1 };
        } else {
            return;
        }

        if (this.directionQueue.length === 0 || 
            (newDirection.dx !== this.directionQueue[this.directionQueue.length - 1].dx || 
             newDirection.dy !== this.directionQueue[this.directionQueue.length - 1].dy)) {
            this.directionQueue.push(newDirection);
        }
    }

    isValidDirection(newDirection) {
        return (newDirection.dx !== -this.direction.dx || newDirection.dx === 0) &&
               (newDirection.dy !== -this.direction.dy || newDirection.dy === 0);
    }

    hasCollided(obstacles) {
        const head = this.body[0];
        
        // Check self-collision
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        
        // Check obstacle collision
        for (let obstacle of obstacles) {
            if (head.x === obstacle.x && head.y === obstacle.y) {
                return true;
            }
        }
        
        return false;
    }

    canEat(food) {
        const head = this.body[0];
        return head.x === food.x && head.y === food.y;
    }

    isGridFull() {
        return this.body.length === this.tileCount * this.tileCount;
    }
}