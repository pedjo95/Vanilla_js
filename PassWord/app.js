// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperCaseEl = document.getElementById('uppercase');
const lowerCaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Event Listeners
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = upperCaseEl.checked;
  const hasLower = lowerCaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumbers, hasSymbols, length);
});

// clip pasword to clipboard
clipboardEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password) {
    return;
  }

  textArea.value = password;

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copy to clipboard');
})

function generatePassword(upper, lower, number, symbol, length) {

  let generatedPassword = '';

  const typesCount = upper + lower + number + symbol;

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  if(typesCount === 0) {
    return '';
  }

  for(let i = 0; i < length; i += typesCount){
    typesArr.forEach(type  => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    })
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator Functions
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '?!@#$%&*^~=/\|<>,.;_-+';
  return symbols[Math.floor(Math.random() * symbols.length)];
}