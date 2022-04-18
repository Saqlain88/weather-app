const request = require("postman-request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=f37266fabbb60736635aee03fb0d04b4&query="+lat+","+long
    request({url, json:true}, (error, {body} ) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined,"Weather is "+body.current.weather_descriptions[0]+". Currently the temprature is "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.\nThe Humidity is "+body.current.humidity+"%.")
        }
    })
}

module.exports = forecast