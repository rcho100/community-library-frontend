class Books {
    constructor() {
        this.books = []
        this.adapter = new BooksAdapter()
        this.fetchAndLoadBooks()
    }

    fetchAndLoadBooks() {
        this.adapter.getBooks()
        .then(booksData => booksData.forEach(book => this.books.push(book)))
        .then(() => this.render())
    }

}