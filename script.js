// --- Game state ---
const choices = ["rock", "paper", "scissors"];
const maxPoints = 5;
let scores = { player: 0, computer: 0 };
let gameOver = false;

// --- DOM refs ---
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const feedEl = document.getElementById("feed");
const choiceButtons = document.querySelectorAll("#buttons .choice");
const resetBtn = document.getElementById("reset");

// --- Helpers ---
const randInt = (n) => Math.floor(Math.random() * n);
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getComputerChoice() {
  return choices[randInt(choices.length)];
}

function playRound(player, computer) {
  if (player === computer) {
    return { winner: "tie", message: `Tie! You both chose ${capitalize(player)}.` };
  }
  const beats = { rock: "scissors", paper: "rock", scissors: "paper" };
  const playerWins = beats[player] === computer;

  if (playerWins) {
    return {
      winner: "player",
      message: `You win! ${capitalize(player)} beats ${capitalize(computer)}.`
    };
  } else {
    return {
      winner: "computer",
      message: `You lose! ${capitalize(computer)} beats ${capitalize(player)}.`
    };
  }
}

function updateScores(winner) {
  if (winner === "player") scores.player += 1;
  if (winner === "computer") scores.computer += 1;
  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
}

function addToFeed(text, isFinal = false) {
  const p = document.createElement("p");
  p.textContent = text;
  if (isFinal) p.classList.add("final");
  feedEl.appendChild(p);
  feedEl.scrollTop = feedEl.scrollHeight;
}

function setButtonsEnabled(enabled) {
  choiceButtons.forEach((btn) => (btn.disabled = !enabled));
}

function checkForWinner() {
  if (scores.player >= maxPoints || scores.computer >= maxPoints) {
    gameOver = true;
    setButtonsEnabled(false);
    const winnerText =
      scores.player > scores.computer ? "You win the match! 🏆" : "Computer wins the match! 🤖";
    addToFeed(winnerText, true);
    resetBtn.hidden = false;
  }
}

function handleChoiceClick(e) {
  if (gameOver) return;

  const playerChoice = e.currentTarget.dataset.choice;
  const computerChoice = getComputerChoice();

  const { winner, message } = playRound(playerChoice, computerChoice);

  // keep the console logs if you want to see them in DevTools
  console.log({ playerChoice, computerChoice, winner, message });

  addToFeed(`You: ${capitalize(playerChoice)} | CPU: ${capitalize(computerChoice)}`);
  addToFeed(message);

  updateScores(winner);
  checkForWinner();
}

function resetGame() {
  scores = { player: 0, computer: 0 };
  gameOver = false;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  feedEl.innerHTML = "<p>Make your move!</p>";
  setButtonsEnabled(true);
  resetBtn.hidden = true;
}

// --- Wire events ---
choiceButtons.forEach((btn) => btn.addEventListener("click", handleChoiceClick));
resetBtn.addEventListener("click", resetGame);
