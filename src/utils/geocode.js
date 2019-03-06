
const request = require('request');

var geocode = (address, callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmF2ZGVlcHNpbmdoMzA4IiwiYSI6ImNqc3Q4b2RkNTF1c3I0M280MnBvMDFvZjUifQ.Qnk0b4EZkQJj3b5oTTWqOA';
  request({url,json:true},(error,{body}={})=>{
    if(error){
      callback(`Unable to connect to ${url}`,undefined);
    }else if(body.features.length===0){
      callback(`Unable to find forcast for provided location. Try another search`,undefined);
    }else{

         callback(undefined,{
           longitude:body.features[0].center[0],
           latitude: body.features[0].center[1],
           location: body.features[0].place_name
         });

       }
  });
}


module.exports = geocode;
