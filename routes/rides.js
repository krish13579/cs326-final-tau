const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
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

router.get("/getAllOfferedRides", (req, res) => {
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') fdate, price, numOfSeats from rides where type='offered'`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get("/getAllRequestedRides", (req, res) => {
    pool.query(`SELECT rideid, origin, destination, to_char(date, 'Mon/DD/YYYY') date, price, numOfSeats from rides where type='Request'`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get("/getBookedRides/:userInfo", (req, res) => {
    let user = req.params.userInfo;
    pool.query(`SELECT origin, destination, to_char(date, 'Mon/DD/YYYY') date, price from rides where $1=ANY(bookedusers)`, [user], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get("/getOfferedRides/:userInfo", (req, res) => {
    let user = req.params.userInfo;
    console.log(user)
    pool.query(`SELECT origin, destination, to_char(date, 'Mon/DD/YYYY') date, price from rides WHERE creator=$1 AND type='offered'`, [user], (error, results) => {
        if (error) {
            throw error
        }
        console.log("TES" + results.rows)
        res.status(200).json(results.rows)
    })
});

router.get("/messageData/:userInfo", (req, res) => {
    const user = req.params.userInfo;
    // AND $1=ANY(bookedusers) , [''+user]
    pool.query(`SELECT creator, origin from rides where type='offered' and $1=ANY(bookedusers);`,[user] ,(error, results) => {
        if (error) {
            throw error
        }
        const data = results.rows;
        console.log(results.rows)
        if(data.length != 0){
            pool.query(`SELECT * from users where email=$1`, [results.rows[0].creator], (error, results2) => {
                if (error) {
                    throw error
                }
                console.log(results2.rows)

                res.status(200).json(results2.rows)
            });
        }
        else{
            res.status(400).json('No messages found.')

        }
    })
});



router.post('/reserveSeat/:id/:rid', (req, res) => {

    let user = req.params.id;
    let rid = req.params.rideid;
    console.log("rid"+rid)
    pool.query('SELECT * from rides where rides.rideid =$1;', [rid], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results.rows)
        if (results.rows.numofseats > 0) {
            const nSeats =  results.rows.numofseats - 1;
            const nBooked = user+""
            console.log("nseats" + nSeats)
            console.log("nbooked" + nBooked)
            pool.query('UPDATE rides SET numofseats = $1, bookedusers = array_append(bookedusers, $2) where rides.rideid = $3;', [nSeats, nBooked, rid], (error2, results2) => {
                if (error2) {
                    throw error2;
                }
                res.status(201).json({ status: 'success', message: `Ride requested from  ${results.rows.origin} to ${results.rows.destination}` });

            });

        } else {
            res.status(201).json({ status: 'failed', message: `Ride is full` });
        }
    });


});



router.post('/requestRide/:userInfo', (req, res) => {
    let body = '';

    let user = JSON.parse(req.params.userInfo);
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        const creator = data.creator+""
        // createReqRide(user, data);
        // res.json({ status: "success" });
        pool.query('INSERT INTO rides (creator, type, origin, destination, date, price, numOfSeats, bookedUsers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [creator, data.type, data.origin, data.destination, data.date, data.price, data.numOfSeats, data.bookedUsers], (error, results) => {
             console.log("creator" + results.rows) 
            if (error) {
                throw error;
            }
            res.status(201).json({ status: 'success', message: `Ride requested from  ${results.origin} to ${results.destination}` });

        });

    });
});

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