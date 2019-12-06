/**
 * Dec 5, 2019
 * Frederick Lee
 *
 * https://web.compass.lighthouselabs.ca/days/w02d4/activities/895
 */

const {
  fetchMyIP,
  fetchCoordsByIP,
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