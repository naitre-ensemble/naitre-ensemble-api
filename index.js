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

// Create the transporter with the required configuration for Outlook
// change the user and pass !
// const transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com", // hostname
//     secureConnection: false, // TLS requires secureConnection to be false
//     port: 587, // port for secure SMTP
//     tls: {
//        ciphers:'SSLv3'
//     },
//     auth: {
//         user: 'naitreensemble@outlook.fr',
//         pass: 'Funhak09'
//     }
// });


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'naitreensemblenord@gmail.com',
    pass: 'Funhak09'
  }
});



const sendEmail = ({ email, firstname, lastname, phone }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de réservation', // Subject line
    text: `Demande de réservation de  ${firstname} ${lastname}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}`, // plaintext body
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
  console.log(req.body);
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;

  sendEmail({email, firstname, lastname, phone});

  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API naitre ensemble listen on port ${process.env.PORT ? process.env.PORT : '5000'}`);
})
