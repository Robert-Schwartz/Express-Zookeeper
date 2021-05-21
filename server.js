//require express after downloading express from npm 
const express = require('express');
//set environment variable port
const PORT = process.env.PORT || 3001;
//setting the server (instantiate the server)
const app = express();
//create a route that the front end can request data from
const { animals } = require('./data/animals');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');



// Middleware
// =================================================
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming stats JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// instructs server to maker public files available
app.use(express.static('public'));



//make the express server 'app' listen for requests
//============================================================
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
