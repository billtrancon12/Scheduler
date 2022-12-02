const express = require("express");
const cors = require("cors");
const app = express();
const {MongoClient, Code} = require('mongodb');
const {putData, retrieveData} = require('../../../netlify-express/src/database_tools');
const bcrypt = require("bcryptjs");
const validator = require("validator");

require('dotenv').config();

// Put user into database function
async function putUser(user){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();
        const result = await putData(client, "SchedulerProject", "UserAuthentication", 
        {
            username: user.username,
            password: user.password,
            email: user.email,
            verifyPassword: new Code("return await bcrypt.compare(hash, pass);")
        }); // Put user into the database

        await client.close();
        return JSON.parse(result.body);
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}


// Get user from the database function
async function getUser(username){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();
        const result = await retrieveData(client, "SchedulerProject", "UserAuthentication", {username: username}); // get the user from the database

        await client.close();
        return JSON.parse(result.body);
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}

// Configuration
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.post('/create', async function(req, res){
    if(req.body.email === null || req.body.email === undefined || req.body.email.length === 0){
        res.json(JSON.stringify({status: false, message: "Email cannot be empty!"}));
        return;
    }

    if(req.body.username === null || req.body.username === undefined || req.body.email.length === 0){
        res.json(JSON.stringify({status: false, message: "Username cannot be empty!"}));
        return;
    }

    if(req.body.password === null || req.body.password === undefined || req.body.password.length === 0){
        res.json(JSON.stringify({status: false, message: "Password cannot be empty"}));
        return;
    }

    if(req.body.retype_pass === null || req.body.retype_pass === undefined || req.body.retype_pass.length === 0){
        res.json(JSON.stringify({status: false, message: "Retype password cannot be empty!"}));
        return;
    }

    if(!validator.isEmail(req.body.email)){
        res.json(JSON.stringify({status: false, message: "Invalid email!"}));
        return;
    }

    let result = verifyUsername(req.body.username);
    if(!result.status){
        res.json(JSON.stringify(result));
        return;
    }

    result = await verifyAccountInfo(req.body.retype_pass, req.body.password);
    
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    if(result.status === true){
        res.json(JSON.stringify(await registerUser({
            username: req.body.username,
            password: hashPass,
            email: req.body.email
        })));   // register user into the database
        return;
    }

    res.json(JSON.stringify(result));
})


// Verifying password requirements
async function verifyAccountInfo(retype_password, password){
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 20;
    
    if(password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH){
        return {status: false, message: "Password must be 8-20 characters long!"};
    }

    if(retype_password !== password){
        return {status: false, message: "Retype password must match!"};    
    }

    if(!passwordChecker(password)){
        return {status: false, message: "Password must have at least one lowercase, one uppercase, one number, and one special character!"}
    }

    return {status: true, message: "Success!"};
}

// It checks if the password has at least one lowercase, 1 uppercase, 1 special, and 1 number 
function passwordChecker(password){
    const specialChars = ['?', '@', '!', '#', '$', '%', '^', '&'];
    let lowerCaseNum = 0;
    let upperCaseNum = 0;
    let specialCaseNum = 0;
    let numberNum = 0;

    // Check if a character is an uppercase, lowercase, number, or special characters
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
        return false;
    }

    return true;
}

// Put user into the database
async function registerUser(user){
    const exist_user = await getUser(user.username);

    // Check if the username already taken
    if(exist_user === undefined || exist_user === null){
        // Register new user
        await putUser(user);
        
        return {status: true, message: "Success!"};
    }

    // Username is already taken
    return {status: false, message: "User already existed!"};

}

// Verifying username requirements
function verifyUsername(username){
    const MAX_USERNAME_LENGTH = 12;
    const MIN_USERNAME_LENGTH = 8;

    if(username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH){
        return {status: false, message: "Username must be 8-12 characters long!"};
    }
    
    for(let char of username){
        // username can only have uppercase or lowercase character and numbers
        if((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) || (char.charCodeAt() >= 48 && char.charCodeAt() <= 57))
            continue;
        else 
            return {status: false, message: "Username cannot have special characters!"};
    }
    return {status: true, message: ""};
}

// Check if the character is a letter
function isLetter(c){
    return c.toLowerCase() !== c.toUpperCase();
}

app.listen(4004);
