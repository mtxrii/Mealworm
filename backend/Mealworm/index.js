const express = require('express');
const cors = require('cors');
const { getRestaurants, YELP_ERR_MSG } = require('./yelp');

const app = express();
const port = 3000;

const DEFAULT_ERR_RESPONSE_BODY = {
    status: "error",
    message: "unable to retrieve data from source."
}

app.use(cors());

app.get('/yelp', async (req, res) => {
    console.log('Request received at /yelp');

    const data = await getRestaurants();
    if (data === YELP_ERR_MSG) {
        res.status(400).json(DEFAULT_ERR_RESPONSE_BODY).end();
        return;
    }

    res.status(200).json(data).end();
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
})