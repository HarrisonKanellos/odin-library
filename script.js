const myLibrary = [];

function Book(title, author, image, ownedStatus, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.image = image;
    this.ownedStatus = ownedStatus;
    this.readStatus = readStatus;
}

// Creates a new book, then adds to myLibrary array
function addBookToLibrary(title, author, image, ownedStatus, readStatus) {
    let book = new Book(title, author, image, ownedStatus, readStatus);
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach((book) => {
        // TODO: Logic to create a book card displaying books attributes
    })
}

function populateMyLibrary() {
    addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", "img", true, true);
    addBookToLibrary("The Power of Now", "Eckhart Tolle", "img", true, false);
    addBookToLibrary("Digital Minimalism", "Cal Newport", "img", true, true);
    addBookToLibrary("1984", "George Orwell", "img", true, false);
    addBookToLibrary("Mastery", "Robert Greene", "image", true, false);
    addBookToLibrary("Frankenstein", "Mary Shelley", "image", true, true);
    addBookToLibrary("Basic Economics", "Thomas Sowell", "image", true, false);
    addBookToLibrary("Twelve and a Half", "Gary Vaynerchuk", "image", true, false);
    addBookToLibrary("The Art of War", "Sun Tzu", "image", true, false);
    addBookToLibrary("Slow Productivity", "Cal Newport", "image", true, false);
    addBookToLibrary("Beyond Order", "Jordan B. Peterson", "image", true, false);
}