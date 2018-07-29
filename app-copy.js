const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./forecast/forecast');

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


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Condition: ${weatherResults.summary}`);
        console.log(`Current Temperature ${weatherResults.temperature}, but feels like ${weatherResults.actualTemperature}`);
      }
    });
  }
});
