var express = require('express');
var profile = express.Router();
var itemdb = require('../utility/itemdb');
var userdb = require('../utility/userdb');
var UserItem = require('../models/userItem');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');
profile.use(session({secret: "catalogcontroller",
resave: false,
saveUninitialized: true,}));

var checkSession = function(req,res,action){ 
    if(session.theUser == undefined){
        session.theUser = userdb.getUsers()[0];
        userPro = userdb.getUserProfile(session.theUser.userid);
        session.userProfile = userPro.getItems();
        hasSession(req,res,action);
    }else{
        hasSession(req,res,action);
    }
}

var hasSession = function(req,res,action){
    var destinations = itemdb.getAllDestinations();
    if(action == 'save' || action == 'updateProfile' || action == 'updateVerdict' || action == 'updateFlag' || action == 'deleteItem'){
        if(req.body.itemList == undefined){
            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
        }
        else{
            if(req.body.itemCode == undefined ){
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
            }
            else{
                // var itemList = req.body.itemList;
                // var validcode = false;
                // for (let i = 0; i < itemList.length; i++) {
                //     if(itemList[i].itemCode == req.body.itemCode){
                //         validcode = true;
                //     }
                // }
                validcode = true;
                if(validcode){
                    if(action == 'save'){
                        save(req,res);
                    } else if (action == 'updateProfile'){
                        updateProfile(req,res);
                    } else if (action == 'updateVerdict'){
                        updateVerdict(req,res);
                    } else if (action == 'updateFlag'){
                        console.log('ppppp');
                        updateFlag(req,res);
                    } else if (action == 'deleteItem'){
                        deleteItem(req,res);
                    } 
                } else {
                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
                }
            }
        }
    }
    else if(action == 'signout'){
        signout(req,res);   
    }
    if(action == 'myItems' || action == 'signIn'){
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}

// returns the position of the item if exists, else returns null
var checkIfAlreadyExists = function(itemcode,userPro){
    var position = null;
    for (let i = 0; i < userPro.length; i++) {
        if(userPro[i].itemCode == itemcode){
            position = i;
        }
    }
    return position;
}


var save = function(req,res){
    var itemcode = req.body.itemCode;
    var userPro = session.userProfile;
    var destinations = itemdb.getAllDestinations();
    var pos = checkIfAlreadyExists(itemcode,session.userProfile);
    if(pos!=null){
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
    else{
        let userItem = new UserItem(itemcode,'NA',false);
        userPro.push(userItem);
        session.userProfile = userPro;
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}


var updateProfile = function(req,res){
    var itemcode = req.body.itemCode;
    var destinations = itemdb.getAllDestinations();
    var pos = checkIfAlreadyExists(itemcode,session.userProfile);
    if(pos!=null){
        var item = session.userProfile[pos];
        res.render('feedback', {data: item, destinations:destinations, username: session.theUser.firstName});
    }
    else{
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}

// updateRating
var updateVerdict = function(req,res){
    var itemcode = req.body.itemCode;
    var destinations = itemdb.getAllDestinations();
    if(req.body.verdict != undefined){
        var verdict = req.body.verdict;
        if(verdict == "Must Visit" || verdict == "Recommended" || verdict == "Time pass" || verdict == "Waste of money" ){
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            if(pos!=null){
                var userPro = session.userProfile;
                userPro[pos].verdict = verdict;
                session.userProfile = userPro;
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
            }
            else{
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
            }
        }
        else{
            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
        }
    }
    else{
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}


var updateFlag = function(req,res){
    var itemcode = req.body.itemCode;
    var destinations = itemdb.getAllDestinations();
    if(req.body.visited != ""){
        var flag = req.body.visited;
        if(flag == "true" || flag == "false" ){
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            if(pos!=null){
                var userPro = session.userProfile;
                userPro[pos].visited = flag;
                session.userProfile = userPro;
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
            }
            else{
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
            }
        }
        else{
            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
        }
    } else{
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}

var deleteItem = function(req,res){
    var itemcode = req.body.itemCode;
    var destinations = itemdb.getAllDestinations();
    var pos = checkIfAlreadyExists(itemcode,session.userProfile);
    if(pos!=null){
        var userPro = session.userProfile;
        userPro.splice(pos, 1);
        session.userProfile = userPro;
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
    else{
        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstName});
    }
}

var signout = function(req,res){
    session.destroy;
    session.theUser = undefined;
    res.render('index',{username: ''});
}

profile.get('/myItems', function(req, res) {
    console.log('/myItems');
    checkSession(req,res,'myItems');
});

profile.get('/home', function(req, res) {
    console.log('/home');
    res.render('index',{username: session.theUser.firstName });
});

profile.post('/save',urlencodedParser, function(req, res){
    console.log('/save');
    checkSession(req,res,'save');
});

profile.post('/updateProfile',urlencodedParser, function(req, res){
    console.log('/updateProfile');
    checkSession(req,res,'updateProfile');
});

profile.post('/updateVerdict',urlencodedParser, function(req, res){
    console.log('/updateVerdict');
    checkSession(req,res,'updateVerdict');
});

profile.post('/updateFlag',urlencodedParser, function(req, res){
    console.log('/updateFlag');
    checkSession(req,res,'updateFlag');
});

profile.post('/deleteItem',urlencodedParser, function(req, res){
    console.log('/deleteItem');
    checkSession(req,res,'deleteItem');
});

profile.post('/signout',urlencodedParser, function(req, res){
    console.log('/signout');
    checkSession(req,res,'signout');
});

profile.get('/signIn', function(req, res){
    console.log('/signIn');
    if(session.theUser == undefined){
        checkSession(req,res,'signIn');
    }
    else {
        console.log("signout clicked")
        signout(req,res);
    }
});

module.exports = profile;
