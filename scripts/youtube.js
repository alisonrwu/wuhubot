// Description:
//   Get some _quality_ music from Youtube
//
// Configuration:
//   None
//
// Commands:
//   jam - to my most recent song obsession
//   chill - to random song of a calm-er selection
//   save me [alt]
// 
// Author:
//   alisonrwu

var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyB-dbIR9ikjmnVT38lXveT2GvjaNEOb4so';
var YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
var YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

module.exports = function(robot) {

	robot.hear(/save\s*me(\s*alt)?/i, function(msg) {
		var save_me = msg.match[1] == null? 'GZjt_sA2eso' : 'FuuXh5Oi84Y';

        msg.envelope.fb = {
        	richMsg: {
        		attachment: {
        			"type": "video",
        			"payload": {
        				"url": YOUTUBE_BASE_URL + save_me
        			}
        		}
        	},
        	attachments: true //TODO: can't send to FB GRAPH API endpoint (message attachments).....
        }

        msg.send(YOUTUBE_BASE_URL + save_me);
    });

    robot.hear(/^(wuhu )?jam/i, function(msg) {
		var YOUTUBE_PLAYLIST_ID = 'PLRmmX__GO3AhdxGuBxnrkOvnjz5TcxjNg';

    	var query = {
    		'key': YOUTUBE_API_KEY,
    		'maxResults': '50',
			'part': 'id,contentDetails',
			'playlistId': YOUTUBE_PLAYLIST_ID
		};

    	flipToLastPage(null);

		function flipToLastPage(token) {
			query.pageToken = token;
			msg.http(YOUTUBE_API).query(query).get()(function(err,res,body) {
				if(err) {
					return msg.send("Error!!!");
				}
				var json = JSON.parse(body);
				if(json.nextPageToken) {
					flipToLastPage(json.nextPageToken);
				} else {
					msg.send(YOUTUBE_BASE_URL + getLastVideoId(json.items) + '&list=' + YOUTUBE_PLAYLIST_ID);
				}
			});
		}

		function getLastVideoId(videos) {
			return videos[videos.length-1].contentDetails.videoId;
		}
    });

    robot.hear(/^(wuhu )?chill/i, function(msg) {
    	var CHILL_PLAYLIST_ID = 'PLRmmX__GO3AhR3fpsx3XPHktV3KFyMhhG';

    	var query = {
    		'key': YOUTUBE_API_KEY,
    		'maxResults': '50',
			'part': 'id,contentDetails',
			'playlistId': CHILL_PLAYLIST_ID
		};

		msg.http(YOUTUBE_API).query(query).get()(function(err,res,body) {
			if(err) {
				return msg.send("Error!!!");
			}
			var json = JSON.parse(body);
			msg.send(YOUTUBE_BASE_URL + getRandomVideoId(json.items) + '&list=' + CHILL_PLAYLIST_ID);
		});

		function getRandomVideoId(videos) {
			var max = videos.length-1;
			var index = Math.floor(Math.random() * max);
			return videos[index].contentDetails.videoId;
		}
    });

}