class Book {

    constructor(title, author, image, ownedStatus, readStatus) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.image = image;
        this.ownedStatus = ownedStatus;
        this.readStatus = readStatus;
    }

    toggleOwnedStatus() {
        if (this.ownedStatus) {
            this.ownedStatus = false;
        }
        else {
            this.ownedStatus = true;
        }
    }

    toggleReadStatus() {
        if (this.readStatus) {
            this.readStatus = false;
        }
        else {
            this.readStatus = true;
        }
    }
}

class Library {
    
    static myLibrary = [];

    static get myLibrary() {
        return myLibrary;
    }

    static addBookToLibrary(title, author, image, ownedStatus, readStatus) {
        let book = new Book(title, author, image, ownedStatus, readStatus);
        this.myLibrary.push(book);
    }

    static removeBookFromLibrary(id) {
        const bookIndex = this.myLibrary.findIndex((book) => book.id === id);
        this.myLibrary.splice(bookIndex, 1);
    }

    static {
        this.addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", "images/12-rules-for-life.jpg", true, true);
        this.addBookToLibrary("The Power of Now", "Eckhart Tolle", "images/the-power-of-now.jpeg", true, false);
        this.addBookToLibrary("Digital Minimalism", "Cal Newport", "images/digital-minimalism.jpg", true, true);
        this.addBookToLibrary("1984", "George Orwell", "images/1984.jpg", true, false);
        this.addBookToLibrary("Mastery", "Robert Greene", "images/mastery.jpg", true, false);
        this.addBookToLibrary("Frankenstein", "Mary Shelley", "images/frankenstein.jpg", false, true);
        this.addBookToLibrary("Basic Economics", "Thomas Sowell", "images/basic-economics.jpg", true, false);
        this.addBookToLibrary("Twelve and a Half", "Gary Vaynerchuk", "images/twelve-and-a-half.jpg", true, false);
        this.addBookToLibrary("The Art of War", "Sun Tzu", "images/the-art-of-war.jpg", true, false);
        this.addBookToLibrary("Slow Productivity", "Cal Newport", "images/slow-productivity.jpg", true, false);
        this.addBookToLibrary("Beyond Order", "Jordan B. Peterson", "images/beyond-order.jpg", true, false);
    }
}

class DisplayController {

    constructor() {
        this.#createListeners();
    }

    #createListeners() {
        const display = document.querySelector(".display");
        display.addEventListener("click", (event) => {
            const removeButton = event.target.closest(".remove-button");
            if (removeButton) {
                this.handleRemove(removeButton);
            }
            else if (event.target.closest("#add-book")) {
                this.addModalInputEvents();
                this.openAddDialog();
            }
            else if (event.target.classList.contains("owned-button")) {
                this.handleOwnedToggle(event.target);
            }
            else if (event.target.classList.contains("read-button")) {
                this.handleReadToggle(event.target);
            }
        });
    
        const buttonWrapper = document.querySelector(".form-button-wrapper");
        const addDialog = document.querySelector("#add-dialog");
        buttonWrapper.addEventListener("click", (event) => {
            const id = event.target.getAttribute("id");
            if (id === "cancel-button") {
                this.clearFields();
                this.removeModalInputEvents();
                addDialog.close();
            }
    
            else if (id === "add-button") {
                event.preventDefault();

                if (!this.submitIsValid(this.nameIsValid, 
                                        this.authorIsValid, 
                                        this.imageIsValid)) {
                    return;
                }

                this.handleAddNewBook();
                this.removeModalInputEvents();
                addDialog.close();
            }
        });
    
