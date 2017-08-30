// Description:
//   Get some _quality_ music from Youtube
//
// Configuration:
//   None
//
// Commands:
//   wuhu jam - to my most recent song obsession
//   save me [alt]
// 
// Author:
//   alisonrwu

var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyB-dbIR9ikjmnVT38lXveT2GvjaNEOb4so'
var YOUTUBE_PLAYLIST_ID = 'PLRmmX__GO3AhdxGuBxnrkOvnjz5TcxjNg'
var YOUTUBE_BASE_VIDEO = 'https://www.youtube.com/watch?v=';

module.exports = function(robot) {

	robot.hear(/save\s*me(\s*alt)?/i, function(msg) {
		var save_me = msg.match[1] == null? 'GZjt_sA2eso' : 'FuuXh5Oi84Y';

        msg.envelope.fb = {
        	richMsg: {
        		attachment: {
        			"type": "video",
        			"payload": {
        				"url": YOUTUBE_BASE_VIDEO + save_me
        			}
        		}
        	},
        	attachments: true //TODO: can't send to FB GRAPH API endpoint (message attachments).....
        }

        msg.send(YOUTUBE_BASE_VIDEO + save_me);
    });

    robot.respond(/jam/i, function(msg) {
    	var yt_playlistItems = 'https://www.googleapis.com/youtube/v3/playlistItems'

    	var query = {
    		'key': YOUTUBE_API_KEY,
    		'maxResults': '50',
			'part': 'id,contentDetails',
			'playlistId': YOUTUBE_PLAYLIST_ID
		};

    	flipToLastPage(null);

		function flipToLastPage(token) {
			query.pageToken = token;
			msg.http(yt_playlistItems).query(query).get()(function(err,res,body) {
				if(err) {
					return msg.send("Error!!!");
				}
				var json = JSON.parse(body);
				if(json.nextPageToken) {
					flipToLastPage(json.nextPageToken);
				} else {
					msg.send(YOUTUBE_BASE_VIDEO + getLastVideoId(json.items) + '&list=' + YOUTUBE_PLAYLIST_ID);
				}
			});
		}

		function getLastVideoId(videos) {
			return videos[videos.length-1].contentDetails.videoId;
		}
    });

}