class BooksAdapter {
    constructor() {
        this.baseURL = "https://community-library-api.herokuapp.com/books"
    }

    getBooks() {
        return fetch(this.baseURL).then(res => res.json())
    }

    borrow(bookID, token) {
        return fetch(`${this.baseURL}/${bookID}/borrow`, {
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
        return fetch(`${this.baseURL}/${bookID}/return`, {
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