const axios = require('axios');
const keys = require('./keys.js');

const ERR_MSG = 'GOOGLE_ERROR';

function buildSearch(location, distance) {
    location = '37.386051%2C-122.083855';
    let search = '?key=' + keys.googleApiKey +
                 '&location=' + location +
                 '&radius=' + (distance * 1610) + // In meters
                 '&rankby=prominence' +
                 '&type=restaurant';
    return 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' + search;
}

async function getRestaurants(location, distance, cuisine) {
    const googleAPIEndpoint = buildSearch(location, distance);
    try {
        const response = await axios.get(googleAPIEndpoint);
        return response.data;
    } catch(error) {
        console.log(error);
        return ERR_MSG;
    }
}

exports.getGoogleRestaurants = getRestaurants;
exports.GOOGLE_ERR_MSG = ERR_MSG;