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
    }

    createUser(e) {
        e.preventDefault();
        console.log('User is being created')
        const userName = e.target.name.value
        const userEmail = e.target.email.value
        const userPassword = e.target.password.value
        const signupInfo = {
            user: {
                name: userName,
                email: userEmail,
                password: userPassword
            }
        }
        this.adapter.signupUser(signupInfo)
        .then(json => this.users.push(new User(json.user.data.attributes)))
        .then(() => this.clearAndRender())
    }

    retrieveUser(e) {
        e.preventDefault();
        console.log('User is being retrieved')
    
    }

    clearAndRender() {
        let currentUser = this.users.slice(-1)[0]
        this.container.innerHTML = `
            <header>
                <nav>
                    <ul>
                        <li>Community Library</li>
                        <li>Profile</li>
                        <li>Signout</li>
                    </ul>
                <h3>Welcome ${currentUser.name}!</h3>
                </nav>
            </header>
            <main>
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
            </main>
        `

        let displayBooks = new Books()
    }
}