const axios = require('axios');
const keys = require('../keys.js');

const ERR_MSG = 'YELP_ERROR';

function buildSearch(location, distance, cuisine) {
    let search = '?term=restaurants' +
                 '&limit=' + 50 + // 50 is the maximum
                 '&location=' + location +
                 '&radius=' + (distance * 1610) + // In meters
                 '&categories=' + cuisine;
    return 'https://api.yelp.com/v3/businesses/search' + search;
}

async function getRestaurants(location, distance, cuisine) {
    const yelpAPIEndpoint = buildSearch(location, distance, cuisine);
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
        console.log(error.response.data);
        return ERR_MSG;
    }
}

function parseData(data, radius) {
    const parsedData = {
        provider: "Yelp",
        searchRadius: radius,
        totalResults: data.businesses.length,
        restaurants: []
    };

    data.businesses.forEach(restaurant => {
        parsedData.restaurants.push({
            name: restaurant.name,
            imageUrl: restaurant.image_url,
            categories: restaurant.categories.map(category => category.title),
            rating: restaurant.rating,
            address: restaurant.location.display_address,
            phone: restaurant.display_phone,
            website: restaurant.url,
            distance: parseFloat((restaurant.distance / 1609.344).toFixed(1)), // In miles
            price: (restaurant.price == null ? 0 : restaurant.price.length)
        });
    });

    return parsedData;
}

exports.getYelpRestaurants = getRestaurants;
exports.parseYelpData = parseData;
exports.YELP_ERR_MSG = ERR_MSG;