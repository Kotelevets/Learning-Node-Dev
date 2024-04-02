const request = require('request');
const fs = require('fs');

const fileURLPath = 'apistring.json';

// read the API-link from file on the server
let getRequestURL = (filePath) => {
  let linkString = "";
  try{
    linkString = fs.readFileSync(filePath);
  } catch(e) {};
  let linkObject = JSON.parse(linkString);
  return linkObject.path;
};

request({
  url: getRequestURL(fileURLPath),
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
