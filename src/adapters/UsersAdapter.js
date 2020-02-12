class UsersAdapter {
    constructor() {
        this.signupURL = "http://localhost:3000/signup"
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
}
