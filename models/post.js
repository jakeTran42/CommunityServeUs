var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title             : { type: String, required: true }
  , address         : { type: String, required: true }
  , summary         : { type: String, required: true }
  , category        : { type: String, required: true }
  , mapsUrl         : { type: String, required: true }
  , time            : { type: String, required: true }
  , month           : { type: String, required: true }
  , day             : { type: String, required: true }
  , comments        : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  , author          : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);
