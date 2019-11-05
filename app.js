const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;
//const port=process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);


// // Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/client/dist/client'))); // Provide static directory for frontend


// Index Route
// app.get('/', (req, res) => {
//   //res.send('Invalid Endpoint');
//   res.sendFile(path.join(__dirname,'public/index.html'));
// });

// app.get('*',(req,res)=>{
//  res.sendFile(path.join(__dirname,'public/index.html'));
// })


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});


// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
