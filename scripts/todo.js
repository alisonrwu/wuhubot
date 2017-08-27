// Description:
//   a TODO list
//
// Configuration:
//   None
//
// Commands:
//   todo list
//   todo add <task>
//   todo rmv <index of task || all>
//	 todo check <index of task>
//   todo clean - removes all checked tasks
// 
// Author:
//   alisonrwu

module.exports = function(robot) {
	var todos = [];

	function Task(text) {
		this.text = text;
		this.checked = false;
	}

	function formatList(todos) {
		var output = '';
		for(var i=0; i<todos.length; i++) {
			output += '\n'+ (i+1) +'. '+ todos[i].text +' '+ checkBox(todos[i].checked);
		}
		return output;
	}

	function checkBox(b) {
		if(b) {
			return '[/]';
		}
		return '[ ]';
	}

	robot.hear(/^todo list/i, function(msg) {
		if(todos.length < 1) {
			return msg.send('Your `TODO` list is empty.');
		}
		msg.send(formatList(todos));
	});

	robot.hear(/^todo add (.*)/i, function(msg) {
		var task = msg.match[1];
		todos.push(new Task(task));
		msg.send('Added task #' + todos.length);
	});

	robot.hear(/^todo rmv (all)?(\d*)?/i, function(msg) {
		var all = msg.match[1];
		var index = msg.match[2];
		if(all){
			msg.send('Removing ' + todos.length + ' tasks...')
			todos = [];
		} else if(index) {
			if(index < 1 || index > todos.length) {
				return msg.send('Please think inside the list... and return an available index, it is currently ' + todos.length + ' tasks long.')
			}
			var removedTask = todos.splice(index-1, 1);
			msg.send('Removed task #' + index + ' ' + removedTask.text);
		}
	});

	robot.hear(/^todo check (\d*)/i, function(msg) {
		var index = msg.match[1];
		if(index < 1 || index > todos.length) {
			return msg.send('Please think inside the list... and return an available index, it is currently ' + todos.length + ' tasks long.')
		}
		todos[index-1].checked = true;
		msg.send('Checked task #'+ index);
	});

	robot.hear(/^todo clean/i, function(msg) {
		if(todos.length < 1) {
			return msg.send('There is nothing to clean, your `TODO` list is empty.');
		}
		var removed = 0;
		for(var i=0; i<todos.length; i++) {
			if(todos[i].checked) {
				todos.splice(i, 1);
				removed++;
			}
		}
		if(removed == 0) {
			return msg.emote('No done tasks to remove... you should really go do things with your life.');
		} else if(removed == 1) {
			return msg.send('Removed ' + removed + ' done task');
		}
		msg.send('Removed ' + removed + ' done tasks');
	});
}