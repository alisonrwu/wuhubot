# Description
#   Random scripts
#
# Configuration:
#   None
#
# Commands:
#   rand <min> <max> - random number generator, defaults 0-100
#
# Author:
#   chen-ye

module.exports = (robot) ->

	pandaReplies = ['Panda? Panda!', 'I like pandas too', 'You don\'t like pandas? I don\'t like you']

	robot.hear /panda/i, (res) ->
		res.send res.random pandaReplies

	robot.respond /long response/i, (res) ->
		res.send 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diamcommodo nibh ante facilisis.'

	robot.respond /reply/i, (res) ->
		res.reply 'reply'

	robot.respond /plz/i, (res) ->
		res.emote 'no'

	robot.hear /^rand( \d+)?( \d+)?/i, (res) ->
		min = parseInt(res.match[1]) || 0;
		max = parseInt(res.match[2]) || 100;
		res.send Math.floor(Math.random() * (max+1-min) + min)

	