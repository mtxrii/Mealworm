import { backendApiKey } from "./keys.spec";

export const DEFAULT_KEYWORD = 'default_value';
export const ERROR_KEYWORD = 'API_ERR';

const backendPort = '3030';
const backendUrl = 'http://localhost:' + backendPort + '/'

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
        distance = defaults.cuisineDefault;
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
    const param_distance = "&distance=" + Math.abs(parseInt(distance));
    const param_cuisine  = (cuisine === "Any") ? "" : "&cuisine=" + cuisine;

    const URL = backendUrl + 'yelp' + param_key + param_location + param_distance + param_cuisine;
    //
}

async function getGoogleResults(location, distance) {
    //
}