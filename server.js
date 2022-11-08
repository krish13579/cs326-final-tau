'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
const { json } = require('express');


const userFile = './users.json';
const ridesFile = './rides.json';
let users = [];
let rides = [];

// MAKE SURE TO CALL THIS FUNCTION SOMEWHERE
function reload(filename1, filename2) {
  /*

    if (fs.existsSync(filename1) && fs.existsSync(filename2) ) {
        const rFile = fs.readFileSync(ridesFile, { encoding: 'utf8' });
        const uFile = fs.readFileSync(userFile, { encoding: 'utf8' });
        users = JSON.parse(uFile);
        rides = JSON.parse(rFile);
    } else {
      users = [];
      rides = [];
    }
    */


 }



function createUser(u, response) {
    
    let nUser = JSON.parse(u);
    /*
    users.push(nUser);
    fs.writeFileSync(JSONfile, JSON.stringify(users), (err) => {
        console.log("Error in writing file")
});
*/
    response.write("<h1> user " + nUser.firstName + " "+nUser.lastName + " created </h1>");
    response.end();
}

function createRide(r,response){
    let nRide = JSON.parse(r);
    /*
    rides.push(nRide);

    fs.writeFileSync(JSONfile, JSON.stringify(rides), (err) => {
        console.log("Error in writing file")
});
*/
    response.write("<h1> ride " + nRide.rideID + " created </h1>");
    response.end();


}

function verifyUser(u, response) {
    let logU = JSON.parse(u);
    let email = logU.email;
    let password = logU.password
    response.write("<h1> email : " + email + " and password: " + password + " is valid" + " </h1>");
}

function getRides(u, response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let fNames = ["bob","tom","steve","mike","john"];
    let lNames = ["smith", "stern", "malhotra", "israni"]
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            driverFirstName: fNames[Math.floor(Math.random()*fNames.length)], 
            driverLastName: lNames[Math.floor(Math.random()*lNames.length)],
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            seatsOffered: Math.floor(Math.random() * 3)};
        rideData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(rideData));
    
    
}

function getExactRide(rideID){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let fNames = ["bob","tom","steve","mike","john"];
    let lNames = ["smith", "stern", "malhotra", "israni"]
    
   let rideData = []
    
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            driverFirstName: fNames[Math.floor(Math.random()*fNames.length)], 
            driverLastName: lNames[Math.floor(Math.random()*lNames.length)],
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            seatsOffered: Math.floor(Math.random() * 3)};
        rideData.push(JSON.stringify(temp));
    


    response.write(JSON.stringify(rideData));
    
}

function getDrives(u, response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let fNames = ["bob","tom","steve","mike","john"];
    let lNames = ["smith", "stern", "malhotra", "israni"]
 
   let driveData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            driverFirstName: fNames[Math.floor(Math.random()*fNames.length)], 
            driverLastName: lNames[Math.floor(Math.random()*lNames.length)],
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            seatsOffered: Math.floor(Math.random() * 3)};
        driveData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(driveData));
    
}

function getAllDrives(response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let fNames = ["bob","tom","steve","mike","john"];
    let lNames = ["smith", "stern", "malhotra", "israni"]
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            driverFirstName: fNames[Math.floor(Math.random()*fNames.length)], 
            driverLastName: lNames[Math.floor(Math.random()*lNames.length)],
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            seatsOffered: Math.floor(Math.random() * 3)};
        rideData.push(JSON.stringify(temp));
    }
    response.write(JSON.stringify(rideData));
}







const headerText = { "Content-Type": "text/html" };
let server = http.createServer();
server.on('request', async (request, response) => {

    response.writeHead(200, headerText);

    let options = url.parse(request.url, true).query;

    response.write(JSON.stringify(options));

    if (request.url.startsWith("/createUser")) {
        createUser(options, response);
    return; 
    } else if (request.url.startsWith("/createRide")) {
    createRide(options, response);
    return; 
    }else if (request.url.startsWith("/verifyUser")) {
        verifyUser(options, response);
        return;
    }
    else if (request.url.startsWith("/userRides")) {
        getRides(options, response);
        return;
    }
    else if (request.url.startsWith("/userDrives")) {
        getDrives(options, response);
        return;
    }else if(request.url.startsWith("/allDrives")){
        getAllDrives(response);
        return;
    }else if(request.url.startsWith("/exactRide")){
        getExactRide(options.rideID,response);
        return;
    }else{
        response.write("no command found.");
        return;
    }
    response.end();
});
server.listen(8080);
reload(userFile,ridesFile);
export {verifyUser}