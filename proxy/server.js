const express = require('express');
const http = require('http');
const app = express();

app.use('/api', (req, res) => {
    const url = 'https://stations.arabiaweather.com' + req.url;
    http.get(url, (response) => {
        response.pipe(res);
        res.header('Access-Control-Allow-Origin', '*'); // Allow from your Azure React app
    });
});

app.listen(process.env.PORT || 3001); // Use the port provided by Azure
