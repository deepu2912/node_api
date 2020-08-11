const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.get('/email/:name/:cemail/:cphone/:csubject/:cmessage',(request,res)=>{
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
        subject:  csubject,
        text: name + 'has trying to contact you. \n' + 'Please reach us at : ' + name 
        + '\n' + cphone + '\n'  + cemail + '\n'  + cmessage 
      };

      var mailOptions2 = {
        from: 'deepanshu2912@gmail.com',
        to: cemail,
        subject:  'Thanks',
        text: 'Thanks for contacting us.' 
      };
      
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.send('Email Send Successfully')
})

module.exports = router;