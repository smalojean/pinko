export class Ball {
  constructor(x, y, radius, color, label = "#") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.label = label;
    this.vx = (Math.random() - 0.5) * 2; // vitesse horizontale initiale
    this.vy = 0;
  }
}
