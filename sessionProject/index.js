'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const durationS = s => 1000 * s;
const minute = durationS(60);
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const UserStorage = require('./storage/users');
const SessionStorage = require('./storage/sessionstorage');
const users = new UserStorage();
const sessionStorage = new SessionStorage(minute, minute);

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, 'views'));

const getRoutes = require(path.join(__dirname, 'routes', 'getroutes.js'));
const loginRoutes = require(path.join(__dirname, 'routes', 'login.js'));
const logoutRoutes = require(path.join(__dirname, 'routes', 'logout.js'));

let password = new Date().toString();
var hash = bcryptjs.hashSync(password, 10);

app.use(session({
  secret: process.env.SECRET || hash,
  resave: false,
  saveUninitialized: true
  // cookie:{
  // 	maxage: minute,
  // 	httpOnly: false
  // }
}));

//routes
//default mount path is "/"
//app.use('/', getRoutes(admin, user, login, publicResource));
app.use(getRoutes(sessionStorage, users));
app.use(loginRoutes(sessionStorage, users));
app.use(logoutRoutes(sessionStorage));

server.listen(port, host, () =>
	/*eslint-disable no-console*/
	console.log(`Server ${host} is listening at port ${port}.`)
);
