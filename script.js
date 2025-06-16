const myLibrary = [];

function Book(title, author, image, ownedStatus, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.image = image;
    this.ownedStatus = ownedStatus;
    this.readStatus = readStatus;
}

// Prototype function to toggle book status
Book.prototype.toggleOwnedStatus = function() {
    if (this.ownedStatus) {
        this.ownedStatus = false;
    }
    else {
        this.ownedStatus = true;
    }
};
Book.prototype.toggleReadStatus = function() {
    if (this.readStatus) {
        this.readStatus = false;
    }
    else {
        this.readStatus = true;
    }
};

// Creates a new book, then adds to myLibrary array
function addBookToLibrary(title, author, image, ownedStatus, readStatus) {
    let book = new Book(title, author, image, ownedStatus, readStatus);
    myLibrary.push(book);
}

// Sets text and color based on owned status
function updateOwnedStatus(book, ownedButton) {
    if (book.ownedStatus) {
        ownedButton.classList.remove("unowned");
        ownedButton.textContent = "owned";
        ownedButton.classList.add("owned");
    }
    else {
        ownedButton.classList.remove("owned");
        ownedButton.textContent = "unowned";
        ownedButton.classList.add("unowned");
    }
}

// Sets text and color based on read status
function updateReadStatus(book, readButton) {
    if (book.readStatus) {
        readButton.classList.remove("unread");
        readButton.textContent = "read";
        readButton.classList.add("read");
    }
    else {
        readButton.classList.remove("read");
        readButton.textContent = "unread";
        readButton.classList.add("unread");
    }
}

// Iterate through each book object to display card to DOM
function displayAllBooks() {
    const display = document.querySelector(".display");
    const addBookCard = document.querySelector("#add-book");
    myLibrary.forEach((book) => {
        // Create DOM elements for card
        const card = document.createElement("div");
        card.classList.add("card");
        const title = document.createElement("h2");
        title.classList.add("book-title");
        const author = document.createElement("p");
        author.classList.add("book-author");
        const image = document.createElement("img");
        image.classList.add("book-image");
        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("button-wrapper");
        const ownedButton = document.createElement("button");
        ownedButton.classList.add("toggle-button", "owned-button");
        const readButton = document.createElement("button");
        readButton.classList.add("toggle-button", "read-button");
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");

        // Add id data attribute
        card.dataset.id = book.id;
        removeButton.dataset.id = book.id;
        ownedButton.dataset.id = book.id;
        readButton.dataset.id = book.id;

        // Set content for card elements
        title.textContent = book.title.toLowerCase();
        author.textContent = `by ${book.author}`;
        image.setAttribute("src", book.image);
        image.setAttribute("alt", book.title);

        // Add elements to card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(image);

        // Setup buttons
        updateOwnedStatus(book, ownedButton);
        updateReadStatus(book, readButton);

        removeIcon.setAttribute("src", "icons/remove-icon.svg");
        removeButton.appendChild(removeIcon);

        buttonWrapper.appendChild(ownedButton);
        buttonWrapper.appendChild(readButton);
        buttonWrapper.appendChild(removeButton);
        card.appendChild(buttonWrapper);

        // Add card to display
        display.insertBefore(card, addBookCard);
    });
}

