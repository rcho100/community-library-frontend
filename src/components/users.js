class Users {
    constructor() {
        this.users = []
    }

    initBindingsAndEventListeners() {
        this.signupForm = document.querySelector(".signup-form")
        this.signupForm.addEventListener('submit', this.createUser);
    }

    createUser(e) {
        e.preventDefault();
        console.log('User is being created')
    }

}