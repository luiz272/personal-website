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

mongoose.connect('mongodb://localhost:27017/personalSiteDB', {useNewUrlParser:true, useUnifiedTopology: true});

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

// Features //
// Main Get //

app.get('/', function(req, res) {

  const mainPageSchema = {
      page:String,
      language:String,
      intro: {
        main: String,
        sub: String,
        btn: String
      }
    };

  const MainPageModel = mongoose.model('main',mainPageSchema,'main');

  MainPageModel.find({}, function(err, results) {

    if (err) {
      console.log(err);
    } else {
      res.render('main',
        {
          page: results[0].page,
          language: results[0].language,
          introTitle: results[0].intro.main,
          introSubtitle: results[0].intro.sub,
          introButton: results[0].intro.btn
        }
      );
    }

  });

});

// CV Get //

app.get('/cv', function(req, res) {

  res.render('cv', {page:'cv'});

});
