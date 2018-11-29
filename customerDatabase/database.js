'use strict';

const mysql = require('mysql');

module.exports= class Database{
	constructor(options, debug=false){
		this.options = options;
		this.debug = debug;
	}

	doQuery(sql,...parameters){
		return new Promise((resolve, reject) =>{
			let connection = mysql.createConnection(this.options);
			let sqlStatement = connection.query(sql, [...parameters], (err, result)=>{
				if(this.debug){
					/*eslint-disable no-console*/
					console.log(sqlStatement);
				}
				if(err) {
					reject(new Error('SQL ERROR: '+err));
				}
				resolve(result);
			});
			connection.end();  //
		});
	}
};
