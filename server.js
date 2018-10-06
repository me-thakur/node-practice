const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials') //add partials (files that are common in all web pages eg: header or footer)
app.set('view engine', 'hbs'); //specifying view engine


//app.use is used to invoke a middleware you want to add
app.use((req, res, next) => {  //registering a middleware,.. (next) is used to move to the next middleware
  var now = new Date().toString();
  console.log();
  var log =`${now}: ${req.method/*loging the request method*/} ${req.url/*loging the urld*/}`;
  fs.appendFile('server.log', log + '\n' ,(err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //to serve static file such as images, css and js

hbs.registerHelper('getCurrentYear', () => { //handlebars invoke the helper with the current context in this case it is providing the current year used in /views/partial/footer.hbs
  return new Date().getFullYear()
});

hbs.registerHelper('ScreamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home page',
    Welcome: 'Welcome to this page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  }); //picking up the about.hbs file
});

app.get('/projects', (req,res) => {
  res.render('project.hbs', {
    pageTitle: 'My Project'
  });
});

app.get('/bad', (req, res) => { //request handler (handling the GET method from user) eg: localhost:3000/bad
  res.send({
    errorMessage: 'Cannot complete the request'
  });
});

app.listen(port, () => { //listening to port 3000
  console.log(`Server is using port ${port}`);
});
