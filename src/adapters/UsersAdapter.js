class UsersAdapter {
    constructor() {
        this.signupURL = "http://localhost:3000/signup"
        this.loginURL = "http://localhost:3000/login"
    }

    signupUser(signupInfo) {
        return fetch(this.signupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(signupInfo)
        })
        .then(res => res.json())
    }

    loginUser(loginInfo) {
        return fetch(this.loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(res => res.json())
    }
}
