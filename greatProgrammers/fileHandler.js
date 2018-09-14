'use strict';

const fs=require('fs');
const path=require('path');

function read(filepath, encoding){
	return new Promise((resolve, reject)=>{
		fs.readFile(filepath, encoding, (err,data)=>{
			if(err){
				reject(err);
			}
			else{
				resolve(data);
			}
		});
	});
}

const sendFile=function(res,filepath,
	options={
		type:'text/html',
		encoding:'utf8'
	}){
	read(filepath, options.encoding)
		.then(data=>{
			res.writeHead(200, {
				'content-type': options.type,
				'content-length': data.length
			});
			res.end(data, options.encoding);
		})
		.catch(err=>{
			res.setStatusCode=404;
			res.end(err.message);
		});
};

const sendJson=(res, profile)=>{
	read(path.join(__dirname,'data.json'),'utf8')
		.then(data=>JSON.parse(data))
		.then(programmers=>{
			if(Object.keys(programmers).includes(profile)){
				res.writeHead(200,{
					'content-type':'application/json'});
					res.end(JSON.stringify(programmers[profile]));
			}
		})
		.catch(err=>{
			res.setStatusCode=404;
			res.end(err.message);
		});
};

const sendPerson= res=>{
	read(path.join(__dirname,'data.json'),'utf8')
		.then(data=> JSON.parse(data))
		.then(programmers=>programmers)
		.then(person=>{
			res.writeHead(200,{
				'content-type':'application/json'});
			res.end(JSON.stringify(person));
		})
		.catch(err=>{
			res.setStatusCode=404;
			res.end(err.message);
		});
};


module.exports={
	sendFile,
	sendJson,
	sendPerson
};
