var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = (app) => {
      // CREATE

    app.post('/posts/:postId/comments', (req, res) => {
      // INSTANTIATE INSTANCE OF MODEL

      var comment = new Comment(req.body);
      console.log("Creating:")
      console.log(req.body)
      // SAVE INSTANCE OF POST MODEL TO DB

      Post.findById(req.params.postId).then((post) => {
        /// found a post by id
        post.comments.unshift(comment)
        return post.save()
      }).then((post) => {
        // post saved
        return comment.save()
      }).then(() => {
        // comment saved
        res.redirect('/posts/' + req.params.postId)
      }).catch((err) => {
        console.log(err.message);
      })
  })

  //new nested comments// New comments
    app.get('/comments/:commentid/new',(req,res) =>{
        Comment.findById(req.params.commentid).then((comment)=>{
            res.render('comment-new', {comment});

        })
    })
// nested comments
  app.post('/comments/:commentid', (req, res)=> {
       // INSTANTIATE INSTANCE OF MODEL
       var comment = new Comment(req.body);
       console.log(req.body)
       // SAVE INSTANCE OF POST MODEL TO DB

       Comment.findById(req.params.commentid).then((origcomment)=>{
           // findById resolved
           console.log(origcomment)
           origcomment.comments.unshift(comment)
           return origcomment.save()
       }).then((origcomment) => {
           // post.save resolved
           return comment.save()
       }).then((origcomment) => {
           // comment.save resolved
           res.redirect('/')
       }).catch((err)=>{
           console.log(err.message, "Could not save comment!")
           res.redirect('/')
       })
   })
}
