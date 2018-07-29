const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
      a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
      }

})
.help()
.alias('help', 'h')
.argv;

var addressEncoded = encodeURIComponent(argv.address);
const googleKey = 'AIzaSyAEIPq_Oj7tHaa1Lb2TRBRLI7DFLP9WGcs';

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${googleKey}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/ff770e1db99399114ea4968ade078a08/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;
  console.log(`It's currently ${temperature}, but feels like ${apparentTemperature}, ${summary}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect API Server.');
  } else {
    console.log(e.message);
  }
});

