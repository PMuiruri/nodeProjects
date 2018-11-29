'use strict';
/*eslint-disable no-console*/
const Database = require('./database');
const sqlStatement = require('./sqlStatements');

const customerdb = new Database({
	'host':"localhost",
	"port": "3306",
	"user": "ella",
	"password": "UNcUd49J",
	"database": "customerdatabase"
}, true);

const allSql=sqlStatement.getAllSql.join(' ');

customerdb.doQuery(allSql)
	.then(result =>console.log(result))
	.catch(err =>console.log(err.message));
