// Description:
//   holiday detector script
//
// Configuration:
//   None
//
// Commands:
//   wuhu bible daily - for daily verse reading
// 
// Author:
//   alisonrwu

// var BibleSearch = require('bible-search');
// var bibleSearch = new BibleSearch('ECVgkao3S3fGliLfEhNGwUs94EddjajLx7wERnKY');
var BASE_URL = 'http://labs.bible.org/api/';

module.exports = function(robot) {

    robot.respond(/bible daily/i, function(msg) {
    	msg.http(BASE_URL).query({
    		passage: 'votd',
    		type: 'json'
    	}).get()(function(err,res,body) {
    		if(err) {
    			msg.send("Error!!!");
    		}
    		msg.send(format(JSON.parse(body)[0]));
    	});

    	function format(body) {
    		var output = '';
    		output += body.text + ' ';
    		output += '*'+body.bookname +' '+ body.chapter +':'+ body.verse+'*';
    		return output;
    	}
    });
}