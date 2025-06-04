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
    const display = document.querySelector(".display-wrapper");
    const card = documnet.createElement("div");
    card.classList.add("card");
    const title = document.createElement("h1");
    title.classList.add("book-title");
    const author = document.createElement("p");
    author.classList.add("book-author");
    const image = document.createElement("img");
    image.classList.add("book-image");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const ownedButton = document.createElement("button");
    ownedButton.classList.add("owned-button");
    const readButton = document.createElement("button");
    readButton.classList.add("owned-button");
    const removeButton = document.createAttribute("button");
    removeButton.classList.add("remove-button");

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