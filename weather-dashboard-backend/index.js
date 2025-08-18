const express = require("express");
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors());


app.get('/weather/hourly-weather', async (req, res) => {
    const { lat, lon } = req.query;  // Extract latitude and longitude from query parameters

    if (!lat || !lon) {
        return res.status(400).send('Latitude and Longitude are required');
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
        console.log(typeof lat, lon);
        console.log(url);
    } catch (error) {
        console.log(error);
        console.log(typeof lat, lon);
        console.log(url);
        res.status(500).send('Error fetching data');
    }
});


app.get('/weather/current-weather', async (req, res) => {
    const { lat, lon } = req.query;  // Extract latitude and longitude from query parameters

    if (!lat || !lon) {
        return res.status(400).send('Latitude and Longitude are required');
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,is_day,cloud_cover&daily=temperature_2m_max,temperature_2m_min`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
});

//Endpoint to get user's GPS coordinates
app.get('/weather/get-city-coordinates', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send('City is required!');
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    try{
        const response = await axios.get(url);
        const coordinates = response.data.results.map(c => ({
            latitude: c.latitude,
            longitude: c.longitude,
            cityName: c.name
        }));
        res.json(coordinates);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(8000, () => {
    console.log("server has started");
});