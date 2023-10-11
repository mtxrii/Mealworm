import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import defaultRestaurantImage from '../../assets/zakaria-zayane-0uAVsDcyD0M-unsplash.jpg'

export default function RestaurantCard(props) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ margin: '12px' }}>
            <CardMedia
            sx={{ height: 140 }}
            image={defaultRestaurantImage}
            title={props.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.idx + ". " + props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
        </Card>
    );
}