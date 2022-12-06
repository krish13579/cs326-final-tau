const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");

//Set Up View Engine
app.set("view engine", "ejs");

//Using Local Storage
let userObjArray = [{
    "firstName": "Kabir",
    "lastName": "Israni",
    "birthday": "01-12-2002",
    "email" : "test@umass.edu", 
    "password": "pass"
}];

async function encryptAndSaveToDB(newData){
    try{
        let result = JSON.parse(JSON.stringify(newData));
        const salt = await bcrypt.genSalt();
        const hashedPassWord = await bcrypt.hash(newData.password, salt);
        result.password = hashedPassWord;
        userObjArray.push(result);
    }
    catch{
        console.log("Unable to encrypt and save data");
    }
}

async function compareHashedPassword(passInDb, passSent){
    try{
        return await bcrypt.compare(passSent, passInDb);
    }
    catch{

    }
}



function deleteUserFromDB(userId, storageArr){
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
router.get("/verify/:userObj", (req, res) => {
    const userObj = JSON.parse(req.params.userObj);
    let foundObj = {"status": false, "password": "null"};
    userObjArray.forEach(x => {
        if(x.email === userObj.email){
            foundObj.status = true;
            foundObj.password = x.password;
        }
    })
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
            if (x.email === userId){
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