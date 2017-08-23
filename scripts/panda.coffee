module.exports = (robot) ->

	pandaReplies = ['Panda? Panda!', 'I like pandas too', 'You don\'t like pandas? I don\'t like you']

	robot.hear /panda/i, (res) ->
		res.send res.random pandaReplies