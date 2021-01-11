const cron = require('node-cron');
const express = require('express');
const https = require('https');
const escapeStringRegexp = require('escape-string-regexp');
require('dotenv').config();

app = express();
const port = process.env.PORT || 3000;

// todo db for messages / numbers. for now using dotenv so I don't leak my phone number
const api = process.env.SMS_API;
const message = process.env.SECRET_MONDAY_MESSAGE;
const numbers = process.env.FRIENDS_PHONE_NUMBERS.split(' ');

const sendMessageToNumbers = (phoneNumbers, message) => {
  phoneNumbers.forEach((number) => {
    const escapedMessage = escapeStringRegexp(message).split(' ').join('%20');
    const options = {
      hostname: api,
      path: '/?message=' + escapedMessage + '&number=' + number,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
  });
};

// Every Monday at 9am send a funny message to the list of numbers
const cronJobFrequency = '00 17 * * 1';
cron.schedule(cronJobFrequency, function () {
  sendMessageToNumbers(numbers, message);
});

app.listen(port);
