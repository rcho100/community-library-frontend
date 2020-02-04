class UsersAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/signup"
    }

    loginUser(signupInfo) {
        return fetch(this.baseURL, {
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