function createListeners() {
    const display = document.querySelector(".display");
    display.addEventListener("click", (event) => {
        const removeButton = event.target.closest(".remove-button");
        if (removeButton) {
            handleRemove(removeButton);
        }
        else if (event.target.closest("#add-book")) {
            openAddDialog();
        }
        else if (event.target.classList.contains("owned-button")) {
            handleOwnedToggle(event.target);
        }
        else if (event.target.classList.contains("read-button")) {
            handleReadToggle(event.target);
        }
    });

    const buttonWrapper = document.querySelector(".form-button-wrapper");
    const addDialog = document.querySelector("#add-dialog");
    buttonWrapper.addEventListener("click", (event) => {
        const id = event.target.getAttribute("id");
        if (id === "cancel-button") {
            clearFields();
            addDialog.close();
        }

        else if (id === "add-button") {
            event.preventDefault();
            handleAddNewBook();
            addDialog.close();
        }
    });

    const filterContainer = document.querySelector(".filters");
    filterContainer.addEventListener("click", (event) => {
        const filterType = event.target.textContent;
        switch (filterType) {
            case "read":
                removeClearFilterButton();
                filterByRead(true);
                createClearFilterButton(event.target);
                break;

            case "unread":
                removeClearFilterButton();
                filterByRead(false);
                createClearFilterButton(event.target);
                break;

            case "owned":
                removeClearFilterButton();
                filterByOwned(true);
                createClearFilterButton(event.target);
                break;

            case "unowned":
                removeClearFilterButton();
                filterByOwned(false);
                createClearFilterButton(event.target);
                break;
        }

        if (event.target.closest("#clear-filter-button")) {
            handleClearFilter();
        }
    });
}

function handleRemove(removeButton) {
    const id = removeButton.dataset.id;
    const display = document.querySelector(".display");

    // Remove from array
    const bookIndex = myLibrary.findIndex((book) => book.id === id);
    myLibrary.splice(bookIndex, 1);

    // Remove from dom
    const card = document.querySelector(`.card[data-id="${id}"]`)
    display.removeChild(card);
}

function openAddDialog() {
    const addDialog = document.querySelector("#add-dialog");
    addDialog.showModal();
}

function handleAddNewBook() {
    const bookRaw = document.querySelector("#book-name").value;
    const bookName = bookRaw.toLowerCase();
    const authorRaw = document.querySelector("#author").value;
    const author = capitalizeAuthor(authorRaw);
    const imageObj = document.querySelector("#image-file").files[0];
    const image = URL.createObjectURL(imageObj);
    const ownedStatus = document.querySelector("#owned-status").checked;
    const readStatus = document.querySelector("#read-status").checked;

    clearFields();

    addBookToLibrary(bookName, author, image, ownedStatus, readStatus);
    displayNewBook();
}

function clearFields() {
    const bookInput = document.querySelector("#book-name");
    const authorInput = document.querySelector("#author");
    const imageFilePicker = document.querySelector("#image-file");
    const ownedCheckbox = document.querySelector("#owned-status");
    const readCheckbox = document.querySelector("#read-status");

    bookInput.value = "";
    authorInput.value = "";
    imageFilePicker.value = "";
    ownedCheckbox.checked = false;
    readCheckbox.checked = false;
}

function displayNewBook() {
    const newBook = myLibrary.at(-1);

    const display = document.querySelector(".display");
    const addBookCard = document.querySelector("#add-book");

    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("h2");
    title.classList.add("book-title");
    const author = document.createElement("p");
    author.classList.add("book-author");
    const image = document.createElement("img");
    image.classList.add("book-image");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const ownedButton = document.createElement("button");
    ownedButton.classList.add("toggle-button", "owned-button");
    const readButton = document.createElement("button");
    readButton.classList.add("toggle-button", "read-button");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");

    // Add id data attribute
    card.dataset.id = newBook.id;
    removeButton.dataset.id = newBook.id;

    // Set content for card elements
    title.textContent = newBook.title;
    author.textContent = `by ${newBook.author}`;
    image.setAttribute("src", newBook.image);
    image.setAttribute("alt", newBook.title);

    // Add elements to card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(image);

    // Setup buttons
    updateOwnedStatus(newBook, ownedButton);
    updateReadStatus(newBook, readButton);

    removeIcon.setAttribute("src", "icons/remove-icon.svg");
    removeButton.appendChild(removeIcon);

    buttonWrapper.appendChild(ownedButton);
    buttonWrapper.appendChild(readButton);
    buttonWrapper.appendChild(removeButton);
    card.appendChild(buttonWrapper);

    // Add card to display
    display.insertBefore(card, addBookCard);
}

function capitalizeAuthor(author) {
    return author.split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
}

function handleOwnedToggle(ownedButton) {
    const id = ownedButton.dataset.id;
    myLibrary.forEach((book) => {
        if (book.id === id) {
            book.toggleOwnedStatus();
            updateOwnedStatus(book, ownedButton);
        }
    });
}

