var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "getcount_topic";

router.post('/users', (req,res,next)=>{

    var message="";
    var key = "users";
    kafka.make_request(topic_name, {key}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

router.post('/hotels', (req,res,next)=>{

    var message="";
    var key ="hotels";
    kafka.make_request(topic_name, {key}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

router.post('/flights', (req,res,next)=>{

    var message="";
    var key = "flights";
    kafka.make_request(topic_name, {key}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

router.post('/cars', (req,res,next)=>{

    var message="";
    var key = "cars";
    kafka.make_request(topic_name, {key}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

router.post('/saveRecord', (req,res,next)=>{

    var message="";
    var key = "record";
    var record = req.body.record;
    kafka.make_request(topic_name, {key,record}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

router.post('/getRecord', (req,res,next)=>{

    var message="";
    var key = "userrecord10";
    var userid = req.body.userid;
    kafka.make_request(topic_name, {key,userid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Cars";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});
module.exports = router;