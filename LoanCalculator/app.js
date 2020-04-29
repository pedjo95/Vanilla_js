// Ui variable
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterst = document.querySelector('#total-interest');

runEvents();

function runEvents() {
  // calculate event
  document.addEventListener('submit',showLoader);
}

function showLoader(e) {
  // hide the results
  document.querySelector('#results').style.display = 'none';

  // show loader on the UI
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
}

function calculateResults() {
  console.log('clicked');
  
  const calculateAmount = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value)/100 /12;
  const calculateYears = parseFloat(years.value)*12;

  // monthly payment calculation
  const monthlyInterest = Math.pow(1 + calculateInterest, calculateYears);
  const monthly = (calculateAmount*monthlyInterest*calculateInterest)/(monthlyInterest-1);

  // display on the UI
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculateYears).toFixed(2);
    totalInterst.value = (totalPayment.value - calculateAmount).toFixed(2);

    
    // show results on the UI
    document.querySelector('#results').style.display = 'block';

    // hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('PLease check your numbers');

  }

}

function showError(error) {
  // hide results on the UI
  document.querySelector('#results').style.display = 'none';

  // hide loader
  document.querySelector('#loading').style.display = 'none';


  const heading = document.querySelector('.heading');
  const card = document.querySelector('.card');

  // create a div
  const errorDiv = document.createElement('div');
  // add a class
  errorDiv.className = 'alert alert-danger';
  // create a text node and append
  errorDiv.appendChild(document.createTextNode(error));
  // insert before the heading
  card.insertBefore(errorDiv, heading);
  
  // clear errorDiv after 3s
  setTimeout(() => document.querySelector('.alert').remove(), 3000);

}