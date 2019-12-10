const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

const getPlayerChoice = () => {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}`, '');

  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert('Invalid choice! we chose Rock for you!');
  }
};

startGameBtn.addEventListener('click', () => {
  console.log('Game Started...');
});
