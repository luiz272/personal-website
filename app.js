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

app.use(express.static(__dirname + '/public'));
app.use('/en', express.static(__dirname + '/public'));
app.use('/pt', express.static(__dirname + '/public'));
app.use('/hu', express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/personalSiteDB', {useNewUrlParser:true, useUnifiedTopology: true});

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

// Schemas and Models //

const mainPageSchema = {
    page:String,
    language:String,
    intro: {
      main: String,
      sub: String,
      btn: String
    },
    about: {
      title: String,
      item1: {
        title: String,
        text: String,
        btn: String
      },
      item2: {
        title: String,
        list: {
          item1: String,
          item2: String,
          item3: String,
          item4: String,
          item5: String,
        }
      },
      item3: {
        title: String,
        list: {
          item1: String,
          item2: String,
          item3: String,
          item4: String,
          item5: String,
        }
      }
    },
    projects: {
      title: String,
      item1: {
        title: String,
        description: String
      },
      item2: {
        title: String,
        description: String
      },
      item3: {
        title: String,
        description: String
      },
      btn: String
    },
    contact: {
      title: String,
      name: String,
      email: String,
      message: String,
      btn: String
    }
  };

const MainPageModel = mongoose.model('main',mainPageSchema,'main');

// Features //
// Main Get - Root //

app.get('/', function(req, res) {

  res.redirect('/en');

});

// Main Get - Language Specific //

app.get('/:lang', function(req, res) {

  MainPageModel.find({language:req.params.lang.toUpperCase()}, function(err, results) {

    if (err) {
      console.log(err);
    } else {
      res.render('main',
        {
          mainSource: results[0]
        }
      );
    }

  });

});

// CV Get //

app.get('/:lang/cv', function(req, res) {

  res.render('cv', {page:'cv'});

});
