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

const myLibrary = [
    new Book("The Hobbit", "Tolkien", 295, false),
    new Book("Emma", "Jane Austen", 400, false),
    new Book("Swann's Way", "Marcel Proust", 500, false),
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function resetDialog() {
    title.value = "";
    author.value = "";
    pages.value = "";
    errorFormMsg.innerText = "";
    isRead.checked = false;
}

function createElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

function createCard(book, key) {
    const card = document.createElement("div");
    const readStatusBtn = createElement("button", book.read ? "Read" : "Not read yet");
    const removeBtn = createElement("button", "Remove");
    const btnContainer = document.createElement("div");

    card.classList.add("card");
    card.setAttribute("data-key", key);
    card.appendChild(createElement("h2", book.title));
    card.appendChild(createElement("p", book.author));
    card.appendChild(createElement("p", `${book.pages} pages`));

    readStatusBtn.setAttribute("type", "button");
    readStatusBtn.classList.add("btn");
    readStatusBtn.classList.add("btn-read");

    removeBtn.setAttribute("type", "button");
    removeBtn.classList.add("btn");
    removeBtn.classList.add("btn-remove");

    btnContainer.appendChild(readStatusBtn);
    btnContainer.appendChild(removeBtn);
    btnContainer.classList.add("flex-btn");

    card.appendChild(btnContainer);

    return card
}

function addBookToGrid(book, key) {
    const card = createCard(book, key);
    grid.appendChild(card);
}

function renderLibrary() {
    myLibrary.forEach((book, index) => {
        addBookToGrid(book, index);
    })
}

function removeBook(event) {
    if (event.target.classList.contains("btn-remove")) {
        const bookCard = event.target.closest(".card");
        const key = bookCard.dataset.key;

        myLibrary.splice(key, 1);

        grid.innerHTML = "";
        renderLibrary();
    }
}

function toggleReadStatus(event) {
    if (event.target.classList.contains("btn-read")) {
        const bookCard = event.target.closest(".card");
        const key = bookCard.dataset.key;
        const book = myLibrary[key];
        const readBtn = document.querySelector(`[data-key="${key}"] .btn-read`);

        myLibrary[key].toggleReadStatus();
        readBtn.innerText = book.read ? "Read" : "Not read yet";
    }
}

function addBookToLibrary() {
    if (form.checkValidity()) {
        const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
        myLibrary.push(newBook);
        const bookIndex = myLibrary.length - 1;
        addBookToGrid(newBook, bookIndex);
        dialog.close();
    } else {
        errorFormMsg.innerText = "Please fill out all the required(*) details.";
    }
}

newBookBtn.addEventListener("click", () => {
    resetDialog();
    dialog.showModal();
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    resetDialog();
});

addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
});

grid.addEventListener("click", (event) => {
    removeBook(event);
    toggleReadStatus(event);
});

renderLibrary();
