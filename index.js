const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



const app = express();

  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/public', express.static('public'))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  app.get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  app.get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  app.get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  app.get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  app.get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  app.get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))


  app.listen(PORT, ()=> {
    console.log("server is active")
  });

  app.post("/createUser", (req, res) => {
    console.log(req);
    res.send("user created ");
  });

  app.post("/createRide", (req, res) => {
    res.send('POST request to the homepage')
  });


  let options = url.parse(request.url, true).query;

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

function updateUser(u,response){
    response.write("user " + u.email + " has been updated");
}

function requestRide(r, response){

 response.write("ride request" + r.rideID + " has been created");
}



function reserveSeat(r,response){

    response.write("seat for ride " + r.rideID +" has been reserved");

}


function getBookedRides(u, response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let users = ["tom@gmail.com","steve@gmail.com","mike@gmail.com","john@gmail.com"];
  
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            creator: users[Math.floor(Math.random()*users.length)], 
            type: "offered",
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            numOfSeats: Math.floor(Math.random() * 3),
            bookedUsers: ["bob@gmail.com"]
        };
        rideData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(rideData));
    
    
}

function getOfferedRides(u,response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let users = ["tom@gmail.com","steve@gmail.com","mike@gmail.com","john@gmail.com"];
  
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            creator: users[Math.floor(Math.random()*users.length)], 
            type: "offered",
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            numOfSeats: Math.floor(Math.random() * 3),
            bookedUsers: []
        };
        rideData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(rideData));
    
}

function getAllRequestedRides(response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let users = ["tom@gmail.com","steve@gmail.com","mike@gmail.com","john@gmail.com"];
  
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            creator: users[Math.floor(Math.random()*users.length)], 
            type: "request",
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            numOfSeats: null,
            bookedUsers: []
        };
        rideData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(rideData));
}

function getAllOffereddRides(response){
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    let users = ["tom@gmail.com","steve@gmail.com","mike@gmail.com","john@gmail.com"];
  
    
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {
            rideID: Math.floor(Math.random()*1000),
            creator: users[Math.floor(Math.random()*users.length)], 
            type: "offered",
            origin:cities[Math.floor(Math.random()*cities.length)] , 
            destination: cities[Math.floor(Math.random()*dates.length)], 
            date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], 
            numOfSeats: Math.floor(Math.random() * 3),
            bookedUsers: []
        };
        rideData.push(JSON.stringify(temp));
    }


    response.write(JSON.stringify(rideData));
}

function getUserInformation(email,response){
    let emails = ["tom@gmail.com","steve@gmail.com","mike@gmail.com","john@gmail.com"];
    let fNames = ["tommy","timothy","steven","Bruce"];
    let lNames = ["malhotra","israni","jiminez","patel"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let passwords = ["admin","123","000"];

    let userObject = {
        // Constant String
            "firstName" :fNames[Math.floor(Math.random()*fNames.length)] , 
            //Constant String
            "lastName": lNames[Math.floor(Math.random()*lNames.length)], 
            // Constant Date Object
            "birthday": dates[Math.floor(Math.random()*cities.length)], 
            // Constant String
            "email": emails[Math.floor(Math.random()*emails.length)], 
            // Constant String
            "password": passwords[Math.floor(Math.random()*passwords.length)] ,
        };
        

response.write(JSON.stringify(userObject));
}
