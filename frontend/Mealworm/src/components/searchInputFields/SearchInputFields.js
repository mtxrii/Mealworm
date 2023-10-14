import * as React from 'react';
import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';
import CUISINES from '../../metadata/cuisines.json';
import './SearchInputFields.css'

export default function SearchInputFields(props) {
    const [validDistance, setIsValidDistance] = React.useState(true);

    const isValidDistance = (distance) => {
        return distance <= 20 && distance >= 1;
    };

    return (
        <div className="SIF-block">
            <div className="SIF-location-row">
                <TextField label="Enter location" variant="filled" color="primary" fullWidth onChange={
                        (event) => props.updateLocation(event.target.value)
                    }
                />
            </div>
            <div
                className="SIF-filters-row"
                style={
                    validDistance ?
                    {} :
                    {marginBottom: "-23px"}
                }
            >
                <TextField
                    label="Distance (mi)"
                    variant="filled"
                    fullWidth
                    error={!validDistance}
                    helperText={
                        validDistance ?
                        "" : "Must be between 1 and 20"
                    }
                    type="number"
                    InputProps={{
                        inputProps: { 
                            max: 20, min: 1
                        }
                    }}
                    onChange={
                        (event) => {
                            props.updateDistance(event.target.value);
                            setIsValidDistance(isValidDistance(event.target.value));
                        }
                    }
                />
                {props.isUsingGoogle ? null :
                    <div className="SIF-filters-padding" />
                }
                {props.isUsingGoogle ? null :
                    <TextField label="Cuisine" variant="filled" fullWidth select className="SIF-cuisine" defaultValue="" onChange={
                            (event) => props.updateCuisine(event.target.value)
                        }
                    >
                        {CUISINES.cuisineOptions.map((option) => (
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