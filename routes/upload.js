var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

	
var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'mysqlfeb14@RP',
	database: 'lcd_app'
});

router.post('/LCD/upload', function(req, res) {
    var form = new formidable.IncomingForm();
	form.keepExtensions = true;
	 form.parse(req, function(err, fields, files) {
		res.render('upload',{msg: 'Image Uploaded Successfully'});
		//console.log(req.files);
     // res.writeHead(200, {'content-type': 'text/plain'});
     // res.write('received upload:\n\n');
      //res.end(util.inspect({fields: fields, files: files}));
    });
 
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
 
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
		
		db.query("INSERT INTO Images (ImageName) VALUES (?)", [file_name], function(err, data){});
        /* Location where we want to copy the uploaded file */
        var new_location = 'D:/Test/public/uploads/';
 
        fs.move(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });
 
    return;
});

module.exports = router;