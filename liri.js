require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var axios = require("axios");
var input = process.argv;
var operation = input[2];
var searchItem = input[3];

if (operation === "concert-this") {
    var concertUrl = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";
    searchItem = searchItem.replace(" ", "%20");
    axios.get(concertUrl).then(
        function(response) {
            console.log("-----------------")
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(response.data[0].datetime);
            console.log("-----------------")
        }
      );  
} else if (operation === "spotify-this-song") {
    spotify.search({ type: 'track', query: searchItem }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("-----------------")
        console.log(searchItem);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
        console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log("-----------------")
    });
} else if (operation === "movie-this") {
    var movieUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";
    searchItem = searchItem.replace(" ", "%20");
    axios.get(movieUrl).then(function (response) {
        console.log("-----------------")
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.imdbRating);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
        console.log("-----------------")
    });
} else if (operation === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
} else {
    console.log("Please enter a valid operation")
}
