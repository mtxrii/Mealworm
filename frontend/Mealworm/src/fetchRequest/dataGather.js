import { backendApiKey } from "./keys.js";
import axios from 'axios';

export const DEFAULT_KEYWORD = 'default_value';
export const ERROR_KEYWORD = 'API_ERR';

const debugMode = true;

const backendPort = '3030';
const backendUrl = 'http://192.168.0.65:' + backendPort + '/'

const defaults = {
    locationDefault: "Mountain View, CA",
    distanceDefault: "3",
    cuisineDefault: "Any"
}

export async function getRestaurants(isGoogle, location, distance, cuisine) {
    if (location === DEFAULT_KEYWORD) {
        location = defaults.locationDefault;
    }
    if (distance === DEFAULT_KEYWORD) {
        distance = defaults.distanceDefault;
    }
    if (cuisine === DEFAULT_KEYWORD) {
        cuisine = defaults.cuisineDefault;
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
        if (debugMode) {
            console.log(response.data);
        }
        return response.data;
    } catch(error) {
        if (debugMode) {
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
        if (debugMode) {
            console.log(response.data);
        }
        return response.data;
    } catch(error) {
        if (debugMode) {
            console.log(URL);
            console.log(error);
        }
        return ERROR_KEYWORD;
    }
}