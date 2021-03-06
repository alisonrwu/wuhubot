// Description:
//   Read the Holy Bible
//
// Configuration:
//   None
//
// Commands:
//   hb day - for daily verse from the Holy Bible
//	 hb <query> - for showing verses, try 'hb John 3:16-17; Psalms 5:8'
// 
// Author:
//   alisonrwu

// var BibleSearch = require('bible-search');
// var bibleSearch = new BibleSearch('ECVgkao3S3fGliLfEhNGwUs94EddjajLx7wERnKY');
var BASE_URL = 'http://labs.bible.org/api/';

module.exports = function(robot) {

	function formatVerse(body) {
		return '*'+ body.bookname +' '+ body.chapter +':'+ body.verse+ '* ' + body.text;
	}

    robot.hear(/^hb day/i, function(msg) {
    	msg.http(BASE_URL).query({
    		passage: 'votd',
    		type: 'json'
    	}).get()(function(err,res,body) {
    		if(err) {
    			return msg.send("Error!!!");
    		}
    		var votd = JSON.parse(body)[0];
    		msg.send(formatVerse(votd));
    	});
    });

    robot.hear(/^hb (.*)/i, function(msg) {
    	var input = msg.match[1].trim();

    	msg.http(BASE_URL).query({
    		passage: input,
    		type: 'json'
    	}).get()(function(err,res,body) {
    		if(err) {
    			return msg.send("Error!!!");
    		}
    		var verses = JSON.parse(body);
    		for(var verse of verses) {
    			msg.send(formatVerse(verse));
    		}
    	});
		// msg.send("Query a Bible verse like: `wuhu bib John 3:16-17; Psalms 5:8`")
    });

}