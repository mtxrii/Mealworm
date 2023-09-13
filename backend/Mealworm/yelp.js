const axios = require('axios');
const keys = require('./keys.js')

const ERR_MSG = 'YELP_ERROR';

function buildSearch(location, distance, cuisine) {
    let search = '?term=restaurants' +
                 '&location=' + location +
                 '&radius=' + (distance * 1609) +
                 '&categories=' + cuisine;
    return 'https://api.yelp.com/v3/businesses/search' + search;
}

async function getRestaurants() {
    const yelpAPIEndpoint = buildSearch('mountain view', 3, 'mexican');
    try {
        const response = await axios.get(yelpAPIEndpoint, {
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + keys.yelpApiKey
            }
        });
        return response.data;
    } catch(error) {
        return ERR_MSG;
    }
}

exports.getRestaurants = getRestaurants;
exports.YELP_ERR_MSG = ERR_MSG;