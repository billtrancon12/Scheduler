class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    verifyPassword(password){
        return this.password === password;
    }
}