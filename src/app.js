const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const viewPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname,'../public')


app.use(express.static(publicDirectoryPath))

app.set("view engine","hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req, res)=>{
    res.render("index",{
        title: "Weather",
        name: "Saqlain"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }else{
        geocode( req.query.address, (error, {latitude, longitude, address} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    location:address,
                    forecastData,
                    address: req.query.address
                })
            })
        })
        
    }
})

app.get('/about', (req, res)=>{
    res.render("about",{
        title: "About",
        name: "Saqlain"
    })
})

app.get('/help', (req, res)=>{
    res.render("help",{
        title: "Help ",
        message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        name: "Saqlain"
    })
})

app.get('/help/*', (req, res) => {
    res.render("notfound",{
        title: '404',
        message: 'Help page not found',
        name: "Saqlain"
    })
})

app.get('*', (req, res) => {
    res.render("notfound",{
        title: '404',
        message: 'Page not found',
        name: "Saqlain"
    })
})

app.listen(port, () => console.log("Listening to the port "+port+"..."))