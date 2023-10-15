import axios from 'axios';
import CONFIG from '../app-config.json';

export const DEFAULT_KEYWORD = 'default_value';
export const ERROR_KEYWORD = 'API_ERR';

let backendApiKey;
try {
    // eslint-disable-next-line
    backendApiKey = require("./keys.js").backendApiKey;
} catch (err) {
    backendApiKey = process.env.REACT_APP_BACKEND_KEY;
}

const backendUrl = 'http://' + CONFIG.backendUrl + ':' + CONFIG.backendPort + '/';

export async function getRestaurants(isGoogle, location, distance, cuisine) {
    if (location === DEFAULT_KEYWORD) {
        location = CONFIG.searchFilterDefaults.locationDefault;
    }
    if (distance === DEFAULT_KEYWORD) {
        distance = CONFIG.searchFilterDefaults.distanceDefault;
    }
    if (cuisine === DEFAULT_KEYWORD) {
        cuisine = CONFIG.searchFilterDefaults.cuisineDefault;
    }

    let result;
    if (isGoogle) {
        result = await getGoogleResults(location, distance);
    } else {
        result = await getYelpResults(location, distance, cuisine);
    }
    return result;
}

async function getYelpResults(location, distance, cuisine) {
    const param_key = '?key=' + backendApiKey;
    const param_location = "&location=" + location;
    const param_distance = "&distance=" + distance.replaceAll('-', '');
    const param_cuisine  = (cuisine === "Any") ? "" : "&cuisine=" + cuisine;

    let URL = backendUrl + 'yelp' + param_key + param_location + param_distance + param_cuisine;
    URL = URL.replaceAll(' ', '%20');
    try {
        const response = await axios.get(URL, {
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (CONFIG.debugMode) {
            console.log(response.data);
        }
        return response.data;
    } catch(error) {
        if (CONFIG.debugMode) {
            console.log(URL);
            console.log(error);
        }
        return ERROR_KEYWORD;
    }
}

async function getGoogleResults(location, distance) {
    const param_key = '?key=' + backendApiKey;
    const param_location = "&location=" + location;
    const param_distance = "&distance=" + distance.replaceAll('-', '');

    let URL = backendUrl + 'google' + param_key + param_location + param_distance;
    URL = URL.replaceAll(' ', '%20');
    try {
        const response = await axios.get(URL, {
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (CONFIG.debugMode) {
            console.log(response.data);
        }
        return response.data;
    } catch(error) {
        if (CONFIG.debugMode) {
            console.log(URL);
            console.log(error);
        }
        return ERROR_KEYWORD;
    }
}