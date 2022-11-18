const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./queries')




const app = express()
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  .get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  .get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  .get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  .get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  .get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  .get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))



app.get('/getAllRequestedRides', db.getAllRequestedRides);

app.get('/getAllOfferedRides', db.getAllOfferedRides);

app.post("/updateUser", (req, res) => {
  let u = updateUser(null);
  res.send(u);
});

app.get('/getUserInformation', (req, res) => {
  let r = getUserInformation(null);
  res.send(r);
});

app.get('/getBookedRides', (req, res) => {
  let r = getBookedRides(null);
  res.send(r);
});



app.get('/getOfferedRides', (req, res) => {
  let r = getOfferedRides(null);
  res.send(r);
});

app.get('/messageData', (req, res) => {
  let r = getConnectedUsers(null);
  res.send(r);
});

app.post("/createUser", db.createUser);

app.post("/requestRide", (req, res) => {
  let u = requestRide(null);
  res.send(u);
});
app.get('/verifyUser', db.verifyUser);

app.post("/createRide", (req, res) => {
  let u = createRide(null);
  res.send(u);
});
app.post("/reserveSeat", (req, res) => {
  let u = reserveSeat(null);
  res.send(u);
});





app.listen(PORT, () => console.log(`Listening on ${PORT}`));

updateUser

function updateUser(u) {
  if (r == null) {
    return
  }
  let nRide = JSON.parse(r);
  return JSON.stringify(nRide);
}

function reserveSeat(u) {
  if (r == null) {
    return
  }
  let nRide = JSON.parse(r);
  return JSON.stringify(nRide);
}


function createRide(r) {
  if (r == null) {
    return
  }
  let nRide = JSON.parse(r);
  return JSON.stringify(nRide);

}

// function verifyUser(u, p) {
//   let nUser = JSON.parse(u);
//   return JSON.stringify(nUser);
// }

function updateUser(u, response) {
  response.write("user " + u.email + " has been updated");
}

function requestRide(u) {

  let nReq = JSON.parse(u);

  return JSON.stringify(nReq);
}



function reserveSeat(r, response) {

  response.write("seat for ride " + r.rideID + " has been reserved");


}

function getUserInformation(u) {
  let emails = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.com"];
  let fNames = ["tommy", "timothy", "steven", "Bruce"];
  let lNames = ["malhotra", "israni", "jiminez", "patel"];
  let dates = ["2022-01-11", "2011-01-22", "2022-01-12", "2022-10-10"];
  let passwords = ["admin", "123", "000"];

  let userObject = {
    // Constant String
    "firstName": fNames[Math.floor(Math.random() * fNames.length)],
    //Constant String
    "lastName": lNames[Math.floor(Math.random() * lNames.length)],
    // Constant Date Object
    "birthday": dates[Math.floor(Math.random() * dates.length)],
    // Constant String
    "email": emails[Math.floor(Math.random() * emails.length)],
    // Constant String
    "password": passwords[Math.floor(Math.random() * passwords.length)]
  };


  return JSON.stringify(userObject);
}


// function createUser(u) {

//   if (u === null) {
//     return JSON.stringify({ firstName: "yes" });
//   }

//   let nUser = JSON.parse(u);

//   return JSON.stringify(nUser);
// }

function getConnectedUsers(u) {
  let emails = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.com"];
  let fNames = ["tommy", "timothy", "steven", "Bruce"];
  let lNames = ["malhotra", "israni", "jiminez", "patel"];
  let dates = ["12/08/2022", "12/07/2022", "12/06/2022", "12/05/2022"];
  let passwords = ["admin", "123", "000"];
  let users = [];

  for (let i = 0; i < 10; ++i) {
    let userObject = {
      // Constant String
      "firstName": fNames[Math.floor(Math.random() * fNames.length)],
      //Constant String
      "lastName": lNames[Math.floor(Math.random() * lNames.length)],
      // Constant Date Object
      "birthday": dates[Math.floor(Math.random() * dates.length)],
      // Constant String
      "email": emails[Math.floor(Math.random() * emails.length)],
      // Constant String
      "password": passwords[Math.floor(Math.random() * passwords.length)],
    };
    users.push(userObject);
  }



  return JSON.stringify(users);

}



