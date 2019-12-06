/**
 * Dec 5, 2019
 * Frederick Lee
 */

const request = require('request');

const ipifyIPv4 = 'https://api.ipify.org?format=json';
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
  // request(`https://ipvigilante.com/${ip}`, (err, resp, body) => {
  request('https://ipvigilante.com/json/invalidiphere', (err, resp, body) => {
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

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};
