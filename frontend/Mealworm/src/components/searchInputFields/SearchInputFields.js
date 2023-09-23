import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';
import './SearchInputFields.css'

const cuisines = [
    { label: 'Any' },
    { label: 'Chinese' },
    { label: 'Japanese' },
    { label: 'Korean' },
    { label: 'Thai' },
    { label: 'Vietnamese' },
    { label: 'Italian' },
    { label: 'French' },
    { label: 'Mediterranean' },
    { label: 'Mexican' },
    { label: 'American' },
    { label: 'Barbeque' },
    { label: 'Breakfast' },
    { label: 'Burgers' },
    { label: 'Pizza' },
    { label: 'Seafood' },
    { abel: 'Sushi' }
];
 
export default function SearchInputFields(props) {
    return (
        <div className="SIF-block">
            <div className="SIF-location-row">
                <TextField label="Enter location" variant="filled" color="primary" fullWidth onChange={
                        (event) => props.updateLocation(event.target.value)
                    }
                />
            </div>
            <div className="SIF-filters-row">
                <TextField label="Distance (mi)" variant="filled" fullWidth type="number"  onChange={
                        (event) => props.updateDistance(event.target.value)
                    }
                />
                {props.isUsingGoogle ? null :
                    <div className="SIF-filters-padding" />
                }
                {props.isUsingGoogle ? null :
                    <TextField label="Cuisine" variant="filled" fullWidth select className="SIF-cuisine" onChange={
                            (event) => props.updateCuisine(event.target.value)
                        }
                    >
                        {cuisines.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                }
            </div>
        </div>
    )
}