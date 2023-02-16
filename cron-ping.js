const cypress = require('cypress');
const cron = require('node-cron');
const fs = require('fs-extra');

const sendMessage = require('./twilio');

const flightsMBJFile = 'flightsMBJ.json';
const flightsBNAFile = 'flightsBNA.json';

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', async function() {
  console.log('running cypress... 🧪\n');
  
  cypress.run({ headed: true, browser: 'chrome' })
    .then(async (result) => {
      const flightsMBJ = await fs.readJson(flightsMBJFile);
      const flightsBNA = await fs.readJson(flightsBNAFile);

      console.log('Current flightsBNA data ✈️:');
      console.log(JSON.stringify(flightsBNA, null, 2));
      console.log('\n-----------\n')
      console.log('Current flightsMBJ data ✈️:');
      console.log(JSON.stringify(flightsMBJ, null, 2));

      if (flightsMBJ.updatedPts) {
        const message = 
        `The flight to Jamaica 🏝 went from ${flightsMBJ.currentPts} pts to ${flightsMBJ.updatedPts} pts ✈️`;
        sendMessage(message);
    
        await fs.writeJson(flightsMBJFile, {
          previousPts: flightsMBJ.currentPts,
          currentPts: flightsMBJ.updatedPts,
          updatedPts: undefined,
      });
      console.log('👍 Jamiaca flight updated for next check... should send text.');
      } else {
        console.log('🚫 No beneficial changes to Jamaica flight, not sending text.');
      }

      if (flightsBNA.updatedPts) {
        const message =
        `The flight back to Nashville went from ${flightsBNA.currentPts} pts to ${flightsBNA.updatedPts} pts ✈️`;
        sendMessage(message);

        await fs.writeJson(flightsBNAFile, {
            previousPts: flightsBNA.currentPts,
            currentPts: flightsBNA.updatedPts,
            updatedPts: undefined,
        });
        console.log('👍 Nashville flight updated for check... should send text.');
      } else {
        console.log('🚫 No beneficial changes to Nashville flight, not sending text.');
      }


      if (result.failures) {
        console.error('Could not execute tests')
        console.error(result.message)
        process.exit(result.failures)
      }
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    });
});