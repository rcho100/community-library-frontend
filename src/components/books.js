class Books {
    constructor() {
        this.books = []
        this.adapter = new BooksAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadBooks()
    }

    initBindingsAndEventListeners() {
        this.booksContainer = document.querySelector(".books-container")
        this.tableBody = document.querySelector(".table-body")
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
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.available}</td>
            </tr>`
        }).join('')

        this.tableBody.innerHTML = tableData
        let tableRows = document.querySelectorAll("tr")
        tableRows.forEach(element => element.addEventListener('dblclick', this.borrowModal.bind(this)));        
    }

    borrowModal(e) {
        let modalContent = document.querySelector(".modal-content")
        modalContent.innerHTML = `
            <p>Would you like to borrow this book?</p>
            <button id="yes" type="button">Yes</button>
            <button id="no" type="button">No</button>
        `
        let bgModal = document.querySelector(".bg-modal")
        bgModal.style.display = "flex"
        
    }

}