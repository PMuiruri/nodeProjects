'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
app.use(express.urlencoded({extended: false}));

const durationMin = min => 60000*min;

const storageOptions ={
	host:'localhost',
	port:3306,
	user:'server',
	password:'secret',
	database:'sessionDb',
	checkExpirationInterval: durationMin(2),
	expiration: durationMin(4)
};

const mysqlSessionStore = new MySQLStore(storageOptions);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer(app);
const SessionStorage = require('./sessionstorage/datastorage');
const sessionStorage = new SessionStorage(true);

const getRoutes = require(path.join(__dirname, 'routes', 'getroutes.js'));
const loginRoutes = require(path.join(__dirname, 'routes', 'login.js'));
const logoutRoutes = require(path.join(__dirname, 'routes', 'logout.js'));


app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let password = new Date().toString();
var hash = bcryptjs.hashSync(password, 10);

app.use(session({
  secret: process.env.SECRET || hash,
  resave: false,
  saveUninitialized: true,
  store: mysqlSessionStore
}));


app.use(getRoutes(sessionStorage));
app.use(loginRoutes(sessionStorage));
app.use(logoutRoutes(sessionStorage));

server.listen(port, host, () =>
	/*eslint-disable no-console*/
	console.log(`Server ${host} is listening at port ${port}.`)
);
