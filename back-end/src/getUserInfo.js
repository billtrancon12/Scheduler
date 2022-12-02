const express = require("express");
const cors = require("cors");
const app = express();
const {MongoClient} = require('mongodb');
const {retrieveData, updateData} = require('../../../netlify-express/src/database_tools');
require('dotenv').config();

async function getUser(username){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();
        // Get the user
        const result = await retrieveData(client, "SchedulerProject", "UserAuthentication", {username: username}); 
        await client.close();
        return JSON.parse(result.body);
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}

async function getUserCalendar(username, date){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();

        // date will be a number in this format: month+day+year. For example September 11, 2022 will be 09112022. The calendar retrieving from the database will be for
        // a full week. And date will always be on Monday
        const result = await retrieveData(client, "SchedulerProject", "UserCalendar", {username: username, date: date});  // Get a user info based on the username
        await client.close();
        return JSON.parse(result.body);
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}


async function createUserCalendar(username, date, calendar){
    const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
    try{
        await client.connect();

        // date will be a number in this format: month+day+year. For example September 11, 2022 will be 09112022. The calendar retrieving from the database will be for
        // a full week. And date will always be on Monday
        const result = await updateData(client, "SchedulerProject", "UserCalendar", {username: username, date: date}, {$setOnInsert: {username: username, date: date, calendar: calendar}}, {upsert: true});
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

app.get('/user', async function(req, res){
    const user = await getUser(req.query.username);
    
    // Verify user again
    if(user === undefined || user === null){
        res.json(JSON.stringify({status: false, message: "Cannot find user!"}));
        return;
    }

    const calendar = await getUserCalendar(req.query.username, req.query.date);

    // User existed but no calendar set up
    if(calendar === undefined || calendar === null){
        const emptyCalendar = getEmptyCalendar();
        await createUserCalendar(req.query.username, req.query.date, emptyCalendar);
        res.json(JSON.stringify({status: true, data: emptyCalendar}))
        return;
    }

    res.json(JSON.stringify({status: true, data: calendar.calendar}));
})

function getEmptyCalendar(){
    const calendar = [];
    const days = ["monday", "tuesday", "wednesday", 'thursday', 'friday', 'saturday', 'sunday'];

    for(let hour = 0; hour < 24; hour++){
        for(let min = 0; min < 60; min += 30){
            let minString = (min <= 9) ? "0" + min : min;
            let hourString = (hour <= 9) ? "0" + hour : hour;
            let time = hourString + " : " + minString;

            let scheduledTask = {
                time: time
            }

            for(const day of days){
                scheduledTask[day] = "";
            }

            calendar.push(scheduledTask);
        }
    }
    return calendar;
}

app.listen(4002);
