const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");

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

//Encypt password for user object using bcrypt library. Returns user object with encrypted password.
async function encryptAndSaveToDB(newData) {
    try {
        let result = JSON.parse(JSON.stringify(newData));
        const salt = await bcrypt.genSalt();
        const hashedPassWord = await bcrypt.hash(newData.password, salt);
        result.password = hashedPassWord;
        return result;
        //userObjArray.push(result);
    }
    catch {
        console.log("Unable to encrypt and save data");
    }
}


// Compare user input with hashed password in database. Uses bcrypt library's compareSync function. Returns boolean value of if passwords match. 
async function compareHashedPassword(passInDb, passSent) {
    try {
        return bcrypt.compareSync(passSent, passInDb);
    }
    catch {
        console.log("Unable to match passwords");
    }
}

//Sign Up Routes
router.get("/new", (req, res) => {
    res.render("signUp");
});

// Verify Users Route
//Query database to find user and compare password using helper function compareHashedPassword. 
router.get("/verify/:userObj", async (req, res) => {
    const userObj = JSON.parse(req.params.userObj);
    let foundObj = { "status": false, "password": "null" };

    const passdata = await pool.query(`SELECT password from users where users.email=$1;`, [userObj.email])
    const arr = passdata.rows;
    if (arr.length != 0) {
        foundObj.status = true;
        foundObj.password = arr[0].password;
        const response = {
            "validity": await compareHashedPassword(foundObj.password, userObj.password),
            "comments": foundObj.status === false ? "No Account In Database" : await compareHashedPassword(foundObj.password, userObj.password) ? "Account Exists" : "Incorrect Password"
        };
        res.status(200).json(response);
    }
    else {
        const response = {
            "validity": false,
            "comments": "User does not exist. Please sign up."
        }
        res.status(200).json(response);

    }

});

//register new user by inserting user into database if user doesn't already exist.
router.post("/register/:userObj", async (req, res) => {
    const userObj = JSON.parse(req.params.userObj);
    const data = await pool.query(`SELECT * FROM users WHERE users.email= $1;`, [userObj.email]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
        res.status(401).send('User exists, please log in.');
    }
    else {
        const hashedUser = await encryptAndSaveToDB(userObj)
        console.log(hashedUser.password)
        pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [userObj.firstName, userObj.lastName, userObj.birthday, userObj.email, hashedUser.password], (error, results) => {
            if (error) {
                throw error;
            }
            else {
                res.status(201).json({ status: 'success', message: `User added with ID: ${results.email}` });
            }
        })
    }
});

//Individual User Routes
router.route("/:id")
    .get(async (req, res) => {
        const userId = req.params.id;
        let result = {};
        const user = await pool.query(`SELECT fname, lname, to_char(bdate, 'YYYY-MM-DD') fdate from users where users.email=$1;`, [userId])
        const data = user.rows;

        if (data.length != 0) {
            result["firstName"] = data[0].fname;
            result["lastName"] = data[0].lname;
            result["birthday"] = data[0].fdate;
        }
        res.status(200).json(result);
    })
    //Update user information relating to password change.
    .put((req, res) => {
        const userId = req.params.id;
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            //Adds New User Data
            const data = JSON.parse(body);
            const pass = data;
            const hashed = await encryptAndSaveToDB(pass);
            pool.query('DELETE from users where email = $1', [data.email], (error, results1) => {
                if (error) {
                    throw error;
                }
                pool.query('INSERT INTO users (fname, lname, bdate, email, password) VALUES ($1, $2, $3, $4, $5)', [data.firstName, data.lastName, data.birthday, data.email, hashed.password], (error, results) => {
                    if (error) {
                        throw error;
                    }

                    res.status(201).json({ status: 'success', message: `Password Changed` });


                })
            })

        });

    })

//Exporting Router
module.exports = router;