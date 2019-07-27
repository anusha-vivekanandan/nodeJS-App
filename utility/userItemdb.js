var mongoose = require('mongoose');
var userdb = require('../utility/userdb');
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TravelDiaries');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Database connected");
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

    var UserProfilesObj = userdb.UserProfilesObj;

    module.exports.deleteItemfromUserProfile = function(user,code){
        var returnData = new Promise(function (resolve, reject) {
            var profile = UserProfilesObj.find({ userid: user }).exec();
            profile.then(function (userProfiledata) {
                if(userProfiledata[0].userid == user){
                    userItemdata = userProfiledata[0].userItems;
                }
                for (var i = 0; i < userItemdata.length; i++) {
                    if(userItemdata[i].itemCode == code){
                        userItemdata.splice(i, 1);
                    }
                }
                var userPro = UserProfilesObj.updateOne({userid: user}, {
                    $set:{userItems: userItemdata}}).exec();
                userPro.then(function(userPro){
                    if(userPro){
                        resolve("updated");
                    }
                });
            });
        });
        return returnData;
    }

    module.exports.updateVerdictOfUser = function(user,code,verdict){
        var returnData = new Promise(function (resolve, reject) {
            var profile = UserProfilesObj.find({ userid: user }).exec();
            profile.then(function (userProfiledata) {
                if(userProfiledata[0].userid == user){
                    userItemdata = userProfiledata[0].userItems;
                }
                for (var i = 0; i < userItemdata.length; i++) {
                    if(userItemdata[i].itemCode == code){
                        userItemdata[i].verdict = verdict;
                    }
                }
                var userPro = UserProfilesObj.updateOne({userid: user}, {
                    $set:{userItems: userItemdata}}).exec();
                userPro.then(function(userPro){
                    if(userPro){
                        resolve("updated");
                    }
                });
            });
        });
        return returnData;
    }

    module.exports.updateVisitedOfUser = function(user,code,visited){
        var returnData = new Promise(function (resolve, reject) {
            var profile = UserProfilesObj.find({ userid: user }).exec();
            profile.then(function (userProfiledata) {
                if(userProfiledata[0].userid == user){
                    userItemdata = userProfiledata[0].userItems;
                }
                for (var i = 0; i < userItemdata.length; i++) {
                    if(userItemdata[i].itemCode == code){
                        userItemdata[i].visited = visited;
                    }
                }
                var userPro = UserProfilesObj.updateOne({userid: user}, {
                    $set:{userItems: userItemdata}}).exec();
                userPro.then(function(userPro){
                    if(userPro){
                        resolve("updated");
                    }
                });
            });
        });
        return returnData;
    }

    module.exports.saveDestinationToUser = function(user,userProfile){
        var returnData = new Promise(function (resolve, reject) {
            var userPro = UserProfilesObj.updateOne({userid: user}, {
                $set:{userItems: userProfile}}).exec();
            userPro.then(function(userPro){
                if(userPro){
                    resolve("updated");
                }
            });
        });
        return returnData;
    }
});