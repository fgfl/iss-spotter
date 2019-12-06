/**
 * Dec 5, 2019
 * Frederick Lee
 */

const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const ipifyIPv4 = 'https://api.ipify.org?format=json';
  request(ipifyIPv4, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Respose: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(err, JSON.parse(body).ip);
    return;
  });
};

/**
 * Get coordinates from IP Vigilante using ip address. Return it through the callback function
 * @param {string} ip ip address to check
 * @param {function} callback callback to pass the latitude and logitude or error back
 *
 */
const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, resp, body) => {
  // request('https://ipvigilante.com/json/invalidiphere', (err, resp, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching coordinates. Respose: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(err,
      {
        latitude: data.data.latitude,
        longitude: data.data.longitude,
      });
    return;
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const openNotifyURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(openNotifyURL, (err, resp, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching coordinates. Respose: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = data.response;
    callback(err, flyOverTimes);
    return;
  });
};

// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for
 * the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (!err) {
      fetchCoordsByIP(ip, (err, coords) => {
        if (!err) {
          fetchISSFlyOverTimes(coords, (err, times) => {
            if (err) return callback(err, null);
            callback(err, times);
          });      
        }
        return callback(err, null);
      });
    }
    return callback(err, null);
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
