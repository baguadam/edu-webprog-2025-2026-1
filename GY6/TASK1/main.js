const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "skyblue";
ctx.fillRect(0, 0, 600, 300);

ctx.fillStyle = "lightgreen";
ctx.fillRect(0, 300, 600, 100);

ctx.beginPath();
ctx.arc(500, 50, 40, 0, 2 * Math.PI);
ctx.fillStyle = "yellow";
ctx.fill();
// ctx.stroke();

ctx.fillStyle = "brown";
ctx.fillRect(400, 250, 100, 100);

ctx.beginPath();
ctx.moveTo(400, 250);
ctx.lineTo(450, 200);
ctx.lineTo(500, 250);
ctx.closePath();
ctx.fillStyle = "red";
ctx.fill();
