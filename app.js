// const { response } = require("express");
const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "a247b752bd5f43de11ca6c055780ce85";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      // here data is the all whether data mention in above url
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const tempMIn = WeatherData.main.temp_min;
      const tempMax = WeatherData.main.temp_max;
      const WeatherDescribe = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const ImageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(WeatherDescribe);

      console.log(temp);

      res.render("data", {
        myTemp: temp,
        myMin: tempMIn,
        myMax: tempMax,
        myDescribe: WeatherDescribe,
        myIcon: ImageURL,
      });
    });
  });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server started on port 3000");
});
