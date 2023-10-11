// Components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
// Icons
import DollarSignIcon from '@mui/icons-material/AttachMoney';
import FullStarIcon from '@mui/icons-material/Star';
import EmptyStarIcon from '@mui/icons-material/StarBorder';
import HalfStarIcon from '@mui/icons-material/StarHalf';
// Other files
import CONFIG from '../../app-config.json';

const theme = createTheme({
    palette: {
        primary: {
            main: CONFIG.buttonColor
        }
    }
});

export default function RatingChip(props) {
    if (props.priceRating && props.rating == 0) {
        return null;
    }

    const buildPriceRating = (rating) => {
        let dollarSigns = [];
        for (let i = 0; i < rating; i++) {
            dollarSigns.push(
                <DollarSignIcon />
            )
        }
        return dollarSigns;
    }

    return (
        <ThemeProvider theme={theme}>
            <Chip label={buildPriceRating(props.rating)} variant="outlined" color="primary"/>
        </ThemeProvider>
    )
}