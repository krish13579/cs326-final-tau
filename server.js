const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const db = require('./queries');
//Set Up View Engine
app.set("view engine", "ejs");
 
//CSS
app.use('/public', express.static('public'));

//Root Route
app.get("/", (req, res) => {
    res.render("login");
});

//Your Profile Route
app.get("/yourProfile/:userInfo", (req, res) => {
    res.render("profile", JSON.parse(req.params.userInfo));
});

//Sign Up Route
app.get("/signUp", (req, res) => {
    res.render("signUp");
});

//User Router
const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(PORT);