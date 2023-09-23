import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import SearchInputFields from './components/searchInputFields/SearchInputFields';
import './App.css';
import SearchButton from './components/searchButton/SearchButton';

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
  const [catchphrase] = React.useState(getRandomCatchphrase());

  const [isGoogle, setIsGoogle] = React.useState(false);
  const [location, setLocation] = React.useState('default');
  const [distance, setDistance] = React.useState('3');
  const [cuisine,  setCuisine]  = React.useState('default');

  const doSearch = (location, distance, isUsingGoogle, cuisine) => {
    alert(location + " + " + distance + " + " + isUsingGoogle + " + " + cuisine);
  };

  return (
    <div className="App">
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
  );
}

export default App;
