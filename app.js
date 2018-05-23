var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();


mongoose.connect('mongodb://localhost/restful_blog_app');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose/model config

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

//RESTful routes

app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
       if (err) {
           console.log('Error');
       } else {
           res.render('index', {blogs: blogs});
       }
    });
});

app.listen(3000, function () {
    console.log('Server is running');
});