const express = require('express');
const cors = require('cors');
const app = express();
const {MongoClient} = require('mongodb');
const {updateData, retrieveData} = require('../../../netlify-express/src/database_tools');
const { isHour, isMin } = require('./util');
require('dotenv').config();

async function getUser(username){
	const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
	try{
		await client.connect();
		// date will be a number in this format: month+day+year. For example September 11, 2022 will be 09112022. The calendar retrieving from the database will be for
		// a full week. And date will always be on Monday
		const result = await retrieveData(client, 'SchedulerProject', 'UserAuthentication', {username: username});  // Get a user info based on the username
		await client.close();
		return JSON.parse(result.body);
	}
	catch(err){
		console.error(err);
		return undefined;
	}
}

async function updateUserCalendar(username, date, calendar){
	const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
    
	try{
		await client.connect();
		// date will be a number in this format: month+day+year. For example September 11, 2022 will be 09112022. The calendar retrieving from the database will be for
		// a full week. And date will always be on Monday
		const result = await updateData(client, 'SchedulerProject', 'UserCalendar', {username: username, date: date}, {$set: {username: username, date: date, calendar: calendar}}, {upsert: false});
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
		const result = await retrieveData(client, 'SchedulerProject', 'UserCalendar', {username: username, date: date});  // Get a user info based on the username
		await client.close();
		return JSON.parse(result.body);
	}
	catch(err){
		console.error(err);
		return undefined;
	}
}

async function addReminderInterval(username, interval){
	const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.liou3p7.mongodb.net/?retryWrites=true&w=majority`
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });   // Create a client end-point
				
	try{
		await client.connect();
		// date will be a number in this format: month+day+year. For example September 11, 2022 will be 09112022. The calendar retrieving from the database will be for
		// a full week. And date will always be on Monday
		const result = await updateData(client, 'SchedulerProject', 'ReminderInterval', {username: username}, {$set: {username: username, hour: interval.hour, min: interval.min}}, {upsert: true});
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
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.post('/create_schedule', async function(req, res){
	if(req.body.username === null || req.body.username === undefined || req.body.username.length === 0){
		res.json(JSON.stringify({status: false, message: 'Cannot find username, please try again!'}));
		return;
	}

	if(req.body.date === null || req.body.date === undefined){
		res.json(JSON.stringify({status: false, message: 'Date not found!'}));
		return;
	}

	if(req.body.event === null || req.body.event === undefined){
		res.json(JSON.stringify({status: false, message: 'Event/Task not found!'}));
		return;
	}

	if(req.body.event.day === null || req.body.event.day === undefined){
		res.json(JSON.stringify({status: false, message: 'Please select a date!'}));
		return;
	}

	if(req.body.event.start === null || req.body.event.start === undefined){
		res.json(JSON.stringify({status: false, message: 'Please select when does the event start!'}));
		return;
	}

	if(req.body.event.end === null || req.body.event.end === undefined){
		res.json(JSON.stringify({status: false, message: 'Please select when does the event end!'}));
		return;
	}

	const user = await getUser(req.body.username);
	if(user === null || user === undefined){
		res.json(JSON.stringify({status: false, message: 'Cannot find user!'}));
		return;
	}

	const calendar = await getUserCalendar(req.body.username, req.body.date);
	if(calendar === null || calendar === undefined){
		res.json(JSON.stringify({status: false, message: 'Calendar is empty!'}));
		return;
	}

	const updateStatus = await createAndUpdateCalendar(req.body.event, calendar.calendar);
	if(updateStatus.status === false){
		res.json(JSON.stringify({status: false, message: updateStatus.message}));
		return;
	}

	const result = await updateUserCalendar(req.body.username, req.body.date, updateStatus.data);
	if(result === undefined || result === null){
		res.json(JSON.stringify({status: false, message: 'Updating failed!'}));
		return;
	}

	res.json(JSON.stringify({status: true, data: updateStatus.data}));
})

app.post('/reminder', async function(req, res){
	console.log(req.body.hour)
	if(!isHour(req.body.hour)){
		res.json(JSON.stringify({status: false, message: "Please enter hour within range from 0-23!"}));
		return;
	}

	if(!isMin(req.body.min)){
		res.json(JSON.stringify({status: false, message: "Please enter minute within range from 0-59"}));
		return;
	}

	await addReminderInterval(req.body.username, {hour: req.body.hour.toString(), min: req.body.min.toString()});
	res.json(JSON.stringify({status: true, message: "Change reminder interval successfully!"}));
})

async function createAndUpdateCalendar(event, calendar){
	let time_event_from = event.start.split(':');
	let from_hour = time_event_from[0];
	let from_min = time_event_from[1];
	const interval = 30;
	const modified = calendar;

	if(!isNaN(from_hour)){
		from_hour = parseInt(from_hour, 10);
	}

	if(!isNaN(from_min)){
		from_min = parseInt(from_min, 10);
	}

	let hourString = (from_hour > 9) ? from_hour : '0' + from_hour ;
	let minuteString = (from_min > 9) ? from_min : '0' + from_min;
	while((hourString + ' : ' + minuteString) !== event.end){
		let time = hourString + ' : ' + minuteString;

		for(const e of modified){
			if(e.time === time && e[event.day] === ''){
				e[event.day] = event.title;
			}
			else if(e.time === time && e[event.day] !== ''){
				return {status: false, message: 'Events conflicted!'}
			}
		}

		if((from_min + interval) % 60 === 0){
			from_hour++;
			from_min = 0;
		}
		else from_min += interval;

		hourString = (from_hour > 9) ? from_hour : '0' + from_hour;
		minuteString = (from_min > 9) ? from_min : '0' + from_min;
	}
	return {status: true, data: modified};
}

app.listen(4003);