function getBookedRides(u) {
  let cities = ["New York", "Boston", "Hartford", "Amherst"];
  let dates = ["12/08/2022", "12/07/2022", "12/06/2022", "12/05/2022"];
  let prices = ["$30", "$40"];
  let seats = ["1", "2", "3"];
  let users = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.com"];


  let rideData = []
  for (let i = 0; i < 10; ++i) {
    let temp = {
      rideID: Math.floor(Math.random() * 1000),
      creator: users[Math.floor(Math.random() * users.length)],
      type: "offered",
      origin: cities[Math.floor(Math.random() * cities.length)],
      destination: cities[Math.floor(Math.random() * dates.length)],
      date: dates[Math.floor(Math.random() * cities.length)],
      price: prices[Math.floor(Math.random() * prices.length)],
      numOfSeats: Math.floor(Math.random() * 3),
      bookedUsers: ["bob@gmail.com"]
    };
    rideData.push(temp);
  }


  return JSON.stringify(rideData);


}

function getOfferedRides(u) {
  let cities = ["New York", "Boston", "Hartford", "Amherst"];
  let dates = ["12/08/2022", "12/07/2022", "12/06/2022", "12/05/2022"];
  let prices = ["$30", "$40"];
  let seats = ["1", "2", "3"];
  let users = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.com"];


  let rideData = []
  for (let i = 0; i < 10; ++i) {
    let temp = {
      rideID: Math.floor(Math.random() * 1000),
      creator: users[Math.floor(Math.random() * users.length)],
      type: "offered",
      origin: cities[Math.floor(Math.random() * cities.length)],
      destination: cities[Math.floor(Math.random() * cities.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      price: prices[Math.floor(Math.random() * prices.length)],
      numOfSeats: Math.floor(Math.random() * 3),
      bookedUsers: []
    };
    rideData.push(temp);
  }
  return JSON.stringify(rideData);


}

// function getAllRequestedRides() {
    // let cities = ["New York", "Boston", "Hartford", "Amherst"];
    // let dates = ["12/08/2022", "12/07/2022", "12/06/2022", "12/05/2022"];
    // let prices = ["$30", "$40"];
    // let seats = ["1", "2", "3"];
    // let users = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.co    

    // let rideData = []
    // for (let i = 0; i < 10; ++i) {
    //   let temp = {
    //     rideID: Math.floor(Math.random() * 1000),
    //     creator: users[Math.floor(Math.random() * users.length)],
    //     type: "request",
    //     origin: cities[Math.floor(Math.random() * cities.length)],
    //     destination: cities[Math.floor(Math.random() * cities.length)],
    //     date: dates[Math.floor(Math.random() * dates.length)],
    //     price: prices[Math.floor(Math.random() * prices.length)],
    //     numOfSeats: seats[Math.floor(Math.random() * seats.length)],
    //     bookedUsers: [],
    //   };
    //   rideData.push(temp);
    // }
//return JSON.stringify(rideData);
//}


function getAllOfferedRides() {
  let cities = ["New York", "Boston", "Hartford", "Amherst"];
  let dates = ["12/08/2022", "12/07/2022", "12/06/2022", "12/05/2022"];
  let prices = ["$30", "$40"];
  let seats = ["1", "2", "3"];
  let users = ["tom@gmail.com", "steve@gmail.com", "mike@gmail.com", "john@gmail.com"];


  let rideData = []
  for (let i = 0; i < 10; ++i) {
    let temp = {
      rideID: Math.floor(Math.random() * 1000),
      creator: users[Math.floor(Math.random() * users.length)],
      type: "offered",
      origin: cities[Math.floor(Math.random() * cities.length)],
      destination: cities[Math.floor(Math.random() * cities.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      price: prices[Math.floor(Math.random() * prices.length)],
      numOfSeats: Math.floor(Math.random() * 3),
      bookedUsers: [],
    };
    rideData.push(temp);
  }


  return JSON.stringify(rideData);
}
