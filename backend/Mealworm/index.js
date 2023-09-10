const express = require('express');
const cors = require('cors');
const { getRestaurants } = require('./yelp');

const app = express();
const port = 3000;

app.use(cors());

app.get('/yelp', async (req, res) => {
    console.log('Request received at /yelp');

    const data = await getRestaurants();
    res.status(200).json(data).end();
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
})