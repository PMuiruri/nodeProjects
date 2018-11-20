'use strict'
const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/appRoutes');
const {addPlayerPage, addPlayer} = require('./routes/addPlayer');

const port = 3000;

const database = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password:'',
 database: 'playerdatabase'
});

database.connect((err)=>{
 if(err){
  throw err;
  console.log('database not connected');
 }
 /*eslint-diable no-console*/
 console.log('connected to database');
});

global.database = database;

app.set('port', process.env.port || port); //set express to use this port
app.set('views', __dirname + '/views'); //set express to look in this folder to render views
app.set('view engine', 'ejs'); //configure template engine

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload());

//getroutes
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.post('/add', addPlayer);


app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});