        const filterContainer = document.querySelector(".filters");
        filterContainer.addEventListener("click", (event) => {
            const filterType = event.target.textContent;
            switch (filterType) {
                case "read":
                    this.removeClearFilterButton();
                    this.filterByRead(true);
                    this.updateFilterStyle(event.target);
                    this.createClearFilterButton(event.target);
                    break;
    
                case "unread":
                    this.removeClearFilterButton();
                    this.filterByRead(false);
                    this.updateFilterStyle(event.target);
                    this.createClearFilterButton(event.target);
                    break;
    
                case "owned":
                    this.removeClearFilterButton();
                    this.filterByOwned(true);
                    this.updateFilterStyle(event.target);
                    this.createClearFilterButton(event.target);
                    break;
    
                case "unowned":
                    this.removeClearFilterButton();
                    this.filterByOwned(false);
                    this.updateFilterStyle(event.target);
                    this.createClearFilterButton(event.target);
                    break;
            }
    
            if (event.target.closest("#clear-filter-button")) {
                this.updateFilterStyle(event.target);
                this.handleClearFilter();
            }
        });
    }

    updateOwnedStatus(book, ownedButton) {
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

    updateReadStatus(book, readButton) {
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

    updateFilterStyle(selectedButton) {
        const selectedID = selectedButton.getAttribute("id")
        const filterButtons = document.querySelectorAll(".filter-button");
    
        if (selectedID === "clear-filter-button") {
            filterButtons.forEach((button) => button.classList.remove("selected-filter"));
        }
    
        else {
            filterButtons.forEach((button) => {
                const buttonID = button.getAttribute("id");
                const selectedID = selectedButton.getAttribute("id")
        
                if (buttonID === selectedID && !(button.classList.contains("selected-filter"))) {
                    button.classList.add("selected-filter");
                }
                else if (buttonID !== selectedID && button.classList.contains("selected-filter")) {
                    button.classList.remove("selected-filter");
                }
        
            })
        }
    }

    displayAllBooks() {
        const display = document.querySelector(".display");
        const addBookCard = document.querySelector("#add-book");
        Library.myLibrary.forEach((book) => {
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
            this.updateOwnedStatus(book, ownedButton);
            this.updateReadStatus(book, readButton);
    
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

    handleRemove(removeButton) {
        const id = removeButton.dataset.id;
    
        // Remove from Library array
        Library.removeBookFromLibrary(id);
    
        // Remove from dom
        const display = document.querySelector(".display");
        const card = document.querySelector(`.card[data-id="${id}"]`)
        display.removeChild(card);
    }

    addModalInputEvents() {
        const nameInput = document.querySelector("#book-name");
        const authorInput = document.querySelector("#author");
        const imageInput = document.querySelector("#image-file");
        const submitButton = document.querySelector("#add-button");
    
        nameInput.addEventListener("input", this.handleNameInput);
        authorInput.addEventListener("input", this.handleAuthorInput);
        imageInput.addEventListener("input", this.handleImageInput);
        submitButton.addEventListener("submit", this.handleSubmission)
    }

    removeModalInputEvents() {
        const nameInput = document.querySelector("#book-name");
        const authorInput = document.querySelector("#author");
        const imageInput = document.querySelector("#image-file");
    
        nameInput.removeEventListener("input", this.handleNameInput);
        authorInput.removeEventListener("input", this.handleAuthorInput);
        imageInput.removeEventListener("input", this.handleImageInput);
    }

    openAddDialog() {
        const addDialog = document.querySelector("#add-dialog");
        addDialog.showModal();
    }

    handleNameInput() {
        const nameInput = document.querySelector("#book-name");

        if (nameInput.validity.tooLong) {
            nameInput.setCustomValidity(`Book name cannot be longer than ${nameInput.maxLength} characters.
                Currently: ${nameInput.value.length} characters`);
        } else {
            nameInput.setCustomValidity("");
        }
        nameInput.reportValidity();
    }

    handleAuthorInput() {
        const authorInput = document.querySelector("#author");

        if (authorInput.validity.tooShort) {
            authorInput.setCustomValidity(`Author cannot be shorter than ${authorInput.minLength} characters.
                Currently: ${authorInput.value.length} characters`);
        } else if (authorInput.validity.tooLong) {
            authorInput.setCustomValidity(`Author cannot be longer than ${authorInput.maxLength} characters.
                Currently: ${authorInput.value.length} characters`);
        } else {
            authorInput.setCustomValidity("");
        }
        authorInput.reportValidity();
    }

    handleImageInput() {
        const imageInput = document.querySelector("#image-file");
        const imageFile = imageInput.files;

        if (imageFile.length > 0) {
            if (imageFile[0].size > 5 * 1000 * 1000) {
                imageInput.setCustomValidity("Image file size cannot exceed 5 MB.");
            } else {
                imageInput.setCustomValidity("");
            }
            imageInput.reportValidity();
        }
    }

    submitIsValid(nameIsValid, authorIsValid, imageIsValid) {
        return nameIsValid() && authorIsValid() && imageIsValid();
    }

    nameIsValid() {
        const nameInput = document.querySelector("#book-name");
        
        if (nameInput.validity.valueMissing) {
            nameInput.setCustomValidity("Name of book missing. Enter the name of your book.");
            nameInput.reportValidity();
            return false;
        } else if (nameInput.validity.tooLong) {
            nameInput.setCustomValidity(`Book name cannot be longer than ${nameInput.maxLength} characters.
                Currently: ${nameInput.value.length} characters`);
            nameInput.reportValidity();
            return false;
        } else {
            nameInput.setCustomValidity("");
            nameInput.reportValidity();
            return true;
        }
    }

    authorIsValid() {
        const authorInput = document.querySelector("#author");

        if (authorInput.validity.valueMissing) {
            authorInput.setCustomValidity("Name of author missing. Enter the name of the author.");
            authorInput.reportValidity();
            return false;
        } else if (authorInput.validity.tooShort) {
            authorInput.setCustomValidity(`Author cannot be shorter than ${authorInput.minLength} characters.
                Currently: ${authorInput.value.length} characters`);
            authorInput.reportValidity();
            return false;
        } else if (authorInput.validity.tooLong) {
            authorInput.setCustomValidity(`Author cannot be longer than ${authorInput.maxLength} characters.
                Currently: ${authorInput.value.length} characters`);
            authorInput.reportValidity();
            return false;
        } else {
            authorInput.setCustomValidity("");
            authorInput.reportValidity();
            return true;
        }
    }

    imageIsValid() {
        const imageInput = document.querySelector("#image-file");
        const imageFile = imageInput.files;

        if (imageFile.length > 0) {
            if (imageFile[0].size > 5 * 1000 * 1000) {
                imageInput.setCustomValidity("Image file size cannot exceed 5 MB.");
                imageInput.reportValidity();
                return false;
            } else {
                imageInput.setCustomValidity("");
                imageInput.reportValidity();
                return true;
            }
        } else {
            imageInput.setCustomValidity("Image required. Select an image.")
            imageInput.reportValidity();
            return false;
        }
    }

    handleAddNewBook() {
        const bookRaw = document.querySelector("#book-name").value;
        const bookName = bookRaw.toLowerCase();
        const authorRaw = document.querySelector("#author").value;
        const author = this.capitalizeAuthor(authorRaw);
        const imageObj = document.querySelector("#image-file").files[0];
        const image = URL.createObjectURL(imageObj);
        const ownedStatus = document.querySelector("#owned-status").checked;
        const readStatus = document.querySelector("#read-status").checked;
    
        this.clearFields();
    
        Library.addBookToLibrary(bookName, author, image, ownedStatus, readStatus);
        this.displayNewBook();
    }

    clearFields() {
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

    displayNewBook() {
        const newBook = Library.myLibrary.at(-1);
    
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
        ownedButton.dataset.id = newBook.id;
        readButton.dataset.id = newBook.id;
    
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
        this.updateOwnedStatus(newBook, ownedButton);
        this.updateReadStatus(newBook, readButton);
    
        removeIcon.setAttribute("src", "icons/remove-icon.svg");
        removeButton.appendChild(removeIcon);
    
        buttonWrapper.appendChild(ownedButton);
        buttonWrapper.appendChild(readButton);
        buttonWrapper.appendChild(removeButton);
        card.appendChild(buttonWrapper);
    
        // Add card to display
        display.insertBefore(card, addBookCard);
    }

    capitalizeAuthor(author) {
        return author.split(" ")
                    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
    }

    handleOwnedToggle(ownedButton) {
        const id = ownedButton.dataset.id;
        Library.myLibrary.forEach((book) => {
            if (book.id === id) {
                book.toggleOwnedStatus();
                this.updateOwnedStatus(book, ownedButton);
            }
        });
    }

    handleReadToggle(readButton) {
        const id = readButton.dataset.id;
        Library.myLibrary.forEach((book) => {
            if (book.id === id) {
                book.toggleReadStatus();
                this.updateReadStatus(book, readButton);
            }
        });
    }

    filterByRead(status) {
        this.clearDisplay();
        Library.myLibrary.forEach((book) => {
            if (book.readStatus === status) {
                this.displayBook(book);
            }
        });
    }

    filterByOwned(status) {
        this.clearDisplay();
        Library.myLibrary.forEach((book) => {
            if (book.ownedStatus === status) {
                this.displayBook(book);
            }
        });
    }

    clearDisplay() {
        const display = document.querySelector(".display");
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            if (card.id !== "add-book"){
                display.removeChild(card);
            }
        });
    }

    displayBook(book) {
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
        this.updateOwnedStatus(book, ownedButton);
        this.updateReadStatus(book, readButton);
    
        removeIcon.setAttribute("src", "icons/remove-icon.svg");
        removeButton.appendChild(removeIcon);
    
        buttonWrapper.appendChild(ownedButton);
        buttonWrapper.appendChild(readButton);
        buttonWrapper.appendChild(removeButton);
        card.appendChild(buttonWrapper);
    
        // Add card to display
        display.insertBefore(card, addBookCard);
    }

    createClearFilterButton(selectedFilter) {
        const clearFilterButton = document.createElement("button");
        clearFilterButton.setAttribute("id", "clear-filter-button");
        const clearIcon = document.createElement("img");
    
        clearIcon.classList.add("clear-icon");
        clearIcon.setAttribute("src", "icons/remove-icon.svg");
    
        clearFilterButton.appendChild(clearIcon);
        selectedFilter.after(clearFilterButton);
    }

    handleClearFilter() {
        this.removeClearFilterButton();
        this.clearDisplay();
        this.displayAllBooks();
    }

    removeClearFilterButton() {
        const clearFilterButton = document.querySelector("#clear-filter-button");
        if (clearFilterButton !== null) {
            clearFilterButton.remove();
        }
    }
}

const displayController = new DisplayController();
displayController.displayAllBooks();