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
    if (props.address != null && props.address.length >= 2) {
        streetAddr = props.address.slice(0, props.address.length - 1).join(" ");
        cityState = props.address[props.address.length - 1];
    } else if (props.address != null && props.address.length == 1) {
        streetAddr = props.address[0];
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
                        <RatingChip priceRating rating={props.priceRating} />
                        <div style={{ margin: "5px" }}/>
                        <RatingChip rating={props.starRating} showFullRating={props.isUsingGoogle}/>
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