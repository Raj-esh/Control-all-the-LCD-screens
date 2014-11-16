var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('rajesh'));
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.pretty = true;


app.get('/', function(req, res){
	res.redirect('/LCD/SignIn');
});

app.get('/LCD', function(req, res){
	res.redirect('/LCD/SignIn');
});

app.get('/LCD/SignIn', function(req, res) {
	//var username = req.headers['x-iisnode-auth_user'];
	//username = username.substr(11);
	var username = 'rajesh_pudota';
	req.session.username = username;
	
	req.session.name='login';
	res.render('login',{username:username});
});

app.get('/LCD/Welcome', function(req, res) {
	res.redirect('/LCD');
});

app.post('/LCD/Welcome', routes);

app.get('/LCD/Logout', routes);


app.get('/LCD/Preview', function(req, res){
	res.render('Preview');
});

app.post('/LCD/Preview', function(req, res){
	if( req.body.preview == 'Landscape'){
		res.render('Landscape');
	}
	else{
		res.render('Potrait');
	}
});


app.get('/LCD/ManageUser', function(req, res){
	res.render('ManageUser', {roleid:req.session.roleid,username: req.session.firstname});
});

app.post('/LCD/GiveAccessToUser', users);

app.post('/Quiz/Admin', users);

app.get('/LCD/ManageContent',function(req, res){
	res.render('ManageContent',{username: req.session.firstname, roleid:req.session.roleid});
});

app.get('/LCD/AccessExpired',function(req, res){
	res.render('AccessExpired');
});

app.get('/LCD/upload', function(req, res){
	res.render('upload');
});

app.post('/LCD/upload', upload);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;