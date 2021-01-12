// Setup //
// Required packages //

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Basic Configuration //

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/personal-site-DB', {useNewUrlParser:true, useUnifiedTopology: true});

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

// Features //
// Main Get //

app.get('/', function(req, res) {

  res.render('main', {});

});
