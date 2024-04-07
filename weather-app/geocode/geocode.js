const fs = require('fs');
const request = require('request');

const fileURLPath = './geocode/google_map_url.json';

// read the API-link from file on the server
let getRequestURL = (filePath, encodedAddress) => {
  let linkString = "";
  try {
    linkString = fs.readFileSync(filePath);
  } catch(e) {};
  let linkObject = JSON.parse(linkString);
  let requestURL = linkObject.path + '?'
                 + `key=${linkObject.key}`
                 + `&address=${encodedAddress}`;
  return requestURL;
};

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request({
    url: getRequestURL(fileURLPath, encodedAddress),
    json: true
    }, 
    (error, response, body) => {
      if (error) {
        callback('Unable to connect Google server.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
