const Pool = require('pg').Pool
require('dotenv').config()
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  connectionString: 'postgres://vsxcthxiaisgiy:f9c54a39e2e9d24873f2c2ae11bb997a15f19e1bd12e4d2818fc2e7606c37843@ec2-18-215-41-121.compute-1.amazonaws.com:5432/depqr2p28kevvk',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: {
      rejectUnauthorized: false,
  }
});
pool.connect(() => console.log("connected"))

const getAllRequestedRides = (request, response) => {
  pool.query(`SELECT origin, destination, to_char(date, 'Mon/DD/YYYY') fdate, price, Seats from rides where type='requested'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { firstName, lastName, birthday, email, password } = request.body;
  pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, birthday, email, password], (error, results) => {
    if (error) {
      alert("failed");

    }
    response.status(201).send(`User added with ID: ${results.email}`)
  })
}

module.exports = { getAllRequestedRides, createUser }


