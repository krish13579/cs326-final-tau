const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const router = express.Router();


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  .get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  .get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  .get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  .get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  .get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))
  

 app.get('/getBookedRides',(req,res) =>
{
    let r = getBookedRides(null);
    res.send(r);
});

app.get('/getOfferedRides',(req,res) =>
{
    let r = getOfferedRides(null);
    res.send(r);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

  router.post("/createUser", (req, res) => {
    console.log(req);
    res.send("user created ");
  });

function getBookedRides(u){
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
        rideData.push(temp);
    }

    
    return JSON.stringify(rideData);
    
    
}

function getOfferedRides(u){
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
        rideData.push(temp);
    }
    return JSON.stringify(rideData);

    
}
