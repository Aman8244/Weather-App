const express=require("express");
const app = express();
const https= require("https");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const http = require('http');

app.set("view engine",'ejs');
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.render("index");
}); 

let weatherData,lat,long,latitude,longitude;
let day1,day1min,day1max,day2,day2min,day2max;
let day3,day3min,day3max,day4,day4min,day4max;
let day5,day5min,day5max,day6,day6min,day6max;
let day7,day7min,day7max;

app.post("/",function(req,res){
    const city = req.body.cityName;
    const apikey = "c9869e64f677f82f03afb919f91d39d3";
    const url2 = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apikey;
    http.get(url2,function(response){
        response.on("data",(data)=>{
            weatherData = JSON.parse(data);
            lt= weatherData[0].lat;
            lg = weatherData[0].lon;
            long = lg+"";
            lat= lt+"";
            latitude = parseFloat(lat).toFixed(2);
            longitude = parseFloat(long).toFixed(2); 
            
            const url = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT";
            https.get(url,function(response){
            
                    response.on("data",function(data){
                    const weather = JSON.parse(data);
                   // console.log(weather);
                    
                    day1min = weather.daily.temperature_2m_min[0];
                    day2min = weather.daily.temperature_2m_min[1];
                    day3min = weather.daily.temperature_2m_min[2];
                    day4min = weather.daily.temperature_2m_min[3];
                    day5min = weather.daily.temperature_2m_min[4];
                    day6min = weather.daily.temperature_2m_min[5];
                    day7min = weather.daily.temperature_2m_min[6];

                    day1max = weather.daily.temperature_2m_max[0];
                    day2max = weather.daily.temperature_2m_max[1];
                    day3max = weather.daily.temperature_2m_max[2];
                    day4max = weather.daily.temperature_2m_max[3];
                    day5max = weather.daily.temperature_2m_max[4];
                    day6max = weather.daily.temperature_2m_max[5];
                    day7max = weather.daily.temperature_2m_max[6];

                   
            })
            today = new Date().getDay();
            switch(today){
                case 0:
                    day1 = "Today";
                    day2 = "Monday";
                    day3 = "Tuesday";
                    day4 = "Wednesday";
                    day5 = "Thursday";
                    day6 = "Friday";
                    day7 = "Saturday";
                    break;
                case 1:
                    day1 = "Today";
                    day2 = "Tuesday";
                    day3 = "Wednesday";
                    day4 = "Thursday";
                    day5 = "Friday";
                    day6 = "Saturday";
                    day7 = "Sunday";
                    break;
                case 2:
                    day1 = "Today";
                    day2 = "Wednesday";
                    day3 = "Thursday";
                    day4 = "Friday";
                    day5 = "Saturday";
                    day6 = "Sunday";
                    day7 = "Monday";
                    break;
                case 3:
                    day1 = "Today";
                    day2 = "Thursday";
                    day3 = "Friday";
                    day4 = "Saturday";
                    day5 = "Sunday";
                    day6 = "Monday";
                    day7 = "Tuesday";
                    break;
                case 4:
                    day1 = "Today";
                    day2 = "Friday";
                    day3 = "Saturday";
                    day4 = "Sunday";
                    day5 = "Monday";
                    day6 = "Tuesday";
                    day7 = "Wednesday";
                    break;
                case 5:
                    day1 = "Today";
                    day2 = "Saturday";
                    day3 = "Sunday";
                    day4 = "Monday";
                    day5 = "Tuesday";
                    day6 = "Wednesday";
                    day7= "Thursday";
                    break;
                case 6:
                    day1 = "Today";
                    day2 = "Sunday";
                    day3 = "Monday";
                    day4 = "Tuesday";
                    day5 = "Wednesday";
                    day6 = "Thursday";
                    day7 = "Friday";
                    break;
                default:
                    break;



            }
            res.render("result",{
                day1:day1,
                day2:day2,
                day3:day3,
                day4:day4,
                day5:day5,
                day6:day6,
                day7:day7,
                firstdaymin:day1min,
                seconddaymin:day2min,
                thirddaymin:day3min,
                fourthdaymin:day4min,
                fifthdaymin:day5min,
                sixthdaymin:day6min,
                seventhdaymin:day7min,
                firstdaymax:day1max,
                seconddaymax:day2max,
                thirddaymax:day3max,
                fourthdaymax:day4max,
                fifthdaymax:day5max,
                sixthdaymax:day6max,
                seventhdaymax:day7max

            });
        })
    }); 
    
});
});

app.listen(3000,function(){
    console.log("server started");
});