const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);

//Passport middleware
app.use(passport.initialize());

const client = require("./routes/api/client");


//clean up process
var findRemoveSync = require('find-remove');
findRemoveSync(__dirname + '/public/processedImages', {age: {seconds: 3600}});


app.get("/", (req, res) => {
  res.send("Welcome to Q-Eye!! What are you doing here?");
});

const port = process.env.PORT || 5000;

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.use("/api/client", client);

app.listen(port, () => console.log("Server running on port" + port));
