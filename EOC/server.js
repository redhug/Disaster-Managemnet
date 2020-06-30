const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());
// Establishing database connections
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
//getting routers
const authRouter = require('./routes/auth.route')
const incidentRouter = require('./routes/incident.route')
const reportRouter = require('./routes/report.route')
const resourceRouter = require('./routes/resource.route')
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/resource", resourceRouter);

// Routes
app.use("/api/incident",passport.authenticate('jwt', {session: false}), incidentRouter);
app.use("/api/report",passport.authenticate('jwt', {session: false}), reportRouter );

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});