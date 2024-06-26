const auth = require('../auth/auth.js');
const request = require('request');

let geocodeAddress = (address, callback) => {
  request({
    url: auth.getRequestURL(address),
    json: true
    }, 
    (error, response, body) => {
      if (error) {
        callback('Unable to connect Google server.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        callback(undefined, {
          address:   body.results[0].formatted_address,
          latitude:  body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
