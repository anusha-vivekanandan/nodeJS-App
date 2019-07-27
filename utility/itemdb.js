var Destination = require('../models/item');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TravelDiaries');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Database connected");

    var DestinationsInfo = new mongoose.Schema({
        dest_code: Number,
        dest_name: String,
        catalog_category: String,
        description: String,
        verdict: String,
    });
    var DestinationsObj = mongoose.model('Destinations', DestinationsInfo, 'Destinations');

    module.exports.getAllDestinations = function () {

        var  Alldestinations = new Promise(function (resolve, reject) {
            var dests = DestinationsObj.find({}).exec();
            dests.then(function (destinations) {
                var destList = [];
                if (destinations) {
                    for (var i = 0; i < destinations.length; i++) {
                        let dest = new Destination(
                            destinations[i].dest_code,
                            destinations[i].dest_name,
                            destinations[i].catalog_category,
                            destinations[i].description,
                            destinations[i].verdict,
                            getImageURL(destinations[i].dest_code)
                        );
                        destList.push(dest);
                    }
                    resolve(destList);
                }
                else {
                    reject("no data");
                }
            })
        });
        return Alldestinations;
    };

    getImageURL = function(dest_code){
        return "/../assets/images/"+dest_code+".jpg"
    };

    module.exports.getDestinationDetails = function (dcode) {
        var SingleDest = new Promise(function (resolve, reject) {
            var dest = DestinationsObj.find({ dest_code: dcode }).exec();
            dest.then(function (destination) {
                if (destination) {
                    let dest = new Destination(
                        destination[0].dest_code,
                        destination[0].dest_name,
                        destination[0].catalog_category,
                        destination[0].description,
                        destination[0].verdict,
                        getImageURL(destination[0].dest_code)
                    );
                    resolve(dest);
                }
                else {
                    reject("no data");
                }
            })
        });
        return SingleDest;
    };

    module.exports.getCategories = function () {
        categories = [ 'Trekking' , 'Beaches' ,'Adventure' ]
        return categories;
    };

});