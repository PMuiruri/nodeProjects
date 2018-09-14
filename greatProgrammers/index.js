'use strict';

const http=require('http');
const path =require('path');
const url=require('url');

const {sendFile, sendJson, sendPerson}=require(path.join(__dirname,'filehandler.js'));
const config=require(path.join(__dirname,'config.json'));

const homePath=path.join(__dirname,'home.html');
const programmers=require(path.join(__dirname,'data.json'));

console.log(programmers[1]);

const server=http.createServer((req,res)=>{
	let route=url.parse(req.url).pathname;

	if(route==='/'){
		sendFile(res,homePath);
}
else if(route==='/all'){
		sendPerson(res);
	}
	else{
		res.end();
	}
});

server.listen(config.port, config.host,()=>
	console.log(`Server ${config.host} is running at port ${config.port}.`)
);
