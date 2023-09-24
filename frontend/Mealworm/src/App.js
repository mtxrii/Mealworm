import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import SearchInputFields from './components/searchInputFields/SearchInputFields';
import SearchButton from './components/searchButton/SearchButton';
import { getRestaurants, DEFAULT_KEYWORD, ERROR_KEYWORD } from './fetchRequest/dataGather';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007c72'
    },
  },
});

const APP_CATCHPHRASES = [
  "Find somewhere new to eat",
  "Find random cool restaurants near you",
  "Get some new food suggestions",
  "Check out some new restaurants",
  "Discover new food near you",
  "See the best restaurants around"
]

function getRandomCatchphrase() {
  return APP_CATCHPHRASES[Math.floor((Math.random()*APP_CATCHPHRASES.length))];
}

function App() {
  const [showResultsPage, hasResults] = React.useState(false);
  
  const [catchphrase] = React.useState(getRandomCatchphrase());

  const [isGoogle, setIsGoogle] = React.useState(false);
  const [location, setLocation] = React.useState(DEFAULT_KEYWORD);
  const [distance, setDistance] = React.useState(DEFAULT_KEYWORD);
  const [cuisine,  setCuisine]  = React.useState(DEFAULT_KEYWORD);

  const [data,  saveData]  = React.useState(null);

  const doSearch = async (location, distance, isUsingGoogle, cuisine) => {
    const response = await getRestaurants(isUsingGoogle, location, distance, cuisine);
    saveData(response);

    hasResults(true);
  };

  return (
    <div className="App">
      {showResultsPage ? 
        <div>
          Results for location: '{location}' distance: '{distance}' usingGoogle: '{isGoogle + ''}' cuisine: '{cuisine}'
          <br/>
          {data.data.restaurants.map((restaurant) =>
            <li key={restaurant.name}>{restaurant.name}</li>
          )}
        </div>
        :
        <div>
          <header className="App-header">
            <LandingLogo catchphrase={catchphrase} />
          </header>
          <SearchEngineSwitch checked={isGoogle} setChecked={setIsGoogle} />
          <ThemeProvider theme={theme}>
            <SearchInputFields
              isUsingGoogle={isGoogle}
              updateLocation={setLocation}
              updateDistance={setDistance}
              updateCuisine={setCuisine}
            />
            <SearchButton onClick={doSearch} data={{
              location: location,
              distance: distance,
              isUsingGoogle: isGoogle,
              cuisine: cuisine
            }} />
          </ThemeProvider>
        </div>
      }
    </div>
  );
}

export default App;
