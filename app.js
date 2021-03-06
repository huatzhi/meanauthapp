const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dbconfig = require("./config/database")

mongoose.connect(dbconfig.database);

mongoose.connection.on("connected", () =>{
  console.log('Connected to databse ' + dbconfig.database);
});

mongoose.connection.on("error", (err) =>{
  console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users',users);

//Index Route
app.get('/', (req,res) => {
  res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port );
});