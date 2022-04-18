const request = require("postman-request")

const geocode = (address , callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=d8ee1a5bc549b9665d530382050965a4&query="+address
    request(url, (error, {body}) => {
        const data = JSON.parse(body)
        if(error){
            callback("Unable to connect",undefined)
        }else if(data.data[0] == 0){
            callback("Unable to find the location, try another",undefined)
        }else{
            callback(undefined,{
                latitude: data.data[0].latitude,
                longitude: data.data[0].longitude,
                address: data.data[0].label
            })
        }
    })
}

module.exports = geocode