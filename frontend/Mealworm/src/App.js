// Libraries
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { Grid } from '@mui/material';
// Components
import LandingLogo from './components/landingLogo/LandingLogo';
import SearchEngineSwitch from './components/searchEngineSwitch/SearchEngineSwitch';
import SearchInputFields from './components/searchInputFields/SearchInputFields';
import SearchButton from './components/searchButton/SearchButton';
import Loader from './components/loadingAnimation/Loader';
import RestaurantCard from './components/restaurantCard/RestaurantCard';
import FiltersSelectionBar from './components/filtersSelectionBar/FiltersSelectionBar';
// Other files
import { getRestaurants, DEFAULT_KEYWORD, ERROR_KEYWORD } from './fetchRequest/dataGather';
import CATCHPHRASES from './metadata/catchphrases.json';
import PAGES from './metadata/pagesEnum.json';
import CONFIG from './app-config.json';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: CONFIG.buttonColor
    }
  }
});

function getRandomCatchphrase() {
  const phrases = CATCHPHRASES.appLandingScreenCatchphrases;
  return phrases[Math.floor((Math.random() * phrases.length))];
}

function generateColor(rgbColor, opacity) {
  let color = rgbColor.replace("rgb", "rgba");
  color = color.replace(")", ", " + opacity + ")");
  return color;
}

function App() {
  const [currentPage, setCurrentPage] = React.useState(PAGES.search);
  
  const [catchphrase] = React.useState(getRandomCatchphrase());

  const [isGoogle, setIsGoogle] = React.useState(false);
  const [location, setLocation] = React.useState(DEFAULT_KEYWORD);
  const [distance, setDistance] = React.useState(DEFAULT_KEYWORD);
  const [cuisine,  setCuisine]  = React.useState(DEFAULT_KEYWORD);

  const [data,  saveData]  = React.useState(null);

  const doSearch = async (location, distance, isUsingGoogle, cuisine) => {
    setCurrentPage(PAGES.loading);

    const response = await getRestaurants(isUsingGoogle, location, distance, cuisine);

    if (response === ERROR_KEYWORD) {
      setCurrentPage(PAGES.error);
    } else {
      saveData(response);
      setCurrentPage(PAGES.results);
    }
  };

  const loadPage = () => {
    switch (currentPage) {
      case PAGES.search:
        return loadSearchPage();
      case PAGES.loading:
        return loadLoadingPage();
      case PAGES.results:
        return loadResultsPage();
      case PAGES.error:
        return loadErrorPage();
      default:
        return null;
    }
  };

  const loadResultsPage = () => {
    return (
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      >
        <FiltersSelectionBar
        location={location}
        distance={distance}
        cuisine={cuisine}
        isUsingGoogle={isGoogle} />
        <br/>
        {data.data.restaurants.map((restaurant) =>
          <Grid item xs={3} key={restaurant.idx}>
            <RestaurantCard
            idx={restaurant.idx}
            name={restaurant.name}
            img={restaurant.imageUrl}
            address={restaurant.address}
            priceRating={restaurant.price}
            starRating={restaurant.rating}
            isUsingGoogle={isGoogle} />
          </Grid>
        )}
      </Grid>
    );
  };

  const loadSearchPage = () => {
    return (
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
    );
  };

  const loadLoadingPage = () => {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div style={{
            marginLeft: "10px",
            paddingBottom: "10px",
            paddingTop: "10px"
          }}>
            Loading Results...
          </div>
          <Loader />
        </ThemeProvider>
      </div>
    )
  }

  const loadErrorPage = () => {
    return (
      <div>
      <ThemeProvider theme={theme}>
        <div style={{
          paddingBottom: "10px",
          paddingTop: "10px"
        }}>
          Error with backend server
        </div>
        <FmdBadIcon fontSize='large' />
      </ThemeProvider>
      </div>
    );
  }

  return (
    <main>
      <div className="App">
        {loadPage()}
      </div>
      <div className="App-footer" style={{ backgroundColor: generateColor(CONFIG.footerColor.color, CONFIG.footerColor.bodyOpacity) }}>
        <div className="App-footer-top" style={{ backgroundColor: generateColor(CONFIG.footerColor.color, CONFIG.footerColor.borderOpacity) }} />
        <a href={CONFIG.githubLink}>© Mtxrii</a> | <a href={CONFIG.githubLink + "/Mealworm"}>Source</a>
      </div>
    </main>
  );
}

export default App;
