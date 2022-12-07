const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const db = require('./queries');
//Set Up View Engine
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

//Root Route
app.get("/", (req, res) => {
    res.render("login");
});

//Your Profile Route
app.get("/yourProfile/:userInfo", (req, res) => {
    res.render("profile", JSON.parse(req.params.userInfo));
});

app.get("/findDrivers/:userInfo", (req, res) => {
  
    res.render("findDrivers",JSON.parse(req.params.userInfo));
});

app.get("/findRiders/:userInfo",(req, res) => {
    
    res.render("findRiders", JSON.parse(req.params.userInfo));
});

app.get("/yourRides/:userInfo",(req, res) => {
    
    res.render("yourRides", JSON.parse(req.params.userInfo));
});




//Sign Up Route
app.get("/signUp", (req, res) => {
    res.render("signUp");
});

//User Router
const userRouter = require("./routes/users");
app.use("/users", userRouter);

//Rides Rouetr
const ridesRouter = require("./routes/rides");
app.use("/rides",ridesRouter);


app.listen(PORT);
