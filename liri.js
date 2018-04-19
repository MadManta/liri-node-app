require("dotenv").config();

var keys = require("./keys.js");

var mode = process.argv[2];
var query = process.argv[3];

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var omdb = keys.omdb;
var fs = require("fs");

if (mode === "spotify-this-song") {
  spotify.search({ type: "track", query: query, limit: 3 }, function(err, data) {

    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("\n~*~*~*~*~*~*~*~*~*~*~\n")
    console.log("ARTIST NAME: " + JSON.stringify(data.tracks.items[0].album.artists[0].name));
    console.log("SONG TITLE: " + JSON.stringify(data.tracks.items[0].name));
    if (data.tracks.items[0].preview_url == null) {
      console.log("PREVIEW LINK IS UNAVAILABLE");
    } else {
      console.log("PREVIEW LINK: " + JSON.stringify(data.tracks.items[0].preview_url));
    }
    console.log("ALBUM TITLE: " + JSON.stringify(data.tracks.items[0].album.name))
    console.log("\n~*~*~*~*~*~*~*~*~*~*~\n")
  });

} else if (mode === "my-tweets") {

  var Twitter = require('twitter');
   
  var client = new Twitter(keys.twitter);
  
    var params = {screen_name: 'shrinkymachine'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
          console.log("Tweet: " + tweets[i].text + "\nCreated on: " + tweets[i].created_at + "\n\n~*~*~*~*~*~*~*~*~*~*~\n");
        }
      }
    });
  }
else if (mode === "movie-this") {

  request ("http://www.omdbapi.com/?apikey=" + omdb.id + "&t=" + query, function (error, response, data) {
    var movie = JSON.parse(data)
    console.log("\n~*~*~*~*~*~*~*~*~*~*~\n")
    console.log("TITLE: " + movie.Title);
    console.log("YEAR: "  + movie.Year);
    console.log("RATING: " + movie.Rated);
    console.log("COUNTRY: " + movie.Country);
    console.log("PLOT: " + movie.Plot);
    console.log("ACTORS: " + movie.Actors);
    console.log("ROTTEN TOMATOES RATING: " + movie.Ratings[1].Value);
    console.log("\n~*~*~*~*~*~*~*~*~*~*~\n");
  });

} else if (mode === "do-what-it-says") {
  fs.readFile("random.txt", "UTF8", (err, data) => {
    if (err) throw err;
    console.log(data);
  }
)
};


