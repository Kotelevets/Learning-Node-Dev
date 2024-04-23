const request = require('request');
const fs = require('fs');
const fileURLPath = '../geocode/google_map_url.json';

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

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURIComponent(address);
    request({
      url: getRequestURL(fileURLPath, encodedAddress),
      json: true
      }, 
      (error, response, body) => {
        if (error) {
          reject('Unable to connect Google server.');
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find that address.');
        } else if (body.status === 'OK') {
          resolve({
            address:   body.results[0].formatted_address,
            latitude:  body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      });
  });
};

geocodeAddress('00000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});


