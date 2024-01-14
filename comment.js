// Create web server
const express = require('express');
const app = express();
const port = 3000;
// Use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// Use ejs
app.set('view engine', 'ejs');
// Use public folder
app.use(express.static('public'));
// Use mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CommentDB', { useNewUrlParser: true, useUnifiedTopology: true });
// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// Create model
const Comment = mongoose.model('Comment', commentSchema);
// Create route
// Get
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { comments: comments });
        }
    });
});
// Post
app.post('/comment', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
// Listen
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});