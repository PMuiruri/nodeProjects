'use strict';

module.exports = {
    getHomePage: (req, res)=>{
        let query = "SELECT * FROM `players`";

        //execute query
        database.query(query, (err, result)=>{
            if(err){
                /*eslint-disable no-console*/
                console.log('Something went wrong '+err);
                /*eslint-enable no-console*/
                res.redirect('/');
            }
            res.render('index.ejs',{
                title: 'Welcome to your Favorite Soccer Players',
                players: result
            });
        });
    }
};
