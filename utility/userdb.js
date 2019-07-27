var User = require('../models/user');
var UserProfile = require('../models/userProfile');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TravelDiaries');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Database connected");
    var UserInfo = new mongoose.Schema({
        userid: Number,
        password:String,
        firstname: String,
        lastname: String,
        emailaddr: String,
        addrline1: String,
        addrline2: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    });
    var UserProfilesInfo = new mongoose.Schema({
        userid: Number,
        userItems: [
            {
                itemCode: Number,
                verdict: String,
                visited: String
            }
        ]
    });

    var UsersObj = mongoose.model('Users', UserInfo, 'Users');
    var UserProfilesObj = mongoose.model('UserProfiles', UserProfilesInfo, 'UserProfiles');

    module.exports.UserProfilesObj = UserProfilesObj;
    
    module.exports.getUsers = function () {
        var  AllUsers = new Promise(function (resolve, reject) {
            var users = UsersObj.find({}).exec();
            users.then(function (usersdata) {
                var usersList = [];
                if (usersdata) {
                    for (var i = 0; i < usersdata.length; i++) {
                        let user = new User(
                            usersdata[i].userid,
                            usersdata[i].firstname,
                            usersdata[i].lastname,
                            usersdata[i].emailaddr,
                            usersdata[i].addrline1,
                            usersdata[i].addrline2,
                            usersdata[i].city,
                            usersdata[i].state,
                            usersdata[i].zipcode,
                            usersdata[i].country
                        );
                        usersList.push(user);
                    }
                    resolve(usersList);
                }
                else {
                    reject("no data");
                }
            })
        });
        return AllUsers;
    };
    
    module.exports.getUserProfile = function (userId) {
        var SingleUserProfile = new Promise(function (resolve, reject) {
            var profile = UserProfilesObj.find({ userid: userId }).exec();
            profile.then(function (userProfiledata) {
                if(userProfiledata[0].userid == userId){
                    let userProfileobject = new UserProfile(
                        userProfiledata[0].userid,
                        userProfiledata[0].userItems
                    );
                    resolve(userProfileobject);
                }
                else {
                    reject("no data");
                }
            })
        });
        return SingleUserProfile;
    };

    module.exports.isUserAuthentic = function(email,pass){
        var retuserdata = new Promise(function (resolve, reject) {
            var user = UsersObj.find({ emailaddr: email, password: pass}).exec();
            user.then(function (userdata) {
                if(userdata[0] != undefined ){
                    if(userdata[0].emailaddr == email){
                        resolve(userdata);
                    }
                }
                else {
                    resolve(false);
                }
            })
        });
        return retuserdata;
    }
});