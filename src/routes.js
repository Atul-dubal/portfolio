const express = require("express");
const path = require("path");
const Router = express.Router();


Router.get("/",(req,res)=>{
  res.render("index");
})

Router.post("/",(req,res)=>{
  const city = req.body.cityname;
  console.log(city);
  
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=56c39d27a11640d544df9b82d70f0f8f`

   fetch(api)
    .then(response => response.json())
    .then(json =>{ console.log(json)
  
    const temp = json.main.temp-273;
    const newtemp = temp.toFixed(2);
  
  const tempStatus = json.weather[0].main;
  console.log(tempStatus);
  if(tempStatus=="Clouds"){
   const weatherStatus= "<i class='fas fa-snowflake'></i>";
  
    res.render("index",{
      cityname:json.name,
      country: json.sys.country,
      temp:newtemp,
      WeatherStatus:weatherStatus
      
    })
    }
    }
    )
    .catch(err => console.error(err));;
  
  
})
module.exports = Router;