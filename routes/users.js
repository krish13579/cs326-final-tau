const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
// const db = require("../queries.js")
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

//Set Up View Engine
app.set("view engine", "ejs");

async function encryptAndSaveToDB(newData) {
    try {
        let result = JSON.parse(JSON.stringify(newData));
        const salt = await bcrypt.genSalt();
        const hashedPassWord = await bcrypt.hash(newData.password, salt);
        result.password = hashedPassWord;
        userObjArray.push(result);
    }
    catch {
        console.log("Unable to encrypt and save data");
    }
}

async function compareHashedPassword(passInDb, passSent) {
    try {
        return await bcrypt.compare(passSent, passInDb);
    }
    catch {

    }
}



function deleteUserFromDB(userId, storageArr) {
    let result = storageArr.filter(x => {
        x.email !== userId
    });
    return result;
}


//Sign Up Routes
router.get("/new", (req, res) => {
    res.render("signUp");
});

// Verify Users Route
router.get("/verify/:userObj", async (req, res) => {
    const userObj = JSON.parse(req.params.userObj);
    let foundObj = { "status": false, "password": "null" };

    const passdata = await pool.query(`SELECT password from users where users.email=$1;`, [userObj.email])
    const arr = passdata.rows;
    if (arr.length != 0) {
        foundObj.status = true;
        foundObj.password = passdata[0];
    }
    console.log("test" , compareHashedPassword(foundObj.password, userObj.password))
    const response = {
        "validity": compareHashedPassword(foundObj.password, userObj.password),
        "comments": foundObj.status === false ? "No Account In Database" : compareHashedPassword(foundObj.password, userObj.password) ? "Account Exists" : "Incorrect Password"
    };
    res.status(200).json(response);
});

//Individual User Routes
router.route("/:id")
    .get((req, res) => {
        const userId = req.params.id;
        let result = {};
        userObjArray.forEach(x => {
            if (x.email === userId) {
                result["firstName"] = x.firstName;
                result["lastName"] = x.lastName;
                result["birthday"] = x.birthday;
            };
        });
        res.status(200).json(result);
    })
    .post((req, res) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            encryptAndSaveToDB(data);
        });
        res.sendStatus(200);
    })
    .put((req, res) => {
        console.log(userObjArray);
        const userId = req.params.id;
        //Removed Old User Data
        userObjArray = JSON.parse(JSON.stringify(deleteUserFromDB(userId, userObjArray)));
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            //Adds New User Data
            const data = JSON.parse(body);
            encryptAndSaveToDB(data);
        });
        res.sendStatus(200);
    })

//Exporting Router
module.exports = router;