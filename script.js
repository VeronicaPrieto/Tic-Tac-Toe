const cells = document.querySelectorAll(".cells");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameEnd = true;

const startButton = document.getElementById("comenzar");
startButton.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  if (player1 !== "" && player2 !== "") {
    currentPlayer = "X";
    gameEnd = false;

    const player1Wins = localStorage.getItem("player1Wins") || 0;
    const player2Wins = localStorage.getItem("player2Wins") || 0;

    const player1Score = document.createElement("div");
    player1Score.id = "player1-score";
    player1Score.textContent = `${player1}: ${player1Wins}`;
    document.body.appendChild(player1Score);

    const player2Score = document.createElement("div");
    player2Score.id = "player2-score";
    player2Score.textContent = `${player2}: ${player2Wins}`;
    document.body.appendChild(player2Score);

    if (localStorage.getItem("player1") && localStorage.getItem("player2")) {
      player1 = localStorage.getItem("player1");
      player2 = localStorage.getItem("player2");
    } else {
      localStorage.setItem("player1", player1);
      localStorage.setItem("player2", player2);
    }
  }
});

const restartButton = document.getElementById("reiniciar");
restartButton.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
  });
  player1 = localStorage.getItem("player1");
  player2 = localStorage.getItem("player2");
  currentPlayer = "";
  gameEnd = true;
  document.getElementById("player1").value = player1;
  document.getElementById("player2").value = player2;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameEnd) {
      return;
    }
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        gameEnd = true;
        alert(`${currentPlayer === "X" ? player1 : player2} es el ganador!`);
      } else if (checkTie()) {
        gameEnd = true;
        alert("Excelente juego, es un empate!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWin() {
  const player1Wins = localStorage.getItem("player1Wins") || 0;
  const player2Wins = localStorage.getItem("player2Wins") || 0;

  const win = winConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });

  if (win) {
    gameEnd = true;
    const winner = currentPlayer === "X" ? player1 : player2;
    alert(`${winner} es el ganador!`);
    if (winner === player1) {
      localStorage.setItem("player1Wins", parseInt(player1Wins) + 1);
    } else {
      localStorage.setItem("player2Wins", parseInt(player2Wins) + 1);
    }
  }

  return win;
}

function checkTie() {
  return Array.from(cells).every(cell => {
    return cell.textContent !== "";
  });
}

window.addEventListener("load", () => {
  localStorage.setItem("player1Wins", 0);
  localStorage.setItem("player2Wins", 0);
});