import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../services/api';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#39FF14', // Neon Green
        },
        background: {
            default: '#121212', // Dark Background
            paper: '#1E1E1E',   // Dark Paper Background
        },
        text: {
            primary: '#FFFFFF', // White Text
            secondary: '#B0BEC5', // Light Gray for secondary text
        },
    },
});

const GoalForm = ({ initialData, onSuccess }) => {
    const [goalType, setGoalType] = useState(initialData?.goalType || '');
    const [targetValue, setTargetValue] = useState(initialData?.targetValue || '');
    const [timeFrame, setTimeFrame] = useState(initialData?.timeFrame || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goalData = { goalType, targetValue, timeFrame };
        try {
            if (initialData) {
                await axios.put(`/goals/${initialData._id}`, goalData);
            } else {
                await axios.post('/goals', goalData);
            }
            onSuccess();
        } catch (error) {
            console.error('Goal submission failed', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box mt={3} border={1} borderColor="grey.300" borderRadius={2} p={3} bgcolor="#1E1E1E">
                    <Typography variant="h6" align="center" color="primary">
                        {initialData ? 'Edit' : 'Add'} Goal
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Goal Type"
                            fullWidth
                            margin="normal"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#B0BEC5' } }} // Light gray label
                            InputProps={{ style: { color: '#FFFFFF' } }} // White text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#1E1E1E', // Dark background for input
                                },
                            }}
                        />
                        <TextField
                            label="Target Value"
                            fullWidth
                            margin="normal"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            required
                            type="number"
                            InputLabelProps={{ style: { color: '#B0BEC5' } }} // Light gray label
                            InputProps={{ style: { color: '#FFFFFF' } }} // White text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#1E1E1E', // Dark background for input
                                },
                            }}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel style={{ color: '#B0BEC5' }}>Time Frame</InputLabel>
                            <Select
                                value={timeFrame}
                                onChange={(e) => setTimeFrame(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: '#FFFFFF', // White text color
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#39FF14', // Neon Green border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#39FF14', // Hover border color
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#39FF14', // Focused border color
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {initialData ? 'Update' : 'Add'} Goal
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default GoalForm;
