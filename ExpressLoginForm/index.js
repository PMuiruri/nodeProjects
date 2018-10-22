'use strict';
const http=require('http');
const path=require('path');
const users = require(path.join(__dirname,'users.json'));
const express=require('express');
const app= express();

const port=3000;
const host='localhost';


const server= http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req,res)=>
	res.sendFile(path.join(__dirname, 'index.html'))
);

app.post('/login', express.urlencoded({extended:false}),(req, res)=>{

	if(!req.body) return res.sendStatus(400);

	if(users[req.body.username]==[req.body.password]){
		res.render('result',{data:req.body, title:'Login page',

			text:'Welcome', results:req.body.password});

	}else{

		res.render('result',{data:req.body,title:'Login page',

			text:'Incorrect password!!! Please try again', results:'******'});

	}

});

// app.post('/login', function(req, res){
// 	console.log(users);
// 	if(!req.body.username || !req.body.password){
// 		res.render('login', {message: 'Please a enter both username and password'});
// 	} else {
// 		if(users.username === req.body.username && users.password === req.body.password){
// 			res.redirect('/protected_page');
// 		}
//
// 		res.render('login', {message: 'Invalid credentials!'});
// 	}
// });


server.listen(port,host, ()=>
	console.log(`Serving port ${port}`)
);
