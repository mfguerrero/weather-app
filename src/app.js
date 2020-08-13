const path = require('path')

const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000


// Paths for express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Config static content
app.use(express.static(publicPath))


app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Mario Felix' })
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Mario Felix' })
})
app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Mario Felix', helpmsg: 'Help test message...' })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Address must be provided!' })
  }

  geocode(req.query.address, (error, location) => {
    if (error) return res.send({ error })
    forecast(location, (error, wInfo) => {
      if (error) return res.send({ error })
      res.send({
        forecast: `Today is ${wInfo.weather_descriptions[0]} in ${location.name}. It is currently ${wInfo.temperature}° celcius(feels like ${wInfo.feelslike}°) with a humidity of ${wInfo.humidity}% and there's ${wInfo.precip}% chance of rain`,
        location: location.name,
        address: req.query.address
      })
    });
  });

})

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404', name: 'Mario Felix', notFound: 'Help article not found!' })
})

app.get('*', (req, res) => {
  res.render('404', { title: '404', name: 'Mario Felix', notFound: 'Page not found!' })
})

app.listen(port, () => {
  console.log(`Web Server running on port ${port}`)
})