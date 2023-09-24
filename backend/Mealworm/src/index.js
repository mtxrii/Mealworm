const express = require('express');
const cors = require('cors');
const keys = require('./keys');
const { getYelpRestaurants, parseYelpData, YELP_ERR_MSG } = require('./fetchRequest/yelp');
const { getGoogleRestaurants, parseGoogleData, GOOGLE_ERR_MSG } = require('./fetchRequest/google');
const { hasAllParams } = require('./util');

const app = express();
const port = 3030;

const DEFAULT_ERR_RESPONSE_BODY = {
    status: "error",
    error: "internal server error",
    message: "unable to retrieve data from source."
}

const MISSING_PARAMS_ERR_RESPONSE_BODY = {
    status: "error",
    error: "bad request",
    message: "missing required params! Needs: key, location, distance."
}

const WRONG_KEY_ERR_RESPONSE_BODY = {
    status: "error",
    error: "unauthorized",
    message: "key is invalid."
}

app.use(cors());

app.get('/yelp', async (req, res) => {
    console.log('Request received at /yelp');

    if (!hasAllParams(req)) {
        res.status(400).json(MISSING_PARAMS_ERR_RESPONSE_BODY).end();
        return;
    }

    if (req.query.key !== keys.mealwormApiKey) {
        res.status(401).json(WRONG_KEY_ERR_RESPONSE_BODY).end();
        return;
    }

    const param_location = req.query.location;
    const param_radius = parseInt(req.query.distance);
    const param_cuisine = (req.query.cuisine == null) ? null : req.query.cuisine;

    const data = await getYelpRestaurants(param_location, param_radius, param_cuisine);
    if (data === YELP_ERR_MSG) {
        res.status(500).json(DEFAULT_ERR_RESPONSE_BODY).end();
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

    if (!hasAllParams(req)) {
        res.status(400).json(MISSING_PARAMS_ERR_RESPONSE_BODY).end();
        return;
    }

    if (req.query.key !== keys.mealwormApiKey) {
        res.status(401).json(WRONG_KEY_ERR_RESPONSE_BODY).end();
        return;
    }

    if (keys.googleApiKey === '') {
        res.status(502).json({
            status: "error",
            error: "bad gateway",
            message: "no API key configured on this server for use with Google Places API."
        }).end();
        return;
    }

    const param_location = req.query.location;
    const param_radius = parseInt(req.query.distance);

    const data = await getGoogleRestaurants(param_location, param_radius);
    if (data === GOOGLE_ERR_MSG) {
        res.status(500).json(DEFAULT_ERR_RESPONSE_BODY).end();
        return;
    }

    const response = {
        status: "success",
        data: parseGoogleData(data, param_radius)
    };
    res.status(200).json(response).end();
});

app.get('/', async (req, res) => {
    console.log('Request received at /');

    const response = {
        status: "success",
        data: "App is online"
    };
    res.status(200).json(response).end();
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
})