# Mealworm
This app will gather a list of randomly selected restaurants near you (or wherever you specify) and display them in a nicely formatted list for easy browsing. For when you need inspiration on where to eat!

## Stack
**Frontend**
* [React](https://create-react-app.dev/)

**Backend**
* [Node.js](https://nodejs.org/en/about)
* [Axios](https://axios-http.com/docs/intro) & [Express](https://expressjs.com/)
* [Yelp Fusion API](https://fusion.yelp.com/)
* [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
* [Positionstack API](https://positionstack.com/)

## Running
This monorepo contains both the client and server. Clone it locally to get started.
### 1. Setup Backend
2. Run `cd backend/Mealworm`
3. Run `npm install`
4. Copy file named `keys.spec.js`
   1. Obtain required API keys (instructions in the [file](https://github.com/mtxrii/Mealworm/blob/main/backend/Mealworm/src/keys.spec.js))
   2. Rename file to `keys.js`
5. Open file named [`index.js`](https://github.com/mtxrii/Mealworm/blob/fe509ce72fe6557551c51b8410d1f4d3609e8e48/backend/Mealworm/src/index.js#L9)
   1. Change `const port = 3030` to whatever you'd like, or leave it as 3030.
6. Run `node src/index.js`

### 7. Setup Frontend
