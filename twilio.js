const accountSid = require('./secrets.json').accountSid;
const authToken = require('./secrets.json').authToken;
const messagingServiceSid = require('./secrets.json').messagingServiceSid;
const numbersToSend = require('./secrets.json').numbersToSend;

const client = require('twilio')(accountSid, authToken);

module.exports = sendMessage = (messageBody) => {
  console.log('☎️   SENDING TEXTS!');

  numbersToSend.forEach(num => {
    console.log(`💬 texting ${num}`);

    client.messages.create({
      body: messageBody,
      to: num,
      messagingServiceSid,
    })
  });
};


