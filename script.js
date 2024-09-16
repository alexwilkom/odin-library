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
    {
        title: "Swann's Way",
        author: "Marcel Proust",
        pages: 500,
        read: false
    },
    {
        title: "Swann's Way",
        author: "Marcel Proust",
        pages: 500,
        read: false
    },
    {
        title: "Swann's Way",
        author: "Marcel Proust",
        pages: 500,
        read: false
    },
];

const newBookBtn = document.querySelector(".new-book-btn");
const dialog = document.querySelector("dialog");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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
    grid.appendChild(card);
}

myLibrary.forEach(book => {
    addBookToLibrary(book);
})