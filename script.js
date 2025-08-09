console.log("RPS loaded");

function getComputerChoice() {
  const r = Math.random();      // r is in [0, 1)
  if (r < 1/3) return "rock";
  if (r < 2/3) return "paper";
  return "scissors";
}

// quick test
console.log("Computer says:", getComputerChoice());
