const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const People = require('./models/people')

//post Route
app.post('/people', (req, res)=>{
  People.push(req.body);
  res.redirect('/people')
})

//new page on the way to post route
app.get('/people/new', (req, res)=>{
  res.render('new.ejs')
})

//index route
app.get('/people', (req, res)=>{
  res.render('index.ejs', {
    people: People
  })
})

//show Route
app.get('/people/:index', (req, res)=>{
  res.render('show.ejs', {
    person: People[req.params.index]
  });
});

//root route
app.get('/', (req, res)=>{
  res.send(People);
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})
