class BooksAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/books"
    }

    getBooks() {
        return fetch(this.baseURL).then(res => res.json())
    }
}