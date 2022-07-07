const axios = require("axios");
const nodemailer = require('nodemailer');
const express = require("express");
const pretty = require('express-prettify');
const cors = require('cors');
const helmet = require("helmet");
const { execQuery, execQueryWithParams } = require('./db');
const bodyParser = require('body-parser');
const app = express();

app.use(helmet());
app.use(pretty({ query: 'pretty' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

const sendEmail = () => {
  const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.get('/', async function (req, res) {
  res.send('Welcome on Naitre ensemble');
});

app.post('/subscribe', async function (req, res) {
  const email = req.body.email;
  console.log(email);
  let query = `INSERT INTO contacts (email) VALUES ($1) RETURNING *`;
  const response = await execQueryWithParams(query, [email]);
  if(response.code === '23505'){ 
    res.statusCode = 500;
    res.send({message: 'Email already in database'});
  };
  if(response[0]){
    res.send({message: 'Email registered'});
  }
});

app.post('/message', async function (req, res) {
  const email = req.body.email;
  const firsname = req.body.firstname;
  const lastname = req.body.lastname;
  const message = req.body.message;
  const phone = req.body.phone;
  console.log(email, firsname, lastname, message, phone);
  let query = `INSERT INTO messages (email, phone, firstname, lastname, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await execQueryWithParams(query, [email, phone, firsname, lastname, message]);
  if(response[0]){
    res.send({message: 'Message envoyé'});
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API naitre ensemble listen on port ${process.env.PORT ? process.env.PORT : '5000'}`);
})
