const request = require('postman-request')

const geocode = (location, callback) => {
  request({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    qs: {
      access_token: 'pk.eyJ1IjoibWZndWVycmVybyIsImEiOiJja2RucnJycXEwd2dsMnFwanNlY2p5d2dtIn0.PyIodLJwV_BazCCugnocyQ',
      limit: 1
    },
    json: true
  }, (error, response) => {
    //return console.log(response.body)
    const feature = response.body.features[0]
    if (error) {
      callback('Unable to contact location service, try again later!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Location NOT found, try another search', undefined)
    }
    else {
      callback(undefined, {
        latitude: feature.center[1],
        longitude: feature.center[0],
        name: feature.place_name
      })
    }
  })
}

module.exports = geocode