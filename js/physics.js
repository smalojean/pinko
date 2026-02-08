const GRAVITY = 0.5;
const FLOOR_BOUNCE = -0.7; // rebond vertical
const WALL_BOUNCE = -0.7;  // rebond horizontal pour les murs
const PIN_PUSH = 0.5;      // petite force horizontale sur collision pin

export function applyGravity(ball, canvasWidth, endOfTrack, pins, walls) {
  // appliquer gravité
  ball.vy += GRAVITY;

  // déplacer balle
  ball.x += ball.vx;
  ball.y += ball.vy;

  // collision sol
  if (ball.y + ball.radius > endOfTrack.y) {
    ball.y = endOfTrack.y - ball.radius;
    ball.vy *= FLOOR_BOUNCE;
  }

  // collision murs
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx *= -1;
  }
  if (ball.x + ball.radius > canvasWidth) {
    ball.x = canvasWidth - ball.radius;
    ball.vx *= -1;
  }

  // collision pins
  for (const pin of pins) {
    const dx = ball.x - pin.x;
    const dy = ball.y - pin.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < ball.radius + pin.radius) {
      const overlap = ball.radius + pin.radius - dist;
      const angle = Math.atan2(dy, dx);

      // décaler la balle pour qu'elle ne soit plus collée
      ball.x += Math.cos(angle) * overlap / 2;
      ball.y += Math.sin(angle) * overlap / 2;

      // rebond vertical
      ball.vy *= -0.7;

      // petite poussée horizontale pour disperser
      ball.vx += (dx / dist) * PIN_PUSH;
    }
  }
}
