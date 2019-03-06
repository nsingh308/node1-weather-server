
const request = require('request');

var forcast = ({latitude,longitude},callback)=>{
  const url = 'https://api.darksky.net/forecast/2adb73b3a603fd34e31bb8c17f9e42f4/'+latitude+','+longitude+'?'+'units=auto';
  request({url,json:true},(error,{body}={})=>{
    console.log(error);
    if(error){
      callback(`Unable to connect to ${url}`,undefined)
    }else  if (body.error || !body.currently){
      callback(`Unable to find forcast for provided location`,undefined)
    }else {
         const {summary, temperature, precipProbability,humidity} = body.currently
         const returnData = `${summary}.Humidity is: ${humidity}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`;
         callback(undefined,returnData);
       }
  });
};
module.exports = forcast;
