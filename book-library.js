let myLibrary = [];

const books = document.querySelector('#allBooks')
const newBook = document.querySelector('#addNewBook');
newBook.addEventListener('click', () => addBookToLibrary())

function Book(title, author, pages, readOrNot) {
     this.title = title;
     this.pages = pages;
     this.author = author;
     this.readOrNot = readOrNot;
}

function removeLib(){
    while (books.firstChild){
        books.removeChild(books.firstChild)
    }
    return
}

function addBookToLibrary() {
    const title = prompt('What is the Title of the Book?');
    const author = prompt('who is the author of this book?');
    let pages = prompt('How many pages are in this book?');
    while (isNaN(pages)){
        alert('This must  be a Number!')
        pages = prompt('How many pages are in this book?')
    }
    let readOrNot = prompt('Have you read this book? Y or N').toLowerCase()
    while (readOrNot !== 'y' && readOrNot !== 'n'){
        alert('Please enter Y or N')
        readOrNot = prompt('Have you read this book? Y or N').toLowerCase()
    }
    if (readOrNot === 'y'){
        readOrNot = true
    } else {
        readOrNot = false
    }
    let book = new Book(title, author, pages, readOrNot)
    removeLib()
    myLibrary.push(book)
    presentBooksInList(myLibrary)
}

function addDeleteBtn(parent) {
    const del = document.createElement('button');
    del.id = 'delete'
    del.textContent = 'delete'
    del.addEventListener('click', () => {
        const index = myLibrary.indexOf(parent)
        myLibrary.splice(index, 1)
        parent.remove()
    })
    parent.appendChild(del)
}

Book.prototype.createCard = function(book){
    const cardTitle = document.createElement('div');
    cardTitle.id = 'cardTitle'
    cardTitle.textContent = this.title;
    book.appendChild(cardTitle)
    const cardAuthor = document.createElement('div');
    cardAuthor.textContent = 'by ' + this.author
    cardAuthor.id = 'cardAuthor'
    book.appendChild(cardAuthor)
    const cardPages = document.createElement('div');
    cardPages.textContent = this.pages + ' pages'
    cardPages.id = 'cardPages'
    book.appendChild(cardPages)
    const cardReadOrNot = document.createElement('label');
    cardReadOrNot.id = 'cardReadOrNot'
    cardReadOrNot.textContent = 'Read'
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    if (this.readOrNot === true) {
        checkbox.checked = true
    }
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            this.readOrNot = true;
        } else  this.readOrNot = false
    })
    cardReadOrNot.appendChild(checkbox)
    book.appendChild(cardReadOrNot)
    addDeleteBtn(book)
    return 
}

function presentBooksInList(arrayOfBooks) {
    arrayOfBooks.forEach(bookInList => {
        const book = document.createElement('div')
        book.classList = 'book'
        bookInList.createCard(book)
        books.appendChild(book)   
    });
}

let book1 = new Book('Zilies', 'Adi Zilberstein', '50',true);
let book2 = new Book('Eddies','Rebecca Edwards','25',true);
myLibrary.push(book1,book2)

presentBooksInList(myLibrary)
