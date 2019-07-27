var express = require('express');
var catalog = express.Router();
var itemdb = require('../utility/itemdb');
var session = require('express-session');
catalog.use(session({secret: "catalogcontroller",
resave: false,
saveUninitialized: true,}));

catalog.get('/categories', function(req, res) {
    console.log('/categories')
    var categories = itemdb.getCategories();
    var dest = itemdb.getAllDestinations();
    dest.then(function(destinations){
        var data = {
            categories : categories,
            destinations : destinations
        }
        if(session.theUser==undefined){
            res.render('categories', { data : data , username : ''});
        }
        else{
            res.render('categories', { data : data , username : session.theUser.firstname});
        }
    });
});

catalog.get('/categories/item/:itemCode', function(req, res) {
    var dest_code = req.params.itemCode;
    var destination = itemdb.getDestinationDetails(dest_code);
    destination.then(function(dest){
        if(dest){
            if(session.theUser==undefined){
                res.render('item', { dest : dest , username : ''});
            }
            else{
                res.render('item', { dest : dest  , username : session.theUser.firstname});
            }
        }
        else {
          res.redirect('/categories')
        }
    });
});

catalog.get('/categories/item', function(req, res) {
  res.redirect('/categories')
});

catalog.get('/about', function(req, res) {
    console.log('/about');
    if(session.theUser==undefined){
        res.render('about', { username : ''});
    }
    else{
        res.render('about', { username : session.theUser.firstname});
    }
});

catalog.get('/contact', function(req, res) {
    console.log('/contact');
    if(session.theUser==undefined){
        res.render('contact', { username : ''});
    }
    else{
        res.render('contact', { username : session.theUser.firstname});
    }
});

module.exports = catalog;
