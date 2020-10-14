// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: setting up basic app statements
// ; and api route use
// ;===========================================
// */

/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const EmployeeApi = require("./routes/employee-api"); // imports the employeeApi

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = 3000; // server port

const conn =
  "mongodb+srv://nodebucket_admin:nm8Sj3frqSmY4C3N@buwebdev-cluster-1.duvph.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/employees', EmployeeApi);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
