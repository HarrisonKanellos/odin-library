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
    const display = document.querySelector(".display");
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
    addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", "images/12-rules-for-life.jpg", true, true);
    addBookToLibrary("The Power of Now", "Eckhart Tolle", "images/the-power-of-now.jpeg", true, false);
    addBookToLibrary("Digital Minimalism", "Cal Newport", "images/digital-minimalism.jpg", true, true);
    addBookToLibrary("1984", "George Orwell", "images/1984.jpg", true, false);
    addBookToLibrary("Mastery", "Robert Greene", "images/mastery.jpg", true, false);
    addBookToLibrary("Frankenstein", "Mary Shelley", "images/frankenstein.jpg", true, true);
    addBookToLibrary("Basic Economics", "Thomas Sowell", "images/basic-economics.jpg", true, false);
    addBookToLibrary("Twelve and a Half", "Gary Vaynerchuk", "images/twelve-and-a-half.jpg", true, false);
    addBookToLibrary("The Art of War", "Sun Tzu", "images/the-art-of-war.jpg", true, false);
    addBookToLibrary("Slow Productivity", "Cal Newport", "images/slow-productivity.jpg", true, false);
    addBookToLibrary("Beyond Order", "Jordan B. Peterson", "images/beyond-order.jpg", true, false);
}