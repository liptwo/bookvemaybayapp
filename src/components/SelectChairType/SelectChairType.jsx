import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectChairType() {
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 240, }} className='!border rounded !border-white !text-white' size="small">
            <InputLabel id="demo-select-small-label">Chọn ghế ngồi</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={type}
                onChange={handleChange}
            >
                <MenuItem value={10}>Phổ thông</MenuItem>
                <MenuItem value={20}>Phổ thông đặc biệt</MenuItem>
                <MenuItem value={30}>Thương gia</MenuItem>
                <MenuItem value={40}>Hạng nhất</MenuItem>
            </Select>
        </FormControl>
    );
}
