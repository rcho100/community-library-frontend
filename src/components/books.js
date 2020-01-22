class Books {
    constructor() {
        this.books = []
        this.adapter = new BooksAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadBooks()
    }

    initBindingsAndEventListeners() {
        this.booksContainer = document.querySelector("main")
    }

    fetchAndLoadBooks() {
        this.adapter.getBooks()
        .then(booksData => booksData.forEach(book => this.books.push(new Book(book))))
        .then(() => this.render())
    }

    render() {
        console.log(this.books)
        this.booksContainer.innerHTML = this.books.map(book => `<li>${book.title} - ${book.author}</li>`).join("")
    }
}