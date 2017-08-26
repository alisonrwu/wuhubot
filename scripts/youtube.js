// Description:
//   Get some _quality_ music from Youtube
//
// Configuration:
//   None
//
// Commands:
//   wuhu jam
// 
// Author:
//   alisonrwu

module.exports = function(robot) {

	robot.respond(/jam/i, function(msg){
		var yt_base_v = 'https://www.youtube.com/watch?v=';
        var save_me = 'GZjt_sA2eso';

        msg.reply(yt_base_v + save_me);
    });

}