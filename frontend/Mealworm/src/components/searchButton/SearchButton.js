import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import './SearchButton.css';

export default function SearchButton(props) {
    const clickFunction = () => {
        props.onClick(
            props.data.location,
            props.data.distance,
            props.data.isUsingGoogle,
            props.data.cuisine
        );
    }

    return (
        <div className="SB-container">
            <Button
                variant="contained"
                onClick={clickFunction}
            >
                <div className="SB-text">
                    Search
                </div>
                <SearchIcon fontSize="small" />
            </Button>
        </div>
    );
}