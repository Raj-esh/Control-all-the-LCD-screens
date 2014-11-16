var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'mysqlfeb14@RP',
	database: 'lcd_app'
});

router.post('/Quiz/Admin', function(req, res){
	var toopen = req.body.toopen;
	res.render('Admin',{toopen : toopen});
});

router.post('/LCD/ManageUser', function(req, res){
	var emails = req.body.emails;
	var roleid = req.body.roleid;
	var USER_EMAIL = emails;
	
	var email1=USER_EMAIL.split("<");
	if(email1.length == 1){
		var email2=email1[0].split("@");
		USER_EMAIL= email2[0];
	}
	else{
		var email2=email1[1].split("@");
		USER_EMAIL= email2[0];
	}
							
	USER_EMAIL = USER_EMAIL.toLowerCase();
		db.query("INSERT INTO USER VALUES (?,?,?,?)", [USER_EMAIL,0,'2014-07-27','2015-06-25'], function(err, data){});
		db.query("UPDATE USER SET ROLE_ID = ? WHERE USER_EMAIL_ID = ?", [roleid,USER_EMAIL], function(err, result){
			if (err) res.render('Success',{msg:"Role Update Failed...!!"});
			else 
				res.render('Success',{msg:"User Role has been Updated Successfully and will be active from next Login...!!!"});
		});

});


router.post('/LCD/GiveAccessToUser', function(req, res){
	var emails = req.body.emails;
	var roleid = req.body.roleid;
	var USER_EMAIL = emails;
	
	var email1=USER_EMAIL.split("<");
	if(email1.length == 1){
		var email2=email1[0].split("@");
		USER_EMAIL= email2[0];
	}
	else{
		var email2=email1[1].split("@");
		USER_EMAIL= email2[0];
	}
							
	USER_EMAIL = USER_EMAIL.toLowerCase();
		db.query("INSERT INTO USER VALUES (?,?,?,?)", [USER_EMAIL,0,'2014-07-27','2015-06-25'], function(err, data){});
		db.query("UPDATE USER SET ROLE_ID = ? WHERE USER_EMAIL_ID = ?", [roleid,USER_EMAIL], function(err, result){
			if (err) res.render('Success',{msg:"Role Update Failed...!!"});
			else 
				res.render('Success',{msg:"User Role has been Updated Successfully and will be active from next Login...!!!"});
		});

});

module.exports = router;