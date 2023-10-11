// Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import { Grid } from '@mui/material';
// Other files
import defaultRestaurantImage from '../../assets/zakaria-zayane-0uAVsDcyD0M-unsplash.jpg';
import CONFIG from '../../app-config.json';

export default function RestaurantCard(props) {
    const noImg = props.img === null;

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
                        <Chip label="$ $ $ $" variant="outlined" />
                        <div style={{ margin: "5px" }}/>
                        <Chip label={<StarIcon />} variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color={CONFIG.buttonColor} align="left">
                            123 Sample St
                            <br/>
                            San Jose, CA 95113
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}