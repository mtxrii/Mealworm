import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DEFAULT_KEYWORD } from '../../fetchRequest/dataGather';
import CONFIG from '../../app-config.json';

export default function FiltersSelectionBar(props) {
  const location = props.location == DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.locationDefault : props.location;
  const distance = props.distance == DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.distanceDefault : props.distance;
  const cuisine  = props.cuisine  == DEFAULT_KEYWORD ? CONFIG.searchFilterDefaults.cuisineDefault  : props.cuisine;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            pinIcon: '{location}' distanceIcon: '{distance} mi' searchIcon: '{props.isUsingGoogle ? "Google" : "Yelp"}' cuisineIcon: '{cuisine}'
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}