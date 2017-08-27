// Description:
//   a TODO list
//
// Configuration:
//   None
//
// Commands:
//   todo list
//   todo add <task>
//   todo rmv <index of task>
//	 todo check <index of task>
//   todo clean - removes all checked tasks
// 
// Author:
//   alisonrwu

module.exports = function(robot) {
	var todos = [];

	robot.hear(/todo list/i, function(msg) {
		if(todos.length < 1) {
			msg.send('Your `TODO` list is empty.');
		}
		var output = '';
		for(var i=0; i<todos.length; i++) {
			output += (i+1) + '. ' + todos[i] + ' [ ]\n';
		}
		msg.send(output);
	});

	robot.hear(/todo add (.*)/i, function(msg) {
		var task = msg.match[1];
		todos.push(task);
		msg.send('Added task #' + todos.length);
	});

	robot.hear(/todo rmv (\d*)/i, function(msg) {
		var index = msg.match[1];
		if(index < 1 || index > todos.length) {
			msg.send('Please think inside the list... and return an available index, it is currently ' + todos.length + ' tasks long.')
		}
		var removedTask = todos.splice(index-1, 1);
		msg.send('Removed task #' + index + ' ' + removedTask);
	});

	robot.hear(/todo check (\d*)/i, function(msg) {
		var index = msg.match[1];
		if(index < 1 || index > todos.length) {
			msg.send('Please think inside the list... and return an available index, it is currently ' + todos.length + ' tasks long.')
		}
		msg.send('Checked task '+ index);
	});
}