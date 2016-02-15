var mongoose = require('mongoose');

// TODO - Investigate Spotify api to determine access strings for playlists
var PlaylistSchema = new mongoose.Schema({
  name: String,
  uri: String,
  description: String
});

mongoose.model('Playlist', PlaylistSchema);
