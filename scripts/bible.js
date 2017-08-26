// Description:
//   Read the Bible
//
// Configuration:
//   None
//
// Commands:
//   wuhu bib day - for daily reading
//	 wuhu bib <query> - for showing verses `wuhu bib John 3:16-17; Psalms 5:8`
// 
// Author:
//   alisonrwu

// var BibleSearch = require('bible-search');
// var bibleSearch = new BibleSearch('ECVgkao3S3fGliLfEhNGwUs94EddjajLx7wERnKY');
var BASE_URL = 'http://labs.bible.org/api/';

module.exports = function(robot) {

	function formatVerse(body) {
		var output = '*'+ body.bookname +' '+ body.chapter +':'+ body.verse+ '*';
		output += ' ' + body.text;
		return output;
	}

    function sortVerses(a, b) {
        if(a.chapter < b.chapter) {
            return -1;
        }
        if(a.chapter > b.chapter) {
            return 1;
        }
        //a.chapter == b.chapter
        if(a.verse < b.verse) {
            return -1;
        }
        if(a.verse > b.verse) {
            return 1;
        }
        return 0;
    }

    robot.respond(/bib day/i, function(msg) {
    	msg.http(BASE_URL).query({
    		passage: 'votd',
    		type: 'json'
    	}).get()(function(err,res,body) {
    		if(err) {
    			msg.send("Error!!!");
    		}
    		var votd = JSON.parse(body)[0];
    		msg.send(formatVerse(votd));
    	});
    });

    robot.respond(/bib (.*)/i, function(msg) {
    	var input = msg.match[1].trim();

    	msg.http(BASE_URL).query({
    		passage: input,
    		type: 'json'
    	}).get()(function(err,res,body) {
    		if(err) {
    			msg.send("Error!!!");
    		}
    		var verses = JSON.parse(body);
            verses.sort(sortVerses);
    		for(var verse of verses) {
    			msg.send(formatVerse(verse));
    		}
    	});
		// msg.send("Query a Bible verse like: `wuhu bib John 3:16-17; Psalms 5:8`")
    });

}