const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/login Page/login'))
  .get('/', function(req, res) {
    res.send("Hey there! Thanks for visting the site! Be sure to <a href='/views/pages/login Page/login'>login</a>!");
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  