const fs = require('fs');
const fileURLPath = './auth/google_map_url.json';
const fileAuthPath = './auth/auth.json';

// read the API-link from file on the server
// and creates URL to authorization on Google Map API using
let getRequestURL = (address) => {
  let linkString = "";
  let encodedAddress = encodeURIComponent(address);
  try {
    linkString = fs.readFileSync(fileURLPath);
  } catch(e) {};
  let linkObject = JSON.parse(linkString);
  let requestURL = linkObject.path + '?'
                 + `key=${linkObject.key}`
                 + `&address=${encodedAddress}`;
  return requestURL;
};

// creates an object to authorization on www.meteomatics.com
let getAuthObject = () => {
  let authJSON = "";
  try {
    authJSON = fs.readFileSync(fileAuthPath);
  } catch(e) {};
  let authObject = JSON.parse(authJSON);
  return authObject;
};

module.exports.getRequestURL = getRequestURL;
module.exports.getAuthObject = getAuthObject;
