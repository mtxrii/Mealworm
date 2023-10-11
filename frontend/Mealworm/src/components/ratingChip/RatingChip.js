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
                <DollarSignIcon key={i}/>
            )
        }
        return dollarSigns;
    }

    const buildStarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = fullStars !== rating && rating !== 5;
        const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));

        let stars = [];
        let keyIdx = 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FullStarIcon key={keyIdx} />
            )
            keyIdx ++;
        }
        if (hasHalfStar) {
            stars.push(
                <HalfStarIcon key={keyIdx} />
            )
            keyIdx ++;
        }
        for (let j = 0; j < emptyStars; j++) {
            stars.push(
                <EmptyStarIcon key={keyIdx}/>
            )
            keyIdx ++;
        }
        return stars;
    }

    return (
        <ThemeProvider theme={theme}>
            <Chip
            label={
                props.priceRating ?
                buildPriceRating(props.rating) :
                buildStarRating(props.rating)
            }
            variant="outlined"
            color="primary"
            />
            {
                props.showFullRating ?
                <div style={{ color: CONFIG.buttonColor }}>
                    {"(" + props.rating + " Stars)"}
                </div> :
                ""
            }
        </ThemeProvider>
    )
}