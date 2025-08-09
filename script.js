console.log("RPS loaded");

// Returns "rock" | "paper" | "scissors"
function getComputerChoice() {
  const r = Math.random();
  if (r < 1/3) return "rock";
  if (r < 2/3) return "paper";
  return "scissors";
}

// Prompts the user and normalizes input
function getHumanChoice() {
  const input = prompt("Choose rock, paper, or scissors:");
  return String(input).trim().toLowerCase();
}

function playGame() {
  // Scores are scoped to this game
  let humanScore = 0;
  let computerScore = 0;

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  function playRound(humanChoice, computerChoice) {
    const human = humanChoice.toLowerCase();
    const comp = computerChoice.toLowerCase();

    if (human === comp) {
      console.log(`Tie! You both chose ${capitalize(human)}. Score: You ${humanScore} - Computer ${computerScore}`);
      return "tie";
    }

    const humanWins =
      (human === "rock"     && comp === "scissors") ||
      (human === "paper"    && comp === "rock")     ||
      (human === "scissors" && comp === "paper");

    if (humanWins) {
      humanScore++;
      console.log(`You win! ${capitalize(human)} beats ${capitalize(comp)}. Score: You ${humanScore} - Computer ${computerScore}`);
      return "human";
    } else {
      computerScore++;
      console.log(`You lose! ${capitalize(comp)} beats ${capitalize(human)}. Score: You ${humanScore} - Computer ${computerScore}`);
      return "computer";
    }
  }

  // Play 5 rounds
  for (let i = 1; i <= 5; i++) {
    console.log(`--- Round ${i} ---`);
    const humanSelection = getHumanChoice();     // call each round
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  console.log("=== Final Score ===");
  console.log(`You ${humanScore} - Computer ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("🏆 You won the game!");
  } else if (computerScore > humanScore) {
    console.log("🤖 Computer won the game!");
  } else {
    console.log("🤝 It's a draw!");
  }
}

// Auto-start one game on page load
playGame();
