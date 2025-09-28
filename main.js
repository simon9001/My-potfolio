document.getElementById("simon", "simons").addEventListener("click", function() {
  let sound = document.getElementById("netflixSound"); // Use the audio element's ID
  sound.play();

  // Redirect after 3 seconds (adjust as you like)
  setTimeout(() => {
    window.location.href = "./htmldox/home.html";
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.querySelector(".netflix-ALSname");

  nameEl.addEventListener("click", () => {
    nameEl.classList.add("animate");

    // Optional: remove element after animation
    nameEl.addEventListener("animationend", () => {
      nameEl.style.display = "none"; 
    }, { once: true });
  });
});

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const gridSize = 10;
let playerPos = { x: 0, y: 0 };

// Create grid
let cells = [];
for (let y = 0; y < gridSize; y++) {
  let row = [];
  for (let x = 0; x < gridSize; x++) {
    let div = document.createElement("div");
    div.classList.add("cell");
    grid.appendChild(div);
    row.push(div);
  }
  cells.push(row);
}

// Place traps randomly (not start or end)
let traps = [];
for (let i = 0; i < 20; i++) {
  let tx = Math.floor(Math.random() * gridSize);
  let ty = Math.floor(Math.random() * gridSize);
  if ((tx === 0 && ty === 0) || (tx === gridSize-1 && ty === gridSize-1)) continue;
  traps.push({ x: tx, y: ty });
}

// Mark end cell
cells[gridSize-1][gridSize-1].classList.add("end");

// Draw function
function draw() {
  cells.forEach(row => row.forEach(cell => {
    cell.className = "cell";
  }));
  cells[playerPos.y][playerPos.x].classList.add("player");
  cells[gridSize-1][gridSize-1].classList.add("end");
}

// Check trap
function checkTrap(x, y) {
  return traps.some(t => t.x === x && t.y === y);
}

draw();

// Movement
document.addEventListener("keydown", (e) => {
  if (message.textContent) return; // stop if game over
  let newX = playerPos.x;
  let newY = playerPos.y;

  if (e.key === "ArrowUp" && playerPos.y > 0) newY--;
  if (e.key === "ArrowDown" && playerPos.y < gridSize-1) newY++;
  if (e.key === "ArrowLeft" && playerPos.x > 0) newX--;
  if (e.key === "ArrowRight" && playerPos.x < gridSize-1) newX++;

  playerPos = { x: newX, y: newY };

  if (checkTrap(newX, newY)) {
    cells[newY][newX].classList.add("revealed");
    message.textContent = "💥 You hit a trap! Game Over.";
  } else if (newX === gridSize-1 && newY === gridSize-1) {
    message.textContent = "🏆 You reached the end! Victory!";
  }

  draw();
});

