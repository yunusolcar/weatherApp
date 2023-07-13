var https = require('follow-redirects').https;
exports.weathers = async (req, res) => {
     city = req.query.city;
     myEncodedUri = encodeURIComponent(city)
     const options = {
          'method': 'GET',
          'hostname': 'api.openweathermap.org',
          'path': `https://api.openweathermap.org/data/2.5/weather?q=${myEncodedUri}&{}&appid=${process.env.API_KEY}&lang=tr&units=metric`,
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
}