export class EndOfTrack {
  constructor(y) {
    this.y = y;
  }

  checkCollision(ball) {
    if (ball.y + ball.radius > this.y) {
      ball.y = this.y - ball.radius;
      ball.vy = -ball.vy * 0.7;
    }
  }

  render(ctx, canvas) {
    ctx.strokeStyle = "#f3f3f3";
    ctx.beginPath();
    ctx.moveTo(0, this.y);
    ctx.lineTo(canvas.width, this.y);
    ctx.stroke();
  }
}
