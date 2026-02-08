export class Wall {
  constructor(x, canvasHeight) {
    this.x = x;
    this.width = 4;
    this.canvasHeight = canvasHeight;
  }

  checkCollision(ball) {
    // Mur gauche
    if (ball.x - ball.radius < this.x) {
      ball.x = this.x + ball.radius;
      ball.vx = -ball.vx * 0.7;
    }

    // Mur droit
    if (ball.x + ball.radius > this.x) {
      ball.x = this.x - ball.radius;
      ball.vx = -ball.vx * 0.7;
    }
  }

  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x - this.width/2, 0, this.width, this.canvasHeight);
  }
}
