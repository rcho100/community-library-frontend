class UsersAdapter {
    constructor() {
        this.signupURL = "https://community-library-api.herokuapp.com/signup"
        this.loginURL = "https://community-library-api.herokuapp.com/login"
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
