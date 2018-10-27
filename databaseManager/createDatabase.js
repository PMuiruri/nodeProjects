'use strict';
/* eslint-disable no-console*/

const statements=require('./createStatements.json');
try{
	createDatabase(statements);
} catch(err){
	console.log(err.message);
}

async function createDatabase(createStatements){
	const createOptions={
		host:createStatements.host,
		port:createStatements.mysqlport,
		user:createStatements.admin,
		password:createStatements.adminpassword
	};

	//drops the database if it already exists
	let dropDatabaseSql=`drop database if exists ${createStatements.database}`;
	let createDatabaseSql=`create database ${createStatements.database}`;
	let dropUserSql=`drop user if exists '${createStatements.user}'@'${createStatements.host}'`;
	let createUserSql=`create user if not exists '${createStatements.user}'`+
	`@'${createStatements.host}' identified by '${createStatements.password}'`;
	let grantPrivilegeSql = `grant all privileges on ${createStatements.database}.*`+
	`to '${createStatements.user}'@'${createStatements.host}'`;

	const Database=require('./databaseDebug');

	let database = new Database(createOptions);

	try{
		// await keyword ensures the line of code is first executed before it moves to next line of code
		await database.doQuery(dropDatabaseSql);
		await database.doQuery(createDatabaseSql);
		if(createStatements.dropUser){
			await database.doQuery(dropUserSql);
		}
		await database.doQuery(createUserSql);
		await database.doQuery(grantPrivilegeSql);

		database.options.database=createStatements.database;

		for(let newTable of createStatements.tables){
			let createTable=`create table ${newTable.name}(\n${newTable.fields.join(',\n')})`;
			// \n is not needed the only purpose is to endure the code writes to a new line
			let insertData =`insert into ${newTable.name} values(?)`;

			await database.doQuery(createTable);
			// create an array and push all the da
			let inserts=[];
			for(let data of newTable.data){
				inserts.push(database.doQuery(insertData, data));
			}
			//promise all waits until all promises have been made and then it moves on
			await Promise.all(inserts);
		}

	} catch(err){
		console.log(err.message);
	}
}
