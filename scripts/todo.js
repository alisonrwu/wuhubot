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
			output += '\n'+ (i+1) +'. '+ checkBox(todos[i].checked) +' '+ todos[i].text;
		}
		return output==''? 'Your `TODO` list is empty.' : output;
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
		msg.send(formatList(todos));
	});

	robot.hear(/^todo rmv (all)?(\d*)?/i, function(msg) {
		var all = msg.match[1];
		var index = msg.match[2];
		if(all){
			msg.send('Removing ' + todos.length + ' tasks...')
			todos = [];
		} else if(index) {
			if(index < 1 || index > todos.length) {
				return msg.send('Please think inside the list... and give an available index, it is currently ' + todos.length + ' tasks long.')
			}
			var removedTask = todos.splice(index-1, 1);
			msg.send('Removed task #' + index + ' ' + removedTask[0].text);
		}
		msg.send(formatList(todos));
	});

	robot.hear(/^todo check (\d*)/i, function(msg) {
		var index = msg.match[1];
		if(index < 1 || index > todos.length) {
			return msg.send('Please think inside the list... and give an available index, it is currently ' + todos.length + ' tasks long.')
		}
		todos[index-1].checked = true;
		msg.send('Checked task #'+ index);
		msg.send(formatList(todos));
	});

	robot.hear(/^todo clean/i, function(msg) {
		if(todos.length < 1) {
			return msg.send('There is nothing to clean, your `TODO` list is empty.');
		}
		var removed = 0;
		for(var i=0; i<todos.length; i++) {
			if(todos[i].checked) {
				todos.splice(i, 1);
				i--;
				removed++;
			}
		}
		if(removed == 0) {
			return msg.emote('No tasks are done... you should really go do something with your life.');
		}
		var task = removed==1? 'task' : 'tasks';
		msg.send('Removed ' + removed + ' done ' + task);
		msg.send(formatList(todos));
	});
}