var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var Bills = require('../models/Bill');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    Bills.find({} , {} , function(err, billDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Bill Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            console.log("Temp"+JSON.stringify(billDocuments));
            message = " Bill Data\n" + billDocuments;
            res.code = "201";
            res.data = billDocuments;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;