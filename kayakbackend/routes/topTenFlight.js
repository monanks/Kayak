var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var fs = require('fs');
var csv = require("fast-csv");
var stream;

router.post('/', (req,res,next)=>{

    var dict = {};
    var array = [];
    var sorted;
    var csvStream = csv()
        .on("data", function(data){
            var org_dest = data[0]+"-"+data[1];
            if(org_dest in dict)
            {
                console.log("Exist");
                dict[org_dest]++;
            }
            else {
                console.log("Not Exist..New entry");
                dict[org_dest] = data[3];
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

            sorted = array.sort(function(a, b) {
                return (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0)
            });
            console.log("Sorted"+JSON.stringify(sorted.slice(0,10)));
            var message="Get Top Ten Flight..!!";
            console.log(message);
            stream.unpipe(csvStream);
            //console.log("ID--"+results.data._id);
            stream.unpipe(csvStream);
            return res.status(201).send({"message":sorted.slice(0,10)});
        });
        stream = fs.createReadStream("flight_log.csv");
        stream.pipe(csvStream);

    
});

module.exports = router;