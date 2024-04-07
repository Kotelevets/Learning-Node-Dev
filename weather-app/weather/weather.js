const request = require('request');
const fs = require('fs');

const fileAuthPath = './weather/auth.json';

let getAuthObject = (filePath) => {
  let authJSON = "";
  try {
    authJSON = fs.readFileSync(filePath);
  } catch(e) {};
  let authObject = JSON.parse(authJSON);
  return authObject;
};

let currentDate = new Date().toISOString();

let getWeather = (lat, lng, callback) => {
  request({
    auth: getAuthObject(fileAuthPath),
    url: `https://api.meteomatics.com/${currentDate}/t_2m:C/${lat},${lng}/json?model=mix`,
    json: true
    }, 
    (error, response, body) => {
      if (error) {
        callback('Unable to connect Meteomatics server.');
      } else if (response.statusCode === 400) {
        callback(`Unable to fetch weather, ${response.statusMessage} - ${response.body}.`);
      } else if (response.statusCode === 401) {
        callback(`${response.statusMessage} - ${response.body}.`);
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.data[0].coordinates[0].dates[0].value,
          humidity: 65   // for example of the result object added constant
                         // humidity is not available now
                         // https://www.meteomatics.com/en/api/available-parameters/?utm_source=Meteomatics+Web+Sign+Up+Customers&utm_campaign=3c8334f2a8-EMAIL_CAMPAIGN_2023_01_16_09_42&utm_medium=email&utm_term=0_6ed61faba6-3c8334f2a8-%5BLIST_EMAIL_ID%5D#api-basic
        });
        //console.log(`Temperature: ${body.data[0].coordinates[0].dates[0].value}\u00B0C.`);
      }
    }
  );
};

module.exports.getWeather = getWeather;
