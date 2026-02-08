export class floor {
  constructor(y) {
    this.y = y; // position verticale du sol
  }

  checkCollision(ball) {
    if (ball.y + ball.radius > this.y) {
      ball.y = this.y - ball.radius;
      ball.vy *= -0.7;
    }
  }
}
