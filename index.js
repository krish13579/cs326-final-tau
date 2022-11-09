const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const router = express.Router();


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')



  router.get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  router.get('/views/pages/Your%20Rides%20Page/yourRides', (req, res) => res.render('pages/Your Rides Page/yourRides'))
  router.get('/views/pages/Sign%20Up%20Page/signUp', (req, res) => res.render('pages/Sign Up Page/signUp'))
  router.get('/views/pages/Your%20Profile%20Page/profile', (req, res) => res.render('pages/Your Profile Page/profile'))
  router.get('/views/pages/Find%20Riders%20Page/findRiders', (req, res) => res.render('pages/Find Riders Page/findRiders'))
  router.get('/', (req, res) => res.render('pages/index'))
  router.get('/views/pages/Find%20Drivers%20Page/findDrivers', (req, res) => res.render('pages/Find Drivers Page/findDrivers'))
  router.get('/views/pages/Messages%20Page/messages', (req, res) => res.render('pages/Messages Page/messages'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
