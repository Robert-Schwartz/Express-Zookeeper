//require express after downloading express from npm 
const express = require('express');
//set environment variable port
const PORT = process.env.PORT || 3001;
//setting the server (instantiate the server)
const app = express();
//create a route that the front end can request data from
const { animals } = require('./data/animals');

//filter functionality inside the .get() callback
//===================================================
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}
// Find ID takes in the id and array of animals
//================================================
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
    //returns a single animal object
}


// Routes
//=================================================
/*  

get() method requires two arguments, a string that describes the route the client will have to fetch from, and a callback function that will execute every time that route is accessed with a GET request.  We are using the send() method from the res parameter (short for response) to send the string Hello! to our client. 

POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.

*/
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//post method
app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
 });

//make the express server 'app' listen for requests
//============================================================
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
