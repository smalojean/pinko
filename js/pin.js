export class Pin {
  constructor(x, y, radius = 5) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  checkCollision(ball) {
    const dx = ball.x - this.x;
    const dy = ball.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist === 0) return; // <-- sécurité absolue

    if (dist < this.radius + ball.radius) {
        const overlap = this.radius + ball.radius - dist;
        const nx = dx / dist;
        const ny = dy / dist;

        ball.x += nx * overlap;
        ball.y += ny * overlap;

        const vn = ball.vx*nx + ball.vy*ny;
        ball.vx -= 2*vn*nx;
        ball.vy -= 2*vn*ny;

        ball.vx *= 0.8;
        ball.vy *= 0.8;
    }
  }

  render(ctx) {
    ctx.fillStyle = "#f3f3f3";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  }
}