function handleReadToggle(readButton) {
    const id = readButton.dataset.id;
    myLibrary.forEach((book) => {
        if (book.id === id) {
            book.toggleReadStatus();
            updateReadStatus(book, readButton);
        }
    });
}

function filterByRead(status) {
    clearDisplay();
    myLibrary.forEach((book) => {
        if (book.readStatus === status) {
            displayBook(book);
        }
    });
}

function filterByOwned(status) {
    clearDisplay();
    myLibrary.forEach((book) => {
        if (book.ownedStatus === status) {
            displayBook(book);
        }
    });
}

function clearDisplay() {
    const display = document.querySelector(".display");
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        if (card.id !== "add-book"){
            display.removeChild(card);
        }
    });
}

function displayBook(book) {
    const display = document.querySelector(".display");
    const addBookCard = document.querySelector("#add-book");
    // Create DOM elements for card
    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("h2");
    title.classList.add("book-title");
    const author = document.createElement("p");
    author.classList.add("book-author");
    const image = document.createElement("img");
    image.classList.add("book-image");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const ownedButton = document.createElement("button");
    ownedButton.classList.add("toggle-button", "owned-button");
    const readButton = document.createElement("button");
    readButton.classList.add("toggle-button", "read-button");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");

    // Add id data attribute
    card.dataset.id = book.id;
    removeButton.dataset.id = book.id;
    ownedButton.dataset.id = book.id;
    readButton.dataset.id = book.id;

    // Set content for card elements
    title.textContent = book.title.toLowerCase();
    author.textContent = `by ${book.author}`;
    image.setAttribute("src", book.image);
    image.setAttribute("alt", book.title);

    // Add elements to card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(image);

    // Setup buttons
    updateOwnedStatus(book, ownedButton);
    updateReadStatus(book, readButton);

    removeIcon.setAttribute("src", "icons/remove-icon.svg");
    removeButton.appendChild(removeIcon);

    buttonWrapper.appendChild(ownedButton);
    buttonWrapper.appendChild(readButton);
    buttonWrapper.appendChild(removeButton);
    card.appendChild(buttonWrapper);

    // Add card to display
    display.insertBefore(card, addBookCard);
}

function createClearFilterButton(selectedFilter) {
    const clearFilterButton = document.createElement("button");
    clearFilterButton.setAttribute("id", "clear-filter-button");
    selectedFilter.after(clearFilterButton);
}

function handleClearFilter() {
    removeClearFilterButton();
    clearDisplay();
    displayAllBooks();
}

function removeClearFilterButton() {
    const clearFilterButton = document.querySelector("#clear-filter-button");
    if (clearFilterButton !== null) {
        clearFilterButton.remove();
    }
}

function populateMyLibrary() {
    addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", "images/12-rules-for-life.jpg", true, true);
    addBookToLibrary("The Power of Now", "Eckhart Tolle", "images/the-power-of-now.jpeg", true, false);
    addBookToLibrary("Digital Minimalism", "Cal Newport", "images/digital-minimalism.jpg", true, true);
    addBookToLibrary("1984", "George Orwell", "images/1984.jpg", true, false);
    addBookToLibrary("Mastery", "Robert Greene", "images/mastery.jpg", true, false);
    addBookToLibrary("Frankenstein", "Mary Shelley", "images/frankenstein.jpg", false, true);
    addBookToLibrary("Basic Economics", "Thomas Sowell", "images/basic-economics.jpg", true, false);
    addBookToLibrary("Twelve and a Half", "Gary Vaynerchuk", "images/twelve-and-a-half.jpg", true, false);
    addBookToLibrary("The Art of War", "Sun Tzu", "images/the-art-of-war.jpg", true, false);
    addBookToLibrary("Slow Productivity", "Cal Newport", "images/slow-productivity.jpg", true, false);
    addBookToLibrary("Beyond Order", "Jordan B. Peterson", "images/beyond-order.jpg", true, false);
}

populateMyLibrary();
displayAllBooks();
createListeners();