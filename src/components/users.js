class Users {
    constructor() {
        this.users = []
        this.adapter = new UsersAdapter()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners() {
        this.signupForm = document.querySelector(".signup-form")
        this.signupForm.addEventListener('submit', this.createUser.bind(this));
    }

    createUser(e) {
        e.preventDefault();
        console.log('User is being created')
        const userName = e.target.name.value
        const userEmail = e.target.email.value
        const userPassword = e.target.password.value
        const signupInfo = {
            user: {
                user: userName,
                email: userEmail,
                password: userPassword
            }
        }
        console.log(signupInfo)
    }
}