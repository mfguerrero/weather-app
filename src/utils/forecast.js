const request = require('postman-request')

const forecast = (location, callback) => {
  const { name, latitude, longitude } = location
  request({
    url: 'http://api.weatherstack.com/current',
    qs: {
      access_key: '59ac0fbaef89884dff6226d7b0093b22',
      query: `${latitude}, ${longitude}`
    },
    json: true
  }, (error, response) => {
    error && callback('Cannot access weather service, try again later', undefined)
    !error && response.body.error && callback(`Weather information not found for ${name}`, undefined)
    !error && !response.body.error && callback(undefined, response.body.current)
  });
}

module.exports = forecast