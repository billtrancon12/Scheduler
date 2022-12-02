function createAccountController(){
    const username = document.getElementsByClassName("username_input")[0].value;
    const password = document.getElementsByClassName("password_input")[0].value;
    const retype_pass = document.getElementsByClassName("reenter_password_input")[0].value;
    const badChars = ['?','@', '!', '\\', ';', ':', '!'];

    for(const letter of username){
        for(const char of badChars){
            if(letter === char){
                window.alert("Cannot have a special character in username!");
                return;
            }
        }
    }
    
    if(!createAccount(username, password, retype_pass)){
        window.alert("Create failed!");
        return;
    }

    window.alert("Create successfully");
}

function createAccount(username, password, retype_pass){
    const specialChars = ['?', '@', '!', '#', '$', '%', '^', '&'];
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 20;
    const database = new Database();

    if(database.getUser(username) !== null){
        window.alert("Username existed! Please try again!");
        return false;
    }

    if(password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH){
        window.alert("The password's length must be 8-20!");
        return false;
    }

    if(password !== retype_pass){
        window.alert("Retype password must match!");
        return false;
    }

    let lowerCaseNum = 0;
    let upperCaseNum = 0;
    let specialCaseNum = 0;
    let numberNum = 0;
    for(const letter of password){
        if(isLetter(letter) && letter === letter.toUpperCase())
            upperCaseNum++;
        if(isLetter(letter) && letter === letter.toLowerCase())
            lowerCaseNum++;
        if(letter.charCodeAt() >= 48 && letter.charCodeAt() <= 57)
            numberNum++;
        for(const char of specialChars){
            if(letter === char){
                specialCaseNum++;
                break;
            }
        }
    }
    
    if(lowerCaseNum < 1 || upperCaseNum < 1 || specialCaseNum < 1 || numberNum < 1){
        window.alert("A password must have at least 1 uppercase, 1 lowercase, 1 special character, and 1 number");
        return false;
    }

    return true;
}

function isLetter(c){
    return c.toLowerCase() !== c.toUpperCase();
}