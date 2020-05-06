// Book constructor
function Book(title, author, isbn) {
  this.title = title,
  this.author = author,
  this.isbn = isbn
};

// Ui constructor
function UI() {};

UI.prototype.addBookToList = function(book) {
  const list =document.getElementById('book-list');

  // create table row
  const row = document.createElement('tr');

  // insert colums
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
  
};

// Show alert
UI.prototype.showAlert = function(message, className) {
  // create a div
  const div = document.createElement('div');

  // add class
  div.className = `alert ${className}`;

  // add text
  div.appendChild(document.createTextNode(message));

  // get parent
  const containter = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  // insert alert
  containter.insertBefore(div, form);
  // desapered after 3 s
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listeners
document.getElementById('book-form').addEventListener('submit', showList);

function showList(e) {
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value;
  
  // create new book
  const book = new Book(title, author, isbn);

  // create a Ui
  const ui = new UI();

  // validation
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all the fields', 'error');
    
  } else {
    // add the book to the list
    ui.addBookToList(book);

    // show alert
    ui.showAlert('Book added', 'success')
  
    // clear fields
    ui.clearFields();
  }


  e.preventDefault();
}
