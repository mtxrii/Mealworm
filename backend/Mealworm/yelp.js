const axios = require('axios');
const keys = require('./keys.js')

function buildSearch(location, distance, cuisine) {
    let search = '?term=restaurants' +
                 '&location=' + location +
                 '&radius=' + (distance * 1609) +
                 '&categories=' + cuisine;
    return search;
}

async function getRestaurants() {
    const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch('mountain view', 3, 'mexican');
    try {
        const response = await axios.get(yelpAPIEndpoint, {
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + keys.yelpAPIEndpoint
            }
        });
        return response.data;
    } catch(error) {
        return error;
    }
}

exports.getRestaurants = getRestaurants;