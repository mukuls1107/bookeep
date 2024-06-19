const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#add-book");
const showLibraryBtn = document.querySelector("#library");
const bookSection = document.querySelector(".book-section");
const bookForm = document.querySelector("#book-form");
const closeDialogBtn = document.querySelector(".close-dialog");

const myLibrary = [];

function Book(title, author, numOfPages, status) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.status = status;
}

function addBookToLibrary(event) {
    event.preventDefault();
    bookSection.style.opacity = 0;

    const title = bookForm.name.value;
    const author = bookForm.author.value;
    const numOfPages = bookForm.page.value;
    const status = bookForm.status.value;

    const newBook = new Book(title, author, numOfPages, status);
    myLibrary.push(newBook);

    console.log(`${title} has been added!`);
    dialog.close();
    dialog.style.display = "none"

    bookForm.reset();
}

function findBook() {
    bookSection.innerHTML = '';

    if (myLibrary.length <= 0) {
        console.log("Sorry! The Library is Empty for now :(");
        return;
    }

    for (let i = 0; i < myLibrary.length; i++) {
        let book = document.createElement("div");
        book.setAttribute("class", "book");

        let name = document.createElement("span");
        name.innerHTML = `Title: <b>${myLibrary[i].title}</b>`;
        let author = document.createElement("span");
        author.innerHTML = `Author: <b>${myLibrary[i].author}</b>`;
        let pages = document.createElement("span");
        pages.innerHTML = `Pages: <b>${myLibrary[i].numOfPages}</b>`;
        let status = document.createElement("span");
        status.innerHTML = `Status: <b>${myLibrary[i].status === 'read' ? "Read" : "Unread"}</b>`;

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Delete"

        book.appendChild(name);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(status);
        book.appendChild(removeBtn)
        bookSection.appendChild(book);
        bookSection.style.opacity = 1;
        removeBtn.setAttribute("id", "remove-book");
        removeBtn.style.display = "flex"
        removeBtn.style.alignItems = "center"
        removeBtn.style.fontSize = "18px"
        removeBtn.addEventListener("click", () => {
            console.log(`Received request for removing title:  "${myLibrary[i].title}" `);
            const index = myLibrary.indexOf(myLibrary[i])
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            bookSection.removeChild(book)
        })

        console.log(`${myLibrary[i].title} was written by ${myLibrary[i].author} and it has around ${myLibrary[i].numOfPages} pages!`);
    }
}

addBtn.addEventListener("click", () => {

    dialog.showModal();
    dialog.style.display = "flex"
});

showLibraryBtn.addEventListener("click", findBook);

bookForm.addEventListener("submit", addBookToLibrary);
closeDialogBtn.addEventListener("click", () => dialog.close());
