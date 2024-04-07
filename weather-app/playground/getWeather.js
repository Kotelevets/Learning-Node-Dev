const request = require('request');

request({
  auth: {
    user: 'selfemployee_kotelevets_alex',
    pass: 'tP4oHFg4k4',
    sendImmediately: false
  },
  url: 'https://api.meteomatics.com/2024-04-06T04:35:00.000+03:00/t_2m:C/51.5073219,-0.1276474/json?model=mix',
  json: true
  }, 
  (error, response, body) => {
    if (error) {
      console.log('Unable to connect Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find that address.');
    } else if (body.status === 'OK') {
      console.log(body.data[0].coordinates[0].dates[0].value);
    }
  }
);

/*
console.log(response.statusCode);
console.log(response.statusMessage);
console.log(response.body);

401
Unauthorized
Wrong username or password provided.

401
Unauthorized
No username or password provided.
*/
