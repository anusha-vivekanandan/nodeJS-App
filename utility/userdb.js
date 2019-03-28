var User = require('../models/user');
var UserProfile = require('../models/userProfile');

module.exports.getUsers = function () {

    let users = [];
    for (let i = 0; i < usersdata.length; i++) {
        let user = new User(usersdata[i].userid,
            usersdata[i].firstname,
            usersdata[i].lastname,
            usersdata[i].emailaddr,
            usersdata[i].addrline1,
            usersdata[i].addrline2,
            usersdata[i].city,
            usersdata[i].state,
            usersdata[i].zipcode,
            usersdata[i].country);
        users.push(user);
    }
    return users;
};

module.exports.getUserProfile = function (userid) {

    for (let i = 0; i < userProfiledata.length; i++) {
        if(userProfiledata[i].userid == userid){
            let userProfileobject = new UserProfile(userProfiledata[i].userid,
                userProfiledata[i].userItems);
            return userProfileobject;
        }
    }
    return null;
};


var usersdata = [
    {
        userid: 1,
        firstname: "Anusha", 
        lastname: "Vivekanandan", 
        emailaddr: "aviveka1@uncc.edu", 
        addrline1: "9543 University Terrace Drive", 
        addrline2: "Apt# F", 
        city: "Charlotte", 
        state: "North Carolina", 
        zipcode: "28262", 
        country: "United States"
    },
    {
        userid: 2,
        firstname: "Bay", 
        lastname: "Kennish", 
        emailaddr: "baykennish@gmail.com", 
        addrline1: "45 Mission Hills", 
        addrline2: "", 
        city: "Dallas", 
        state: "Texas", 
        zipcode: "11524", 
        country: "United States"
    }
];

var userProfiledata = [
    {
        userid: 1,
        userItems: [
            {
                itemCode : 1 ,
                verdict : "Recommended",
                visited : "true"
            },
            {
                itemCode : 3 ,
                verdict : "Must Visit",
                visited : "false"
            }]
    },
    {
        userid: 2,
        userItems: [
            {
                itemCode : 5 ,
                verdict : "Recommended",
                visited : "true"
            },
            {
                itemCode : 7 ,
                verdict : "Must Visit",
                visited : "false"
            }]
    }
];