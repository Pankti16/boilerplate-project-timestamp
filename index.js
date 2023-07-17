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

//Take date and return the object with unix and utc format of it
const getFormatDate = (date = new Date()) => {
  const newDate = new Date(date);
  const utc = newDate.toUTCString();
  const unix = newDate.valueOf();
  return {unix,utc};
};

//If forgets to pass the date then show the output for current date
app.get("/api/", function (req, res) {
  res.json(getFormatDate());
});

//Show output for the requested date
app.get("/api/:date", function (req, res) {
  //Save request date in a variable
  let tempDate = req.params.date;
  //Create regex for checking if it is a timestamp
  const myRegEx = new RegExp(/\d{5,}/);
  //If it is a timestamp and not a date string then parse it before creating date from it
  if (myRegEx.test(tempDate)) {
    tempDate = parseInt(tempDate);
  }
  //Form date from request date
  const newDate = new Date(tempDate);
  //If date is not valid then return error with empty values
  if (newDate.toString() == "Invalid Date") {
    res.json({unix: "",utc: "", error: "Invalid Date"});
  }
  //Return the output from the data
  res.json(getFormatDate(newDate));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
