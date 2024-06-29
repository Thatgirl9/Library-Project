const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h2');
    title.textContent = ` ${book.title}📖 `;
    title.classList.add('title-icon')
    bookCard.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    bookCard.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(pages);

    const read = document.createElement('p');
    read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
    bookCard.appendChild(read);

    const toggleReadButton = document.createElement('button');

    toggleReadButton.textContent = 'Read Status';
    toggleReadButton.classList.add('toggle-read-button');
    toggleReadButton.addEventListener('click', () => {
      book.toggleReadStatus();
      displayBooks();
    });
    bookCard.appendChild(toggleReadButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Book';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookCard.appendChild(removeButton);

    bookList.appendChild(bookCard);
  });
}

const bookFormDialog = document.getElementById('book-form-dialog');
const newBookBtn = document.getElementById('new-book-btn');

newBookBtn.addEventListener('click', () => {
  bookFormDialog.showModal();
});


document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  bookFormDialog.close();
  document.getElementById('book-form').reset();
});




// Initial display of books (if any)
displayBooks();
