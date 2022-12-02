function loginController(){
    const database = new Database();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const badChars = ['?','@', '!', '\\', ';', ':', '!'];

    for(const letter of username){
        for(const char of badChars){
            if(letter === char){
                window.alert("Cannot have a special character in username!");
                return;
            }
        }
    }

    if(!login(database.getUser(username), password)){
        window.alert("Username/Password is incorrect!");
        return;
    }

    window.alert("Login successfully!");
}

function login(user, password){
    return user !== null && user.verifyPassword(password);
}