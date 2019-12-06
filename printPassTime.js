/**
 * Dec 5, 2019
 * Frederick Lee
 */

/**
 * Prints the pass over time from the open-notify's time object
 * @param {object} time the pass over time object from open-notify's API
 */
const printPassTime = time => {
  const date = new Date(time.risetime * 1000);
  console.log(`Next pass at ${date} for ${time.duration}`);
};