# Description
#   Read the Bible
#
# Configuration:
#   None
#
# Commands:
#   bible daily - for daily verse reading
#
# Author:
#   alisonrwu

module.exports = (robot) ->

	robot.respond /bible daily/i, (res) ->
		res.http("https://dailyverses.net/getdailyverse.ashx")
			.get() (err, response, body) ->
				if err
					res.send "Error: #{err}"
					return
				res.send body