const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//can no longer use app for express,  now use Router
const router = require('express').Router();

// Routes
//=================================================
/*  
get() method requires two arguments, a string that describes the route the client will have to fetch from, and a callback function that will execute every time that route is accessed with a GET request.  We are using the send() method from the res parameter (short for response) to send the string Hello! to our client. 

POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.
*/

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});


// Module Exports 
module.exports = router;