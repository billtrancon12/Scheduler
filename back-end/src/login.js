const express = require("express");
const cors = require("cors");
const app = express();
const {MongoClient} = require('mongodb');
const {retrieveData} = require('../../../netlify-express/src/database_tools');
const bcrypt = require("bcryptjs");
require('dotenv').config();

async function getUserLoginInfo(username){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();
        const result = await retrieveData(client, "SchedulerProject", "UserAuthentication", {username: username});  // Get a user info based on the username
        await client.close();
        return JSON.parse(result.body);
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}



app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/login', async function(req, res){
    if(!verifyUsername(req.query.username)){
        res.json(JSON.stringify({status: false, message: "Invalid username!"}));
        return;
    }

    const result = await verifyUser(await getUserLoginInfo(req.query.username), req.query.password);
    res.json(result);
})


async function verifyUser(user, password){
    if(user === undefined || user === null)
        return JSON.stringify({status: false, message: "User does not exist!"});

    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const verifyPassword = new AsyncFunction('pass', 'bcrypt', 'hash', user.verifyPassword.code);

    if(await verifyPassword(password, bcrypt, user.password))
        return JSON.stringify({status: false, message: "Invalid password!"});
    
    return JSON.stringify({status: true, message: "Success"});
}

function verifyUsername(username){
    for(let char of username){
        // username can only have uppercase or lowercase character and numbers
        if((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) || (char.charCodeAt() >= 48 && char.charCodeAt() <= 57))
            continue;
        else 
            return false;
    }
    return true;
}

app.listen(4001);
