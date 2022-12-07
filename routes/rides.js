const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");

// getAllrides
//getride()

let ridesDB = [   {"rideID" : (Math.floor(Math.random()*1000)),
// Constant String
"creator" : "kmalhotra@umass.edu",
// Boolean = Request or Offered
"type" : "offered",
// Constant String
"origin" : "NY" ,
// Constant String
"destination":"Boston" , 
// Constant Date Object
"date": "01/15/2023", 
// Constant Integer
"price": 10 ,
// Dynamic Integer
"numOfSeats" : 2,
// Dynamic Array
"bookedUsers" : []
}, {"rideID" : (Math.floor(Math.random()*1000)),
// Constant String
"creator" : "test@umass.edu",
// Boolean = Request or Offered
"type" : "requested",
// Constant String
"origin" : "Hartford" ,
// Constant String
"destination":"Amherst" , 
// Constant Date Object
"date": "01/20/2023", 
// Constant Integer
"price": 15 ,
// Dynamic Integer
"numOfSeats" : 1,
// Dynamic Array
"bookedUsers" : []
}];

function createReqRide(u,d){

    let nRide =  {"rideID" : (Math.floor(Math.random()*1000)),
// Constant String
"creator" : u,
// Boolean = Request or Offered
"type" : "requested",
// Constant String
"origin" : d.origin ,
// Constant String
"destination": d.destination , 
// Constant Date Object
"date": d.date, 
// Constant Integer
"price": d.price ,
// Dynamic Integer
"numOfSeats" : d.numOfSeats,
// Dynamic Array
"bookedUsers" : d.bookedUsers
}

ridesDB.push(nRide);
console.log(ridesDB);
    
}

function createOffRide(u,d){

    let nRide =  {"rideID" : (Math.floor(Math.random()*1000)),
// Constant String
"creator" : u,
// Boolean = Request or Offered
"type" : "offered",
// Constant String
"origin" : d.origin ,
// Constant String
"destination": d.destination , 
// Constant Date Object
"date": d.date, 
// Constant Integer
"price": d.price ,
// Dynamic Integer
"numOfSeats" : d.numOfSeats,
// Dynamic Array
"bookedUsers" : d.bookedUsers
}

ridesDB.push(nRide);
console.log(ridesDB);
    
}
//Set Up View Engine
app.set("view engine", "ejs");

router.get("/getAllOfferedRides", (req, res) => {
    let results = [];
    for( elem of ridesDB){
        if(elem.type === "offered"){
            results.push(elem);
        }
    }
    res.json(results);
});

router.get("/getAllRequestedRides", (req, res) => {
    let results = [];
    for( elem of ridesDB){
        if(elem.type === "requested"){
            results.push(elem);
        }
    }
    res.json(results);
});

router.get("/getBookedRides/:userInfo",(req, res) => {
    let user = req.params.userInfo;
    console.log(user);
    let results = [];
    for( elem of ridesDB){
        if(elem.bookedUsers.includes(user)){
            results.push(elem);
        }
    }
    res.json(results);
});

router.get("/getOfferedRides/:userInfo",(req, res) => {
    let user = req.params.userInfo;
    console.log(user);
    let results = [];
    for( elem of ridesDB){
        if(elem.creator = user && elem.type==="offered"){
            results.push(elem);
        }
    }
    res.json(results);
});



router.post('/reserveSeat/:id/:rid', (req, res) => {
   
    let user = req.params.id;
    let rid = req.params.rid;

    for(elem of ridesDB){
        if(elem.rideID = rid){
            elem.bookedUsers.push(user);
            res.json({status: "success"});
        }
    }
    
});



router.post('/requestRide/:userInfo', (req, res) => {
    let body = '';

    let user = JSON.parse(req.params.userInfo);
    console.log("heres user" + user )
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        createReqRide(user,data);
        res.json({status:"success"});
   
    });
 

    
});

router.post('/createRide/:userInfo', (req, res) => {
    let body = '';

    let user = JSON.parse(req.params.userInfo);
    console.log("heres user" + user )
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        createOffRide(user,data);
        res.json({status:"success"});
   
    });
  

    
});


//Exporting Router
module.exports = router;