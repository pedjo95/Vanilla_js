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
    showAlert('Please fill al the fields', 'error');
    
  } else {
    // add the book to the list
    ui.addBookToList(book);
  
    // clear fields
    ui.clearFields();
  }


  e.preventDefault();
}
