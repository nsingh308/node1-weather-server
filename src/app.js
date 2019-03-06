const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forcast = require('./utils/forcast.js');

const app = express();
const port = 3000;

//Define paths for express engine
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup static directory for content.
app.use(express.static(publicDirectoryPath))

//setup handler and view path
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
  res.render('index',{
    headerText:'Weather',
    title:'Weather Home Page',
    creator:'Navdeep Singh'
  });
});

app.get('/help',(req,res)=>{
  res.render('help',{
    headerText:'Weather',
    title:'Help Page',
    creator:'Navdeep Singh'
  });
});

app.get('/about',(req,res)=>{
  res.render('about',{
    headerText:'Weather',
    title:'About Page',
    creator:'Navdeep Singh'
  });
});

app.get('/weather',(req,res)=>{
  const address = req.query.address;
  if(!address){
    return res.send({error: 'You must provide an address for weather forcast.'})
  }
  geocode(address,(error, {latitude, longitude, location}={})=>{
    if(error){
      return res.send({error})
    }

    forcast ({latitude, longitude},(error,forcast)=>{
      if(error){
        return res.send({ error, latitude, longitude, location });
      }
      res.send({latitude, longitude,location, forcast})
    })
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    headerText:'Weather',
    errorMessage:'Error-Help Page: 404 Page not found !',
    title:'404 Help Page not found',
    creator:'Navdeep Singh'
  })
});

app.get('*',(req,res)=>{
  res.render('404',{
    headerText:'Weather',
    errorMessage:'Error: 404 Page not found !',
    title:'404 Page not found',
    creator:'Navdeep Singh'
  })
});


app.listen(port,()=>{
  console.log('Listening on port'+port);
});
