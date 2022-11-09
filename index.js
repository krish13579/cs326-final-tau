const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  .get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  .get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  .get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  .get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  .get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
