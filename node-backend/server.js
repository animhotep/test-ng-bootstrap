//Lets require import the FS module
var fs = require('fs');

// Express is our web framework for building a rest API
var express = require('express');
var  app = express();
var cors = require('cors');
var randopeep = require('randopeep');
/*
* randopeep is for generating stuff that we can include in our fake data.
* */

generateData();

function generateData() {// Here we generate data for the api that can be used in the front end
    var o = [];
    var d = () => ({
        driverName: randopeep.name(),
        driverCityOrigin: randopeep.address.city(),
        driverLanguage: ['de', 'gb-eng', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random()*5)],
        driverPhone: randopeep.address.phone(),
        driverGender: ['male', 'female'][Math.floor(Math.random()*2)],
        driverInfo: randopeep.corporate.catchPhrase(0),
        carMake: randopeep.corporate.name('large', 0),
        kmDriven: Math.floor(Math.random() * 100000),
        location: randopeep.address.geo()
    });

    for (let i = 0; i<9;  i++) {
        o.push(d());
    }
    fs.writeFileSync("./index.get.json", JSON.stringify(o));
}

//Move object location random every 5 seconds
setInterval(function() {
    var o = JSON.parse(fs.readFileSync('./index.get.json', 'utf8'));

    fs.mkdtemp("temp-", (err, folder) => {
        if (err) return reject(err);

        console.log("The temporary folder path is:", folder);
        fs.writeFileSync(`${folder}/index.get.json`, JSON.stringify(o));
    });
}, 5000);

app.use(cors()); // enable CORS to allow requests from frontend
// register handler to return driver data
app.get('/', function (req, res) {
    fs.readFile('./index.get.json', 'utf8' , (err, data) => {
        res.send(data);
    });
});
// Start the REST API server
app.listen(4000, function() {
    console.log(`API Server is running`)
});
