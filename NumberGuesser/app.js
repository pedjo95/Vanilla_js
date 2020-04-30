// Game values
let min = 1,
    max = 10,
    winningNumber = generateNumber(min, max),
    guessesLeft = 3;

// UI variables
const guessInput = document.querySelector('#guess-input');
const guessSubmit = document.querySelector('#guess-btn');
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const message = document.querySelector('.message');

// Display the min and max numbers
minNum.textContent = min;
maxNum.innerHTML = max;

// Submit event
guessSubmit.addEventListener('click', submitInput);

// Play again event
game.addEventListener('mousedown', playAgain);

function playAgain(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
}

function submitInput() {
  
  const guess = parseInt(guessInput.value);

  validateInput(guess);
}

function validateInput (guess) {
  if(guess < 1 || guess > max || isNaN(guess)) {
    tryAgain(`Insert a number between ${min} and ${max}`);

  } else {
    checkWinnig(guess);
  }
}

function checkWinnig(guess) {
  if(guess === winningNumber) {

    // won the game
    endGame(true,`YOU WIN !!!! ${winningNumber} is correct`);
    
  } else {

    guessesLeft -=1;

    if(guessesLeft === 0) {

      // Game Over
      endGame(false,`GAME OVER!! The correct answer was ${winningNumber}`);

    } else {
      // wrong answer but game continues
      tryAgain(`${guess} is incorrect. You have ${guessesLeft} guesses remain. PLease try again`);
    }
  }  
}

function endGame(won, msg) {
  let colorText;

  won === true ? colorText = 'green' : colorText = 'red';

  guessInput.disabled = true;

  displayMessage(msg, colorText);

  // star a new game
  guessSubmit.value = 'Play-again';
  guessSubmit.className += 'play-again';
}

function tryAgain(msg) {
  guessInput.value = '';

  displayMessage(msg, 'red');
}

function generateNumber(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
}

function displayMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
  guessInput.style.borderColor = color;
}
