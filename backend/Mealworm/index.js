const express = require('express');
const cors = require('cors');
const { getYelpRestaurants, parseYelpData, YELP_ERR_MSG } = require('./fetchRequest/yelp');
const { getGoogleRestaurants, parseGoogleData, GOOGLE_ERR_MSG } = require('./fetchRequest/google');

const app = express();
const port = 3000;

const DEFAULT_ERR_RESPONSE_BODY = {
    status: "error",
    message: "unable to retrieve data from source."
}

app.use(cors());

app.get('/yelp', async (req, res) => {
    console.log('Request received at /yelp');

    const param_location = 'mountain view';
    const param_radius = 3;
    const param_cuisine = 'mexican';

    const data = await getYelpRestaurants(param_location, param_radius, param_cuisine);
    if (data === YELP_ERR_MSG) {
        res.status(400).json(DEFAULT_ERR_RESPONSE_BODY).end();
        return;
    }

    const response = {
        status: "success",
        data: parseYelpData(data, param_radius)
    };
    res.status(200).json(response).end();
});

app.get('/google', async (req, res) => {
    console.log('Request received at /google');

    const param_location = 'mountain view';
    const param_radius = 3;

    const data = await getGoogleRestaurants(param_location, param_radius);
    if (data === GOOGLE_ERR_MSG) {
        res.status(400).json(DEFAULT_ERR_RESPONSE_BODY).end();
        return;
    }

    const response = {
        status: "success",
        data: parseGoogleData(data, param_radius)
    };
    res.status(200).json(response).end();
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
})