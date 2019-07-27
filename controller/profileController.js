var express = require('express');
var profile = express.Router();
var itemdb = require('../utility/itemdb');
var userdb = require('../utility/userdb');
var userItemdb = require('../utility/userItemdb');
var UserItem = require('../models/userItem');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');
profile.use(session({secret: "catalogcontroller",
resave: false,
saveUninitialized: true,}));
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TravelDiaries');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Database connected");

    var authenticateLogin = function(username, password){
        var returnData = new Promise(function (resolve, reject) {
            var retuserdata = userdb.isUserAuthentic(username, password);
            retuserdata.then(function(userdata){
                if(!userdata){
                    resolve(false);
                }
                else{
                    session.theUser = userdata[0];
                    userPro = userdb.getUserProfile(userdata[0].userid);
                    userPro.then(function(userProfile){
                        session.userProfile = userProfile.getItems();
                        resolve(true);
                    });
                }
            });
        });
        return returnData;
    }

    var checkSession = function(req,res,action){ 
        if(session.theUser == undefined){
            res.render('login',{username: '', error: ''});
        }else{
            hasSession(req,res,action);
        }
    }

    var hasSession = function(req,res,action){
        console.log(session.theUser.firstname);
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
            if(action == 'save' || action == 'updateProfile' || action == 'updateVerdict' || action == 'updateFlag' || action == 'deleteItem'){
                if(req.body.itemList == undefined){
                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                }
                else{
                    if(req.body.itemCode == undefined ){
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
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
                            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                        }
                    }
                }
            }
            else if(action == 'signout'){
                signout(req,res);   
            }
            if(action == 'myItems' || action == 'signIn'){
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
            }
        });
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
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            if(pos!=null){
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
            }
            else{
                let userItem = new UserItem(itemcode,'NA','false');
                userPro.push(userItem);
                ret = userItemdb.saveDestinationToUser(session.theUser.userid,userPro);
                // session.userProfile = userPro;
                ret.then(function(){
                    userPro = userdb.getUserProfile(session.theUser.userid);
                    userPro.then(function(userProfile){
                        session.userProfile = userProfile.getItems();
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                    });
                });
            }
        });
    }


    var updateProfile = function(req,res){
        var itemcode = req.body.itemCode;
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            if(pos!=null){
                var item = session.userProfile[pos];
                res.render('feedback', {data: item, destinations:destinations, username: session.theUser.firstname,error: ''});
            }
            else{
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
            }
        });
    }

    // updateRating
    var updateVerdict = function(req,res){
        var itemcode = req.body.itemCode;
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
                if(req.body.verdict != undefined){
                    var verdict = req.body.verdict;
                    if(verdict == "Must Visit" || verdict == "Recommended" || verdict == "Time pass" || verdict == "Waste of money" ){
                        var pos = checkIfAlreadyExists(itemcode,session.userProfile);
                        if(pos!=null){
                            ret = userItemdb.updateVerdictOfUser(session.theUser.userid,itemcode,verdict);
                            ret.then(function(){
                                userPro = userdb.getUserProfile(session.theUser.userid);
                                userPro.then(function(userProfile){
                                    session.userProfile = userProfile.getItems();
                                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                                });
                            });
                            
                            // var userPro = session.userProfile;
                            // userPro[pos].verdict = verdict;
                            // session.userProfile = userPro;
                        }
                        else{
                            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                        }
                    }
                    else{
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                    }
                }
                else{
                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                }
            });
    }


    var updateFlag = function(req,res){
        var itemcode = req.body.itemCode;
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
                if(req.body.visited != ""){
                    var flag = req.body.visited;
                    if(flag == "true" || flag == "false" ){
                        var pos = checkIfAlreadyExists(itemcode,session.userProfile);
                        if(pos!=null){
                            ret = userItemdb.updateVisitedOfUser(session.theUser.userid,itemcode,flag);
                            ret.then(function(){
                                userPro = userdb.getUserProfile(session.theUser.userid);
                                userPro.then(function(userProfile){
                                    session.userProfile = userProfile.getItems();
                                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                                });
                            });
                            // var userPro = session.userProfile;
                            // userPro[pos].visited = flag;
                            // session.userProfile = userPro;
                        }
                        else{
                            res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                        }
                    }
                    else{
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                    }
                } else{
                    res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                }
        });
    }

    var deleteItem = function(req,res){
        var itemcode = req.body.itemCode;
        var dest = itemdb.getAllDestinations();
        var destinations;
        dest.then(function(data){
            destinations = data;
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            if(pos!=null){
                ret = userItemdb.deleteItemfromUserProfile(session.theUser.userid,itemcode);
                ret.then(function(){
                    userPro = userdb.getUserProfile(session.theUser.userid);
                    userPro.then(function(userProfile){
                        session.userProfile = userProfile.getItems();
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                    });
                });
                //var userPro = session.userProfile;
                //userPro.splice(pos, 1);
                //session.userProfile = userPro;
            }
            else{
                res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
            }
        });
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
        if(session.theUser == undefined){
            res.render('index',{username: ''});
        }
        else{
            res.render('index',{username: session.theUser.firstname });
        }
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
        var verdictSchema = {
            "verdict": {
              in: 'body',
              matches: {
                options: [/\b(?:Must Visit|Recommended|Time pass|Waste of money)\b/],
                errorMessage: "Invalid verdict"
              }
            }
          }
        req.check(verdictSchema);
        var errors = req.validationErrors();
        console.log('ppppp',errors);
        if(errors){
            var itemcode = req.body.itemCode;
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            var dest = itemdb.getAllDestinations();
            var destinations;
            dest.then(function(data){
                destinations = data;
                var item = session.userProfile[pos];
                res.render('feedback', {data: item, destinations:destinations, username: session.theUser.firstname, error: 'Invalid Verdict. Sorry. Try again..!!'});
                return;
            });
        }
        else{
            console.log('/updateVerdict');
            checkSession(req,res,'updateVerdict');
        }
    });

    profile.post('/updateFlag',urlencodedParser, function(req, res){
        var flagSchema = {
            "visited": {
              in: 'body',
              matches: {
                options: [/\b(?:true|false)\b/],
                errorMessage: "Invalid flag"
              }
            }
          }
          console.log(req.body.flag);
        req.check(flagSchema);
        var errors = req.validationErrors();
        console.log('ppppp',errors);
        if(errors){
            var itemcode = req.body.itemCode;
            var pos = checkIfAlreadyExists(itemcode,session.userProfile);
            var dest = itemdb.getAllDestinations();
            var destinations;
            dest.then(function(data){
                destinations = data;
                var item = session.userProfile[pos];
                res.render('feedback', {data: item, destinations:destinations, username: session.theUser.firstname, error: 'Invalid flag. Sorry. Try again..!!'});
                return;
            });
        }
        else{
            console.log('/updateFlag');
            checkSession(req,res,'updateFlag');
        }
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
        console.log('/signIn tab');
        if(session.theUser == undefined){
            res.render('login',{username: '', error: ''});
        }
        else {
            console.log("signout clicked")
            signout(req,res);
        }
    });

    profile.post('/signin',urlencodedParser, function(req, res){
        req.check('username','Enter a valid email Address').isEmail();
        var errors = req.validationErrors();
        if(errors){
            res.render('login',{username: '', error: 'Enter a valid email address'});
            return;
        }
        else{
            console.log('/signin');
            username = req.body.username;
            password = req.body.password;
            var ret = authenticateLogin(username, password);
            ret.then(function(isAuth){
                if(isAuth){
                    var dest = itemdb.getAllDestinations();
                    var destinations;
                    dest.then(function(data){
                        destinations = data;
                        res.render('myItems', {data: session.userProfile, destinations: destinations, username: session.theUser.firstname});
                    });
                }
                else{
                    res.render('login',{username: '', error: 'Wrong username/password. Please try again.'});
                }
            });
        }
    });
});
module.exports = profile;
