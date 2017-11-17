const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// const port = process.env.PORT || 3000;
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// Maintenance Mode ***
// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Ahoy express!</h1>');
  res.render('home', {
    welcomeMsg: 'Welcome to my site!',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error: unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
