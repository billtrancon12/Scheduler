class Database{
    constructor(){
        this.users = [];
        this.users.push(new User("admin", "Admin@123"));
        this.users.push(new User("AUser","AUSer@123"));
        this.users.push(new User("NotAUSer", "NotAUser@123"));
    }

    getUser(username){
        for(const user of this.users){
            if(user.username === username) return user;
        }
        return null;
    }
}