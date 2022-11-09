const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/public', express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/views/pages/logIn%20Page/login', (req, res) => res.render('pages/logIn Page/login'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
