var express = require('express');
var catalogController = require('./../controller/catalogController');
var profileController = require('./../controller/profileController');
var expressValidator = require('express-validator');

var app = express();

app.use(expressValidator());

app.set('views', __dirname+'/../views');
app.set('view engine','ejs');
app.use('/assets', express.static(__dirname+'/../assets'));
app.use('/catalog', catalogController);
app.use('/profile', profileController);
app.get('/', function(req, res) {
    console.log('/')
    res.render('index',{username: ''});
});
app.listen(8080);
