const axios = require("axios");
const nodemailer = require('nodemailer');
const express = require("express");
const pretty = require('express-prettify');
const cors = require('cors');
const helmet = require("helmet");
const { execQueryWithParams } = require('./db');
const bodyParser = require('body-parser');
const app = express();

app.use(helmet());
app.use(pretty({ query: 'pretty' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'naitreensemblenord@gmail.com',
    pass: 'btcrdenuwxhzbqky'
  }
});


const sendBonCadeauEmail = ({ email, firstname, lastname, phone, prestation, livraison, destinataire, delapart }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de réservation', // Subject line
    text: `Demande de bon cadeau souhaitée pour "${prestation}" de  ${firstname} ${lastname}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}. Le destinataire est ${destinataire}. Le mode de livraison est ${livraison}. Le destinataire est ${destinataire}`, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendPrestationEmail = ({ email, firstname, lastname, phone, prestation, date }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de réservation', // Subject line
    text: `Demande de réservation souhaitée le ${date} pour "${prestation}" de  ${firstname} ${lastname}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}`, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendForfaitEmail = ({ email, firstname, lastname, phone, forfait }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de forfait', // Subject line
    text: `Demande de ${forfait} pour ${firstname} ${lastname}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}`, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendDevisEmail = ({ email, firstname, lastname, phone, structureName, theme }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de devis', // Subject line
    text: `Demande de devis sur le thème ${theme} pour ${firstname} ${lastname} faisant partie de la structure ${structureName}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}`, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendContactEmail = ({ email, firstname, lastname, phone, message }) => {
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: 'naitreensemblenord@gmail.fr', // sender address (who sends)
    to: 'naitreensemble@outlook.fr', // list of receivers (who receives)
    subject: 'Demande de contact', // Subject line
    text: `Demande de contact pour ${firstname} ${lastname}, contacter cette personne sur ce mail : ${email} ou par téléphone au ${phone}. Voici son message : ${message}`, // plaintext body
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

app.post('/cadeau', async function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const prestation = req.body.prestation;
  const destinataire = req.body.destinataire;
  const livraison = req.body.livraison;
  const delapart = req.body.delapart;
  sendBonCadeauEmail({email, firstname, lastname, phone, prestation, destinataire, livraison, delapart });
  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.post('/prestation', async function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const prestation = req.body.prestation;
  const date = req.body.date;
  sendPrestationEmail({email, firstname, lastname, phone, prestation, date});
  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.post('/forfait', async function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const forfait = req.body.forfait;
  sendForfaitEmail({email, firstname, lastname, phone, forfait});
  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.post('/devis', async function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const structureName = req.body.structureName;
  const theme = req.body.theme;
  sendDevisEmail({email, firstname, lastname, phone, structureName, theme});
  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.post('/contact', async function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const message = req.body.message;
  sendContactEmail({email, firstname, lastname, phone, message});
  res.statusCode = 200;
  res.send({message: 'Demande envoyée'});
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API naitre ensemble listen on port ${process.env.PORT ? process.env.PORT : '5000'}`);
})
