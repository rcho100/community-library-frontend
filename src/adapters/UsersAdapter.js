class UserAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/signup"
    }

    loginUser(signupInfo) {
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                body: JSON.stringify(signupInfo)
            }
        };
        return fetch(this.baseURL, configurationObject).then(res => res(json))
    }
}
