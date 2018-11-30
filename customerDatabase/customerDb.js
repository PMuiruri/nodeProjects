'use strict';
/* eslint-disable no-console*/

const Database= require('./database');
const sqlStatements= require('./sqlStatements');
const options=require('./options');


const allSql=sqlStatements.getAllSql.join(' ');
// const customerSql=sqlStatements.getCustomerSql.join(' ');
// const insertSql=sqlStatements.insertCustomerql.join(' ');
// const deleteSql=sqlStatements.deleteCustomerSql.join(' ');
// const updateSql=sqlStatements.updateCustomerSql.join(' ');

class CustomerDatabase{
	constructor(options, debug=false){
		this.customerDb=new Database(options, debug);
	}

	getAll(){
		return new Promise(async (resolve, reject)=>{
			try{
				let result= await this.personDb.doQuery(allSql);
				resolve(result);
			}
			catch(err){
				reject(fatalError(err));
			}
		});
	}
	// get(personId){
	// 	return new Promise(async (resolve, reject)=>{
	// 		try{
	// 			let result= await this.personDb.doQuery(personSql, +personId);
	// 			if(result.length===0){
	// 				reject(new Error('Person unknown'));
	// 			} else{
	// 				resolve(result[0]);
	// 			}
	// 		}
	// 		catch(err){
	// 			reject(fatalError(err));
	// 		}
	// 	});
	// }
	//
	// insert(person){
	// 	return new Promise(async (resolve,reject)=>{
	// 		try{
	// 			let result = await this.personDb.doQuery(insertSql,
	// 				+person.personId,
	// 				person.firstname,
	// 				person.lastname,
	// 				person.department,
	// 				+person.salary
	// 			);
	// 			if(result.affectedRows===0){
	// 				reject(new Error('No person was added'));
	// 			} else{
	// 				resolve(`Person with id ${person.personId} was added`);
	// 			}
	// 		}
	// 		catch(err){
	// 			reject(fatalError(err));
	// 		}
	// 	});
	// }
	// //function to update a persons information
	// update(person){
	// 	return new Promise(async (resolve,reject)=>{
	// 		try{
	// 			let result = await this.personDb.doQuery(updateSql, person.firstname, person.lastname, person.department, +person.salary, +person.personId);
	// 			if(result.affectedRows===0){
	// 				reject(new Error(`No person with id ${person.persondata} was found. No data was updated`));
	// 			} else{
	// 				resolve(`Person with id ${person.personId} was updated`);
	// 			}
	// 		}
	// 		catch(err){
	// 			reject(fatalError(err));
	// 		}
	// 	});
	// }
	// //function to delete a person
	// delete(personId){
	// 	return new Promise(async (resolve, reject) =>{
	// 		try{
	// 			let result = await this.personDb.doQuery(deleteSql, +personId);
	// 			if(result.affectedRows===0){
	// 				reject(new Error(`No Person with given Id ${personId}. Nothing was deleted`));
	// 			} else{
	// 				resolve(`Person with id ${personId} was deleted`);
	// 			}
	// 		}
	// 		catch(err){
	// 			reject(fatalError(err));
	// 		}
	// 	});
	// }
}//end of class

module.exports=function initDataStorage(debug=false){
	return new CustomerDatabase(options, debug);
};

function fatalError(err){
	return new Error(`Sorry! Error in our program. ${err.message}`);
}
