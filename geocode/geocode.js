const request = require('request');

var geocodeAddress = (address, callback) => {
    var addressEncoded = encodeURIComponent(address);
    const googleKey = 'AIzaSyAEIPq_Oj7tHaa1Lb2TRBRLI7DFLP9WGcs';

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${googleKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google Servers. ');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address. ');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })       
  }
});
};

module.exports.geocodeAddress = geocodeAddress;