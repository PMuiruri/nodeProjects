'use strict';

const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const{port, host, debug} = require('./serverConfig');
const server = http.createServer(app);
//const statushandling =[sendErrorPage, sendStatusPage];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => res.sendFile(path.join(__dirname,'home.html')));

server.listen(port, host, ()=>
	/*eslint-disable no-console*/
	console.log(`Server ${host} is serving at port ${port}.`)
);

function sendErrorPage(res, message='Error', title='Error', header='Error') {
	sendStatusPage(res, message, title,header);
}

function sendStatusPage(res, message='Status', title='Status', header='Status'){
	return res.render('statusPage',{title:title,header:header,message:message});
}
