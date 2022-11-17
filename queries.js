const Pool = require('pg').Pool
require('dotenv').config()
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: {
      rejectUnauthorized: false,
  }
});

const getAllRequestedRides = (request, response) => {
  pool.query(`SELECT origin, destination, date, price, seats from rides where type='requested'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { fname, lname, email, bdate, password } = request.body

  pool.query('INSERT INTO users (fname, lname, email, bdate, password) VALUES ($1, $2, $3, $4, $5)', [fname, lname, email, bdate, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.email}`)
  })
}

module.exports = { getAllRequestedRides, createUser }


