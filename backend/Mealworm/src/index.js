const express = require('express');
const cors = require('cors');
const { getYelpRestaurants, parseYelpData, YELP_ERR_MSG } = require('./fetchRequest/yelp');
const { getGoogleRestaurants, parseGoogleData, GOOGLE_ERR_MSG } = require('./fetchRequest/google');
const { hasAllParams } = require('./util');
const { logRequest, logMissingParams, logInvalidKey, logServerIssue } = require('./logger');
const CONFIG = require('../config.json');

let keys;
try {
    keys = require('./keys');
} catch (err) {
    keys = require('../keys');
}

const app = express();

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
    logRequest('/yelp', req);

    if (!hasAllParams(req)) {
        res.status(400).json(MISSING_PARAMS_ERR_RESPONSE_BODY).end();
        logMissingParams();
        return;
    }

    if (req.query.key !== keys.mealwormApiKey) {
        res.status(401).json(WRONG_KEY_ERR_RESPONSE_BODY).end();
        logInvalidKey();
        return;
    }

    const param_location = req.query.location;
    const param_radius = parseInt(req.query.distance);
    const param_cuisine = (req.query.cuisine == null) ? null : req.query.cuisine;

    const data = await getYelpRestaurants(param_location, param_radius, param_cuisine);
    if (data === YELP_ERR_MSG) {
        res.status(500).json(DEFAULT_ERR_RESPONSE_BODY).end();
        logServerIssue('Yelp');
        return;
    }

    const response = {
        status: "success",
        data: parseYelpData(data, param_radius)
    };
    res.status(200).json(response).end();
});

app.get('/google', async (req, res) => {
    logRequest('/google', req);

    if (!hasAllParams(req)) {
        res.status(400).json(MISSING_PARAMS_ERR_RESPONSE_BODY).end();
        logMissingParams();
        return;
    }

    if (req.query.key !== keys.mealwormApiKey) {
        res.status(401).json(WRONG_KEY_ERR_RESPONSE_BODY).end();
        logInvalidKey();
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
        logServerIssue('Google');
        return;
    }

    const response = {
        status: "success",
        data: parseGoogleData(data, param_radius)
    };
    res.status(200).json(response).end();
});

app.get('/', async (req, res) => {
    logRequest('/', req);

    const response = {
        status: "success",
        data: "App is online"
    };
    res.status(200).json(response).end();
});

const port = process.env.PORT || CONFIG.appPort;
app.listen(port, () => {
    console.log('Server listening at port ' + port);
})