const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;

const RESULT_DRAW = 'RESULT_DRAW';
const RESULT_PLAYER_WINS = 'RESULT_PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'RESULT_COMPUTER_WINS';

let gameIsRunning = false;

const getComputerChoice = () => {
  const randomValue = Math.random();

  if(randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getPlayerChoice = () => {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}`, '').toUpperCase();
  console.log(selection);
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! we chose ${DEFAULT_CHOICE} for you!`);
    return DEFAULT_CHOICE;
  }
  return selection;
};

const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    cChoice === ROCK && pChoice === PAPER ||
    cChoice === PAPER && pChoice === SCISSORS ||
    cChoice === SCISSORS && pChoice === ROCK
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
}; 

startGameBtn.addEventListener('click', () => {
  if(gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game Started...');
  const playerSelection = getPlayerChoice();
  const compuerSelection = getComputerChoice();
  const winner = getWinner(compuerSelection, playerSelection)
  let message = `You picked ${playerSelection}, computer picked ${compuerSelection}. Therefore you `;
  if(winner === RESULT_DRAW) {
    message += 'had a draw.';
  } else if (winner === RESULT_PLAYER_WINS) {
    message += 'won.'
  } else {
    message += 'lost.'
  }

  alert(message);
  gameIsRunning = false;
});
