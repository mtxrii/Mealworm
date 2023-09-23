import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';
import './SearchInputFields.css'

const cuisines = [
    {
        value: 'ANY',
        label: 'Any',
    },
    {
        value: 'CHI',
        label: 'Chinese',
    },
    {
        value: 'JPE',
        label: 'Japanese',
    },
    {
        value: 'KOR',
        label: 'Korean',
    },
    {
        value: 'TAI',
        label: 'Thai',
    },
    {
        value: 'VTE',
        label: 'Vietnamese',
    },
    {
        value: 'ITA',
        label: 'Italian',
    },
    {
        value: 'FRE',
        label: 'French',
    },
    {
        value: 'MDE',
        label: 'Mediterranean',
    },
    {
        value: 'MEX',
        label: 'Mexican',
    },
    {
        value: 'USA',
        label: 'American',
    },
    {
        value: 'BBQ',
        label: 'Barbeque',
    },
    {
        value: 'BFT',
        label: 'Breakfast',
    },
    {
        value: 'BGR',
        label: 'Burgers',
    },
    {
        value: 'PZA',
        label: 'Pizza',
    },
    {
        value: 'SFD',
        label: 'Seafood',
    },
    {
        value: 'SHI',
        label: 'Sushi',
    }
];
 
export default function SearchInputFields() {
    return (
        <div className="SIF-block">
            <div className="SIF-location-row">
                <TextField label="Enter location" variant="filled" color="primary" fullWidth />
            </div>
            <div className="SIF-filters-row">
                <TextField label="Distance (mi)" variant="filled" fullWidth type="number" />
                <div className="SIF-filters-padding"/>
                <TextField label="Cuisine" variant="filled" fullWidth select className="SIF-cuisine">
                    {cuisines.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    )
}