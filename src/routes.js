const express = require("express");
const path = require("path");
const Router = express.Router();
const requests = require('requests');

Router.get("/",(req,res)=>{
  res.render("index");
})

Router.post("/",(req,res)=>{
  const city = req.body.cityname;
  console.log(city);
 
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=56c39d27a11640d544df9b82d70f0f8f`;
function getData(){

  requests(api).on("data",(chunk)=>{
  const arrObj = JSON.parse(chunk);
  if(!arrObj.message){
    
    const temp =  arrObj.main.temp-273;
    const newtemp =  temp.toFixed(2);
  
  const tempStatus =  arrObj.weather[0].main;
  console.log(tempStatus);
  
 
    res.render("index",{
      cityname:arrObj.name,
      country: arrObj.sys.country,
      temp:newtemp,
      WeatherStatus:tempStatus
      
    })

 
}
else{
  res.render("index",{
      response:"error"
    })
}

});
}
getData();
});

  
module.exports = Router;