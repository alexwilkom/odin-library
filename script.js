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

const myLibrary = [
    {
        title: "The Hobbit",
        author: "Tolkien",
        pages: 295,
        read: false
    },
    {
        title: "Emma",
        author: "Jane Austen",
        pages: 400,
        read: false
    },
    {
        title: "Swann's Way",
        author: "Marcel Proust",
        pages: 500,
        read: false
    },
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    title.value = "";
    author.value = "";
    pages.value = "";
    errorFormMsg.innerText = "";
    isRead.checked = false;
});

addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
        const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
        myLibrary.push(newBook);
        addBookToLibrary(newBook);
        dialog.close();
    } else {
        errorFormMsg.innerText = "Please fill out all the required(*) details.";
    }
});

function createElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
};

function addBookToLibrary(book) {
    const grid = document.querySelector(".books-grid");
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(createElement("h2", book.title));
    card.appendChild(createElement("p", book.author));
    card.appendChild(createElement("p", `${book.pages} pages`));
    card.appendChild(createElement("p", book.read ? "Read" : "Not read yet"));

    const removeBtn = createElement("button", "Remove")
    removeBtn.setAttribute("type", "button");
    removeBtn.classList.add("btn");
    removeBtn.classList.add("btn-remove");

    card.appendChild(removeBtn);
    grid.appendChild(card);
}

function renderLibrary() {
    myLibrary.forEach(book => {
        addBookToLibrary(book);
    })
}

renderLibrary();