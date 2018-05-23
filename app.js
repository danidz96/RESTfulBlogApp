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

//Index route
app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
       if (err) {
           console.log('Error');
       } else {
           res.render('index', {blogs: blogs});
       }
    });
});

//New route
app.get('/blogs/new', function (req, res) {
    res.render('new');
});

//Create route
app.post('/blogs', function (req, res) {
    Blog.create(req.body.blog, function(err, newBlog){
        if (err) {
            res.render('new');
        } else {
            res.redirect('blogs');
        }
    });
});

app.listen(3000, function () {
    console.log('Server is running');
});