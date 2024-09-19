// DOM Elements
const newBookBtn = document.querySelector(".new-book-btn");
const dialog = document.querySelector("dialog");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isRead = document.querySelector("#read");
const addBookBtn = document.querySelector("#add-book-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const form = document.querySelector("form");
const errorFormMsg = document.querySelector(".error-message-form");
const grid = document.querySelector(".books-grid");

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [
            new Book("The Hobbit", "Tolkien", 295, false),
            new Book("Emma", "Jane Austen", 400, false),
            new Book("Swann's Way", "Marcel Proust", 500, false),
            new Book("Meditations", "Marcus Aurelius", 500, true),
            new Book("Meditations", "Marcus Aurelius", 500, true),
        ];
    }

    addBook(book) {
        this.books.push(book);
        this.render();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.render();
    }

    toggleReadStatus(index) {
        this.books[index].toggleReadStatus();
        this.render();
    }

    resetDialog() {
        title.value = "";
        author.value = "";
        pages.value = "";
        errorFormMsg.innerText = "";
        isRead.checked = false;
    }

    createElement(tag, text) {
        const element = document.createElement(tag);
        element.innerText = text;
        return element;
    }

    createCard(book, index) {
        const card = document.createElement("div");
        const readStatusBtn = this.createElement("button", book.read ? "Read" : "Not read");
        const removeBtn = this.createElement("button", "Remove");
        const btnContainer = document.createElement("div");

        card.classList.add("card");
        card.setAttribute("data-key", index);
        card.appendChild(this.createElement("h2", book.title));
        card.appendChild(this.createElement("p", book.author));
        card.appendChild(this.createElement("p", `${book.pages} pages`));

        readStatusBtn.setAttribute("type", "button");
        readStatusBtn.classList.add("btn", "btn-read");

        removeBtn.setAttribute("type", "button");
        removeBtn.classList.add("btn", "btn-remove");

        btnContainer.appendChild(readStatusBtn);
        btnContainer.appendChild(removeBtn);
        btnContainer.classList.add("flex-btn");

        card.appendChild(btnContainer);

        return card;
    }

    render() {
        grid.innerHTML = "";
        this.books.forEach((book, index) => {
            grid.appendChild(this.createCard(book, index));
        });
    }
}

// Initialize the library
const myLibrary = new Library();

// Event Handlers
function handleAddBook(event) {
    event.preventDefault();
    if (form.checkValidity()) {
        const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
        myLibrary.addBook(newBook);
        dialog.close();
    } else {
        errorFormMsg.innerText = "Please fill out all the required(*) details.";
    }
}

function handleRemoveOrToggleRead(event) {
    const bookCard = event.target.closest(".card");
    if (!bookCard) return;
    const index = bookCard.dataset.key;

    if (event.target.classList.contains("btn-remove")) {
        myLibrary.removeBook(index);
    } else if (event.target.classList.contains("btn-read")) {
        myLibrary.toggleReadStatus(index);
    }
}

// Event Listeners
newBookBtn.addEventListener("click", () => {
    myLibrary.resetDialog();
    dialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    myLibrary.resetDialog();
});

addBookBtn.addEventListener("click", handleAddBook);

grid.addEventListener("click", handleRemoveOrToggleRead);

// Render the initial library
myLibrary.render();