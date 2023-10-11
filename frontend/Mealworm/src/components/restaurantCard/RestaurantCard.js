// Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import RatingChip from '../ratingChip/RatingChip';
// Other files
import defaultRestaurantImage from '../../assets/zakaria-zayane-0uAVsDcyD0M-unsplash.jpg';
import CONFIG from '../../app-config.json';

export default function RestaurantCard(props) {
    const noImg = props.img === null;

    let streetAddr = "";
    let cityState = "";
    if (props.address.length === 2) {
        streetAddr = props.address[0];
        cityState = props.address[1];
    } else if (props.address.length === 3) {
        streetAddr = props.address[0] + " " + props.address[1];
        cityState = props.address[2];
    }

    return (
        <Card sx={{ width: 345 }} style={{ margin: '12px' }}>
            <CardMedia
            sx={{ height: 140 }}
            image={noImg ? defaultRestaurantImage : props.img}
            title={noImg ? "No image provided" : "Image of " + props.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.idx + ". " + props.name}
                </Typography>

                <Grid
                container
                direction="row"
                style={{ marginTop: "10px" }}
                >
                    <Grid item xs={6} align="left">
                        <RatingChip priceRating rating={4} />
                        <div style={{ margin: "5px" }}/>
                        <RatingChip rating={4.5} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color={CONFIG.buttonColor} align="left">
                            {streetAddr}
                            <br/>
                            {cityState}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}