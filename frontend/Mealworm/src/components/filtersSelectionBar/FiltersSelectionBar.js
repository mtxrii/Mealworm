import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_KEYWORD } from '../../fetchRequest/dataGather';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsIcon from '@mui/icons-material/Directions';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CONFIG from '../../app-config.json';

const theme = createTheme({
  palette: {
      primary: {
          main: CONFIG.filterSelectionBarColor
      }
  }
});

export default function FiltersSelectionBar(props) {
  const location = props.location === DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.locationDefault : props.location;
  const distance = props.distance === DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.distanceDefault : props.distance;
  const cuisine  = props.cuisine  === DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.cuisineDefault  : props.cuisine;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <PlaceIcon style={{marginBottom: "-5px"}} /> {location}
              <DirectionsIcon style={{marginBottom: "-5px", marginLeft: "10px"}} /> {distance} mi
              <TravelExploreIcon style={{marginBottom: "-5px", marginLeft: "10px"}} /> {props.isUsingGoogle ? "Google" : "Yelp"}
              {props.isUsingGoogle ? "" :
              <span>
                <FastfoodIcon style={{marginBottom: "-5px", marginLeft: "10px"}} /> {cuisine}
              </span>
              }
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}