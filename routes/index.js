const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const fs = require('fs');
const { request } = require('http');
const { json } = require('express');
const { strict } = require('assert');



router.get('/email/:name/:cemail/:cphone/:csubject/:cmessage', (request, res) => {

  fs.exists('query.json', function (exists) {

    if (exists) {

      console.log("yes file exists");

      fs.readFile('query.json', function readFileCallback(err, data) {

        if (err) {

          console.log(err);

        } else {

          var obj = {
            name: request.params.name,
            cemail: request.params.cemail,
            cphone: request.params.cphone,
            csubject: request.params.csubject,
            cmessage: request.params.cmessage,
            Date: new Date()
          }

          var data2 = JSON.parse(data);

          data2.push(obj);
          let json = JSON.stringify(data2);
          fs.writeFileSync('query.json', json);
        }
      });
    } else {

      console.log("file not exists");

      var obj = {
        name: request.params.name,
        cemail: request.params.cemail,
        cphone: request.params.cphone,
        csubject: request.params.csubject,
        cmessage: request.params.cmessage,
        Date: new Date()
      }

      var json_Data = [];

      json_Data.push(obj)

      let json = JSON.stringify(json_Data);

      fs.writeFileSync('query.json', json);
    }
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepanshu2912@gmail.com',
      pass: 'Priya@1996'
    }
  });
  var name = request.params.name;
  var cemail = request.params.cemail;
  var cphone = request.params.cphone;
  var csubject = request.params.csubject;
  var cmessage = request.params.cmessage;

  var mailOptions = {
    from: cemail,
    to: 'deepanshu2912@gmail.com',
    subject: csubject,
    text: name + 'has trying to contact you. \n' + 'Please reach us at : ' + name
      + '\n' + cphone + '\n' + cemail + '\n' + cmessage
  };

  var mailOptions2 = {
    from: 'deepanshu2912@gmail.com',
    to: cemail,
    subject: 'Thanks',
    text: 'Thanks for contacting us.'
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  transporter.sendMail(mailOptions2, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Email Send Successfully')
})


router.get('/login', (request, res) => {
  var rawdata = fs.readFileSync('credentials.json');
  rawdata = JSON.parse(rawdata)
  res.send(rawdata)
})

router.get('/checklogin/:username/:password', (request, res) => {
  var username = request.params.username;
  var password = request.params.password;

  var rawdata = fs.readFileSync('credentials.json');
  rawdata = JSON.parse(rawdata)

  var message = '';

  if (username !== rawdata[0]["username"]) {
    message = message + 'incorrect username \n';
  }
  else if (password !== rawdata[0]["password"]) {
    message = message + 'incorrect password \n';
  }
  else {
    message = message + 'Success';
  }
  res.send(message)
})

router.get('/queries', (request, res) => {
  var rawdata = fs.readFileSync('query.json');
  rawdata = JSON.parse(rawdata)
  res.send(rawdata)
})

router.delete('/queries/:index', (req, res) => {
  var rawdata = fs.readFileSync('query.json');
  rawdata = JSON.parse(rawdata)
  console.log(rawdata);
  console.log(req.params.index);
  rawdata.splice(req.params.index, 1)
  console.log(rawdata);
  let json = JSON.stringify(rawdata);
  fs.writeFileSync('query.json', json);
  res.send("Done")
})

module.exports = router;