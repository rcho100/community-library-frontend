class BooksAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/books"
    }

    getBooks() {
        return fetch(this.baseURL).then(res => res.json())
    }

    borrow(bookID, token) {
        return fetch(`http://localhost:3000/books/${bookID}/borrow`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            },
            body: JSON.stringify({
                book: {
                    id: bookID
                }
            })
        })
        .then(res => res.json())
    }

    returning(bookID, token) {
        return fetch(`http://localhost:3000/books/${bookID}/return`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            },
            body: JSON.stringify({
                book: {
                    id: bookID
                }
            })
        })
        .then(res => res.json())
    }
}