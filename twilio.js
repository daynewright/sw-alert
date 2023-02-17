const accountSid = require('./secrets.json').accountSid;
const authToken = require('./secrets.json').authToken;
const messagingServiceSid = require('./secrets.json').messagingServiceSid;

const client = require('twilio')(accountSid, authToken);

module.exports = sendMessage = (messageBody, numbersToSend) => {
  console.log('☎️   SENDING TEXTS!');

  numbersToSend.forEach(num => {
    console.log(`💬 texting ${num.name} at ${num.number}`);
    
    client.messages.create({
      body: messageBody,
      to: num.number,
      messagingServiceSid,
    })
  });
};


