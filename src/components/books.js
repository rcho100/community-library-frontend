let selectedTableRow;
let bookTitle;
let bookAuthor;
let bookAvailability;
let bgModal;
let currentBook;

class Books {
    constructor(token) {
        this.books = []
        this.token = token
        this.adapter = new BooksAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadBooks()
    }

    initBindingsAndEventListeners() {
        this.booksContainer = document.querySelector(".books-container")
        this.tableBody = document.querySelector(".table-body")
        this.returnBookBtn = document.querySelector(".return-button")

        this.returnBookBtn.addEventListener('click', returnBook)

    }

    fetchAndLoadBooks() {
        this.adapter.getBooks()
        .then(data => data.data.forEach(book => this.books.push(new Book(book.attributes))))
        .then(() => this.render())
    }

    render() {
        console.log(this.books)
            
        const tableData = this.books.map(book => {
            return `
            <tr id=${book.id}>
              <td class="book-title">${book.title}</td>
              <td class="book-author">${book.author}</td>
              <td class="book-availability">${book.available}</td>
            </tr>`
        }).join('')

        this.tableBody.innerHTML = tableData
        let tableRows = document.querySelectorAll("tr")
        tableRows.forEach(element => element.addEventListener('dblclick', this.borrowModal.bind(this)));        
    }

    borrowModal(e) {
        selectedTableRow = e.target.parentNode
        let bookID = selectedTableRow.id
        let modalContent = document.querySelector(".modal-content")
        modalContent.innerHTML = `
            <p>Would you like to borrow this book?</p>
            <p id="selected-book"></p>
            <button id="yes" type="button">Yes</button>
            <button id="no" type="button">No</button>
        `
        bgModal = document.querySelector(".bg-modal")
        bgModal.style.display = "flex"

        bookTitle = selectedTableRow.querySelector(".book-title")
        bookAuthor = selectedTableRow.querySelector(".book-author")
        bookAvailability = selectedTableRow.querySelector(".book-availability")

        const selectedBook = modalContent.querySelector("#selected-book")
        selectedBook.innerText = `${bookTitle.innerText} - ${bookAuthor.innerText}`

        document.querySelector("#no").addEventListener('click',() => bgModal.style.display = "none")
        document.querySelector("#yes").addEventListener('click', () => this.borrowBook(bookID))
    }

    borrowBook(bookID) {
        this.adapter.borrow(bookID, this.token)
        .then(json => {
            bookAvailability.innerText = json.data.attributes.available
            currentBook = document.querySelector(".currently-borrowed")
            currentBook.innerText = `${json.data.attributes.title} - ${json.data.attributes.author}`
            return bgModal.style.display = "none"
        })
        .catch(error => console.log(error))
    }
}