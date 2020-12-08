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
            if (json.error) {
                let errorMsg = document.body.querySelector("#signup-error")
                e.target.name.value = ''
                e.target.email.value = ''
                e.target.password.value = ''
                errorMsg.innerText = json.error
            } else {
                this.token = json.jwt
                return this.users.push(new User(json.user.data.attributes))
            }
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
            if (json.error) {
                let errorMsg = document.body.querySelector("#login-error")
                errorMsg.innerText = json.error
            } else {
                this.token = json.jwt
                if (json.user.included[0]) {
                    this.currentlyBorrowed = {
                        id: json.user.included[0].id,
                        title: json.user.included[0].attributes.title,
                        author: json.user.included[0].attributes.author,
                        available: json.user.included[0].attributes.available
                    }
                }
                this.users.push(new User(json.user.data.attributes))
                this.clearAndRender()
            }
        })
    }

    clearAndRender() {
        let currentUser = this.users.slice(-1)[0]
        this.container.style.width = "95%"
        this.container.innerHTML = `
            <header>
                <h1>Community Library</h1>
                <h3 class="signout">Signout</h3>
            </header>
            <main>
                <div class="current-and-all-books">
                    <div class="current-book-section">
                        <h3>Welcome ${currentUser.name}!</h3>
                        <p>
                            Please double click to borrow a book from the list. If you are already borrowing a book, please return the book before borrowing another book.
                        </p>    
                        <p>
                            Book you are currently borrowing:
                        </p>
                        <ul>
                            <li class="currently-borrowed" data-borrowed-id="0">No book borrowed currently</li>
                        </ul>
                        <button type="submit" class="return-button">Return Book</button>
                    </div>
                    <div class="books-container">
                    </div>
                </div>
            </main>
        `
        this.main = document.getElementsByTagName("main")[0]
        this.container.style.fontSize = "1.5rem"
        let displayCurrentlyBorrowed = document.querySelector(".currently-borrowed")
        if (this.currentlyBorrowed) {
            displayCurrentlyBorrowed.setAttribute('data-borrowed-id', `${this.currentlyBorrowed.id}`)
            displayCurrentlyBorrowed.innerText = `${this.currentlyBorrowed.title} - ${this.currentlyBorrowed.author}`
        }
        let displayBooks = new Books(this.token, displayCurrentlyBorrowed)
        let sortBtn = document.querySelector("#sort-btn")
        sortBtn.addEventListener('click', (e) => {
            
            displayBooks.books.sort((a, b) => {
                let firstAuthor = a.author.split(' ')[a.author.split(' ').length - 1]
                let secondAuthor = b.author.split(' ')[b.author.split(' ').length - 1]
                
                if (firstAuthor < secondAuthor) {
                    return -1;
                }
                if (firstAuthor > secondAuthor) {
                    return 1;
                }
                return 0;
            })
            displayBooks.render()
        })
    }
}