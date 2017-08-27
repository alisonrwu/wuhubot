// Description:
//   Get the current weather
//
// Configuration:
//   None
//
// Commands:
//   weather <city>
// 
// Author:
//   alisonrwu

var WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
var APP_KEY = '2378282f62d98eeef938dd14842e7479';

module.exports = function(robot) {

	function formatWeather(data) {
		return 'It is ' + data.main.temp + '°C in ' + data.name +', '+ data.sys.country + ' with ' + data.weather[0].description + '.';
	}

	robot.hear(/weather (\w+)/i, function(msg) {
		var city = msg.match[1];

		msg.http(WEATHER_API).query({
			units: 'metric',
			q: city,
			APPID: APP_KEY
		}).get()(function(err,res,body) {
			if(err) {
				return msg.send("Error!!!")
			};
			var data = JSON.parse(body);
			msg.send(formatWeather(data));
		})
	})
}