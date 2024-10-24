// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:dateURL", (req, res) => {
  let date = req.params.dateURL;

  // Check if the parameter is a number (timestamp) or a string
  if (!isNaN(date)) {
      // Handle timestamp in milliseconds
      date = new Date(parseInt(date));
  } else {
      // Handle string date (e.g., '2015-12-25')
      date = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
      // If the date is invalid, return an error
      res.json({error: 'Invalid Date'});
  } else {
      // If the date is valid, return the unix and UTC values
      res.json({
          unix: Math.floor(date.getTime()), 
          utc: date.toUTCString()
      });
  }
});


app.get("/api/", (req, res) => {
   let date = new Date()
   res.json({unix: Math.floor(date.getTime()), utc: date.toUTCString()})
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
