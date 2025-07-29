import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    InputAdornment,
    Autocomplete,
} from '@mui/material';
import { ArrowLeftRight, MapPin } from 'lucide-react';

import top100Films from './top100Flights'; // Thay bằng dữ liệu sân bay thực tế nếu có

const FlightSearchBox = () => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');

    const swapLocations = () => {
        setDeparture(arrival);
        setArrival(departure);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                backgroundColor: 'white',
                color: 'black',
            }}
        >
            <Box sx={{ flex: 1, minWidth: 260 }}>
                <Typography variant="subtitle2" color="black" mb={0.5}>
                    Điểm đi
                </Typography>
                <Autocomplete
                    disablePortal
                    options={top100Films.map((option) => option.label)}
                    value={departure}
                    onChange={(event, newValue) => setDeparture(newValue || '')}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Hà Nội (HAN)"
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                '& .MuiInputBase-root': {
                                    color: 'black',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Viền bình thường
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0194f3', // Viền khi hover
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0194f3', // Viền khi focus
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MapPin size={18} color="#0194f3" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>

            <IconButton onClick={swapLocations}>
                <ArrowLeftRight color="#0194f3" />
            </IconButton>

            <Box sx={{ flex: 1, minWidth: 260 }}>
                <Typography variant="subtitle2" color="black" mb={0.5}>
                    Điểm đến
                </Typography>
                <Autocomplete
                    disablePortal
                    options={top100Films.map((option) => option.label)}
                    value={arrival}
                    onChange={(event, newValue) => setArrival(newValue || '')}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="TP. Hồ Chí Minh (SGN)"
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                '& .MuiInputBase-root': {
                                    color: 'black',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Viền bình thường
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0194f3', // Viền khi hover
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0194f3', // Viền khi focus
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MapPin size={18} color="#0194f3" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
        </Paper>
    );
};

export default FlightSearchBox;
