var express = require('express');
var catalogController = require('./../controller/catalogController');
var profileController = require('./../controller/profileController');

var app = express();

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
