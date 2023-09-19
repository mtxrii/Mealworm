import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import './SearchEngineSwitch.css';

// Source: https://mui.com/material-ui/react-switch/#customization
const MaterialUISwitch = styled(Switch)((props) => ({
  width: 62,
  height: 34,
  padding: 7,
  marginLeft: 20,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 50 50"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M25.997,48C13.312,48,2.992,37.683,2.992,25c0-12.682,10.32-23,23.005-23c5.746,0,11.247,2.13,15.491,5.997l0.774,0.706l-7.588,7.585l-0.703-0.602c-2.226-1.906-5.058-2.956-7.975-2.956c-6.767,0-12.273,5.504-12.273,12.27s5.506,12.27,12.273,12.27c4.879,0,8.733-2.491,10.549-6.737H24.997V20.176l22.549,0.031L47.713,21c1.179,5.582,0.235,13.793-4.528,19.667C39.238,45.533,33.456,48,25.997,48z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#007c72',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 64 64"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M3.888 21.372c2.828-7.071 8.485-12.728 15.556-15.556l11.876 23.646c.511 1.086.286 2.375-.563 3.224l0 0c-.849.849-2.138 1.074-3.224.563L3.888 21.372zM57.652 31.59c.707 4.95-.654 11.474-4.19 16.717l-12.446-8.961c-.965-.723-1.388-1.964-1.064-3.125v0c.324-1.162 1.327-2.005 2.527-2.125L57.652 31.59zM30.596 58.686c4.95.707 11.36-.519 16.582-4.088l-9.045-12.382c-.728-.961-1.972-1.376-3.132-1.045l0 0c-1.16.331-1.997 1.339-2.109 2.54L30.596 58.686zM37.486 14.102c5.319.842 9.8 4.407 13.071 8.685l-10.959 9.068c-.94.751-2.247.841-3.28.225l0 0c-1.033-.616-1.576-1.808-1.362-2.992L37.486 14.102zM12.174 39.414c.842 5.319 4.407 9.8 8.685 13.071l9.068-10.959c.751-.94.841-2.247.225-3.28l0 0c-.616-1.033-1.808-1.576-2.992-1.362L12.174 39.414z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  }
}));

export default function SearchEngineSwitch() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const yelpOrGoogle = () => {
    if (checked) {
      return 'Google';
    } else {
      return 'Yelp';
    }
  }

  return (
    <div className="SES-block">
      <div>Search engine</div>
      <Tooltip title={yelpOrGoogle()} placement="top" arrow>
        <div>
          <MaterialUISwitch onChange={handleChange}/>
        </div>
      </Tooltip>
    </div>
  );
}