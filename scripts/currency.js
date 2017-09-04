// Description:
//   Provides currency exchange rates, updated hourly with Open Exchange API
//
// Configuration:
//   None
//
// Commands:
//   <amount> <code> to <code> - Currency exchange rates, updated hourly (code like CAD, HKD, BTC)
// 
// Author:
//   alisonrwu

var APP_ID = '5f8e2d9a018042349e631d29e5942bfd';
var fx = require('money');

module.exports = function(robot) {

	function setupRates(data) {
		if(typeof fx !== "undefined" && fx.rates) {
			fx.rates = data.rates;
			fx.base = data.base;
		} else {
			var fxSetup = {
				rates: data.rates,
				base: data.base
			};
		}
	}

	robot.hear(/^(\d+(\.\d+)?) ([a-zA-Z]+) to ([a-zA-Z]+)/i, function(msg) {
		var isFloat = msg.match[2];
		var amount = isFloat? parseFloat(msg.match[1]+isFloat) : parseInt(msg.match[1]);
		var fromCurr = msg.match[3];
		var toCurr = msg.match[4];

		robot.http('https://openexchangerates.org/api/latest.json?app_id='+APP_ID).get()(function(err,res,body) {
			if(err) {
				return msg.send("Sorry, I don't know the exchange rates atm :'(");
			}
			var data = JSON.parse(body);
			setupRates(data);
			var conversion = fx(amount).from(fromCurr).to(toCurr); //TODO: negative amount input
			msg.send('I believe ' + amount+' '+fromCurr + ' is worth ' + conversion+' '+toCurr);
		})
	})
}