const fs = require('fs');

module.exports = {
	addPlayerPage: (req, res) =>{
		res.render('addplayer.ejs',{
			title: 'Welcome Add a new Soccer Player',
			message: ''
		});
	},
	addPlayer: (req, res) =>{
		if(!req.files){
			return res.status(400).send("No files were uploaded.");
		}

		var message = '';
		var playerId = req.body.playerId;
		var firstname = req.body.firstname;
		let lastname = req.body.lastname;
		let position = req.body.position;
		let playernumber = req.body.playernumber;
		let country = req.body.country;
		let uploadedFile = req.files.image;
		let imageName = uploadedFile.name;
		let fileExtension = uploadedFile.mimetype.split('/')[1];



		console.log('***************');
		console.log(playerId, firstname, lastname, position, playernumber, country, imageName);

		let checkquery = "Select * FROM `players` WHERE playerId ='"+playerId+"'";

		database.query(checkquery, (err, result)=>{
			if(err){
				return res.status(500).send(err);
			}
			if(result.length > 0){
				message ="Player Id already exists please enter a valid";
				res.render('addplayer.ejs',{
					message,
					title:"Add a new Player"
				});
			}else {
				if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg'){
					uploadedFile.mv(`public/images/${imageName}`, (err)=>{
						if(err){
							return res.status(500).send(err);
						}
						let insertquery = "INSERT INTO `players` ( image, firstname, lastname, playernumber, position, Country) VALUES ('" + image +"','"+ firstname +"', '"+ lastname +"', '"+ playernumber +"', '"+ position +"', '"+ country +"')";

						database.query(insertquery, (err, result)=>{
							if(err){
								/*eslint-disable no-console*/
								console.log('Something went wrong, player was not added '+err);
								return res.status(500).send(err);
							}
							console.log('Player added');
							res.redirect('/');
						});
					});
				} else{
					message = "Invalid File format. Only  'jpeg' and 'png' images are allowed.";
          res.render('add-player.ejs', {message,
                        title: "Add a new player"
				});
			}
		}
	});
}
};
