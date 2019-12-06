/**
 * Dec 5, 2019
 * Frederick Lee
 */

const request = require('request-promise-native');

/**
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  const ipifyIPv4 = 'https://api.ipify.org?format=json';
  return request(ipifyIPv4);
}

/**
 * Makes a request to ipvigilante.com using the provided IP address,
 * to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`)
};

/**
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = body => {
  const data = JSON.parse(body);
  const coords = {
    latitude: data.data.latitude,
    longitude: data.data.longitude
  };
  const openNotifyURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(openNotifyURL);
};

/** 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(coords => fetchISSFlyOverTimes(coords))
    .then(times => JSON.parse(times));
};

module.exports = {
  nextISSTimesForMyLocation,
};
