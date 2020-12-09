let selectedTableRow;
let bookTitle;
let bookAuthor;
let bookAvailability;
let bgModal;

class Books {
    constructor(token, displayCurrentlyBorrowed) {
        this.books = []
        this.token = token
        this.displayCurrentlyBorrowed = displayCurrentlyBorrowed
        this.adapter = new BooksAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadBooks()
    }

    initBindingsAndEventListeners() {
        this.booksContainer = document.querySelector(".books-container")
        this.tableBody = document.querySelector(".table-body")
        this.returnBookBtn = document.querySelector(".return-button")

        this.returnBookBtn.addEventListener('click', this.returnBook.bind(this))

    }

    fetchAndLoadBooks() {
        this.adapter.getBooks()
        .then(data => {
            console.log('fetching & loading books', data)
            console.log(data.included)
            console.log(data.included[1])
            // console.log(data.included[1].relationships.books.data[0].id)
    
            data.data.forEach(book => this.books.push(new Book(book.attributes)))
        })
        .then(() => this.render())
    }

    render() {
        console.log('all books', this.books)

        this.booksContainer.innerHTML = this.books.map(book => {
            return `
                <div id=${book.id} class="library-book">
                    <div class="book-drawing">
                        <div class="book-drawing-cover">${book.title}</div>
                        <div class="book-drawing-spine"></div>
                        <div class="book-drawing-footer"></div>
                    </div>
                    <div class="additional-book-info">
                        <p>${book.author}</p>
                        ${book.available ? "<button class='borrow-btn'>Borrow</button>" : "<p>Currently Out</p>"}
                    </div>
                </div>
            `
        }).join('')

        const borrowBtn = document.querySelectorAll(".borrow-btn")
        borrowBtn.forEach(btn => btn.addEventListener('click', this.borrowModal.bind(this)));   
    }

    borrowModal(e) {
        if (this.displayCurrentlyBorrowed.innerText !== "No book borrowed currently") {
            alert("You can only borrow one book at a time. Please first return currently borrowed book to borrow another book.")   
        } else {
            let modalContent = document.querySelector(".modal-content")
            modalContent.innerHTML = `
                <p>Would you like to borrow this book?</p>
                <p id="selected-book-display"></p>
                <button id="yes" type="button">Yes</button>
                <button id="no" type="button">No</button>
            `
            bgModal = document.querySelector(".bg-modal")
            bgModal.style.display = "block"

            let bookID = e.target.parentNode.parentNode.getAttribute('id')
            let selectedBook = this.books.find(book => book.id == bookID)
            const selectedBookDisplay = modalContent.querySelector("#selected-book-display")
            selectedBookDisplay.innerText = `${selectedBook.title} - ${selectedBook.author}`

            document.querySelector("#no").addEventListener('click',() => bgModal.style.display = "none")
            document.querySelector("#yes").addEventListener('click', () => this.borrowBook(bookID))
        }
    }

    borrowBook(bookID) {
        this.adapter.borrow(bookID, this.token)
        .then(json => {
            bookAvailability.innerText = json.data.attributes.available
            this.displayCurrentlyBorrowed = document.querySelector(".currently-borrowed")
            this.displayCurrentlyBorrowed.setAttribute('data-borrowed-ID', `${json.data.attributes.id}`)

            this.displayCurrentlyBorrowed.innerText = `${json.data.attributes.title} - ${json.data.attributes.author}`
            return bgModal.style.display = "none"
        })
        .catch(error => console.log(error))
    }

    returnBook(e) {
        e.preventDefault();
        if (this.displayCurrentlyBorrowed.innerText === "No book borrowed currently") {
            alert("You do not have a book to return at this time.")   
        } else {
            let bookID = this.displayCurrentlyBorrowed.dataset.borrowedId
            console.log('this inside returnBook if', this)
            this.adapter.returning(bookID, this.token)
            .then(json => {
                console.log('returned book json', json)
                // get table row by data-id and update book availability displayed in book list
                selectedTableRow = document.querySelectorAll(`[data-id='${json.data.attributes.id}']`)[0]
                selectedTableRow.querySelector(".book-availability").textContent = `${json.data.attributes.available}`

                //update book borrowed section to 'No book borrowed currently' and change data-borrowed-id to '0'
                this.displayCurrentlyBorrowed.innerText = "No book borrowed currently"
                this.displayCurrentlyBorrowed.dataset.borrowedId = "0"
            })
            .catch(error => console.log(error))
        }
    }
}