const yargs = require('yargs');
const axios = require('axios');
const auth = require('./auth/auth.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      description: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('h', 'help')
  .argv;

let geocodeURL = auth.getRequestURL(argv.address);
axios.get(geocodeURL)
.then((response) => {
  
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  } else if (response.data.status === 'REQUEST_DENIED') {
    throw new Error('Access to the API denied.');
  }
  
  console.log(response.data.results[0].formatted_address);

  let currentDate = new Date().toISOString();
  let latitude = response.data.results[0].geometry.location.lat;
  let longitude = response.data.results[0].geometry.location.lng;
  let weatherURL = `https://api.meteomatics.com/${currentDate}/t_2m:C/${latitude},${longitude}/json?model=mix`;

  return axios.get(weatherURL, {
    auth: auth.getAuthObject()
  }); 
})
.then((response) => {
  let temperature = response.data.data[0].coordinates[0].dates[0].value;
  let humidity = 65;
  console.log(`Currently temperature is ${temperature}\u00B0C and humidity is ${humidity}%`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }  
});
