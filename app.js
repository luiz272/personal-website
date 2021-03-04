// Setup //
// Required packages //

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Basic Configuration //

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/en', express.static(__dirname + '/public'));
app.use('/pt', express.static(__dirname + '/public'));
app.use('/hu', express.static(__dirname + '/public'));

mongoose.connect('mongodb+srv://<user>:<password>@<server>/<DB>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on port 3000');
});

// Schemas and Models //

const headerSchema = {
  language: String,
  pageTitle: String,
  navbar: {
    home: String,
    about: String,
    projects: String,
    contact: String
  }
}

const HeaderModel = mongoose.model('header', headerSchema, 'header');

const mainPageSchema = {
  page: String,
  language: String,
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

const MainPageModel = mongoose.model('main', mainPageSchema, 'main');

const cvSchema = {

  page: String,
  language: String,
  name: String,
  intro: {
    age: String,
    nationality: String,
    location: String,
    homecity: String
  },
  education: {
    title: String,
    bachelors: String
  },
  work: {
    title: String,
    ms: {
      title: String,
      description: String,
      project4: {
        title: String,
        period: String,
        role: String,
        technologies: String,
        descTitle: String,
        descBody: String
      },
      project3: {
        title: String,
        period: String,
        role: String,
        technologies: String,
        descTitle: String,
        descBody: String
      },
      project2: {
        title: String,
        period: String,
        role: String,
        technologies: String,
        descTitle: String,
        descBody: String
      },
      project1: {
        title: String,
        period: String,
        role: String,
        technologies: String,
        descTitle: String,
        descBody: String
      }
    },
    xp: {
      title: String,
      operational: {
        title: String,
        item1: String,
        item2: String,
        item3: String
      },
      products: {
        title: String,
        item1: String,
      },
      commercial: {
        title: String,
        item1: String,
        item2: String
      }
    },
    b3: {
      title: String,
      project: String,
      objective: String
    }
  },
  academicExperience: {
    title: String,
    si: {
      title: String,
      project: String,
      activities: {
        title: String,
        item1: String,
        item2: String,
        item3: String
      }
    },
    ta: {
      title: String,
      activities: String
    }
  },
  technologies: {
    title: String,
    dataScience: {
      title: String,
      item1: String,
      item2: String
    },
    webDev: {
      title: String
    },
    db: {
      title: String
    },
    misc: {
      title: String,
      item1: String,
      item2: String,
      item3: String,
      item4: String
    }
  },
  languages: {
    title: String,
    pt: String,
    en: String,
    hu: String,
    es: String
  },
  awards: {
    title: String,
    valuation: String,
    monography: String,
    macroeconomics: String,
    microeconomics: String
  },
  courses: {
    title: String,
    insurance: String,
    odsc: String,
    pushkin: String,
    impacta: String
  },
  disclaimer: String
}

const CVModel = mongoose.model('cv', cvSchema, 'cv');

// Features //
// Main Get - Root //

app.get('/', function (req, res) {

  res.redirect('/en');

});

// Main Get - Language Specific //

app.get('/:lang', function (req, res) {

  MainPageModel.find({ language: req.params.lang.toUpperCase() }, function (err, results) {

    if (err) {
      console.log(err);
    } else {

      HeaderModel.find({ language: req.params.lang.toUpperCase() }, function (hErr, hResults) {

        if (hErr) {
          console.log(hErr);
        } else {
          res.render('main', { mainSource: results[0], headerSource: hResults[0] });
        }

      });


    }

  });

});

// CV Get //

app.get('/:lang/cv', function (req, res) {

  CVModel.find({ language: req.params.lang.toUpperCase() }, function (err, results) {

    if (err) {
      console.log(err);
    } else {

      HeaderModel.find({ language: req.params.lang.toUpperCase() }, function (hErr, hResults) {

        if (hErr) {
          console.log(hErr);
        } else {
          res.render('cv', { mainSource: results[0], headerSource: hResults[0], lock: 'true' });
        }

      });

    }

  });

});
