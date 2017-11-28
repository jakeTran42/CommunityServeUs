var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content             : { type: String, required: true }
  , comments       : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

var autoPopulateComments = function(next) {
  this.populate('comments');
  next();
};
CommentSchema.
  pre('find', autoPopulateComments).
  pre('findOne', autoPopulateComments);
module.exports = mongoose.model('Comment', CommentSchema);
