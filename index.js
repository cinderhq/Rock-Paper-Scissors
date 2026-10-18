let moveResult = document.querySelector(".result");
let move = document.querySelector(".move");
let scoreDisplay = document.querySelector(".score");

const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  tie: 0,
  losses: 0,
};

function reset() {
  score.wins = 0;
  score.tie = 0;
  score.losses = 0;
  scoreDisplay.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
  moveResult.textContent = ``;
  move.textContent = ``;
  localStorage.removeItem("score");
}

let isPlaying = false;

function toggleAutoplay() {
  const autoplay = document.getElementById("autoplay");

  

  if (!isPlaying) {
    toggleAutoplay.intervalId = setInterval(() => {
      const moves = pickComputerMove();
      playGame(moves);
    }, 1000);
    isPlaying = true;
  } else {
    clearInterval(toggleAutoplay.intervalId);
    isPlaying = false;
  }

  autoplay.textContent = isPlaying ? "Stop" : "Autoplay";
  if (autoplay.textContent === "Autoplay") {
    clearInterval(toggleAutoplay.intervalId);
    isPlaying = false;
  }
}

document.getElementById("rock").addEventListener("click", () => {
  playGame("rock");
});

document.getElementById("paper").addEventListener("click", () => {
  playGame("paper");
});

document.getElementById("scissors").addEventListener("click", () => {
  playGame("scissors");
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (computerMove === "paper") {
    if (playerMove === "paper") {
      result = "you tie!";
    } else if (playerMove === "scissors") {
      result = "you win!";
    } else {
      result = "you lose!";
    }
  } else if (computerMove === "scissors") {
    if (playerMove === "paper") {
      result = "you lose!";
    } else if (playerMove === "scissors") {
      result = "you tie!";
    } else {
      result = "you win!";
    }
  } else {
    if (playerMove === "paper") {
      result = "you win!";
    } else if (playerMove === "scissors") {
      result = "you lose!";
    } else {
      result = "you tie!";
    }
  }

  if (result === "you win!") {
    score.wins = score.wins += 1;
  } else if (result === "you tie!") {
    score.ties = score.tie += 1;
  } else if (result === "you lose!") {
    score.losses = score.losses += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  moveResult.textContent = ` ${result}`;
  move.innerHTML = `
    You 
    <img src="images/${playerMove}-emoji.png" class="emoji" />
    <img src="images/${computerMove}-emoji.png" class="emoji" />
    Computer
  `;
  scoreDisplay.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
}

function pickComputerMove() {
  const randomNum = Math.random();
  let computerMove = "";

  if (randomNum >= 0 && randomNum <= 1 / 3) {
    computerMove = "paper";
  } else if (randomNum > 1 / 3 && randomNum <= 2 / 3) {
    computerMove = "scissors";
  } else {
    computerMove = "rock";
  }

  return computerMove;
}
