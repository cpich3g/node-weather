const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var addressEncoded = encodeURIComponent(address);
        const googleKey = 'AIzaSyAEIPq_Oj7tHaa1Lb2TRBRLI7DFLP9WGcs';
    
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${googleKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google Servers. ');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find the address. ');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })       
      }
    });
    })
};


geocodeAddress('Malleshwaram').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});