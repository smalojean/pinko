import { Ball } from "./ball.js";
import { applyGravity } from "./physics.js";
import { Countdown } from "./countdown.js";
import { render } from "./renderer.js";
import { EndOfTrack } from "./endOfTrack.js";
import { Pin } from "./pin.js";
import { Wall } from "./wall.js";

// Canvas et menu
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const ballCountInput = document.getElementById("ballCount");
const menu = document.getElementById("menu");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sol
const endOfTrack = new EndOfTrack(canvas.height - 50);

// Murs
const walls = [
  new Wall(0, canvas.height),               
  new Wall(canvas.width - 1, canvas.height) 
];

// Pins Plinko
const rows = 7;
const pinRadius = 5;
const topOffset = 150;
const pinSpacingMin = 100; // distance minimale entre les pins

// calculer le nombre de colonnes selon la largeur du canvas
const cols = Math.floor(canvas.width / pinSpacingMin);
const spacingX = canvas.width / cols;
const spacingY = 85;

const pins = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const x = col * spacingX + ((row % 2) * spacingX)/2 + spacingX/2;
    const y = topOffset + row * spacingY;
    pins.push(new Pin(x, y, pinRadius));
  }
}

// Balles
let balls = [];
let countdown = null;
let isStarted = false;

// Fonction couleur aléatoire
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Bouton start
const radius = 20;
const spacingMin = 10; // espace minimal entre les balles
const maxBalls = Math.floor(canvas.width / (2 * radius + spacingMin));

startBtn.addEventListener("click", () => {
  let count = parseInt(ballCountInput.value, 10);
  
  // limiter le nombre de balles au maximum calculé
  if (count > maxBalls) count = maxBalls;

  balls = [];
  const spacing = 2 * radius + spacingMin;
  const startX = canvas.width / 2 - (count * spacing) / 2 + radius;

  for (let i = 0; i < count; i++) {
    const x = startX + i * spacing;
    const y = 50; // même hauteur pour toutes
    const ball = new Ball(x, y, radius, getRandomColor(), `#${i + 1}`);
    ball.vx = (Math.random() - 0.5) * 2; // vitesse horizontale initiale
    balls.push(ball);
  }

  console.log("Max allowed:", maxBalls);

  countdown = new Countdown();
  isStarted = true;
  menu.style.display = "none";
});

// Boucle principale
let winner = null;
let raceFinished = false;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isStarted && countdown && countdown.isFinished) {
    for (const ball of balls) {
      if (raceFinished) break;
      applyGravity(ball, canvas.width, endOfTrack, pins, walls, winner);

      // Vérifier si la balle a atteint le "end of track"
      if (!winner && ball.y + ball.radius >= endOfTrack.y) {
        winner = ball;
        raceFinished = true;
        console.log("Winner!", ball.label);
      }
    }
  }

  render(ctx, balls, countdown, canvas, endOfTrack, pins, walls, winner);
  requestAnimationFrame(loop);
}


loop();
