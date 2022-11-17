const { Pool } = require('pg')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vsxcthxiaisgiy',
  host: 'c2-18-215-41-121.compute-1.amazonaws.com',
  database: 'depqr2p28kevvk',
  password: 'f9c54a39e2e9d24873f2c2ae11bb997a15f19e1bd12e4d2818fc2e7606c37843',
  port: 5432,
})
const client = new Client({   connectionString: process.env.DATABASE_URL,   ssl: {     rejectUnauthorized: false   } });

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


