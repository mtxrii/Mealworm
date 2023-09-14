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

function parseData(data) {
    const parsedData = {
        provider: "Yelp",
        totalResults: data.total,
        restaurants: []
    }

    data.businesses.forEach(restaurant => {
        parsedData.restaurants.push({
            name: restaurant.name,
            imageUrl: restaurant.image_url,
            categories: restaurant.categories.map(category => category.title),
            rating: restaurant.rating,
            address: restaurant.location.display_address,
            phone: restaurant.display_phone,
            website: restaurant.url,
            distance: parseFloat((restaurant.distance / 1609.344).toFixed(1)) // In miles
        });
    });

    return parsedData;
}

exports.getYelpRestaurants = getRestaurants;
exports.parseYelpData = parseData;
exports.YELP_ERR_MSG = ERR_MSG;