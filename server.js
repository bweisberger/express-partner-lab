const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const People = require('./models/people');

//post Route
app.post('/people', (req, res)=>{
  People.push(req.body);
  res.redirect('/people');
});

//new page on the way to post route
app.get('/people/new', (req, res)=>{
  res.render('new.ejs');
});

//edit page on the way to update/put route
app.get('/people/:index/edit', (req, res)=>{
  res.render('edit.ejs', {
    person: People[req.params.index],
    index: req.params.index
  });
});

// put Route
app.put('/people/:index', (req, res)=>{
  // console.log(req.body, "<----req.body");
  // console.log(req.params.index, "<----req.params.index")
  // console.log(People[req.params.index], "<----People[req.params.index]")
  People[req.params.index] = req.body;
  res.redirect('/people');
})

//index route
app.get('/people', (req, res)=>{
  res.render('index.ejs', {
    people: People
  });
});

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
