var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var db = require("./dbconfig.js");
var fs = require('fs');

// app.use("/", exp.static(__dirname + "/public"));
// app.use("/", bodyParser.urlencoded({extended:false}));

var app = express();
var port = 3600;
//var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));

//var Alert = require('react-bootstrap/lib/Alert');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let employeeSchema = new Schema({
    name: {type: String},
    address: {type: String},
    personalNumber: {type: Number},
    officeNumber: {type: Number},
    image: {data: Buffer, contentType: String}
}, {versionKey: false});

let imgpath = './public/garden-cart.png';
let model = mongoose.model('employee', employeeSchema);

//api for get data from database  
app.get("/api/getdata", function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});


//api for Delete data from database  
app.post("/api/Removedata", function (req, res) {
    model.remove({_id: req.body.id}, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({data: "Record has been Deleted..!!"});
        }
    });
});


//api for Update data from database  
app.post("/api/Updatedata", function (req, res) {
    model.findByIdAndUpdate(req.body.id, {
            name: req.body.name, address: req.body.address, personalNumber: req.body.personalNumber,
            officeNumber: req.body.officeNumber, image: req.body.image
        },
        function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({data: "Record has been Updated..!!"});
        });
});


//api for Insert data from database  
app.post("/api/insertdata", function (req, res) {
    let mod = new model(req.body);

    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({data: "Record has been Inserted..!!"});
        }
    });

    // let a = new model;
    // a.img.data = fs.readFileSync(imgPath);
    // a.img.contentType = 'image/png';
    // a.save(function (err, a) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     else {
    //         res.send({a: "Record has been Inserted..!!"});
    //     }
    // });
});


//server stat on given port  
app.listen(port, function () {
    console.log("server started " + port);
});

