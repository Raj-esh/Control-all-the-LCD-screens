var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'mysqlfeb14@RP',
	database: 'lcd_app'
});


router.post('/LCD/Welcome', function(req, res) {
	var username= req.body.username;
	username= username.toLowerCase();
	var query = "SELECT * FROM USER WHERE USER_EMAIL_ID=?";
	
		db.query(query,[username],function(err, rows ) {
			if(rows.length==1){
				req.session.username=username;
				var roleid = rows[0].ROLE_ID;
				var access_disable_date=new Date(rows[0].ACCESS_DISABLE_DT);
				var currentDate =  new Date();

				username = username.split("_");
				username = username[0];
				username=username[0].substr(0,1).toUpperCase()+username.substring(1);
				req.session.firstname=username;
				req.session.roleid=roleid;
				res.render('ManageContent',{username: username, roleid : roleid});
			}
			else
			{
				req.session.destroy(function(err) {
					res.redirect('/LCD/AccessExpired');
				})
			}
		});


});


router.get('/LCD/Logout', function(req, res){
	// cannot access session here
	var currentDate =  new Date();

	var LOGOUT_TIMESTAMP = currentDate.getFullYear() + "-"
							+ (currentDate.getMonth()+1)  + "-" 
							+ currentDate.getDate() + " "  
							+ currentDate.getHours() + ":"  
							+ currentDate.getMinutes() + ":" 
							+ currentDate.getSeconds();
/*
		db.query("UPDATE LOGIN_INFO SET LOGOUT_TIMESTAMP=? WHERE ID = ?", [LOGOUT_TIMESTAMP,req.session.loginId], function(err, result){
		});
	req.session.destroy(function(err) {
		res.render('Logout');
	})*/
});
module.exports = router;