class Books {
    constructor() {
        this.books = []
        this.adapter = new BooksAdapter()
        this.fetchAndLoadBooks()
    }

    fetchAndLoadBooks() {
        this.adapter.getBooks().then(notes => console.log(notes))
    }
}