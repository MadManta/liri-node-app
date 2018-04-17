require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var songSearch = process.argv[2];

spotify.search({ type: "track", query: songSearch, limit: 3 }, function(err, data) {

  if (err) {
    return console.log("Error occurred: " + err);
  }

  //console.log(JSON.stringify(data, null, 2));

  console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name))

});
//   var tracksResponseArray = data.tracks.items;
// 	// Get number of tracks in the response
// 	var numTracks = tracksResponseArray.length;

// 	// Dp the following If the number of tracks is 1 or more.
// 	if (numTracks > 0) {
// 		//Map over each track, store necessary data to variables and log to terminal and history.log
// 		tracksResponseArray.map(trackInfo => {
// 			var artist_name = trackInfo.artists[0].name;
// 			var song_title = trackInfo.name;
// 			var album_title = trackInfo.album.name;
// 			var preview_link = trackInfo.preview_url ? trackInfo.preview_url : "Preview not available".err;

//       console.log("\n--------------------------------------\n");
//       console.log("Artist:", trackInfo.artists[0].name);
// 			console.log("Song:", trackInfo.name);
// 			console.log("Album:", trackInfo.album.name);
// 			console.log("URL:", preview_link);
// 			console.log("\n--------------------------------------\n");

// 		});
// 	} else {
// 		// If 0 tracks returned log to terminal and history.log
// 		console.log("Could not find any tracks with this title.".err);
// 	}

// });






// var Twitter = require('twitter');
 
// var client = new Twitter(keys.twitter);

//   var params = {screen_name: 'shrinkymachine'};
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       for (var i = 0; i < 3; i++) {
//         console.log(tweets[i].text + "\nCreated on: " + tweets[i].created_at);
//       }
//     }
//   });