class Users {
    constructor() {
        this.users = []
        this.adapter = new UsersAdapter()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners() {
        this.signupForm = document.querySelector(".signup-form")
        this.loginForm = document.querySelector(".login-form")
        this.container = document.querySelector(".container")

        this.signupForm.addEventListener('submit', this.createUser.bind(this));
        this.loginForm.addEventListener('submit', this.retrieveUser.bind(this));
        
        //using event delegation
        this.container.onclick = (event) => {
            let signoutBtn = event.target.closest(".signout");
            if(!signoutBtn) return;
            if(!this.container.contains(signoutBtn)) return;
            location.reload();
        }
    }

    createUser(e) {
        e.preventDefault();
        console.log('User is being created')
        let userName = e.target.name.value
        let userEmail = e.target.email.value
        let userPassword = e.target.password.value
        const signupInfo = {
            user: {
                name: userName,
                email: userEmail,
                password: userPassword
            }
        }
        this.adapter.signupUser(signupInfo)
        .then((json) => {
            this.token = json.jwt
            return this.users.push(new User(json.user.data.attributes))
        })
        .then(() => this.clearAndRender())
    }

    retrieveUser(e) {
        e.preventDefault();
        console.log('User is being retrieved')
        let userEmail = e.target.email.value
        let userPassword = e.target.password.value
        const loginInfo = {
            user: {
                email: userEmail,
                password: userPassword
            }
        }
        this.adapter.loginUser(loginInfo)
        .then((json) => {
            this.token = json.jwt
            if (json.user.included[0]) {
                console.log('what is this', this)
                this.currentlyBorrowed = {
                    id: json.user.included[0].id,
                    title: json.user.included[0].attributes.title,
                    author: json.user.included[0].attributes.author,
                    available: json.user.included[0].attributes.available
                }
            }
            console.log('currently borrowed', this.currentlyBorrowed)
            console.log('userinfo', json)
            console.log('userID', json.user.data.id)
            // console.log('bookTitleBorrowedByUser', json.user.included[0].attributes.title)
            // console.log('bookAuthorBorrowedByUser', json.user.included[0].attributes.author)
            // console.log('bookAuthorBorrowedByUser', json.user.included[0].attributes.available)

            return this.users.push(new User(json.user.data.attributes))
        })
        .then(() => this.clearAndRender())
        .catch(error => console.log(error))
    }

    clearAndRender() {
        let currentUser = this.users.slice(-1)[0]
        this.container.innerHTML = `
            <header>
                <h1>Community Library</h1>
                <h3 class="signout">Signout</h3>
            </header>
            <main>
                <h3>Welcome ${currentUser.name}!</h3>
                <p>Please double click to borrow a book from the list. If you are already borrowing a book, please return the book before borrowing another book.</p>
                <div class="current-and-all-books">
                    <div class="current-book-section">
                        <p>Book you are currently borrowing:</p>
                        <ul>
                            <li class="currently-borrowed" data-borrowed-id="0">No book borrowed currently</li>
                        </ul>
                        <button type="submit" class="return-button">Return Book</button>
                    </div>
                    <div class="books-container">
                        <table class="main-table">
                            <thead>
                                <th>Title</th>
                                <th>Book</th>
                                <th>Available</th>
                            </thead>
                            <tbody class="table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        `
        this.container.style.backgroundColor = "white"
        this.container.style.alignItems = "flex-start"
        this.container.style.alignContent = "flex-start"
        this.container.style.padding = "5%"
        let displayCurrentlyBorrowed = document.querySelector(".currently-borrowed")
        if (this.currentlyBorrowed) {
            displayCurrentlyBorrowed.setAttribute('data-borrowed-id', `${this.currentlyBorrowed.id}`)
            displayCurrentlyBorrowed.innerText = `${this.currentlyBorrowed.title} - ${this.currentlyBorrowed.author}`
        }
        let displayBooks = new Books(this.token, displayCurrentlyBorrowed)
    }
}