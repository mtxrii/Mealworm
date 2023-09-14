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

function buildImageSearch(photoObject) {
    let search = '?maxwidth=2048' +
                 '&photo_reference=' + photoObject.photo_reference +
                 '&key=' + keys.googleApiKey;
    return 'https://maps.googleapis.com/maps/api/place/photo' + search;
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

function parseData(data, radius) {
    const parsedData = {
        provider: "Google",
        searchRadius: radius,
        totalResults: data.results.length,
        restaurants: []
    };

    data.results.forEach(restaurant => {
        const resData = {
            name: restaurant.name,
            imageUrl: buildImageSearch(restaurant.photos[0]),
            categories: restaurant.types.map(category => category.replace('_', ' ')),
            rating: restaurant.rating,
            address: restaurant.vicinity.split(', '),
            phone: null,
            website: null,
            distance: null,
            price: (restaurant.price_level == null ? 0 : restaurant.price_level)
        };
        parsedData.restaurants.push(resData);
    });

    return parsedData;
}

exports.getGoogleRestaurants = getRestaurants;
exports.parseGoogleData = parseData;
exports.GOOGLE_ERR_MSG = ERR_MSG;