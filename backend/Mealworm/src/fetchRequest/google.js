const axios = require('axios');
const keys = require('../keys.js');
const { shuffle } = require('../util.js');
const CONFIG = require('../../config.json');

const ERR_MSG = 'GOOGLE_ERROR';

async function buildSearch(location, distance) {
    location = await getLatLong(location);
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

async function getLatLong(address) {
    const search = 'http://api.positionstack.com/v1/forward' +
                   '?access_key=' + keys.positionStackApiKey +
                   '&query=' + address;
    try {
        const response = await axios.get(search);
        if (response.error != null) {
            return null;
        }

        return response.data.data[0].latitude + ',' + response.data.data[0].longitude;
    } catch(error) {
        console.log(error);
    }
}

async function getRestaurants(location, distance) {
    const googleAPIEndpoint = await buildSearch(location, distance);
    try {
        const response = await axios.get(googleAPIEndpoint);
        return response.data;
    } catch(error) {
        console.log(error.response.data);
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

    if (CONFIG.randomizeResultsOrder) {
        parsedData.restaurants = shuffle(parsedData.restaurants);
    }
    return parsedData;
}

exports.getGoogleRestaurants = getRestaurants;
exports.parseGoogleData = parseData;
exports.GOOGLE_ERR_MSG = ERR_MSG;