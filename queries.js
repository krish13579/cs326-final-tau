const bcrypt = require("bcrypt");
const { response } = require("express");

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

const getConnectedUsers = async (request, response) => {
  const {email} = request.body;
  pool.query(`SELECT creator from rides where type='offered' AND ARRAY_CONTAINS(bookedUsers, $1)`, [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateUser = async (request, response) => {
  const { firstName, lastName, birthday, email, password } = request.body;
  pool.query(`DELETE from users where email = $1 `, [email], (error, results) => {
    if (error) {
      throw error
    }

    
  })

  const hashed = await hashPassword(password);
  pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, birthday, email, hashed], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: 'success', message: `User updated with ID: ${results.email}` });

  })
 

}

const getBookedRides = async (request, response) => {
  const {email} = request.body;
  pool.query(`SELECT * from rides where ARRAY_CONTAINS(bookedUsers, $1)`, [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getUserInformation = async (request, response) => {
  const {email} = request.body;

  const data = await pool.query(`SELECT * FROM users WHERE users.email= $1;`, [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const requestRide = async(request,response) => {

  const {rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers} = request.body;
  
  pool.query('INSERT INTO rides (rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: 'success', message: `Ride requested from  ${results.origin} to ${results.destination}` });

  });


}

const reserveSeat = async(request,response) => {

  const {rideID, email} = request.body;

  pool.query('SELECT * from rides where rides.rideID =$1;', [rideID], (error, results) => {
    if (error) {
      throw error;
    }
    if(results.numOfSeats>0){
      const nSeats = results.numOfSeats - 1;
      const nBooked = results.bookedUsers.push(email);

      pool.query('UPDATE rides SET numOfSeats = $1, bookedUsers = $2 where rides.rideID =$3;', [nSeats,nBooked,rideID], (error2, results2) => {
        if (error2) {
          throw error2;
        }
        response.status(201).json({ status: 'success', message: `Ride requested from  ${results.origin} to ${results.destination}` });

      });

    }else{
      response.status(201).json({ status: 'failed', message: `Ride is full` });
    }

  

    response.status(201).json({ status: 'failed', message: `Could not find existing ride` });

  });
  



}

const createRide = async (request,response) => {
  const {rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers} = request.body;
  
  pool.query('INSERT INTO rides (rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [rideID, creator, type, origin, destination, date, price, numOfSeats, bookedUsers], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: 'success', message: `Ride created from  ${results.origin} to ${results.destination}` });

  });

}

const getOfferedRides = async (request, response) => {
  const {email} = request.body;
  pool.query(`SELECT * from rides WHERE creator = $1 AND type = 'offered' `, [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const verifyUser = async (request, response) => {
  const { email, password } = request.body;
  const passdata = await pool.query(`SELECT password from users where users.email=$1;`, [email])
  const arr = passdata.rows;
  if (arr.length != 0) {
    if (comparePassword(password, passdata.rows[0].password)) {
      console.log("password: ", password);
      console.log("hashed: ", passdata.rows[0].password);
      response.status(200).json({ status: 'success', message: 'Login successfully!' });
    }
    else {
      return response.status(401).json({ status: 'failed', message: 'Invalid email or password!' });
    }
  }
  else {
    return response.status(401).json({ status: 'failed', message: 'Error' });

  }
}
// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}


const createUser = async (request, response) => {
  const { firstName, lastName, birthday, email, password } = request.body;
  const data = await pool.query(`SELECT * FROM users WHERE users.email= $1;`, [email]); //Checking if user already exists
  const arr = data.rows;
  if (arr.length != 0) {
    response.status(401).json({ status: 'failed', message: 'User email exists. Please login or sign up with a different email!' });
  }
  else { //get password
    const hashed = await hashPassword(password);
    pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, birthday, email, hashed], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: 'success', message: `User added with ID: ${results.email}` });

    })
  }
}
async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}



const getAllOfferedRides = (request, response) => {
  pool.query(`SELECT origin, destination, to_char(date, 'Mon/DD/YYYY') fdate, price, Seats from rides where type='offered'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}




module.exports = { updateUser,getAllRequestedRides, createUser, getAllOfferedRides, getUserInformation, verifyUser,requestRide,createRide,reserveSeat,getBookedRides,getOfferedRides,getConnectedUsers }

7
