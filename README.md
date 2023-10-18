# Mealworm
This app will gather a list of randomly selected restaurants near you (or wherever you specify) and display them in a nicely formatted list for easy browsing. For when you need inspiration on where to eat!

## Stack
**Frontend**
* [React](https://create-react-app.dev/)
* [Material UI](https://mui.com/material-ui/getting-started/)
* [Axios](https://axios-http.com/docs/intro)

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
4. Copy file named `keys.spec.js` (inside `/src` dir)
   1. Obtain required API keys (instructions in the [file](https://github.com/mtxrii/Mealworm/blob/main/backend/Mealworm/src/keys.spec.js))
      1. One of these keys is created by you and can be any password you want. It is used to ensure only your copy of the frontend accesses your copy of the backend (and uses your API keys)
   3. Rename file to `keys.js`
5. Open file named `config.json`
   1. Change the value of `appPort` to whatever you'd like, or leave it as 3030. By default the port used is the env var `PORT`, this is in case the env var is not set.
6. Run `node src/index.js` to start the backend server.

### 7. Setup Frontend
8. Navigate to the frontend directory — return to root (`cd ../..` from backend dir) then run `cd frontend/Mealworm`
9. Run `npm install`
10. Copy file named `keys.spec.js` (inside `/src/fetchRequest` dir)
    1. Replace the default value for [`backendApiKey`](https://github.com/mtxrii/Mealworm/blob/11c6816bc233cdd3cfacac9e8b5e564a9ba9a1a7/frontend/Mealworm/src/fetchRequest/keys.spec.js#L9) with the key you created in step 4.i.a
    2. Rename file to `keys.js`
       1. Alternatively you can add the value for `backendApiKey` as an env var named `REACT_APP_BACKEND_KEY`.
11. Open file named `app-config.json` (inside `/src` dir)
    1. Change the value of `backendPort` to whatever you set it to in step 5.i and set `useBackendPort` to `true`.
    2. Change the value of `useHttps` to `false`.
    3. Change the value of `backendUrl` to either `localhost` or whatever internal address the frontend is running on.
12. Run `npm start` to start the frontend app.
13. Navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser

## Deploying
A few things to keep in mind when deploying this app.
* The port for the backend specified in the env var `PORT` takes priority over the one in `config.js`. Some hosts will set this automatically.
* The keys file for the backend (`./src/keys.js`) can also be placed in the root directory (`./keys.js`) to accommodate hosts that only allow secrets files in the root. If there is one of each, the one in `./src` takes priority.
* The frontend config file (`./src/app-config.json`) is setup to connect to a deployed backend by default. If you changed some settings to run it locally, make sure you turn `useHttps` back to `true`, set `useBackendPort` to `false`, and replace `backendUrl` with the URL to wherever the backend is deployed/listening.
