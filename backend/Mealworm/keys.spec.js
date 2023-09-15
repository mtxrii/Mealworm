/** INSTRUCTIONS:
 *  This app requires some API keys, all of which are free to use.
 *  Copy this file and rename it to `keys.js` then fill it in with your keys.
 * 
 *  YELP: Get an api key here: https://fusion.yelp.com
 *  Does not require a credit card and has a sufficient free quota.
 * 
 *  GOOGLE: Get an API key here: https://developers.google.com/maps/documentation/places/web-service
 *  It does require a credit card, but the free quota is more than enough and you can set limits to prevent from being charged.
 *  More info at https://mapsplatform.google.com/pricing/
 *  If you'd rather not use Google's API you can leave the key blank and only use Yelp.
 * 
 *  POSITIONSTACK: Get an API key here: https://positionstack.com/product
 *  Does not require a credit card, and is only required if using Google.
 * 
 *  MEALWORM: You provide this one yourself. It is included in inbound requests to ensure only your instance of the frontend has
 *  permission to send outbound requests on your behalf (using your keys here).
 *  Whatever you make it, you'll also need to provide it to the frontend.
 */

const yelpApiKey = 'apiKey';
const googleApiKey = 'apiKey';
const positionStackApiKey = 'apiKey';
const mealwormApiKey = 'apiKey';

exports.yelpApiKey = yelpApiKey;
exports.googleApiKey = googleApiKey;
exports.positionStackApiKey = positionStackApiKey;
exports.mealwormApiKey = mealwormApiKey;