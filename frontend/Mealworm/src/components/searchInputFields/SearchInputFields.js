import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';
import './SearchInputFields.css'

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
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
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    )
}