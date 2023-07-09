const express = require('express')
var https = require('follow-redirects').https;
var fs = require('fs');

const app = express()

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static("public"));


app.get('/', (req, res) => {
  var apiKey = '72b4b12d20b1cce11fdd6f9e521241cb';
  var city = req.query.city;
  const myEncodedUri = encodeURIComponent(city);
  const options = {
    'method': 'GET',
    'hostname': 'api.openweathermap.org',
    'path': `https://api.openweathermap.org/data/2.5/weather?q=${myEncodedUri}&{}&appid=${apiKey}&lang=tr&units=metric`,
    'headers': {},
    'maxRedirects': 20
  };

  var req = https.request(options, function (apiRes) {
    var chunks = [];

    apiRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    apiRes.on("end", function () {
      var body = Buffer.concat(chunks);
      res.render('index', {
        weatherData: JSON.parse(body.toString())
      });
    });

    apiRes.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));