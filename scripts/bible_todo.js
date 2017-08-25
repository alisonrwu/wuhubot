// Description:
//   holiday detector script
//
// Configuration:
//   None
//
// Commands:
//   hubot is it weekend ?  - returns whether is it weekend or not
//   hubot is it holiday ?  - returns whether is it holiday or not
// 
// Author:
//   alisonrwu

// var BibleSearch = require('bible-search');
// var bibleSearch = new BibleSearch('ECVgkao3S3fGliLfEhNGwUs94EddjajLx7wERnKY');

module.exports = function(robot) {
    robot.respond(/is it (weekend|holiday)\s?\?/i, function(msg){
        var today = new Date();

        msg.reply(today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO");
    });

    // robot.respond(/bible/i, function(res) {

    // });
}