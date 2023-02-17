const cypress = require('cypress');
const cron = require('node-cron');
const fs = require('fs-extra');
const { spawn } = require('child_process');

const sendMessage = require('./twilio');
const numbersToSend = require('./secrets.json').numbersToSend;


const flightsMBJFile = 'flightsMBJ.json';
const flightsBNAFile = 'flightsBNA.json';
const flightsRobinsonMBJFile = 'flightsRobinsonMBJ.json';

console.log('running script on 30 minute interval.');

const counts = {
  textsSents: 0,
  checksRun: 0,
};

// Schedule tasks to be run on the server.
cron.schedule('*/30 * * * *', async function() {
  console.log('running cypress... 🧪\n');
  
  cypress.run({ headed: true, browser: 'chrome' })
    .then(async (result) => {
      const flightsMBJ = await fs.readJson(flightsMBJFile);
      const flightsBNA = await fs.readJson(flightsBNAFile);
      const flightsRobinsonMBJ = await fs.readJson(flightsRobinsonMBJFile);

      console.log('\n-----------\n')
      console.log('Current flightsBNA data ✈️:');
      console.log(JSON.stringify(flightsBNA, null, 2));
      console.log('\n-----------\n')
      console.log('Current flightsMBJ Wrights/Hancock data ✈️:');
      console.log(JSON.stringify(flightsMBJ, null, 2));
      console.log('\n-----------\n')
      console.log('Current flightsMBJ Robinsons data ✈️:');
      console.log(JSON.stringify(flightsRobinsonMBJ, null, 2));
      console.log('\n-----------\n')


      // Check Jamaica flights for Dayne & Scott //
      if (flightsMBJ.updatedPts) {
        console.log('👍 Jamiaca flight for Wright/Hancocks updated for next check... should send text.\n');
        const message = 
        `The flight to Jamaica 🏝 went from ${flightsMBJ.currentPts} pts to ${flightsMBJ.updatedPts} pts ✈️`;
        sendMessage(message, numbersToSend.filter(n => n.name !== "Kevin"));
        counts.textsSents = ++counts.textsSents;
    
        await fs.writeJson(flightsMBJFile, {
          ...flightsBNA,
          previousPts: flightsMBJ.currentPts,
          currentPts: flightsMBJ.updatedPts,
          updatedPts: undefined,
      });
      } else {
        console.log('🚫 No beneficial changes to Jamaica flight for Wright/Hancocks, not sending text.\n');
      }

      // Check Jamaica flights for Kevin //
      if (flightsRobinsonMBJ.updatedPts) {
        console.log('👍 Jamiaca flight for Robinsons updated for next check... should send text.\n');
        const message = 
        `The flight to Jamaica 🏝 went from ${flightsRobinsonMBJ.currentPts} pts to ${flightsRobinsonMBJ.updatedPts} pts ✈️`;
        sendMessage(message, numbersToSend.filter(n => n.name === "Kevin"));
        counts.textsSents = ++counts.textsSents;
    
        await fs.writeJson(flightsRobinsonMBJFile, {
          ...flightsRobinsonMBJ,
          previousPts: flightsRobinsonMBJ.currentPts,
          currentPts: flightsRobinsonMBJ.updatedPts,
          updatedPts: undefined,
      });
      } else {
        console.log('🚫 No beneficial changes to Jamaica flight for Robinsons, not sending text.\n');
      }

      // Check Nashville flights for all //
      if (flightsBNA.updatedPts) {
        console.log('👍 Nashville flight updated for check... should send text.\n');
        const message =
        `The flight back to Nashville went from ${flightsBNA.currentPts} pts to ${flightsBNA.updatedPts} pts ✈️`;
        sendMessage(message, numbersToSend);
        counts.textsSents = ++counts.textsSents;

        await fs.writeJson(flightsBNAFile, {
            ...flightsBNA,
            previousPts: flightsBNA.currentPts,
            currentPts: flightsBNA.updatedPts,
            updatedPts: undefined,
        });
      } else {
        console.log('🚫 No beneficial changes to Nashville flight, not sending text.\n');
      }

      counts.checksRun = ++counts.checksRun;

      console.log('\n-----------\n')
      console.log(`Texts sent due to price change: ${counts.textsSents}.`);
      console.log(`Number of attempts to check for prices: ${counts.checksRun}.`);
      console.log('\n-----------\n')

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