/**
 * Dec 5, 2019
 * Frederick Lee
 *
 * https://web.compass.lighthouselabs.ca/days/w02d4/activities/912
 */

const { nextISSTimesForMyLocation } = require('./iss_promised');
const {printPassTime} = require('./printPassTime');


nextISSTimesForMyLocation()
  .then(times => {
    times.forEach(time => {
      printPassTime(time);
    })
  })
  .catch(err => {
    console.log('Failed:', err.message);
  });

//   result.forEach(time => {
//     const date = new Date(time.risetime * 1000);
//     console.log(`Next pass at ${date} for ${time.duration}`);
//   })
// });

// Test fetchMyIP


// TEST fetchISSFlyOverTimes
// const loc = { latitude: '49.27670', longitude: '-123.13000' };
// const loc = { latitude: '-100', longitude: '-123.13000' };
// const loc = { latitude: '49.27670', longitude: '-190' };
// fetchISSFlyOverTimes(loc, (err, times) => {
//   if (err) {
//     console.log('Failed: ', err);
//     return;
//   }
//   console.log(times);
// });