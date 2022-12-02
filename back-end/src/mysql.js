const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LiamNgoan@123",
    database: 'Login'
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connect!");
});

app.get("/login", async function(req, res){
    const username = req.query.username;
    const password = req.query.password;
    console.log(con.query(`SELECT * FROM authentication where username = '${username}' AND pass = '${password}'`, function(err, result, fields){
        if(err) throw err;
        console.log(result);
    }))
    res.json();
})


app.listen(4008);