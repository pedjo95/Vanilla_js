class Book {
  constructor(title, author, isbn) {
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
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
  
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className) {
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

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static addBooks(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static displayBooks(book) {
    const books = Store.getBooks();

    books.forEach(function(book) {
      // create a Ui
      const ui = new UI();
  
      // add the book to the list
      ui.addBookToList(book);
    });
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      };
    });
    
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Reload event
window.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add Book Event 
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

    // add to local storage
    Store.addBooks(book);

    // show alert
    ui.showAlert('Book added', 'success')
  
    // clear fields
    ui.clearFields();
  }


  e.preventDefault();
};

// Delete a Book Event
document.querySelector('#book-list').addEventListener('click', function(e) {

  // create a Ui
  const ui = new UI();

  // call method of delete
  ui.deleteBook(e.target);

  // remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show alert
  ui.showAlert('Book deleted', 'error');

  e.preventDefault();
})

