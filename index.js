/**
 * Dec 5, 2019
 * Frederick Lee
 *
 * https://web.compass.lighthouselabs.ca/days/w02d4/activities/895
 */

const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
} = require('./iss');

// Test fetchMyIP
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('Failed: ', error);
//     return;
//   }
//   console.log('IP: ', ip);
// });

// TEST fetchCoordsByIP
// fetchCoordsByIP("162.245.144.188", (err, coords) => {
//   console.log('error: ', err, 'data: ', coords);
// });

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