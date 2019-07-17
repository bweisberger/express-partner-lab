const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const People = require('./models/people')

//index route
app.get('/people', (req, res)=>{
  res.render('index.ejs', {
    people: People
  })
})

//root route
app.get('/', (req, res)=>{
  res.send(People);
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})
