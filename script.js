const myLibrary = [];

function Book(title, author, image, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.image = image;
    this.readStatus = readStatus;
}

// Creates a new book, then adds to myLibrary array
function addBookToLibrary(title, author, image, readStatus) {
    let book = new Book(title, author, image, readStatus);
    myLibrary.push(book);
}

