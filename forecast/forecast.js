const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    
    request({
        url: `https://api.darksky.net/forecast/ff770e1db99399114ea4968ade078a08/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                actualTemperature: body.currently.apparentTemperature,
            })
        } else {
            callback('Unable to fetch weather');
        }               
    });    
};

module.exports.getWeather = getWeather;
