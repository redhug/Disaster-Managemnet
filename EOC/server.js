const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const authRouter = require('./routes/auth.route')
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/auth", authRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});