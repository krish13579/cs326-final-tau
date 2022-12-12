const express = require("express");
const router = express.Router();
const app = express();

//Connect to Heroku Postgres Database for RideBuddy. 
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
//Set Up View Engine
app.set("view engine", "ejs");

//Query db to get all rides with type 'offered' for Find Drivers page
router.get("/getAllOfferedRides", (req, res) => {
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') fdate, price, numOfSeats from rides where type='offered' and date >= now()`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

//Query db to get all rides with type 'requested' for find riders page
router.get("/getAllRequestedRides", (req, res) => {
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') date, price, numOfSeats from rides where type='Request' and date >= now()`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

//Query db to get all reserved rides for a user
router.get("/getBookedRides/:userInfo", (req, res) => {
    let user = req.params.userInfo;
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') date, price from rides where $1=ANY(bookedusers)`, [user], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

//Query db to get all rides a user has created
router.get("/getOfferedRides/:userInfo", (req, res) => {
    let user = req.params.userInfo;
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') date, price from rides where $1=ANY(bookedusers)`, [user], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

//Query db to get contact info relating to rides a user has created. The query retrieves user info and ride id for respective reserved rides.
router.get("/messageData/:userInfo", (req, res) => {
    const user = req.params.userInfo;
    pool.query(`SELECT users.fname, users.lname, users.email, rides.rideid from rides, users where rides.creator = users.email and rides.type='offered' and $1=ANY(rides.bookedusers);`, [user], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            res.status(201).json({ status: 'Success', message: 'No messages yet.' });
        }
        else if (results.rows.length > 0) {
            res.status(200).json(results.rows);
        }
        else {
            res.status(400).json('No messages found.')
        }
    });
});


//Update database to mark seat in ride as reserved and add user to list of booked users.
router.post('/reserveSeat/:id/:rid', (req, res) => {
    let user = req.params.id;
    let rides = JSON.parse(req.params.rid);
    let rideID = rides.rideID;

    pool.query('SELECT * from rides where rideid =$1;', [rideID], (error, results) => {
        if (error) {
            throw error;
        }
        const nSeats = results.rows[0]['numofseats']
        if (nSeats > 0) {
            const book = nSeats - 1;
            const userbook = user + ""

            pool.query('UPDATE rides SET numofseats = $1, bookedusers = array_append(bookedusers, $2) where rides.rideid = $3;', [book, userbook, rideID], (error2, results2) => {
                if (error2) {
                    throw error2;
                }
                res.status(201).json({ status: 'success', message: `Ride requested from  ${results.rows[0]['origin']} to ${results.rows[0]['destination']}` });

            });

        } else {
            res.status(401).json({ status: 'failed', message: `Ride is full` });
        }
    });


});


//Insert ride into database with criteria filled out in form with type requested
router.post('/requestRide/:userInfo', (req, res) => {
    let body = '';

    let user = JSON.parse(req.params.userInfo);
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        const creator = data.creator + ""
        pool.query('INSERT INTO rides (creator, type, origin, destination, date, price, numOfSeats, bookedUsers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [creator, data.type, data.origin, data.destination, data.date, data.price, data.numOfSeats, data.bookedUsers], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: `Ride requested from  ${results.origin} to ${results.destination}` });

        });

    });
});

//Insert ride into database with criteria filled out in form with type offered
router.post('/createRide/:userInfo', (req, res) => {
    let body = '';

    let user = JSON.parse(req.params.userInfo);
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        pool.query('INSERT INTO rides (creator, type, origin, destination, date, price, numOfSeats, bookedUsers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [data.creator, data.type, data.origin, data.destination, data.date, data.price, data.numOfSeats, data.bookedUsers], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: `Ride created from  ${results.origin} to ${results.destination}` });

        });

    });



});


//Exporting Router
module.exports = router;