var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "add_car_admin_topic";

router.post('/', (req,res,next)=>{

    var carObject = {
        car_name : req.body.car_name,
        car_type : req.body.car_type,
        model_name : req.body.model_name,
        car_rental_price : req.body.car_rental_price
    };

    kafka.make_request(topic_name, carObject, function(err,results){
        console.log('in result');
        console.log(carObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Car Added Successfully");
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":results});
            }
            else {
                console.log("Car addition Failed");
                res.status(202).send({"message":results});
            }

        }
    });
});

module.exports = router;