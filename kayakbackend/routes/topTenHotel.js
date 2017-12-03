var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var fs = require('fs');
var csv = require("fast-csv");
var stream = fs.createReadStream("hotel_log.csv");

router.post('/', (req,res,next)=>{

    var dict = {};
    var array = [];
    var csvStream = csv()
        .on("data", function(data){
            if(data[0] in dict)
            {
                console.log("Exist");
                dict[data[0]]++;
            }
            else {
                console.log("Not Exist..New entry");
                dict[data[0]] = data[2];
            }
        })
        .on("end", function(){
            console.log("done");
            console.log("Dict"+JSON.stringify(dict));
            for (var key in dict) {
                array.push({
                    name: key,
                    value: dict[key]
                });
            }

            var sorted = array.sort(function(a, b) {
                return (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0)
            });
            console.log("Sorted"+JSON.stringify(sorted.slice(0,10)));

        });
    stream.pipe(csvStream);

    var message="Get Top Ten Hotel..!!";
    console.log(message);
    //console.log("ID--"+results.data._id);
    return res.status(201).send({"message":sorted.slice(0,10)});
});

module.exports = router;