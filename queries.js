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

const getUserInformation = (request, response) => {
  // const userid = parseInt(request.params.userid)

  // pool.query('SELECT * FROM users WHERE userid = $1', [userid], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).json(results.rows)
  // })
}

const verifyUser = async (request, response) => {
  const { email, password } = request.body;
    // const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
    // const user = data.rows;
    // if (user.length === 0) {
    //   response.status(400).json({
    //   error: "User is not registered, Sign Up first",
    //   })
    // }
    // else{
      const pass = await pool.query(`SELECT password FROM users WHERE email= $1;`, [email])
      console.log(pass)
      if(pass === password){
          response.status(200).json({ status: 'success', message: 'Login successfully!' });
      }
      else{
        console.log(pass)
        return response.status(401).json({ status: 'failed', message: 'Invalid email or password!' });
      }
    }
  //  if(err){
  //   response.status(400).json({ status: 'failed', message: 'Error while login.' });
  // }

const createUser = async (request, response) => {
  const { firstName, lastName, birthday, email, password } = request.body;
  const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
  const arr = data.rows;
  if (arr.length != 0) {
     response.status(401).json({ status: 'failed', message: 'User email exists. Please login or sign up with a different email!' });
     throw new Error(`Error! status: ${response.status}`);

  }
  else {
    pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, birthday, email, password], (error, results) => {
      if (error) {
        throw error;
      }
      console.log("works sign up");
      response.status(201).send(`User added with ID: ${results.email}`);
    })
  }
}

const getAllOfferedRides = (request, response) => {
  pool.query(`SELECT origin, destination, to_char(date, 'Mon/DD/YYYY') fdate, price, Seats from rides where type='offered'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



module.exports = { getAllRequestedRides, createUser, getAllOfferedRides, getUserInformation, verifyUser }

7
