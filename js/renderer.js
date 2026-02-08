function drawBall(ctx, ball) {
  // cercle
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // texte dans la balle (#, #1, etc.)
  if (ball.label) {
    ctx.fillStyle = "black";
    ctx.font = `${ball.radius - 5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(ball.label, ball.x, ball.y);
  }
}

export function render(ctx, balls, countdown, canvas, endOfTrack, pins, walls, winner) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // sol
  endOfTrack.render(ctx, canvas);

  // pins & murs
  for (const pin of pins) pin.render(ctx);
  for (const wall of walls) wall.render(ctx);

  // balles
  for (const ball of balls) {
    drawBall(ctx, ball);
  }

  // countdown
  if (countdown && !countdown.isFinished) {
    ctx.fillStyle = "white";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(countdown.text, canvas.width / 2, canvas.height / 2);
  }

  if (winner) {
    ctx.fillStyle = winner.color;
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = winner.label
      ? `🏆 ${winner.label} WIN !`
      : "🏆 WINNER !";

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}
