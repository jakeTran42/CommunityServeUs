var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title             : { type: String, required: true }
  , url             : { type: String, required: true }
  , summary         : { type: String, required: true }
  , subreddit        : { type: String, required: true }
, comments       : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
, author         : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);
