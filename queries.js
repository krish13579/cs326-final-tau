const { Pool } = require('pg')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vsxcthxiaisgiy',
  host: 'c2-18-215-41-121.compute-1.amazonaws.com',
  database: 'depqr2p28kevvk',
  password: 'f9c54a39e2e9d24873f2c2ae11bb997a15f19e1bd12e4d2818fc2e7606c37843',
  port: 5432,
})

const getAllRequestedRides = (request, response) => {
  pool.query(`SELECT origin, destination, date, price, seats from rides where type='requested'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = { getAllRequestedRides }

