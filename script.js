console.log("RPS loaded");

function getComputerChoice() {
  const r = Math.random();
  if (r < 1/3) return "rock";
  if (r < 2/3) return "paper";
  return "scissors";
}

function getHumanChoice() {
  const input = prompt("Choose rock, paper, or scissors:");
  return String(input).trim().toLowerCase();
}

let humanScore = 0;
let computerScore = 0;

console.log({ humanScore, computerScore });
