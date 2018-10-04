'use strict';

const request = require('request');
const argv = require('yargs').argv

let apiKey = '14c73a89eb6ba66911ae3b960533a3e9';
let city = argv.c || 'helsinki';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`

request(url, function(err, response, body){
	if(err){
		console.log('error:', error);
	} else{
		console.log('body:', body);
		let weather = JSON.parse(body);
		let message =`It is ${weather.main.temp} degrees in ${weather.name} and humidity is ${weather.main.humidity}`;
		console.log(message);
	}
});
