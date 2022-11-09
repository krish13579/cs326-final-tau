const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  app.get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  app.get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  app.get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  app.get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  app.get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  app.get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))
