class Books {
    constructor() {
        this.books = []
        this.adapter = new BooksAdapter()
        this.fetchAndLoadBooks()
    }

    fetchAndLoadBooks() {
        this.adapter.getBooks()
        .then(booksData => booksData.forEach(book => this.books.push(new Book(book))))
        .then(() => this.render())
    }

    render() {
        const booksContainer = document.querySelector("main")
        console.log(this.books)
        
        booksContainer.innerHTML = this.books.map(book => `<li>${book.title} - ${book.author}</li>`).join("")

    }
}